import { useEffect, useMemo, useState } from "react";
import {
  PageHead,
  Button,
  Badge,
  Field,
  Input,
  CopyButton,
} from "../ds/primitives.jsx";
import { Card, CardKicker, CardTitle, CardBody, CardFooter } from "../ds/Card.jsx";
import { Alert } from "../ds/Alert.jsx";
import { useT } from "../lib/i18n.jsx";
import {
  ACCENT_PRESETS,
  BASE_PRESETS,
  FONT_PRESETS,
  SPACING_PRESETS,
  THEME_OPTIONS,
  RADIUS_RANGE,
  DEFAULT_THEME,
  themeToStyle,
  themeToCss,
} from "../ds/studioTokens.js";
import { STUDIO_PRESETS, shuffleTheme } from "../ds/studioPresets.js";

/* ================================================================
   Create — Studio do Atelier (refatorado).
   ----------------------------------------------------------------
   Layout:
     [ Painel sticky 280px ] [ Trilho de blocos com scroll horizontal ]

   Painel: sem tabs. Cada controle é um "card" compacto que abre
   inline as opções (via <details>). Os blocos do preview ficam em
   linha horizontal com overflow-x: auto, igual o shadcn/ui Create —
   o usuário rola para o lado sem perder a referência dos controles.
   ================================================================ */

const STORAGE_KEY = "atelier.studioTheme";

function readInitial() {
  if (typeof window === "undefined") return DEFAULT_THEME;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...DEFAULT_THEME, ...JSON.parse(saved) };
  } catch {
    /* ignore */
  }
  return DEFAULT_THEME;
}

export default function Create() {
  const { t, tr } = useT();
  const [theme, setTheme] = useState(readInitial);
  const [exportOpen, setExportOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
    } catch {
      /* ignore */
    }
  }, [theme]);

  const update = (key) => (value) => setTheme((p) => ({ ...p, [key]: value }));
  const reset = () => setTheme(DEFAULT_THEME);
  const shuffle = () => setTheme((p) => shuffleTheme(p));

  const previewStyle = useMemo(() => themeToStyle(theme), [theme]);
  const css = useMemo(() => themeToCss(theme), [theme]);

  // Resolve labels do estado atual para mostrar nos cards do painel
  const accentLabel =
    ACCENT_PRESETS.find((p) => p.id === theme.accent)?.label || "—";
  const baseLabel =
    BASE_PRESETS.find((p) => p.id === theme.base)?.label || "—";
  const fontPreset = FONT_PRESETS.find((p) => p.id === theme.font);
  const fontLabel = fontPreset?.label || "—";
  const spacingLabel =
    SPACING_PRESETS.find((p) => p.id === theme.spacing)?.label || "—";
  const themeLabel =
    theme.theme === "dark"
      ? t("pages.create.controls.themeDark")
      : t("pages.create.controls.themeLight");

  const activePreset = STUDIO_PRESETS.find(
    (p) =>
      p.theme.accent === theme.accent &&
      p.theme.base === theme.base &&
      p.theme.font === theme.font &&
      p.theme.spacing === theme.spacing &&
      p.theme.theme === theme.theme
  );

  return (
    <>
      <PageHead
        lead={t("pages.create.lead")}
        title={
          <>
            {tr("pages.create.titleA")}
            <em>{t("pages.create.titleB")}</em>
          </>
        }
        metaLabel={t("pages.create.metaLabel")}
        meta={t("pages.create.meta")}
        intro={tr("pages.create.intro")}
      />

      <div className="studio">
        {/* ========== Painel de controles ========== */}
        <aside className="studio-panel">
          <ControlCard
            label={t("pages.create.controls.preset")}
            value={activePreset?.label || t("pages.create.controls.custom")}
            iconChar="✦"
          >
            <div className="studio-options">
              {STUDIO_PRESETS.map((p) => {
                const active = activePreset?.id === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    className={`studio-option ${active ? "active" : ""}`}
                    onClick={() =>
                      setTheme({ ...DEFAULT_THEME, ...p.theme })
                    }
                  >
                    <span className="studio-option-label">{p.label}</span>
                    <span className="studio-option-desc">{p.description}</span>
                  </button>
                );
              })}
            </div>
          </ControlCard>

          <ControlCard
            label={t("pages.create.controls.theme")}
            value={themeLabel}
            iconChar={theme.theme === "dark" ? "◐" : "○"}
          >
            <Segmented
              options={THEME_OPTIONS.map((o) => ({
                id: o.id,
                label:
                  o.id === "dark"
                    ? t("pages.create.controls.themeDark")
                    : t("pages.create.controls.themeLight"),
              }))}
              value={theme.theme}
              onChange={update("theme")}
            />
          </ControlCard>

          <ControlCard
            label={t("pages.create.controls.accent")}
            value={accentLabel}
            iconColor={
              ACCENT_PRESETS.find((p) => p.id === theme.accent)?.accent
            }
          >
            <Swatches
              options={ACCENT_PRESETS}
              value={theme.accent}
              onChange={update("accent")}
            />
          </ControlCard>

          <ControlCard
            label={t("pages.create.controls.base")}
            value={baseLabel}
            iconChar="▢"
          >
            <Segmented
              options={BASE_PRESETS.map((o) => ({
                id: o.id,
                label: o.label,
              }))}
              value={theme.base}
              onChange={update("base")}
            />
          </ControlCard>

          <ControlCard
            label={t("pages.create.controls.font")}
            value={fontLabel}
            iconChar="Aa"
            iconStyle={fontPreset ? { fontFamily: fontPreset.serif } : undefined}
          >
            <FontList
              options={FONT_PRESETS}
              value={theme.font}
              onChange={update("font")}
            />
          </ControlCard>

          <ControlCard
            label={t("pages.create.controls.spacing")}
            value={spacingLabel}
            iconChar="↔"
          >
            <Segmented
              options={SPACING_PRESETS.map((o) => ({
                id: o.id,
                label: o.label,
              }))}
              value={theme.spacing}
              onChange={update("spacing")}
            />
          </ControlCard>

          <ControlCard
            label={t("pages.create.controls.advanced")}
            value={
              theme.radius > 0
                ? `${theme.radius}px`
                : t("pages.create.controls.offCanon")
            }
            iconChar="⚙"
            tone={theme.radius > 0 ? "warn" : undefined}
          >
            <p className="studio-warn-note">
              {tr("pages.create.advanced.warnBody")}
            </p>
            <div className="studio-range-row">
              <span className="studio-range-label">
                {t("pages.create.advanced.radius")}
              </span>
              <input
                type="range"
                className="studio-range"
                min={RADIUS_RANGE.min}
                max={RADIUS_RANGE.max}
                step={RADIUS_RANGE.step}
                value={theme.radius}
                onChange={(e) => update("radius")(Number(e.target.value))}
              />
              <span className="studio-range-value">{theme.radius}px</span>
            </div>
          </ControlCard>

          <div className="studio-actions">
            <Button onClick={shuffle} size="sm">
              {t("pages.create.actions.shuffle")}
            </Button>
            <Button onClick={reset} variant="ghost" size="sm">
              {t("pages.create.actions.reset")}
            </Button>
            <Button
              onClick={() => setExportOpen((v) => !v)}
              variant="primary"
              size="sm"
            >
              {exportOpen
                ? t("pages.create.actions.hideExport")
                : t("pages.create.actions.export")}
            </Button>
          </div>

          {exportOpen && (
            <div className="studio-export">
              <p className="studio-export-intro">
                {tr("pages.create.export.intro")}
              </p>
              <pre className="studio-export-code">{css}</pre>
              <div className="studio-export-actions">
                <CopyButton
                  text={css}
                  label={t("pages.create.export.copy")}
                  copiedLabel={t("pages.create.export.copied")}
                />
                <Button
                  onClick={() => downloadCss(css)}
                  variant="ghost"
                  size="sm"
                >
                  {t("pages.create.export.download")}
                </Button>
              </div>
            </div>
          )}
        </aside>

        {/* ========== Trilho de blocos (horizontal scroll) ========== */}
        <div className="studio-rail-wrap">
          <div className="studio-rail" style={previewStyle} data-studio-scope>
            {/* Bloco 1 — Tipografia */}
            <PreviewBlock
              kicker={t("pages.create.preview.typeKicker")}
              title={t("pages.create.preview.typeTitle")}
              wide
            >
              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 44,
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  marginBottom: "var(--space-3)",
                  color: "var(--ink)",
                }}
              >
                {t("pages.create.preview.headlineA")}{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    color: "var(--accent)",
                  }}
                >
                  {t("pages.create.preview.headlineB")}
                </em>
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "var(--ink-soft)",
                }}
              >
                {t("pages.create.preview.body")}
              </p>
              <div
                style={{
                  marginTop: "var(--space-4)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--ink-faint)",
                }}
              >
                {t("pages.create.preview.typeSpec")}
              </div>
            </PreviewBlock>

            {/* Bloco 2 — Card editorial */}
            <PreviewBlock
              kicker={t("pages.create.preview.card1Kicker")}
              title={t("pages.create.preview.cardsTitle")}
            >
              <Card>
                <CardKicker>{t("pages.create.preview.card1Kicker")}</CardKicker>
                <CardTitle>
                  {t("pages.create.preview.card1TitleA")}{" "}
                  <em>{t("pages.create.preview.card1TitleB")}</em>
                </CardTitle>
                <CardBody>{t("pages.create.preview.card1Body")}</CardBody>
                <CardFooter>{t("pages.create.preview.card1Foot")}</CardFooter>
              </Card>
            </PreviewBlock>

            {/* Bloco 3 — Card com CTA */}
            <PreviewBlock
              kicker={t("pages.create.preview.card2Kicker")}
              title={t("pages.create.preview.card2Title")}
            >
              <Card>
                <CardKicker>{t("pages.create.preview.card2Kicker")}</CardKicker>
                <CardTitle>
                  {t("pages.create.preview.card2TitleA")}{" "}
                  <em>{t("pages.create.preview.card2TitleB")}</em>
                </CardTitle>
                <CardBody>{t("pages.create.preview.card2Body")}</CardBody>
                <CardFooter>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--ink-faint)",
                      }}
                    >
                      {t("pages.create.preview.card2Price")}
                    </span>
                    <Button variant="primary" size="sm">
                      {t("pages.create.preview.card2Cta")}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </PreviewBlock>

            {/* Bloco 4 — Botões + Badges */}
            <PreviewBlock
              kicker={t("pages.create.preview.controlsKicker")}
              title={t("pages.create.preview.controlsTitle")}
            >
              <div style={{ display: "grid", gap: "var(--space-3)" }}>
                <Button variant="primary">
                  {t("pages.create.preview.btnPrimary")}
                </Button>
                <Button>{t("pages.create.preview.btnDefault")}</Button>
                <Button variant="accent">
                  {t("pages.create.preview.btnAccent")}
                </Button>
                <Button variant="ghost">
                  {t("pages.create.preview.btnGhost")}
                </Button>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  marginTop: "var(--space-4)",
                  flexWrap: "wrap",
                }}
              >
                <Badge dot variant="ok">
                  {t("pages.create.preview.badgeOk")}
                </Badge>
                <Badge dot variant="warn">
                  {t("pages.create.preview.badgeWarn")}
                </Badge>
                <Badge dot variant="accent">
                  {t("pages.create.preview.badgeAccent")}
                </Badge>
                <Badge>{t("pages.create.preview.badgeDefault")}</Badge>
              </div>
            </PreviewBlock>

            {/* Bloco 5 — Form */}
            <PreviewBlock
              kicker={t("pages.create.preview.formKicker")}
              title={t("pages.create.preview.formTitle")}
            >
              <div style={{ display: "grid", gap: "var(--space-3)" }}>
                <Field
                  label={t("pages.create.preview.fieldLabel")}
                  hint={t("pages.create.preview.fieldHint")}
                >
                  <Input placeholder={t("pages.create.preview.fieldPh")} />
                </Field>
                <Field label={t("pages.create.preview.field2Label")}>
                  <Input
                    type="email"
                    placeholder={t("pages.create.preview.field2Ph")}
                  />
                </Field>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    paddingTop: "var(--space-3)",
                    borderTop: "1px solid var(--rule-soft)",
                  }}
                >
                  <Button variant="ghost" size="sm">
                    {t("pages.create.preview.btnGhost")}
                  </Button>
                  <Button variant="primary" size="sm">
                    {t("pages.create.preview.btnPrimary")}
                  </Button>
                </div>
              </div>
            </PreviewBlock>

            {/* Bloco 6 — Alertas */}
            <PreviewBlock
              kicker={t("pages.create.preview.alertsKicker")}
              title={t("pages.create.preview.alertsTitle")}
            >
              <div style={{ display: "grid", gap: "var(--space-3)" }}>
                <Alert
                  variant="info"
                  title={t("pages.create.preview.alertInfoTitle")}
                >
                  {t("pages.create.preview.alertInfoBody")}
                </Alert>
                <Alert
                  variant="ok"
                  title={t("pages.create.preview.alertOkTitle")}
                >
                  {t("pages.create.preview.alertOkBody")}
                </Alert>
                <Alert
                  variant="warn"
                  title={t("pages.create.preview.alertWarnTitle")}
                >
                  {t("pages.create.preview.alertWarnBody")}
                </Alert>
              </div>
            </PreviewBlock>

            {/* Bloco 7 — Métrica grande (estilo dashboard) */}
            <PreviewBlock
              kicker={t("pages.create.preview.metricKicker")}
              title={t("pages.create.preview.metricTitle")}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  paddingBottom: "var(--space-4)",
                  borderBottom: "1px solid var(--rule-soft)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--ink-faint)",
                  }}
                >
                  {t("pages.create.preview.metricLabel")}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 48,
                    fontWeight: 300,
                    letterSpacing: "-0.02em",
                    color: "var(--ink)",
                    lineHeight: 1,
                  }}
                >
                  {t("pages.create.preview.metricValue")}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "var(--accent)",
                  }}
                >
                  {t("pages.create.preview.metricDelta")}
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "var(--space-3)",
                  paddingTop: "var(--space-3)",
                }}
              >
                <SmallMetric
                  label={t("pages.create.preview.metric2Label")}
                  value={t("pages.create.preview.metric2Value")}
                />
                <SmallMetric
                  label={t("pages.create.preview.metric3Label")}
                  value={t("pages.create.preview.metric3Value")}
                />
              </div>
            </PreviewBlock>
          </div>
          <div className="studio-rail-fade" aria-hidden="true" />
        </div>
      </div>
    </>
  );
}

function downloadCss(css) {
  if (typeof window === "undefined") return;
  const blob = new Blob([css], { type: "text/css" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "atelier-theme.css";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ================================================================
   Subcomponentes do Studio
   ================================================================ */

function ControlCard({
  label,
  value,
  iconChar,
  iconColor,
  iconStyle,
  tone,
  children,
}) {
  return (
    <details className={`studio-card ${tone ? `tone-${tone}` : ""}`}>
      <summary className="studio-card-summary">
        <span className="studio-card-meta">
          <span className="studio-card-label">{label}</span>
          <span className="studio-card-value">{value}</span>
        </span>
        <span
          className="studio-card-icon"
          style={iconColor ? { background: iconColor, ...iconStyle } : iconStyle}
        >
          {!iconColor && iconChar}
        </span>
        <span className="studio-card-chev" aria-hidden="true">
          ▾
        </span>
      </summary>
      <div className="studio-card-body">{children}</div>
    </details>
  );
}

function Segmented({ options, value, onChange }) {
  return (
    <div className="studio-segmented" role="group">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          className={`studio-seg ${value === o.id ? "active" : ""}`}
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Swatches({ options, value, onChange }) {
  return (
    <div className="studio-swatches">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          className={`studio-swatch ${value === o.id ? "active" : ""}`}
          style={{ background: o.accent }}
          onClick={() => onChange(o.id)}
          title={o.label}
          aria-label={o.label}
        >
          <span className="check" aria-hidden="true">
            ✓
          </span>
        </button>
      ))}
    </div>
  );
}

function FontList({ options, value, onChange }) {
  return (
    <div className="studio-font-list">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          className={`studio-font ${value === o.id ? "active" : ""}`}
          onClick={() => onChange(o.id)}
        >
          <span className="studio-font-name" style={{ fontFamily: o.serif }}>
            {o.label}
          </span>
          <span className="studio-font-desc">{o.description}</span>
        </button>
      ))}
    </div>
  );
}

function PreviewBlock({ kicker, title, wide, children }) {
  return (
    <article className={`studio-block ${wide ? "wide" : ""}`}>
      <header className="studio-block-head">
        <span className="studio-block-kicker">{kicker}</span>
        <h3 className="studio-block-title">{title}</h3>
      </header>
      <div className="studio-block-body">{children}</div>
    </article>
  );
}

function SmallMetric({ label, value }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--ink-faint)",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 22,
          fontWeight: 300,
          color: "var(--ink)",
        }}
      >
        {value}
      </span>
    </div>
  );
}
