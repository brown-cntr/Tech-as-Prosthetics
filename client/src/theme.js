const THEME_KEY = "theme";

export function applyStoredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    document.documentElement.dataset.theme = stored === "dark" ? "dark" : "light";
}

export function toggleTheme() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem(THEME_KEY, next);
    return next;
}
