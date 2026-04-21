#!/usr/bin/env node
/* ================================================================
   sync-sources.mjs (@atelier/cli)
   ----------------------------------------------------------------
   Copia os arquivos referenciados no registry.json para dentro
   do pacote @atelier/cli, garantindo que o CLI funcione quando
   instalado isoladamente (sem o repo do Atelier por perto).

   Estrategia: o registry.json continua sendo a unica fonte de
   verdade — varremos suas entradas, copiamos cada path para
   `packages/cli/components/` (componentes), `packages/cli/hooks/`
   (hooks), `packages/cli/lib/` (utilitarios) e `packages/cli/styles/`
   (CSS base). Em seguida emitimos um registry.json *normalizado*,
   com paths reescritos para apontarem para a copia local.

   Por que duas formas do registry?
   - O registry "fonte" (../../registry.json) referencia paths do
     repo (src/ds/Card.tsx, src/lib/hooks/useFocusTrap.ts, etc.).
   - O registry "publicado" (./registry.json) referencia paths
     dentro do pacote (components/Card.tsx, hooks/useFocusTrap.ts).
     O bin do CLI le esse formato.

   Zero deps externas. Idempotente.
   ================================================================ */

import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, basename, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = resolve(__dirname, "..");
const REPO_ROOT = resolve(__dirname, "../../..");

const REGISTRY_SRC = join(REPO_ROOT, "registry.json");

const OUT_DIRS = {
  components: join(PKG_ROOT, "components"),
  hooks: join(PKG_ROOT, "hooks"),
  lib: join(PKG_ROOT, "lib"),
  styles: join(PKG_ROOT, "styles"),
};
const OUT_REGISTRY = join(PKG_ROOT, "registry.json");

function log(msg) {
  process.stdout.write(`  ${msg}\n`);
}

function ensureClean() {
  for (const d of Object.values(OUT_DIRS)) {
    rmSync(d, { recursive: true, force: true });
    mkdirSync(d, { recursive: true });
  }
  rmSync(OUT_REGISTRY, { force: true });
}

/* Heuristica: traduz um path do repo para o destino dentro do pacote.
   Mantemos so o basename porque colisoes nao existem no registry atual
   (todos os componentes vivem em src/ds/* com nomes unicos, e hooks
   em src/lib/hooks/* idem). */
function destinationFor(repoPath) {
  const file = basename(repoPath);
  if (repoPath.startsWith("src/ds/")) {
    return { abs: join(OUT_DIRS.components, file), rel: `components/${file}` };
  }
  if (repoPath.startsWith("src/lib/hooks/")) {
    return { abs: join(OUT_DIRS.hooks, file), rel: `hooks/${file}` };
  }
  if (repoPath.startsWith("src/lib/")) {
    return { abs: join(OUT_DIRS.lib, file), rel: `lib/${file}` };
  }
  if (repoPath === "src/index.css") {
    return { abs: join(OUT_DIRS.styles, "atelier.css"), rel: "styles/atelier.css" };
  }
  /* Fallback: copia para a pasta lib, preservando o basename. */
  return { abs: join(OUT_DIRS.lib, file), rel: `lib/${file}` };
}

function copyOne(repoPath) {
  const src = join(REPO_ROOT, repoPath);
  if (!existsSync(src)) {
    log(`! arquivo ausente, pulando: ${repoPath}`);
    return null;
  }
  const dest = destinationFor(repoPath);
  mkdirSync(dirname(dest.abs), { recursive: true });
  cpSync(src, dest.abs);
  return dest.rel;
}

function main() {
  if (!existsSync(REGISTRY_SRC)) {
    process.stderr.write(`✗ registry.json fonte nao encontrado em ${REGISTRY_SRC}\n`);
    process.exit(1);
  }

  const registry = JSON.parse(readFileSync(REGISTRY_SRC, "utf8"));
  ensureClean();

  log(`sync @atelier/cli`);
  log(`  fonte:  ${REGISTRY_SRC}`);
  log(`  destino: ${PKG_ROOT}`);

  const components = (registry.components || []).map((c) => {
    const newPath = copyOne(c.path);
    return { ...c, path: newPath || c.path };
  });

  const hooks = (registry.hooks || []).map((h) => {
    const newPath = copyOne(h.path);
    return { ...h, path: newPath || h.path };
  });

  /* CSS base — sempre util pra o `init`. */
  const cssRel = copyOne("src/index.css");

  const normalized = {
    $schema: registry.$schema,
    name: registry.name,
    version: registry.version,
    /* Convencao: o publicado declara "internalLayout": "package", para
       que clientes / outros leitores saibam que paths sao relativos
       ao pacote, nao ao repo. */
    internalLayout: "package",
    styles: cssRel ? [cssRel] : [],
    components,
    hooks,
  };

  writeFileSync(OUT_REGISTRY, JSON.stringify(normalized, null, 2) + "\n");

  log(`✓ ${components.length} componente(s)`);
  log(`✓ ${hooks.length} hook(s)`);
  if (cssRel) log(`✓ styles base: ${cssRel}`);
  log(`✓ registry normalizado: registry.json`);
}

main();
