/* ================================================================
   @atelier/ds — theme shim
   ----------------------------------------------------------------
   Wrapper minimal de tema. Escuta prefers-color-scheme (default
   automatico) e expoe a mesma API de useTheme do app de docs.
   Persiste em localStorage com key "atelier.theme".
   ================================================================ */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "atelier.theme";

export const THEME_LIST = [
  { id: "light" as Theme, labelKey: "theme.light", short: "L" },
  { id: "dark" as Theme, labelKey: "theme.dark", short: "D" },
];

export interface ThemeContextValue {
  theme: Theme;
  resolved: Theme;
  setTheme: (next: Theme) => void;
  toggle: () => void;
  themes: typeof THEME_LIST;
}

const ThemeCtx = createContext<ThemeContextValue>({
  theme: "light",
  resolved: "light",
  setTheme: () => {},
  toggle: () => {},
  themes: THEME_LIST,
});

function readInitial(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* ignore */
  }
  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

export function ThemeProvider({ children }: { children?: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readInitial);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const setTheme = useCallback((next: Theme) => setThemeState(next), []);
  const toggle = useCallback(
    () => setThemeState((p) => (p === "light" ? "dark" : "light")),
    []
  );

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolved: theme, setTheme, toggle, themes: THEME_LIST }),
    [theme, setTheme, toggle]
  );

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  return useContext(ThemeCtx);
}
