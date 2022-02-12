import "../styles/globals.scss"
import "katex/dist/katex.min.css"
import { AppProps } from "next/app"
import Head from "next/head"

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <title>Infi</title>
                <meta property="og:locale" content="en" />
                <meta property="og:site_name" content="Infi" />
                <meta name="theme-color" content="#28202f" />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp