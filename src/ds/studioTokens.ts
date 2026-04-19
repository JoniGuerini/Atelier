/* ================================================================
   Studio Tokens — vocabulário do customizador.
   ----------------------------------------------------------------
   Define as opções de cada controle e como elas viram CSS vars.
   O Studio mantém um objeto `theme` em React state e gera o
   `style={{ ... }}` que envolve a coluna de preview.
   ================================================================ */

// ---------- Acento (cor primária) ----------
// Pares { accent, accent-soft, accent-ink }, cada um afinado para
// não brigar com o papel/tinta do Atelier.
export const ACCENT_PRESETS = [
  { id: "atelier", label: "Atelier red", accent: "#c8361d", accentSoft: "#f1ddd5", accentInk: "#8c2414" },
  { id: "indigo",  label: "Indigo",      accent: "#3b4a8a", accentSoft: "#dee2f0", accentInk: "#27325c" },
  { id: "emerald", label: "Emerald",     accent: "#2d6a3e", accentSoft: "#dbe8d8", accentInk: "#1d4628" },
  { id: "amber",   label: "Amber",       accent: "#a86b1f", accentSoft: "#f0e2c8", accentInk: "#724812" },
  { id: "plum",    label: "Plum",        accent: "#7a3a64", accentSoft: "#e9d6e0", accentInk: "#522744" },
  { id: "ink",     label: "Ink",         accent: "#1a1a1a", accentSoft: "#d8d4cc", accentInk: "#000000" },
];

// ---------- Base (paleta de superfícies/tintas) ----------
// Cada base define um conjunto coerente de bg/ink/rule.
// Light + Dark são gerados separadamente.
export const BASE_PRESETS = [
  {
    id: "neutral",
    label: "Neutral",
    light: {
      bg: "#f4f1ea", bgPanel: "#faf8f3", bgSunken: "#efeadc", bgInverse: "#1a1a1a",
      ink: "#1a1a1a", inkSoft: "#5a5754", inkFaint: "#9a958d", inkInverse: "#e8e3d6",
      rule: "#1a1a1a", ruleSoft: "#d9d3c4", ruleFaint: "#e6e0d0",
    },
    dark: {
      bg: "#121110", bgPanel: "#1a1917", bgSunken: "#0b0a09", bgInverse: "#ede8dc",
      ink: "#ede8dc", inkSoft: "#b8b1a2", inkFaint: "#75706a", inkInverse: "#1a1a1a",
      rule: "#ede8dc", ruleSoft: "#3a3631", ruleFaint: "#2a2724",
    },
  },
  {
    id: "warm",
    label: "Warm",
    light: {
      bg: "#f5ede0", bgPanel: "#fbf6ec", bgSunken: "#efe5d2", bgInverse: "#1f1a14",
      ink: "#1f1a14", inkSoft: "#5e5347", inkFaint: "#9d9080", inkInverse: "#f0e6d2",
      rule: "#1f1a14", ruleSoft: "#dccab0", ruleFaint: "#e8d8c2",
    },
    dark: {
      bg: "#161310", bgPanel: "#1d1916", bgSunken: "#0d0a08", bgInverse: "#f0e6d2",
      ink: "#f0e6d2", inkSoft: "#b9ad97", inkFaint: "#7a6f60", inkInverse: "#1f1a14",
      rule: "#f0e6d2", ruleSoft: "#3a322a", ruleFaint: "#2a241f",
    },
  },
  {
    id: "cool",
    label: "Cool",
    light: {
      bg: "#eef0f4", bgPanel: "#f6f7fa", bgSunken: "#e6e9ee", bgInverse: "#171a1f",
      ink: "#171a1f", inkSoft: "#535963", inkFaint: "#8d939d", inkInverse: "#e3e7ee",
      rule: "#171a1f", ruleSoft: "#c8cdd6", ruleFaint: "#dde1e8",
    },
    dark: {
      bg: "#0f1216", bgPanel: "#161a20", bgSunken: "#080a0d", bgInverse: "#e3e7ee",
      ink: "#e3e7ee", inkSoft: "#aab1bc", inkFaint: "#6a707a", inkInverse: "#171a1f",
      rule: "#e3e7ee", ruleSoft: "#2c323a", ruleFaint: "#1d2127",
    },
  },
];

// ---------- Tipografia ----------
// Pares serif + mono. Todas as fontes já vêm pré-carregadas pelo
// link do Google Fonts em index.html.
export const FONT_PRESETS = [
  {
    id: "editorial",
    label: "Editorial",
    serif: '"Fraunces", Georgia, serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
    description: "Default · Fraunces + JetBrains Mono",
  },
  {
    id: "modern",
    label: "Modern",
    serif: '"Inter", system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
    description: "Sans · Inter + JetBrains Mono",
  },
  {
    id: "classic",
    label: "Classic",
    serif: '"Playfair Display", Georgia, serif',
    mono: '"IBM Plex Mono", ui-monospace, monospace',
    description: "High contrast · Playfair Display + IBM Plex Mono",
  },
];

// ---------- Espaçamento ----------
// Multiplicador aplicado sobre a escala 8pt base.
export const SPACING_PRESETS = [
  { id: "compact", label: "Compact", multiplier: 0.75 },
  { id: "regular", label: "Regular", multiplier: 1 },
  { id: "loose",   label: "Loose",   multiplier: 1.25 },
];

const BASE_SPACES = [4, 8, 12, 16, 24, 32, 48, 64, 96];

export function spacingVars(multiplier: number): Record<string, string> {
  const out: Record<string, string> = {};
  BASE_SPACES.forEach((px: any, i: any) => {
    out[`--space-${i + 1}`] = `${Math.round(px * multiplier)}px`;
  });
  return out;
}

// ---------- Tema (light / dark) ----------
export const THEME_OPTIONS = [
  { id: "light", label: "Light" },
  { id: "dark",  label: "Dark"  },
];

// ---------- Advanced ----------
// Border-radius — explicitamente FORA do cânone editorial do Atelier.
export const RADIUS_RANGE = { min: 0, max: 16, step: 1, default: 0 };

// ---------- Theme defaults & helpers ----------
export const DEFAULT_THEME = {
  accent: "atelier",
  base: "neutral",
  font: "editorial",
  spacing: "regular",
  theme: "light",
  radius: 0,
};

function lookup<T extends { id: string }>(list: T[], id: string): T {
  return list.find((p: any) => p.id === id) || list[0];
}

// Converte o objeto `theme` em um style={{ ... }} pronto para
// envolver qualquer subárvore — todas as CSS vars são sobrescritas
// no escopo, preservando o resto do site intacto.
export function themeToStyle(theme: any): any {
  const accent = lookup(ACCENT_PRESETS, theme.accent);
  const base = lookup(BASE_PRESETS, theme.base);
  const font = lookup(FONT_PRESETS, theme.font);
  const spacing = lookup(SPACING_PRESETS, theme.spacing);
  const palette = base[theme.theme === "dark" ? "dark" : "light"];

  const style = {
    // Cromáticos (palette)
    "--bg": palette.bg,
    "--bg-panel": palette.bgPanel,
    "--bg-sunken": palette.bgSunken,
    "--bg-inverse": palette.bgInverse,
    "--ink": palette.ink,
    "--ink-soft": palette.inkSoft,
    "--ink-faint": palette.inkFaint,
    "--ink-inverse": palette.inkInverse,
    "--rule": palette.rule,
    "--rule-soft": palette.ruleSoft,
    "--rule-faint": palette.ruleFaint,
    // Acento
    "--accent": accent.accent,
    "--accent-soft": accent.accentSoft,
    "--accent-ink": accent.accentInk,
    // Tipografia
    "--font-serif": font.serif,
    "--font-mono": font.mono,
    // Densidade
    ...spacingVars(spacing.multiplier),
    // Advanced — injeta apenas se o usuário tocou
    ...(theme.radius > 0 ? { "--studio-radius": `${theme.radius}px` } : {}),
    // Pinta o background do scope para refletir o tema
    background: palette.bg,
    color: palette.ink,
  };

  return style;
}

// Gera o snippet CSS para o "Copy tokens" / "Download CSS"
export function themeToCss(theme: any): string {
  const style = themeToStyle(theme);
  const lines = [":root {"];
  Object.entries(style).forEach(([k, v]) => {
    if (k.startsWith("--")) lines.push(`  ${k}: ${v};`);
  });
  if (theme.radius > 0) {
    lines.push(`  /* Advanced — fora do cânone editorial */`);
    lines.push(`  --studio-radius: ${theme.radius}px;`);
  }
  lines.push("}");
  return lines.join("\n");
}
