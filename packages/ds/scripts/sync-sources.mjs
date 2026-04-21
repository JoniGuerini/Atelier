#!/usr/bin/env node
/* ================================================================
   @atelier/ds — sync app sources into the package
   ----------------------------------------------------------------
   Copies the source files the package re-exports from the main
   Atelier app into packages/ds/src/_app/. This keeps the package
   self-contained: Vite, vite-plugin-dts, and consumers all see
   sources under packages/ds/src/, with predictable relative paths.

   The destination directory is gitignored and regenerated on every
   build. The single source of truth remains src/ds/ and src/lib/
   in the app.

   Mapping:
     src/ds/*               -> _app/ds/*
     src/lib/hooks/*        -> _app/lib/hooks/*
     src/lib/contrast.ts    -> _app/lib/contrast.ts
     src/lib/tokens.ts      -> _app/lib/tokens.ts
     src/lib/useCopy.ts     -> _app/lib/useCopy.ts
     src/index.css          -> _app/index.css

   Files matching *.test.* are skipped.
   ================================================================ */

import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
  copyFileSync,
} from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_DIR = resolve(__dirname, "..");
const APP_ROOT = resolve(PKG_DIR, "../..");
const DEST = resolve(PKG_DIR, "src/_app");

const log = (m) => console.log(`[sync] ${m}`);

if (existsSync(DEST)) {
  rmSync(DEST, { recursive: true, force: true });
}
mkdirSync(DEST, { recursive: true });

function isTestFile(name) {
  return /\.(test|spec)\.(ts|tsx)$/.test(name);
}

function copyDirFiltered(src, dst) {
  mkdirSync(dst, { recursive: true });
  for (const entry of readdirSync(src)) {
    const sp = join(src, entry);
    const dp = join(dst, entry);
    const st = statSync(sp);
    if (st.isDirectory()) {
      copyDirFiltered(sp, dp);
    } else if (st.isFile() && !isTestFile(entry)) {
      copyFileSync(sp, dp);
    }
  }
}

/* ds/* */
copyDirFiltered(resolve(APP_ROOT, "src/ds"), resolve(DEST, "ds"));
log("copied src/ds -> _app/ds");

/* lib/hooks/* */
copyDirFiltered(
  resolve(APP_ROOT, "src/lib/hooks"),
  resolve(DEST, "lib/hooks")
);
log("copied src/lib/hooks -> _app/lib/hooks");

/* lib/{contrast,tokens,useCopy} */
mkdirSync(resolve(DEST, "lib"), { recursive: true });
for (const f of ["contrast.ts", "tokens.ts", "useCopy.ts"]) {
  copyFileSync(resolve(APP_ROOT, "src/lib", f), resolve(DEST, "lib", f));
  log(`copied src/lib/${f}`);
}

/* index.css */
copyFileSync(resolve(APP_ROOT, "src/index.css"), resolve(DEST, "index.css"));
log("copied src/index.css");

/* Drop shim files inside _app/lib/ so that the copied components,
   which reference "../lib/i18n.tsx", "../lib/theme.tsx", etc.,
   resolve to package-local stubs instead of pulling in the app's
   docs-specific implementation. */
const SHIMS_SRC = resolve(PKG_DIR, "src/shims");
for (const shim of [
  ["i18n.tsx", "i18n.tsx"],
  ["theme.tsx", "theme.tsx"],
  ["routes.ts", "routes.ts"],
  ["searchIndex.ts", "searchIndex.ts"],
  ["sandbox.ts", "sandbox.ts"],
]) {
  copyFileSync(
    resolve(SHIMS_SRC, shim[0]),
    resolve(DEST, "lib", shim[1])
  );
  log(`installed shim _app/lib/${shim[1]}`);
}

log("done");
