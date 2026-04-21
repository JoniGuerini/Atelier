#!/usr/bin/env node
/* ================================================================
   @atelier/ds — smoke test
   ----------------------------------------------------------------
   1. npm pack -> generates atelier-ds-<v>.tgz
   2. cria diretorio temporario isolado
   3. instala o tarball + react + react-dom
   4. importa Button, Card, useDebounce via require + import dinamico
   5. verifica que .d.ts files existem
   ================================================================ */

import { execSync } from "node:child_process";
import { mkdtempSync, writeFileSync, existsSync, statSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_DIR = resolve(__dirname, "..");

const log = (msg) => console.log(`[smoke] ${msg}`);
const err = (msg) => {
  console.error(`[smoke] FAIL: ${msg}`);
  process.exit(1);
};

function sh(cmd, opts = {}) {
  log(`$ ${cmd}`);
  return execSync(cmd, { stdio: "inherit", ...opts });
}

function shCapture(cmd, opts = {}) {
  return execSync(cmd, { encoding: "utf8", ...opts }).trim();
}

/* ---- 1. Build (assumed to have been run via npm run pack) ---- */
const distFiles = [
  "dist/index.js",
  "dist/index.cjs",
  "dist/index.d.ts",
  "dist/components.js",
  "dist/components.cjs",
  "dist/components.d.ts",
  "dist/hooks.js",
  "dist/hooks.cjs",
  "dist/hooks.d.ts",
  "dist/tokens.js",
  "dist/tokens.cjs",
  "dist/tokens.d.ts",
  "dist/contrast.js",
  "dist/contrast.cjs",
  "dist/contrast.d.ts",
  "dist/atelier.css",
];

log("verifying dist artifacts...");
for (const f of distFiles) {
  const p = join(PKG_DIR, f);
  if (!existsSync(p)) err(`missing artifact: ${f}`);
  const sz = statSync(p).size;
  log(`  + ${f} (${(sz / 1024).toFixed(1)} KB)`);
}

/* ---- 2. Pack ---- */
log("running npm pack (json mode)...");
const packJson = shCapture("npm pack --json --pack-destination .", { cwd: PKG_DIR });
const packInfo = JSON.parse(packJson)[0];
const tgzName = packInfo.filename;
const tgzPath = join(PKG_DIR, tgzName);
log(`  -> ${tgzName} (${(packInfo.size / 1024).toFixed(1)} KB unpacked, ${packInfo.files.length} files)`);

/* ---- 3. Isolated install ---- */
const tmp = mkdtempSync(join(tmpdir(), "atelier-ds-smoke-"));
log(`temp dir: ${tmp}`);

writeFileSync(
  join(tmp, "package.json"),
  JSON.stringify(
    {
      name: "atelier-ds-smoke",
      version: "0.0.0",
      private: true,
      type: "module",
    },
    null,
    2
  )
);

/* Pin a clean .npmrc inside the sandbox so corporate registries
   in the user's home (e.g. ~/.npmrc with private CodeArtifact)
   don't bleed into this isolated test. */
writeFileSync(
  join(tmp, ".npmrc"),
  ["registry=https://registry.npmjs.org/", ""].join("\n")
);

/* Install peers first so the peer-dep resolver can satisfy them
   when the tarball is installed. */
sh(`npm install --no-audit --no-fund react@18 react-dom@18`, { cwd: tmp });
sh(`npm install --no-audit --no-fund "${tgzPath}"`, { cwd: tmp });

/* ---- 4. Import test ---- */
const testEsm = `
import { Button, Card, AtelierProvider, useDebounce, tokens, contrast } from "@atelier/ds";
import { Button as ButtonSub } from "@atelier/ds/components";
import { useDebounce as DebounceSub } from "@atelier/ds/hooks";
import { tokensByCategory } from "@atelier/ds/tokens";
import { wcagLevel } from "@atelier/ds/contrast";

const checks = {
  "Button is function": typeof Button === "function",
  "Card is function": typeof Card === "function",
  "AtelierProvider is function": typeof AtelierProvider === "function",
  "useDebounce is function": typeof useDebounce === "function",
  "ButtonSub is function": typeof ButtonSub === "function",
  "DebounceSub is function": typeof DebounceSub === "function",
  "tokensByCategory is function": typeof tokensByCategory === "function",
  "wcagLevel is function": typeof wcagLevel === "function",
  "tokens namespace ok": typeof tokens === "object" && typeof tokens.tokensByCategory === "function",
  "contrast namespace ok": typeof contrast === "object" && typeof contrast.wcagLevel === "function",
};

const failed = Object.entries(checks).filter(([, ok]) => !ok);
if (failed.length > 0) {
  console.error("FAIL:", failed.map(([k]) => k).join(", "));
  process.exit(1);
}
console.log("ESM imports OK (" + Object.keys(checks).length + " checks)");
`;

writeFileSync(join(tmp, "smoke-esm.mjs"), testEsm);
sh("node smoke-esm.mjs", { cwd: tmp });

const testCjs = `
const { Button, Card, useDebounce } = require("@atelier/ds");
if (typeof Button !== "function") { console.error("CJS Button missing"); process.exit(1); }
if (typeof Card !== "function") { console.error("CJS Card missing"); process.exit(1); }
if (typeof useDebounce !== "function") { console.error("CJS useDebounce missing"); process.exit(1); }
console.log("CJS imports OK");
`;

writeFileSync(join(tmp, "smoke-cjs.cjs"), testCjs);
sh("node smoke-cjs.cjs", { cwd: tmp });

/* ---- 5. Types presence ---- */
const dtsContent = readFileSync(
  join(tmp, "node_modules/@atelier/ds/dist/components.d.ts"),
  "utf8"
);
if (!dtsContent.includes("Button")) {
  err("dist/components.d.ts does not export Button");
}
log("types ok (Button found in components.d.ts)");

/* ---- 6. CSS present in install ---- */
const cssPath = join(tmp, "node_modules/@atelier/ds/dist/atelier.css");
if (!existsSync(cssPath)) err("atelier.css missing in installed package");
const cssSize = statSync(cssPath).size;
log(`atelier.css present (${(cssSize / 1024).toFixed(1)} KB)`);

log("ALL CHECKS PASSED");
console.log(`\nTarball: ${tgzPath}`);
console.log(`Test sandbox: ${tmp}`);
