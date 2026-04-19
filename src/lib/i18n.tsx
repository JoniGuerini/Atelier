import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { LOCALES, LOCALE_LIST, DEFAULT_LOCALE } from "../i18n/index.ts";
import type { Locale } from "../ds/types.ts";

const STORAGE_KEY = "atelier.locale";

export type TranslationVars = Record<string, string | number>;

export interface LocaleContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  dict: Record<string, any>;
  locales: typeof LOCALE_LIST;
}

const LocaleCtx = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE as Locale,
  setLocale: () => {},
  dict: (LOCALES as any)[DEFAULT_LOCALE],
  locales: LOCALE_LIST,
});

function readInitialLocale(): Locale {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && (LOCALES as any)[saved]) return saved as Locale;
  } catch {
    /* ignore */
  }
  // Sem preferência salva → inglês por padrão (independente do navegador).
  // Assim Atelier nasce internacional; pt-BR fica como escolha explícita.
  return DEFAULT_LOCALE as Locale;
}

export function LocaleProvider({ children }: { children?: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale);

  const setLocale = useCallback((next: Locale) => {
    if (!(LOCALES as any)[next]) return;
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      dict: (LOCALES as any)[locale] || (LOCALES as any)[DEFAULT_LOCALE],
      locales: LOCALE_LIST,
    }),
    [locale, setLocale]
  );

  return <LocaleCtx.Provider value={value}>{children}</LocaleCtx.Provider>;
}

export function useLocale(): LocaleContextValue {
  return useContext(LocaleCtx);
}

/* ---------- dictionary resolution ---------- */

function resolveKey(obj: any, key: string): any {
  const parts = key.split(".");
  let cur = obj;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in cur) cur = cur[p];
    else return undefined;
  }
  return cur;
}

function interpolate(str: string, vars?: TranslationVars): string {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, name) =>
    name in vars ? String(vars[name]) : `{${name}}`
  );
}

/* ---------- markup parser ----------
   Supports:
     [acc]...[/acc]   → <em class="t-acc"> (accent red italic)
     [em]...[/em]     → <em class="t-em">  (plain italic)
     {varName}        → variable interpolation
   No nesting, no HTML — keeps the dictionaries clean.
*/
const MARKUP_RE = /\[(acc|em)\]([\s\S]*?)\[\/\1\]/g;

function parseMarkup(raw: any, vars?: TranslationVars): ReactNode {
  if (typeof raw !== "string") return raw;
  const str = interpolate(raw, vars);
  const out: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let k = 0;

  while ((match = MARKUP_RE.exec(str)) !== null) {
    if (match.index > lastIndex) {
      out.push(str.slice(lastIndex, match.index));
    }
    const [full, tag, inner] = match;
    const cls = tag === "acc" ? "t-acc" : "t-em";
    out.push(
      <em key={`${tag}-${k++}`} className={cls}>
        {inner}
      </em>
    );
    lastIndex = match.index + full.length;
  }

  if (lastIndex < str.length) out.push(str.slice(lastIndex));
  MARKUP_RE.lastIndex = 0; // reset global regex
  return out.length === 1 ? out[0] : out;
}

/* ---------- Hook ---------- */

export interface UseTReturn {
  /** Plain string (strips markup). Good for attributes/placeholders. */
  t: (key: string, vars?: TranslationVars) => any;
  /** Rich string → ReactNode, parsing [acc] and [em] markers. */
  tr: (key: string, vars?: TranslationVars) => ReactNode;
  /** Raw dictionary value — handy for arrays/objects. */
  raw: (key: string) => any;
  locale: Locale;
  setLocale: (next: Locale) => void;
  locales: typeof LOCALE_LIST;
}

export function useT(): UseTReturn {
  const { dict, locale, setLocale, locales } = useContext(LocaleCtx);

  const t = useCallback(
    (key: string, vars?: TranslationVars) => {
      const v = resolveKey(dict, key);
      if (v === undefined) return key;
      if (typeof v !== "string") return v;
      return interpolate(v, vars).replace(/\[\/?(acc|em)\]/g, "");
    },
    [dict]
  );

  const tr = useCallback(
    (key: string, vars?: TranslationVars): ReactNode => {
      const v = resolveKey(dict, key);
      if (v === undefined) return key;
      if (typeof v !== "string") return v;
      return parseMarkup(v, vars);
    },
    [dict]
  );

  const raw = useCallback(
    (key: string) => {
      const v = resolveKey(dict, key);
      return v;
    },
    [dict]
  );

  return { t, tr, raw, locale, setLocale, locales };
}

/** Component wrapper — <T k="page.hero" vars={{ name: "Ada" }} /> */
export function T({ k, vars }: { k: string; vars?: TranslationVars }) {
  const { tr } = useT();
  return <>{tr(k, vars)}</>;
}
