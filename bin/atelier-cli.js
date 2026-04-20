#!/usr/bin/env node
/* ================================================================
   atelier-cli — Roadmap · fase 13.4
   ----------------------------------------------------------------
   CLI inspirada em shadcn-style: copia componentes do registry
   diretamente pra src/ds/ do projeto consumidor. Apps ficam donas
   do código — versionam, customizam, aceitam atualização opcional.

   Comandos:
     atelier init            scaffolda src/ds/, src/lib/, css base
     atelier add <component> copia componente + dependências
     atelier list            lista componentes disponíveis
     atelier --help          ajuda

   Zero deps externas — apenas Node 18+ stdlib (fs, path, https).
   ================================================================ */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/* O registry vive ao lado do CLI quando o pacote é publicado.
   Em dev, lê direto do src/ do repo do Atelier. */
function findRegistry() {
  const candidates = [
    resolve(__dirname, "../registry.json"),
    resolve(__dirname, "../dist/registry.json"),
    resolve(__dirname, "../src/lib/registry.json"),
  ];
  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  return null;
}

function loadRegistry() {
  const path = findRegistry();
  if (!path) {
    console.error("✗ Registry não encontrado. O pacote @atelier/ds está corretamente instalado?");
    process.exit(1);
  }
  return JSON.parse(readFileSync(path, "utf8"));
}

/* ---- comandos ---- */

function cmdHelp() {
  console.log(`
  Atelier CLI

  Uso:
    atelier init                    Scaffold inicial (src/ds, src/lib, css)
    atelier add <component>         Copia um componente + dependências
    atelier list [--category=<c>]   Lista componentes disponíveis
    atelier --help                  Esta ajuda

  Exemplos:
    npx atelier init
    npx atelier add Button
    npx atelier add DataTable
    npx atelier list --category=overlay
`);
}

function cmdList(args) {
  const registry = loadRegistry();
  const categoryArg = args.find((a) => a.startsWith("--category="));
  const filter = categoryArg ? categoryArg.split("=")[1] : null;

  const items = filter
    ? registry.components.filter((c) => c.category === filter)
    : registry.components;

  console.log(`\n  ${items.length} componente(s) disponíve${items.length === 1 ? "l" : "is"}:\n`);
  for (const c of items) {
    const deps = c.deps?.length ? ` (deps: ${c.deps.join(", ")})` : "";
    console.log(`    ${c.name.padEnd(20)} · ${c.category.padEnd(10)} ${c.note || ""}${deps}`);
  }
  console.log();
}

function cmdInit() {
  const cwd = process.cwd();
  const dirs = ["src/ds", "src/lib", "src/lib/hooks"];
  for (const d of dirs) {
    const full = join(cwd, d);
    if (!existsSync(full)) {
      mkdirSync(full, { recursive: true });
      console.log(`  ✓ criou ${d}/`);
    } else {
      console.log(`  · ${d}/ já existe`);
    }
  }

  const cssPath = join(cwd, "src/atelier.css");
  if (!existsSync(cssPath)) {
    writeFileSync(
      cssPath,
      `/* Atelier — tokens base.\n` +
        `   Cole aqui o conteúdo de @atelier/ds/styles.css ou importe direto:\n` +
        `   @import "@atelier/ds/styles.css";\n` +
        `*/\n@import "@atelier/ds/styles.css";\n`
    );
    console.log(`  ✓ criou src/atelier.css`);
  }

  console.log(`\n  Scaffold pronto. Adicione componentes:\n`);
  console.log(`    npx atelier add Button`);
  console.log(`    npx atelier add Form\n`);
}

function cmdAdd(args) {
  const name = args[0];
  if (!name) {
    console.error("✗ Especifique um componente. Ex: npx atelier add Button");
    process.exit(1);
  }

  const registry = loadRegistry();
  const component = registry.components.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
  if (!component) {
    console.error(`✗ Componente "${name}" não encontrado. Use 'atelier list' pra ver os disponíveis.`);
    process.exit(1);
  }

  /* Resolve dependências transitivas */
  const seen = new Set();
  const queue = [component];
  while (queue.length > 0) {
    const c = queue.shift();
    if (seen.has(c.name)) continue;
    seen.add(c.name);
    for (const dep of c.deps ?? []) {
      const depComponent = registry.components.find((x) => x.name === dep);
      if (depComponent) queue.push(depComponent);
    }
  }

  const cwd = process.cwd();
  for (const cName of seen) {
    const c = registry.components.find((x) => x.name === cName);
    /* Em produção, os arquivos vêm bundled no pacote.
       Aqui simulamos copiando do src/ds local relativo ao CLI. */
    const sourceFile = resolve(__dirname, "..", c.path);
    if (!existsSync(sourceFile)) {
      console.warn(`  ! arquivo fonte não encontrado: ${c.path} — pulando`);
      continue;
    }
    const targetFile = join(cwd, c.path);
    mkdirSync(dirname(targetFile), { recursive: true });
    writeFileSync(targetFile, readFileSync(sourceFile, "utf8"));
    console.log(`  ✓ copiou ${c.path}`);
  }

  console.log(`\n  ${seen.size} arquivo(s) adicionado(s).\n`);
  console.log(`  Importe em qualquer componente:`);
  console.log(`    import { ${name} } from "./ds/${component.path.split("/").pop().replace(/\.tsx?$/, "")}";\n`);
}

/* ---- entry ---- */
const [cmd, ...args] = process.argv.slice(2);
switch (cmd) {
  case "init":
    cmdInit();
    break;
  case "add":
    cmdAdd(args);
    break;
  case "list":
    cmdList(args);
    break;
  case "--help":
  case "-h":
  case undefined:
    cmdHelp();
    break;
  default:
    console.error(`✗ Comando desconhecido: ${cmd}`);
    cmdHelp();
    process.exit(1);
}
