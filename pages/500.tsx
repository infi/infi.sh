import styled from "styled-components"
import Navbar from "../components/Navbar"

const ServerErrorWrapper = styled.div`
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

const ServerErrorStatusCode = styled.h1`
    font-size: 5rem;
    font-weight: 400;
    color: #9179F0;
    margin: 0;
`

const ServerErrorMessage = styled.h2`
    font-size: 2rem;
    font-weight: 400;
    color: #CAB8FD;
    margin: 0;
`

const ServerError = () => {
    return (
        <>
            <Navbar />
            <ServerErrorWrapper>
                <div>
                    <ServerErrorStatusCode>500</ServerErrorStatusCode>
                    <ServerErrorMessage>An internal server error occured.</ServerErrorMessage>
                </div>
            </ServerErrorWrapper>
        </>
    )
}

export default ServerError