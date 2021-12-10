import type { NextPage } from 'next'
import Link from 'next/link'

import CustomHead from '../components/custom-head'

const Home: NextPage = () => {
  return (
    <>
      <CustomHead titlePre="Home" />
      <h1>
        サイトのタイトル
      </h1>
      <Link href="/blog" passHref>
        <a className="text-blue-600">blog</a>
      </Link>
    </>
  )
}

export default Home
