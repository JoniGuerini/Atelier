import {
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  LOCALE_LIST,
  DEFAULT_LOCALE,
  loadLocale,
  getCachedLocale,
  type LocaleId,
} from "../i18n/index.ts";
import type { Locale } from "../ds/types.ts";

const STORAGE_KEY = "atelier.locale";
const DIR_KEY = "atelier.dir";
const VALID_LOCALES = new Set<string>(LOCALE_LIST.map((l) => l.id));

/* Locales que naturalmente exigem RTL — preparado mesmo sem traduzir.
   Quando algum desses for adicionado em LOCALE_LIST, dir=rtl é
   aplicado automaticamente. */
const RTL_LOCALES = new Set<string>(["ar", "he", "fa", "ur"]);

export type Direction = "ltr" | "rtl";

/** Variáveis em `tr()` — strings/números ou nós React em `{nome}` (ex.: contador em negrito). */
export type TranslationVars = Record<string, string | number | ReactNode>;

export interface LocaleContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  dict: Record<string, any>;
  locales: typeof LOCALE_LIST;
  /** Direção do texto resolvida — derivada do locale + override manual. */
  dir: Direction;
  /** Override manual do dir (debug/dev/preview RTL com locale LTR). */
  setDir: (next: Direction | "auto") => void;
  /** "auto" segue o locale; "rtl"/"ltr" trava manualmente. */
  dirMode: Direction | "auto";
}

const FALLBACK_DICT: Record<string, any> = {};

const LocaleCtx = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE as Locale,
  setLocale: () => {},
  dict: FALLBACK_DICT,
  locales: LOCALE_LIST,
  dir: "ltr",
  setDir: () => {},
  dirMode: "auto",
});

function readInitialLocale(): LocaleId {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && VALID_LOCALES.has(saved)) return saved as LocaleId;
  } catch {
    /* ignore */
  }
  // Sem preferência salva → inglês por padrão (independente do navegador).
  // Assim Atelier nasce internacional; pt-BR fica como escolha explícita.
  return DEFAULT_LOCALE as LocaleId;
}

function readInitialDirMode(): Direction | "auto" {
  if (typeof window === "undefined") return "auto";
  try {
    const v = window.localStorage.getItem(DIR_KEY);
    if (v === "rtl" || v === "ltr" || v === "auto") return v;
  } catch {
    /* ignore */
  }
  return "auto";
}

export function LocaleProvider({ children }: { children?: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleId>(readInitialLocale);
  const [dirMode, setDirMode] = useState<Direction | "auto">(readInitialDirMode);
  /* Pode existir já no cache se o usuário voltou pra um locale visto;
     senão começa null e o useEffect baixa. */
  const [dict, setDict] = useState<Record<string, any> | null>(() =>
    getCachedLocale(locale) ?? null
  );

  useEffect(() => {
    let active = true;
    const cached = getCachedLocale(locale);
    if (cached) {
      setDict(cached);
      return;
    }
    loadLocale(locale).then((d) => {
      if (active) setDict(d);
    });
    return () => {
      active = false;
    };
  }, [locale]);

  /* Resolve direção: override manual vence; senão deriva do locale */
  const dir: Direction =
    dirMode === "rtl" ? "rtl" : dirMode === "ltr" ? "ltr" : RTL_LOCALES.has(locale) ? "rtl" : "ltr";

  /* Sincroniza com <html dir="..." lang="..."> — o CSS reage e
     leitores de tela / IME se comportam corretamente. */
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", locale);
  }, [dir, locale]);

  const setLocale = useCallback((next: Locale) => {
    if (!VALID_LOCALES.has(next as string)) return;
    setLocaleState(next as LocaleId);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const setDir = useCallback((next: Direction | "auto") => {
    setDirMode(next);
    try {
      window.localStorage.setItem(DIR_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale: locale as Locale,
      setLocale,
      dict: dict ?? FALLBACK_DICT,
      locales: LOCALE_LIST,
      dir,
      setDir,
      dirMode,
    }),
    [locale, setLocale, dict, dir, setDir, dirMode]
  );

  /* Bloqueia o render do app até o primeiro dict chegar — assim
     nenhum componente filho vê dict vazio (que faria todas as
     traduções aparecerem como suas próprias chaves). Tipicamente
     resolve em um tick (chunk preloaded pelo Vite). */
  if (!dict) return null;

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

/** Só para `t()` — substitui placeholders por texto; ignora valores não primitivos. */
function interpolate(str: string, vars?: TranslationVars): string {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, name) => {
    if (!(name in vars)) return `{${name}}`;
    const v = vars[name];
    if (typeof v === "string" || typeof v === "number") return String(v);
    return `{${name}}`;
  });
}

/** Substitui `{var}` no fragmento; devolve string simples ou lista de nós. */
function injectVars(chunk: string, vars?: TranslationVars): ReactNode {
  if (!vars || !chunk.includes("{")) return chunk;
  const bits: ReactNode[] = [];
  const re = /\{(\w+)\}/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let ki = 0;
  while ((m = re.exec(chunk)) !== null) {
    if (m.index > last) bits.push(chunk.slice(last, m.index));
    const name = m[1];
    const val = vars[name];
    if (val === undefined) bits.push(m[0]);
    else if (typeof val === "string" || typeof val === "number") bits.push(String(val));
    else if (isValidElement(val)) bits.push(cloneElement(val, { key: `trv-${ki++}` }));
    else bits.push(String(val));
    last = m.index + m[0].length;
  }
  if (last < chunk.length) bits.push(chunk.slice(last));
  if (bits.length === 0) return chunk;
  if (bits.length === 1) return bits[0];
  return bits;
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
  const out: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let k = 0;

  while ((match = MARKUP_RE.exec(raw)) !== null) {
    if (match.index > lastIndex) {
      out.push(injectVars(raw.slice(lastIndex, match.index), vars));
    }
    const [full, tag, inner] = match;
    const cls = tag === "acc" ? "t-acc" : "t-em";
    out.push(
      <em key={`${tag}-${k++}`} className={cls}>
        {injectVars(inner, vars)}
      </em>
    );
    lastIndex = match.index + full.length;
  }

  if (lastIndex < raw.length) {
    out.push(injectVars(raw.slice(lastIndex), vars));
  }
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
