import { getAllProjects } from '../lib/projects'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import Head from "next/head"
import LatestGrid from '../components/display/LatestGrid'
import LatestProjectDisplay from '../components/display/LatestProjectDisplay'
const Anime = dynamic(() => import('react-anime'), { ssr: false })

const ProjectHeader = styled.div`
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
                <meta property="og:image" content="https://infi.sh/opengraph.png" />
                <meta property="og:description" content="A list of most of Infi's projects." />
            </Head>
            <Navbar />
            <ProjectHeader>
                <Anime easing={'easeOutElastic(1, .8)'} translateY={[30, 0]} opacity={[0, 1]} delay={400}>
                    <PageTitle>Projects</PageTitle>
                </Anime>
            </ProjectHeader>
            <ProjectContent className="markdown-dynamic-content">
                <Anime easing={'easeOutElastic(1, .8)'} translateY={[30, 0]} opacity={[0, 1]} delay={500}>
                    <LatestGrid component={LatestProjectDisplay} items={featuredProjects} heading="Featured Projects" />
                </Anime>
                <Anime easing={'easeOutElastic(1, .8)'} translateY={[30, 0]} opacity={[0, 1]} delay={600}>
                    <LatestGrid component={LatestProjectDisplay} items={projects} heading="Projects" useCompactColumns={true} />
                </Anime>
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