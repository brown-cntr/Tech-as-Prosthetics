const THEME_KEY = "theme";

function systemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Apply saved theme, or OS preference when the user has not chosen yet. */
export function applyStoredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "dark" || stored === "light") {
        document.documentElement.dataset.theme = stored;
        return stored;
    }
    const next = systemTheme();
    document.documentElement.dataset.theme = next;
    return next;
}

export function toggleTheme() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem(THEME_KEY, next);
    return next;
}

/**
 * Keep in sync with OS only when there is no explicit saved preference.
 * Call once at app start; returns a cleanup function.
 */
export function watchSystemThemePreference() {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored === "dark" || stored === "light") return;
        document.documentElement.dataset.theme = mq.matches ? "dark" : "light";
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
}
