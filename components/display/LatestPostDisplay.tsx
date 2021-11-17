import styled from "styled-components"
import { formatDistanceToNow } from "date-fns"
import { Post } from "../../lib/types"
import Link from "next/link"

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

const PostReadMore = styled.a`
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

const LatestPostDisplay = ({ data: item }: { data: Post }) => {
    return (
        <PostDisplay key={item.slug}>
            <div>
                <Link href={`/post/${item.slug}`}>
                    <PostTitle>{item.title}</PostTitle>
                </Link>
                <PostDate>{formatDistanceToNow(new Date(item.date))} ago</PostDate>
                <PostDescription>{item.description}</PostDescription>
                <Link href={`/post/${item.slug}`}>
                    <PostReadMore>Read More »</PostReadMore>
                </Link>
            </div>
            <PostImage src={item.coverImage} alt={item.title} />
        </PostDisplay>
    )
}

export default LatestPostDisplay