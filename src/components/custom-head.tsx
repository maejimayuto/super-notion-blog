import Head from 'next/head'

const CustomHead = ({ titlePre = '' }) => {
  return (
    <Head>
      <title>前島 悠人{titlePre ? ` | ${titlePre}` : ''}</title>
      <meta name="description" content="とっても自由な Web エンジニアがプロダクト開発でどこまでいけるかの挑戦を見守るサイトです。" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default CustomHead
