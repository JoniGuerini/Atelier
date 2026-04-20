/* ================================================================
   Contrast — utilities WCAG (Roadmap · fase 6.3)
   ----------------------------------------------------------------
   Cálculo de luminância relativa e contraste WCAG 2.x. Usado pelo
   contrast checker do Studio e pela futura aba /accessibility.

   Referência: https://www.w3.org/TR/WCAG22/#contrast-minimum
     - Pass AA   ≥ 4.5 (texto normal)
     - Pass AAA  ≥ 7
     - Texto grande (≥18pt ou 14pt bold): AA ≥ 3, AAA ≥ 4.5
   ================================================================ */

export type WcagLevel = "AAA" | "AA" | "AA-large" | "fail";

interface RGB {
  r: number;
  g: number;
  b: number;
}

/* Aceita: #rgb, #rrggbb, rgb(...), rgba(...) — devolve RGB 0-255. */
export function parseColor(input: string): RGB | null {
  if (!input) return null;
  const s = input.trim().toLowerCase();

  /* hex */
  if (s.startsWith("#")) {
    const hex = s.slice(1);
    if (hex.length === 3) {
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16),
      };
    }
    if (hex.length === 6) {
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
      };
    }
    return null;
  }

  /* rgb()/rgba() */
  const m = s.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*[\d.]+\s*)?\)$/);
  if (m) {
    return {
      r: Math.round(parseFloat(m[1])),
      g: Math.round(parseFloat(m[2])),
      b: Math.round(parseFloat(m[3])),
    };
  }
  return null;
}

/** Luminância relativa WCAG (0..1). */
export function relativeLuminance({ r, g, b }: RGB): number {
  const f = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

/** Razão de contraste WCAG entre duas cores (1..21). */
export function contrastRatio(fg: string, bg: string): number {
  const A = parseColor(fg);
  const B = parseColor(bg);
  if (!A || !B) return 1;
  const la = relativeLuminance(A);
  const lb = relativeLuminance(B);
  const light = Math.max(la, lb);
  const dark = Math.min(la, lb);
  return (light + 0.05) / (dark + 0.05);
}

/** Classifica conforme thresholds WCAG 2.x. */
export function wcagLevel(ratio: number): WcagLevel {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "AA-large";
  return "fail";
}

/** Resolve `var(--token)` consultando `getComputedStyle(scope)`. */
export function resolveCssVar(varExpr: string, scope?: HTMLElement): string {
  if (typeof window === "undefined") return varExpr;
  const m = varExpr.match(/var\((--[^,)\s]+)/);
  if (!m) return varExpr;
  const root = scope ?? document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(m[1]).trim();
  return value || varExpr;
}
