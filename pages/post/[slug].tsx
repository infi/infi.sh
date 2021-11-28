import { getAllPosts, getPostBySlug } from '../../lib/posts'
import markdownToHtml from '../../lib/markdown'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import Head from "next/head"
import { formatDistanceToNow } from 'date-fns'
import LatestGrid from '../../components/display/LatestGrid'
import AuthorDisplay from '../../components/display/AuthorDisplay'
import LatestPostDisplay from '../../components/display/LatestPostDisplay'
const Anime = dynamic(() => import('react-anime'), { ssr: false })

const PostHeader = styled.header`
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

const PostTitle = styled.h1`
    max-width: 1000px;
    text-align: center;
    color: #9179F0;
    font-size: 2.5rem;
    font-weight: 400;
`

const PostDate = styled.div`
    max-width: 800px;
    text-align: center;
    color: #CAB8FD;
    font-size: 1.2rem;
    font-weight: 400;
`

const PostDescription = styled.div`
    max-width: 800px;
    font-size: 1.2rem;
    font-weight: 400;
    margin-top: 1.5rem;
    text-align: center;
`

const PostContent = styled.main`
    max-width: 60vw;
    margin: 0 auto;
    padding-top: 2rem;

    @media (max-width: 768px) {
        max-width: 90vw;
    }
`

const PostAuthor = styled.footer`
    background-color: #28202f;
    font-size: 1.2rem;
    font-weight: 400;
    padding: 1.2em;
    border-radius: 15px;
`

const PostAuthorHeader = styled.h3`
    color: #9179F0;
    font-size: 1rem;
    font-weight: 400;
    margin: 0;
    margin-bottom: 0.75rem;
    user-select: none;
`

const Post = ({ post, latestPosts }: { post: any, latestPosts: any }) => {
    const router = useRouter()

    if (!router.isFallback && !post?.slug) {
        return (
            <>
                <Head>
                    <meta property="og:title" content="Post not found" />
                    <meta property="og:image" content="https://infi.sh/opengraph.png" />
                    <meta property="og:description" content="Sorry for that" />
                </Head>
                <Navbar />
                <PostHeader>
                    <Anime easing={'easeOutElastic(1, .8)'} translateY={[30, 0]} opacity={[0, 1]} delay={400}>
                        {/*
                          * Yep, we're casually reusing components despite them not fitting this purpose.
                          * The user will see the regular, global 404 page anyways.
                          */}
                        <PostTitle>Post not found</PostTitle>
                        <PostDate>Sorry for that</PostDate>
                    </Anime>
                </PostHeader>
            </>
        )
    }

    return (
        <>
            <Head>
                <meta property="og:title" content={post.title} />
                <meta property="og:image" content={post.ogImage ?? "https://infi.sh/opengraph.png"} />
                <meta property="og:description" content={post.description + ` (${post.readingTime})`} />
            </Head>
            <Navbar />
            <PostHeader>
                <Anime easing={'easeOutElastic(1, .8)'} translateY={[30, 0]} opacity={[0, 1]} delay={400}>
                    <PostTitle>{post.title}</PostTitle>
                    <PostDate>{formatDistanceToNow(new Date(post.date))} ago · {post.readingTime}</PostDate>
                    <PostDescription>{post.description}</PostDescription>
                </Anime>
            </PostHeader>
            <PostContent>
                <Anime easing={'easeOutElastic(1, .8)'} translateY={[30, 0]} opacity={[0, 1]} delay={500}>
                    <article className="markdown-dynamic-content" dangerouslySetInnerHTML={{ __html: post.content }} />
                </Anime>
                <Anime easing={'easeOutElastic(1, .8)'} translateY={[30, 0]} opacity={[0, 1]} delay={600}>
                    <PostAuthor>
                        <PostAuthorHeader>About the author</PostAuthorHeader>
                        <AuthorDisplay name={post.author.name} imageUrl={post.author.picture} />
                    </PostAuthor>
                </Anime>
            </PostContent>
            <Anime easing={'easeOutElastic(1, .8)'} translateY={[30, 0]} opacity={[0, 1]} delay={700}>
                <LatestGrid items={latestPosts} component={LatestPostDisplay} heading={"Latest Posts"} />
            </Anime>
        </>
    )
}

type Params = {
    params: {
        slug: string
    }
}

export const getStaticProps = async ({ params }: Params) => {
    const post = getPostBySlug(params.slug, [
        'title',
        'description',
        'coverImage',
        'date',
        'author',
        'slug',
        'content',
        'ogImage',
        'readingTime',
    ])
    const content = await markdownToHtml(post.content || '')

    const allPosts = getAllPosts(["title", "slug", "coverImage", "description", "date"])

    return {
        props: {
            post: {
                ...post,
                content,
            },
            latestPosts: allPosts.slice(0, 4),
        },
    }
}


export const getStaticPaths = async () => {
    const posts = getAllPosts(["slug"])

    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            }
        }),
        fallback: false,
    }
}

export default Post