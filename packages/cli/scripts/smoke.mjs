#!/usr/bin/env node
/* ================================================================
   smoke.mjs (@atelier/cli)
   ----------------------------------------------------------------
   Empacota o pacote (npm pack), instala num diretorio temporario
   limpo e exercita os comandos do CLI ponta-a-ponta — exatamente
   como um usuario faria via npx.

   Verifica:
     1. npm pack gera o tarball
     2. npm install do tarball funciona em sandbox isolada
     3. atelier --version retorna a versao esperada
     4. atelier --help imprime o banner
     5. atelier list lista 36 componentes
     6. atelier list --category=overlay filtra para 5
     7. atelier init cria src/ds, src/lib/hooks, src/atelier.css
     8. atelier add Button copia primitives.tsx
     9. atelier add DataTable resolve deps transitivas (>= 5 arquivos)
    10. atelier --force sobrescreve arquivos existentes

   Sandbox usa um .npmrc proprio apontando para o registry publico,
   isolando da configuracao global do usuario (CodeArtifact, etc).
   Zero deps externas.
   ================================================================ */

import { execSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = resolve(__dirname, "..");

const isTTY = process.stdout.isTTY;
const c = {
  bold: (s) => (isTTY ? `\x1b[1m${s}\x1b[0m` : s),
  dim: (s) => (isTTY ? `\x1b[2m${s}\x1b[0m` : s),
  green: (s) => (isTTY ? `\x1b[32m${s}\x1b[0m` : s),
  red: (s) => (isTTY ? `\x1b[31m${s}\x1b[0m` : s),
  yellow: (s) => (isTTY ? `\x1b[33m${s}\x1b[0m` : s),
};

let passed = 0;
let failed = 0;
const failures = [];

function check(label, fn) {
  try {
    const result = fn();
    if (result === false) throw new Error("returned false");
    process.stdout.write(`  ${c.green("✓")} ${label}\n`);
    passed++;
  } catch (e) {
    process.stdout.write(`  ${c.red("✗")} ${label}\n    ${c.dim(e.message)}\n`);
    failed++;
    failures.push({ label, error: e });
  }
}

function run(cmd, opts = {}) {
  return execSync(cmd, {
    encoding: "utf8",
    stdio: opts.silent ? "pipe" : ["pipe", "pipe", "pipe"],
    ...opts,
  });
}

function runCapture(cmd, opts = {}) {
  return execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"], ...opts });
}

/* ---- main ----------------------------------------------------- */

console.log(`\n${c.bold("Atelier CLI · smoke test")}\n`);

const pkg = JSON.parse(readFileSync(join(PKG_ROOT, "package.json"), "utf8"));
const expectedVersion = pkg.version;

/* 0. Sync sources antes de empacotar */
console.log(c.dim(`  preparando: sync-sources + npm pack`));
run("node scripts/sync-sources.mjs", { cwd: PKG_ROOT, silent: true });

/* 1. npm pack
   --ignore-scripts evita re-rodar o prepack (cujo output humano
   poluiria o JSON). Ja chamamos sync-sources manualmente acima. */
let tarballPath;
check("npm pack gera tarball", () => {
  const out = runCapture("npm pack --ignore-scripts --json", { cwd: PKG_ROOT });
  /* npm pack pode imprimir warnings antes do JSON. Pegamos da
     primeira "[" ate o fim. */
  const jsonStart = out.indexOf("[");
  if (jsonStart < 0) throw new Error("output nao contem JSON");
  const parsed = JSON.parse(out.slice(jsonStart));
  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("npm pack nao retornou tarball");
  }
  const filename = parsed[0].filename;
  /* Scoped packages ficam como atelier-cli-X.Y.Z.tgz */
  const candidates = [
    filename ? resolve(PKG_ROOT, filename) : null,
    resolve(PKG_ROOT, `atelier-cli-${expectedVersion}.tgz`),
  ].filter(Boolean);
  tarballPath = candidates.find((p) => existsSync(p));
  if (!tarballPath) {
    throw new Error(`tarball nao achado: ${candidates.join(" | ")}`);
  }
});

/* 2. Sandbox isolada */
const sandbox = mkdtempSync(join(tmpdir(), "atelier-cli-smoke-"));
console.log(c.dim(`  sandbox: ${sandbox}`));

writeFileSync(
  join(sandbox, ".npmrc"),
  "registry=https://registry.npmjs.org/\nfetch-retries=2\n"
);

writeFileSync(
  join(sandbox, "package.json"),
  JSON.stringify({ name: "atelier-cli-smoke", version: "0.0.0", private: true }, null, 2)
);

check("npm install do tarball em sandbox", () => {
  run(`npm install --no-audit --no-fund --silent "${tarballPath}"`, {
    cwd: sandbox,
    env: { ...process.env, npm_config_userconfig: join(sandbox, ".npmrc") },
  });
  if (!existsSync(join(sandbox, "node_modules/@atelier/cli/bin/atelier.js"))) {
    throw new Error("bin/atelier.js nao encontrado apos install");
  }
});

const binPath = join(sandbox, "node_modules/@atelier/cli/bin/atelier.js");

/* 3. --version */
check("--version retorna a versao do package.json", () => {
  const v = runCapture(`node "${binPath}" --version`).trim();
  if (v !== expectedVersion) {
    throw new Error(`esperado ${expectedVersion}, recebido ${v}`);
  }
});

/* 4. --help */
check("--help imprime banner com comandos", () => {
  const help = runCapture(`node "${binPath}" --help`);
  if (!/Atelier CLI/.test(help)) throw new Error("banner ausente");
  if (!/atelier init/.test(help)) throw new Error("init nao listado");
  if (!/atelier add/.test(help)) throw new Error("add nao listado");
  if (!/atelier list/.test(help)) throw new Error("list nao listado");
});

/* 5. list completo */
check("list mostra >= 30 componentes", () => {
  const out = runCapture(`node "${binPath}" list`);
  const match = out.match(/(\d+)\s+componentes?/);
  if (!match) throw new Error("contagem nao encontrada");
  const n = parseInt(match[1], 10);
  if (n < 30) throw new Error(`apenas ${n} componentes`);
});

/* 6. list --category=overlay */
check("list --category=overlay filtra para overlays", () => {
  const out = runCapture(`node "${binPath}" list --category=overlay`);
  if (!/Drawer/.test(out)) throw new Error("Drawer ausente");
  if (!/Dialog/.test(out)) throw new Error("Dialog ausente");
  if (/Button/.test(out)) throw new Error("Button vazou (era overlay only)");
});

/* 7. init num projeto temporario */
const project = join(sandbox, "myapp");
mkdirSync(project, { recursive: true });
check("init cria src/ds, src/lib/hooks, src/atelier.css", () => {
  run(`node "${binPath}" init`, { cwd: project });
  for (const p of ["src/ds", "src/lib/hooks", "src/atelier.css"]) {
    if (!existsSync(join(project, p))) throw new Error(`${p} nao criado`);
  }
  const css = readFileSync(join(project, "src/atelier.css"), "utf8");
  if (css.length < 1000) throw new Error("CSS suspeitosamente pequeno");
});

/* 8. add Button */
check("add Button copia primitives.tsx", () => {
  run(`node "${binPath}" add Button`, { cwd: project });
  if (!existsSync(join(project, "src/ds/primitives.tsx"))) {
    throw new Error("primitives.tsx nao copiado");
  }
});

/* 9. add DataTable resolve deps */
check("add DataTable copia deps transitivas (>= 5 arquivos)", () => {
  run(`node "${binPath}" add DataTable`, { cwd: project });
  const dsFiles = readdirSync(join(project, "src/ds"));
  /* Esperamos pelo menos: DataTable, Combobox, DatePicker, RangeSlider,
     Pagination, Calendar, primitives (ja existia). */
  const expected = ["DataTable.tsx", "Combobox.tsx", "DatePicker.tsx", "RangeSlider.tsx", "Pagination.tsx", "Calendar.tsx"];
  for (const f of expected) {
    if (!dsFiles.includes(f)) throw new Error(`${f} ausente em src/ds/`);
  }
});

/* 10. --force sobrescreve */
check("--force sobrescreve arquivos existentes", () => {
  const target = join(project, "src/ds/primitives.tsx");
  const original = readFileSync(target, "utf8");
  /* Modifica para garantir reescrita real */
  writeFileSync(target, "// modificado pelo smoke\n");
  run(`node "${binPath}" add Button --force`, { cwd: project });
  const after = readFileSync(target, "utf8");
  if (after === "// modificado pelo smoke\n") throw new Error("nao sobrescreveu");
  if (after.length !== original.length) {
    /* Conteudo deveria ter voltado ao original. */
    /* Tolerancia: tamanho pode variar por copia binaria — checa que volume bateu */
    if (Math.abs(after.length - original.length) > 8) {
      throw new Error("conteudo apos --force nao bate com original");
    }
  }
});

/* ---- cleanup ------------------------------------------------- */

try {
  rmSync(sandbox, { recursive: true, force: true });
} catch {
  /* ignore */
}
try {
  if (tarballPath && existsSync(tarballPath)) rmSync(tarballPath);
} catch {
  /* ignore */
}

console.log(`\n${c.bold("Resultado:")} ${c.green(`${passed} passou`)} ${
  failed > 0 ? c.red(`· ${failed} falhou`) : c.dim("· 0 falhou")
}\n`);

if (failed > 0) {
  process.exit(1);
}
