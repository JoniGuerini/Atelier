/* ================================================================
   src/lib/usePageMeta.ts — escreve meta tags dinâmicas no <head>
   ----------------------------------------------------------------
   Roadmap · Fase 14.1 (Distribuição & web standards)

   Quem chama: App.tsx (uma única vez, com a rota corrente).
   Quem NÃO chama: páginas individuais — manter centralizado.

   Estratégia:
     - upsert por seletor único (ex: meta[name="description"]).
     - Não remove tags ao desmontar — outra rota vai sobrescrever.
       Em SPA puro, isso é o comportamento desejado.
     - Tags estáticas do index.html (charset, viewport, fonts) são
       intocadas — só mexemos no que é route/locale-aware.
   ================================================================ */

import { useEffect } from "react";
import {
  buildPageMeta,
  buildSiteJsonLd,
  TWITTER_HANDLE,
  SITE_NAME,
  type PageMeta,
} from "./seo.ts";
import type { LocaleId } from "../i18n/index.ts";

/* ----------------------------------------------------------------
   DOM helpers — upsert idempotente
   ----------------------------------------------------------------
   Cada helper recebe um seletor único e o conteúdo desejado.
   Cria a tag se não existir, atualiza se existir, é noop se SSR.
---------------------------------------------------------------- */

function isBrowser(): boolean {
  return typeof document !== "undefined";
}

function setMetaContent(selector: string, attrs: Record<string, string>) {
  if (!isBrowser()) return;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  for (const [k, v] of Object.entries(attrs)) {
    el.setAttribute(k, v);
  }
}

function setLink(rel: string, href: string, extra: Record<string, string> = {}) {
  if (!isBrowser()) return;
  // Para alternate, o seletor precisa incluir hreflang pra distinguir
  const hreflang = extra.hreflang ? `[hreflang="${extra.hreflang}"]` : "";
  const selector = `link[rel="${rel}"]${hreflang}`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  for (const [k, v] of Object.entries(extra)) {
    el.setAttribute(k, v);
  }
}

function removeAllMatching(selector: string) {
  if (!isBrowser()) return;
  document.head.querySelectorAll(selector).forEach((el) => el.remove());
}

function setJsonLd(id: string, json: string) {
  if (!isBrowser()) return;
  let el = document.head.querySelector<HTMLScriptElement>(
    `script[type="application/ld+json"][data-id="${id}"]`
  );
  if (!el) {
    el = document.createElement("script");
    el.setAttribute("type", "application/ld+json");
    el.setAttribute("data-id", id);
    document.head.appendChild(el);
  }
  el.textContent = json;
}

/* ----------------------------------------------------------------
   applyMeta — escreve um PageMeta inteiro no <head>
   ----------------------------------------------------------------
   Tag set escrito (todas controladas pelo Atelier):
     - <title>
     - <meta name="description">
     - <meta name="theme-color"> (light + dark via media)
     - <link rel="canonical">
     - <link rel="alternate" hreflang="..."> (1 por locale + x-default)
     - <meta property="og:title|description|url|image|type|locale|site_name">
     - <meta name="twitter:card|title|description|image|site">
     - <html lang> e <html dir>
---------------------------------------------------------------- */

function applyMeta(meta: PageMeta) {
  if (!isBrowser()) return;

  // <html lang> e <html dir> — tocados também pelo i18n.tsx, mas
  // garantimos coerência aqui no lifecycle do route change.
  document.documentElement.setAttribute("lang", meta.htmlLang);
  document.documentElement.setAttribute("dir", meta.htmlDir);

  // <title>
  if (document.title !== meta.title) {
    document.title = meta.title;
  }

  // <meta name="description">
  setMetaContent('meta[name="description"]', {
    name: "description",
    content: meta.description,
  });

  // <meta name="theme-color"> — dual via media query
  // Limpa antes pra evitar duplicatas se o navegador suportar múltiplas
  removeAllMatching('meta[name="theme-color"]');
  if (isBrowser()) {
    const lightTag = document.createElement("meta");
    lightTag.setAttribute("name", "theme-color");
    lightTag.setAttribute("media", "(prefers-color-scheme: light)");
    lightTag.setAttribute("content", meta.themeColor.light);
    document.head.appendChild(lightTag);

    const darkTag = document.createElement("meta");
    darkTag.setAttribute("name", "theme-color");
    darkTag.setAttribute("media", "(prefers-color-scheme: dark)");
    darkTag.setAttribute("content", meta.themeColor.dark);
    document.head.appendChild(darkTag);
  }

  // <link rel="canonical">
  setLink("canonical", meta.canonical);

  // <link rel="alternate" hreflang="..."> — limpa todos antes pra
  // evitar acumular de rotas anteriores
  removeAllMatching('link[rel="alternate"][hreflang]');
  for (const alt of meta.alternates) {
    setLink("alternate", alt.href, { hreflang: alt.hreflang });
  }

  // Open Graph
  setMetaContent('meta[property="og:site_name"]', {
    property: "og:site_name",
    content: SITE_NAME,
  });
  setMetaContent('meta[property="og:title"]', {
    property: "og:title",
    content: meta.title,
  });
  setMetaContent('meta[property="og:description"]', {
    property: "og:description",
    content: meta.description,
  });
  setMetaContent('meta[property="og:url"]', {
    property: "og:url",
    content: meta.ogUrl,
  });
  setMetaContent('meta[property="og:image"]', {
    property: "og:image",
    content: meta.ogImage,
  });
  setMetaContent('meta[property="og:type"]', {
    property: "og:type",
    content: meta.ogType,
  });
  setMetaContent('meta[property="og:locale"]', {
    property: "og:locale",
    content: meta.ogLocale,
  });

  // Twitter cards
  setMetaContent('meta[name="twitter:card"]', {
    name: "twitter:card",
    content: "summary_large_image",
  });
  setMetaContent('meta[name="twitter:title"]', {
    name: "twitter:title",
    content: meta.title,
  });
  setMetaContent('meta[name="twitter:description"]', {
    name: "twitter:description",
    content: meta.description,
  });
  setMetaContent('meta[name="twitter:image"]', {
    name: "twitter:image",
    content: meta.ogImage,
  });
  if (TWITTER_HANDLE) {
    setMetaContent('meta[name="twitter:site"]', {
      name: "twitter:site",
      content: TWITTER_HANDLE,
    });
  }
}

/* ----------------------------------------------------------------
   Hook público
---------------------------------------------------------------- */

export interface UsePageMetaInput {
  routeId: string;
  locale: LocaleId;
  dict: Record<string, any>;
}

/**
 * Aplica meta tags da rota atual no <head>.
 *
 * Chame uma única vez no shell (App.tsx), passando rota e locale
 * correntes. O hook reage a mudanças de qualquer um dos dois e
 * atualiza title/description/og/twitter/canonical/lang/dir.
 *
 * Também injeta JSON-LD do site uma vez na home (#/).
 *
 * Não tem retorno — efeito colateral puro no DOM.
 */
export function usePageMeta({ routeId, locale, dict }: UsePageMetaInput) {
  useEffect(() => {
    const meta = buildPageMeta({ routeId, locale, dict });
    applyMeta(meta);

    // JSON-LD: só na home, evita poluição em todas as páginas
    if (routeId === "home") {
      setJsonLd("site-website", buildSiteJsonLd());
    } else {
      // Remove se navegamos pra fora da home
      const el = document.head.querySelector(
        'script[type="application/ld+json"][data-id="site-website"]'
      );
      if (el) el.remove();
    }
  }, [routeId, locale, dict]);
}
