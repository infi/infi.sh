import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import styled from "styled-components"
import { Post, Project } from "../../lib/types"

const PostRelationWrapper = styled.div`
    background-color: var(--color-background-slightly-lighter);
    font-size: 1.2rem;
    font-weight: 400;
    padding: 1.2em;
    border-radius: 15px;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`

const PostRelationFlex = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2em;

    @media (max-width: 1200px) {
        flex-direction: column;
    }
`

const PostRelationHeader = styled.h3`
    color: var(--color-accent);
    font-size: 1rem;
    font-weight: 400;
    margin: 0;
    margin-bottom: 0.75rem;
    user-select: none;
`

const PostRelationImage = styled.img`
    height: 200px;
    border-radius: 15px;
    margin-bottom: 15px;
    pointer-events: none;
    user-select: none;
    margin-right: 5px;

    @media (max-width: 1200px) {
        margin-left: none;
        height: auto;
        width: 100%;
        margin-top: 20px;
    }
`

const PostRelationTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--color-accent);
    margin: 0;
    padding: 0;
    user-select: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: max-content;
    gap: 0.5rem;
`

const PostRelationType = styled.div`
    background-color: var(--color-background);
    color: var(--color-quaternary-darker);
    padding: 0.5rem 0.7rem;
    border-radius: 5px;
    font-size: 0.8rem;
    max-width: max-content;
    display: inline-block;
    user-select: none;
`

const PostRelationDateYear = styled.p`
    font-size: 1rem;
    font-weight: 400;
    color: var(--color-quaternary-darker);
    margin: 0;
    padding: 0;
    user-select: none;
`

const PostRelationSubFlex = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
`

const PostRelationDescription = styled.p`
    font-size: 1.25rem;
    font-weight: 400;
    color: var(--color-quaternary);
    margin-top: 15px;
    margin-bottom: 15px;
    padding: 0;
`

const PostRelationMoreInfo = styled.span`
    font-size: 1rem;
    font-weight: 400;
    color: var(--color-accent);
    text-decoration: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
    user-select: none;
`

interface PostRelationDisplayProps {
    post: Partial<Post> & Partial<Project>
}

const PostRelationDisplay = ({ post }: PostRelationDisplayProps) => {
    return (
        <PostRelationWrapper>
            <PostRelationHeader>In Relation</PostRelationHeader>
            <Link href={`/${post.date ? "post" : "project"}/${post.slug}`}>
                <PostRelationFlex>
                    <PostRelationImage
                        src={post.coverImage!}
                        alt={post.title}
                    />
                    <PostRelationSubFlex>
                        <PostRelationType>
                            {post.date ? "Post" : "Project"}
                        </PostRelationType>
                        <PostRelationTitle>{post.title}</PostRelationTitle>
                        <PostRelationDateYear>
                            {post.date
                                ? `${formatDistanceToNow(
                                      new Date(post.date)
                                  )} ago · ${(post as any).readingTime}`
                                : post.years?.join(", ")}
                        </PostRelationDateYear>
                        <PostRelationDescription>
                            {post.description}
                        </PostRelationDescription>
                        <PostRelationMoreInfo>More Info »</PostRelationMoreInfo>
                    </PostRelationSubFlex>
                </PostRelationFlex>
            </Link>
        </PostRelationWrapper>
    )
}

export default PostRelationDisplay
