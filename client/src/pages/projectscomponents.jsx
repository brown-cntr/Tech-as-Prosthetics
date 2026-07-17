import styled from "styled-components";
import { Sheet } from 'react-modal-sheet';
import { useState } from 'react';
import { motion } from "framer-motion";

export const Card = styled.div`
    background: #FAF9F7;
    height: 45vh;
    width: 100%;
    overflow: hidden;
    transition: transform 0.2s ease;
    &:hover {
    transform: scale(1.1);
    z-index: 10;
  }
`;

export const CardTitle = styled.h6`
    object-fit: cover;
    object-position: 50% 50%;
    font-weight: bold;
`;

export const CardDescArea = styled.div`
    display: flex;
    padding-top: 1vh;
    padding-left: 1vw;
    padding-right: 1vw; 
`;

export const CardDescription = styled.p`
    object-fit: cover;
    object-position: 50% 50%;
    font-size: 0.7rem;
`;

export const CardImage = styled.img`
    width: 100%;
    height: 60%;
    object-fit: cover;
    object-position: 50% 50%;
`;

export const ProjectTitle = styled.div`
    margin-top: 20vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const RawProjectsSquare = styled(motion.div)`
    width: 20vh;
    height: 20vh;
    background-color: #c4c0b5;
    box-shadow: 0 15px 25px -10px rgba(0, 0, 0, 0.2);
`;

export const ProjectsSquare = (props) => {
    const [isHovered, setIsHovered] = useState(false);
    const { $duration, $delay, style, ...rest } = props;

    return (
        <div
            style={{ position: "absolute", width: "20vh", height: "20vh", ...style }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...rest}
        >
            <RawProjectsSquare
                animate={
                    isHovered
                        ? { scale: 1.1, x: 0, y: 0 }
                        : { scale: 1, x: [0, 6, -4, -8, 0], y: [0, -10, -14, -6, 0] }
                }
                transition={
                    isHovered
                        ? { duration: 0.15 }
                        : {
                            scale: { duration: 0.2 },
                            x: { duration: $duration || 3, delay: $delay || 0, repeat: Infinity, ease: "easeInOut" },
                            y: { duration: $duration || 3, delay: $delay || 0, repeat: Infinity, ease: "easeInOut" },
                          }
                }
            />
        </div>
    );
};

export const ProjectsGallery = styled.div`
    position: relative;
    padding-top: 5vh;
    width: 100%;
    height: 200vh;
`;

export const SheetHeader = styled(Sheet.Header)`
  background: transparent !important;
  position: relative;
`;

export const SheetContainer = styled(Sheet.Container)`
  background: transparent !important;
  box-shadow: none !important;
`;

export const SheetContent = styled(Sheet.Content)`
  background: transparent !important;
`;

export const GridContainer = styled.div`
    width: 60vw;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    row-gap: 5vh;
    column-gap: 3vw;
`;

export const Gallery = styled.div`
    display: flex;
    justify-content: center;
    background-color: #9E9A90!important;
    padding-top: 7vh;
`;

export const HandleButton = styled.button`
    padding: 0;
    border: 0;
    background: none;
    box-shadow: none;
    position: absolute;
    top: 15%;
    left: 21%;
    transform: translate(-15%, -21%);
`;


export const LearnMoreButton = styled.button`
    align-self: center;
    margin-left: 0.3vw;
    color: white;
    background-color: #b09cc4;
    border: none;
    border-radius: 8px;
    width: 90%;
    display: block;
    cursor: pointer;
    transition: transform 0.1s ease, background-color 0.1s ease;
    &:active {
        background-color: #8f7aa8;
        transform: scale(0.97);
    }
`;