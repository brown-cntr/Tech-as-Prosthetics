import { Sheet } from 'react-modal-sheet';
import { useState, useRef } from 'react';
import { useScroll, useMotionValueEvent } from "framer-motion";
import handle from "../assets/sheet-handle-bump.svg";
import { useNavigate } from 'react-router-dom';
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
import { HandleButton } from './projectscomponents';
import arrowUp from "../assets/up-arrow-icon.svg";
import { CardTitle } from './projectscomponents';
import { LearnMoreButton } from './projectscomponents';
import { CardDescArea } from './Projectscomponents';
import placeholderImage from "../assets/CNTR_logo_color.png";
import ropes from "../assets/ropes.webp";
import typewriter from "../assets/Typewriter 1.webp";

const allProjects = [
  {
    to: "workshops/cat1",
    imgSrc: placeholderImage,
    alt: "img1",
    title: "Incan Khipu",
    description: "loremipsum porjsdkjnfksd jkasdnffsj hdsfaj",
    className: "grid-one",
  },
  {
    to: "workshops/cat2",
    imgSrc: placeholderImage,
    alt: "img2",
    title: "Amazing Project",
    description: "loremipsum porjsdkjnfksd jkasdnffsj hdsfaj",
    className: "grid-two",
  },
  {
    to: "workshops/cat3",
    imgSrc: placeholderImage,
    alt: "img3",
    title: "SuperDuper Project",
    description: "loremipsum porjsdkjnfksd jkasdnffsj hdsfaj",
    className: "grid-three",
  },
  {
    to: "workshops/cat4",
    imgSrc: placeholderImage,
    alt: "img4",
    title: "OMG Project",
    description: "loremipsum porjsdkjnfksd jkasdnffsj hdsfaj",
    className: "grid-four",
  },
  {
    to: "workshops/cat5",
    imgSrc: placeholderImage,
    alt: "img5",
    title: "ProjiProject",
    description: "loremipsum porjsdkjnfksd jkasdnffsj hdsfaj",
    className: "grid-five",
  },
];

const snapPoints = [0, 0.1, 0.5, 0.9];


//the website visual is here
const Projects = () => {
    const navigate = useNavigate();
    const gridRef = useRef();
    const [isOpen, setOpen] = useState(false);
    const [hasBeenDismissed, setHasBeenDismissed] = useState(false);
    const sheetRef = useRef(null);
    const snapTo = (i) => sheetRef.current?.snapTo(i);
    const { scrollYProgress } = useScroll();
    const[isFlipped, setIsFlipped] = useState(false);
    const clickedButton = () => {
        if (!isFlipped){
             snapTo(3);
        } 
        else{
            snapTo(1); 
        } 
        setIsFlipped(!isFlipped)
    };

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (hasBeenDismissed) return;
        if (latest > 0.3) {
            setOpen(true);
            if(latest>0.4){
                snapTo(2);
            }
        } else {
            snapTo(1);
        }
    });
return (
    <div>
        <ProjectTitle>
            <h1>Experiences</h1>
            <p style={{width: "60vw", textAlign: "left" }}>Explore interactive experiences that uncover the people, practices, and ideas that have shaped the technologies we use today. From Inca khipu to the typewriter to the earliest visions of the computer, each experience invites you to encounter technological history through a different lens—and to reconsider whose contributions have been remembered, overlooked, or left out.</p>
        </ProjectTitle>
        <ProjectsGallery>
            <ProjectsSquare style={{ marginTop: "0vh", marginLeft: "80vw"}} $duration={3 + Math.random() * 2} $delay={Math.random() * 2}>
                                    <img 
                                    src={ropes} 
                                    alt="" 
                                    style={{ 
                                }} 
                                    />
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
                    <HandleButton onClick={() => clickedButton()}>
                        <img 
                                src={arrowUp} 
                                alt="arrow" 
                                draggable={false}
                                style={{ 
                                    height: "3vh", 
                                    display: "block", 
                                    pointerEvents: "none",
                                    transform: isFlipped ? "rotate(180deg)" : "rotate(0deg)",
                                    transition: "transform 0.3s ease"
                                }} 
                            />                 
                    </HandleButton>  
                    <div style={{ height: "5vh", background: "#9E9A90" }} >           
                    </div>
                </SheetHeader>
                <SheetContent>
                    <Gallery>
                        <GridContainer ref={gridRef}>
                            {allProjects.map((project) => (
                                <Card key={project.to}>
                                    <CardImage src={project.imgSrc} alt={project.alt} />
                                    <CardDescArea>
                                        <CardTitle>{project.title}</CardTitle>
                                        <CardDescription>{project.description}</CardDescription>
                                        <LearnMoreButton title="Learn More" 
                                        style={{ margin: "0 auto" }}
                                        onClick={() => navigate("/khipu")}>
                                         Learn More</LearnMoreButton>
                                    </CardDescArea>
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