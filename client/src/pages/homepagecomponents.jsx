import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const MainArea = styled.div`
    display: flex;
    min-height: 100vh;
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
    min-height: 100vh;

`;
export const DigitalWorkshopTitle = styled.div`
    text-align: center;
    margin-left: 10 auto; 
    margin-right: 10 auto;
`;

export const DigitalWorkshopExplanation = styled.div`
    margin-top: 20px;
    text-align: left;
    margin-left: 200px;
    max-width: 800px;
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