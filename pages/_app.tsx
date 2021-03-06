import "../styles/globals.scss"
import "katex/dist/katex.min.css"
import Head from "next/head"

const MyApp = ({ Component, pageProps }: any) => {
    return (
        <>
            <Head>
                <title>Infi</title>
                <meta property="og:locale" content="en" />
                <meta property="og:site_name" content="Infi" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="theme-color" content="#28202f" />
                <link rel="icon" href="https://infi.sh/favicon.png" type="image/png" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
