import React, { useRef } from 'react';
import styled from "styled-components";
import { MainArea, MainTitle, MainImage, DigitalWorkshopsArea,
    DigitalWorkshopExplanation,
    FadeSection,
    MainTitleArea,
    MainImageArea,
    ProjectsArea,
    LearnMoreButton,
    ProjectsPart,
    ProjectsDecorative,
    ProjectsPartTitle,
    HomePageTitles} from "./homepagecomponents";
import mainPeople from "../assets/people_top_drawing.svg"
import rightPeople from "../assets/characters-bottom-right.svg";
import booksVector from "../assets/books.svg";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import path from "../assets/Path.svg";
import oldComputer from "../assets/First Computer bkg.svg";
import ropes from "../assets/ropes.webp";
import typewriter from "../assets/Typewriter 1.webp";
import bigLeftLady from "../assets/Face-illustration.webp";
import bigRightLady from "../assets/realRightLady-1.webp";
import purpleHill from "../assets/hillpurp.webp";
import fig7 from "../assets/Fig 7.svg";
import fig12 from "../assets/Fig 12.svg";
import fig13 from "../assets/Fig 13.svg";
import fig15 from "../assets/Fig 15.svg";
import fig19_2 from "../assets/Fig 19-2.svg";
import fig19 from "../assets/Fig 19.svg";


const Home = () => {
        const navigate = useNavigate();
        const gridRef = useRef();
        const handleGrid = (direction) => {
        if (direction === 'left') {
            gridRef ? (gridRef.current.scrollBy({
                            left: -window.innerWidth,
                            behavior: "smooth",
                            })) : null;
        } else {
            gridRef ? (gridRef.current.scrollBy({
                            left: window.innerWidth,
                            behavior: "smooth",
                            })) : null;
        }
            }
    return (
        <div>
            <FadeSection>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                >
                <img src={path} alt="path image" 
                        style={{ 
                            position: "absolute",
                            right: "0%",
                            top: "75%",
                            zIndex: 0 }} />
                <MainArea>
                    <MainImageArea>
                        <MainImage src={mainPeople} alt="decorative image" />
                        <div style={{ marginLeft: "15vw", width: "60%" }}  >
                            <p style={{ textAlign: "left" }}>Discover the overlooked histories of disabled, women, and gender-marginalized innovators whose ideas shaped the technologies we use every day.</p>
                            <LearnMoreButton title="Learn More" aria-label="Learn more about this purple button"
                            onClick={() => navigate("/about")}>
                            Learn More
                            </LearnMoreButton>
                        </div>
                    </MainImageArea>
                    <MainTitleArea>
                        <div style={{ width: "100%" }}>
                            <p style={{ fontStyle: "italic", textAlign: "left" }}>Technology Shaped By Different Paths</p>
                            <MainTitle>Technologies and/as Prosthetics</MainTitle>
                        </div>
                        <img src={rightPeople} alt="decorative image 2" 
                        style={{ 
                            position: "absolute",
                            right: "0%",
                            top: "38%" }} />
                    </MainTitleArea>
                </MainArea>
            </motion.div>
                <ProjectsArea style={{ marginTop: "5vh" }}>
                    <ProjectsDecorative>
                        <img src={oldComputer} alt="old computer" 
                        style={{ height: "100vh" }} />
                    </ProjectsDecorative>
                    <div> 
                        <ProjectsPart>
                                <HomePageTitles style={{ textAlign: "left" }}>
                                    <h1>Experiences</h1>
                                    <p>Explore interactive experiences that uncover the people, practices, and ideas that have shaped the technologies we use today.</p>
                                </HomePageTitles>
                        </ProjectsPart>
                        <div style={{ marginLeft: "5vw", marginBottom: "2vh", paddingBottom: "3vh" }}>
                            <LearnMoreButton title="View All Projects" style={{ height: "10vh", width: "20vw" }}
                                onClick={() => navigate("/projects")}>
                                View All Projects
                            </LearnMoreButton>
                        </div>
                        <ProjectsPart>
                            <img src={ropes}/>
                                <ProjectsPartTitle>
                                    <h2>The Incan Khipu</h2>
                                    <p>How can information be recorded without traditional writing forms?</p>
                                </ProjectsPartTitle>
                        </ProjectsPart>
                        <ProjectsPart>
                                <ProjectsPartTitle style={{ textAlign: "right", marginRight: "1rem", marginLeft: "28vw" }}>
                                    <h2>The Typewriter</h2>
                                    <p>Did you know the typewriter began as a technology of accessibility?</p>
                                </ProjectsPartTitle>
                                <img src={typewriter}/>
                        </ProjectsPart>
                        <ProjectsPart>
                                <ProjectsPartTitle>
                                    <h2>The First Computer</h2>
                                    <p>A computing system that existed first on paper.</p>
                                </ProjectsPartTitle>    
                        </ProjectsPart>                      
                    </div>
                </ProjectsArea>
            </FadeSection>
            <FadeSection>
            <DigitalWorkshopsArea>
                <div style={{ minWidth: "50%"}}>
                    <HomePageTitles style={{ marginLeft: "3rem",  textAlign: "left" }}>
                        <h1>Our Mission</h1>
                        <p>The history of technology is often told through stories of singular inventors and breakthrough machines. But technologies are also shaped by people whose needs, ideas, labor, and ingenuity have been overlooked, including disabled people, women, and gender-marginalized people.</p>
                        <p>Technologies and/as Prosthetics reimagines these histories through interactive, accessible experiences. We ask what becomes possible when we change not only the stories we tell, but the ways we encounter them.</p>
                    </HomePageTitles>
                    <img src={booksVector} alt="Stack of books" style={{ marginLeft: "-2.5vw"}}/>
                </div>
                <DigitalWorkshopExplanation>
                    <hr />
                    <h4>01. Who gets remembered?</h4>
                    <p>How have contributions to foundational technologies by women, nonbinary people, and disabled individuals been systematically obscured? </p>
                    <hr />
                    <h4>02. How does erasure happen?</h4>
                    <p>What social, institutional, and disciplinary structures determine whose work is recognized as technological—and whose is not?</p>
                    <hr />
                    <h4>03. How can we tell these histories differently?</h4>
                    <p> What can we learn by bringing together gender studies, disability studies, science and technology studies, computer science, and digital humanities to create more accessible ways of engaging with the past?</p>
                </DigitalWorkshopExplanation>
            </DigitalWorkshopsArea>
            </FadeSection>
            <FadeSection>
                <DigitalWorkshopsArea>
                        <img 
                        src={bigLeftLady} 
                        alt="" 
                        style={{ 
                    position: "absolute", 
                    left: "-30%", 
                    marginTop: "50%", 
                    width: "80vw",
                    }} 
                        />
                    <HomePageTitles style={{ 
                    position: "absolute", 
                    left: "50%", 
                    top: "90%", 
                    transform: "translate(-50%, -50%)", 
                    maxWidth: "30%", 
                    textAlign: "center" 
                    }}>
                        <h1 style={{ fontWeight: "bold" }}>Workshops</h1>
                        <h3>Building the project TOGETHER</h3>
                        <p>"Technologies and/as Prosthetics is not a project created in isolation. Throughout the 2026–2027 academic year, we are bringing together students, scholars, designers, technologists, and members of the greater Brown community to ask how hidden histories can be researched, interpreted, and experienced differently.</p>
                        <p>Across three interdisciplinary workshops, participants will move from discovery to connection to creation.</p>
                    </HomePageTitles>
                    <img 
                    src={bigRightLady} 
                    alt="lady on the right" 
                    style={{                     
                        position: "absolute", 
                        marginLeft: "70vw",
                        top: "45%",
                        width: "30vw"
                    }} 
                    />
                </DigitalWorkshopsArea>
                <DigitalWorkshopsArea style={{marginTop: "70vh", marginBottom: "14vh"}}>
                    <img src={purpleHill} alt="purple hill" style={{width: "100vw", position: "absolute"}}/>  
                    <img src={fig13} alt="fig13" style={{left: "22vw", top: "-14vh", position: "absolute"}}/>
                    <img src={fig12} alt="fig12" style={{right: "3vw", top: "-1vh", position: "absolute"}}/>
                    <img src={fig15} alt="fig15" style={{right: "5vw", top: "40vh", position: "absolute"}}/>
                    <img src={fig7} alt="fig7" style={{left: "16vw", top: "4vh", position: "absolute"}}/>
                    <img src={fig19_2} alt="fig19_2" style={{left: "28vw", top: "15vh", position: "absolute"}}/>
                    <img src={fig19} alt="fig19" style={{left: "42vw", top: "33vh", position: "absolute"}}/>
                    <div style={{width: "30vw", position: "absolute", color: "white", marginLeft: "40vw"}}>
                        <h1>Our Team</h1>
                        <p>Technologies and/as Prosthetics brings together scholars, students, designers, and technologists working across the humanities, social sciences,  computer science, and more.</p>
                        <LearnMoreButton title="Meet the Team" style={{ margin: "0 auto", background: "#E4D9B5", color: "black", height: "10vh"  }}
                        onClick={() => navigate("/team")}>
                        Meet the Team
                        </LearnMoreButton>
                    </div>  
                </DigitalWorkshopsArea>
            </FadeSection>
        </div>
    );
};


export default Home;