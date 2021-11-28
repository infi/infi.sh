import styled from "styled-components"

const LatestGridWrapper = styled.div`
    max-width: 75vw;
    margin: 30px auto;
`

const LatestGridHeading = styled.h1`
    font-size: 2.5rem;
    font-weight: 300;
    color: #9179F0;
    user-select: none;
`

const Items = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;

    @media (max-width: 1400px) {
        grid-template-columns: 1fr;
    }
`

const ItemsCompact = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;

    @media (max-width: 1400px) {
        grid-template-columns: 1fr;
    }
`

const AllItemsLink = styled.a`
    text-decoration: none;
    color: #9179F0;
    font-size: 1.2rem;
    font-weight: 300;
    margin-left: 20px;
    user-select: none;
`

type Props = {
    items: { slug: any }[],
    component: any,
    heading: string,
    useCompactColumns?: boolean,
    allItemsLink?: string,
}

const LatestGrid = ({ items, component: Component, heading, useCompactColumns, allItemsLink }: Props) => {
    return (
        <LatestGridWrapper>
            <LatestGridHeading>
                {heading}
                {allItemsLink && (
                    <AllItemsLink href={allItemsLink}>
                        <span>See all »</span>
                    </AllItemsLink>
                )}
            </LatestGridHeading>
            {useCompactColumns ? (
                <ItemsCompact>
                    {items.map((data: any) => (
                        <Component data={data} key={data?.slug} />
                    ))}
                </ItemsCompact>
            ) : (
                <Items>
                    {items.map((data: any) => (
                        <Component data={data} key={data?.slug} />
                    ))}
                </Items>
            )}
        </LatestGridWrapper>
    )
}

export default LatestGrid
