import { expect, test } from "@playwright/test";
import { recordSkipped } from "./helpers/report-store.js";
import { gotoWithTheme, themeToggle } from "./helpers/theme.js";

test.describe("Essential accessible interactions", () => {
  test("skip link moves keyboard focus to main content", async ({ page }) => {
    await gotoWithTheme(page, "/", "light");
    const skip = page.getByRole("link", { name: "Skip to main content" });
    await skip.focus();
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#main-content")).toBeFocused();
    await expect(page.locator("main#main-content")).toBeVisible();
  });

  test("primary navigation links are named and keyboard-focusable", async ({
    page,
  }) => {
    await gotoWithTheme(page, "/", "light");
    const experiences = page.getByRole("link", { name: "Experiences" }).first();
    const team = page.getByRole("link", { name: "Team" }).first();
    const home = page.getByRole("link", {
      name: "Technologies and/as Prosthetics",
    });

    await home.focus();
    await expect(home).toBeFocused();
    await experiences.focus();
    await expect(experiences).toBeFocused();
    await team.focus();
    await expect(team).toBeFocused();

    await experiences.click();
    await expect(page).toHaveURL(/\/projects$/);
    await team.click();
    await expect(page).toHaveURL(/\/team$/);
  });

  test("theme toggle is reachable by keyboard", async ({ page }) => {
    await gotoWithTheme(page, "/", "light");
    const toggle = themeToggle(page);
    await toggle.focus();
    await expect(toggle).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("home CTAs expose accessible names and navigate", async ({ page }) => {
    await gotoWithTheme(page, "/", "light");
    const viewAll = page.getByRole("button", { name: "View All Projects" });
    await expect(viewAll).toBeVisible();
    await viewAll.click();
    await expect(page).toHaveURL(/\/projects$/);
  });

  test("team page headings and portrait names are present", async ({
    page,
  }) => {
    await gotoWithTheme(page, "/team", "light");
    await expect(page.getByRole("heading", { level: 1, name: "Our Team" })).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Kim Fernandes" })
    ).toBeVisible();
    await expect(page.getByRole("img", { name: "Kim Fernandes" })).toBeVisible();
  });

  test("projects sheet open control and expand handle are named", async ({
    page,
  }) => {
    await gotoWithTheme(page, "/projects", "light");
    const openSheet = page.getByRole("button", { name: "Open sheet" });
    await expect(openSheet).toBeVisible();
    await openSheet.click();

    const expand = page.getByRole("button", {
      name: /Expand experiences sheet|Collapse experiences sheet/,
    });
    await expect(expand).toBeVisible();
    await expand.focus();
    await expect(expand).toBeFocused();
    await expand.click();
    // Label flips after toggle; exact snap state is not asserted (see skipped).
    await expect(
      page.getByRole("button", {
        name: /Expand experiences sheet|Collapse experiences sheet/,
      })
    ).toBeVisible();

    recordSkipped({
      route: "/projects",
      reason:
        "Project sheet snap points, drag gestures, and full keyboard sheet dismissal are not exhaustively asserted.",
    });
  });

  test("khipu game landmark and exit control are available", async ({
    page,
  }) => {
    await gotoWithTheme(page, "/khipu", "light");
    await expect(
      page.getByRole("region", { name: "Khipu game" })
    ).toBeVisible();
    const exit = page.getByRole("button", { name: "Exit to Experiences" });
    await expect(exit).toBeVisible();
    await exit.focus();
    await expect(exit).toBeFocused();

    recordSkipped({
      route: "/khipu",
      reason:
        "PixiJS canvas knot placement, cord drawing, and in-canvas contrast are not automated.",
    });
  });

  test("footer quicklinks use real destinations", async ({ page }) => {
    await gotoWithTheme(page, "/", "dark");
    const footer = page.locator("footer");
    await expect(footer.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/"
    );
    await expect(
      footer.getByRole("link", { name: "Experiences" })
    ).toHaveAttribute("href", "/projects");
    await expect(footer.getByRole("link", { name: "Team" })).toHaveAttribute(
      "href",
      "/team"
    );
    await expect(
      footer.getByRole("link", { name: "The Incan Khipu" })
    ).toHaveAttribute("href", "/khipu");
  });
});
