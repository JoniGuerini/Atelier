import { describe, it, expect } from "vitest";
import {
  buildPageMeta,
  buildSiteJsonLd,
  SITE_NAME,
  SITE_DESCRIPTION,
} from "./seo.ts";

const FAKE_DICT = {
  nav: {
    items: {
      home: "Início",
      overview: "Visão geral",
      colors: "Cores",
      voice: "Voz & tom",
    },
    descriptions: {
      colors: "Sistema de cores editorial baseado em papel envelhecido.",
    },
  },
};

describe("seo.buildPageMeta", () => {
  it("home (rota home) usa template editorial com tagline", () => {
    const m = buildPageMeta({
      routeId: "home",
      locale: "pt-BR",
      dict: FAKE_DICT,
      origin: "https://atelier.dev",
    });
    expect(m.title).toContain(SITE_NAME);
    expect(m.title).toMatch(/—/);
    expect(m.description).toBe(SITE_DESCRIPTION["pt-BR"]);
    expect(m.canonical).toBe("https://atelier.dev/");
  });

  it("overview usa canonical com hash", () => {
    const m = buildPageMeta({
      routeId: "overview",
      locale: "pt-BR",
      dict: FAKE_DICT,
      origin: "https://atelier.dev",
    });
    expect(m.canonical).toBe("https://atelier.dev/#/overview");
  });

  it("rota com nome conhecido usa 'Atelier · X'", () => {
    const m = buildPageMeta({
      routeId: "colors",
      locale: "pt-BR",
      dict: FAKE_DICT,
      origin: "https://atelier.dev",
    });
    expect(m.title).toBe("Atelier · Cores");
  });

  it("description vem de nav.descriptions quando existe", () => {
    const m = buildPageMeta({
      routeId: "colors",
      locale: "pt-BR",
      dict: FAKE_DICT,
      origin: "https://atelier.dev",
    });
    expect(m.description).toBe(
      "Sistema de cores editorial baseado em papel envelhecido."
    );
  });

  it("description faz fallback pro SITE_DESCRIPTION quando rota não tem", () => {
    const m = buildPageMeta({
      routeId: "voice",
      locale: "pt-BR",
      dict: FAKE_DICT,
      origin: "https://atelier.dev",
    });
    expect(m.description).toBe(SITE_DESCRIPTION["pt-BR"]);
  });

  it("rota desconhecida cai pra título genérico do site", () => {
    const m = buildPageMeta({
      routeId: "rota-que-nao-existe",
      locale: "pt-BR",
      dict: FAKE_DICT,
      origin: "https://atelier.dev",
    });
    expect(m.title).toBe(SITE_NAME);
  });

  it("locale en gera ogLocale en_US e htmlLang en", () => {
    const m = buildPageMeta({
      routeId: "colors",
      locale: "en",
      dict: FAKE_DICT,
      origin: "https://atelier.dev",
    });
    expect(m.htmlLang).toBe("en");
    expect(m.ogLocale).toBe("en_US");
    expect(m.htmlDir).toBe("ltr");
  });

  it("alternates incluem todos os locales + x-default", () => {
    const m = buildPageMeta({
      routeId: "colors",
      locale: "pt-BR",
      dict: FAKE_DICT,
      origin: "https://atelier.dev",
      availableLocales: ["pt-BR", "en"],
    });
    const langs = m.alternates.map((a) => a.hreflang);
    expect(langs).toContain("pt-BR");
    expect(langs).toContain("en");
    expect(langs).toContain("x-default");
  });

  it("canonical é relativo quando origin vazio (dev)", () => {
    const m = buildPageMeta({
      routeId: "colors",
      locale: "pt-BR",
      dict: FAKE_DICT,
      origin: "",
    });
    expect(m.canonical).toBe("#/colors");
  });

  it("ogImage é absoluto quando origin definido", () => {
    const m = buildPageMeta({
      routeId: "colors",
      locale: "pt-BR",
      dict: FAKE_DICT,
      origin: "https://atelier.dev",
    });
    expect(m.ogImage).toBe("https://atelier.dev/og-image.svg");
  });

  it("themeColor tem light e dark hex válidos", () => {
    const m = buildPageMeta({
      routeId: "colors",
      locale: "pt-BR",
      dict: FAKE_DICT,
    });
    expect(m.themeColor.light).toMatch(/^#[0-9a-f]{6}$/i);
    expect(m.themeColor.dark).toMatch(/^#[0-9a-f]{6}$/i);
  });
});

describe("seo.buildSiteJsonLd", () => {
  it("retorna JSON válido com WebSite schema", () => {
    const json = buildSiteJsonLd("https://atelier.dev");
    const parsed = JSON.parse(json);
    expect(parsed["@context"]).toBe("https://schema.org");
    expect(parsed["@type"]).toBe("WebSite");
    expect(parsed.name).toBe(SITE_NAME);
    expect(parsed.inLanguage).toContain("pt-BR");
    expect(parsed.inLanguage).toContain("en");
  });

  it("license linka pra rota /license correta", () => {
    const json = buildSiteJsonLd("https://atelier.dev");
    const parsed = JSON.parse(json);
    expect(parsed.license).toBe("https://atelier.dev/#/license");
  });
});
