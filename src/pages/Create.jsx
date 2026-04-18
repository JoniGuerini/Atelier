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
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "../ds/Tabs.jsx";
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
   Create — Studio do Atelier.
   ----------------------------------------------------------------
   Painel de controles à esquerda, preview ao vivo à direita.
   Todas as mudanças ficam ESCOPADAS no preview (CSS vars no
   <div data-studio-scope>) — o resto do site continua intacto.
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
  const [tab, setTab] = useState("style");

  // Persiste no localStorage (sem afetar o tema global do site)
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
        <aside className="studio-controls">
          <Tabs value={tab} onChange={setTab}>
            <TabList>
              <Tab value="style">{t("pages.create.tabs.style")}</Tab>
              <Tab value="presets">{t("pages.create.tabs.presets")}</Tab>
              <Tab value="advanced">{t("pages.create.tabs.advanced")}</Tab>
              <Tab value="export">{t("pages.create.tabs.export")}</Tab>
            </TabList>

            <TabPanels>
              {/* ----- Style ----- */}
              <TabPanel value="style">
                <ControlGroup label={t("pages.create.controls.theme")}>
                  <Segmented
                    options={THEME_OPTIONS.map((o) => ({
                      id: o.id,
                      label: o.label,
                    }))}
                    value={theme.theme}
                    onChange={update("theme")}
                  />
                </ControlGroup>

                <ControlGroup label={t("pages.create.controls.accent")}>
                  <Swatches
                    options={ACCENT_PRESETS}
                    value={theme.accent}
                    onChange={update("accent")}
                  />
                </ControlGroup>

                <ControlGroup label={t("pages.create.controls.base")}>
                  <Segmented
                    options={BASE_PRESETS.map((o) => ({
                      id: o.id,
                      label: o.label,
                    }))}
                    value={theme.base}
                    onChange={update("base")}
                  />
                </ControlGroup>

                <ControlGroup label={t("pages.create.controls.font")}>
                  <FontList
                    options={FONT_PRESETS}
                    value={theme.font}
                    onChange={update("font")}
                  />
                </ControlGroup>

                <ControlGroup label={t("pages.create.controls.spacing")}>
                  <Segmented
                    options={SPACING_PRESETS.map((o) => ({
                      id: o.id,
                      label: o.label,
                    }))}
                    value={theme.spacing}
                    onChange={update("spacing")}
                  />
                </ControlGroup>
              </TabPanel>

              {/* ----- Presets ----- */}
              <TabPanel value="presets">
                <PresetList
                  presets={STUDIO_PRESETS}
                  current={theme}
                  onPick={(p) => setTheme({ ...DEFAULT_THEME, ...p })}
                />
              </TabPanel>

              {/* ----- Advanced ----- */}
              <TabPanel value="advanced">
                <Alert variant="warn" title={t("pages.create.advanced.warnTitle")}>
                  {tr("pages.create.advanced.warnBody")}
                </Alert>

                <ControlGroup
                  label={t("pages.create.advanced.radius")}
                  hint={`${theme.radius}px`}
                >
                  <input
                    type="range"
                    className="studio-range"
                    min={RADIUS_RANGE.min}
                    max={RADIUS_RANGE.max}
                    step={RADIUS_RANGE.step}
                    value={theme.radius}
                    onChange={(e) => update("radius")(Number(e.target.value))}
                  />
                </ControlGroup>
              </TabPanel>

              {/* ----- Export ----- */}
              <TabPanel value="export">
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
              </TabPanel>
            </TabPanels>
          </Tabs>

          <div className="studio-actions">
            <Button onClick={shuffle} variant="ghost" size="sm">
              {t("pages.create.actions.shuffle")}
            </Button>
            <Button onClick={reset} variant="ghost" size="sm">
              {t("pages.create.actions.reset")}
            </Button>
          </div>
        </aside>

        {/* ========== Preview ========== */}
        <div className="studio-preview" style={previewStyle} data-studio-scope>
          <PreviewSection
            kicker={t("pages.create.preview.typeKicker")}
            title={t("pages.create.preview.typeTitle")}
          >
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 56,
                fontWeight: 300,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                marginBottom: "var(--space-3)",
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
                fontSize: 17,
                lineHeight: 1.6,
                color: "var(--ink-soft)",
                maxWidth: 540,
              }}
            >
              {t("pages.create.preview.body")}
            </p>
          </PreviewSection>

          <PreviewSection
            kicker={t("pages.create.preview.cardsKicker")}
            title={t("pages.create.preview.cardsTitle")}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--space-4)",
              }}
            >
              <Card>
                <CardKicker>{t("pages.create.preview.card1Kicker")}</CardKicker>
                <CardTitle>
                  {t("pages.create.preview.card1TitleA")}
                  <em> {t("pages.create.preview.card1TitleB")}</em>
                </CardTitle>
                <CardBody>{t("pages.create.preview.card1Body")}</CardBody>
                <CardFooter>{t("pages.create.preview.card1Foot")}</CardFooter>
              </Card>
              <Card>
                <CardKicker>{t("pages.create.preview.card2Kicker")}</CardKicker>
                <CardTitle>
                  {t("pages.create.preview.card2TitleA")}
                  <em> {t("pages.create.preview.card2TitleB")}</em>
                </CardTitle>
                <CardBody>{t("pages.create.preview.card2Body")}</CardBody>
                <CardFooter>
                  <Button variant="primary" size="sm">
                    {t("pages.create.preview.card2Cta")}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </PreviewSection>

          <PreviewSection
            kicker={t("pages.create.preview.controlsKicker")}
            title={t("pages.create.preview.controlsTitle")}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--space-4)",
              }}
            >
              <Field
                label={t("pages.create.preview.fieldLabel")}
                hint={t("pages.create.preview.fieldHint")}
              >
                <Input
                  placeholder={t("pages.create.preview.fieldPh")}
                  defaultValue=""
                />
              </Field>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  alignItems: "flex-end",
                }}
              >
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
            </div>

            <div
              style={{
                display: "flex",
                gap: 8,
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
          </PreviewSection>

          <PreviewSection
            kicker={t("pages.create.preview.alertsKicker")}
            title={t("pages.create.preview.alertsTitle")}
          >
            <div style={{ display: "grid", gap: "var(--space-3)" }}>
              <Alert variant="info" title={t("pages.create.preview.alertInfoTitle")}>
                {t("pages.create.preview.alertInfoBody")}
              </Alert>
              <Alert variant="ok" title={t("pages.create.preview.alertOkTitle")}>
                {t("pages.create.preview.alertOkBody")}
              </Alert>
            </div>
          </PreviewSection>
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

function ControlGroup({ label, hint, children }) {
  return (
    <div className="studio-group">
      <div className="studio-group-head">
        <span className="studio-group-label">{label}</span>
        {hint && <span className="studio-group-hint">{hint}</span>}
      </div>
      {children}
    </div>
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

function PresetList({ presets, current, onPick }) {
  return (
    <div className="studio-preset-list">
      {presets.map((p) => {
        const active =
          p.theme.accent === current.accent &&
          p.theme.base === current.base &&
          p.theme.font === current.font &&
          p.theme.spacing === current.spacing &&
          p.theme.theme === current.theme;
        return (
          <button
            key={p.id}
            type="button"
            className={`studio-preset ${active ? "active" : ""}`}
            onClick={() => onPick(p.theme)}
          >
            <span className="studio-preset-label">{p.label}</span>
            <span className="studio-preset-desc">{p.description}</span>
          </button>
        );
      })}
    </div>
  );
}

function PreviewSection({ kicker, title, children }) {
  return (
    <section className="studio-preview-section">
      <header className="studio-preview-head">
        <span className="kicker">{kicker}</span>
        <h3 className="title">{title}</h3>
      </header>
      <div className="studio-preview-body">{children}</div>
    </section>
  );
}
