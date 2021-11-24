import type { NextPage } from 'next'

import CustomHead from '../components/custom-head'
import Header from '../components/header'
import styles from '../styles/home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <CustomHead titlePre="Home" />
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>
          前島 悠人
        </h1>
        <p className="text-blue-600">前島 悠人</p>
      </main>
    </div>
  )
}

export default Home
