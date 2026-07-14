import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const MainArea = styled.div`
    display: flex;
    min-height: 100vh;
    padding-top: 10%;
    box-sizing: border-box;
`;

export const MainTitleArea = styled.div`
    max-width: 25%;
    margin-right: 20%;
    margin-left: 5%;
`;
export const MainTitle = styled.h1`
    font-size: 4rem;
    font-weight: 500;
    text-align: left;
    max-width: 600px;
    line-height: 1.1;
`;
export const MainImageArea = styled.div`
    max-width: 35%;
    align-items: left;
    margin-left: 15%;
`;
export const MainImage = styled.img`
    width: 100%;
    height: 60%;
`;

export const LearnMoreButton = styled.button`
    padding: clamp(6px, 1vw, 12px) clamp(24px, 4vw, 48px);
    color: white;
    background-color: #b09cc4;
    border: none;
    border-radius: 8px;
    width: 66.666%;
    display: block;
    cursor: pointer;
    transition: transform 0.1s ease, background-color 0.1s ease;
    &:active {
        background-color: #8f7aa8;
        transform: scale(0.97);
    }
`;

export const ProjectsArea = styled.div`
    display: flex; 
    align-items: center;
    min-height: 100vh;
    padding-top: 0.5%;
    background-color: #E6E3DA;
`;

export const ProjectsPart = styled.div`
    display: flex; 
    min-height: 17.5%;
    win-width: 75%;
    background-color: #E6E3DA;
    margin-left: 5vw;
    margin-right: 1vw;
`;

export const ProjectsPartTitle = styled.div`
    text-align: left;
    width: 40%;
`;

export const HomePageTitles = styled.div`
    width: 40vw;
`;

export const ProjectsSquare = styled.div`
    width: 20vh;
    height: 20vh;
    background-color: #c4c0b5;
`;

export const ProjectsCircle = styled.div`
    width: 20vh;
    height: 20vh;
    border-radius: 50%;
    background-color: #c4c0b5;
    margin-left: 15vw;  
    margin-right: 2%;  
`;

export const ProjectsDecorative = styled.div`
    display: flex; 
    align-items: center;
    min-height: 70vh;
    min-width: 25%;
    background-color: #C4C0B5;
`;

export const ViewAllProjectsButton = styled.button`
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 1%;
    padding-bottom: 1%;
    margin-left: 20vw;
    margin-right: 2%;
    color: white;
    background-color: #E6E3DA;
    color: #7B6C55;
    align-self: center;  
    border: 5px solid #7B6C55;
    border-radius: 20px;
    display: block;
    cursor: pointer;
    transition: transform 0.1s ease, background-color 0.1s ease;
    &:active {
        transform: scale(0.97);
    }
`;


export const DigitalWorkshopsArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    position: relative;
`;

export const DigitalWorkshopTitle = styled.div`
    text-align: center;
    margin-left: 10 auto; 
    margin-right: 10 auto;
`;

export const DigitalWorkshopExplanation = styled.div`
    text-align: left;
    min-width: 20vh;
    margin-right: 5%;
`;

export const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 19px;
`;

export const GridContainer = styled.div`
    display: grid;
    grid-auto-columns: 33%;
    grid-auto-flow: column;
    overflow-x: scroll;
    gap: 1.3rem;
    margin-top: 1.3rem;
    padding: 2rem 0;
    ref={gridRef}
`;

export const HomeContainer = styled.div`
    padding-top: 0.5rem;
`;

export const Card = styled.div`
    background: #b2b2b2ff;
    height: 250px;
    width: 250px;
    overflow: hidden;
    transition: transform 0.2s ease;
    &:hover {
    transform: scale(1.1);
    z-index: 10;
  }
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

export const HrTrimmed = styled.hr`
    max-width: 80%;
    border: none; 
    height: 0.5vh; 
    background-color: #333;
    margin: 0 auto;
`;


export const FadeSection = ({ children }) => {
  const ref = useRef(null);
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "start start", "end end", "end start"],
});
const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  return (
    <motion.div ref={ref} style={{ opacity }}>
      {children}
    </motion.div>
  );
};