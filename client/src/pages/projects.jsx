// Filename - pages/blogs.js

import React from "react";
import styled from "styled-components";

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
`;

export const ProjectsGallery = styled.div`
    position: relative;
    padding-top: 5vh;
    width: 100%;
    height: 200vh;
`;

const Projects = () => {

    return (
        <body>
        <ProjectTitle>
            <h1>Projects</h1>
            <p style={{width: "60vw", textAlign: "left" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </ProjectTitle>
        <ProjectsGallery>
            <ProjectsSquare style={{ marginTop: "0vh", marginLeft: "80vw"}}>
            </ProjectsSquare>
            <ProjectsSquare style={{ marginTop: "5vh", marginLeft: "10vw"}}>
            </ProjectsSquare>
            <ProjectsSquare style={{ marginTop: "15vh", marginLeft: "40vw"}}>
            </ProjectsSquare>
            <ProjectsSquare style={{ marginTop: "50vh", marginLeft: "20vw"}}>
            </ProjectsSquare>
            <ProjectsSquare style={{ marginTop: "65vh", marginLeft: "50vw"}}>
            </ProjectsSquare>
            <ProjectsSquare style={{ marginTop: "55vh", marginLeft: "75vw"}}>
            </ProjectsSquare>
            <ProjectsSquare style={{ marginTop: "90vh", marginLeft: "30vw"}}>
            </ProjectsSquare>
        </ProjectsGallery>
        </body>
    );
};

export default Projects;