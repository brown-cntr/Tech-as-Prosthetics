// Filename - components/Footer.js

import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/projectLogo.png";
import styled from "styled-components";

export const Logo = styled.img`
    width: 10%;
    height: 10%;
`;

export const Box = styled.footer`
    padding: 5% 2.5%;
    background: var(--surface);
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

const linkStyles = `
    margin-bottom: 5%;
    font-size: 80%;
    color: var(--ink);
    text-decoration: none;
    border-radius: 2px;

    &:hover {
        text-decoration: underline;
        text-underline-offset: 3px;
    }

    &:focus-visible {
        outline: 3px solid var(--focus-ring);
        outline-offset: 2px;
    }
`;

export const FooterLink = styled.a`
    ${linkStyles}
`;

export const FooterRouterLink = styled(Link)`
    ${linkStyles}
`;

export const FooterMuted = styled.span`
    display: block;
    margin-bottom: 5%;
    font-size: 80%;
    color: var(--ink);
`;

export const Heading = styled.h2`
    font-size: 90%;
    margin: 0 0 40px;
    font-weight: bold;
    font-family: var(--sans);
    color: var(--ink);
    letter-spacing: normal;
`;

export const HrFooter = styled.hr`
    max-width: 100%;
    border: none;
    height: 0.5vh;
    background-color: var(--rule);
    margin: 0 auto;
`;

const Footer = () => {
    return (
        <div>
            <HrFooter />
            <Box>
                <FooterContainer>
                    <FooterSpacer>
                        <Logo src={logo} alt="Technologies and/as Prosthetics" />
                        <Row>
                            <Column>
                                <Heading>Contact us</Heading>
                                <FooterLink href="mailto:email@brown.edu">
                                    Email:<br />
                                    email@brown.edu
                                </FooterLink>
                            </Column>
                            <Column>
                                <Heading>Experiences</Heading>
                                <FooterRouterLink to="/khipu">
                                    The Incan Khipu
                                </FooterRouterLink>
                                <FooterMuted>
                                    Ada Lovelace&apos;s Analytical Engine
                                </FooterMuted>
                                <FooterMuted>
                                    The QWERTY Keyboard
                                </FooterMuted>
                            </Column>
                            <Column>
                                <Heading>Quicklinks</Heading>
                                <FooterRouterLink to="/">
                                    Home
                                </FooterRouterLink>
                                <FooterRouterLink to="/projects">
                                    Experiences
                                </FooterRouterLink>
                                <FooterRouterLink to="/team">
                                    Team
                                </FooterRouterLink>
                            </Column>
                        </Row>
                    </FooterSpacer>
                </FooterContainer>
            </Box>
        </div>
    );
};
export default Footer;
