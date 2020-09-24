import Head from 'next/head'
import NavBar from '../src/components/navbar'

export default function Trending() {
  return (
    <div className="container">
      <Head>
        <title>Charitable</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <NavBar />
        <h1>Landing Page</h1>
        <h1>Trending</h1>
      </div>
    </div>
  )
}
