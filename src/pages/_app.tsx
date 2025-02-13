import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'


const App = ({ Component, pageProps }: AppProps) => {
  const title = `Memo App`
  return (
    <>
      <Head>
        <meta
          key="viewport"
          name="viewport"
          content="initial-scale=1.0, width=device-width, shrink-to-fit=no"
        />
        <title>{title}</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
