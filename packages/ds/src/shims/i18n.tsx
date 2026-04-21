/* ================================================================
   @atelier/ds — i18n shim
   ----------------------------------------------------------------
   No app de docs do Atelier (este monorepo), useT() resolve
   contra dicionarios PT-BR/EN dinamicamente carregados. No pacote
   distribuido, nao queremos arrastar 200KB de dicionario do
   manual.

   Este shim:
     - Implementa useT/useLocale com a mesma API
     - Carrega DEFAULT_FALLBACKS (textos em ingles) em runtime
     - Aceita override via <AtelierProvider locale="pt-BR" dict={{...}}>
     - Fica self-contained: zero dep do app

   Componentes do DS (Pagination, Carousel, Calendar, etc) usam
   t("ds.pagination.previous") esperando uma string. Se nao houver
   provider, retornamos o fallback. Se houver, usamos o dict do
   provider.
   ================================================================ */

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

export type Locale = string;
export type Direction = "ltr" | "rtl";
export type TranslationVars = Record<string, string | number>;

/* --- Fallbacks default em ingles ---
   Cobrem TODAS as chaves usadas pelos componentes do DS publico.
   Mantenha em sync com src/ds/*.tsx — quando um componente novo
   adiciona t("ds.<algo>"), acrescente aqui. */
const DEFAULT_FALLBACKS: Record<string, string> = {
  /* Common */
  "common.copy": "Copy",
  "common.copied": "Copied",
  "common.viewCode": "View code",
  "common.hideCode": "Hide code",
  "common.backToTop": "Back to top",
  "common.expandSidebar": "Expand sidebar",
  "common.collapseSidebar": "Collapse sidebar",
  "common.pageNav.label": "Page navigation",
  "common.pageNav.previous": "Previous",
  "common.pageNav.next": "Next",
  "common.composition": "Composition",

  /* Theme */
  "theme.label": "Theme",
  "theme.switchToLight": "Switch to light",
  "theme.switchToDark": "Switch to dark",

  /* Nav */
  "nav.mode.label": "Navigation mode",
  "nav.layout.toBoxed": "Boxed layout",
  "nav.layout.toWide": "Wide layout",

  /* Example primitive */
  "ds.example.editorLabel": "Code editor",
  "ds.example.previewLabel": "Preview",
  "ds.example.editLabel": "Edit",
  "ds.example.resetLabel": "Reset",

  /* Components */
  "ds.dnd.sortable": "Sortable list",
  "ds.timeline.nowLabel": "now",
  "ds.shortcuts.title": "Keyboard shortcuts",
  "ds.shortcuts.close": "Close",
  "ds.shortcuts.empty": "No shortcuts registered.",
  "ds.shortcuts.uncategorized": "Other",
  "ds.resizable.label": "Resizable layout",
  "ds.resizable.handle": "Resize handle",
  "ds.resizable.junction": "Resize junction",
  "ds.carousel.label": "Carousel",
  "ds.carousel.prev": "Previous slide",
  "ds.carousel.next": "Next slide",
  "ds.carousel.goTo": "Go to slide",
  "ds.calendar.openPicker": "Open date picker",
  "ds.calendar.rangeStart": "Start date",
  "ds.calendar.rangeEnd": "End date",
  "ds.calendar.prev": "Previous month",
  "ds.calendar.next": "Next month",
  "ds.calendar.today": "Today",
  "ds.password.showPassword": "Show password",
  "ds.password.hidePassword": "Hide password",
  "ds.password.strengthMeter": "Estimated password strength",
  "ds.password.strength0": "Very weak",
  "ds.password.strength1": "Weak",
  "ds.password.strength2": "Fair",
  "ds.password.strength3": "Strong",
  "ds.password.strength4": "Very strong",
  "ds.lightbox.close": "Close viewer",
  "ds.combobox.create": "Create",
  "ds.breadcrumbs.label": "Breadcrumbs",
  "ds.pagination.label": "Pagination",
  "ds.pagination.previous": "Previous",
  "ds.pagination.next": "Next",
};

export interface LocaleContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  dict: Record<string, any>;
  locales: { id: string; label: string }[];
  dir: Direction;
  setDir: (next: Direction | "auto") => void;
  dirMode: Direction | "auto";
}

const DEFAULT_LOCALES = [{ id: "en", label: "English" }];

const LocaleCtx = createContext<LocaleContextValue>({
  locale: "en",
  setLocale: () => {},
  dict: {},
  locales: DEFAULT_LOCALES,
  dir: "ltr",
  setDir: () => {},
  dirMode: "auto",
});

export interface AtelierProviderProps {
  locale?: Locale;
  /** Optional dictionary tree. Keys may be nested (dict.ds.pagination.previous). */
  dict?: Record<string, any>;
  /** Optional direction override; defaults to "auto" (ltr unless RTL locale). */
  dir?: Direction | "auto";
  children?: ReactNode;
}

const RTL_LOCALES = new Set(["ar", "he", "fa", "ur"]);

/* Walks dotted path on a nested object: lookup({ds: {pagination: {next: "X"}}}, "ds.pagination.next") */
function lookup(obj: Record<string, any>, key: string): any {
  if (!obj) return undefined;
  const parts = key.split(".");
  let cur: any = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = cur[p];
  }
  return cur;
}

/* Replaces {var} occurrences. */
function interpolate(str: string, vars?: TranslationVars): string {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}

export function AtelierProvider({
  locale = "en",
  dict = {},
  dir = "auto",
  children,
}: AtelierProviderProps) {
  const value = useMemo<LocaleContextValue>(() => {
    const resolvedDir: Direction =
      dir === "auto" ? (RTL_LOCALES.has(locale) ? "rtl" : "ltr") : dir;
    return {
      locale,
      setLocale: () => {},
      dict,
      locales: DEFAULT_LOCALES,
      dir: resolvedDir,
      setDir: () => {},
      dirMode: dir,
    };
  }, [locale, dict, dir]);

  return <LocaleCtx.Provider value={value}>{children}</LocaleCtx.Provider>;
}

/* Provider alias for symmetry with the app's LocaleProvider. */
export const LocaleProvider = AtelierProvider;

export interface UseTReturn {
  t: (key: string, vars?: TranslationVars) => string;
  tr: (key: string, vars?: TranslationVars) => any;
  raw: (key: string) => any;
  locale: Locale;
  setLocale: (next: Locale) => void;
  locales: { id: string; label: string }[];
}

export function useT(): UseTReturn {
  const { locale, setLocale, dict, locales } = useContext(LocaleCtx);

  const resolve = (key: string): any => {
    const fromDict = lookup(dict, key);
    if (fromDict !== undefined) return fromDict;
    const fromFallback = DEFAULT_FALLBACKS[key];
    return fromFallback !== undefined ? fromFallback : key;
  };

  const t = (key: string, vars?: TranslationVars): string => {
    const v = resolve(key);
    return typeof v === "string" ? interpolate(v, vars) : String(v ?? key);
  };

  const tr = (key: string, vars?: TranslationVars): any => {
    const v = resolve(key);
    return typeof v === "string" ? interpolate(v, vars) : v;
  };

  const raw = (key: string): any => resolve(key);

  return { t, tr, raw, locale, setLocale, locales };
}

export function useLocale() {
  const ctx = useContext(LocaleCtx);
  return {
    locale: ctx.locale,
    setLocale: ctx.setLocale,
    locales: ctx.locales,
    dir: ctx.dir,
    setDir: ctx.setDir,
    dirMode: ctx.dirMode,
  };
}
