import styled from "styled-components"
import { ChevronDown } from "@styled-icons/boxicons-regular"
import dynamic from 'next/dynamic'
/*
 * needed because Anime needs to have
 * access to client-side global objects like window and document
 */
const Anime = dynamic(() => import('react-anime'), { ssr: false })

const IntroductionWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: #28202F;
    color: #9179F0;
    cursor: default;
    flex-direction: column;
`

const Introduction = styled.div`
    min-width: 75vw;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column;
        min-height: 25vh;
    }
`

const NameIntroduction = styled.div`
    font-weight: 300;
    font-size: 3rem;
`

const EmphasizedNameIntroduction = styled(NameIntroduction)`
    font-weight: 900;
    color: #CAB8FD;
`

const GitHubSection = styled.div`
    font-weight: 400;
    font-size: 1.5rem;
    color: #AD96DE;
    text-align: right;
`

const GitHubLink = styled.a`
    color: #9179F0;
    text-decoration: none;
    display: block;
`

const ScrollChevron = styled(ChevronDown)`
    height: 50px;
    color: #9883ee;
    margin-bottom: 10px;
    cursor: pointer;

    @media (max-width: 768px) {
        display: none;
    }
`

const InitialIntroduction = () => {
    return (
        <IntroductionWrapper>
            <Introduction>
                <Anime easing={'easeOutElastic(1, .8)'} translateY={[30, 0]} opacity={[0, 1]} delay={50}>
                    <NameIntroduction>
                        Hello.
                        <Anime easing={'easeOutElastic(1, .8)'} translateY={[30, 0]} opacity={[0, 1]} delay={100}>
                            <EmphasizedNameIntroduction>
                                I'm Infi.
                            </EmphasizedNameIntroduction>
                        </Anime>
                    </NameIntroduction>
                </Anime>
                <Anime easing={'easeOutElastic(1, .8)'} translateY={[30, 0]} opacity={[0, 1]} delay={500}>
                    <GitHubSection>
                        <GitHubLink
                            href="https://github.com/infi"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            github.com/infi »
                        </GitHubLink>
                        <Anime easing={'easeOutElastic(1, .8)'} translateY={[30, 0]} opacity={[0, 1]} delay={510}>
                            or scroll down
                        </Anime>
                    </GitHubSection>
                </Anime>
            </Introduction>
            <Anime easing={'easeOutExpo'} translateY={[100, 0]} opacity={[0, 1]} delay={1000}>
                <ScrollChevron
                    onClick={() => {
                        window.scrollTo({
                            top: window.innerHeight,
                            behavior: 'smooth'
                        })
                    }}
                />
            </Anime>
        </IntroductionWrapper >
    )
}

export default InitialIntroduction