import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ASSET_BASE, MAX_CORDS, STAGE_HEIGHT, STAGE_WIDTH, createKhipuScene } from "./khipuScene.js";
import {
    GameSection,
    StageViewport,
    StageFrame,
    Stage,
    CanvasHost,
    Placed,
    ImageButton,
    HotspotButton,
    ExerciseText,
    Count,
    Feedback,
    ProgressList,
    DigitMenu,
    DigitStep,
    DigitValue,
    Overlay,
    Dialog,
    CloseButton,
    VisuallyHidden,
} from "./KhipuGameElements.jsx";

import Tutorial from "../../components/Tutorial.jsx";
import page1 from "../../assets/khipu-tutorial/page1.webp";
import page2 from "../../assets/khipu-tutorial/page2.webp";
import page3 from "../../assets/khipu-tutorial/page3.webp";
import begin from "../../assets/khipu-tutorial/begin.png";
import next from "../../assets/khipu-tutorial/next.png";
import back from "../../assets/khipu-tutorial/back.png";
import start from "../../assets/khipu-tutorial/start.png";

const TARGET_NUMBER = 203;
const EXERCISE_TEXT = `In this exercise, represent the number ${TARGET_NUMBER} on a khipu! Use only one cord.`;
const MIN_WRAPS = 2;
const MAX_WRAPS = 9;

//for the tutorial
const BUTTONS = { begin, next, back, start };

//first tutorial block
const PAGES = [
    { src: page1, alt: "Page one text" },
    { src: page2, alt: "Page two text" },
    { src: page3, alt: "Page three text" },
];

const KNOT_TOOLS = {
    single: { label: "Single knot", hotspotX: 55 },
    long: { label: "Long knot", hotspotX: 135 },
    ones: { label: "Ones knot", hotspotX: 215 },
};

const KNOT_BANK = { x: 440, y: 465 };
const PROGRESS_STEPS = ["I.  Observe", "II.  Practice", "III.  Design", "IV.  Interpret"];

const asset = (file) => ASSET_BASE + file;

function placeValueAt(y) {
    if (y < 200) return 100;
    if (y < 300) return 10;
    return 1;
}

function knotFor(tool, wraps) {
    if (tool === "long") return { textureFile: `${wraps}digit.png`, value: wraps };
    if (tool === "ones") return { textureFile: "onesTexture.png", value: 1 };
    return { textureFile: "base10texture.png", value: 1 };
}

const KhipuGame = () => {
    const navigate = useNavigate();
    const viewportRef = useRef(null);
    const canvasHostRef = useRef(null);
    const sceneRef = useRef(null);
    const placeKnotRef = useRef(() => {});
    const dialogReturnFocusRef = useRef(null);
    const closeButtonRef = useRef(null);

    const [scale, setScale] = useState(1);
    const [tool, setTool] = useState(null);
    const [wraps, setWraps] = useState(MIN_WRAPS);
    const [history, setHistory] = useState([]);
    const [message, setMessage] = useState(null);
    const [dialog, setDialog] = useState(null);

    const count = history.reduce((sum, action) => sum + (action.value ?? 0), 0);
    const cordCount = history.filter((action) => action.type === "cord").length;

    useLayoutEffect(() => {
        const viewport = viewportRef.current;
        const fit = () => {
            const { width, height } = viewport.getBoundingClientRect();
            setScale(Math.max(0.3, Math.min(width / STAGE_WIDTH, height / STAGE_HEIGHT)));
        };
        fit();
        const observer = new ResizeObserver(fit);
        observer.observe(viewport);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        let cancelled = false;
        let scene = null;
        createKhipuScene(canvasHostRef.current, {
            onKhipuPointerDown: (x, y) => placeKnotRef.current(x, y),
        }).then((created) => {
            if (cancelled) {
                created.destroy();
                return;
            }
            scene = created;
            sceneRef.current = created;
        });
        return () => {
            cancelled = true;
            scene?.destroy();
            sceneRef.current = null;
        };
    }, []);

    const placeKnot = (x, y) => {
        const scene = sceneRef.current;
        if (!scene) return;
        if (!tool) {
            setMessage({ tone: "info", text: "Pick a knot from the knot bank first." });
            return;
        }
        const { textureFile, value } = knotFor(tool, wraps);
        const id = scene.addKnot(textureFile, x, y);
        setHistory((previous) => [...previous, { type: "knot", id, value: value * placeValueAt(y) }]);
        setMessage(null);
    };

    useEffect(() => {
        placeKnotRef.current = placeKnot;
    });

    const addCord = () => {
        const scene = sceneRef.current;
        if (!scene) return;
        if (!scene.addCord()) {
            setMessage({ tone: "info", text: `The khipu can hold up to ${MAX_CORDS} cords.` });
            return;
        }
        setHistory((previous) => [...previous, { type: "cord" }]);
        setMessage(null);
    };

    const undo = () => {
        const scene = sceneRef.current;
        const last = history[history.length - 1];
        if (!scene || !last) return;
        if (last.type === "knot") scene.removeKnot(last.id);
        else scene.removeLastCord();
        setHistory(history.slice(0, -1));
        setMessage(null);
    };

    const checkAnswer = () => {
        if (count === TARGET_NUMBER) {
            setMessage({ tone: "correct", text: "Correct, good job!" });
        } else if (count > TARGET_NUMBER) {
            setMessage({ tone: "info", text: "Looks like you went over the target. Use undo to remove knots and try again!" });
        } else {
            setMessage({ tone: "info", text: `Not quite yet: your khipu shows ${count}. Keep adding knots.` });
        }
    };

    const openDialog = (name, event) => {
        dialogReturnFocusRef.current = event.currentTarget;
        setDialog(name);
    };

    const closeDialog = () => setDialog(null);

    useEffect(() => {
        if (!dialog) return;
        closeButtonRef.current?.focus();
        const onKeyDown = (event) => {
            if (event.key === "Escape") setDialog(null);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            dialogReturnFocusRef.current?.focus();
        };
    }, [dialog]);
    const [open, setOpen] = useState(true);
    
    return (
        <GameSection aria-label="Khipu game">
            <StageViewport ref={viewportRef}>
                <StageFrame style={{ width: STAGE_WIDTH * scale, height: STAGE_HEIGHT * scale }}>
                    <Stage style={{ width: STAGE_WIDTH, height: STAGE_HEIGHT, transform: `scale(${scale})` }}>
                        <CanvasHost
                            ref={canvasHostRef}
                            role="img"
                            aria-label={`Khipu with ${cordCount} ${cordCount === 1 ? "cord" : "cords"} and ${history.length - cordCount} knots`}
                        />
                        <Tutorial
                            open={open}
                            onClose={() => setOpen(false)}
                            pages={PAGES}
                            buttons={BUTTONS}
                            label="Test tutorial"
                        />

                        <ImageButton
                            type="button"
                            aria-label="Exit to Experiences"
                            onClick={() => navigate("/projects")}
                            style={{ left: 25, top: 30, width: 30, height: 35 }}
                        >
                            <img src={asset("exit.png")} alt="" />
                        </ImageButton>

                        <Placed style={{ left: 50, top: 150, width: 40, height: 350 }}>
                            <img src={asset("noProgressCord.png")} alt="" style={{ width: "100%", height: "100%" }} />
                        </Placed>
                        <ProgressList aria-label="Lesson progress">
                            {PROGRESS_STEPS.map((step) => (
                                <li key={step}>{step}</li>
                            ))}
                        </ProgressList>

                        <Placed style={{ left: 325, top: 25, width: 650, height: 90 }}>
                            <img src={asset("textBox.png")} alt="" style={{ width: "100%", height: "100%" }} />
                            <ExerciseText>{EXERCISE_TEXT}</ExerciseText>
                        </Placed>

                        <Count aria-live="polite">Count: {count}</Count>

                        {message && (
                            <Feedback $tone={message.tone} role="status">
                                {message.text}
                            </Feedback>
                        )}

                        <Placed style={{ left: 1175, top: 40, width: 50, height: 300 }}>
                            <img src={asset("menuoptions.png")} alt="" style={{ width: "100%", height: "100%" }} />
                        </Placed>
                        <ImageButton
                            type="button"
                            aria-label="Open the khipu guide"
                            aria-haspopup="dialog"
                            onClick={(event) => openDialog("guide", event)}
                            style={{ left: 1175, top: 40, width: 50, height: 50 }}
                        />
                        <ImageButton
                            type="button"
                            aria-label="Show a hint"
                            aria-haspopup="dialog"
                            onClick={(event) => openDialog("hint", event)}
                            style={{ left: 1175, top: 200, width: 50, height: 50 }}
                        />

                        <Placed style={{ left: KNOT_BANK.x, top: KNOT_BANK.y, width: 400, height: 150 }}>
                            <img src={asset("knotbank.png")} alt="" style={{ width: "100%", height: "100%" }} />
                        </Placed>
                        {Object.entries(KNOT_TOOLS).map(([name, { label, hotspotX }]) => (
                            <HotspotButton
                                key={name}
                                type="button"
                                aria-label={label}
                                aria-pressed={tool === name}
                                onClick={() => {
                                    setTool(tool === name ? null : name);
                                    setMessage(null);
                                }}
                                style={{ left: KNOT_BANK.x + hotspotX, top: KNOT_BANK.y + 5, width: 50, height: 80 }}
                            />
                        ))}
                        <HotspotButton
                            type="button"
                            aria-label="Add a cord"
                            onClick={addCord}
                            style={{ left: KNOT_BANK.x + 280, top: KNOT_BANK.y + 5, width: 60, height: 80 }}
                        />

                        {tool === "long" && (
                            <DigitMenu role="group" aria-label="Long knot wraps">
                                <DigitStep
                                    type="button"
                                    aria-label="Fewer wraps"
                                    disabled={wraps <= MIN_WRAPS}
                                    onClick={() => setWraps(wraps - 1)}
                                    style={{ left: 15 }}
                                />
                                <DigitValue aria-live="polite">{wraps}</DigitValue>
                                <DigitStep
                                    type="button"
                                    aria-label="More wraps"
                                    disabled={wraps >= MAX_WRAPS}
                                    onClick={() => setWraps(wraps + 1)}
                                    style={{ left: 65 }}
                                />
                            </DigitMenu>
                        )}

                        <ImageButton
                            type="button"
                            aria-label="Undo"
                            disabled={history.length === 0}
                            onClick={undo}
                            style={{ left: 850, top: 565, width: 30, height: 35 }}
                        >
                            <img src={asset("undoButton.png")} alt="" />
                        </ImageButton>

                        <ImageButton
                            type="button"
                            aria-label="Check answer"
                            onClick={checkAnswer}
                            style={{ left: 950, top: 550, width: 180, height: 40 }}
                        >
                            <img src={asset("checkAnswer.png")} alt="" />
                        </ImageButton>

                        {dialog && (
                            <Overlay onClick={closeDialog}>
                                <Dialog
                                    role="dialog"
                                    aria-modal="true"
                                    aria-label={dialog === "guide" ? "Khipu guide" : "Hint"}
                                    onClick={(event) => event.stopPropagation()}
                                    style={
                                        dialog === "guide"
                                            ? { left: 290, top: 100, width: 750, height: 425 }
                                            : { left: 265, top: 200, width: 750, height: 238 }
                                    }
                                >
                                    {dialog === "guide" ? (
                                        <img src={asset("khipuGuide1.webp")} alt="Guide to reading khipu knots and place values" />
                                    ) : (
                                        <img src={asset("hintSprite.png")} alt="Hint: How many turns should the long knot have to represent a number?" />
                                    )}
                                    <CloseButton
                                        ref={closeButtonRef}
                                        type="button"
                                        onClick={closeDialog}
                                        style={dialog === "guide" ? { left: 671, top: 19 } : { left: 672, top: 26 }}
                                    >
                                        <VisuallyHidden>Close</VisuallyHidden>
                                    </CloseButton>
                                </Dialog>
                            </Overlay>
                        )}
                    </Stage>
                </StageFrame>
            </StageViewport>
        </GameSection>
    );
};

export default KhipuGame;
