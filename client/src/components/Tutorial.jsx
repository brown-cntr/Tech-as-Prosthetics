import { useEffect, useId, useRef, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const LABELS = { begin: "Begin", next: "Next", back: "Back", start: "Start" };

const popup = {
    hidden: ({ duration }) => ({ opacity: 0, scale: 0.9, transition: { duration, ease: [0.55, 0, 0.75, 0.3] } }),
    shown: ({ duration }) => ({ opacity: 1, scale: 1, transition: { duration, ease: [0.22, 1, 0.36, 1] } }),
};


const SWAP_POINT = 0.5; // how far through the move the cards change layer

// Layers (higher = closer to you): the card you're reading rests on 2.
// zIndex can't blend between values, so it jumps after a delay: exactly at
// SWAP_POINT, when the moving card is furthest out to the side.
const withLayer = (move, zIndex, duration, ease) => ({
    ...move,
    zIndex,
    transition: { duration, ease, zIndex: { delay: duration * SWAP_POINT, duration: 0 } },
});

// Up and out toward the top-left corner, lifted slightly toward you, then back
// down to the middle. Mostly vertical, like sliding a card off the top of a deck.
const slideOut = () => ({
    x: ["0%", "-18%", "0%"],
    y: ["0%", "-20%", "0%"],
    rotate: [0, -9, 0],
    scale: [1, 1.03, 1],
});

// Each half of the move gets its own easing curve:
// lifting out starts quick and drifts to a soft stop at the top,
// tucking back starts gently and glides in to rest.
const MOVE_EASE = [
    [0.22, 1, 0.36, 1],
    [0.65, 0, 0.35, 1],
];

const deck = {
    // Where a new card starts.
    enter: ({ direction }) =>
        direction > 0
            ? { x: "0%", y: "0%", rotate: 0, scale: 0.98, zIndex: 1 } // already waiting under the top card
            : { x: "0%", y: "0%", rotate: 0, scale: 1, zIndex: 0 }, // at the bottom of the deck
    // How it becomes the card you're reading.
    center: ({ direction, duration }) =>
        direction > 0
            ? withLayer({ x: "0%", y: "0%", rotate: 0, scale: 1 }, 2, duration, [0.33, 1, 0.68, 1])
            : withLayer(slideOut(), 2, duration, MOVE_EASE), // out from under, onto the top
    // What the old card does.
    exit: ({ direction, duration }) =>
        direction > 0
            ? withLayer(slideOut(), 0, duration, MOVE_EASE) // goes out, tucks under
            : withLayer({ scale: 0.98 }, 1, duration, [0.33, 1, 0.68, 1]), // gets covered
};


const DIM = "rgba(0, 0, 0, 0.35)";

const VisuallyHidden = styled.p`
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
`;

/*
 * The dim layer behind the card is a huge box-shadow on the dialog instead of
 * ::backdrop. ::backdrop can't be animated, so it would vanish all at once when
 * the tutorial closes. A shadow belongs to the dialog, so it fades out with it.
 * The background is the same color so the strip around the buttons is dimmed too.
 */
const Dialog = styled(motion.dialog)`
    position: fixed;
    inset: 0;
    margin: auto;
    width: fit-content;
    height: fit-content;
    max-width: none;
    max-height: none;
    padding: 0;
    border: none;
    overflow: visible; /* cards slide outside the card area while turning */
    background: ${DIM};
    box-shadow: 0 0 0 200vmax ${DIM};

    &::backdrop {
        background: transparent;
    }
`;

// A one-cell grid: the leaving card and the arriving card sit in the same cell,
// stacked like a deck.
const PageStage = styled.div`
    display: grid;
`;

const PageImage = styled(motion.img)`
    grid-area: 1 / 1;
    display: block;
    width: auto;
    height: auto;
    max-width: ${(props) => props.$maxWidth};
    max-height: ${(props) => props.$maxHeight};
    transform-origin: 80% 100%; /* pivots near the bottom, like a card held in a hand */
    will-change: transform; /* lets the browser move the card on the GPU, without redrawing it */
`;

const Controls = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    padding-top: 12px;
`;

const ImageButton = styled.button`
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
    line-height: 0;

    img {
        display: block;
        height: ${(props) => props.$height};
        width: auto;
        transition: transform 120ms ease-out;
    }

    &:hover img {
        transform: scale(1.04);
    }

    &:active img {
        transform: scale(0.9);
    }

    &:focus-visible {
        outline: 3px solid #ffffff;
        outline-offset: 4px;
        box-shadow: 0 0 0 7px #1c0228;
    }
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
function TutorialDialog({ pages, buttons, label, onClose, maxWidth, maxHeight, buttonHeight, labels }) {
    const descriptionId = useId();
    const dialogRef = useRef(null);
    const primaryRef = useRef(null);
    const openerRef = useRef(null);
    const reduceMotion = useReducedMotion();

    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const total = pages.length;
    const isFirst = index === 0;
    const isLast = index === total - 1;
    const page = pages[index];
    const primaryKind = isLast ? "start" : isFirst ? "begin" : "next";

    // Everything the animations need, in one object passed as `custom`.
    const motionInfo = { direction, duration: reduceMotion ? 0 : 0.75 };
    const popupInfo = { duration: reduceMotion ? 0 : 0.35 };

    // Sets the page and the turn direction together, so they never disagree.
    const paginate = (step) => {
        setDirection(step);
        setIndex((current) => current + step);
    };

    const goNext = () => (isLast ? onClose() : paginate(1));
    const goBack = () => {
        if (!isFirst) paginate(-1);
    };

    const handleKeyDown = (event) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            if (!isLast) paginate(1);
        }
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            goBack();
        }
    };

    // Open as a modal, and hand focus back to whatever had it when closing.
    // The cleanup runs after the closing animation, when the dialog is removed.
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!openerRef.current) openerRef.current = document.activeElement;
        if (dialog && !dialog.open) dialog.showModal();
        return () => openerRef.current?.focus?.();
    }, []);

    // Back disappears on page 1, so move focus to the main button there.
    useEffect(() => {
        if (index === 0) primaryRef.current?.focus();
    }, [index]);

    // Load every page picture right away so turning a page never shows a blank.
    const sources = pages.map((item) => item.src).join("|");
    useEffect(() => {
        sources.split("|").forEach((src) => {
            const image = new Image();
            image.src = src;
        });
    }, [sources]);

    return (
        <Dialog
            ref={dialogRef}
            aria-label={label}
            aria-describedby={descriptionId}
            onKeyDown={handleKeyDown}
            onCancel={(event) => {
                event.preventDefault();
                onClose();
            }}
            custom={popupInfo}
            variants={popup}
            initial="hidden"
            animate="shown"
            exit="hidden"
        >
            <PageStage>
                {/* custom here gives the leaving card the new direction */}
                <AnimatePresence initial={false} custom={motionInfo}>
                    <PageImage
                        key={index}
                        src={page.src}
                        alt=""
                        draggable={false}
                        $maxWidth={maxWidth}
                        $maxHeight={maxHeight}
                        custom={motionInfo}
                        variants={deck}
                        initial="enter"
                        animate="center"
                        exit="exit"
                    />
                </AnimatePresence>
            </PageStage>
            <VisuallyHidden id={descriptionId} aria-live="polite">
                {`Page ${index + 1} of ${total}. ${page.alt}`}
            </VisuallyHidden>
            <Controls>
                {!isFirst && (
                    <ImageButton type="button" aria-label={labels.back} $height={buttonHeight} onClick={goBack}>
                        <img src={buttons.back} alt="" />
                    </ImageButton>
                )}
                <ImageButton
                    ref={primaryRef}
                    type="button"
                    aria-label={labels[primaryKind]}
                    $height={buttonHeight}
                    onClick={goNext}
                >
                    <img src={buttons[primaryKind]} alt="" />
                </ImageButton>
            </Controls>
        </Dialog>
    );
}

export default function Tutorial({
    open,
    onClose,
    pages,
    buttons,
    label,
    maxWidth = "65vw",
    maxHeight = "75vh",
    buttonHeight = "clamp(32px, 5vw, 64px)",
    labels = LABELS,
}) {
    const show = open && pages?.length > 0;

    // AnimatePresence keeps the dialog on screen after `open` turns false,
    // long enough for its closing animation to play. Then it removes it.
    return (
        <AnimatePresence>
            {show && (
                <TutorialDialog
                    key="tutorial"
                    pages={pages}
                    buttons={buttons}
                    label={label}
                    onClose={onClose}
                    maxWidth={maxWidth}
                    maxHeight={maxHeight}
                    buttonHeight={buttonHeight}
                    labels={{ ...LABELS, ...labels }}
                />
            )}
        </AnimatePresence>
    );
}