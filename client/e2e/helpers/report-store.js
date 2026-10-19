import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { KNOWN_LIMITATIONS } from "./routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "../../test-results");
const STORE_PATH = path.join(OUT_DIR, ".a11y-scan-store.json");

function readStore() {
  try {
    return JSON.parse(fs.readFileSync(STORE_PATH, "utf8"));
  } catch {
    return { scans: [], skipped: [], meta: {} };
  }
}

function writeStore(store) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2));
}

export function resetReportStore(meta = {}) {
  writeStore({
    scans: [],
    skipped: [],
    meta: {
      generatedAt: new Date().toISOString(),
      ...meta,
    },
  });
}

export function recordAxeScan(scan) {
  const store = readStore();
  store.scans.push({ ...scan, recordedAt: new Date().toISOString() });
  writeStore(store);
}

export function recordSkipped(entry) {
  const store = readStore();
  store.skipped.push(entry);
  writeStore(store);
}

export function writeFinalReports({ testSummary } = {}) {
  const store = readStore();
  const report = {
    generatedAt: new Date().toISOString(),
    standard: "WCAG 2.2 AA (axe tags: wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa)",
    meta: store.meta,
    summary: {
      scanCount: store.scans.length,
      scansWithViolations: store.scans.filter((s) => s.violationCount > 0).length,
      totalViolations: store.scans.reduce((n, s) => n + (s.violationCount || 0), 0),
      skippedChecks: store.skipped.length,
      ...testSummary,
    },
    scans: store.scans,
    skipped: store.skipped,
    knownLimitations: KNOWN_LIMITATIONS,
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const jsonPath = path.join(OUT_DIR, "a11y-report.json");
  const mdPath = path.join(OUT_DIR, "a11y-report.md");
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));

  const lines = [
    "# Accessibility regression report",
    "",
    `Generated: ${report.generatedAt}`,
    `Standard: ${report.standard}`,
    "",
    "## Summary",
    "",
    `- Scans: ${report.summary.scanCount}`,
    `- Scans with violations: ${report.summary.scansWithViolations}`,
    `- Total violation rules: ${report.summary.totalViolations}`,
    `- Skipped checks recorded: ${report.summary.skippedChecks}`,
    `- Playwright tests passed: ${report.summary.passed ?? "n/a"}`,
    `- Playwright tests failed: ${report.summary.failed ?? "n/a"}`,
    `- Playwright tests skipped: ${report.summary.skipped ?? "n/a"}`,
    "",
    "## Scans by route × theme",
    "",
  ];

  for (const scan of store.scans) {
    lines.push(
      `- \`${scan.theme}\` \`${scan.route}\`: ${scan.violationCount} violation rule(s)`
    );
    for (const v of scan.violations || []) {
      lines.push(
        `  - **${v.impact || "?"}** \`${v.id}\` — ${v.help}`
      );
      for (const node of (v.nodes || []).slice(0, 3)) {
        lines.push(`    - selector: \`${node.target?.join(" ") || "?"}\``);
      }
    }
  }

  if (store.skipped.length) {
    lines.push("", "## Skipped / deferred checks", "");
    for (const s of store.skipped) {
      lines.push(`- ${s.reason}${s.route ? ` (${s.route})` : ""}`);
    }
  }

  lines.push("", "## Known limitations", "");
  for (const lim of KNOWN_LIMITATIONS) {
    lines.push(`- ${lim}`);
  }
  lines.push("");

  fs.writeFileSync(mdPath, lines.join("\n"));
  return { jsonPath, mdPath, report };
}
