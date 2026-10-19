/**
 * DEPRECATED: Prefer the Playwright suite.
 *   npm run test:a11y
 * Reports: test-results/a11y-report.json and test-results/a11y-report.md
 *
 * Kept as a one-off Puppeteer reference; not part of the permanent workflow.
 */
import puppeteer from "puppeteer";
import { AxePuppeteer } from "@axe-core/puppeteer";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.A11Y_BASE || "http://127.0.0.1:5173";
const ROUTES = ["/", "/index", "/projects", "/team", "/khipu"];
const THEMES = ["light", "dark"];
const OUT = path.resolve("scripts/a11y-audit-results.json");

function relativeLuminance({ r, g, b }) {
  const lin = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

function contrast(a, b) {
  const L1 = relativeLuminance(a);
  const L2 = relativeLuminance(b);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

const TOKENS = {
  light: {
    text: "#524a5c",
    "text-h": "#08060d",
    bg: "#f2f0e9",
    page: "#f2f0e9",
    nav: "#e6e3da",
    ink: "#000000",
    muted: "#635371",
    surface: "#e4d9b5",
    card: "#faf9f7",
    block: "#c4c0b5",
    gallery: "#9e9a90",
    rule: "#333333",
    buttonPurple: "#b09cc4",
    buttonPurpleActive: "#8f7aa8",
    white: "#ffffff",
    black: "#000000",
    khipuBg: "#F7F5EA",
    meetTeamBg: "#E4D9B5",
  },
  dark: {
    text: "#e4dfd4",
    "text-h": "#f4f1ea",
    bg: "#1c1a17",
    page: "#1c1a17",
    nav: "#2a2723",
    ink: "#f2f0e9",
    muted: "#c4b3d4",
    surface: "#3d362c",
    card: "#2a2723",
    block: "#4a463f",
    gallery: "#3f3c36",
    rule: "#cfc6b4",
    buttonPurple: "#b09cc4",
    buttonPurpleActive: "#8f7aa8",
    white: "#ffffff",
    black: "#000000",
    khipuBg: "#F7F5EA",
    meetTeamBg: "#E4D9B5",
  },
};

const PAIRINGS = [
  ["text", "page", "body on page", 4.5],
  ["text", "bg", "body on bg", 4.5],
  ["text-h", "page", "heading on page", 4.5],
  ["ink", "nav", "nav link on nav", 4.5],
  ["ink", "surface", "ink on surface/footer", 4.5],
  ["muted", "nav", "theme icon / muted on nav", 3.0],
  ["muted", "page", "muted on page", 4.5],
  ["white", "buttonPurple", "Learn More button text", 4.5],
  ["white", "buttonPurpleActive", "Learn More active", 4.5],
  ["black", "meetTeamBg", "Meet the Team button", 4.5],
  ["ink", "card", "ink on card", 4.5],
  ["text", "card", "body on card", 4.5],
  ["text", "surface", "body on surface", 4.5],
  ["text", "block", "body on block", 4.5],
  ["white", "surface", "footer hover white on surface", 4.5],
];

function tokenContrastReport() {
  const report = {};
  for (const theme of THEMES) {
    const t = TOKENS[theme];
    report[theme] = PAIRINGS.map(([fg, bg, label, threshold]) => {
      const ratio = contrast(hexToRgb(t[fg]), hexToRgb(t[bg]));
      return {
        label,
        fg: `${fg} ${t[fg]}`,
        bg: `${bg} ${t[bg]}`,
        ratio: Math.round(ratio * 100) / 100,
        threshold,
        pass: ratio >= threshold,
      };
    });
  }
  return report;
}

async function collectDomSignals(page) {
  return page.evaluate(() => {
    const imgs = [...document.querySelectorAll("img")].map((img) => ({
      src: img.getAttribute("src")?.slice(0, 80),
      alt: img.getAttribute("alt"),
      hasAlt: img.hasAttribute("alt"),
    }));
    const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => ({
      tag: h.tagName,
      text: (h.textContent || "").trim().slice(0, 80),
    }));
    const buttons = [...document.querySelectorAll("button, [role=button], a")].map((el) => {
      const name =
        el.getAttribute("aria-label") ||
        el.getAttribute("title") ||
        (el.textContent || "").trim().slice(0, 60);
      return {
        tag: el.tagName,
        name,
        href: el.getAttribute("href"),
        emptyName: !name,
      };
    });
    const focusables = [...document.querySelectorAll("a,button,input,select,textarea,[tabindex]")]
      .filter((el) => el.getAttribute("tabindex") !== "-1")
      .length;
    const reducedMotion = getComputedStyle(document.documentElement).getPropertyValue(
      "animation"
    );
    return {
      title: document.title,
      theme: document.documentElement.dataset.theme,
      imgs,
      headings,
      buttonsMissingName: buttons.filter((b) => b.emptyName),
      buttonCount: buttons.length,
      focusableCount: focusables,
      hasMain: !!document.querySelector("main"),
      hasSkipLink: !!document.querySelector('a[href="#main"], a[href="#content"], .skip-link'),
      hashLinks: [...document.querySelectorAll('a[href="#"]')].length,
      prefersReducedMotionQuery: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    };
  });
}

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH ||
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const results = {
    generatedAt: new Date().toISOString(),
    base: BASE,
    wcag: "WCAG 2.2 AA (axe tags: wcag2a,wcag2aa,wcag21a,wcag21aa,wcag22aa)",
    tokenContrast: tokenContrastReport(),
    scans: [],
    limitations: [],
  };

  try {
    for (const theme of THEMES) {
      for (const route of ROUTES) {
        const page = await browser.newPage();
        await page.setViewport({ width: 1440, height: 900 });
        const url = BASE + route;
        let consoleErrors = [];
        page.on("pageerror", (err) => consoleErrors.push(String(err.message || err)));
        page.on("console", (msg) => {
          if (msg.type() === "error") consoleErrors.push(msg.text());
        });

        try {
          await page.goto(url, { waitUntil: "networkidle0", timeout: 45000 });
          await page.evaluate((t) => {
            document.documentElement.dataset.theme = t;
            localStorage.setItem("theme", t);
          }, theme);
          // allow styled-components / paint
          await page.waitForTimeout?.(300);
          await new Promise((r) => setTimeout(r, 500));

          // projects sheet: try open for interaction coverage
          if (route === "/projects") {
            try {
              await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.35));
              await new Promise((r) => setTimeout(r, 800));
            } catch {}
          }

          const axe = await new AxePuppeteer(page)
            .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
            .analyze();

          const dom = await collectDomSignals(page);

          // sample computed text/bg for a few key nodes
          const samples = await page.evaluate(() => {
            function parseRgb(str) {
              const m = str?.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
              return m ? { r: +m[1], g: +m[2], b: +m[3] } : null;
            }
            function lum({ r, g, b }) {
              const lin = [r, g, b].map((c) => {
                const s = c / 255;
                return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
              });
              return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
            }
            function ratio(a, b) {
              if (!a || !b) return null;
              const L1 = lum(a);
              const L2 = lum(b);
              return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
            }
            function sample(sel) {
              const el = document.querySelector(sel);
              if (!el) return null;
              const cs = getComputedStyle(el);
              let bgEl = el;
              let bg = parseRgb(cs.backgroundColor);
              while (bgEl && (!bg || (bg.r === 0 && bg.g === 0 && bg.b === 0 && cs.backgroundColor.includes("0)")))) {
                bgEl = bgEl.parentElement;
                if (!bgEl) break;
                const bcs = getComputedStyle(bgEl);
                const parsed = parseRgb(bcs.backgroundColor);
                if (parsed && !(bcs.backgroundColor.includes("rgba") && bcs.backgroundColor.endsWith(", 0)"))) {
                  // opaque-ish
                  if (!bcs.backgroundColor.includes("rgba") || !/, 0\)/.test(bcs.backgroundColor)) {
                    bg = parsed;
                    if (!bcs.backgroundColor.includes("rgba") || parseFloat(bcs.backgroundColor.split(",")[3]) >= 1) break;
                  }
                }
              }
              // walk for non-transparent bg
              bgEl = el;
              bg = null;
              while (bgEl) {
                const bcs = getComputedStyle(bgEl);
                const parsed = parseRgb(bcs.backgroundColor);
                if (parsed) {
                  const alphaMatch = bcs.backgroundColor.match(/rgba?\([^)]+,\s*([0-9.]+)\)/);
                  const alpha = alphaMatch ? parseFloat(alphaMatch[1]) : 1;
                  if (alpha >= 0.95) {
                    bg = parsed;
                    break;
                  }
                }
                bgEl = bgEl.parentElement;
              }
              const fg = parseRgb(cs.color);
              return {
                sel,
                color: cs.color,
                backgroundColor: bg ? `rgb(${bg.r}, ${bg.g}, ${bg.b})` : "unknown",
                ratio: ratio(fg, bg) ? Math.round(ratio(fg, bg) * 100) / 100 : null,
                fontSize: cs.fontSize,
                fontWeight: cs.fontWeight,
              };
            }
            return {
              navLink: sample("nav a"),
              bodyP: sample("p"),
              h1: sample("h1"),
              themeBtn: sample("nav button"),
              learnMore: sample("button"),
            };
          });

          results.scans.push({
            route,
            theme,
            url,
            violationCount: axe.violations.length,
            incompleteCount: axe.incomplete.length,
            violations: axe.violations.map((v) => ({
              id: v.id,
              impact: v.impact,
              description: v.description,
              help: v.help,
              helpUrl: v.helpUrl,
              tags: v.tags,
              nodes: v.nodes.slice(0, 8).map((n) => ({
                target: n.target,
                html: n.html?.slice(0, 200),
                failureSummary: n.failureSummary,
              })),
            })),
            incomplete: axe.incomplete.slice(0, 10).map((v) => ({
              id: v.id,
              impact: v.impact,
              description: v.description,
              nodes: v.nodes.slice(0, 3).map((n) => ({ target: n.target, html: n.html?.slice(0, 120) })),
            })),
            dom,
            samples,
            consoleErrors: consoleErrors.slice(0, 20),
          });
        } catch (err) {
          results.scans.push({
            route,
            theme,
            url,
            error: String(err.message || err),
            consoleErrors,
          });
          results.limitations.push(`Failed to scan ${route} (${theme}): ${err.message || err}`);
        } finally {
          await page.close();
        }
      }
    }
  } finally {
    await browser.close();
  }

  results.limitations.push(
    "System prefers-color-scheme is not used by the app (explicit localStorage theme only).",
    "Khipu PixiJS canvas content (knots/cords graphics) is not fully evaluable by axe DOM rules.",
    "Projects bottom sheet and all snap states not exhaustively exercised.",
    "Hover/focus/active/disabled visual states not fully automated beyond axe color-contrast on static DOM.",
    "Responsive breakpoints not scanned (desktop 1440x900 only).",
    "BrowserStack cloud scan not used for localhost; local axe-core used instead."
  );

  fs.writeFileSync(OUT, JSON.stringify(results, null, 2));
  console.log(`Wrote ${OUT}`);
  console.log(
    "Summary:",
    results.scans.map((s) => `${s.theme}${s.route}: ${s.violationCount ?? "ERR"}v`).join(" | ")
  );
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
