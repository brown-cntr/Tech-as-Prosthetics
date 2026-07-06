import styled from "styled-components";

export const MainArea = styled.div`
    display: flex;
    height: 80vh;
    align-items: center;
`;

export const MainTitle = styled.h1`
    font-size: 4rem;
    font-weight: 800;
    text-align: left;
    max-width: 600px;
    line-height: 1.1;
    margin-left: 30px;
`;
export const MainImage = styled.img`
    max-width: 600px;
`;

export const DigitalWorkshopsArea = styled.div`
    display: flex
    align-items: center;
`;
export const DigitalWorkshopTitle = styled.div`
    text-align: center;
`;

export const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 19px;
`;

export const GridContainer = styled.div`
    display: grid;
    height: 50rem;
    grid-auto-columns: 33%;
    grid-auto-flow: column;
    overflow-x: scroll;
    gap: 1.3rem;
    margin-top: 1.3rem;
`;

export const HomeContainer = styled.div`
    padding-top: 0.5rem;
`;

export const Card = styled.div`
    background: #b2b2b2ff;
    height: 250px;
    width: 250px;
    overflow: hidden;
`;

export const CardDescription = styled.p`
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: 50% 50%;
`;

export const CardImage = styled.img`
    width: 80%;
    height: 80%;
    object-fit: cover;
    object-position: 50% 50%;
`;