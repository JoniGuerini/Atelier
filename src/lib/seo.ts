/* ================================================================
   src/lib/seo.ts — helpers puros de meta tags por rota
   ----------------------------------------------------------------
   Roadmap · Fase 14.1 (Distribuição & web standards)

   Princípio editorial:
     - Tudo aqui é função pura: recebe (routeId, locale, dict),
       retorna { title, description, url, ogImage, ... }.
     - Quem chama é src/lib/usePageMeta.ts (efeito colateral no
       <head>). Manter SEO isolado em arquivo próprio facilita
       teste unitário e SSR/pre-render no futuro (Fase 14.4+).

   Não use diretamente nas páginas — o hook centraliza tudo no
   App.tsx para garantir uma única fonte da verdade por rota.
   ================================================================ */

import type { LocaleId } from "../i18n/index.ts";

/* ----------------------------------------------------------------
   Constantes editoriais — defaults do site
---------------------------------------------------------------- */

/** Nome canônico do produto — usado em <title> templates e og:site_name. */
export const SITE_NAME = "Atelier";

/** Tagline curta (até 60 chars) — usada como fallback de description. */
export const SITE_TAGLINE = {
  "pt-BR": "Design system editorial em React + Vite, sem dependências.",
  en: "Editorial design system in React + Vite, zero dependencies.",
} as const satisfies Record<LocaleId, string>;

/** Descrição longa por locale (até 160 chars) — usada se rota não
    tiver descrição própria em nav.descriptions. */
export const SITE_DESCRIPTION = {
  "pt-BR":
    "Atelier — design system editorial silencioso e refinado. React + Vite, zero dependências de runtime, tipografia Fraunces, foco em acessibilidade e i18n.",
  en: "Atelier — quiet, refined editorial design system. React + Vite, zero runtime dependencies, Fraunces typography, accessibility and i18n built-in.",
} as const satisfies Record<LocaleId, string>;

/** URL absoluto do site em produção. Definido via Vite env
    VITE_SITE_URL no .env.production (ex: https://atelier.dev).
    Em dev fica vazio e os meta tags ficam relativos. */
export const SITE_URL: string = (() => {
  if (typeof import.meta === "undefined") return "";
  const env = (import.meta as any).env;
  if (!env) return "";
  const raw = env.VITE_SITE_URL;
  if (typeof raw !== "string" || !raw.trim()) return "";
  return raw.replace(/\/$/, "");
})();

/** Caminho do OG image dentro do site (Fase 14.3).
    SVG 1200x630, wordmark + tagline, paleta editorial light fixa.
    Decisão zero-deps: SVG cobre todos os crawlers modernos. Se
    alguma rede social específica rejeitar, swap por PNG manual
    pré-renderizado. */
export const OG_IMAGE_PATH = "/og-image.svg";

/** Twitter handle opcional — vazio por padrão (sem conta oficial). */
export const TWITTER_HANDLE = "";

/* ----------------------------------------------------------------
   Tipos
---------------------------------------------------------------- */

export interface AlternateLink {
  /** ISO language tag (pt-BR, en, x-default) */
  hreflang: string;
  /** URL absoluto se SITE_URL definido, relativo caso contrário */
  href: string;
}

export interface PageMeta {
  /** Texto do <title> — já formatado com template "Atelier · X" */
  title: string;
  /** Texto do <meta name="description"> */
  description: string;
  /** URL canônica desta página (absoluta se SITE_URL definido) */
  canonical: string;
  /** og:url (sempre absoluto se SITE_URL existe) */
  ogUrl: string;
  /** og:image (URL absoluto pra imagem do card) */
  ogImage: string;
  /** og:type — geralmente "website" para docs */
  ogType: "website" | "article";
  /** og:locale (pt_BR, en_US — formato OG) */
  ogLocale: string;
  /** Locale principal (pt-BR, en) — usado em <html lang> */
  htmlLang: string;
  /** Direção do texto — usado em <html dir> */
  htmlDir: "ltr" | "rtl";
  /** hreflang alternates pra crawlers entenderem versões i18n */
  alternates: AlternateLink[];
  /** Theme-color por modo — usado em <meta name="theme-color"> */
  themeColor: { light: string; dark: string };
}

/* ----------------------------------------------------------------
   Helpers internos
---------------------------------------------------------------- */

/** Lê uma chave aninhada do dict (ex: "nav.items.colors").
    Retorna undefined se qualquer nível faltar. */
function readDict(dict: Record<string, any>, path: string): string | undefined {
  if (!dict) return undefined;
  const segments = path.split(".");
  let cursor: any = dict;
  for (const seg of segments) {
    if (cursor == null || typeof cursor !== "object") return undefined;
    cursor = cursor[seg];
  }
  return typeof cursor === "string" ? cursor : undefined;
}

/** Mapeia LocaleId pro formato OG (substitui "-" por "_"). */
function toOgLocale(locale: LocaleId): string {
  if (locale === "pt-BR") return "pt_BR";
  if (locale === "en") return "en_US";
  return locale.replace("-", "_");
}

/** Resolve direção a partir do locale (RTL pra ar/he/fa/ur). */
function resolveDir(locale: LocaleId): "ltr" | "rtl" {
  if (locale === "ar" || locale === "he" || locale === "fa" || locale === "ur") {
    return "rtl";
  }
  return "ltr";
}

/** Monta URL absoluta se SITE_URL existir, relativa caso contrário. */
function buildUrl(routeId: string, origin = SITE_URL): string {
  // Atelier usa hash routing (#/route). Crawlers tratam fragments
  // como mesma página, mas o canonical com hash ainda ajuda
  // ferramentas como social previews a chegar na rota certa.
  const hash = routeId === "home" ? "" : `#/${routeId}`;
  if (!origin) {
    // Dev/preview sem SITE_URL — fica relativo. Não vira canonical
    // útil pra crawler, mas evita lying no <link>.
    return hash || "/";
  }
  return `${origin}/${hash}`;
}

/* ----------------------------------------------------------------
   API pública
---------------------------------------------------------------- */

export interface BuildPageMetaInput {
  routeId: string;
  locale: LocaleId;
  dict: Record<string, any>;
  /** Override do SITE_URL (útil em testes). */
  origin?: string;
  /** Locales disponíveis pra gerar hreflangs. */
  availableLocales?: LocaleId[];
}

/**
 * Constrói o pacote completo de meta tags para uma rota+locale.
 *
 * - Title: "Atelier · {nav.items.<id>}" (ou só "Atelier — DS editorial"
 *   na rota home).
 * - Description: nav.descriptions.<id> se existir, senão SITE_DESCRIPTION
 *   do locale.
 * - Canonical: SITE_URL + #/route (ou relativo em dev).
 * - hreflang alternates: 1 por locale + x-default apontando pro pt-BR.
 *
 * Pure function — testável sem DOM.
 */
export function buildPageMeta({
  routeId,
  locale,
  dict,
  origin = SITE_URL,
  availableLocales = ["pt-BR", "en"],
}: BuildPageMetaInput): PageMeta {
  const isHome = routeId === "home";

  const pageName = readDict(dict, `nav.items.${routeId}`);
  const tagline = SITE_TAGLINE[locale] ?? SITE_TAGLINE["pt-BR"];

  // Title: home tem template próprio editorial, demais usam "Atelier · X"
  const title = isHome
    ? `${SITE_NAME} — ${tagline.replace(/\.$/, "")}`
    : pageName
      ? `${SITE_NAME} · ${pageName}`
      : SITE_NAME;

  // Description: específica da rota se houver, senão fallback global
  const routeDesc = readDict(dict, `nav.descriptions.${routeId}`);
  const fallbackDesc = SITE_DESCRIPTION[locale] ?? SITE_DESCRIPTION["pt-BR"];
  const description = routeDesc || fallbackDesc;

  const canonical = buildUrl(routeId, origin);
  const ogUrl = canonical;
  const ogImage = origin ? `${origin}${OG_IMAGE_PATH}` : OG_IMAGE_PATH;

  // Alternates: 1 link por locale + x-default
  const alternates: AlternateLink[] = availableLocales.map((loc) => ({
    hreflang: loc,
    href: buildUrl(routeId, origin),
  }));
  // x-default aponta pro idioma padrão (pt-BR) — convenção SEO
  alternates.push({
    hreflang: "x-default",
    href: buildUrl(routeId, origin),
  });

  return {
    title,
    description,
    canonical,
    ogUrl,
    ogImage,
    ogType: "website",
    ogLocale: toOgLocale(locale),
    htmlLang: locale,
    htmlDir: resolveDir(locale),
    alternates,
    themeColor: {
      // Hardcoded da paleta neutral (sincronizado com src/index.css)
      light: "#f4f1ea",
      dark: "#121110",
    },
  };
}

/* ----------------------------------------------------------------
   JSON-LD (schema.org) — opcional, pra SEO rico
   ----------------------------------------------------------------
   Discreto: só schema básico de WebSite + SoftwareSourceCode.
   Não inflama com Article, Product etc. — Atelier é doc, não loja.
---------------------------------------------------------------- */

/** Constrói um JSON-LD WebSite genérico. Stringificado e injetado
    em <script type="application/ld+json"> uma vez na home. */
export function buildSiteJsonLd(origin = SITE_URL): string {
  const url = origin || "/";
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: SITE_DESCRIPTION["pt-BR"],
    url,
    inLanguage: ["pt-BR", "en"],
    license: origin ? `${origin}/#/license` : "/#/license",
  };
  return JSON.stringify(data);
}
