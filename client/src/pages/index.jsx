import React, { useRef } from 'react';
import styled from "styled-components";
import mainimg from "../assets/placeholder.png";
import { MainArea, MainTitle, MainImage, DigitalWorkshopsArea, DigitalWorkshopTitle, HomeContainer, Container, GridContainer,
    Card, CardDescription, CardImage, 
    DigitalWorkshopExplanation, HrTrimmed,
    FadeSection,
    MainTitleArea,
    MainImageArea,
    ProjectsArea,
    LearnMoreButton,
    ViewAllProjectsButton,
    ProjectsPart,
    ProjectsDecorative,
    ProjectsPartTitle,
    HomePageTitles,
    ProjectsCircle,
    ProjectsSquare} from "./homepagecomponents";
import cat1 from "../assets/cat1.png";
import cat2 from "../assets/cat2.png";
import cat3 from "../assets/cat3.png";
import cat4 from "../assets/cat4.png";
import cat5 from "../assets/cat5.png";
import booksVector from "../assets/books-vector.svg";
import { motion, useScroll, useTransform } from "framer-motion";
import largeCircle from "../assets/large-circle.svg";
import ellipseShape from "../assets/ellipse.svg";

const digitalworkshops = [
  {
    to: "workshops/cat1",
    imgSrc: cat1,
    alt: "img1",
    description: "Great Workshops",
    className: "grid-one",
  },
  {
    to: "workshops/cat2",
    imgSrc: cat2,
    alt: "img2",
    description: "Amazing Workshops",
    className: "grid-two",
  },
  {
    to: "workshops/cat3",
    imgSrc: cat3,
    alt: "img3",
    description: "SuperDuper Workshop",
    className: "grid-three",
  },
  {
    to: "workshops/cat4",
    imgSrc: cat4,
    alt: "img4",
    description: "OMG Workshop",
    className: "grid-four",
  },
    {
    to: "workshops/cat4",
    imgSrc: cat5,
    alt: "img5",
    description: "workiworkshop",
    className: "grid-five",
  },
];


const Home = () => {
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
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                >
                <FadeSection>
                <MainArea>
                    <MainImageArea>
                        <MainImage src={mainimg} alt="MainImage" />
                        <p style={{ textAlign: "left" }}>Discover the overlooked histories of disabled, women, and gender-marginalized innovators whose ideas shaped the technologies we use every day.</p>
                        <LearnMoreButton title="Learn More" aria-label="Learn more about this purple button">
                        Learn More
                        </LearnMoreButton>
                    </MainImageArea>
                    <MainTitleArea>
                        <p style={{ fontStyle: "italic", textAlign: "left" }}>Technology Shaped By Different Paths</p>
                        <MainTitle>Technologies and/as Prosthetics</MainTitle>
                    </MainTitleArea>
                </MainArea>
                </FadeSection>
            </motion.div>
            <FadeSection>
                <ProjectsArea>
                    <ProjectsDecorative>
                    </ProjectsDecorative>
                    <div> 
                        <ProjectsPart>
                                <HomePageTitles style={{ textAlign: "left" }}>
                                    <h1>Projects</h1>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ven</p>
                                </HomePageTitles>
                                <ViewAllProjectsButton>View All Projects</ViewAllProjectsButton>
                        </ProjectsPart>
                        <ProjectsPart>
                            <ProjectsCircle></ProjectsCircle>
                                <ProjectsPartTitle>
                                    <h2>Project Title</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                </ProjectsPartTitle>
                        </ProjectsPart>
                        <ProjectsPart>
                                <ProjectsPartTitle style={{ textAlign: "right", marginRight: "1rem", marginLeft: "28vw" }}>
                                    <h2>Project Title</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                </ProjectsPartTitle>
                                <ProjectsSquare></ProjectsSquare>
                        </ProjectsPart>
                        <ProjectsPart>
                                <ProjectsPartTitle>
                                    <h2>Project Title</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                </ProjectsPartTitle>    
                        </ProjectsPart>                      
                    </div>
                </ProjectsArea>
            </FadeSection>

            <FadeSection>
            <DigitalWorkshopsArea>
                <div style={{ minWidth: "50%"}}>
                    <HomePageTitles style={{ marginLeft: "3rem",  textAlign: "left" }}>
                        <h1>Projects</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ven</p>
                    </HomePageTitles>
                    <img src={booksVector} alt="Stack of books" />
                </div>
                <DigitalWorkshopExplanation>
                    <hr />
                    <p>How have contributions to foundational technologies by women, nonbinary people, and disabled individuals been systematically obscured? </p>
                    <hr />
                    <p>What mechanisms have facilitated these erasures, and how might we reverse them? </p>
                    <hr />
                    <p> What interdisciplinary methodologies and practices (from gender studies, critical disability studies, science and technology studies, computer science, and the digital humanities, among other areas) might best support the translation of these histories for audiences within and beyond academic spaces?</p>
                </DigitalWorkshopExplanation>
            </DigitalWorkshopsArea>
            </FadeSection>
            <FadeSection>
                <DigitalWorkshopsArea>
                        <img 
                        src={largeCircle} 
                        alt="" 
                        style={{ position: "absolute", left: "-25vw", top: "50%", transform: "translateY(-50%)", width: "55vw" }} 
                        />
                    <HomePageTitles style={{ 
                    position: "absolute", 
                    left: "50%", 
                    top: "50%", 
                    transform: "translate(-50%, -50%)", 
                    maxWidth: "35%", 
                    textAlign: "center" 
                    }}>
                        <h1 style={{ fontWeight: "bold" }}>Workshops</h1>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
                    </HomePageTitles>
                    <img src={ellipseShape} alt="" style={{ width: "150px" }} />
                </DigitalWorkshopsArea>
            </FadeSection>
        </div>
    );
};


export default Home;