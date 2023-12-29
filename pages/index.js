import Head from 'next/head';

export default function Home() {
  return (
    <div className="containter">
      <Head>
        <h1>Movies App</h1>
          <link rel="icon" href="/favicon.ico"/>
          <link rel="stylesheet" href="/styles.css"/>
      </Head>
    </div>
  )
}