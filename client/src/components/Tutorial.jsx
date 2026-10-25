import { useEffect, useId, useRef, useState } from "react";
import styled from "styled-components";

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

const Dialog = styled.dialog`
    position: fixed;
    inset: 0;
    margin: auto;
    width: fit-content;
    height: fit-content;
    max-width: none;
    max-height: none;
    padding: 0;
    border: none;
    overflow: hidden;
    background: transparent;

    &::backdrop {
        background: rgba(0, 0, 0, 0.35);
    }
`;

const PageImage = styled.img`
    display: block;
    width: auto;
    height: auto;
    max-width: ${(props) => props.$maxWidth};
    max-height: ${(props) => props.$maxHeight};
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
    }

    &:active img {
        transform: scale(0.96);
    }

    &:focus-visible {
        outline: 3px solid #ffffff;
        outline-offset: 4px;
        box-shadow: 0 0 0 7px #1c0228;
    }
`;

const LABELS = { begin: "Begin", next: "Next", back: "Back", start: "Start" };

function TutorialDialog({ pages, buttons, label, onClose, maxWidth, maxHeight, buttonHeight, labels }) {
    const descriptionId = useId();
    const dialogRef = useRef(null);
    const primaryRef = useRef(null);
    const openerRef = useRef(null);

    const [index, setIndex] = useState(0);
    const total = pages.length;
    const isFirst = index === 0;
    const isLast = index === total - 1;
    const page = pages[index];
    const primaryKind = isLast ? "start" : isFirst ? "begin" : "next";
    const goNext = () => (isLast ? onClose() : setIndex(index + 1));
    const goBack = () => setIndex(Math.max(0, index - 1));
    const handleKeyDown = (event) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            if (!isLast) setIndex(index + 1);
        }
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            goBack();
        }
    };

    // Open as a modal, and hand focus back to whatever had it when closing.
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
        >
            <PageImage src={page.src} alt="" $maxWidth={maxWidth} $maxHeight={maxHeight} />
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
                                $height="clamp(32px, 5vw, 64px)"
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
    if (!open || !pages?.length) return null;
    return (
        <TutorialDialog
            pages={pages}
            buttons={buttons}
            label={label}
            onClose={onClose}
            maxWidth={maxWidth}
            maxHeight={maxHeight}
            buttonHeight={buttonHeight}
            labels={{ ...LABELS, ...labels }}
        />
    );
}