import styled from "styled-components";


export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 5vw;
    row-gap: 10vh;
    margin: 5%;
    place-items: center;
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 5%;
    justify-content: center;
    align-items: center;
   
`;

export const CardName = styled.h5`
    object-fit: cover;
    object-position: 50% 50%;
    margin-top: 10%;
`;

export const CardImage = styled.img`
    width: 70%;
    height: 70%;
`;


export const CardText = styled.p`
`;

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;


export const TopText = styled.div`
    display: flex;
    color: #635371;
    margin-top: 10%;
    margin-left: 5%;
    flex-direction: column;
`;


export const TopLeftText = styled.div`
    font-size: 2vw;
    text-align: left;
`;

export const TopRightText = styled.div`
    font-size: 3vw;
    text-align: left;
`;

export const OtherTopText = styled.div`
    margin-top: 15%;
    font-size: 1.2vw;
    color: #000000;
    text-align: left;
    margin-right: 5%;
`;