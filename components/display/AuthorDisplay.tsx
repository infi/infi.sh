import styled from "styled-components"

const AuthorDisplayWrapper = styled.div`
    display: flex;
    align-items: center;
    user-select: none;
`

const AuthorImage = styled.img`
    border-radius: 50%;
    width: 50px;
    height: 50px;
    object-fit: cover;
    object-position: center;
    margin-right: 15px;
    pointer-events: none;
`

const AuthorName = styled.p`
    font-size: 1.2rem;
    font-weight: 400;
`

type AuthorDisplayProps = {
    name: string,
    imageUrl: string,
}

const AuthorDisplay = (props: AuthorDisplayProps) => {
    return (
        <AuthorDisplayWrapper>
            <AuthorImage src={props.imageUrl} />
            <AuthorName>{props.name}</AuthorName>
        </AuthorDisplayWrapper>
    )
}

export default AuthorDisplay