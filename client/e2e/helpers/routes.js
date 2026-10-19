/** Known application routes covered by accessibility regression tests. */
export const ROUTES = ["/", "/index", "/projects", "/team", "/khipu"];

export const THEMES = ["light", "dark"];

export const KNOWN_LIMITATIONS = [
  "PixiJS canvas content and text rendered inside game PNGs are not evaluated by axe DOM rules.",
  "Contrast of live text over photographic/illustrated backgrounds (e.g. purple hill) varies by pixel; axe uses CSS backgrounds.",
  "Full project-sheet snap-point matrix and drag gestures are not exhaustively exercised.",
  "Screen-reader navigation and live announcements require manual verification.",
  "These tests do not claim full WCAG 2.2 AA compliance for the site.",
];
