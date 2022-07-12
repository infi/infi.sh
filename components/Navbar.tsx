import styled from "styled-components"
import dynamic from "next/dynamic"
import Link from "next/link"
const Anime = dynamic(() => import('react-anime'), { ssr: false })


const NavbarWrapper = styled.nav`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    position: absolute;
    top: 0;
`

const NavbarBrand = styled.span`
    font-size: 1.5rem;
    font-weight: 700;
    user-select: none;
    cursor: pointer;
    transition: color .2s ease-in-out;
    
    :hover {
        color: var(--color-tertiary);
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
            <Anime easing={'easeOutElastic(1, .8)'} translateY={[10, 0]} opacity={[0, 1]} delay={50}>
                <NavbarLeft>
                    <NavbarLink href="/">
                        <NavbarBrand>Infi</NavbarBrand>
                    </NavbarLink>
                </NavbarLeft>
            </Anime>
        </NavbarWrapper>
    )
}

export default Navbar