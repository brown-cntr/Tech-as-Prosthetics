import styled from "styled-components";

export const GameSection = styled.section`
    box-sizing: border-box;
    height: 100vh;
    background: var(--page);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

export const StageViewport = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StageFrame = styled.div`
    position: relative;
    flex-shrink: 0;
`;

export const Stage = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: top left;
    font-family: "IBM Plex Mono", monospace;
    color: #000;

    p {
        font-family: inherit;
    }
`;

export const CanvasHost = styled.div`
    position: absolute;
    inset: 0;
`;

export const Placed = styled.div`
    position: absolute;
`;

export const ImageButton = styled.button`
    position: absolute;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    border-radius: 6px;

    img {
        display: block;
        width: 100%;
        height: 100%;
    }

    /* Stage UI is always light cream; keep a dark ring for 3:1 UI contrast */
    &:focus-visible {
        outline: 3px solid #635371;
        outline-offset: 2px;
    }
`;

export const HotspotButton = ImageButton;

export const ExerciseText = styled.p`
    position: absolute;
    left: 50px;
    top: 25px;
    width: 550px;
    margin: 0;
    font-size: 16px;
    line-height: 1.4;
    text-align: left;
`;

export const Count = styled.p`
    position: absolute;
    left: 1000px;
    top: 40px;
    margin: 0;
    font-size: 20px;
`;

export const Feedback = styled.p`
    position: absolute;
    left: 325px;
    top: 122px;
    width: 650px;
    margin: 0;
    font-size: ${({ $tone }) => ($tone === "correct" ? "28px" : "15px")};
    font-weight: ${({ $tone }) => ($tone === "correct" ? 600 : 400)};
    color: ${({ $tone }) => ($tone === "correct" ? "#2f5d34" : "#7a2b1d")};
    text-align: center;
    pointer-events: none;
`;

export const ProgressList = styled.ol`
    position: absolute;
    left: 95px;
    top: 200px;
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 12px;
    text-align: left;

    li {
        height: 75px;
    }
`;

export const DigitMenu = styled.div`
    position: absolute;
    left: 530px;
    top: 390px;
    width: 150px;
    height: 100px;
    background: url("/khipu-game/assets/digitMenu.png") center / 100% 100% no-repeat;
`;

export const DigitStep = styled.button`
    position: absolute;
    top: 47px;
    width: 20px;
    height: 19px;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;

    &:disabled {
        cursor: not-allowed;
    }

    &:focus-visible {
        outline: 2px solid #635371;
    }
`;

export const DigitValue = styled.output`
    position: absolute;
    left: 35px;
    top: 47px;
    width: 30px;
    height: 19px;
    line-height: 19px;
    font-size: 14px;
    text-align: center;
`;

export const Overlay = styled.div`
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
`;

export const Dialog = styled.div`
    position: absolute;

    img {
        display: block;
        width: 100%;
        height: 100%;
    }
`;

export const CloseButton = styled.button`
    position: absolute;
    width: 40px;
    height: 40px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: transparent;
    cursor: pointer;

    &:focus-visible {
        outline: 3px solid #635371;
    }
`;

export const VisuallyHidden = styled.span`
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
`;
