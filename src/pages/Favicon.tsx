import { PageHead, Section, Button, Code } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";
import { useCopy } from "../lib/useCopy.ts";
import { downloadText } from "../lib/tokens.ts";

/* ================================================================
   Favicon — /favicon (About · 78, fase 14.3)
   ----------------------------------------------------------------
   Documentacao da decisao editorial e tecnica do favicon do app.

   Ato editorial: o favicon e o menor monograma de uma marca. Cada
   pixel conta. Esta pagina cataloga as escolhas (wordmark abreviado
   "At." vs alternativas), a tecnica (SVG unico com <style> interno
   respondendo a prefers-color-scheme), e as armadilhas que pegamos
   no caminho (encoding latin-1 corrompendo o SVG, multiplos <link>
   ignorados pelo Chrome macOS).
   ================================================================ */

/* O SVG real do favicon — replicado aqui pra preview e download.
   Mantido em sync manual com /public/favicon.svg.
   Cores hardcoded da paleta neutral (light + dark via @media). */
const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Atelier">
  <style>
    .ink { fill: #1a1a1a; }
    .accent { fill: #c8361d; }
    @media (prefers-color-scheme: dark) {
      .ink { fill: #ede8dc; }
      .accent { fill: #e5785e; }
    }
  </style>
  <text x="16" y="25"
        text-anchor="middle"
        font-family="Fraunces, Georgia, serif"
        font-size="24"
        font-weight="400"
        letter-spacing="-0.04em"
        class="ink">At<tspan font-style="italic" dx="-0.5" class="accent">.</tspan></text>
</svg>`;

/* Variantes hardcoded (sem media query) para preview lado-a-lado
   na pagina — uma fixa em light, outra fixa em dark, pra mostrar
   o contraste sem depender do tema atual do leitor. */
const FAVICON_LIGHT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Atelier">
  <text x="16" y="25"
        text-anchor="middle"
        font-family="Fraunces, Georgia, serif"
        font-size="24"
        font-weight="400"
        letter-spacing="-0.04em"
        fill="#1a1a1a">At<tspan font-style="italic" dx="-0.5" fill="#c8361d">.</tspan></text>
</svg>`;

const FAVICON_DARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Atelier">
  <text x="16" y="25"
        text-anchor="middle"
        font-family="Fraunces, Georgia, serif"
        font-size="24"
        font-weight="400"
        letter-spacing="-0.04em"
        fill="#ede8dc">At<tspan font-style="italic" dx="-0.5" fill="#e5785e">.</tspan></text>
</svg>`;

/* Apple touch icon — 180x180 com background pleno + border radius
   estilo iOS. Cores fixas porque iOS nao respeita prefers-color-scheme
   em apple-touch-icon (estatico). Servimos a variante light por padrao
   (ja que e o que aparece no springboard claro do iOS), mas mostramos
   a dark abaixo pra documentacao — quem instala o PWA pode trocar
   manualmente o asset servido se quiser priorizar o tema escuro. */
const APPLE_TOUCH_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" role="img" aria-label="Atelier">
  <rect width="180" height="180" rx="36" fill="#f4f1ea"/>
  <text x="90" y="125"
        text-anchor="middle"
        font-family="Fraunces, Georgia, serif"
        font-size="110"
        font-weight="400"
        letter-spacing="-0.04em"
        fill="#1a1a1a">At<tspan font-style="italic" dx="-2" fill="#c8361d">.</tspan></text>
</svg>`;

const APPLE_TOUCH_DARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" role="img" aria-label="Atelier">
  <rect width="180" height="180" rx="36" fill="#1a1a1a"/>
  <text x="90" y="125"
        text-anchor="middle"
        font-family="Fraunces, Georgia, serif"
        font-size="110"
        font-weight="400"
        letter-spacing="-0.04em"
        fill="#ede8dc">At<tspan font-style="italic" dx="-2" fill="#e5785e">.</tspan></text>
</svg>`;

interface AlternativeIcon {
  glyph: string;
  label: string;
  pros: string;
  cons: string;
  chosen?: boolean;
}

const ALTERNATIVES: AlternativeIcon[] = [
  {
    glyph: "A",
    label: "Apenas A",
    pros: "Minimo absoluto, legivel em 8px",
    cons: "Confunde com qualquer marca: Adobe, Apple, Asana, Airbnb",
  },
  {
    glyph: "A.",
    label: "A + ponto",
    pros: "Carrega o ponto editorial do wordmark",
    cons: "Ainda generico — qualquer marca em A. usa o mesmo padrao",
  },
  {
    glyph: "At.",
    label: "At + ponto",
    pros: "Distintivo, le como abreviacao de 'Atelier', mantem identidade",
    cons: "Levemente mais denso em 16px (ainda legivel com font-weight 400)",
    chosen: true,
  },
  {
    glyph: "At",
    label: "At sem ponto",
    pros: "Limpo geometricamente",
    cons: "Perde o gesto editorial do ponto-final que define a marca",
  },
  {
    glyph: "△",
    label: "Simbolo abstrato",
    pros: "Escalavel, unico, sem dependencia tipografica",
    cons: "Nenhuma conexao visual com o wordmark Atelier do header",
  },
];

interface BrowserSupportRow {
  browser: string;
  version: string;
  status: "ok" | "partial" | "no";
  note?: string;
}

const BROWSER_SUPPORT: BrowserSupportRow[] = [
  { browser: "Chrome",         version: "79+",    status: "ok",      note: "jan/2020 — desde a estabilizacao do CSS in SVG" },
  { browser: "Edge (Chromium)", version: "79+",   status: "ok" },
  { browser: "Firefox",        version: "80+",    status: "ok",      note: "ago/2020" },
  { browser: "Safari",         version: "14+",    status: "ok",      note: "set/2020 — macOS Big Sur+" },
  { browser: "Safari iOS",     version: "14+",    status: "partial", note: "favicon.svg ok; apple-touch-icon usa variante estatica" },
  { browser: "IE 11",          version: "—",      status: "no",      note: "deprecated, sem suporte SVG favicon" },
];

interface SpecRow {
  attr: string;
  value: string;
  note: string;
}

const SPECS: SpecRow[] = [
  { attr: "viewBox",          value: "0 0 32 32",          note: "32x32 e a base canonica de favicons (escala bem ate 16px)" },
  { attr: "font-family",      value: "Fraunces, Georgia",  note: "Georgia como fallback porque ja vem nativo em todo OS" },
  { attr: "font-size",        value: "24px",               note: "ocupa ~75% da altura util — legivel em 16px de tab" },
  { attr: "font-weight",      value: "400",                note: "300 do wordmark fica fino demais em pixel pequeno" },
  { attr: "letter-spacing",   value: "-0.04em",            note: "ligeiramente apertado pra encaixar 'At' + ponto" },
  { attr: "text-anchor",      value: "middle",             note: "centraliza no viewBox independente de fallback de fonte" },
  { attr: "fill (light)",     value: "#1a1a1a / #c8361d",  note: "grafite + accent vermelho terra" },
  { attr: "fill (dark)",      value: "#ede8dc / #e5785e",  note: "creme papel + accent pessego suave" },
];

export default function FaviconPage() {
  const { t, tr, raw } = useT();
  const { copy, copied } = useCopy();

  const downloadFavicon = () => {
    downloadText("favicon.svg", FAVICON_SVG, "image/svg+xml");
  };
  const downloadAppleTouch = () => {
    downloadText("apple-touch-icon.svg", APPLE_TOUCH_SVG, "image/svg+xml");
  };
  const downloadAppleTouchDark = () => {
    downloadText("apple-touch-icon-dark.svg", APPLE_TOUCH_DARK_SVG, "image/svg+xml");
  };
  const copyFaviconSvg = () => {
    copy(FAVICON_SVG);
  };

  return (
    <>
      <PageHead
        lead={t("pages.favicon.lead")}
        title={
          <>
            {tr("pages.favicon.titleA")}
            <em>{t("pages.favicon.titleB")}</em>
          </>
        }
        metaLabel={t("pages.favicon.metaLabel")}
        meta={t("pages.favicon.meta")}
        intro={tr("pages.favicon.intro")}
      />

      {/* ----------------------------------------------------------------
          i. Decisao editorial — "At." vs alternativas
      ---------------------------------------------------------------- */}
      <Section
        num="i"
        title={t("pages.favicon.decision.title")}
        kicker={t("pages.favicon.decision.kicker")}
      >
        <p className="section-desc">{tr("pages.favicon.decision.desc")}</p>

        <div className="favicon-alternatives">
          {ALTERNATIVES.map((alt) => (
            <div
              key={alt.label}
              className={`favicon-alt ${alt.chosen ? "is-chosen" : ""}`}
            >
              <div className="favicon-alt-glyph" aria-hidden="true">
                {alt.glyph}
              </div>
              <div className="favicon-alt-meta">
                <h4 className="favicon-alt-label">
                  {alt.label}
                  {alt.chosen && (
                    <span className="favicon-alt-badge">{t("pages.favicon.decision.chosen")}</span>
                  )}
                </h4>
                <dl className="favicon-alt-pros">
                  <dt>{t("pages.favicon.decision.pros")}</dt>
                  <dd>{alt.pros}</dd>
                  <dt>{t("pages.favicon.decision.cons")}</dt>
                  <dd>{alt.cons}</dd>
                </dl>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ----------------------------------------------------------------
          ii. Showcase — variantes light/dark lado a lado
      ---------------------------------------------------------------- */}
      <Section
        num="ii"
        title={t("pages.favicon.showcase.title")}
        kicker={t("pages.favicon.showcase.kicker")}
      >
        <p className="section-desc">{tr("pages.favicon.showcase.desc")}</p>

        <div className="about-logo-pair">
          <div className="about-logo-stage about-logo-stage--light">
            <span className="about-logo-stage-label">light</span>
            <div className="favicon-stage-glyph">
              <div
                className="favicon-stage-svg favicon-stage-svg--lg"
                dangerouslySetInnerHTML={{ __html: FAVICON_LIGHT_SVG }}
              />
              <div
                className="favicon-stage-svg favicon-stage-svg--md"
                dangerouslySetInnerHTML={{ __html: FAVICON_LIGHT_SVG }}
              />
              <div
                className="favicon-stage-svg favicon-stage-svg--sm"
                dangerouslySetInnerHTML={{ __html: FAVICON_LIGHT_SVG }}
              />
            </div>
            <span className="favicon-stage-caption">128 / 32 / 16 px</span>
          </div>

          <div className="about-logo-stage about-logo-stage--dark">
            <span className="about-logo-stage-label">dark</span>
            <div className="favicon-stage-glyph">
              <div
                className="favicon-stage-svg favicon-stage-svg--lg"
                dangerouslySetInnerHTML={{ __html: FAVICON_DARK_SVG }}
              />
              <div
                className="favicon-stage-svg favicon-stage-svg--md"
                dangerouslySetInnerHTML={{ __html: FAVICON_DARK_SVG }}
              />
              <div
                className="favicon-stage-svg favicon-stage-svg--sm"
                dangerouslySetInnerHTML={{ __html: FAVICON_DARK_SVG }}
              />
            </div>
            <span className="favicon-stage-caption">128 / 32 / 16 px</span>
          </div>
        </div>

        <div className="about-logo-extras">
          <Button onClick={downloadFavicon} size="sm" variant="primary">
            {t("pages.favicon.showcase.download")}
          </Button>
          <Button onClick={copyFaviconSvg} size="sm" variant="ghost">
            {copied ? t("pages.favicon.showcase.copied") : t("pages.favicon.showcase.copy")}
          </Button>
        </div>
      </Section>

      {/* ----------------------------------------------------------------
          iii. Theme-aware — como o SVG responde ao SO
      ---------------------------------------------------------------- */}
      <Section
        num="iii"
        title={t("pages.favicon.themeAware.title")}
        kicker={t("pages.favicon.themeAware.kicker")}
      >
        <p className="section-desc">{tr("pages.favicon.themeAware.desc")}</p>

        <Code lang="jsx">{FAVICON_SVG}</Code>

        <p className="section-desc" style={{ marginTop: "var(--space-5)" }}>
          {tr("pages.favicon.themeAware.note")}
        </p>
      </Section>

      {/* ----------------------------------------------------------------
          iv. Especificacoes tecnicas
      ---------------------------------------------------------------- */}
      <Section
        num="iv"
        title={t("pages.favicon.specs.title")}
        kicker={t("pages.favicon.specs.kicker")}
      >
        <p className="section-desc">{tr("pages.favicon.specs.desc")}</p>

        <div className="ds-table-wrap">
          <table className="ds-table">
            <thead>
              <tr>
                <th>{t("pages.favicon.specs.attr")}</th>
                <th>{t("pages.favicon.specs.value")}</th>
                <th>{t("pages.favicon.specs.rationale")}</th>
              </tr>
            </thead>
            <tbody>
              {SPECS.map((row) => (
                <tr key={row.attr}>
                  <td><code>{row.attr}</code></td>
                  <td><code>{row.value}</code></td>
                  <td>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ----------------------------------------------------------------
          v. Apple touch icon + manifest
      ---------------------------------------------------------------- */}
      <Section
        num="v"
        title={t("pages.favicon.apple.title")}
        kicker={t("pages.favicon.apple.kicker")}
      >
        <p className="section-desc">{tr("pages.favicon.apple.desc")}</p>

        <div className="about-logo-pair">
          <div className="about-logo-stage about-logo-stage--light">
            <span className="about-logo-stage-label">light springboard</span>
            <div
              className="favicon-apple-svg"
              dangerouslySetInnerHTML={{ __html: APPLE_TOUCH_SVG }}
            />
            <span className="favicon-stage-caption">180 x 180 px · iOS light mode</span>
            <Button onClick={downloadAppleTouch} size="sm" variant="primary">
              {t("pages.favicon.apple.downloadLight")}
            </Button>
          </div>

          <div className="about-logo-stage about-logo-stage--dark">
            <span className="about-logo-stage-label">dark springboard</span>
            <div
              className="favicon-apple-svg"
              dangerouslySetInnerHTML={{ __html: APPLE_TOUCH_DARK_SVG }}
            />
            <span className="favicon-stage-caption">180 x 180 px · iOS dark mode</span>
            <Button onClick={downloadAppleTouchDark} size="sm" variant="primary">
              {t("pages.favicon.apple.downloadDark")}
            </Button>
          </div>
        </div>

        <div className="favicon-manifest-card">
          <h4 className="favicon-manifest-title">{t("pages.favicon.apple.manifestTitle")}</h4>
          <p className="favicon-manifest-desc">{tr("pages.favicon.apple.manifestDesc")}</p>
          <ul className="pattern-bullets">
            {((raw("pages.favicon.apple.manifestPoints") as string[]) || []).map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ----------------------------------------------------------------
          vi. Armadilhas — encoding, multiplos links, cache
      ---------------------------------------------------------------- */}
      <Section
        num="vi"
        title={t("pages.favicon.gotchas.title")}
        kicker={t("pages.favicon.gotchas.kicker")}
      >
        <p className="section-desc">{tr("pages.favicon.gotchas.desc")}</p>

        <ul className="pattern-bullets pattern-bullets--narrative">
          {((raw("pages.favicon.gotchas.items") as { title: string; body: string }[]) || []).map((item, i) => (
            <li key={i}>
              <strong>{item.title}.</strong> {item.body}
            </li>
          ))}
        </ul>
      </Section>

      {/* ----------------------------------------------------------------
          vii. Suporte a browsers
      ---------------------------------------------------------------- */}
      <Section
        num="vii"
        title={t("pages.favicon.browsers.title")}
        kicker={t("pages.favicon.browsers.kicker")}
      >
        <p className="section-desc">{tr("pages.favicon.browsers.desc")}</p>

        <div className="ds-table-wrap">
          <table className="ds-table">
            <thead>
              <tr>
                <th>{t("pages.favicon.browsers.browser")}</th>
                <th>{t("pages.favicon.browsers.version")}</th>
                <th>{t("pages.favicon.browsers.status")}</th>
                <th>{t("pages.favicon.browsers.note")}</th>
              </tr>
            </thead>
            <tbody>
              {BROWSER_SUPPORT.map((row) => (
                <tr key={row.browser}>
                  <td>{row.browser}</td>
                  <td><code>{row.version}</code></td>
                  <td>
                    <span className={`favicon-support favicon-support--${row.status}`}>
                      {t(`pages.favicon.browsers.statusLabels.${row.status}`)}
                    </span>
                  </td>
                  <td>{row.note || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ----------------------------------------------------------------
          viii. Como reusar
      ---------------------------------------------------------------- */}
      <Section
        num="viii"
        title={t("pages.favicon.reuse.title")}
        kicker={t("pages.favicon.reuse.kicker")}
      >
        <p className="section-desc">{tr("pages.favicon.reuse.desc")}</p>

        <Code lang="jsx">{`<!-- index.html -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
<link rel="manifest" href="/manifest.webmanifest" />
<link rel="mask-icon" href="/favicon.svg" color="#c8361d" />`}</Code>

        <p className="section-desc" style={{ marginTop: "var(--space-5)" }}>
          {tr("pages.favicon.reuse.note")}
        </p>
      </Section>
    </>
  );
}
