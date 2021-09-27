import styled from "styled-components"
import { formatDistanceToNow } from "date-fns"
import { Post } from "../../lib/types"
import Link from "next/link"

const LatestPostsWrapper = styled.div`
    max-width: 75vw;
    margin: 30px auto;
`

const LatestPostsHeading = styled.h1`
    font-size: 2.5rem;
    font-weight: 300;
    color: #9179F0;
    user-select: none;
`

const PostDisplay = styled.div`
    padding: 20px;
    border-radius: 15px;
    margin: 5px 0;
    background-color: #28202F;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`

const PostTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 400;
    color: #9179F0;
    margin: 0;
    padding: 0;
    user-select: none;
    cursor: pointer;
`

const PostDate = styled.p`
    font-size: 1rem;
    font-weight: 400;
    color: #CAB8FD;
    margin: 0;
    padding: 0;
    user-select: none;
`

const PostDescription = styled.p`
    font-size: 1.25rem;
    font-weight: 400;
    color: #dfd3ff;
    margin-top: 15px;
    margin-bottom: 15px;
    padding: 0;
`

const PostReadMore = styled.span`
    font-size: 1rem;
    font-weight: 400;
    color: #9179F0;
    text-decoration: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
    user-select: none;
`

const PostImage = styled.img`
    height: 200px;
    border-radius: 15px;
    margin-bottom: 15px;
    pointer-events: none;
    user-select: none;

    @media (max-width: 768px) {
        height: auto;
        width: 100%;
        margin-top: 20px;
    }
`

const Posts = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;

    @media (max-width: 1400px) {
        grid-template-columns: 1fr;
    }
`

type Props = {
    posts: Post[]
}

const LatestPosts = ({ posts }: Props) => {
    return (
        <LatestPostsWrapper>
            <LatestPostsHeading>Latest Posts</LatestPostsHeading>
            <Posts>
                {posts.map((post: any) => (
                    <PostDisplay key={post.slug}>
                        <div>
                            <Link href={`/post/${post.slug}`}>
                                <PostTitle>{post.title}</PostTitle>
                            </Link>
                            <PostDate>{formatDistanceToNow(new Date(post.date))} ago</PostDate>
                            <PostDescription>{post.description}</PostDescription>
                            <Link href={`/post/${post.slug}`}>
                                <PostReadMore>Read More »</PostReadMore>
                            </Link>
                        </div>
                        <PostImage src={post.coverImage} alt={post.title} />
                    </PostDisplay>
                ))}
            </Posts>
        </LatestPostsWrapper>
    )
}

export default LatestPosts
