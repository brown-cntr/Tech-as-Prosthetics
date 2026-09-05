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
import teamBottomImg from "../assets/teamBottomImg.png";
import kimImg from "../assets/profilepics/kim.png";
import kimCartoon from "../assets/profilepics/kimCartoon.png";

import saryaImg from "../assets/profilepics/sarya.png";
import saryaCartoon from "../assets/profilepics/saryaCartoon.png";

import meredithImg from "../assets/profilepics/meredith.png";
import meredithCartoon from "../assets/profilepics/meredithCartoon.png";

import tjImg from "../assets/profilepics/tj.png";
import tjCartoon from "../assets/profilepics/tjCartoon.png";

import kateImg from "../assets/profilepics/kate.png";
import kateCartoon from "../assets/profilepics/kateCartoon.png";

import kellieImg from "../assets/profilepics/kellie.png";
import kellieCartoon from "../assets/profilepics/kellieCartoon.png"

const teamMembers = [
    {
        profilePic: kimImg,
        cartoonPic: kimCartoon,
        name: "Kim Fernandes",
        title: "Assistant Professor of Anthropology"
    },

    {
        profilePic: meredithImg,
        cartoonPic: meredithCartoon,
        name: "Meredith Mendola",
        title: "CNTR Program Manager, Project Lead"
    },

    {
        profilePic: tjImg,
        cartoonPic: tjCartoon,
        name: "TJ Kalaitzidis",
        title: "Assistant Director, Learning Systems Innovation"
    },

     {
        profilePic: kellieImg,
        cartoonPic: kellieCartoon,
        name: "Kellie Louis",
        title: "Undergraduate Student in Computer Science and History, Development & Design Assistant"
    },


    {
        profilePic: saryaImg,
        cartoonPic: saryaCartoon,
        name: "Sarya Baran Kiliç",
        title: "Undergraduate Student in Computer Science and Comparative Literature, Developer Lead"
    },

    {
        profilePic: kateImg,
        cartoonPic: kateCartoon,
        name: "Kate Zhang",
        title: "Undergraduate Student in Applied Mathematics and Human-Centered Design, Design Lead"
    },
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
                The People Behind <br/>the Scenes 
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