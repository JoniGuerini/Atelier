/* ================================================================
   Tokens — inventory central e serializers (Roadmap · fases 7.1+7.3)
   ----------------------------------------------------------------
   Fonte única de verdade do que o DS expõe via :root e
   :root[data-theme="..."]. Categorizado para:

     - Página /tokens (7.3): visualização filtrável + side-by-side
                              light/dark
     - Studio (7.1): export para tokens.json (W3C DTCG), theme.css,
                     theme.ts

   Nada é introspectado de getComputedStyle — esse caminho perde a
   organização editorial e mistura nossos tokens com user-agent.
   Aqui declaramos exatamente o vocabulário que CONSIDERAMOS público.
   ================================================================ */

export type TokenType =
  | "color"
  | "dimension"
  | "duration"
  | "fontFamily"
  | "fontSize"
  | "lineHeight"
  | "letterSpacing"
  | "shadow"
  | "number"
  | "ratio"
  | "string";

export interface TokenDef {
  /** CSS var name including the leading `--`. */
  name: string;
  /** Categoria editorial — dirige agrupamento na UI. */
  category: TokenCategory;
  /** Tipo W3C DTCG (https://design-tokens.github.io/community-group/format/). */
  type: TokenType;
  /** Valor default no tema light. */
  light: string;
  /** Valor no dark — undefined quando o token é tema-agnóstico. */
  dark?: string;
  /** 1-line note opcional (ex: "ângulos retos por padrão"). */
  note?: string;
}

export const TOKEN_CATEGORIES = [
  "color",
  "ink",
  "rule",
  "accent",
  "semantic",
  "effect",
  "scrollbar",
  "code",
  "type",
  "spacing",
  "layout",
  "motion",
  "radius",
  "shadow",
  "z-index",
  "breakpoint",
  "opacity",
  "aspect",
  "density",
] as const;

export type TokenCategory = (typeof TOKEN_CATEGORIES)[number];

/* ================================================================
   Inventory — todos os tokens públicos do DS, na ordem editorial.
   ================================================================ */

export const TOKENS: TokenDef[] = [
  /* ---- Cor: Surface ---- */
  { name: "--bg",          category: "color",  type: "color", light: "#f4f1ea", dark: "#121110", note: "Background base — papel envelhecido / antracite" },
  { name: "--bg-panel",    category: "color",  type: "color", light: "#faf8f3", dark: "#1a1917", note: "Card/panel slightly raised from --bg" },
  { name: "--bg-sunken",   category: "color",  type: "color", light: "#efeadc", dark: "#0b0a09", note: "Recessed surface — code, table headers" },
  { name: "--bg-inverse",  category: "color",  type: "color", light: "#1a1a1a", dark: "#ede8dc" },

  /* ---- Cor: Ink ---- */
  { name: "--ink",         category: "ink",    type: "color", light: "#1a1a1a", dark: "#ede8dc", note: "Primary text" },
  { name: "--ink-soft",    category: "ink",    type: "color", light: "#5a5754", dark: "#b8b1a2", note: "Secondary text, helpers" },
  { name: "--ink-faint",   category: "ink",    type: "color", light: "#9a958d", dark: "#75706a", note: "Tertiary, captions" },
  { name: "--ink-inverse", category: "ink",    type: "color", light: "#e8e3d6", dark: "#1a1917" },

  /* ---- Cor: Rule (linhas) ---- */
  { name: "--rule",        category: "rule",   type: "color", light: "#1a1a1a", dark: "#ede8dc", note: "Linha forte — afordância / hierarquia" },
  { name: "--rule-soft",   category: "rule",   type: "color", light: "#d9d3c4", dark: "#33302b", note: "Linha suave — agrupar containers" },
  { name: "--rule-faint",  category: "rule",   type: "color", light: "#e6e0d0", dark: "#25231f", note: "Linha fantasma — grids internos" },

  /* ---- Cor: Accent ---- */
  { name: "--accent",      category: "accent", type: "color", light: "#c8361d", dark: "#e5785e", note: "Vermelho tijolo / brasa" },
  { name: "--accent-soft", category: "accent", type: "color", light: "#f1ddd5", dark: "#3a231b" },
  { name: "--accent-ink",  category: "accent", type: "color", light: "#8c2414", dark: "#f5a88f" },

  /* ---- Cor: Semantic ---- */
  { name: "--ok",          category: "semantic", type: "color", light: "#2d6a3e", dark: "#7fb58e" },
  { name: "--ok-soft",     category: "semantic", type: "color", light: "#dbe8d8", dark: "#1c2d22" },
  { name: "--warn",        category: "semantic", type: "color", light: "#8a6d1a", dark: "#d5b86c" },
  { name: "--warn-soft",   category: "semantic", type: "color", light: "#f0e6c8", dark: "#2f2812" },
  { name: "--danger",      category: "semantic", type: "color", light: "#c8361d", dark: "#e5785e" },
  { name: "--danger-soft", category: "semantic", type: "color", light: "#f1ddd5", dark: "#3a231b" },
  { name: "--info",        category: "semantic", type: "color", light: "#2e5a8a", dark: "#8fafd5" },
  { name: "--info-soft",   category: "semantic", type: "color", light: "#d9e3ee", dark: "#172339" },

  /* ---- Effects (scrim, dot bg) ---- */
  { name: "--bg-dot",      category: "effect", type: "color", light: "rgba(26, 26, 26, 0.06)", dark: "rgba(237, 232, 220, 0.05)" },
  { name: "--scrim",       category: "effect", type: "color", light: "rgba(26, 26, 26, 0.5)",  dark: "rgba(0, 0, 0, 0.65)" },
  { name: "--scrim-heavy", category: "effect", type: "color", light: "rgba(26, 26, 26, 0.6)",  dark: "rgba(0, 0, 0, 0.8)" },

  /* ---- Scrollbar ---- */
  { name: "--sb-track-inset", category: "scrollbar", type: "color", light: "var(--bg-sunken)", dark: "var(--bg-sunken)" },
  { name: "--sb-thumb",       category: "scrollbar", type: "color", light: "#b8b1a2",          dark: "#3a3630" },
  { name: "--sb-thumb-hover", category: "scrollbar", type: "color", light: "var(--ink-soft)",  dark: "var(--ink-soft)" },
  { name: "--sb-thumb-active",category: "scrollbar", type: "color", light: "var(--accent)",    dark: "var(--accent)" },

  /* ---- Code editor (invariante) ---- */
  { name: "--code-bg",          category: "code", type: "color", light: "#1a1a1a", note: "Code surface — sempre escuro independente do tema" },
  { name: "--code-ink",         category: "code", type: "color", light: "#e8e3d6" },
  { name: "--code-ink-soft",    category: "code", type: "color", light: "#8a8577" },
  { name: "--code-rule",        category: "code", type: "color", light: "#4a453c" },
  { name: "--code-btn-bg",      category: "code", type: "color", light: "rgba(26, 26, 26, 0.6)" },
  { name: "--code-btn-bg-hover",category: "code", type: "color", light: "rgba(26, 26, 26, 0.8)" },

  /* ---- Tipografia: famílias ---- */
  { name: "--font-serif", category: "type", type: "fontFamily", light: '"Fraunces", Georgia, serif' },
  { name: "--font-mono",  category: "type", type: "fontFamily", light: '"JetBrains Mono", ui-monospace, monospace' },

  /* ---- Tipografia: escala ---- */
  { name: "--text-meta",    category: "type", type: "fontSize", light: "10px",                       note: "mono caps — overlines" },
  { name: "--text-micro",   category: "type", type: "fontSize", light: "11px",                       note: "status pills" },
  { name: "--text-xs",      category: "type", type: "fontSize", light: "13px" },
  { name: "--text-sm",      category: "type", type: "fontSize", light: "14px" },
  { name: "--text-md",      category: "type", type: "fontSize", light: "16px",                       note: "body default" },
  { name: "--text-lg",      category: "type", type: "fontSize", light: "21px" },
  { name: "--text-xl",      category: "type", type: "fontSize", light: "28px" },
  { name: "--text-2xl",     category: "type", type: "fontSize", light: "36px" },
  { name: "--text-3xl",     category: "type", type: "fontSize", light: "48px" },
  { name: "--text-display", category: "type", type: "fontSize", light: "clamp(48px, 7vw, 80px)",     note: "display fluido" },

  /* ---- Tipografia: line-heights ---- */
  { name: "--lh-meta",   category: "type", type: "lineHeight", light: "1.4" },
  { name: "--lh-micro",  category: "type", type: "lineHeight", light: "1.4" },
  { name: "--lh-xs",     category: "type", type: "lineHeight", light: "1.5" },
  { name: "--lh-sm",     category: "type", type: "lineHeight", light: "1.55" },
  { name: "--lh-md",     category: "type", type: "lineHeight", light: "1.65" },
  { name: "--lh-lg",     category: "type", type: "lineHeight", light: "1.45" },
  { name: "--lh-xl",     category: "type", type: "lineHeight", light: "1.3" },
  { name: "--lh-2xl",    category: "type", type: "lineHeight", light: "1.2" },
  { name: "--lh-3xl",    category: "type", type: "lineHeight", light: "1.1" },
  { name: "--lh-display",category: "type", type: "lineHeight", light: "0.95" },

  /* ---- Tipografia: tracking ---- */
  { name: "--tracking-tighter", category: "type", type: "letterSpacing", light: "-0.03em" },
  { name: "--tracking-tight",   category: "type", type: "letterSpacing", light: "-0.01em" },
  { name: "--tracking-normal",  category: "type", type: "letterSpacing", light: "0" },
  { name: "--tracking-wide",    category: "type", type: "letterSpacing", light: "0.1em" },
  { name: "--tracking-wider",   category: "type", type: "letterSpacing", light: "0.2em" },

  /* ---- Tipografia: measure ---- */
  { name: "--measure-narrow", category: "type", type: "dimension", light: "45ch" },
  { name: "--measure",        category: "type", type: "dimension", light: "65ch", note: "Body padrão" },
  { name: "--measure-wide",   category: "type", type: "dimension", light: "75ch" },

  /* ---- Spacing 8pt ---- */
  { name: "--space-1", category: "spacing", type: "dimension", light: "4px" },
  { name: "--space-2", category: "spacing", type: "dimension", light: "8px" },
  { name: "--space-3", category: "spacing", type: "dimension", light: "12px" },
  { name: "--space-4", category: "spacing", type: "dimension", light: "16px" },
  { name: "--space-5", category: "spacing", type: "dimension", light: "24px" },
  { name: "--space-6", category: "spacing", type: "dimension", light: "32px" },
  { name: "--space-7", category: "spacing", type: "dimension", light: "48px" },
  { name: "--space-8", category: "spacing", type: "dimension", light: "64px" },
  { name: "--space-9", category: "spacing", type: "dimension", light: "96px" },

  /* ---- Layout ---- */
  { name: "--sidebar-w",   category: "layout", type: "dimension", light: "260px" },
  { name: "--content-max", category: "layout", type: "dimension", light: "clamp(1200px, 70vw, 1600px)" },

  /* ---- Motion (expandido na fase 4) ---- */
  { name: "--ease",          category: "motion", type: "string",   light: "cubic-bezier(0.4, 0, 0.2, 1)",      note: "Default — in-out suave" },
  { name: "--ease-in",       category: "motion", type: "string",   light: "cubic-bezier(0.4, 0, 1, 1)",        note: "Acelera saindo" },
  { name: "--ease-out",      category: "motion", type: "string",   light: "cubic-bezier(0, 0, 0.2, 1)",        note: "Desacelera entrando" },
  { name: "--ease-in-out",   category: "motion", type: "string",   light: "cubic-bezier(0.4, 0, 0.2, 1)",      note: "Alias do default" },
  { name: "--ease-out-expo", category: "motion", type: "string",   light: "cubic-bezier(0.16, 1, 0.3, 1)",     note: "Dramatic — toasts, dialogs" },
  { name: "--ease-spring",   category: "motion", type: "string",   light: "cubic-bezier(0.34, 1.56, 0.64, 1)", note: "Leve overshoot — playful" },
  { name: "--dur-fast",      category: "motion", type: "duration", light: "120ms" },
  { name: "--dur",           category: "motion", type: "duration", light: "200ms" },
  { name: "--dur-slow",      category: "motion", type: "duration", light: "320ms" },
  { name: "--dur-xl",        category: "motion", type: "duration", light: "480ms",                              note: "Page transitions, scroll reveal" },

  /* ---- Radius (Foundations II — fase 9.1) ---- */
  { name: "--radius-none", category: "radius", type: "dimension", light: "0",      note: "Default editorial — ângulos retos" },
  { name: "--radius-sm",   category: "radius", type: "dimension", light: "2px",    note: "kbd, status pills" },
  { name: "--radius-md",   category: "radius", type: "dimension", light: "4px",    note: "Botões, badges" },
  { name: "--radius-lg",   category: "radius", type: "dimension", light: "8px",    note: "Cards, popovers" },
  { name: "--radius-full", category: "radius", type: "dimension", light: "9999px", note: "Avatar, switch, dot" },

  /* ---- Shadow (Foundations II — fase 9.1) ---- */
  { name: "--shadow-none", category: "shadow", type: "shadow", light: "none",                                                                       dark: "none" },
  { name: "--shadow-sm",   category: "shadow", type: "shadow", light: "0 1px 2px rgba(0, 0, 0, 0.04)",                                              dark: "0 1px 2px rgba(0, 0, 0, 0.4)" },
  { name: "--shadow-md",   category: "shadow", type: "shadow", light: "0 2px 6px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)",               dark: "0 2px 6px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.4)" },
  { name: "--shadow-lg",   category: "shadow", type: "shadow", light: "0 6px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",              dark: "0 6px 16px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.4)" },

  /* ---- Z-index (Foundations II — fase 9.1) ---- */
  { name: "--z-base",      category: "z-index", type: "number", light: "0" },
  { name: "--z-raised",    category: "z-index", type: "number", light: "10" },
  { name: "--z-dropdown",  category: "z-index", type: "number", light: "100" },
  { name: "--z-sticky",    category: "z-index", type: "number", light: "200" },
  { name: "--z-overlay",   category: "z-index", type: "number", light: "300" },
  { name: "--z-modal",     category: "z-index", type: "number", light: "400" },
  { name: "--z-popover",   category: "z-index", type: "number", light: "500" },
  { name: "--z-toast",     category: "z-index", type: "number", light: "600" },
  { name: "--z-palette",   category: "z-index", type: "number", light: "700" },
  { name: "--z-skip-link", category: "z-index", type: "number", light: "9999", note: "Sempre topo absoluto (a11y)" },

  /* ---- Breakpoints (Foundations II — fase 9.1) ---- */
  { name: "--bp-sm",  category: "breakpoint", type: "dimension", light: "480px",  note: "phone" },
  { name: "--bp-md",  category: "breakpoint", type: "dimension", light: "720px",  note: "tablet, phone landscape" },
  { name: "--bp-lg",  category: "breakpoint", type: "dimension", light: "960px",  note: "laptop pequeno" },
  { name: "--bp-xl",  category: "breakpoint", type: "dimension", light: "1280px", note: "desktop" },
  { name: "--bp-2xl", category: "breakpoint", type: "dimension", light: "1600px", note: "wide / 2K+" },

  /* ---- Opacity ---- */
  { name: "--opacity-5",  category: "opacity", type: "number", light: "0.05" },
  { name: "--opacity-10", category: "opacity", type: "number", light: "0.10" },
  { name: "--opacity-25", category: "opacity", type: "number", light: "0.25" },
  { name: "--opacity-50", category: "opacity", type: "number", light: "0.50" },
  { name: "--opacity-75", category: "opacity", type: "number", light: "0.75" },
  { name: "--opacity-90", category: "opacity", type: "number", light: "0.90" },

  /* ---- Aspect ratio ---- */
  { name: "--aspect-square",    category: "aspect", type: "ratio", light: "1 / 1" },
  { name: "--aspect-landscape", category: "aspect", type: "ratio", light: "16 / 9" },
  { name: "--aspect-portrait",  category: "aspect", type: "ratio", light: "3 / 4" },
  { name: "--aspect-ultrawide", category: "aspect", type: "ratio", light: "21 / 9" },
  { name: "--aspect-golden",    category: "aspect", type: "ratio", light: "1.618 / 1", note: "Proporção áurea" },

  /* ---- Density ---- */
  { name: "--density-pad-x", category: "density", type: "dimension", light: "var(--space-4)", note: "Default = comfortable" },
  { name: "--density-pad-y", category: "density", type: "dimension", light: "var(--space-3)" },
  { name: "--density-gap",   category: "density", type: "dimension", light: "var(--space-3)" },
  { name: "--density-text",  category: "density", type: "dimension", light: "var(--text-sm)" },
];

/* ================================================================
   Helpers — query e agrupamento
   ================================================================ */

export function tokensByCategory(): Record<TokenCategory, TokenDef[]> {
  const out = {} as Record<TokenCategory, TokenDef[]>;
  for (const cat of TOKEN_CATEGORIES) out[cat] = [];
  for (const tk of TOKENS) out[tk.category].push(tk);
  return out;
}

export function findToken(name: string): TokenDef | undefined {
  return TOKENS.find((t) => t.name === name);
}

/* ================================================================
   Serializers — usados pelo Studio (export) e pela página /tokens
   ================================================================ */

/** CSS — :root + opcionalmente :root[data-theme="dark"]. */
export function serializeCss(
  tokens: TokenDef[] = TOKENS,
  options: { theme?: "light" | "dark" | "both" } = {}
): string {
  const { theme = "both" } = options;
  const lines: string[] = [];

  if (theme === "light" || theme === "both") {
    lines.push(":root {");
    for (const tk of tokens) {
      lines.push(`  ${tk.name}: ${tk.light};`);
    }
    lines.push("}");
  }

  if (theme === "both" || theme === "dark") {
    const darkTokens = tokens.filter((t) => t.dark !== undefined);
    if (darkTokens.length > 0) {
      lines.push("");
      lines.push(`:root[data-theme="dark"] {`);
      for (const tk of darkTokens) {
        lines.push(`  ${tk.name}: ${tk.dark};`);
      }
      lines.push("}");
    }
  }

  return lines.join("\n") + "\n";
}

/** W3C Design Tokens Community Group — JSON. */
export function serializeJson(tokens: TokenDef[] = TOKENS): string {
  /* Estrutura DTCG: agrupa por categoria, cada token como
     { $value, $type, $description? }. Tema dark vai como
     "$extensions.dark" (proposta CSSWG ainda em discussão para
     modes — usamos o caminho mais aceito). */
  const root: any = {};
  for (const tk of tokens) {
    const cat = tk.category;
    if (!root[cat]) root[cat] = {};
    /* nome sem prefixo "--" pra ficar ergonômico */
    const key = tk.name.replace(/^--/, "");
    const node: any = {
      $value: tk.light,
      $type: tk.type,
    };
    if (tk.note) node.$description = tk.note;
    if (tk.dark !== undefined) {
      node.$extensions = { "atelier.dark": tk.dark };
    }
    root[cat][key] = node;
  }
  return JSON.stringify(root, null, 2) + "\n";
}

/** TypeScript — objeto tipado pronto pra import em apps consumidoras. */
export function serializeTs(tokens: TokenDef[] = TOKENS): string {
  const grouped: Record<string, [string, string, string?][]> = {};
  for (const tk of tokens) {
    const cat = tk.category;
    if (!grouped[cat]) grouped[cat] = [];
    const key = tk.name.replace(/^--/, "").replace(/-/g, "_");
    grouped[cat].push([key, tk.light, tk.dark]);
  }

  const lines: string[] = [
    "/* Atelier — design tokens (auto-gerado) */",
    "",
    "export const tokens = {",
  ];
  for (const cat of Object.keys(grouped)) {
    lines.push(`  ${jsKey(cat)}: {`);
    for (const [key, light, dark] of grouped[cat]) {
      const value = JSON.stringify(light);
      if (dark !== undefined) {
        lines.push(`    ${key}: { light: ${value}, dark: ${JSON.stringify(dark)} },`);
      } else {
        lines.push(`    ${key}: ${value},`);
      }
    }
    lines.push("  },");
  }
  lines.push("} as const;");
  lines.push("");
  lines.push("export type Tokens = typeof tokens;");
  return lines.join("\n") + "\n";
}

function jsKey(s: string): string {
  /* identifier-safe: kebab → snake, números/símbolos → quoted */
  if (/^[a-z][a-z0-9_]*$/i.test(s)) return s;
  return JSON.stringify(s);
}

/* ================================================================
   Download helpers — usam Blob + URL.createObjectURL (zero dep)
   ================================================================ */

export function downloadText(filename: string, contents: string, mime: string) {
  if (typeof window === "undefined") return;
  const blob = new Blob([contents], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ================================================================
   Parsers — extrair tokens de CSS / JSON DTCG (Roadmap · fase 7.2)
   ----------------------------------------------------------------
   Reverso do `serializeCss` / `serializeJson`. Aceita arquivo
   inteiro ou trecho — devolve um Record<token, value> + lista
   de avisos (tokens desconhecidos, sintaxe inválida).

   Decisão: parser caseiro, regex simples. Suficiente para os
   formatos que o próprio Studio gera (e para CSS escrito à mão
   que segue o padrão `--token: value;`). Não é um parser CSS
   completo — não tenta entender @media, calc(), nesting.
   ================================================================ */

export interface ParseResult {
  /** Map token → value resolvido. Só inclui tokens conhecidos
      (que existem em TOKENS) ou que comecem com `--`. */
  values: Record<string, string>;
  /** Avisos editoriais — token desconhecido, valor suspeito, etc. */
  warnings: string[];
  /** Erros fatais que impedem aplicação. */
  errors: string[];
}

const KNOWN_NAMES = new Set(TOKENS.map((t) => t.name));

/* CSS parser: pega todos `--token: value;` dentro de um bloco
   :root (com ou sem [data-theme="..."]) ou no arquivo inteiro. */
export function parseCss(input: string): ParseResult {
  const result: ParseResult = { values: {}, warnings: [], errors: [] };
  if (!input || typeof input !== "string") {
    result.errors.push("Conteúdo vazio ou não-string.");
    return result;
  }

  /* Remove comentários CSS pra simplificar regex */
  const cleaned = input.replace(/\/\*[\s\S]*?\*\//g, "");

  /* Pega todas as declarações --token: value; (ignora dentro de quê) */
  const decls = cleaned.matchAll(/(--[a-zA-Z][a-zA-Z0-9-]*)\s*:\s*([^;}]+)\s*[;}]/g);

  let count = 0;
  for (const match of decls) {
    const name = match[1].trim();
    const value = match[2].trim();
    if (!value) continue;
    result.values[name] = value;
    count += 1;
    if (!KNOWN_NAMES.has(name)) {
      result.warnings.push(`Token desconhecido: ${name}`);
    }
  }

  if (count === 0) {
    result.errors.push(
      "Nenhum token --* encontrado. O arquivo deveria conter declarações como `--ink: #1a1a1a;`."
    );
  }

  return result;
}

/* JSON DTCG parser: aceita o formato gerado por serializeJson()
   (categorias no top-level, tokens com $value/$type/$extensions). */
export function parseJson(input: string): ParseResult {
  const result: ParseResult = { values: {}, warnings: [], errors: [] };
  let parsed: any;
  try {
    parsed = JSON.parse(input);
  } catch (err) {
    result.errors.push(`JSON inválido: ${err instanceof Error ? err.message : String(err)}`);
    return result;
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    result.errors.push("JSON deve ser um objeto no top-level (categorias).");
    return result;
  }

  /* Caminha pelas categorias top-level → tokens */
  let count = 0;
  for (const [categoryKey, categoryValue] of Object.entries(parsed)) {
    if (!categoryValue || typeof categoryValue !== "object") continue;
    /* Aceita tanto formato DTCG ({tokens dentro da categoria})
       quanto flat ({"--ink": "#1a1a1a"}) */
    for (const [tokenKey, tokenValue] of Object.entries(categoryValue as any)) {
      if (typeof tokenValue === "string") {
        /* Formato flat */
        const name = tokenKey.startsWith("--") ? tokenKey : `--${tokenKey}`;
        result.values[name] = tokenValue;
        count += 1;
        if (!KNOWN_NAMES.has(name)) result.warnings.push(`Token desconhecido: ${name}`);
      } else if (tokenValue && typeof tokenValue === "object" && "$value" in (tokenValue as any)) {
        /* Formato DTCG */
        const name = tokenKey.startsWith("--") ? tokenKey : `--${tokenKey}`;
        const value = (tokenValue as any).$value;
        if (typeof value !== "string") {
          result.warnings.push(`Token ${name}: $value precisa ser string, recebido ${typeof value}`);
          continue;
        }
        result.values[name] = value;
        count += 1;
        if (!KNOWN_NAMES.has(name)) result.warnings.push(`Token desconhecido: ${name}`);
      }
    }
    /* Permite categoryKey usado pra info (warnings amistosos) */
    if (count === 0 && categoryKey === "$schema") continue;
  }

  if (count === 0) {
    result.errors.push(
      "Nenhum token reconhecido. JSON deve seguir formato DTCG (com $value) ou flat (chave: valor)."
    );
  }

  return result;
}

/* Auto-detecta o formato e roteia. */
export function parseTokens(input: string): ParseResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { values: {}, warnings: [], errors: ["Conteúdo vazio."] };
  }
  /* JSON começa com { ou [ */
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    return parseJson(trimmed);
  }
  return parseCss(trimmed);
}
