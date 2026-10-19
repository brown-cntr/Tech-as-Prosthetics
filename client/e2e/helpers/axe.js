import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/test";
import { recordAxeScan } from "./report-store.js";

/** WCAG 2.2 AA–oriented axe tags (includes 2.0/2.1 AA precursors). */
export const WCAG_22_AA_TAGS = [
  "wcag2a",
  "wcag2aa",
  "wcag21a",
  "wcag21aa",
  "wcag22aa",
];

export function formatViolations(violations) {
  return violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    help: v.help,
    description: v.description,
    helpUrl: v.helpUrl,
    tags: v.tags,
    nodes: v.nodes.map((n) => ({
      target: n.target,
      html: n.html?.slice(0, 240),
      failureSummary: n.failureSummary,
      remediation: n.failureSummary || v.help,
    })),
  }));
}

export function violationsFailureMessage(route, theme, violations) {
  const lines = [
    `axe WCAG 2.2 AA failed on ${route} (${theme}): ${violations.length} rule(s)`,
  ];
  for (const v of violations) {
    lines.push(`\n[${v.impact || "unknown"}] ${v.id}: ${v.help}`);
    for (const node of v.nodes.slice(0, 5)) {
      lines.push(`  selector: ${node.target.join(" ")}`);
      if (node.failureSummary) {
        lines.push(
          `  remediation: ${node.failureSummary.split("\n").join(" | ")}`
        );
      }
    }
  }
  return lines.join("\n");
}

/**
 * Run axe against the current page and record results for the summary report.
 * Fails the test when any violations are found.
 */
export async function assertNoA11yViolations(page, { route, theme }) {
  const results = await new AxeBuilder({ page })
    .withTags(WCAG_22_AA_TAGS)
    .analyze();

  const formatted = formatViolations(results.violations);
  recordAxeScan({
    route,
    theme,
    url: page.url(),
    violationCount: formatted.length,
    violations: formatted,
    incomplete: results.incomplete?.slice(0, 10).map((v) => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      nodes: v.nodes.slice(0, 3).map((n) => ({ target: n.target })),
    })),
  });

  expect(
    formatted,
    violationsFailureMessage(route, theme, formatted)
  ).toEqual([]);
}
