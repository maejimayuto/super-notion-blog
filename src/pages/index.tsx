import type { NextPage } from 'next'
import styles from '../styles/home.module.css'
import Header from '../components/header'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header titlePre="Home" />
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
