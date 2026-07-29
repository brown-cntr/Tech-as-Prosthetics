import styled from "styled-components";

export const GridContainer = styled.div`
    width: 60vw;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    row-gap: 5vh;
    column-gap: 3vw;
    justify-content: space-evenly;
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 5%;
    justify-content: center;
`;

export const CardName = styled.h5`
    object-fit: cover;
    object-position: 50% 50%;
`;

export const CardImage = styled.img`
    width: 100%;
    height: 50%;
    border-radius: 50%;
`;

export const CardText = styled.p`
`;

export const TopText = styled.div`
    display: flex;
    color: #635371;
    padding: 5%;
    flex-direction: column;
    justify-content: flex-start;
`;


export const TopLeftText = styled.div`
    font-size: 2vw;
`;

export const TopRightText = styled.div`
    font-size: 3vw;
`;