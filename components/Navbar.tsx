import styled from "styled-components"
import Link from "next/link"
import Lottie from "lottie-react"
import navbarJson from "../animations/navbar.json"

const NavbarWrapper = styled.nav`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    padding-left: 0;
    position: absolute;
    top: 0;
`

const NavbarBrand = styled.div`
    width: 5rem;
    cursor: pointer;
    transition: filter .1s ease-in-out;
    filter: none;

    :hover {
        filter: brightness(80%);
    }

    :active {
        filter: brightness(70%);
    }
`

const NavbarLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`

const NavbarLink = styled(Link)`
    :link,
    :visited {
        color: var(--color-foreground);
        text-decoration: none;
    }
`

const Navbar = () => {
    return (
        <NavbarWrapper>
            <NavbarLeft>
                <NavbarLink href="/">
                    <NavbarBrand>
                        <Lottie animationData={navbarJson} loop={false} />
                    </NavbarBrand>
                </NavbarLink>
            </NavbarLeft>
        </NavbarWrapper>
    )
}

export default Navbar