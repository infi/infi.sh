import { getAllPosts } from '../lib/posts'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import Head from "next/head"
import LatestGrid from '../components/display/LatestGrid'
import { Post } from '../lib/types'
import PostListDisplay from '../components/display/PostListDisplay'
const Anime = dynamic(() => import('react-anime'), { ssr: false })

const PostHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    min-height: 40vh;
    background-color: #28202F;
    flex-direction: column;
    user-select: none;

    @media (max-width: 768px) {
        min-height: 70vh;
    }
`

const PageTitle = styled.h1`
    max-width: 1000px;
    text-align: center;
    color: #9179F0;
    font-size: 2.5rem;
    font-weight: 400;
`

const PostContent = styled.div`
    max-width: 60vw;
    margin: 0 auto;
    padding-top: 2rem;

    @media (max-width: 768px) {
        max-width: 90vw;
    }
`

const AllPosts = ({ posts, pinnedPosts }: { posts: Post[], pinnedPosts: Post[] }) => {
    return (
        <>
            <Head>
                <meta property="og:title" content="Posts" />
                <meta property="og:image" content="https://infi.sh/opengraph.png" />
                <meta property="og:description" content="All editorial material on infi.sh." />
            </Head>
            <Navbar />
            <PostHeader>
                <Anime easing={'easeOutElastic(1, .8)'} translateY={[30, 0]} opacity={[0, 1]} delay={400}>
                    <PageTitle>Posts</PageTitle>
                </Anime>
            </PostHeader>
            <PostContent className="markdown-dynamic-content">
                {pinnedPosts.length > 0 && <Anime easing={'easeOutElastic(1, .8)'} translateY={[30, 0]} opacity={[0, 1]} delay={500}>
                    <LatestGrid component={PostListDisplay} items={pinnedPosts} heading="Pinned" />
                </Anime>}
                <Anime easing={'easeOutElastic(1, .8)'} translateY={[30, 0]} opacity={[0, 1]} delay={600}>
                    <LatestGrid component={PostListDisplay} items={posts} heading="Posts" />
                </Anime>
            </PostContent>
        </>
    )
}

export const getStaticProps = async () => {
    const allPosts = getAllPosts(["title", "slug", "coverImage", "description", "pinned"])

    return {
        props: {
            posts: allPosts,
            pinnedPosts: allPosts.filter(post => post.pinned).slice(0, 4)
        },
    }
}

export default AllPosts