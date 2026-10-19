import { expect } from "@playwright/test";

export const THEME_STORAGE_KEY = "theme";

/**
 * Navigate with a theme already applied before React hydrates preferences.
 * Clears storage when theme is null (first-visit / system preference path).
 */
export async function gotoWithTheme(page, path, theme) {
  await page.addInitScript(
    ({ storageKey, themeValue }) => {
      if (themeValue === null) {
        window.localStorage.removeItem(storageKey);
      } else {
        window.localStorage.setItem(storageKey, themeValue);
      }
    },
    { storageKey: THEME_STORAGE_KEY, themeValue: theme }
  );
  const response = await page.goto(path, { waitUntil: "networkidle" });
  expect(response, `Navigation to ${path} should succeed`).toBeTruthy();
  expect(response.ok(), `HTTP ${response.status()} for ${path}`).toBeTruthy();
  if (theme === "light" || theme === "dark") {
    await expectTheme(page, theme);
  }
  return response;
}

export async function expectTheme(page, theme) {
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
}

export async function readStoredTheme(page) {
  return page.evaluate((key) => localStorage.getItem(key), THEME_STORAGE_KEY);
}

export async function clearStoredTheme(page) {
  await page.evaluate((key) => localStorage.removeItem(key), THEME_STORAGE_KEY);
}

export function themeToggle(page) {
  return page.getByRole("button", {
    name: /Switch to (light|dark) mode/,
  });
}
