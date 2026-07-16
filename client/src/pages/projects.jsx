import styled from "styled-components";
import { Sheet } from 'react-modal-sheet';
import { useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import handle from "../assets/sheet-handle-bump.svg";


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

const SheetHeader = styled(Sheet.Header)`
  background: transparent !important;
`;

const SheetContainer = styled(Sheet.Container)`
  background: transparent !important;
  box-shadow: none !important;
`;

const SheetContent = styled(Sheet.Content)`
  background: transparent !important;
`;

const SheetBackdrop = styled(Sheet.Backdrop)`
    margin-top: 5vh;
    background-color: #c4c0b5!important;
`;

const snapPoints = [0, 0.1, 0.5, 0.9];

//the website visual is here
const Projects = () => {
    const [isOpen, setOpen] = useState(false);
    const [hasBeenDismissed, setHasBeenDismissed] = useState(false);
    const sheetRef = useRef(null);
    const snapTo = (i) => sheetRef.current?.snapTo(i);
    const { scrollYProgress } = useScroll();

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (hasBeenDismissed) return;
        if (latest > 0.3) {
            setOpen(true);
            if(latest>0.6){
                snapTo(2);
            }
        } else {
            snapTo(1);
        }
    });
return (
    <div>
        <ProjectTitle>
            <h1>Projects</h1>
            <p style={{width: "60vw", textAlign: "left" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </ProjectTitle>
        <ProjectsGallery>
            <ProjectsSquare style={{ marginTop: "0vh", marginLeft: "80vw"}} $duration={3 + Math.random() * 2} $delay={Math.random() * 2}>
            </ProjectsSquare>
            <ProjectsSquare style={{ marginTop: "5vh", marginLeft: "10vw"}} $duration={3 + Math.random() * 2} $delay={Math.random() * 2}>
            </ProjectsSquare>
            <ProjectsSquare style={{ marginTop: "15vh", marginLeft: "40vw"}} $duration={3 + Math.random() * 2} $delay={Math.random() * 2}>
            </ProjectsSquare>
            <ProjectsSquare style={{ marginTop: "50vh", marginLeft: "20vw"}} $duration={3 + Math.random() * 2} $delay={Math.random() * 2}>
            </ProjectsSquare>
            <ProjectsSquare style={{ marginTop: "65vh", marginLeft: "50vw"}} $duration={3 + Math.random() * 2} $delay={Math.random() * 2}>
            </ProjectsSquare>
            <ProjectsSquare style={{ marginTop: "55vh", marginLeft: "75vw"}} $duration={3 + Math.random() * 2} $delay={Math.random() * 2}>
            </ProjectsSquare>
            <ProjectsSquare style={{ marginTop: "90vh", marginLeft: "30vw"}} $duration={3 + Math.random() * 2} $delay={Math.random() * 2}>
            </ProjectsSquare>
        </ProjectsGallery>
        <button onClick={() => setOpen(true)}>Open sheet</button>
      <Sheet
        disableScrollLocking
        ref={sheetRef}
        isOpen={isOpen}
        onClose={() => {
            setOpen(false);
            setHasBeenDismissed(true);
        }}
        initialSnap={1}
        snapPoints={snapPoints}
        onSnap={(snapIndex) =>
          console.log('Current snap point index:', snapIndex)
        }
      >
        <SheetContainer>
                <SheetHeader unstyled>
                <img 
                    src={handle} 
                    alt="handle" 
                    draggable={false}
                    style={{ height: "5vh", display: "block", pointerEvents: "none" }} 
                />
                </SheetHeader>
                <SheetContent>
                    <button onClick={() => {
                            snapTo(0);
                            setHasBeenDismissed(true);
                        }}>Snap to index 0</button>
                    <button onClick={() => snapTo(1)}>Snap to index 1</button>
                    <button onClick={() => snapTo(2)}>Snap to index 2</button>
                </SheetContent>
            <SheetBackdrop />
        </SheetContainer>
      </Sheet>
    </div>
    );
};

export default Projects;