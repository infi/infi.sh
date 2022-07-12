import { getAllPosts } from '../lib/posts'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import Head from "next/head"
import LatestGrid from '../components/display/LatestGrid'
import { Post } from '../lib/types'
import PostListDisplay from '../components/display/PostListDisplay'

const PostHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    min-height: 40vh;
    background-color: var(--color-background-slightly-lighter);
    flex-direction: column;
    user-select: none;

    @media (max-width: 768px) {
        min-height: 70vh;
    }
`

const PageTitle = styled.h1`
    max-width: 1000px;
    text-align: center;
    color: var(--color-accent);
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
                <meta property="og:image" content="https://infi.sh/api/opengraph/text?q=All%20Posts" />
                <meta property="og:description" content="All editorial material on infi.sh." />
            </Head>
            <Navbar />
            <PostHeader>
                <PageTitle>Posts</PageTitle>
            </PostHeader>
            <PostContent className="markdown-dynamic-content">
                {pinnedPosts.length > 0 &&
                    <LatestGrid component={PostListDisplay} items={pinnedPosts} heading="Pinned" />}
                <LatestGrid component={PostListDisplay} items={posts} heading="Posts" />
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