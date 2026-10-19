import { expect, test } from "@playwright/test";
import { ROUTES } from "./helpers/routes.js";
import {
  clearStoredTheme,
  expectTheme,
  gotoWithTheme,
  readStoredTheme,
  themeToggle,
  THEME_STORAGE_KEY,
} from "./helpers/theme.js";

test.describe("Theme selection and persistence", () => {
  test("theme toggle switches light ↔ dark and persists", async ({ page }) => {
    await gotoWithTheme(page, "/", "light");
    const toggle = themeToggle(page);
    await expect(toggle).toHaveAttribute("aria-pressed", "false");

    await toggle.click();
    await expectTheme(page, "dark");
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(toggle).toHaveAttribute("aria-label", "Switch to light mode");
    expect(await readStoredTheme(page)).toBe("dark");

    await toggle.click();
    await expectTheme(page, "light");
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(await readStoredTheme(page)).toBe("light");
  });

  test("explicit saved theme overrides OS dark preference", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await gotoWithTheme(page, "/", "light");
    await expectTheme(page, "light");
    expect(await readStoredTheme(page)).toBe("light");

    await page.reload({ waitUntil: "networkidle" });
    await expectTheme(page, "light");
  });

  test("explicit saved dark theme overrides OS light preference", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await gotoWithTheme(page, "/", "dark");
    await expectTheme(page, "dark");
    expect(await readStoredTheme(page)).toBe("dark");
  });

  test("first visit without saved theme follows prefers-color-scheme: dark", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.addInitScript((key) => {
      window.localStorage.removeItem(key);
    }, THEME_STORAGE_KEY);
    await page.goto("/", { waitUntil: "networkidle" });
    await expectTheme(page, "dark");
    // OS preference path must not write an explicit preference.
    expect(await readStoredTheme(page)).toBeNull();
  });

  test("first visit without saved theme follows prefers-color-scheme: light", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.addInitScript((key) => {
      window.localStorage.removeItem(key);
    }, THEME_STORAGE_KEY);
    await page.goto("/", { waitUntil: "networkidle" });
    await expectTheme(page, "light");
    expect(await readStoredTheme(page)).toBeNull();
  });

  for (const theme of ["light", "dark"]) {
    test(`${theme} theme remains active across all routes`, async ({
      page,
    }) => {
      await gotoWithTheme(page, "/", theme);
      for (const route of ROUTES) {
        await page.goto(route, { waitUntil: "networkidle" });
        await expectTheme(page, theme);
        // Spot-check that primary page surface uses themed page token.
        const pageBg = await page.evaluate(() =>
          getComputedStyle(document.getElementById("root")).backgroundColor
        );
        if (theme === "light") {
          expect(pageBg).toBe("rgb(242, 240, 233)");
        } else {
          expect(pageBg).toBe("rgb(28, 26, 23)");
        }
      }
    });
  }

  test("clearing storage restores OS preference after reload", async ({
    page,
  }) => {
    // Avoid sticky addInitScript so reload can honor an empty localStorage.
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/", { waitUntil: "networkidle" });
    await expectTheme(page, "dark");

    await page.evaluate((key) => localStorage.setItem(key, "light"), THEME_STORAGE_KEY);
    await page.reload({ waitUntil: "networkidle" });
    await expectTheme(page, "light");

    await clearStoredTheme(page);
    await page.reload({ waitUntil: "networkidle" });
    await expectTheme(page, "dark");
  });
});
