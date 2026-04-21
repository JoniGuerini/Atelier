import { useState } from "react";
import { PageHead, Section, Button, Code } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";
import { emify } from "../lib/emify.tsx";
import { useCopy } from "../lib/useCopy.ts";
import { downloadText } from "../lib/tokens.ts";

/* ================================================================
   PressKit — /press-kit (About · 77, fase 12)
   ----------------------------------------------------------------
   Recursos editoriais para terceiros: logo, paleta hex copiável,
   boilerplates de descrição em três tamanhos, screenshots
   placeholders.
   ================================================================ */

/* Logo SVG — fiel ao wordmark renderizado em SidebarBrand/NavbarBrand:
   "Atelier" em Fraunces 300 + "." em italic accent, COLADOS (sem gap).
   Usa <tspan> dentro do mesmo <text> pra alinhar perfeito.

   Duas variantes hardcoded para uso standalone (sem dependência de
   CSS vars do Atelier). Cores derivadas direto das paletas oficiais
   light/dark do tema neutral. */

function buildLogoSvg(opts: { ink: string; accent: string }): string {
  /* viewBox dimensionado pro texto real (sem padding lateral):
       "Atelier." em Fraunces 48pt 300 weight, letter-spacing -0.02em
       largura útil ~150px, altura útil ~42px (sem descender)
       +4px de respiro top/bottom = 50px de altura total
     text-anchor="middle" + x="50%" centraliza o glifo no viewBox,
     evitando que o conteúdo fique colado no canto esquerdo do SVG.
     dx="-2" no tspan compensa o avanço natural do italic — cola
     o ponto na letra "r" igual ao wordmark inline da app. */
  return `<svg width="160" height="50" viewBox="0 0 160 50" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Atelier">
  <text x="80" y="42"
        text-anchor="middle"
        font-family="Fraunces, Georgia, serif"
        font-size="48"
        font-weight="300"
        letter-spacing="-0.02em"
        fill="${opts.ink}">Atelier<tspan font-style="italic" dx="-2" fill="${opts.accent}">.</tspan></text>
</svg>`;
}

const LOGO_LIGHT_SVG = buildLogoSvg({ ink: "#1a1a1a", accent: "#c8361d" });
const LOGO_DARK_SVG = buildLogoSvg({ ink: "#ede8dc", accent: "#e5785e" });

interface PaletteEntry {
  name: string;
  hex: string;
}

const PALETTE: PaletteEntry[] = [
  { name: "ink",         hex: "#1a1a1a" },
  { name: "bg",          hex: "#f4f1ea" },
  { name: "bg-panel",    hex: "#faf8f3" },
  { name: "bg-sunken",   hex: "#efeadc" },
  { name: "ink-soft",    hex: "#5a5754" },
  { name: "ink-faint",   hex: "#9a958d" },
  { name: "rule-soft",   hex: "#d9d3c4" },
  { name: "accent",      hex: "#c8361d" },
  { name: "accent-soft", hex: "#f1ddd5" },
  { name: "accent-ink",  hex: "#8c2414" },
];

function Swatch({ entry }: { entry: PaletteEntry }) {
  const { copy, copied } = useCopy();
  const [justCopied, setJustCopied] = useState(false);

  const onClick = async () => {
    const ok = await copy(entry.hex);
    if (ok) {
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 1400);
    }
  };

  return (
    <button
      type="button"
      className={`about-swatch ${justCopied && copied ? "is-copied" : ""}`}
      onClick={onClick}
      aria-label={`Copiar ${entry.hex}`}
      title={`Click pra copiar ${entry.hex}`}
    >
      <span className="about-swatch-preview" style={{ background: entry.hex }} />
      <span className="about-swatch-meta">
        <span className="about-swatch-name">{entry.name}</span>
        <span className="about-swatch-hex">
          {justCopied && copied ? "copiado" : entry.hex}
        </span>
      </span>
    </button>
  );
}

export default function PressKit() {
  const { t, tr, raw } = useT();
  const blurbs = (raw("pages.pressKit.blurbs.items") as { label: string; body: string }[]) || [];

  const downloadLogoLight = () => {
    downloadText("atelier-logo-light.svg", LOGO_LIGHT_SVG, "image/svg+xml");
  };
  const downloadLogoDark = () => {
    downloadText("atelier-logo-dark.svg", LOGO_DARK_SVG, "image/svg+xml");
  };
  const copyLogoSvg = async () => {
    try {
      await navigator.clipboard?.writeText(LOGO_LIGHT_SVG);
    } catch {
      /* ignore — fallback futuro */
    }
  };

  return (
    <>
      <PageHead
        lead={t("pages.pressKit.lead")}
        title={
          <>
            {tr("pages.pressKit.titleA")}
            <em>{t("pages.pressKit.titleB")}</em>
          </>
        }
        metaLabel={t("pages.pressKit.metaLabel")}
        meta={t("pages.pressKit.meta")}
        intro={tr("pages.pressKit.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.pressKit.logo.title")}</>}
        kicker={t("pages.pressKit.logo.kicker")}
      >
        <p className="section-desc">{tr("pages.pressKit.logo.desc")}</p>
        <div className="about-logo-pair">
          {/* Light variant */}
          <div className="about-logo-stage about-logo-stage--light">
            <span className="about-logo-stage-label">light</span>
            <div
              className="about-logo-svg"
              dangerouslySetInnerHTML={{ __html: LOGO_LIGHT_SVG }}
            />
            <Button onClick={downloadLogoLight} size="sm" variant="primary">
              {t("pages.pressKit.logo.downloadLight")}
            </Button>
          </div>
          {/* Dark variant */}
          <div className="about-logo-stage about-logo-stage--dark">
            <span className="about-logo-stage-label">dark</span>
            <div
              className="about-logo-svg"
              dangerouslySetInnerHTML={{ __html: LOGO_DARK_SVG }}
            />
            <Button onClick={downloadLogoDark} size="sm" variant="primary">
              {t("pages.pressKit.logo.downloadDark")}
            </Button>
          </div>
        </div>
        <div className="about-logo-extras">
          <Button onClick={copyLogoSvg} size="sm" variant="ghost">
            {t("pages.pressKit.logo.copy")}
          </Button>
          <span className="about-logo-extras-hint">{t("pages.pressKit.logo.extrasHint")}</span>
        </div>
      </Section>

      <Section
        num="ii"
        title={<>{t("pages.pressKit.palette.title")}</>}
        kicker={t("pages.pressKit.palette.kicker")}
      >
        <p className="section-desc">{t("pages.pressKit.palette.desc")}</p>
        <div className="about-palette">
          {PALETTE.map((p) => (
            <Swatch key={p.name} entry={p} />
          ))}
        </div>
      </Section>

      <Section
        num="iii"
        title={<>{t("pages.pressKit.blurbs.title")}</>}
        kicker={t("pages.pressKit.blurbs.kicker")}
      >
        <p className="section-desc">{t("pages.pressKit.blurbs.desc")}</p>
        <ul className="about-list">
          {blurbs.map((b, i) => (
            <li key={i}>
              <span className="about-list-label">{b.label}</span>
              <div className="about-list-body">{emify(b.body)}</div>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        num="iv"
        title={<>{t("pages.pressKit.contact.title")}</>}
        kicker={t("pages.pressKit.contact.kicker")}
      >
        <div className="about-prose">
          <p>{tr("pages.pressKit.contact.body")}</p>
        </div>
        <Code lang="ts">{`/* Atelier · Press contact (placeholder) */
press@atelier-ds.com
github.com/JoniGuerini/Atelier`}</Code>
      </Section>
    </>
  );
}
