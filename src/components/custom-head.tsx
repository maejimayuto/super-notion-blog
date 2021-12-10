import Head from 'next/head'

const CustomHead = ({ titlePre = '' }) => {
  return (
    <Head>
      <title>前島 悠人{titlePre ? ` | ${titlePre}` : ''}</title>
    </Head>
  )
}

export default CustomHead
