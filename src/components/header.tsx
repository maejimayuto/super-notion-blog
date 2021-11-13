import Head from 'next/head'
import styles from '../styles/header.module.css'

const Header = ({ titlePre = '' }) => {
  return (
    <header className={styles.header}>
      <Head>
        <title>前島 悠人{titlePre ? ` | ${titlePre}` : ''}</title>
        <meta name="description" content="とっても自由な Web エンジニアがプロダクト開発でどこまでいけるかの挑戦を見守るサイトです。" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      前島 悠人
    </header>
  )
}

export default Header