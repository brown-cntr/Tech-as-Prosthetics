import { Sheet } from 'react-modal-sheet';
import { useState, useRef } from 'react';
import { useScroll, useMotionValueEvent } from "framer-motion";
import handle from "../assets/sheet-handle-bump.svg";
import cat1 from "../assets/cat1.png";
import cat2 from "../assets/cat2.png";
import cat3 from "../assets/cat3.png";
import cat4 from "../assets/cat4.png";
import cat5 from "../assets/cat5.png";
import {
    Card,
    CardDescription,
    CardImage,
    ProjectTitle,
    ProjectsSquare,
    ProjectsGallery,
    SheetHeader,
    SheetContainer,
    SheetContent,
    GridContainer,
    Gallery,
} from "./projectscomponents";
import { HandleButton } from './Projectscomponents';
import arrowUp from "../assets/up-arrow-icon.svg";

const allProjects = [
  {
    to: "workshops/cat1",
    imgSrc: cat1,
    alt: "img1",
    description: "Great Project",
    className: "grid-one",
  },
  {
    to: "workshops/cat2",
    imgSrc: cat2,
    alt: "img2",
    description: "Amazing Project",
    className: "grid-two",
  },
  {
    to: "workshops/cat3",
    imgSrc: cat3,
    alt: "img3",
    description: "SuperDuper Project",
    className: "grid-three",
  },
  {
    to: "workshops/cat4",
    imgSrc: cat4,
    alt: "img4",
    description: "OMG Project",
    className: "grid-four",
  },
    {
    to: "workshops/cat4",
    imgSrc: cat5,
    alt: "img5",
    description: "ProjiProject",
    className: "grid-five",
  },
];

const snapPoints = [0, 0.1, 0.5, 0.9];

//the website visual is here
const Projects = () => {

    const gridRef = useRef();

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
                    >                
                        <HandleButton>
                            <img 
                                src={arrowUp} 
                                alt="arrow" 
                                draggable={false}
                                style={{ height: "5vh", display: "block", pointerEvents: "none" }} 
                            />         
                        </HandleButton>  
                    </img>
                    <div style={{ height: "5vh", background: "#9E9A90" }} >
                        
                    </div>
                </SheetHeader>
                <SheetContent>
                    <Gallery>
                        <button onClick={() => {
                                snapTo(0);
                                setHasBeenDismissed(true);
                            }}>Snap to index 0</button>
                        <button onClick={() => snapTo(1)}>Snap to index 1</button>
                        <button onClick={() => snapTo(2)}>Snap to index 2</button>
                        <GridContainer ref={gridRef}>
                            {allProjects.map((project) => (
                                <Card key={project.to}>
                                    <CardImage src={project.imgSrc} alt={project.alt} />
                                    <CardDescription>{project.description}</CardDescription>
                                </Card>
                                ))}
                        </GridContainer>
                    </Gallery>
                </SheetContent>
        </SheetContainer>
      </Sheet>
    </div>
    );
};

export default Projects;