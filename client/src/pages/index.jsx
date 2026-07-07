import React, { useRef } from 'react';
import styled from "styled-components";
import mainimg from "../assets/placeholder.png";
import { MainArea, MainTitle, MainImage, DigitalWorkshopsArea, DigitalWorkshopTitle, HomeContainer, Container, GridContainer,
    Card, CardDescription, CardImage, 
    DigitalWorkshopExplanation, HrTrimmed,
    FadeSection} from "./homepagecomponents";
import cat1 from "../assets/cat1.png";
import cat2 from "../assets/cat2.png";
import cat3 from "../assets/cat3.png";
import cat4 from "../assets/cat4.png";
import cat5 from "../assets/cat5.png";
import { motion, useScroll, useTransform } from "framer-motion";

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
                    <MainTitle>Technologies as Prosthetics</MainTitle>
                    <MainImage src={mainimg} alt="MainImage" />
                </MainArea>
                </FadeSection>
            </motion.div>
            <FadeSection>
            <DigitalWorkshopsArea>
                <DigitalWorkshopTitle>
                    <h1 style={{ fontWeight: "bold" }}>Digital Workshops</h1>
                    <p>Explore our experiences below</p>
                </DigitalWorkshopTitle>
                <HomeContainer>
                    <Container>
                        <GridContainer ref={gridRef}>
                            {digitalworkshops.map((workshop) => (
                                <Card key={workshop.to}>
                                    <CardImage src={workshop.imgSrc} alt={workshop.alt} />
                                    <CardDescription>{workshop.description}</CardDescription>
                                </Card>
                                ))}
                        </GridContainer>
                        <button onClick={() => handleGrid('left')}>Previous</button>
                        <button onClick={() => handleGrid('right')}>Next</button>
                    </Container>
                </HomeContainer>
            </DigitalWorkshopsArea>
            </FadeSection>
                            <div style={{ marginTop: "2rem", marginBottom: "2rem" }}> 
                    <HrTrimmed />
                </div>
            <FadeSection>
            <DigitalWorkshopsArea>
                <DigitalWorkshopTitle>
                    <h1 style={{ fontWeight: "bold" }}>Exploring Our Workshops</h1>
                    <h6 style={{ fontWeight: "bold", textAlign: "left", marginLeft: "5rem" }}>Our workshops aim to uncover the relationship between disability and the development of technology. Each workshop is centered around 3 key questions:</h6>
                </DigitalWorkshopTitle>
                <DigitalWorkshopExplanation>
                    <p>(1) How have contributions to foundational technologies by women, nonbinary people, and disabled individuals been systematically obscured? </p>
                    <p> (2) What mechanisms have facilitated these erasures, and how might we reverse them? </p>
                    <p> (3) What interdisciplinary methodologies and practices (from gender studies, critical disability studies, science and technology studies, computer science, and the digital humanities, among other areas) might best support the translation of these histories for audiences within and beyond academic spaces?</p>
                </DigitalWorkshopExplanation>
            </DigitalWorkshopsArea>
            </FadeSection>
            <div style={{ marginTop: "2rem", marginBottom: "2rem" }}> 
                    <HrTrimmed />
            </div>
            <FadeSection>
            <DigitalWorkshopTitle>
                    <h1 style={{ fontWeight: "bold" }}>Contact Us</h1>
            </DigitalWorkshopTitle>
            <DigitalWorkshopsArea>

            </DigitalWorkshopsArea>
            </FadeSection>
        </div>
    );
};


export default Home;