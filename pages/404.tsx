import styled from "styled-components"
import Navbar from "../components/Navbar"

const NotFoundWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        text-align: center;
    }
`

const NotFoundStatusCode = styled.h1`
    font-size: 5rem;
    font-weight: 400;
    color: var(--color-accent);
    margin: 0;
`

const NotFoundMessage = styled.h2`
    font-size: 2rem;
    font-weight: 400;
    color: var(--color-quaternary);
    margin: 0;
`

const NotFound = () => {
    return (
        <>
            <Navbar />
            <NotFoundWrapper>
                <div>
                    <NotFoundStatusCode>404</NotFoundStatusCode>
                    <NotFoundMessage>Page not found. Maybe next time?</NotFoundMessage>
                </div>
            </NotFoundWrapper>
        </>
    )
}

export default NotFound