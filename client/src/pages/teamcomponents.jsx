import styled from "styled-components";


export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 5vw;
    row-gap: 10vh;
    margin: 5%;
    place-items: center;
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 5%;
    justify-content: center;
    align-items: center;
`;

export const CardName = styled.h5`
    object-fit: cover;
    object-position: 50% 50%;
    margin-top: 10%;
`;

export const CardImage = styled.img`
    width: 70%;
    height: 70%;
`;

/*
 * Flip card: hovering (or keyboard-focusing) the photo turns it around to
 * show the sketch version.
 *
 * - FlipCard    the outer box. It takes the hover, and its `perspective`
 *               makes the rotation look 3D. The hover has to be here and not
 *               on the part that rotates, otherwise the edge moves out from
 *               under the mouse mid-flip and the card flickers.
 * - FlipInner   the part that actually rotates.
 * - FlipFront   the photo. It stays in normal layout flow, so the card takes
 *               the photo's own proportions (no need to know its size).
 * - FlipBack    the sketch. It is laid exactly over the photo, pre-turned
 *               180 degrees. `backface-visibility: hidden` hides whichever
 *               face is turned away, so you only ever see one of them.
 */
export const FlipCard = styled.div`
    width: 70%;
    perspective: 1000px;
    cursor: pointer;
`;

export const FlipInner = styled.div`
    position: relative;
    width: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s ease;

    ${FlipCard}:hover &,
    ${FlipCard}:focus-visible & {
        transform: rotateY(180deg);
    }

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }
`;

export const FlipFront = styled.img`
    display: block;
    width: 100%;
    height: auto;
    backface-visibility: hidden;
`;

export const FlipBack = styled.img`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    backface-visibility: hidden;
    transform: rotateY(180deg);
`;


export const CardText = styled.p`
`;

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;


export const TopText = styled.div`
    display: flex;
    color: #635371;
    margin-top: 10%;
    margin-left: 5%;
    flex-direction: column;
`;


export const TopLeftText = styled.div`
    font-size: 2vw;
    text-align: left;
`;

export const TopRightText = styled.div`
    font-size: 3vw;
    text-align: left;
`;

export const OtherTopText = styled.div`
    margin-top: 15%;
    font-size: 1.2vw;
    color: #000000;
    text-align: left;
    margin-right: 5%;
`;