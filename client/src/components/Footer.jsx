// Filename - components/Footer.js

import React from "react";
// components/FooterStyles.js
import logo from "../assets/projectLogo.png";
import styled from "styled-components";

export const Logo = styled.img`
    width: 10%;
    height: 10%;
`;

export const Box = styled.div`
    padding: 5% 2.5%;
    background: #E4D9B5;
    width: 100%;

    @media (max-width: 1000px) {
        // padding: 70px 30px;
    }
`;

export const FooterContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 1000px;
    margin: 0 auto;
`;


export const FooterSpacer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 60px;
`;

export const Row = styled.div`
    display: grid;
    flex: 1;
    grid-template-columns: repeat(
        auto-fill,
        minmax(185px, 1fr)
    );
    grid-gap: 60px;
    @media (max-width: 1000px) {
        grid-template-columns: repeat(
            3,
            minmax(200px, 1fr)
        );
    }
`;

export const FooterLink = styled.a`
    margin-bottom: 5%;
    font-size: 80%;
    color: #000000;
    text-decoration: none;
    &:hover {
        color: white;
        transition: 200ms ease-in;
    }
`;

export const Heading = styled.p`
    font-size: 90%;
    background: #d4drgba(38, 38, 38, 1)
    margin-bottom: 40px;
    font-weight: bold;
`;

export const HrFooter = styled.hr`
    max-width: 100%;
    border: none; 
    height: 0.5vh; 
    background-color: black;
    margin: 0 auto;
`;

const Footer = () => {
    return (
        <div>
            <HrFooter/>
            <Box>
                <FooterContainer>
                    <FooterSpacer>
                    <Logo src={logo} alt="MainImage" />
                    <Row>
                         <Column>
                         <Heading>Contact us</Heading>
                            <FooterLink href="#">
                                Email:<br />
                                email@brown.edu
                            </FooterLink>
                        </Column>
                        <Column>
                            <Heading>Experiences</Heading>
                            <FooterLink href="/techasprosthetics.io/projects/khipu">
                                The Incan Khipu
                            </FooterLink>
                            <FooterLink href="#">
                                Ada Lovelace's Analytical Engine
                            </FooterLink>
                            <FooterLink href="#">
                               The QWERTY Keyboard
                            </FooterLink>
                        </Column>
                        <Column>
                            <Heading>Quicklinks</Heading>
                            <FooterLink href="#">
                                Home
                            </FooterLink>
                            <FooterLink href="#">
                                Experiences
                            </FooterLink>
                            <FooterLink href="#">
                                Teams
                            </FooterLink>
                        </Column>
                    </Row>
                    </FooterSpacer>
                </FooterContainer>
            </Box>
        </div>
    );
};
export default Footer;