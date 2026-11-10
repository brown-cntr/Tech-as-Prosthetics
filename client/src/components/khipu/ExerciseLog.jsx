import { useEffect, useRef } from "react";
import styled from "styled-components";
import paperBg from "../../assets/khipu-log/paper-background.png";
import notebook from "../../assets/khipu-log/notebook.png";
import xIcon from "../../assets/khipu-log/x-icon.svg";
import arrowGlyph from "../../assets/khipu-log/arrow-left.svg";
import page1Left from "../../assets/khipu-log/page1-left.png";
import page1Right from "../../assets/khipu-log/page1-right.png";
import page2Left from "../../assets/khipu-log/page2-left.png";
import page2Right from "../../assets/khipu-log/page2-right.png";
import page3Left from "../../assets/khipu-log/page3-left.png";
import page3Right from "../../assets/khipu-log/page3-right.png";

const PAGE_COUNT = 5;
/** Figma log artboard (1478:21475 / Frame 192) — landscape. */
const DESIGN_W = 1189;
const DESIGN_H = 716;
/**
 * Figma main screen (1478:21094) is 1728×1117; Frame 192 sits at
 * x=264 y=200 sized 1189×716 (~64% of viewport height).
 * Our stage is 1280×640 (wider aspect), so preserve log orientation
 * (1189∶716) and match Figma’s height fraction: 716/1117 of 640.
 */
const FIGMA_MAIN_H = 1117;
const STAGE_H = 640;
const SCALE = STAGE_H / FIGMA_MAIN_H;

const PAGES = [
    {
        left: page1Left,
        right: page1Right,
        alt: "Learning to Count with 6 tomatoes; answer cord showing count 6",
    },
    {
        left: page2Left,
        right: page2Right,
        alt: "Learning to Count with 3 tomatoes; answer cord showing count 3",
    },
    {
        left: page3Left,
        right: page3Right,
        alt: "Reading the khipu question about Village A guinea pigs, with answer khipu",
    },
    null,
    null,
];

const Overlay = styled.div`
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
`;

const Panel = styled.div`
    position: relative;
    width: ${DESIGN_W * SCALE}px;
    height: ${DESIGN_H * SCALE}px;
    flex-shrink: 0;
`;

const Design = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: ${DESIGN_W}px;
    height: ${DESIGN_H}px;
    transform: scale(${SCALE});
    transform-origin: top left;
    font-family: "IBM Plex Mono", monospace;
    color: #64411b;
`;

const Paper = styled.img`
    position: absolute;
    left: 4px;
    top: 0;
    width: 1184.67px;
    height: 716px;
    object-fit: fill;
    object-position: center;
    pointer-events: none;
    user-select: none;
`;

const Header = styled.div`
    position: absolute;
    left: 60px;
    top: 53px;
    display: flex;
    gap: 24px;
    align-items: flex-start;
    width: 1073px;
    height: 80px;
`;

const Notebook = styled.div`
    position: relative;
    width: 86px;
    height: 80px;
    flex-shrink: 0;
    overflow: hidden;

    img {
        position: absolute;
        width: 154%;
        height: 164%;
        left: -28%;
        top: -39%;
        max-width: none;
        pointer-events: none;
    }
`;

const HeaderText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
    flex: 1;
    padding-top: 0;
`;

/* Beat #root h2 (40px / ink color) so title matches Figma 32px / #64411b. */
const Title = styled.h2`
    #root && {
        margin: 0;
        padding: 0;
        font-size: 32px;
        font-weight: 700;
        font-family: "IBM Plex Mono", monospace;
        color: #64411b;
        letter-spacing: 0;
        line-height: normal;
    }
`;

const Subtitle = styled.p`
    #root && {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-weight: 500;
        font-family: "IBM Plex Mono", monospace;
        color: #64411b;
        letter-spacing: 0;
        line-height: normal;
    }
`;

const CloseButton = styled.button`
    position: absolute;
    left: 1125px;
    top: 54px;
    width: 26px;
    height: 26px;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;

    img {
        display: block;
        width: 100%;
        height: 100%;
    }

    &:focus-visible {
        outline: 3px solid #635371;
        outline-offset: 2px;
        border-radius: 50%;
    }
`;

const ContentRow = styled.div`
    position: absolute;
    left: 44px;
    top: 168px;
    display: flex;
    gap: 12px;
    align-items: center;
    width: 1105px;
`;

const ArrowButton = styled.button`
    flex-shrink: 0;
    width: 39px;
    height: 49px;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        display: block;
        width: 49px;
        height: 38px;
        transform: ${({ $dir }) => ($dir === "prev" ? "rotate(-90deg)" : "rotate(90deg)")};
    }

    &:disabled {
        opacity: 0.35;
        cursor: not-allowed;
    }

    &:focus-visible {
        outline: 3px solid #635371;
        outline-offset: 2px;
        border-radius: 4px;
    }
`;

const Panels = styled.div`
    display: flex;
    gap: 24px;
    align-items: stretch;
    flex: 1;
    min-width: 0;
`;

const PanelShot = styled.img`
    display: block;
    flex-shrink: 0;
    width: ${({ $w }) => $w}px;
    height: ${({ $h }) => $h}px;
    object-fit: fill;
    border-radius: 8px;
    pointer-events: none;
    user-select: none;
`;

const BlankPanels = styled.div`
    display: flex;
    gap: 24px;
    flex: 1;
    min-height: 428px;
`;

const BlankSlot = styled.div`
    box-sizing: border-box;
    border: 4px solid #a38f56;
    border-radius: 8px;
    background: rgba(249, 247, 234, 0.55);
    flex-shrink: 0;
`;

const PageTabs = styled.div`
    position: absolute;
    left: 441px;
    top: 631px;
    display: flex;
    gap: 24px;
    align-items: center;
`;

const PageTab = styled.button`
    box-sizing: border-box;
    width: 45px;
    height: 45px;
    padding: 0;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
    font-family: "IBM Plex Mono", monospace;
    font-size: 24px;
    font-weight: 700;
    line-height: normal;
    background: ${({ $active }) => ($active ? "#812412" : "#f9f7ea")};
    color: ${({ $active }) => ($active ? "#d7a153" : "#c0ae7a")};

    &:focus-visible {
        outline: 3px solid #635371;
        outline-offset: 2px;
    }
`;

/**
 * Exercise Log popup — parchment shell with up to 5 pages.
 * Pages 1–3 show Figma practice reviews; 4–5 are empty placeholders.
 */
const ExerciseLog = ({ open, pageIndex, onPageChange, onClose }) => {
    const closeRef = useRef(null);
    const page = PAGES[pageIndex];

    useEffect(() => {
        if (!open) return;
        closeRef.current?.focus();
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (event) => {
            if (event.key === "Escape") onClose();
            if (event.key === "ArrowLeft" && pageIndex > 0) onPageChange(pageIndex - 1);
            if (event.key === "ArrowRight" && pageIndex < PAGE_COUNT - 1) {
                onPageChange(pageIndex + 1);
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, pageIndex, onClose, onPageChange]);

    if (!open) return null;

    return (
        <Overlay onClick={onClose}>
            <Panel
                role="dialog"
                aria-modal="true"
                aria-labelledby="exercise-log-title"
                onClick={(event) => event.stopPropagation()}
            >
                <Design>
                    <Paper src={paperBg} alt="" draggable={false} />

                    <Header>
                        <Notebook aria-hidden="true">
                            <img src={notebook} alt="" />
                        </Notebook>
                        <HeaderText>
                            <Title id="exercise-log-title">Exercise Log</Title>
                            <Subtitle>View past practice exercises</Subtitle>
                        </HeaderText>
                    </Header>

                    <CloseButton
                        ref={closeRef}
                        type="button"
                        aria-label="Close exercise log"
                        onClick={onClose}
                    >
                        <img src={xIcon} alt="" />
                    </CloseButton>

                    <ContentRow>
                        <ArrowButton
                            type="button"
                            $dir="prev"
                            aria-label="Previous log page"
                            disabled={pageIndex <= 0}
                            onClick={() => onPageChange(pageIndex - 1)}
                        >
                            <img src={arrowGlyph} alt="" />
                        </ArrowButton>

                        {page ? (
                            <Panels>
                                <PanelShot src={page.left} alt="" $w={321} $h={428} draggable={false} />
                                <PanelShot
                                    src={page.right}
                                    alt={page.alt}
                                    $w={658}
                                    $h={428}
                                    draggable={false}
                                />
                            </Panels>
                        ) : (
                            <BlankPanels aria-label={`Log page ${pageIndex + 1}, empty`}>
                                <BlankSlot style={{ width: 321, height: 428 }} />
                                <BlankSlot style={{ width: 658, height: 428 }} />
                            </BlankPanels>
                        )}

                        <ArrowButton
                            type="button"
                            $dir="next"
                            aria-label="Next log page"
                            disabled={pageIndex >= PAGE_COUNT - 1}
                            onClick={() => onPageChange(pageIndex + 1)}
                        >
                            <img src={arrowGlyph} alt="" />
                        </ArrowButton>
                    </ContentRow>

                    <PageTabs role="tablist" aria-label="Exercise log pages">
                        {Array.from({ length: PAGE_COUNT }, (_, index) => (
                            <PageTab
                                key={index}
                                type="button"
                                role="tab"
                                aria-selected={pageIndex === index}
                                aria-label={`Log page ${index + 1}${PAGES[index] ? "" : " (empty)"}`}
                                $active={pageIndex === index}
                                onClick={() => onPageChange(index)}
                            >
                                {index + 1}
                            </PageTab>
                        ))}
                    </PageTabs>
                </Design>
            </Panel>
        </Overlay>
    );
};

export default ExerciseLog;
