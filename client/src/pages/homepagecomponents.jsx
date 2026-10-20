import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/*
 * Colors and text sizes come from the variables in index.css (var(--...)),
 * so a change there updates every page. Avoid hard-coded colors or font sizes
 * in this file.
 */

export const MainArea = styled.div`
    display: flex;
    min-height: 100vh;
    padding-top: 5%;
    box-sizing: border-box;
    position: relative;
`;

export const MainTitleArea = styled.div`
    max-width: 25%;
    margin-right: 20%;
    padding-top: 5%;
    margin-left: -7vw;
`;

export const MainTitle = styled.h1`
    text-align: left;
`;

export const MainImageArea = styled.div`
    max-width: 80%;
    align-items: left;
`;

export const MainImage = styled.img`
    width: 100%;
    align-items: left;
    margin-bottom: -30vh;
`;

export const LearnMoreButton = styled.button`
    color: var(--cta-text);
    background-color: var(--cta-bg);
    font-family: var(--sans);
    font-weight: 600;
    border: none;
    border-radius: 8px;
    width: 66.666%;
    display: block;
    cursor: pointer;
    transition: transform 0.1s ease, background-color 0.1s ease;

    &:active {
        background-color: var(--cta-bg-active);
        transform: scale(0.97);
    }
`;

export const ProjectsArea = styled.div`
    display: flex;
    align-items: center;
    min-height: 120vh;
    padding-top: 0.5%;
    background-color: var(--surface);
`;

export const ProjectsPart = styled.div`
    display: flex;
    height: 20vh;
    background-color: var(--surface);
    margin-left: 5vw;
    margin-right: 1vw;
    padding-bottom: 3vh;
`;

export const ProjectsPartTitle = styled.div`
    text-align: left;
    width: 40%;
`;

export const HomePageTitles = styled.div`
    width: 50vw;
`;

export const ProjectsSquare = styled.div`
    width: 20vh;
    height: 20vh;
    background-color: var(--block);
`;

export const ProjectsCircle = styled.div`
    width: 20vh;
    height: 20vh;
    border-radius: 50%;
    background-color: var(--block);
    margin-left: 15vw;
    margin-right: 2%;
`;

export const ProjectsDecorative = styled.div`
    display: flex;
    align-items: center;
    width: 40%;
`;

export const ViewAllProjectsButton = styled.button`
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 1%;
    padding-bottom: 1%;
    margin-left: 9vw;
    margin-right: 2%;
    background-color: var(--nav);
    color: var(--brown);
    align-self: center;
    border: 5px solid var(--brown);
    border-radius: 20px;
    display: block;
    cursor: pointer;
    transition: transform 0.1s ease, background-color 0.1s ease;

    &:active {
        transform: scale(0.97);
    }
`;


export const DigitalWorkshopsArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    position: relative;
`;

export const DigitalWorkshopTitle = styled.div`
    text-align: center;
    margin-left: 10 auto;
    margin-right: 10 auto;
`;

export const DigitalWorkshopExplanation = styled.div`
    text-align: left;
    min-width: 20vh;
    margin-right: 5%;
`;

export const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 19px;
`;

export const GridContainer = styled.div`
    display: grid;
    grid-auto-columns: 33%;
    grid-auto-flow: column;
    overflow-x: scroll;
    gap: 1.3rem;
    margin-top: 1.3rem;
    padding: 2rem 0;
    ref={gridRef}
`;

export const HomeContainer = styled.div`
    padding-top: 0.5rem;
`;

export const HrTrimmed = styled.hr`
    max-width: 80%;
    border: none;
    height: 0.5vh;
    background-color: var(--rule);
    margin: 0 auto;
`;

/*
 * Stage: a box with a fixed aspect ratio (the 1440x757 layout the scene was
 * designed at). Everything inside is positioned and sized in percentages of
 * the stage, so the whole scene scales together on any screen size.
 *   $x, $y = top-left corner as % of stage width / height
 *   $w     = width as % of stage width
 */
export const Stage = styled.div`
    position: relative;
    width: 100%;
    aspect-ratio: ${p => p.$ratio || "1440 / 757"};
    container-type: inline-size;
`;

export const StageImg = styled.img`
    position: absolute;
    left: ${p => p.$x}%;
    top: ${p => p.$y}%;
    width: ${p => p.$w}%;
    height: auto;
`;

/*
 * Text inside a stage follows the same type scale as the rest of the site,
 * but scaled with the stage. The base size 1.11cqw is 16px at the 1440px
 * design width, so 1em = the b1 body size, and the sizes below are the scale
 * from index.css expressed in em:
 *   H1 60px = 3.75em    H2 40px = 2.5em    H3/H4 24px = 1.5em
 *   b1 16px = 1em       b2 20px = 1.25em (add className="b2")
 * !important is needed because index.css styles headings and paragraphs with
 * a more specific selector (#root h1 ...), which would otherwise win.
 */
export const StageText = styled.div`
    position: absolute;
    left: ${p => p.$x}%;
    top: ${p => p.$y}%;
    width: ${p => p.$w}%;
    color: ${p => p.$color || "inherit"};
    text-align: ${p => p.$align || "inherit"};
    font-size: 1.11cqw;

    p { font-size: 1em !important; line-height: var(--lh-body) !important; margin: 0 0 1em !important; }
    .b2 { font-size: 1.25em !important; }
    h1 { font-size: 3.75em !important; line-height: var(--lh-heading) !important; margin: 0 0 0.5em !important; }
    h2 { font-size: 2.5em !important; line-height: var(--lh-heading) !important; margin: 0 0 0.5em !important; }
    h3 { font-size: 1.5em !important; line-height: var(--lh-heading) !important; margin: 0 0 0.5em !important; }
    h4 { font-size: 1.5em !important; line-height: var(--lh-heading) !important; margin: 0 0 0.5em !important; }
    hr { margin: 1em 0 !important; }
    button { font-size: 1em; }
`;


export const FadeSection = ({ children }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start", "end end", "end start"],
    });
    const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

    return (
        <motion.div ref={ref} style={{ opacity }}>
            {children}
        </motion.div>
    );
};