import styled from "styled-components"
import { Project } from "../../lib/types"
import Link from "next/link"

const ProjectDisplay = styled.div`
    padding: 20px;
    border-radius: 15px;
    margin: 5px 0;
    background-color: var(--color-background-slightly-lighter);
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`

const ProjectTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--color-accent);
    margin: 0;
    padding: 0;
    user-select: none;
    cursor: pointer;
`

const ProjectYear = styled.p`
    font-size: 1rem;
    font-weight: 400;
    color: var(--color-quaternary-darker);
    margin: 0;
    padding: 0;
    user-select: none;
`

const ProjectDescription = styled.p`
    font-size: 1.25rem;
    font-weight: 400;
    color: var(--color-quaternary);
    margin-top: 15px;
    margin-bottom: 15px;
    padding: 0;
`

const ProjectMoreInfo = styled.span`
    font-size: 1rem;
    font-weight: 400;
    color: var(--color-accent);
    text-decoration: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
    user-select: none;
`

const ProjectCover = styled.img`
    border-radius: 15px;
    margin-bottom: 15px;
    pointer-events: none;
    user-select: none;
    height: auto;
    width: 100%;
    margin-top: 20px;
`

const LatestProjectDisplay = ({ data: item }: { data: Project }) => {
    return (
        <ProjectDisplay key={item.slug}>
            <div>
                <Link href={`/project/${item.slug}`}>
                    <ProjectTitle>{item.title}</ProjectTitle>
                </Link>
                <ProjectYear>{item.years?.join(", ")}</ProjectYear>
                <ProjectDescription>{item.description}</ProjectDescription>
                <Link href={`/project/${item.slug}`}>
                    <ProjectMoreInfo>More Info »</ProjectMoreInfo>
                </Link>
            </div>
            <ProjectCover src={item.coverImage} alt={item.title} />
        </ProjectDisplay>
    )
}

export default LatestProjectDisplay