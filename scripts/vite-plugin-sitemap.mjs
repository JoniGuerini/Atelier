/* ================================================================
   scripts/vite-plugin-sitemap.mjs
   ----------------------------------------------------------------
   Vite plugin que gera dist/sitemap.xml no build a partir de
   src/lib/routes.ts. Sem dependências externas — parse via regex
   leve (routes.ts é estável e segue um shape consistente).

   Roadmap · Fase 14.2 (Distribuição & web standards)

   Por que regex em vez de import dinâmico:
     - routes.ts é TS; importar em Node ESM puro requereria tsx/jiti.
     - O shape é estável: cada item é { id: "...", n: "...", route?: "..." }.
     - Mantém zero deps no toolchain (princípio editorial do projeto).

   Validação: o plugin loga a quantidade de URLs geradas. Se
   diferir do esperado (ALL_ROUTE_IDS.length), revise o regex.
   ================================================================ */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROUTES_FILE = resolve(__dirname, "../src/lib/routes.ts");

/**
 * Parseia routes.ts e retorna lista plana de slugs públicos.
 * Cada item de ROUTES tem o shape:
 *   { id: "colors", n: "02" }                  → slug = "colors"
 *   { id: "zIndex", n: "09", route: "z-index" } → slug = "z-index" (route override)
 */
function parseRoutes(source) {
  // Regex captura objects no formato { id: "...", n: "...", ... }
  // Não tentamos parsear groups — basta extrair todos os slugs únicos
  const ITEM_RE = /\{\s*id:\s*"([^"]+)"\s*,\s*n:\s*"([^"]+)"(?:\s*,\s*route:\s*"([^"]+)")?[^}]*\}/g;
  const slugs = [];
  let match;
  while ((match = ITEM_RE.exec(source)) !== null) {
    const [, id, _n, routeOverride] = match;
    slugs.push(routeOverride || id);
  }
  return slugs;
}

/** Escapa caracteres XML em URLs (raros, mas seguros) */
function xmlEscape(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Gera o XML do sitemap com hreflang alternates.
 * Cada rota vira <url> com:
 *   - <loc>           URL canônica (default locale: pt-BR)
 *   - <lastmod>       data do build (ISO 8601)
 *   - <xhtml:link>    hreflang pra cada locale + x-default
 */
function buildSitemap(slugs, opts) {
  const { siteUrl, locales = ["pt-BR", "en"] } = opts;
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const urls = slugs.map((slug) => {
    // home = entrada, sem hash
    const path = slug === "home" ? "" : `#/${slug}`;
    const loc = `${siteUrl}/${path}`;

    const alternates = locales
      .map(
        (lang) =>
          `    <xhtml:link rel="alternate" hreflang="${lang}" href="${xmlEscape(loc)}"/>`
      )
      .join("\n");
    const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(loc)}"/>`;

    return `  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${slug === "home" ? "1.0" : "0.7"}</priority>
${alternates}
${xDefault}
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;
}

/**
 * Vite plugin factory. Roda no closeBundle (depois do build SSG/SPA).
 * Lê routes.ts, gera sitemap.xml, escreve em outDir/sitemap.xml.
 */
export function sitemapPlugin(options = {}) {
  const {
    siteUrl = process.env.VITE_SITE_URL || "https://atelier.dev",
    locales = ["pt-BR", "en"],
  } = options;

  return {
    name: "atelier-sitemap",
    apply: "build",
    closeBundle() {
      try {
        const source = readFileSync(ROUTES_FILE, "utf8");
        const slugs = parseRoutes(source);

        if (slugs.length === 0) {
          this.warn("[sitemap] Nenhuma rota encontrada — regex falhou?");
          return;
        }

        // Resolve outDir do config Vite (default: dist)
        const outDir = this.environment?.config?.build?.outDir
          || options.outDir
          || "dist";
        const outPath = resolve(__dirname, "..", outDir, "sitemap.xml");

        mkdirSync(dirname(outPath), { recursive: true });

        const xml = buildSitemap(slugs, { siteUrl, locales });
        writeFileSync(outPath, xml, "utf8");

        // Log editorial discreto
        console.log(
          `\n  ✓ sitemap.xml — ${slugs.length} rotas × ${locales.length} locales\n`
        );
      } catch (err) {
        this.error(`[sitemap] Falha ao gerar: ${err.message}`);
      }
    },
  };
}
