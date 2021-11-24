import Head from 'next/head'
import styles from '../styles/header.module.css'

const Header = ({ titlePre = '' }) => {
  return (
    <header className={styles.header}>
      前島 悠人
    </header>
  )
}

export default Header