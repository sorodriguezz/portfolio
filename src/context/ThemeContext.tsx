"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";

export type Theme = "dark" | "light";

const STORAGE_KEY = "theme";

// View Transitions API isn't in every TS lib target, so type it locally.
type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => unknown;
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/** Apply the theme to <html> imperatively so it happens synchronously. */
function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Default is dark. The inline pre-paint script in layout already set the
  // correct class before hydration, so this matches what's on screen.
  const [theme, setThemeState] = useState<Theme>("dark");

  // Sync React state with whatever the pre-paint script applied.
  useEffect(() => {
    const stored =
      (typeof window !== "undefined" &&
        (localStorage.getItem(STORAGE_KEY) as Theme | null)) ||
      null;
    const initial: Theme = stored === "light" || stored === "dark" ? stored : "dark";
    setThemeState(initial);
    applyTheme(initial);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore (private mode, etc.) */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";

    const run = () => {
      flushSync(() => setTheme(next));
    };

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const doc = document as ViewTransitionDocument;

    // Vertical Wipe transition via the View Transitions API.
    if (!reduceMotion && typeof doc.startViewTransition === "function") {
      doc.startViewTransition(run);
    } else {
      run();
    }
  }, [setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
