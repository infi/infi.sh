import { getAllProjects } from '../lib/projects'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import Head from "next/head"
import LatestGrid from '../components/display/LatestGrid'
import LatestProjectDisplay from '../components/display/LatestProjectDisplay'

const ProjectHeader = styled.div`
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

const ProjectContent = styled.div`
    max-width: 60vw;
    margin: 0 auto;
    padding-top: 2rem;

    @media (max-width: 768px) {
        max-width: 90vw;
    }
`

const AllProjects = ({ projects, featuredProjects }: { projects: any, featuredProjects: any }) => {
    return (
        <>
            <Head>
                <meta property="og:title" content="Projects" />
                <meta property="og:image" content="https://infi.sh/api/opengraph/text?q=All%20Projects" />
                <meta property="og:description" content="A list for most of Infi's modern projects." />
            </Head>
            <Navbar />
            <ProjectHeader>
                <PageTitle>Projects</PageTitle>
            </ProjectHeader>
            <ProjectContent className="markdown-dynamic-content">
                <LatestGrid component={LatestProjectDisplay} items={featuredProjects} heading="Featured Projects" />
                <LatestGrid component={LatestProjectDisplay} items={projects} heading="Projects" useCompactColumns={true} />
            </ProjectContent>
        </>
    )
}

export const getStaticProps = async () => {
    const allProjects = getAllProjects(["title", "slug", "coverImage", "description", "featured"])

    return {
        props: {
            projects: allProjects,
            featuredProjects: allProjects.filter(project => project.featured).slice(0, 4)
        },
    }
}

export default AllProjects