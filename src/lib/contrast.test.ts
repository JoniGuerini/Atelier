import { describe, expect, it } from "vitest";
import { contrastRatio, parseColor, relativeLuminance, wcagLevel } from "./contrast.ts";

/* ================================================================
   contrast.ts — testes (Roadmap · fase 6.4)
   ----------------------------------------------------------------
   Smoke tests dos cálculos WCAG. Os valores de referência vêm de
   https://webaim.org/resources/contrastchecker/ — usamos o canon
   editorial do Atelier (ink #1a1a1a sobre bg #f4f1ea).
   ================================================================ */

describe("parseColor", () => {
  it("parses 6-digit hex", () => {
    expect(parseColor("#1a1a1a")).toEqual({ r: 26, g: 26, b: 26 });
  });

  it("parses 3-digit hex", () => {
    expect(parseColor("#fff")).toEqual({ r: 255, g: 255, b: 255 });
  });

  it("parses rgb()", () => {
    expect(parseColor("rgb(244, 241, 234)")).toEqual({ r: 244, g: 241, b: 234 });
  });

  it("parses rgba() ignoring alpha", () => {
    expect(parseColor("rgba(0, 0, 0, 0.5)")).toEqual({ r: 0, g: 0, b: 0 });
  });

  it("returns null for invalid input", () => {
    expect(parseColor("nope")).toBeNull();
    expect(parseColor("")).toBeNull();
  });
});

describe("relativeLuminance", () => {
  it("returns 0 for black", () => {
    expect(relativeLuminance({ r: 0, g: 0, b: 0 })).toBeCloseTo(0, 4);
  });

  it("returns 1 for white", () => {
    expect(relativeLuminance({ r: 255, g: 255, b: 255 })).toBeCloseTo(1, 4);
  });
});

describe("contrastRatio", () => {
  it("computes 21 for black-on-white", () => {
    expect(contrastRatio("#000", "#fff")).toBeCloseTo(21, 1);
  });

  it("computes 1 for same color", () => {
    expect(contrastRatio("#777", "#777")).toBeCloseTo(1, 4);
  });

  it("Atelier canon (ink on bg) passes AAA", () => {
    /* #1a1a1a sobre #f4f1ea — leitura editorial principal */
    const ratio = contrastRatio("#1a1a1a", "#f4f1ea");
    expect(ratio).toBeGreaterThan(7);
  });

  it("Atelier accent (#c8361d) sobre bg passa AA mas não AAA", () => {
    const ratio = contrastRatio("#c8361d", "#f4f1ea");
    expect(ratio).toBeGreaterThan(4.5);
    expect(ratio).toBeLessThan(7);
  });
});

describe("wcagLevel", () => {
  it("classifies thresholds correctly", () => {
    expect(wcagLevel(21)).toBe("AAA");
    expect(wcagLevel(7)).toBe("AAA");
    expect(wcagLevel(6.5)).toBe("AA");
    expect(wcagLevel(4.5)).toBe("AA");
    expect(wcagLevel(3.5)).toBe("AA-large");
    expect(wcagLevel(3)).toBe("AA-large");
    expect(wcagLevel(2.9)).toBe("fail");
    expect(wcagLevel(1)).toBe("fail");
  });
});
