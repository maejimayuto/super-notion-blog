import Link from 'next/link'
import { useRouter } from 'next/router'
import fetch from 'node-fetch'
import ReactJSXParser from '@zeit/react-jsx-parser'
import React, { CSSProperties, useEffect } from 'react'

import components from '../../components/dynamic'
import CustomHead from '../../components/custom-head'
import TopicPaths from '../../components/topic-path'
import Heading from '../../components/heading'
import getBlogIndex from '../../lib/notion/getBlogIndex'
import getPageData from '../../lib/notion/getPageData'
import { getBlogLink, getDateStr } from '../../lib/blog-helpers'
import { textBlock } from '../../lib/notion/renderers'
import blogStyles from '../../styles/blog.module.css'

// Get the data for each blog post
export async function getStaticProps({ params: { slug }, preview }) {
  // load the postsTable so that we can get the page's ID
  const postsTable = await getBlogIndex()
  // TODO: 本当は、 slug (ページのタイトル的なやつ) で API に検索クエリ的に投げられると良い
  // 現状は、全ての記事を取得し、メモリ上で同じ slug で記事を探し当てている
  const post = postsTable[slug]

  // if we can't find the post or if it is unpublished and
  // viewed without preview mode then we just redirect to /blog
  if (!post || (post.Published !== 'Yes' && !preview)) {
    console.log(`Failed to find post for slug: ${slug}`)
    return {
      props: {
        redirect: '/blog',
        preview: false,
      },
      unstable_revalidate: 5,
    }
  }
  const postData = await getPageData(post.id)
  post.content = postData.blocks
  post.PageIcon = postData.PageIcon
  post.PagePath = postData.PageIcon ? post.PageIcon + ' ' + post.Page : post.Page
  post.PageCoverUrl = postData.PageCoverUrl

  for (let i = 0; i < postData.blocks.length; i++) {
    const { value } = postData.blocks[i]
    const { type, properties } = value
    if (type == 'tweet') {
      const src = properties.source[0][0]
      // parse id from https://twitter.com/_ijjk/status/TWEET_ID format
      const tweetId = src.split('/')[5].split('?')[0]
      if (!tweetId) continue

      try {
        const res = await fetch(
          `https://api.twitter.com/1/statuses/oembed.json?id=${tweetId}`
        )
        const json = await res.json()
        properties.html = json.html.split('<script')[0]
        post.hasTweet = true
      } catch (_) {
        console.log(`Failed to get tweet embed for ${src}`)
      }
    }
  }

  return {
    props: {
      post,
      preview: preview || false,
    },
    revalidate: 10,
  }
}

// Return our list of blog posts to prerender
export async function getStaticPaths() {
  const postsTable = await getBlogIndex()
  // we fallback for any unpublished posts to save build time
  // for actually published ones
  return {
    paths: Object.keys(postsTable)
      .filter((post) => postsTable[post].Published === 'Yes')
      .map((slug) => getBlogLink(slug)),
    fallback: true,
  }
}

const listTypes = new Set(['bulleted_list', 'numbered_list'])

const RenderPost = ({ post, redirect, preview }) => {
  const router = useRouter()

  let listTagName: string | null = null
  let listLastId: string | null = null
  let listMap: {
    [id: string]: {
      key: string
      isNested?: boolean
      nested: string[]
      children: React.ReactFragment
      listTagName: string
    }
  } = {}

  useEffect(() => {
    const twitterSrc = 'https://platform.twitter.com/widgets.js'
    // make sure to initialize any new widgets loading on
    // client navigation
    if (post && post.hasTweet) {
      if ((window as any)?.twttr?.widgets) {
        ;(window as any).twttr.widgets.load()
      } else if (!document.querySelector(`script[src="${twitterSrc}"]`)) {
        const script = document.createElement('script')
        script.async = true
        script.src = twitterSrc
        document.querySelector('body').appendChild(script)
      }
    }
  }, [])
  useEffect(() => {
    if (redirect && !post) {
      router.replace(redirect)
    }
  }, [redirect, post])

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  // if you don't have a post at this point, and are not
  // loading one from fallback then  redirect back to the index
  if (!post) {
    return (
      <div className={blogStyles.post}>
        <p>
          Woops! didnt find that post, redirecting you back to the blog index
        </p>
      </div>
    )
  }

  return (
    <>
      <CustomHead titlePre={post.PagePath} />
      {preview && (
        <div className={blogStyles.previewAlertContainer}>
          <div className={blogStyles.previewAlert}>
            <b>Note:</b>
            {` `}Viewing in preview mode{' '}
            <Link href={`/api/clear-preview?slug=${post.Slug}`} passHref>
              <button className={blogStyles.escapePreview}>Exit Preview</button>
            </Link>
          </div>
        </div>
      )}
      {(post.PageCoverUrl) && (
        <div className="relative my-0 mx-auto max-w-3xl h-72">
        {/* TODO: use nextjs Image tag #54*/}
        <img
          src={`/api/asset?assetUrl=${encodeURIComponent(
            post.PageCoverUrl as any
            )}&blockId=${post.id}`}
          alt="cover image"
          className="object-cover w-full h-full"
        />
      </div>
      )}
      {/* <div className="px-4 pb-8 my-0 mx-auto max-w-3xl"> */}
      <div className={blogStyles.post}>
        <section>
          <TopicPaths
            paths={["✍️ Blog", post.PagePath]}
            className="mb-3"
          />
          <h1 className="mb-8 text-4xl font-bold">{post.Page || ''}</h1>
          <div className="grid grid-cols-4 gap-4 pt-1 pb-4 mb-4 text-sm text-fg-3 border-b">
            <div className="flex col-span-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="ml-1">Created</span>
            </div>
            <div className="col-span-3">{getDateStr(post.Date)}</div>
            <div className="flex col-span-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span className="ml-1">Tag</span>
              </div>
            <div className="col-span-3">{post.Tag}</div>
          </div>
        </section>

        {(!post.content || post.content.length === 0) && (
          <p>This post has no content</p>
        )}

        {(post.content || []).map((block, blockIdx) => {
          const { value } = block
          const { type, properties, id, parent_id } = value
          const isLast = blockIdx === post.content.length - 1
          const isList = listTypes.has(type)
          let toRender = []

          if (isList) {
            listTagName = components[type === 'bulleted_list' ? 'ul' : 'ol']
            listLastId = `list${id}`

            listMap[id] = {
              key: id,
              nested: [],
              listTagName: listTagName,
              children: textBlock(properties.title, true, id),
            }

            if (listMap[parent_id]) {
              listMap[id].isNested = true
              listMap[parent_id].nested.push(id)
            }
          }

          // TODO: I want to move into a separate file.
          const createListElement = (item: any) => {
            let children_tag = null
            if (item.nested.length > 0) {
              children_tag = React.createElement(
                // TODO: #68 Here, the first 0 is specified, so lists on the same level will have the same type.
                listMap[item.nested[0]].listTagName,
                { key: item + 'sub-list' },
                item.nested.map((nestedId) =>
                  createListElement(listMap[nestedId])
                )
              )
            }
            return React.createElement(
              components.li,
              { key: item.key },
              item.children,
              children_tag
            )
          }

          if (listTagName && (isLast || !isList)) {
            // NOTE: Get the tag for the top-left list in the list
            const top_tag = Object.keys(listMap).map((itemId) => {
              return !listMap[itemId].isNested ? listMap[itemId].listTagName : ''
            })[0]
            const children_tag = Object.keys(listMap).map((itemId) => {
                if (listMap[itemId].isNested) return null
                return createListElement(listMap[itemId])
              })
            const ele = React.createElement(
              top_tag,
              { key: listLastId! },
              children_tag
            )
            toRender.push(ele)
            listMap = {}
            listLastId = null
            listTagName = null
          }

          const renderHeading = (Type: string | React.ComponentType) => {
            toRender.push(
              <Heading key={id}>
                <Type key={id}>{textBlock(properties.title, true, id)}</Type>
              </Heading>
            )
          }

          const renderBookmark = ({ link, title, description, format }) => {
            toRender.push(
              <components.Bookmark link={link} title={title} description={description} format={format} />
            )
          }

          switch (type) {
            case 'page':
            case 'divider':
              break
            case 'text':
              if (properties) {
                toRender.push(textBlock(properties.title, false, id))
              }
              break
            case 'image':
            case 'video':
            case 'embed': {
              const { format = {} } = value
              const {
                block_width,
                block_height,
                display_source,
                block_aspect_ratio,
              } = format
              const baseBlockWidth = 768
              const roundFactor = Math.pow(10, 2)
              // calculate percentages
              const width = block_width
                ? `${
                    Math.round(
                      (block_width / baseBlockWidth) * 100 * roundFactor
                    ) / roundFactor
                  }%`
                : block_height || '100%'

              const isImage = type === 'image'
              const Comp = isImage ? 'img' : 'video'
              const useWrapper = block_aspect_ratio && !block_height
              const childStyle: CSSProperties = useWrapper
                ? {
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    position: 'absolute',
                    top: 0,
                  }
                : {
                    width,
                    border: 'none',
                    height: block_height,
                    display: 'block',
                    maxWidth: '100%',
                  }

              let child = null

              if (!isImage && !value.file_ids) {
                // external resource use iframe
                child = (
                  <iframe
                    style={childStyle}
                    src={display_source}
                    key={!useWrapper ? id : undefined}
                    className={!useWrapper ? 'asset-wrapper' : undefined}
                  />
                )
              } else {
                // notion resource
                child = (
                  <Comp
                    key={!useWrapper ? id : undefined}
                    src={`/api/asset?assetUrl=${encodeURIComponent(
                      display_source as any
                    )}&blockId=${id}`}
                    controls={!isImage}
                    alt={`An ${isImage ? 'image' : 'video'} from Notion`}
                    loop={!isImage}
                    muted={!isImage}
                    autoPlay={!isImage}
                    style={childStyle}
                  />
                )
              }

              toRender.push(
                useWrapper ? (
                  <div
                    style={{
                      paddingTop: `${Math.round(block_aspect_ratio * 100)}%`,
                      position: 'relative',
                    }}
                    className="asset-wrapper"
                    key={id}
                  >
                    {child}
                  </div>
                ) : (
                  child
                )
              )
              break
            }
            case 'header':
              renderHeading('h1')
              break
            case 'sub_header':
              renderHeading('h2')
              break
            case 'sub_sub_header':
              renderHeading('h3')
              break
            case 'bookmark':
              const { link, title, description } = properties
              const { format = {} } = value
              renderBookmark({ link, title, description, format })
              break
            case 'code': {
              if (properties.title) {
                const content = properties.title[0][0]
                const language = properties.language[0][0]

                if (language === 'LiveScript') {
                  // this requires the DOM for now
                  toRender.push(
                    <ReactJSXParser
                      key={id}
                      jsx={content}
                      components={components}
                      componentsOnly={false}
                      renderInpost={false}
                      allowUnknownElements={true}
                      blacklistedTags={['script', 'style']}
                    />
                  )
                } else {
                  toRender.push(
                    <components.Code key={id} language={language || ''}>
                      {content}
                    </components.Code>
                  )
                }
              }
              break
            }
            case 'quote': {
              if (properties.title) {
                toRender.push(
                  React.createElement(
                    components.blockquote,
                    { key: id },
                    properties.title
                  )
                )
              }
              break
            }
            case 'callout': {
              toRender.push(
                <div className="callout" key={id}>
                  {value.format?.page_icon && (
                    <div>{value.format?.page_icon}</div>
                  )}
                  <div className="text">
                    {textBlock(properties.title, true, id)}
                  </div>
                </div>
              )
              break
            }
            case 'tweet': {
              if (properties.html) {
                toRender.push(
                  <div
                    dangerouslySetInnerHTML={{ __html: properties.html }}
                    key={id}
                  />
                )
              }
              break
            }
            case 'equation': {
              if (properties && properties.title) {
                const content = properties.title[0][0]
                toRender.push(
                  <components.Equation key={id} displayMode={true}>
                    {content}
                  </components.Equation>
                )
              }
              break
            }
            default:
              if (
                process.env.NODE_ENV !== 'production' &&
                !listTypes.has(type)
              ) {
                console.log('unknown type', type)
              }
              break
          }
          return toRender
        })}
      </div>
    </>
  )
}

export default RenderPost
