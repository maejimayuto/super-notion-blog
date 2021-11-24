import type { NextPage } from 'next'

import CustomHead from '../components/custom-head'
import Header from '../components/header'

const Home: NextPage = () => {
  return (
    <div>
      <CustomHead titlePre="Home" />
      <Header />
      <main>
        <h1>
          前島 悠人
        </h1>
        <p className="text-blue-600">前島 悠人</p>
      </main>
    </div>
  )
}

export default Home
