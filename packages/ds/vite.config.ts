/* ================================================================
   @atelier/ds — Vite library build config
   ----------------------------------------------------------------
   - Library mode: 6 entry points (index, components, hooks, tokens,
     contrast, styles).
   - Output: ESM (.js) + CJS (.cjs)
   - Tipos: vite-plugin-dts (emit por arquivo, sem rollup)
   - React/react-dom como peerDependency externalizado
   - CSS extraido para dist/atelier.css

   Os fontes do app sao espelhados em src/_app/ pelo script
   sync-sources.mjs antes do build. O mesmo script instala
   versoes shim (i18n/theme/routes/searchIndex/sandbox) dentro de
   _app/lib/, de modo que `import "../lib/i18n.tsx"` em um
   componente copiado resolve para o shim local — sem precisar
   de aliases ou rewrites.
   ================================================================ */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: resolve(__dirname, "src"),
      outDir: "dist",
      include: ["src/**/*.ts", "src/**/*.tsx"],
      exclude: ["**/*.test.ts", "**/*.test.tsx", "src/_app/**/*.test.*"],
      tsconfigPath: resolve(__dirname, "tsconfig.json"),
      copyDtsFiles: false,
      insertTypesEntry: false,
    }),
  ],

  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        components: resolve(__dirname, "src/components.ts"),
        hooks: resolve(__dirname, "src/hooks.ts"),
        tokens: resolve(__dirname, "src/tokens.ts"),
        contrast: resolve(__dirname, "src/contrast.ts"),
        styles: resolve(__dirname, "src/styles.ts"),
      },
      formats: ["es", "cjs"],
      fileName: (format, entryName) =>
        format === "es" ? `${entryName}.js` : `${entryName}.cjs`,
    },
    sourcemap: true,
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        /^react\//,
        /^react-dom\//,
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) return "atelier.css";
          return "assets/[name][extname]";
        },
        preserveModules: false,
      },
    },
    target: "es2020",
    outDir: "dist",
    emptyOutDir: true,
  },
});
