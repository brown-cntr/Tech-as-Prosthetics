import { Application, Assets, Container, Graphics, Rectangle, Sprite } from "pixi.js";

export const STAGE_WIDTH = 1280;
export const STAGE_HEIGHT = 640;
export const ASSET_BASE = "/khipu-game/assets/";
/** Bump when place-box / cord layout changes so React remounts the Pixi scene. */
export const SCENE_LAYOUT_REV = 4;

const KHIPU_AREA = new Rectangle(330, 150, 615, 275);
const CORD_START_X = 335;
const CORD_SPACING = 100;
const CORD_Y = [145, 155, 162, 167, 165, 155];
const CORD_WIDTH = 28;
const CORD_HEIGHT = 275;
export const MAX_CORDS = CORD_Y.length;

/** Place-value grid: fixed column size so boxes never resize as cords are added. */
const PLACE_BOX_GUTTER = 16;
const PLACE_BOX_W = CORD_SPACING - PLACE_BOX_GUTTER;
const PLACE_BOX_INSET_TOP = 28;
const PLACE_BOX_INSET_BOTTOM = 40;
const PLACE_BOX_GAP = 12;
const PLACE_BOX_RADIUS = 12;
const KNOT_SIZE = 34;
/** Top of the place-value grid (independent of each cord's hang Y). */
const PLACE_GRID_Y0 = Math.min(...CORD_Y) + PLACE_BOX_INSET_TOP;
const PLACE_GRID_H = CORD_HEIGHT - PLACE_BOX_INSET_TOP - PLACE_BOX_INSET_BOTTOM;

const ZONE_META = [
    { id: "hundreds", label: "Hundreds", value: 100, color: "#c8d2bc" },
    { id: "tens", label: "Tens", value: 10, color: "#b9c6d2" },
    { id: "ones", label: "Ones", value: 1, color: "#dcc0bc" },
];

/** Horizontal center of a hanging cord (sprite is center-anchored). */
export function cordCenterX(index) {
    return CORD_START_X + index * CORD_SPACING + CORD_WIDTH / 2;
}

/** Three stacked value boxes centered on a cord; rows/columns stay fixed size. */
export function zonesForCord(index, _cordCount = 1) {
    const i = Math.max(0, Math.min(index, CORD_Y.length - 1));
    const center = cordCenterX(i);
    const h = (PLACE_GRID_H - PLACE_BOX_GAP * (ZONE_META.length - 1)) / ZONE_META.length;
    return ZONE_META.map((meta, band) => ({
        ...meta,
        x: center - PLACE_BOX_W / 2,
        y: PLACE_GRID_Y0 + band * (h + PLACE_BOX_GAP),
        w: PLACE_BOX_W,
        h,
    }));
}

/** Stage position for the count label under a placed cord (0-based index). */
export function cordCountAnchor(index) {
    const i = Math.max(0, Math.min(index, CORD_Y.length - 1));
    return {
        left: cordCenterX(i),
        top: CORD_Y[i] + CORD_HEIGHT + 2,
    };
}

/**
 * Snap a click onto the cord whose value box contains the point.
 * X sticks to that rope; Y stays where clicked (clamped inside the box).
 */
export function resolveKnotPlacement(x, y, cordCount) {
    if (cordCount <= 0) return { ok: false, reason: "cord" };

    for (let i = 0; i < cordCount; i += 1) {
        const zone = zonesForCord(i, cordCount).find(
            (z) => x >= z.x && x <= z.x + z.w && y >= z.y && y < z.y + z.h,
        );
        if (!zone) continue;

        const margin = KNOT_SIZE / 2;
        const snapY = Math.min(zone.y + zone.h - margin, Math.max(zone.y + margin, y));

        return {
            ok: true,
            x: cordCenterX(i),
            y: snapY,
            placeValue: zone.value,
            zoneId: zone.id,
        };
    }

    return { ok: false, reason: "zone" };
}

const TEXTURE_FILES = [
    "background.png",
    "khipu.png",
    "cord.png",
    "cordSelected.png",
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

function hexToNum(hex) {
    return Number.parseInt(hex.replace("#", ""), 16);
}

function drawPlaceBoxes(placeLayer, cordCount) {
    for (const child of [...placeLayer.children]) {
        child.destroy();
    }
    for (let i = 0; i < cordCount; i += 1) {
        for (const zone of zonesForCord(i, cordCount)) {
            const radius = Math.min(PLACE_BOX_RADIUS, zone.w / 6);
            const box = new Graphics()
                .roundRect(zone.x, zone.y, zone.w, zone.h, radius)
                .fill({ color: hexToNum(zone.color), alpha: 0.62 })
                .roundRect(zone.x, zone.y, zone.w, zone.h, radius)
                .stroke({ width: 1, color: 0x8a7355, alpha: 0.22 });
            placeLayer.addChild(box);
        }
    }
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

    // Layer order matches Figma: boxes → main rope → pendant cord → knot.
    const placeLayer = new Container();
    placeLayer.eventMode = "none";
    app.stage.addChild(placeLayer);

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
    let selectedCord = -1;

    const paintCord = (cord, selected) => {
        cord.texture = texture(selected ? "cordSelected.png" : "cord.png");
        cord.anchor.set(0.5, 0);
        // Selected art is a thinner gold stroke (Figma Vector 196).
        cord.width = selected ? 14 : CORD_WIDTH;
        cord.height = CORD_HEIGHT;
    };

    const applyCordSelection = (index) => {
        selectedCord = index;
        cords.forEach((cord, i) => paintCord(cord, i === selectedCord));
    };

    return {
        addCord() {
            if (cords.length >= MAX_CORDS) return false;
            const index = cords.length;
            const cord = new Sprite(texture("cord.png"));
            cord.position.set(cordCenterX(index), CORD_Y[index]);
            cordLayer.addChild(cord);
            cords.push(cord);
            drawPlaceBoxes(placeLayer, cords.length);
            applyCordSelection(index);
            return true;
        },

        removeLastCord() {
            const cord = cords.pop();
            if (cord) cord.destroy();
            drawPlaceBoxes(placeLayer, cords.length);
            applyCordSelection(cords.length - 1);
        },

        /** Highlight the active hanging rope with the gold selected look. */
        selectCord(index) {
            if (index < 0 || index >= cords.length) return;
            applyCordSelection(index);
        },

        getSelectedCord() {
            return selectedCord;
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
