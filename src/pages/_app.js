import '../styles/globals.css'
import Head from 'next/head'
import 'semantic-ui-css/semantic.min.css';
function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <title>ForYou</title>
    </Head>
    {/* everything inside next/head appears globally */}
                
    <Component {...pageProps} />
  </>
}

export default MyApp
