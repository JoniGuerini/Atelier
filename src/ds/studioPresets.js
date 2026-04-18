import {
  ACCENT_PRESETS,
  BASE_PRESETS,
  FONT_PRESETS,
  SPACING_PRESETS,
  THEME_OPTIONS,
} from "./studioTokens.js";

/* ================================================================
   Studio Presets — combinações editoriais prontas.
   Cada preset é um objeto theme completo.
   ================================================================ */

export const STUDIO_PRESETS = [
  {
    id: "editorial",
    label: "Editorial Classic",
    description: "O Atelier como nasceu — papel, tinta, vermelho tijolo.",
    theme: {
      accent: "atelier",
      base: "neutral",
      font: "editorial",
      spacing: "regular",
      theme: "light",
      radius: 0,
    },
  },
  {
    id: "magazine",
    label: "Magazine Bold",
    description: "Sans grandes, contraste alto, mais ar entre as colunas.",
    theme: {
      accent: "ink",
      base: "cool",
      font: "modern",
      spacing: "loose",
      theme: "light",
      radius: 0,
    },
  },
  {
    id: "manuscript",
    label: "Manuscript",
    description: "Serif clássica, paleta quente, escala compacta.",
    theme: {
      accent: "amber",
      base: "warm",
      font: "classic",
      spacing: "compact",
      theme: "light",
      radius: 0,
    },
  },
  {
    id: "midnight",
    label: "Midnight",
    description: "O Atelier em modo escuro — mesma alma, polaridade invertida.",
    theme: {
      accent: "atelier",
      base: "neutral",
      font: "editorial",
      spacing: "regular",
      theme: "dark",
      radius: 0,
    },
  },
];

function pick(list) {
  return list[Math.floor(Math.random() * list.length)].id;
}

export function shuffleTheme(prev = {}) {
  return {
    accent: pick(ACCENT_PRESETS),
    base: pick(BASE_PRESETS),
    font: pick(FONT_PRESETS),
    spacing: pick(SPACING_PRESETS),
    theme: pick(THEME_OPTIONS),
    radius: prev.radius ?? 0, // shuffle não mexe em radius (advanced)
  };
}
