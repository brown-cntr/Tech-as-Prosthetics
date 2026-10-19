import { test } from "@playwright/test";
import { assertNoA11yViolations } from "./helpers/axe.js";
import { ROUTES, THEMES } from "./helpers/routes.js";
import { gotoWithTheme } from "./helpers/theme.js";

test.describe("WCAG 2.2 AA route matrix", () => {
  for (const theme of THEMES) {
    for (const route of ROUTES) {
      test(`${theme} ${route}`, async ({ page }) => {
        await gotoWithTheme(page, route, theme);
        // Allow lazy route chunks (e.g. khipu) and styled paint to settle.
        await page.waitForTimeout(400);
        await assertNoA11yViolations(page, { route, theme });
      });
    }
  }
});
