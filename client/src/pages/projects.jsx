// Filename - pages/blogs.js

import React from "react";
import styled, { keyframes } from "styled-components";

const float = keyframes`
    0% { transform: translate(0px, 0px); }
    25% { transform: translate(6px, -10px); }
    50% { transform: translate(-4px, -14px); }
    75% { transform: translate(-8px, -6px); }
    100% { transform: translate(0px, 0px); }
`;

export const ProjectTitle = styled.div`
    margin-top: 20vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

export const ProjectsSquare = styled.div`
    width: 20vh;
    height: 20vh;
    position: absolute;
    background-color: #c4c0b5;
    box-shadow: 0 15px 25px -10px rgba(0, 0, 0, 0.2);
    animation: ${float} ${props => props.$duration || 3}s ease-in-out infinite;
    animation-delay: ${props => props.$delay || 0}s;
`;

export const ProjectsGallery = styled.div`
    position: relative;
    padding-top: 5vh;
    width: 100%;
    height: 200vh;
`;

const Projects = () => {

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
    </div>
    );
};

export default Projects;