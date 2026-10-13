import React, { useRef } from 'react';
import { MainTitle,
    FadeSection,
    LearnMoreButton,
    Stage,
    StageImg,
    StageText } from "./homepagecomponents";
import mainPeople from "../assets/people_top_drawing.svg"
import rightPeople from "../assets/characters-bottom-right.svg";
import booksVector from "../assets/boooks.webp";
import { motion } from "framer-motion";
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

/*
 * Every section below is a <Stage>: a box with a fixed aspect ratio. Images and
 * text are placed with percentages of that box ($x, $y = top-left corner, $w =
 * width), so each section scales as one picture on any laptop/desktop screen.
 * The numbers were measured from the layout at 1440 x 757.
 */
const Home = () => {
    const navigate = useNavigate();
    return (
        <div>
            <FadeSection>
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Stage>
                        <StageImg src={path} alt="path image" $x={0} $y={75} $w={100} />
                        <StageImg src={mainPeople} alt="decorative image" $x={0} $y={9.5} $w={62} />
                        <StageText $x={15} $y={69.2} $w={37.2} $align="left">
                            <p>Discover the overlooked histories of disabled, women, and gender-marginalized innovators whose ideas shaped the technologies we use every day.</p>
                        </StageText>
                        <StageText $x={15} $y={81.1} $w={24.8}>
                            <LearnMoreButton title="Learn More" aria-label="Learn more about this purple button"
                                style={{ width: "100%" }}
                                onClick={() => navigate("/about")}>
                                Learn More
                            </LearnMoreButton>
                        </StageText>
                        <StageText $x={55} $y={19} $w={25} $align="left">
                            <p style={{ fontStyle: "italic" }}>Technology Shaped By Different Paths</p>
                            <MainTitle style={{ fontSize: "3em" }}>Technologies and/as Prosthetics</MainTitle>
                        </StageText>
                        <StageImg src={rightPeople} alt="decorative image 2" $x={45.8} $y={38} $w={54.2} />
                    </Stage>
                </motion.div>

                {/* Projects */}
                <Stage $ratio="1440 / 908" style={{ marginTop: "2.6%", backgroundColor: "#E4D9B5" }}>
                    <StageImg src={oldComputer} alt="old computer" $x={0} $y={8.7} $w={45.7} />
                    <StageText $x={45} $y={10.8} $w={50} $align="left">
                        <h1>Experiences</h1>
                        <p>Explore interactive experiences that uncover the people, practices, and ideas that have shaped the technologies we use today.</p>
                    </StageText>
                    <StageText $x={45} $y={27.5} $w={20}>
                        <LearnMoreButton title="View All Projects"
                            style={{ width: "100%", height: "5.26cqw" }}
                            onClick={() => navigate("/projects")}>
                            View All Projects
                        </LearnMoreButton>
                    </StageText>
                    <StageImg src={ropes} alt="" $x={45} $y={40} $w={8.9} />
                    <StageText $x={53.9} $y={40} $w={21.6} $align="left">
                        <h2>The Incan Khipu</h2>
                        <p>How can information be recorded without traditional writing forms?</p>
                    </StageText>
                    <StageText $x={73} $y={56.6} $w={15.8} $align="right">
                        <h2>The Typewriter</h2>
                        <p>Did you know the typewriter began as a technology of accessibility?</p>
                    </StageText>
                    <StageImg src={typewriter} alt="" $x={90.1} $y={56.6} $w={8.9} />
                    <StageText $x={45} $y={73.3} $w={21.6} $align="left">
                        <h2>The First Computer</h2>
                        <p>A computing system that existed first on paper.</p>
                    </StageText>
                </Stage>
            </FadeSection>

            <FadeSection>
                {/* Our Mission */}
                <Stage>
                    <StageText $x={3.8} $y={6.2} $w={50} $align="left">
                        <h1>Our Mission</h1>
                        <p>The history of technology is often told through stories of singular inventors and breakthrough machines. But technologies are also shaped by people whose needs, ideas, labor, and ingenuity have been overlooked, including disabled people, women, and gender-marginalized people.</p>
                        <p>Technologies and/as Prosthetics reimagines these histories through interactive, accessible experiences. We ask what becomes possible when we change not only the stories we tell, but the ways we encounter them.</p>
                    </StageText>
                    <StageImg src={booksVector} alt="Stack of books" $x={-0.1} $y={46.5} $w={50} />
                    <StageText $x={53.8} $y={21.1} $w={41.3} $align="left">
                        <hr />
                        <h4>01. Who gets remembered?</h4>
                        <p>How have contributions to foundational technologies by women, nonbinary people, and disabled individuals been systematically obscured? </p>
                        <hr />
                        <h4>02. How does erasure happen?</h4>
                        <p>What social, institutional, and disciplinary structures determine whose work is recognized as technological—and whose is not?</p>
                        <hr />
                        <h4>03. How can we tell these histories differently?</h4>
                        <p> What can we learn by bringing together gender studies, disability studies, science and technology studies, computer science, and digital humanities to create more accessible ways of engaging with the past?</p>
                    </StageText>
                </Stage>
            </FadeSection>

            <FadeSection>
                {/* Workshops */}
                <Stage>
                    <StageImg src={bigLeftLady} alt="" $x={-30} $y={21.5} $w={80} />
                    <StageText $x={35} $y={62} $w={30} $align="center">
                        <h1 style={{ fontWeight: "bold" }}>Workshops</h1>
                        <h3>Building the project TOGETHER</h3>
                        <p>"Technologies and/as Prosthetics is not a project created in isolation. Throughout the 2026–2027 academic year, we are bringing together students, scholars, designers, technologists, and members of the greater Brown community to ask how hidden histories can be researched, interpreted, and experienced differently.</p>
                        <p>Across three interdisciplinary workshops, participants will move from discovery to connection to creation.</p>
                    </StageText>
                    <StageImg src={bigRightLady} alt="lady on the right" $x={70} $y={45} $w={30} />
                </Stage>

                {/* Our Team */}
                <Stage style={{ marginTop: "36.8%", marginBottom: "7.4%" }}>
                    <StageImg src={purpleHill} alt="purple hill" $x={0}    $y={-14.2} $w={100} />
                    <StageImg src={fig13}      alt="fig13"       $x={22}   $y={-14}   $w={7.2} />
                    <StageImg src={fig12}      alt="fig12"       $x={84.6} $y={-1}    $w={12.4} />
                    <StageImg src={fig15}      alt="fig15"       $x={88.2} $y={40}    $w={6.8} />
                    <StageImg src={fig7}       alt="fig7"        $x={16}   $y={4}     $w={5.3} />
                    <StageImg src={fig19_2}    alt="fig19_2"     $x={28}   $y={15}    $w={10.7} />
                    <StageImg src={fig19}      alt="fig19"       $x={42}   $y={33}    $w={11.4} />
                    <StageText $x={55} $y={33.3} $w={30} $color="white">
                        <h1>Our Team</h1>
                        <p>Technologies and/as Prosthetics brings together scholars, students, designers, and technologists working across the humanities, social sciences,  computer science, and more.</p>
                        <LearnMoreButton title="Meet the Team" style={{ margin: "0 auto", background: "#E4D9B5", color: "black", height: "5.3cqw" }}
                            onClick={() => navigate("/team")}>
                            Meet the Team
                        </LearnMoreButton>
                    </StageText>
                </Stage>
            </FadeSection>
        </div>
    );
};


export default Home;