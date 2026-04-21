#!/usr/bin/env node
/* ================================================================
   @atelier/cli — atelier
   ----------------------------------------------------------------
   CLI shadcn-style: copia componentes do Atelier para o seu projeto.
   App fica dona do codigo — versiona, customiza, aceita updates
   opcionais reexecutando `atelier add`.

   Comandos:
     atelier init                   Scaffold inicial (src/ds, src/lib, css)
     atelier add <Component>...     Copia componente(s) + deps transitivas
     atelier list [--category=<c>]  Lista o que esta disponivel
     atelier --version              Versao do CLI
     atelier --help                 Esta ajuda

   Zero deps externas. Node >= 18.
   ================================================================ */

import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = resolve(__dirname, "..");

/* ---- pretty output -------------------------------------------- */

const isTTY = process.stdout.isTTY;
const c = {
  bold: (s) => (isTTY ? `\x1b[1m${s}\x1b[0m` : s),
  dim: (s) => (isTTY ? `\x1b[2m${s}\x1b[0m` : s),
  green: (s) => (isTTY ? `\x1b[32m${s}\x1b[0m` : s),
  red: (s) => (isTTY ? `\x1b[31m${s}\x1b[0m` : s),
  yellow: (s) => (isTTY ? `\x1b[33m${s}\x1b[0m` : s),
  cyan: (s) => (isTTY ? `\x1b[36m${s}\x1b[0m` : s),
  italic: (s) => (isTTY ? `\x1b[3m${s}\x1b[0m` : s),
};
const SYM = { ok: "✓", warn: "!", err: "✗", dot: "·" };

function out(msg) {
  process.stdout.write(`${msg}\n`);
}
function err(msg) {
  process.stderr.write(`${msg}\n`);
}

/* ---- registry ------------------------------------------------- */

let _registry = null;

function loadRegistry() {
  if (_registry) return _registry;
  const path = join(PKG_ROOT, "registry.json");
  if (!existsSync(path)) {
    err(c.red(`${SYM.err} registry.json nao encontrado em ${path}`));
    err(`  O pacote @atelier/cli pode ter sido instalado de forma incompleta.`);
    err(`  Tente reinstalar: npm install -D @atelier/cli`);
    process.exit(1);
  }
  try {
    _registry = JSON.parse(readFileSync(path, "utf8"));
    return _registry;
  } catch (e) {
    err(c.red(`${SYM.err} registry.json corrompido: ${e.message}`));
    process.exit(1);
  }
}

function loadPackageVersion() {
  try {
    const pkg = JSON.parse(readFileSync(join(PKG_ROOT, "package.json"), "utf8"));
    return pkg.version || "0.0.0";
  } catch {
    return "0.0.0";
  }
}

/* ---- arg parser (zero-dep) ----------------------------------- */

function parseArgs(argv) {
  const positional = [];
  const flags = {};
  for (const arg of argv) {
    if (arg.startsWith("--")) {
      const [k, v] = arg.slice(2).split("=");
      flags[k] = v === undefined ? true : v;
    } else if (arg.startsWith("-")) {
      flags[arg.slice(1)] = true;
    } else {
      positional.push(arg);
    }
  }
  return { positional, flags };
}

/* ---- comandos ------------------------------------------------- */

function cmdHelp() {
  const v = loadPackageVersion();
  out(`
${c.bold("Atelier CLI")} ${c.dim(`v${v}`)}
${c.italic(c.dim("A quiet, editorial design system — copy components into your project."))}

${c.bold("Uso:")}
  ${c.cyan("atelier init")}                    Scaffold inicial (src/ds, src/lib, css)
  ${c.cyan("atelier add <Component>")}         Copia um componente + dependencias
  ${c.cyan("atelier list")} ${c.dim("[--category=<c>]")}    Lista o que esta disponivel
  ${c.cyan("atelier --version")}               Versao do CLI
  ${c.cyan("atelier --help")}                  Esta ajuda

${c.bold("Exemplos:")}
  ${c.dim("$")} npx atelier init
  ${c.dim("$")} npx atelier add Button
  ${c.dim("$")} npx atelier add DataTable
  ${c.dim("$")} npx atelier list --category=overlay

${c.dim("Saiba mais:")} ${c.cyan("https://atelier-ds.com")}
`);
}

function cmdVersion() {
  out(loadPackageVersion());
}

function cmdList(flags) {
  const registry = loadRegistry();
  const filter = typeof flags.category === "string" ? flags.category : null;

  const items = filter
    ? registry.components.filter((x) => x.category === filter)
    : registry.components;

  if (filter && items.length === 0) {
    out(c.yellow(`\n  Nenhum componente na categoria "${filter}".\n`));
    /* Mostra categorias disponiveis pra ajudar. */
    const cats = [...new Set(registry.components.map((x) => x.category))].sort();
    out(c.dim(`  Categorias disponiveis: ${cats.join(", ")}\n`));
    return;
  }

  out(`
  ${c.bold(`${items.length} componente${items.length === 1 ? "" : "s"}`)} ${c.dim(filter ? `(categoria: ${filter})` : "")}
`);
  for (const x of items) {
    const deps = x.deps?.length ? c.dim(` -> ${x.deps.join(", ")}`) : "";
    const note = x.note ? c.italic(c.dim(` ${x.note}`)) : "";
    out(`    ${c.cyan(x.name.padEnd(18))} ${c.dim(x.category.padEnd(11))}${note}${deps}`);
  }
  out("");
}

function cmdInit(flags) {
  const cwd = process.cwd();
  const dryRun = !!flags["dry-run"];
  out(`
  ${c.bold("Atelier · init")} ${c.dim(`cwd: ${cwd}${dryRun ? " (dry-run)" : ""}`)}
`);

  const dirs = ["src/ds", "src/lib", "src/lib/hooks"];
  for (const d of dirs) {
    const full = join(cwd, d);
    if (existsSync(full)) {
      out(c.dim(`  ${SYM.dot} ${d}/ ja existe`));
    } else {
      if (!dryRun) mkdirSync(full, { recursive: true });
      out(c.green(`  ${SYM.ok} criou ${d}/`));
    }
  }

  /* CSS base — copia o styles/atelier.css ou cria um stub que importa
     do pacote (caso o usuario va instalar @atelier/ds em vez de copiar). */
  const cssTarget = join(cwd, "src/atelier.css");
  if (existsSync(cssTarget)) {
    out(c.dim(`  ${SYM.dot} src/atelier.css ja existe — preservado`));
  } else {
    const stylesSrc = join(PKG_ROOT, "styles/atelier.css");
    if (existsSync(stylesSrc)) {
      const content = readFileSync(stylesSrc, "utf8");
      if (!dryRun) writeFileSync(cssTarget, content);
      const sizeKb = (statSync(stylesSrc).size / 1024).toFixed(1);
      out(c.green(`  ${SYM.ok} copiou src/atelier.css (${sizeKb} KB)`));
    } else {
      const stub =
        `/* Atelier — base styles.\n` +
        ` * Importe do pacote ou cole tokens aqui.\n` +
        ` */\n` +
        `@import "@atelier/ds/styles.css";\n`;
      if (!dryRun) writeFileSync(cssTarget, stub);
      out(c.green(`  ${SYM.ok} criou src/atelier.css (stub)`));
    }
  }

  out(`
  ${c.bold("Pronto.")} Importe ${c.cyan('"./atelier.css"')} no entry e adicione componentes:
    ${c.dim("$")} ${c.cyan("npx atelier add Button")}
    ${c.dim("$")} ${c.cyan("npx atelier add DataTable")}
`);
}

function resolveTransitive(registry, names) {
  const byName = new Map(registry.components.map((x) => [x.name.toLowerCase(), x]));
  const byHook = new Map(registry.hooks.map((x) => [x.name.toLowerCase(), x]));
  const wantedComps = new Set();
  const wantedHooks = new Set();

  function visit(name) {
    const lower = name.toLowerCase();
    if (byName.has(lower)) {
      const c = byName.get(lower);
      if (wantedComps.has(c.name)) return;
      wantedComps.add(c.name);
      for (const d of c.deps ?? []) visit(d);
      return;
    }
    if (byHook.has(lower)) {
      const h = byHook.get(lower);
      if (wantedHooks.has(h.name)) return;
      wantedHooks.add(h.name);
      return;
    }
    /* Nao encontrado em nenhum */
    return name;
  }

  const missing = [];
  for (const n of names) {
    const result = visit(n);
    if (result) missing.push(result);
  }

  return {
    components: [...wantedComps].map((name) => byName.get(name.toLowerCase())),
    hooks: [...wantedHooks].map((name) => byHook.get(name.toLowerCase())),
    missing,
  };
}

function cmdAdd(positional, flags) {
  if (positional.length === 0) {
    err(c.red(`${SYM.err} Especifique pelo menos um componente.`));
    err(`  Ex: ${c.cyan("npx atelier add Button")}`);
    process.exit(1);
  }

  const registry = loadRegistry();
  const dryRun = !!flags["dry-run"];
  const force = !!flags.force;

  const { components, hooks, missing } = resolveTransitive(registry, positional);

  if (missing.length > 0) {
    err(c.red(`${SYM.err} nao encontrado: ${missing.join(", ")}`));
    err(c.dim(`  Use "atelier list" para ver os disponiveis.`));
    process.exit(1);
  }

  const cwd = process.cwd();
  const dsDir = join(cwd, "src/ds");
  const hooksDir = join(cwd, "src/lib/hooks");

  if (!existsSync(join(cwd, "src"))) {
    err(c.yellow(`${SYM.warn} src/ nao existe no cwd. Rode "atelier init" primeiro.`));
    process.exit(1);
  }

  out(`
  ${c.bold("Atelier · add")} ${c.dim(`-> ${positional.join(", ")}${dryRun ? " (dry-run)" : ""}`)}
`);

  let copied = 0;
  let skipped = 0;
  let warnings = 0;

  function emit(srcAbs, destAbs, label) {
    if (!existsSync(srcAbs)) {
      out(c.yellow(`  ${SYM.warn} fonte ausente: ${label} — pulando`));
      warnings++;
      return;
    }
    if (existsSync(destAbs) && !force) {
      out(c.dim(`  ${SYM.dot} ${label} ja existe (use --force para sobrescrever)`));
      skipped++;
      return;
    }
    if (!dryRun) {
      mkdirSync(dirname(destAbs), { recursive: true });
      cpSync(srcAbs, destAbs);
    }
    out(c.green(`  ${SYM.ok} ${label}`));
    copied++;
  }

  for (const comp of components) {
    const file = basename(comp.path);
    const srcAbs = join(PKG_ROOT, comp.path);
    const destAbs = join(dsDir, file);
    emit(srcAbs, destAbs, `src/ds/${file}`);
  }

  for (const h of hooks) {
    const file = basename(h.path);
    const srcAbs = join(PKG_ROOT, h.path);
    const destAbs = join(hooksDir, file);
    emit(srcAbs, destAbs, `src/lib/hooks/${file}`);
  }

  out(`
  ${c.bold("Resumo:")} ${c.green(`${copied} adicionado(s)`)} ${c.dim("·")} ${c.dim(`${skipped} ignorado(s)`)}${
    warnings ? ` ${c.dim("·")} ${c.yellow(`${warnings} warning(s)`)}` : ""
  }
`);
  if (components[0]) {
    const main = components[0];
    const file = basename(main.path).replace(/\.tsx?$/, "");
    out(`  ${c.dim("import")} { ${main.name} } ${c.dim("from")} "./ds/${file}";\n`);
  }
}

/* ---- entry ---------------------------------------------------- */

function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const { positional, flags } = parseArgs(rest);

  if (flags.version || flags.v || cmd === "--version" || cmd === "-v") {
    cmdVersion();
    return;
  }

  switch (cmd) {
    case "init":
      cmdInit(flags);
      return;
    case "add":
      cmdAdd(positional, flags);
      return;
    case "list":
    case "ls":
      cmdList(flags);
      return;
    case "--help":
    case "-h":
    case "help":
    case undefined:
      cmdHelp();
      return;
    default:
      err(c.red(`${SYM.err} Comando desconhecido: ${cmd}`));
      cmdHelp();
      process.exit(1);
  }
}

main();
