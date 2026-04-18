/* ================================================================
   Atelier — Theme System
   ----------------------------------------------------------------
   Dois modos: "light" e "dark".

   Na primeira visita a preferência do SO (prefers-color-scheme) é
   usada como sugestão inicial; depois disso a escolha do usuário
   é persistida em localStorage e passa a prevalecer.

   API:
     <ThemeProvider>{children}</ThemeProvider>
     const { theme, resolved, setTheme, toggle, themes } = useTheme();

     theme, resolved: "light" | "dark"
   ================================================================ */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "atelier.theme";
const VALID_THEMES = ["light", "dark"];

export const THEME_LIST = [
  { id: "light", labelKey: "theme.light", short: "L" },
  { id: "dark", labelKey: "theme.dark", short: "D" },
];

const ThemeCtx = createContext({
  theme: "light",
  resolved: "light",
  setTheme: () => {},
  toggle: () => {},
  themes: THEME_LIST,
});

function systemPrefersDark() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function readInitialTheme() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && VALID_THEMES.includes(saved)) return saved;
  } catch {
    /* ignore */
  }
  return systemPrefersDark() ? "dark" : "light";
}

function applyTheme(resolved) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", resolved);
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((next) => {
    if (!VALID_THEMES.includes(next)) return;
    setThemeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setThemeState((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({ theme, resolved: theme, setTheme, toggle, themes: THEME_LIST }),
    [theme, setTheme, toggle]
  );

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  return useContext(ThemeCtx);
}
