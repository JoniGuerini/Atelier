/* ================================================================
   scripts/vite-plugin-sw.mjs
   ----------------------------------------------------------------
   Vite plugin que gera dist/sw.js (service worker) ao final do build,
   com a lista completa de chunks/assets embutida pra pre-cache.

   Roadmap · Fase 14.3 (PWA full offline)

   Estratégia editorial:
     - PRE_CACHE_URLS embedded — todos os JS/CSS hash-named (imutáveis)
       + index.html + manifest + ícones + sitemap.
     - install: pre-cache shell + chunks (parallel fetch).
     - activate: limpa caches antigos (CACHE_VERSION mismatch).
     - fetch:
         * navigate → network-first com fallback a /index.html cacheado
           (SPA shell sempre disponível offline)
         * assets hashed → cache-first (imutáveis pelo hash do Vite)
         * outros (fonts cross-origin, sitemap) → stale-while-revalidate

   Zero dependências externas — só Cache API + fetch nativos.
   ================================================================ */

import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { resolve, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, "..");

/** Lista recursivamente todos os arquivos sob outDir, retornando
    paths absolute-from-root (ex: "/assets/index-xyz.js"). */
function listAllAssets(outDir) {
  const result = [];
  function walk(dir) {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      const stat = statSync(full);
      if (stat.isDirectory()) {
        walk(full);
      } else {
        // Path relativo ao outDir, com leading slash
        const rel = "/" + relative(outDir, full).replace(/\\/g, "/");
        result.push(rel);
      }
    }
  }
  walk(outDir);
  return result;
}

/**
 * Gera o conteúdo do sw.js como string.
 * Embeda PRE_CACHE_URLS e CACHE_VERSION em build-time.
 */
function buildServiceWorker(opts) {
  const { cacheVersion, preCacheUrls } = opts;

  return `/* ================================================================
   sw.js — Atelier Service Worker (gerado pelo build)
   ----------------------------------------------------------------
   ATENÇÃO: este arquivo é REGENERADO em cada build pelo plugin
   scripts/vite-plugin-sw.mjs. Não edite manualmente.

   Versão: ${cacheVersion}
   Pre-cache: ${preCacheUrls.length} arquivos
   ================================================================ */

const CACHE_VERSION = "${cacheVersion}";
const CACHE_NAME = "atelier-" + CACHE_VERSION;
const SHELL_URL = "/index.html";

/* URLs pré-cacheadas no install — shell + todos os chunks JS/CSS +
   ícones + manifest. Lista hash-named pelo Vite, todos imutáveis. */
const PRE_CACHE_URLS = ${JSON.stringify(preCacheUrls, null, 2)};

/* ----------------------------------------------------------------
   Install — pre-cache de tudo (full offline desde o primeiro paint).
---------------------------------------------------------------- */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // addAll é all-or-nothing: se UMA URL falhar, install falha.
      // Pra ser tolerante (ex: fonts Google offline na primeira visita),
      // fazemos add() individual com try/catch.
      return Promise.all(
        PRE_CACHE_URLS.map((url) =>
          cache.add(url).catch((err) => {
            console.warn("[sw] pre-cache miss:", url, err.message);
          })
        )
      );
    })
  );
  // Skip waiting — nova versão ativa imediatamente.
  self.skipWaiting();
});

/* ----------------------------------------------------------------
   Activate — limpa caches antigos (CACHE_VERSION mismatch).
---------------------------------------------------------------- */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k.startsWith("atelier-") && k !== CACHE_NAME)
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim()) // assume controle de páginas abertas
  );
});

/* ----------------------------------------------------------------
   Fetch — roteia por estratégia conforme tipo de request.
---------------------------------------------------------------- */
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Só interceptamos GET — outros métodos passam direto.
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Cross-origin (Google Fonts, Stackblitz, etc.) — stale-while-revalidate.
  // Não bloqueia render, atualiza cache em background.
  if (url.origin !== self.location.origin) {
    event.respondWith(staleWhileRevalidate(req));
    return;
  }

  // Navegação (HTML page request) — network-first com fallback ao shell.
  // Garante que offline mostra alguma coisa, mesmo URL nunca visitada
  // (SPA: tudo é o mesmo index.html).
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          // Atualiza cache do shell se sucesso
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(SHELL_URL, copy));
          return res;
        })
        .catch(() => caches.match(SHELL_URL))
    );
    return;
  }

  // Assets com hash no filename (Vite garante imutabilidade) —
  // cache-first. Detectado por padrão "-XXXXXXXX." (8+ chars hash).
  if (/-[A-Za-z0-9_-]{8,}\\.(js|css|woff2?|ttf|svg|png|jpg|webp|avif|json)$/.test(url.pathname)) {
    event.respondWith(cacheFirst(req));
    return;
  }

  // Default: stale-while-revalidate.
  event.respondWith(staleWhileRevalidate(req));
});

/* ----------------------------------------------------------------
   Estratégias de cache
---------------------------------------------------------------- */

/** Cache-first: serve do cache se existir, senão fetch + cache. */
async function cacheFirst(req) {
  const cached = await caches.match(req);
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(req, res.clone());
    }
    return res;
  } catch (err) {
    // Sem rede E sem cache — devolve resposta sintética 503
    return new Response("Offline e recurso não cacheado", {
      status: 503,
      statusText: "Service Unavailable",
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}

/** Stale-while-revalidate: serve cache imediato + atualiza em bg. */
async function staleWhileRevalidate(req) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(req);

  const fetchPromise = fetch(req)
    .then((res) => {
      if (res.ok) cache.put(req, res.clone());
      return res;
    })
    .catch(() => null);

  // Se cached existe, devolve imediatamente. Bg fetch atualiza.
  // Senão espera o fetch (network-only fallback).
  return cached || (await fetchPromise) || new Response("Offline", { status: 503 });
}

/* ----------------------------------------------------------------
   Mensagens — permite que a app peça skip waiting via postMessage.
   Útil pro UX de "nova versão disponível, recarregar?".
---------------------------------------------------------------- */
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
`;
}

/**
 * Vite plugin factory.
 * Roda no closeBundle, depois de tudo gerado.
 */
export function serviceWorkerPlugin(options = {}) {
  const {
    /** Padrão de inclusão pra pre-cache (regex). Default: assets + ícones + manifest. */
    include = /\.(js|css|svg|woff2?|webmanifest)$/i,
    /** Padrão de exclusão. Default: source maps. */
    exclude = /\.map$/i,
  } = options;

  return {
    name: "atelier-service-worker",
    apply: "build",
    closeBundle() {
      try {
        const outDir = this.environment?.config?.build?.outDir
          || options.outDir
          || "dist";
        const outDirAbs = resolve(ROOT_DIR, outDir);

        const allAssets = listAllAssets(outDirAbs);
        const preCacheUrls = allAssets
          .filter((p) => include.test(p))
          .filter((p) => !exclude.test(p));

        // Sempre incluir index.html e o manifest
        if (!preCacheUrls.includes("/index.html")) {
          preCacheUrls.unshift("/index.html");
        }
        if (!preCacheUrls.includes("/")) {
          preCacheUrls.unshift("/");
        }

        // Cache version baseado em timestamp do build — invalida tudo
        // automaticamente em cada deploy.
        const cacheVersion = String(Date.now());

        const swContent = buildServiceWorker({ cacheVersion, preCacheUrls });
        const swPath = resolve(outDirAbs, "sw.js");
        writeFileSync(swPath, swContent, "utf8");

        console.log(
          `  ✓ sw.js — ${preCacheUrls.length} URLs em pre-cache (v${cacheVersion})\n`
        );
      } catch (err) {
        this.error(`[sw] Falha ao gerar service worker: ${err.message}`);
      }
    },
  };
}
