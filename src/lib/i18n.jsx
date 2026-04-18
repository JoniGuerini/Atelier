import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { LOCALES, LOCALE_LIST, DEFAULT_LOCALE } from "../i18n/index.js";

const STORAGE_KEY = "atelier.locale";

const LocaleCtx = createContext({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  dict: LOCALES[DEFAULT_LOCALE],
  locales: LOCALE_LIST,
});

function readInitialLocale() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && LOCALES[saved]) return saved;
  } catch {
    /* ignore */
  }
  // Sem preferência salva → inglês por padrão (independente do navegador).
  // Assim Atelier nasce internacional; pt-BR fica como escolha explícita.
  return DEFAULT_LOCALE;
}

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(readInitialLocale);

  const setLocale = useCallback((next) => {
    if (!LOCALES[next]) return;
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      dict: LOCALES[locale] || LOCALES[DEFAULT_LOCALE],
      locales: LOCALE_LIST,
    }),
    [locale, setLocale]
  );

  return <LocaleCtx.Provider value={value}>{children}</LocaleCtx.Provider>;
}

export function useLocale() {
  return useContext(LocaleCtx);
}

/* ---------- dictionary resolution ---------- */

function resolveKey(obj, key) {
  const parts = key.split(".");
  let cur = obj;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in cur) cur = cur[p];
    else return undefined;
  }
  return cur;
}

function interpolate(str, vars) {
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

function parseMarkup(raw, vars) {
  if (typeof raw !== "string") return raw;
  const str = interpolate(raw, vars);
  const out = [];
  let lastIndex = 0;
  let match;
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

export function useT() {
  const { dict, locale, setLocale, locales } = useContext(LocaleCtx);

  /** Plain string (strips markup, uses raw text). Good for attributes/placeholders. */
  const t = useCallback(
    (key, vars) => {
      const v = resolveKey(dict, key);
      if (v === undefined) return key;
      if (typeof v !== "string") return v;
      return interpolate(v, vars).replace(/\[\/?(acc|em)\]/g, "");
    },
    [dict]
  );

  /** Rich string → ReactNode, parsing [acc] and [em] markers. */
  const tr = useCallback(
    (key, vars) => {
      const v = resolveKey(dict, key);
      if (v === undefined) return key;
      if (typeof v !== "string") return v;
      return parseMarkup(v, vars);
    },
    [dict]
  );

  /** Raw dictionary value — handy for arrays/objects. */
  const raw = useCallback(
    (key) => {
      const v = resolveKey(dict, key);
      return v;
    },
    [dict]
  );

  return { t, tr, raw, locale, setLocale, locales };
}

/** Component wrapper — <T k="page.hero" vars={{ name: "Ada" }} /> */
export function T({ k, vars }) {
  const { tr } = useT();
  return <>{tr(k, vars)}</>;
}
