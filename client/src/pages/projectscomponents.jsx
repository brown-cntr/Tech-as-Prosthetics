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

export const CardDescription = styled.p`
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: 50% 50%;
`;

export const CardImage = styled.img`
    width: 100%;
    height: 70%;
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
`;

export const SheetContainer = styled(Sheet.Container)`
  background: transparent !important;
  box-shadow: none !important;
`;

export const SheetContent = styled(Sheet.Content)`
  background: transparent !important;
`;

export const GridContainer = styled.div`
    width: 55vw;
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
`;
