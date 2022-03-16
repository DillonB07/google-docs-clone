import Head from 'next/head'
import Header from '../components/Header'
export default function Home() {
  return (
    <div>
      <Head>
        <title>Google Docs</title>
        <link
          rel="icon"
          href="https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico"
        />
      </Head>

      <Header />
    </div>
  )
}
