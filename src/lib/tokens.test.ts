import { describe, expect, it } from "vitest";
import { parseCss, parseJson, parseTokens, serializeCss, serializeJson, TOKENS } from "./tokens.ts";

/* ================================================================
   tokens.ts — testes (Roadmap · fase 7.2)
   ----------------------------------------------------------------
   Round-trip serialize → parse → re-serialize deve ser idempotente
   pros tokens base do DS. Garantia de que o ciclo export/import do
   Studio não corrompe valores.
   ================================================================ */

describe("parseCss", () => {
  it("extrai tokens de um :root simples", () => {
    const css = `:root { --ink: #1a1a1a; --accent: #c8361d; }`;
    const r = parseCss(css);
    expect(r.errors).toEqual([]);
    expect(r.values["--ink"]).toBe("#1a1a1a");
    expect(r.values["--accent"]).toBe("#c8361d");
  });

  it("ignora comentários CSS", () => {
    const css = `:root {\n  /* primary brand */\n  --accent: #c8361d;\n}`;
    const r = parseCss(css);
    expect(r.values["--accent"]).toBe("#c8361d");
  });

  it("avisa sobre tokens desconhecidos", () => {
    const css = `:root { --custom-xyz: red; }`;
    const r = parseCss(css);
    expect(r.values["--custom-xyz"]).toBe("red");
    expect(r.warnings.some((w) => w.includes("--custom-xyz"))).toBe(true);
  });

  it("erro quando não acha tokens", () => {
    const r = parseCss("body { color: red; }");
    expect(r.errors.length).toBeGreaterThan(0);
  });
});

describe("parseJson", () => {
  it("aceita formato DTCG", () => {
    const json = JSON.stringify({
      color: {
        ink: { $value: "#1a1a1a", $type: "color" },
        accent: { $value: "#c8361d", $type: "color" },
      },
    });
    const r = parseJson(json);
    expect(r.errors).toEqual([]);
    expect(r.values["--ink"]).toBe("#1a1a1a");
    expect(r.values["--accent"]).toBe("#c8361d");
  });

  it("aceita formato flat", () => {
    const json = JSON.stringify({ palette: { "--ink": "#1a1a1a" } });
    const r = parseJson(json);
    expect(r.values["--ink"]).toBe("#1a1a1a");
  });

  it("erro em JSON inválido", () => {
    const r = parseJson("{not valid");
    expect(r.errors[0]).toMatch(/JSON inválido/);
  });
});

describe("parseTokens auto-detect", () => {
  it("rota CSS para parseCss", () => {
    const r = parseTokens(":root { --ink: #000; }");
    expect(r.values["--ink"]).toBe("#000");
  });

  it("rota JSON para parseJson", () => {
    const r = parseTokens('{"color": {"ink": {"$value": "#000", "$type": "color"}}}');
    expect(r.values["--ink"]).toBe("#000");
  });

  it("erro em conteúdo vazio", () => {
    expect(parseTokens("").errors[0]).toBe("Conteúdo vazio.");
  });
});

describe("round-trip", () => {
  it("CSS export → parse preserva os tokens", () => {
    /* Pega um subset pequeno do inventory */
    const subset = TOKENS.filter((t) => t.category === "accent");
    const css = serializeCss(subset, { theme: "light" });
    const r = parseCss(css);
    for (const tk of subset) {
      expect(r.values[tk.name]).toBe(tk.light);
    }
  });

  it("JSON export → parse preserva os tokens", () => {
    const subset = TOKENS.filter((t) => t.category === "spacing");
    const json = serializeJson(subset);
    const r = parseJson(json);
    for (const tk of subset) {
      expect(r.values[tk.name]).toBe(tk.light);
    }
  });
});
