/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { sitemapPlugin } from "./scripts/vite-plugin-sitemap.mjs";
import { serviceWorkerPlugin } from "./scripts/vite-plugin-sw.mjs";

/* ================================================================
   Atelier — vite + vitest config
   ----------------------------------------------------------------
   Code splitting (Roadmap · fase 8.1):
     - cada página é React.lazy() em App.tsx → chunk por rota
     - manualChunks separa vendor + ds + i18n do app shell
     - alvo: nenhum chunk > 200 KB minified (Vite avisa em 500)

   Testes (Roadmap · fase 6.4):
     - vitest com jsdom (compatível com testing-library)
     - setup file carrega @testing-library/jest-dom matchers
     - rode com `npm run test` ou `npm run test:watch`
   ================================================================ */

export default defineConfig({
  plugins: [
    react(),
    /* sitemap.xml gerado no build a partir de src/lib/routes.ts.
       Roadmap · fase 14.2 — define VITE_SITE_URL no .env.production
       quando deployar em domínio real. */
    sitemapPlugin({
      siteUrl: process.env.VITE_SITE_URL || "https://atelier.dev",
      locales: ["pt-BR", "en"],
    }),
    /* Service Worker full offline (Roadmap · 14.3) — gera dist/sw.js
       com pre-cache de todos os chunks JS/CSS/SVG/manifest no build.
       Estratégia: cache-first pra hash-named, network-first pra navegação,
       stale-while-revalidate pra outros. Zero deps de runtime. */
    serviceWorkerPlugin(),
  ],
  server: {
    port: 5173,
    open: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: false,
    /* Excluir páginas/componentes de cobertura inicial — focamos em
       lib (hooks, contrast, tokens). */
    coverage: {
      include: ["src/lib/**/*.ts", "src/ds/**/*.ts"],
    },
  },
  build: {
    /* Reduz o limite do warning pro nosso target editorial.
       O default é 500 KB; queremos saber bem antes disso. */
    chunkSizeWarningLimit: 250,
    rollupOptions: {
      output: {
        manualChunks(id) {
          /* react/react-dom — só uma vez, fora do shell */
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) {
            return "react";
          }
          /* outras deps (jsx-runtime, scheduler) ficam em vendor */
          if (id.includes("node_modules/")) {
            return "vendor";
          }
          /* Atelier DS — peças pesadas separadas para que páginas
             que não usam não paguem por elas */
          if (id.includes("/src/ds/Chart")) return "ds-charts";
          if (id.includes("/src/ds/DataTable")) return "ds-datatable";
          if (id.includes("/src/ds/DragDrop")) return "ds-dragdrop";
          if (id.includes("/src/ds/MarkdownViewer")) return "ds-markdown";
          if (id.includes("/src/ds/ColorPicker")) return "ds-colorpicker";
          if (id.includes("/src/ds/Calendar") || id.includes("/src/ds/DatePicker")) {
            return "ds-datepicker";
          }
          /* Restante do DS — primitives, Tabs, Drawer, Popover etc.
             usados pelo shell e por várias páginas, vivem juntos */
          if (id.includes("/src/ds/")) return "ds-core";
          /* i18n — UM chunk por locale (lazy via loadLocale).
             Não unificar — isso anularia o split. O index.ts e os
             dicts ficam em chunks distintos automaticamente quando
             cada locale é importado dinamicamente. */
          if (id.includes("/src/i18n/pt-BR.")) return "i18n-pt-BR";
          if (id.includes("/src/i18n/en.")) return "i18n-en";
        },
      },
    },
  },
});
