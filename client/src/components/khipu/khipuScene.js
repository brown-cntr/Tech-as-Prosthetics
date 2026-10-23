import { Application, Assets, Container, Graphics, Rectangle, Sprite } from "pixi.js";

export const STAGE_WIDTH = 1280;
export const STAGE_HEIGHT = 640;
export const ASSET_BASE = "/khipu-game/assets/";

const KHIPU_AREA = new Rectangle(330, 150, 615, 275);
const CORD_START_X = 335;
const CORD_SPACING = 100;
const CORD_Y = [145, 155, 162, 167, 165, 155];
export const MAX_CORDS = CORD_Y.length;

const KNOT_SIZE = 30;

const TEXTURE_FILES = [
    "background.png",
    "khipu.png",
    "cord.png",
    "base10texture.png",
    "onesTexture.png",
    "2digit.png",
    "3digit.png",
    "4digit.png",
    "5digit.png",
    "6digit.png",
    "7digit.png",
    "8digit.png",
    "9digit.png",
];

function drawPlaceLine(y, fromX, toX) {
    const line = new Graphics()
        .moveTo(fromX, y)
        .lineTo(toX, y)
        .stroke({ width: 5, color: "red" });
    line.alpha = 0.1;
    return line;
}

export async function createKhipuScene(host, { onKhipuPointerDown }) {
    const app = new Application();
    await app.init({
        width: STAGE_WIDTH,
        height: STAGE_HEIGHT,
        background: "#F7F5EA",
        antialias: true,
        resolution: Math.max(window.devicePixelRatio || 1, 2),
        autoDensity: true,
    });

    const loaded = await Assets.load(TEXTURE_FILES.map((file) => ASSET_BASE + file));
    const texture = (file) => loaded[ASSET_BASE + file];

    app.canvas.style.display = "block";
    app.canvas.style.width = "100%";
    app.canvas.style.height = "100%";
    host.appendChild(app.canvas);

    app.stage.eventMode = "static";

    const background = new Sprite(texture("background.png"));
    background.width = STAGE_WIDTH;
    background.height = STAGE_HEIGHT;
    app.stage.addChild(background);

    app.stage.addChild(drawPlaceLine(210, 200, 1100));
    app.stage.addChild(drawPlaceLine(300, 100, 1200));

    const khipu = new Sprite(texture("khipu.png"));
    khipu.position.set(200, 140);
    khipu.width = 900;
    khipu.height = 300;
    app.stage.addChild(khipu);

    const cordLayer = new Container();
    const knotLayer = new Container();
    app.stage.addChild(cordLayer, knotLayer);

    const khipuHitArea = new Container();
    khipuHitArea.hitArea = KHIPU_AREA;
    khipuHitArea.eventMode = "static";
    khipuHitArea.cursor = "crosshair";
    khipuHitArea.on("pointerdown", (event) => {
        const point = event.getLocalPosition(app.stage);
        onKhipuPointerDown(point.x, point.y);
    });
    app.stage.addChild(khipuHitArea);

    const cords = [];
    const knots = new Map();
    let nextKnotId = 1;

    return {
        addCord() {
            if (cords.length >= MAX_CORDS) return false;
            const index = cords.length;
            const cord = new Sprite(texture("cord.png"));
            cord.width = 28;
            cord.height = 275;
            cord.position.set(CORD_START_X + index * CORD_SPACING, CORD_Y[index]);
            cordLayer.addChild(cord);
            cords.push(cord);
            return true;
        },

        removeLastCord() {
            const cord = cords.pop();
            if (cord) cord.destroy();
        },

        addKnot(textureFile, x, y) {
            const knot = new Sprite(texture(textureFile));
            knot.anchor.set(0.5);
            knot.width = KNOT_SIZE;
            knot.height = KNOT_SIZE;
            knot.position.set(x, y);
            knotLayer.addChild(knot);
            const id = nextKnotId++;
            knots.set(id, knot);
            return id;
        },

        removeKnot(id) {
            const knot = knots.get(id);
            if (!knot) return;
            knot.destroy();
            knots.delete(id);
        },

        destroy() {
            app.destroy({ removeView: true }, { children: true });
        },
    };
}
