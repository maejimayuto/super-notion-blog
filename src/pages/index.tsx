import type { NextPage } from 'next'
import styles from '../styles/home.module.css'
import CustomeHead from '../components/custome-head'
import Header from '../components/header'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <CustomeHead titlePre="Home" />
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>
          前島 悠人
        </h1>
      </main>
    </div>
  )
}

export default Home
