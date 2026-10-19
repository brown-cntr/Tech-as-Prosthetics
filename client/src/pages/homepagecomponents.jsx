import styled from "styled-components";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const MainArea = styled.div`
    display: flex;
    min-height: 100vh;
    padding-top: 5%;
    box-sizing: border-box;
    position: relative;
`;

export const MainTitleArea = styled.div`
    max-width: 25%;
    margin-right: 20%;
    padding-top: 5%;
    margin-left: -7vw;
`;
export const MainTitle = styled.h1`
    font-size: 3rem;
    font-weight: 500;
    text-align: left;
    line-height: 1.1;
`;
export const MainImageArea = styled.div`
    max-width: 80%;
    align-items: left;
`;
export const MainImage = styled.img`
    width: 100%;
    align-items: left;
    margin-bottom: -30vh;
`;

export const PeopleDrawing = styled.div`
    width: 100%;
    margin-bottom: -30vh;
    color: var(--ink);
    line-height: 0;

    svg {
        width: 100%;
        height: auto;
        display: block;
    }
`;

export const PathShape = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 295px;
    overflow: hidden;
    z-index: 0;
    color: var(--surface);
    line-height: 0;
    pointer-events: none;

    svg {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 1440px;
        height: 295px;
        overflow: visible;
        display: block;
    }
`;

export const SidePeople = styled.div`
    position: absolute;
    right: 0%;
    top: 38%;
    color: var(--ink);
    line-height: 0;

    svg {
        width: 781px;
        height: 520px;
        display: block;
    }
`;

export const LearnMoreButton = styled.button`
    color: var(--cta-text);
    background-color: var(--cta-bg);
    border: none;
    border-radius: 8px;
    width: 66.666%;
    display: block;
    cursor: pointer;
    transition: transform 0.1s ease, background-color 0.1s ease;
    &:hover {
        background-color: var(--cta-bg-active);
    }
    &:active {
        background-color: var(--cta-bg-active);
        transform: scale(0.97);
    }
    &:focus-visible {
        outline: 3px solid var(--focus-ring);
        outline-offset: 2px;
    }
`;

export const ProjectsArea = styled.div`
    display: flex; 
    align-items: center;
    min-height: 120vh;
    padding-top: calc(0.5% + 5vh);
    background-color: var(--surface);
`;

export const ProjectsPart = styled.div`
    display: flex; 
    height: 20vh;
    background-color: var(--surface);
    margin-left: 5vw;
    margin-right: 1vw;
    padding-bottom: 3vh;
`;

export const ProjectsPartTitle = styled.div`
    text-align: left;
    width: 40%;
`;

export const HomePageTitles = styled.div`
    width: 50vw;
`;

export const ProjectsSquare = styled.div`
    width: 20vh;
    height: 20vh;
    background-color: var(--block);
`;

export const ProjectsCircle = styled.div`
    width: 20vh;
    height: 20vh;
    border-radius: 50%;
    background-color: var(--block);
    margin-left: 15vw;  
    margin-right: 2%;  
`;

export const ProjectsDecorative = styled.div`
    display: flex; 
    align-items: center;
    width: 40%;
`;

export const ViewAllProjectsButton = styled.button`
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 1%;
    padding-bottom: 1%;
    margin-left: 9vw;
    margin-right: 2%;
    background-color: var(--nav);
    color: var(--muted);
    align-self: center;  
    border: 5px solid var(--muted);
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



export const HrTrimmed = styled.hr`
    max-width: 80%;
    border: none; 
    height: 0.5vh; 
    background-color: var(--rule);
    margin: 0 auto;
`;


export const FadeSection = ({ children }) => {
const ref = useRef(null);
const reduceMotion = useReducedMotion();
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "start start", "end end", "end start"],
});
const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  if (reduceMotion) {
    return <div ref={ref}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ opacity }}>
      {children}
    </motion.div>
  );
};