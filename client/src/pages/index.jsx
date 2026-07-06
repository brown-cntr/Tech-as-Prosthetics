import React from "react";
import styled from "styled-components";
import mainimg from "../assets/placeholder.png";
import { MainArea, MainTitle, MainImage, DigitalWorkshopsArea, DigitalWorkshopTitle, HomeContainer, Container, GridContainer,
    Card, CardDescription, CardImage } from "./homepagecomponents";
import cat1 from "../assets/cat1.png";
import cat2 from "../assets/cat2.png";
import cat3 from "../assets/cat3.png";
import cat4 from "../assets/cat4.png";
import cat5 from "../assets/cat5.png";



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
    imgSrc: cat4,
    alt: "img5",
    description: "workiworkshop",
    className: "grid-five",
  },
];
const Home = () => {
    return (
        <div>
            <MainArea>
                <MainTitle>Technologies as Prosthetics</MainTitle>
                <MainImage src={mainimg} alt="MainImage" />
            </MainArea>
            <DigitalWorkshopsArea>
                <DigitalWorkshopTitle>
                    <h1 style={{ fontWeight: "bold" }}>Digital Workshops</h1>
                    <p>Explore our experiences below</p>
                </DigitalWorkshopTitle>
                <HomeContainer>
                    <Container>
                        <GridContainer>
                            {digitalworkshops.map((workshop) => (
                                <Card key={workshop.to}>
                                    <CardImage src={workshop.imgSrc} alt={workshop.alt} />
                                    <CardDescription>{workshop.description}</CardDescription>
                                </Card>
                                ))}
                        </GridContainer>
                    </Container>
                </HomeContainer>
            </DigitalWorkshopsArea>
        </div>
    );
};

export default Home;