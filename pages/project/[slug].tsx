import { getAllProjects, getProjectBySlug } from '../../lib/projects'
import markdownToHtml from '../../lib/markdown'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import Head from "next/head"
import LatestGrid from '../../components/display/LatestGrid'
import LatestProjectDisplay from '../../components/display/LatestProjectDisplay'
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

const ProjectTitle = styled.h1`
    max-width: 1000px;
    text-align: center;
    color: #9179F0;
    font-size: 2.5rem;
    font-weight: 400;
`

const ProjectQuickInfo = styled.div`
    max-width: 800px;
    text-align: center;
    color: #CAB8FD;
    font-size: 1.2rem;
    font-weight: 400;
`

const ProjectDescription = styled.div`
    max-width: 800px;
    font-size: 1.2rem;
    font-weight: 400;
    margin-top: 1.5rem;
    text-align: center;
`

const ProjectContent = styled.div`
    max-width: 60vw;
    margin: 0 auto;
    padding-top: 2rem;

    @media (max-width: 768px) {
        max-width: 90vw;
    }
`

const TagSpace = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`

const Tag = styled.div`
    background-color: #CAB8FD;
    color: #28202F;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    font-size: 1.2rem;
`

const SeeMoreButtons = styled.div`
    display: flex;
    gap: 0.5rem;
`

const SeeMoreButton = styled.a`
    background-color: #28202f;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    font-size: 1.2rem;
`

const Project = ({ project, latestProjects }: { project: any, latestProjects: any }) => {
    const router = useRouter()

    if (!router.isFallback && !project?.slug) {
        return (
            <>
                <Head>
                    <meta property="og:title" content="Project not found" />
                    <meta property="og:image" content="https://infi.sh/opengraph.png" />
                    <meta property="og:description" content="Sorry for that" />
                </Head>
                <Navbar />
                <ProjectHeader>
                    <Anime easing={'easeOutElastic(1, .8)'} translateY={[30, 0]} opacity={[0, 1]} delay={400}>
                        <ProjectTitle>Project not found</ProjectTitle>
                        <ProjectQuickInfo>Sorry for that</ProjectQuickInfo>
                    </Anime>
                </ProjectHeader>
            </>
        )
    }

    return (
        <>
            <Head>
                <meta property="og:title" content={project.title} />
                <meta property="og:image" content={project.ogImage ?? "https://infi.sh/opengraph.png"} />
                <meta property="og:description" content={project.description} />
            </Head>
            <Navbar />
            <ProjectHeader>
                <Anime easing={'easeOutElastic(1, .8)'} translateY={[30, 0]} opacity={[0, 1]} delay={400}>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectQuickInfo>{project.years?.join(", ")}</ProjectQuickInfo>
                    <ProjectDescription>{project.description}</ProjectDescription>
                </Anime>
            </ProjectHeader>
            <ProjectContent className="markdown-dynamic-content">
                <Anime easing={'easeOutElastic(1, .8)'} translateY={[30, 0]} opacity={[0, 1]} delay={500}>
                    <h2>Tech</h2>
                    <TagSpace>
                        {project.tech?.map((tech: string) => (
                            <Tag key={tech}>{tech}</Tag>
                        ))}
                    </TagSpace>
                    <h2>About</h2>
                    <div dangerouslySetInnerHTML={{ __html: project.content }} />
                    <h2>Categories</h2>
                    <TagSpace>
                        {project.categories.map((category: string) => (
                            <Tag key={category}>{category}</Tag>
                        ))}
                    </TagSpace>
                    {project.buttons?.length > 0 ? <>
                        <h2>See more</h2>
                        <SeeMoreButtons>
                            {project.buttons.map((button: { link: string, text: string }) => (
                                <SeeMoreButton key={button.link} href={button.link}>{button.text}</SeeMoreButton>
                            ))}
                        </SeeMoreButtons>
                    </> : null}
                </Anime>
            </ProjectContent>
            <Anime easing={'easeOutElastic(1, .8)'} translateY={[30, 0]} opacity={[0, 1]} delay={700}>
                <LatestGrid
                    items={latestProjects}
                    component={LatestProjectDisplay}
                    heading={"Latest Projects"}
                    useCompactColumns={true}
                    allItemsLink={"/projects"} />
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
    const project = getProjectBySlug(params.slug, [
        'title',
        'description',
        'coverImage',
        'content',
        'years',
        'ogImage',
        'slug',
        'tech',
        'categories',
        'buttons',
    ])
    const content = await markdownToHtml(project.content || '# no content')

    const allProjects = getAllProjects(["title", "slug", "coverImage", "description"])

    return {
        props: {
            project: {
                ...project,
                content,
            },
            latestProjects: allProjects.slice(0, 4),
        },
    }
}


export const getStaticPaths = async () => {
    const projects = getAllProjects(["slug"])

    return {
        paths: projects.map((project) => {
            return {
                params: {
                    slug: project.slug,
                },
            }
        }),
        fallback: false,
    }
}

export default Project