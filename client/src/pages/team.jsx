import React from "react";
import {
    GridContainer,
    CardName,
    CardImage,
    TopText,
    TopLeftText,
    TopRightText,
    Card,
    CardText,
    OtherTopText,
    Header,
} from "./teamcomponents";
import placeholderImg from "../assets/CNTR_logo_color.png";
import kimImg from "../assets/profilepics/kim.png";
import saryaImg from "../assets/profilepics/sarya.png";
import meredithImg from "../assets/profilepics/meredith.png";

const teamMembers = [
    {
        profilePic: meredithImg,
        name: "Meredith Mendola",
        title: "CNTR Program Manager, CNTR AISLE Product Director, SRCH Advisor"
    },

    {
        profilePic: kimImg,
        name: "Kim Fernandes",
        title: "Assistant Professor of Anthropology"
    },

    {
        profilePic: placeholderImg,
        name: "TJ Kalaitzidis",
        title: "Assistant Director, Learning Systems Innovation"
    },

    {
        profilePic: placeholderImg,
        name: "Kate Zhang",
        title: "Undergraduate Student in Applied Mathematics and Human-Centered Design, Design Lead"
    },

    {
        profilePic: saryaImg,
        name: "Sarya Baran Kiliç",
        title: "Undergraduate Student in Computer Science and Comparative Literature, Developer Lead"
    },

    {
        profilePic: placeholderImg,
        name: "Kellie Louis",
        title: "Undergraduate Student in Computer Science and History, Development & Design Assistant"
    }

 ];


const Team = () => {
    return (
    <>
        <Header>
        <TopText>
            <TopLeftText> 
                Our Team <br/>
            </TopLeftText>

            <TopRightText>
                The People Behind the Scenes 
            </TopRightText>
        </TopText>

        <OtherTopText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
            eiusmod tempor incididunt ut <br/> labore et dolore magna aliqua. Ut 
            enim ad minim veniam, quis nostrud exercitation ullamco laboris 
            <br/> nisi ut aliquip ex ea commodo consequat.
        </OtherTopText>

        </Header>

        <GridContainer>
            {teamMembers.map((member) => (
                <Card>
                <CardImage src={member.profilePic} />
                <CardName>{member.name}</CardName>
                <CardText> {member.title}</CardText>
                </Card>
            ))}
        </GridContainer>
    </>
    );
};

export default Team;