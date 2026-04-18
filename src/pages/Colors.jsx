import { PageHead, Section, ThemeToggle } from "../ds/primitives.jsx";
import { useT } from "../lib/i18n.jsx";
import { useTheme } from "../lib/theme.jsx";
import { useCopy } from "../lib/useCopy.js";

/* Cada swatch lista os valores nominais do token em ambos os modos.
   O background do chip é pintado via var(--token), então ele muda
   automaticamente com o tema ativo — nada de sincronia manual. */
const SURFACE = [
  { key: "paper",   token: "--bg",         light: "#f4f1ea", dark: "#121110" },
  { key: "panel",   token: "--bg-panel",   light: "#faf8f3", dark: "#1a1917" },
  { key: "sunken",  token: "--bg-sunken",  light: "#efeadc", dark: "#0b0a09" },
  { key: "inverse", token: "--bg-inverse", light: "#1a1a1a", dark: "#ede8dc" },
];
const INK = [
  { key: "ink",        token: "--ink",          light: "#1a1a1a", dark: "#ede8dc" },
  { key: "inkSoft",    token: "--ink-soft",     light: "#5a5754", dark: "#b8b1a2" },
  { key: "inkFaint",   token: "--ink-faint",    light: "#9a958d", dark: "#75706a" },
  { key: "inkInverse", token: "--ink-inverse",  light: "#e8e3d6", dark: "#1a1917" },
];
const ACCENT = [
  { key: "accent",     token: "--accent",      light: "#c8361d", dark: "#e5785e" },
  { key: "accentInk",  token: "--accent-ink",  light: "#8c2414", dark: "#f5a88f" },
  { key: "accentSoft", token: "--accent-soft", light: "#f1ddd5", dark: "#3a231b" },
];
const SEMANTIC = [
  { key: "success",     token: "--ok",          light: "#2d6a3e", dark: "#7fb58e" },
  { key: "successSoft", token: "--ok-soft",     light: "#dbe8d8", dark: "#1c2d22" },
  { key: "warning",     token: "--warn",        light: "#8a6d1a", dark: "#d5b86c" },
  { key: "warningSoft", token: "--warn-soft",   light: "#f0e6c8", dark: "#2f2812" },
  { key: "danger",      token: "--danger",      light: "#c8361d", dark: "#e5785e" },
  { key: "dangerSoft",  token: "--danger-soft", light: "#f1ddd5", dark: "#3a231b" },
  { key: "info",        token: "--info",        light: "#2e5a8a", dark: "#8fafd5" },
  { key: "infoSoft",    token: "--info-soft",   light: "#d9e3ee", dark: "#172339" },
];

function CopyableValue({ children, value, label }) {
  const { copy, copied } = useCopy();
  const { t } = useT();
  const tip = copied ? t("common.copied") : label || t("common.copy");
  // O texto "✓ COPIADO/COPIED" do feedback é entregue via CSS var,
  // assim o ::after fica i18n-friendly sem depender do <html lang>.
  const style = { "--copied-label": `"✓ ${t("common.copied").toUpperCase()}"` };
  return (
    <button
      type="button"
      className={`swatch-copy ${copied ? "copied" : ""}`}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        copy(value);
      }}
      aria-label={tip}
      title={tip}
    >
      {children}
    </button>
  );
}

function Swatch({ name, token, light, dark, resolved }) {
  const { t } = useT();
  const activeHex = (resolved === "dark" ? dark : light).toUpperCase();
  const inactiveHex = (resolved === "dark" ? light : dark).toUpperCase();
  const tokenRef = `var(${token})`;
  return (
    <div className="swatch">
      <div
        className="swatch-chip with-ring"
        style={{ background: tokenRef }}
      />
      <div className="swatch-body">
        <div className="swatch-name">{name}</div>
        <CopyableValue
          value={tokenRef}
          label={t("pages.colors.copyToken", { token })}
        >
          <span className="swatch-token">{token}</span>
        </CopyableValue>
        <div className="swatch-hex">
          <CopyableValue
            value={activeHex}
            label={t("pages.colors.copyHex", { hex: activeHex })}
          >
            <span className="swatch-hex-active">{activeHex}</span>
          </CopyableValue>
          <CopyableValue
            value={inactiveHex}
            label={t("pages.colors.copyHex", { hex: inactiveHex })}
          >
            <span className="swatch-hex-alt">{inactiveHex}</span>
          </CopyableValue>
        </div>
      </div>
    </div>
  );
}

function SwatchGrid({ items, t, resolved }) {
  return (
    <div className="grid cols-4">
      {items.map((s) => (
        <Swatch
          key={s.token}
          name={t(`pages.colors.swatches.${s.key}`)}
          token={s.token}
          light={s.light}
          dark={s.dark}
          resolved={resolved}
        />
      ))}
    </div>
  );
}

export default function Colors() {
  const { t, tr } = useT();
  const { resolved } = useTheme();
  const sr = (k, f) => tr(`pages.colors.sections.${k}.${f}`);

  return (
    <>
      <PageHead
        lead={t("pages.colors.lead")}
        title={
          <>
            {tr("pages.colors.titleA")}
            <em>{t("pages.colors.titleB")}</em>
          </>
        }
        metaLabel={t("pages.colors.metaLabel")}
        meta={t("pages.colors.meta")}
        intro={tr("pages.colors.intro")}
      />

      <Section
        num={t("pages.colors.sections.theme.num")}
        title={<>{t("pages.colors.sections.theme.title")}</>}
        kicker={t("pages.colors.sections.theme.kicker")}
      >
        <p className="section-desc">{sr("theme", "desc")}</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            padding: "16px 20px",
            background: "var(--bg)",
            border: "1px solid var(--rule-soft)",
          }}
        >
          <ThemeToggle />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ink-faint)",
            }}
          >
            resolved = {resolved}
          </span>
        </div>
      </Section>

      <Section
        num={t("pages.colors.sections.surface.num")}
        title={<>{t("pages.colors.sections.surface.title")}</>}
        kicker={t("pages.colors.sections.surface.kicker")}
      >
        <p className="section-desc">{sr("surface", "desc")}</p>
        <SwatchGrid items={SURFACE} t={t} resolved={resolved} />
      </Section>

      <Section
        num={t("pages.colors.sections.ink.num")}
        title={<>{t("pages.colors.sections.ink.title")}</>}
        kicker={t("pages.colors.sections.ink.kicker")}
      >
        <p className="section-desc">{sr("ink", "desc")}</p>
        <SwatchGrid items={INK} t={t} resolved={resolved} />
      </Section>

      <Section
        num={t("pages.colors.sections.accent.num")}
        title={<>{t("pages.colors.sections.accent.title")}</>}
        kicker={t("pages.colors.sections.accent.kicker")}
      >
        <p className="section-desc">{sr("accent", "desc")}</p>
        <SwatchGrid items={ACCENT} t={t} resolved={resolved} />
      </Section>

      <Section
        num={t("pages.colors.sections.semantic.num")}
        title={<>{t("pages.colors.sections.semantic.title")}</>}
        kicker={t("pages.colors.sections.semantic.kicker")}
      >
        <p className="section-desc">{sr("semantic", "desc")}</p>
        <SwatchGrid items={SEMANTIC} t={t} resolved={resolved} />
      </Section>
    </>
  );
}
