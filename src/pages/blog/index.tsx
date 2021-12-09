import Link from 'next/link'

import CustomHead from '../../components/custom-head'
import Header from '../../components/header'
import blogStyles from '../../styles/blog.module.css'

import {
  getBlogLink,
  getDateStr,
  isPublished,
} from '../../lib/blog-helpers'
import { textBlock } from '../../lib/notion/renderers'
import getBlogIndex from "../../lib/notion/getBlogIndex";

// export async function getStaticProps(preview: any): Promise<{ props: { preview: any; posts: any[]; }; revalidate: number; }> {
export async function getStaticProps({ preview }) {
  const postsTable = await getBlogIndex()

  const posts: any[] = Object.keys(postsTable)
  .map((slug) => {
    const post = postsTable[slug]
    // remove draft posts in production
    if (!preview && !isPublished(post)) return null
    return post
  })
  .filter(Boolean)

  return {
    props: {
      preview: preview || false,
      posts,
    },
    revalidate: 10,
  }
}

const Index = ({ posts = [], preview }) => {
  return (
    <>
      <CustomHead titlePre="Home" />
      <Header />
      {/* TODO: この preview の意味がわからない */}
      {preview && (
        <div>
          <b>Note:</b>
          {` `}Viewing in preview mode{' '}
          <Link href={`/api/clear-preview`} passHref>
            <button>Exit Preview</button>
          </Link>
        </div>
      )}
      <div>
        <div className="flex items-center py-1 px-4 h-11 text-sm bg-white">
        <Link href="/" passHref>
          <a className="flex items-center py-1 px-1 hover:bg-gray-200 rounded">
            <div className="ml-1">
              前島 悠人
            </div>
          </a>
        </Link>
        <div className="px-1">/</div>
        <Link href="/blog" passHref>
          <a className="flex items-center py-1 px-1 hover:bg-gray-200 rounded">
            <div className="ml-1">
              ✍️ Blog
            </div>
          </a>
        </Link>
      </div>
        <h1>My Notion Blog</h1>
        {posts.length === 0 && (
          <p className={blogStyles.noPosts}>🚧メンテナンス中🚧</p>
        )}
        {posts.map((post) => {
          return (
            <div className={blogStyles.postPreview} key={post.Slug}>
              <h3>
                <span className={blogStyles.titleContainer}>
                  {!post.Published && (
                    <span className={blogStyles.draftBadge}>Draft</span>
                  )}
                  <Link href="/blog/[slug]" as={getBlogLink(post.Slug)}>
                    <a>{post.Page}</a>
                  </Link>
                </span>
              </h3>
              {post.Date && (
                <div className="posted">Posted: {getDateStr(post.Date)}</div>
              )}
              <p>
                {(!post.preview || post.preview.length === 0) &&
                  'No preview available'}
                {(post.preview || []).map((block, idx) =>
                  textBlock(block, true, `${post.Slug}${idx}`)
                )}
              </p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Index
