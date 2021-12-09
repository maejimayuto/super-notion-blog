import type { NextPage } from 'next'
import Link from 'next/link'

import CustomHead from '../components/custom-head'
import Header from '../components/header'

const Home: NextPage = () => {
  return (
    <div>
      <CustomHead titlePre="Home" />
      <Header />
      <main>
        <h1>
          サイトのタイトル
        </h1>
        <Link href="/blog" passHref>
          <a className="text-blue-600">blog</a>
        </Link>
      </main>
    </div>
  )
}

export default Home
