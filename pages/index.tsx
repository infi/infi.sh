import InitialIntroduction from "../components/index/InitialIntroduction"
import LatestPosts from "../components/index/LatestPosts"
import { getAllPosts } from "../lib/posts"
import { Post } from "../lib/types"
import Head from "next/head"

type Props = {
    allPosts: Post[]
}

const Home = ({ allPosts }: Props) => {
    return (
        <>
            <Head>
                <meta property="og:title" content="Infi" />
                <meta property="og:image" content="https://infi.sh/opengraph.png" />
                <meta property="og:description" content="Hello. I'm Infi." />
            </Head>
            <InitialIntroduction />
            <LatestPosts posts={allPosts} />
        </>
    )
}


export const getStaticProps = async () => {
    const allPosts = getAllPosts(["title", "slug", "coverImage", "description", "date"])
    return {
        props: {
            allPosts: allPosts.slice(0, 4)
        }
    }
}

export default Home
