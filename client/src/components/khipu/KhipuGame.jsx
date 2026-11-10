import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ASSET_BASE,
    MAX_CORDS,
    SCENE_LAYOUT_REV,
    STAGE_HEIGHT,
    STAGE_WIDTH,
    cordCenterX,
    cordCountAnchor,
    createKhipuScene,
    resolveKnotPlacement,
    zonesForCord,
} from "./khipuScene.js";
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
    PlaceBoxLabel,
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
import ExerciseLog from "./ExerciseLog.jsx";

const TARGET_NUMBER = 203;
const EXERCISE_TEXT = `In this exercise, represent the number ${TARGET_NUMBER} on a khipu! Use only one cord.`;
const MIN_WRAPS = 2;
const MAX_WRAPS = 9;

const KNOT_TOOLS = {
    single: { label: "Single knot", hotspotX: 55 },
    long: { label: "Long knot", hotspotX: 135 },
    ones: { label: "Ones knot", hotspotX: 215 },
};

const KNOT_BANK = { x: 440, y: 465 };
const PROGRESS_STEPS = ["I.  Observe", "II.  Practice", "III.  Design", "IV.  Interpret"];

const asset = (file) => ASSET_BASE + file;

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
    const [logPage, setLogPage] = useState(0);
    const [selectedCord, setSelectedCord] = useState(-1);

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
    }, [SCENE_LAYOUT_REV]);

    const placeKnot = (x, y) => {
        const scene = sceneRef.current;
        if (!scene) return;
        if (!tool) {
            setMessage({ tone: "info", text: "Pick a knot from the knot bank first." });
            return;
        }

        const placement = resolveKnotPlacement(x, y, cordCount);
        if (!placement.ok) {
            if (placement.reason === "cord") {
                setMessage({ tone: "info", text: "Add a cord first, then place knots on it." });
            } else {
                setMessage({
                    tone: "info",
                    text: "Place the knot inside the Hundreds, Tens, or Ones box.",
                });
            }
            return;
        }

        let nearest = 0;
        let nearestDist = Infinity;
        for (let i = 0; i < cordCount; i += 1) {
            const dist = Math.abs(placement.x - cordCenterX(i));
            if (dist < nearestDist) {
                nearestDist = dist;
                nearest = i;
            }
        }
        scene.selectCord(nearest);
        setSelectedCord(nearest);

        const { textureFile, value } = knotFor(tool, wraps);
        const id = scene.addKnot(textureFile, placement.x, placement.y);
        setHistory((previous) => [
            ...previous,
            { type: "knot", id, value: value * placement.placeValue },
        ]);
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
        setSelectedCord(scene.getSelectedCord());
        setMessage(null);
    };

    const undo = () => {
        const scene = sceneRef.current;
        const last = history[history.length - 1];
        if (!scene || !last) return;
        if (last.type === "knot") scene.removeKnot(last.id);
        else {
            scene.removeLastCord();
            setSelectedCord(scene.getSelectedCord());
        }
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
        if (name === "log") setLogPage(0);
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

                        {Array.from({ length: cordCount }, (_, cordIndex) =>
                            zonesForCord(cordIndex, cordCount).map((zone) => (
                                <PlaceBoxLabel
                                    key={`${cordIndex}-${zone.id}`}
                                    aria-hidden="true"
                                    $tone={zone.id}
                                    $left={zone.x + 6}
                                    $top={zone.y + 6}
                                >
                                    {zone.label}
                                </PlaceBoxLabel>
                            )),
                        )}

                        {cordCount > 0 && selectedCord >= 0 && (
                            <Count
                                aria-live="polite"
                                $left={cordCountAnchor(selectedCord).left}
                                $top={cordCountAnchor(selectedCord).top}
                            >
                                Count: <strong>{count}</strong>
                            </Count>
                        )}

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
                            aria-label="Open the exercise log"
                            aria-haspopup="dialog"
                            onClick={(event) => openDialog("log", event)}
                            style={{ left: 1175, top: 115, width: 50, height: 55 }}
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

                        <ExerciseLog
                            open={dialog === "log"}
                            pageIndex={logPage}
                            onPageChange={setLogPage}
                            onClose={closeDialog}
                        />

                        {dialog && dialog !== "log" && (
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
                                        <img src={asset("khipuGuide1.svg")} alt="Guide to reading khipu knots and place values" />
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
