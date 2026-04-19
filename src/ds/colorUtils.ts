/* ================================================================
   colorUtils — conversões hex / RGB / HSL / HSV em JS puro.
   ----------------------------------------------------------------
   Sem libs. Usadas pelo ColorPicker e podem ser reaproveitadas
   por temas/Studio futuros. Tudo trabalha no espaço 8-bit (0-255
   pra RGB, 0-360/0-100/0-100 pra HSL/HSV).
   ================================================================ */

export interface RGB { r: number; g: number; b: number; a?: number }
export interface HSL { h: number; s: number; l: number; a?: number }
export interface HSV { h: number; s: number; v: number; a?: number }

/* ---------- hex ↔ rgb ---------- */
export function hexToRgb(hex: string): RGB | null {
  let h = hex.trim().replace(/^#/, "");
  if (![3, 4, 6, 8].includes(h.length)) return null;
  if (h.length === 3 || h.length === 4) {
    h = h.split("").map((c) => c + c).join("");
  }
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  if ([r, g, b].some(Number.isNaN)) return null;
  const out: RGB = { r, g, b };
  if (h.length === 8) {
    const a = parseInt(h.slice(6, 8), 16) / 255;
    if (!Number.isNaN(a)) out.a = a;
  }
  return out;
}

const pad2 = (n: number) => Math.max(0, Math.min(255, Math.round(n)))
  .toString(16).padStart(2, "0");

export function rgbToHex({ r, g, b, a }: RGB): string {
  const base = `#${pad2(r)}${pad2(g)}${pad2(b)}`;
  if (a == null || a === 1) return base;
  const aHex = pad2(Math.round(a * 255));
  return `${base}${aHex}`;
}

/* ---------- rgb ↔ hsl ---------- */
export function rgbToHsl({ r, g, b, a }: RGB): HSL {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn: h = (gn - bn) / d + (gn < bn ? 6 : 0); break;
      case gn: h = (bn - rn) / d + 2; break;
      case bn: h = (rn - gn) / d + 4; break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
    ...(a != null ? { a } : {}),
  };
}

export function hslToRgb({ h, s, l, a }: HSL): RGB {
  const hn = (((h % 360) + 360) % 360) / 360;
  const sn = Math.max(0, Math.min(100, s)) / 100;
  const ln = Math.max(0, Math.min(100, l)) / 100;
  let r: number, g: number, b: number;
  if (sn === 0) {
    r = g = b = ln;
  } else {
    const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
    const p = 2 * ln - q;
    const hueToRgb = (t: number) => {
      let tt = t;
      if (tt < 0) tt += 1;
      if (tt > 1) tt -= 1;
      if (tt < 1 / 6) return p + (q - p) * 6 * tt;
      if (tt < 1 / 2) return q;
      if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
      return p;
    };
    r = hueToRgb(hn + 1 / 3);
    g = hueToRgb(hn);
    b = hueToRgb(hn - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    ...(a != null ? { a } : {}),
  };
}

/* ---------- rgb ↔ hsv (usado no plane do picker) ---------- */
export function rgbToHsv({ r, g, b, a }: RGB): HSV {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    switch (max) {
      case rn: h = (gn - bn) / d + (gn < bn ? 6 : 0); break;
      case gn: h = (bn - rn) / d + 2; break;
      case bn: h = (rn - gn) / d + 4; break;
    }
    h /= 6;
  }
  const s = max === 0 ? 0 : d / max;
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(max * 100),
    ...(a != null ? { a } : {}),
  };
}

export function hsvToRgb({ h, s, v, a }: HSV): RGB {
  const hn = (((h % 360) + 360) % 360) / 60;
  const sn = Math.max(0, Math.min(100, s)) / 100;
  const vn = Math.max(0, Math.min(100, v)) / 100;
  const i = Math.floor(hn);
  const f = hn - i;
  const p = vn * (1 - sn);
  const q = vn * (1 - sn * f);
  const t = vn * (1 - sn * (1 - f));
  let r = 0, g = 0, b = 0;
  switch (i % 6) {
    case 0: r = vn; g = t; b = p; break;
    case 1: r = q; g = vn; b = p; break;
    case 2: r = p; g = vn; b = t; break;
    case 3: r = p; g = q; b = vn; break;
    case 4: r = t; g = p; b = vn; break;
    case 5: r = vn; g = p; b = q; break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    ...(a != null ? { a } : {}),
  };
}

/* ---------- atalhos ---------- */
export const hexToHsv = (hex: string): HSV | null => {
  const rgb = hexToRgb(hex);
  return rgb ? rgbToHsv(rgb) : null;
};
export const hsvToHex = (hsv: HSV): string => rgbToHex(hsvToRgb(hsv));
export const hexToHsl = (hex: string): HSL | null => {
  const rgb = hexToRgb(hex);
  return rgb ? rgbToHsl(rgb) : null;
};
export const hslToHex = (hsl: HSL): string => rgbToHex(hslToRgb(hsl));
