import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import CustomHead from '../components/custom-head'
import ExtLink from '../components/ext-link';

const products = [
  {
    "url": "https://carpe.dev/",
    "image": "/images/Carpe.png",
    "title": "Carpe（カルぺ）",
    "description": "履歴書・職務経歴書・スキルシートなどの生成・管理アプリ",
  },
  {
    "url": "https://github.com/maejimayuto/cat-in-slack",
    "image": "/images/cat-in-slack.png",
    "title": "猫の宅急便",
    "description": "Slack のチャンネルに猫の画像をお届けするアプリ"
  },
  {
    "url": "https://github.com/maejimayuto/super-notion-blog",
    "image": "/images/super-notion-blog.png",
    "title": "super.so みたいなことができる OSS",
    "description": "Notion と Next.js でブログが簡単に作れちゃう OSS"
  }
];

const Home: NextPage = () => {
  return (
    <>
      <CustomHead titlePre="Home" />
      <div className="relative my-0 mx-auto max-w-3xl h-72">
        <Image
          src="/images/bali_01.jpg"
          alt="cover image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="px-4 pb-8 my-0 mx-auto max-w-3xl">
        <h1 className="mt-4 text-4xl font-bold">前島 悠人</h1>
        <h2 className="text-xl font-bold">Profile</h2>
        1993年 / 名古屋出身 / 東京渋谷区在住 / Web エンジニア<br />
        Web アプリの受託開発の会社を2年ぐらいやっていました。
        マネジメントから実装まで幅広くなんでもやるマンです。今後は、経営や0からのプロダクト開発に人生を捧げていきます！
        <h2 className="text-xl font-bold">Products</h2>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => {
            return (
              <Link key={product.url} href={product.url} passHref>
                <a
                  target="_blank" rel="noopener noreferrer"
                  className="text-fg hover:text-fg border-0"
                >
                  <div className="hover:bg-fg-0 rounded shadow-md">
                    <div className="relative my-0 mx-auto max-w-xl h-48">
                      <Image
                        src={product.image}
                        alt="carpe"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="right top"
                        className="rounded-t"
                      />
                    </div>
                    <div className="grid grid-rows-3 py-1 px-2.5">
                      <div className="flex">
                        <h3 className="my-0 text-sm leading-6">{product.title}</h3>
                      </div>
                      <span className="text-xs leading-6">{product.description}</span>
                    </div>
                  </div>
                </a>
              </Link>
            )
          })}
        </div>
        <h2 className="text-xl font-bold">Blog</h2>
        <Link href="/blog" passHref>
          <a className="border-0">
            <span className="text-fg-4">✍️</span>
            <span className="text-fg-3 hover:text-fg-4 border-b border-fg-1 hover:border-fg-4">記事一覧</span>
          </a>
        </Link>
        <h2 className="text-xl font-bold">SNS</h2>
        <ExtLink href="https://twitter.com/maejimayuto"><a>Twitter</a></ExtLink>
        <span> / </span>
        <ExtLink href="https://facebook.com/maejimayuto"><a>Facebook</a></ExtLink>
        <span> / </span>
        <ExtLink href="https://qiita.com/maejimayuto"><a>Qiita</a></ExtLink>
        <span> / </span>
        <ExtLink href="https://github.com/maejimayuto"><a>GitHub</a></ExtLink>
        <span> / </span>
        <ExtLink href="mailto:maejimayuto@gmail.com"><a>Mail</a></ExtLink>
      </div>
    </>
  )
}

export default Home
