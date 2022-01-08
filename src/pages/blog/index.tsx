import Link from 'next/link'

import CustomHead from '../../components/custom-head'
import TopicPaths from '../../components/topic-path'

import {
  getBlogLink,
  getDateStr,
  isPublished,
} from '../../lib/blog-helpers'
import getBlogIndex from "../../lib/notion/getBlogIndex";

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
      <CustomHead titlePre="Blog" />
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
      <div className="px-4 pb-8 my-0 mx-auto max-w-3xl">
        <div className="pt-8 text-8xl">✍️</div>
      <TopicPaths
        paths={["✍️ Blog"]}
        className="mt-5"
      />
        <h1 className="mt-4 text-4xl font-bold">Blog</h1>
        <p>前島 悠人のブログです。スタートアップ、プロダクトの開発について書いていきます。</p>
        {posts.length === 0 && (
          <p className="text-center">🚧メンテナンス中🚧</p>
        )}
        {posts.length > 0 && (
          <div className="mb-4 border-b">
            <h2 className="mb-1.5 text-xl font-bold">記事一覧(新着順)</h2>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          {posts.map((post) => {
            return (
              <Link key={post.Slug} href="/blog/[slug]" as={getBlogLink(post.Slug)} passHref>
                <a className="text-fg hover:text-fg border-0">
                  <div className="hover:bg-fg-0 rounded shadow-md">
                    {post.PageCoverUrl && (
                      <div className="relative my-0 mx-auto max-w-xl h-48">
                        {/* TODO: 画像がない時のデザインを考える */}
                        <img
                          src={`/api/asset?assetUrl=${encodeURIComponent(
                            post.PageCoverUrl as any
                            )}&blockId=${post.id}`}
                          alt="cover image"
                          className="object-cover w-full h-full rounded-t"
                        />
                      </div>
                    )}
                    <div className="grid grid-rows-3 py-1 px-2.5">
                      <div className="flex">
                        {post.PageIcon ? (
                            <span className="leading-6">{post.PageIcon}</span>
                          ) : (
                            <span className="pt-1 mr-1">
                              <svg viewBox="0 0 30 30" width="16">
                                <path d="M16,1H4v28h22V11L16,1z M16,3.828L23.172,11H16V3.828z M24,27H6V3h8v10h10V27z M8,17h14v-2H8V17z M8,21h14v-2H8V21z M8,25h14v-2H8V25z"></path>
                              </svg>
                            </span>
                          )
                        }
                        <h3 className="my-0 text-sm leading-6">{post.Page}</h3>
                      </div>
                      {post.Date && (
                        <span className="text-xs leading-6">{getDateStr(post.Date)}</span>
                      )}
                      {post.Tag && (
                        <span className="text-xs leading-6">{post.Tag}</span>
                      )}
                    </div>
                  </div>
                </a>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Index
