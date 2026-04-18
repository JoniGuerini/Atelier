import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Badge,
  Field,
  Input,
  Switch,
  Select,
  Textarea,
  Avatar,
  AvatarGroup,
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
   Create — Studio do Atelier (mural).
   ----------------------------------------------------------------
   Layout final:
     [ Painel sticky 260px ] [ Mural CSS Grid 2D — scroll x e y ]

   O mural é uma grid densa (`grid-auto-flow: dense`) com colunas
   fixas. Cada bloco pode ocupar 1 ou 2 colunas e 1 ou 2 linhas
   (modificadores .wide, .tall, .big). Os blocos são intencional-
   mente diversos — um headline tipográfico, um card editorial,
   uma métrica, um formulário, um mini chart SVG, uma lista de
   transações, uma lista de configurações, etc. — para mostrar o
   tema do usuário em uma variedade real de UI.
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
    <div className="studio-shell">
      {/* ===== Header de ferramenta — 1 linha ===== */}
      <header className="studio-header">
        <div className="studio-header-left">
          <span className="studio-header-kicker">
            {t("pages.create.headerKicker")}
          </span>
          <h1 className="studio-header-title">
            {t("pages.create.headerTitleA")}{" "}
            <em>{t("pages.create.headerTitleB")}</em>
          </h1>
        </div>
        <div className="studio-header-right">
          <span className="studio-header-hint">
            {t("pages.create.headerHint")}
          </span>
        </div>
      </header>

      <div className="studio">
        {/* ========== Painel ========== */}
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

        {/* ========== Mural ========== */}
        <div className="studio-canvas-wrap">
          <div className="studio-canvas" style={previewStyle} data-studio-scope>
            <StudioMural t={t} />
          </div>
          <div className="studio-canvas-fade studio-canvas-fade-x" aria-hidden="true" />
          <div className="studio-canvas-fade studio-canvas-fade-y" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Mural — coleção de blocos diversos.
   Cada bloco mostra o tema customizado em um layout diferente.
   Modificadores de grid: .wide (2 cols), .tall (2 rows), .big (2x2).
   ================================================================ */

function StudioMural({ t }) {
  return (
    <>
      {/* —— 1. Hero tipográfico (wide) —— */}
      <Block kind="wide" kicker={t("pages.create.preview.typeKicker")}>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 44,
            fontWeight: 300,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            color: "var(--ink)",
            margin: 0,
          }}
        >
          {t("pages.create.preview.headlineA")}{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
            {t("pages.create.preview.headlineB")}
          </em>
        </h1>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 16,
            lineHeight: 1.6,
            color: "var(--ink-soft)",
            margin: "12px 0 0",
          }}
        >
          {t("pages.create.preview.body")}
        </p>
        <div style={mono10()}>{t("pages.create.preview.typeSpec")}</div>
      </Block>

      {/* —— 2. Card editorial —— */}
      <Block kind="normal">
        <Card>
          <CardKicker>{t("pages.create.preview.card1Kicker")}</CardKicker>
          <CardTitle>
            {t("pages.create.preview.card1TitleA")}{" "}
            <em>{t("pages.create.preview.card1TitleB")}</em>
          </CardTitle>
          <CardBody>{t("pages.create.preview.card1Body")}</CardBody>
          <CardFooter>{t("pages.create.preview.card1Foot")}</CardFooter>
        </Card>
      </Block>

      {/* —— 3. Métrica + delta —— */}
      <Block kind="normal" kicker={t("pages.create.preview.metricKicker")} title={t("pages.create.preview.metricTitle")}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingBottom: 14, borderBottom: "1px solid var(--rule-soft)" }}>
          <span style={mono10()}>{t("pages.create.preview.metricLabel")}</span>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: 48, fontWeight: 300, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1 }}>
            {t("pages.create.preview.metricValue")}
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)" }}>
            {t("pages.create.preview.metricDelta")}
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, paddingTop: 12 }}>
          <SmallStat label={t("pages.create.preview.metric2Label")} value={t("pages.create.preview.metric2Value")} />
          <SmallStat label={t("pages.create.preview.metric3Label")} value={t("pages.create.preview.metric3Value")} />
        </div>
      </Block>

      {/* —— 4. Configurações (switches) — TALL —— */}
      <Block kind="tall" kicker={t("pages.create.preview.settingsKicker")} title={t("pages.create.preview.settingsTitle")}>
        <SettingRow label={t("pages.create.preview.setting1")} hint={t("pages.create.preview.setting1Hint")} defaultOn />
        <SettingRow label={t("pages.create.preview.setting2")} hint={t("pages.create.preview.setting2Hint")} />
        <SettingRow label={t("pages.create.preview.setting3")} hint={t("pages.create.preview.setting3Hint")} defaultOn />
        <SettingRow label={t("pages.create.preview.setting4")} hint={t("pages.create.preview.setting4Hint")} />
        <SettingRow label={t("pages.create.preview.setting5")} hint={t("pages.create.preview.setting5Hint")} defaultOn />
        <SettingRow label={t("pages.create.preview.setting6")} hint={t("pages.create.preview.setting6Hint")} />
      </Block>

      {/* —— 5. Botões + Badges —— */}
      <Block kind="normal" kicker={t("pages.create.preview.controlsKicker")} title={t("pages.create.preview.controlsTitle")}>
        <div style={{ display: "grid", gap: 8 }}>
          <Button variant="primary">{t("pages.create.preview.btnPrimary")}</Button>
          <Button>{t("pages.create.preview.btnDefault")}</Button>
          <Button variant="accent">{t("pages.create.preview.btnAccent")}</Button>
          <Button variant="ghost">{t("pages.create.preview.btnGhost")}</Button>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
          <Badge dot variant="ok">{t("pages.create.preview.badgeOk")}</Badge>
          <Badge dot variant="warn">{t("pages.create.preview.badgeWarn")}</Badge>
          <Badge dot variant="accent">{t("pages.create.preview.badgeAccent")}</Badge>
          <Badge>{t("pages.create.preview.badgeDefault")}</Badge>
        </div>
      </Block>

      {/* —— 6. Form completo — TALL —— */}
      <Block kind="tall" kicker={t("pages.create.preview.formKicker")} title={t("pages.create.preview.formTitle")}>
        <Field label={t("pages.create.preview.fieldLabel")} hint={t("pages.create.preview.fieldHint")}>
          <Input placeholder={t("pages.create.preview.fieldPh")} />
        </Field>
        <Field label={t("pages.create.preview.field2Label")}>
          <Input type="email" placeholder={t("pages.create.preview.field2Ph")} />
        </Field>
        <Field label={t("pages.create.preview.field3Label")}>
          <Select defaultValue="quarterly">
            <option value="monthly">{t("pages.create.preview.field3Opt1")}</option>
            <option value="quarterly">{t("pages.create.preview.field3Opt2")}</option>
            <option value="annual">{t("pages.create.preview.field3Opt3")}</option>
          </Select>
        </Field>
        <Field label={t("pages.create.preview.field4Label")}>
          <Textarea rows={3} placeholder={t("pages.create.preview.field4Ph")} />
        </Field>
        <div style={{ display: "flex", gap: 8, paddingTop: 12, borderTop: "1px solid var(--rule-soft)" }}>
          <Button variant="ghost" size="sm">{t("pages.create.preview.btnGhost")}</Button>
          <Button variant="primary" size="sm">{t("pages.create.preview.btnPrimary")}</Button>
        </div>
      </Block>

      {/* —— 7. Mini gráfico de barras (wide) —— */}
      <Block kind="wide" kicker={t("pages.create.preview.chartKicker")} title={t("pages.create.preview.chartTitle")}>
        <BarChart />
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid var(--rule-soft)" }}>
          <SmallStat label={t("pages.create.preview.chartStat1Label")} value={t("pages.create.preview.chartStat1Value")} />
          <SmallStat label={t("pages.create.preview.chartStat2Label")} value={t("pages.create.preview.chartStat2Value")} />
          <SmallStat label={t("pages.create.preview.chartStat3Label")} value={t("pages.create.preview.chartStat3Value")} />
        </div>
      </Block>

      {/* —— 8. Avatar group + status —— */}
      <Block kind="normal" kicker={t("pages.create.preview.teamKicker")} title={t("pages.create.preview.teamTitle")}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
          <AvatarGroup max={5}>
            <Avatar initials="CA" variant="solid" />
            <Avatar initials="JO" variant="accent" />
            <Avatar initials="MR" />
            <Avatar initials="LP" variant="solid" />
            <Avatar initials="XS" variant="accent" />
            <Avatar initials="YR" />
            <Avatar initials="VG" variant="solid" />
          </AvatarGroup>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: 14, color: "var(--ink)" }}>
              {t("pages.create.preview.teamStatus")}
            </span>
            <Badge dot variant="ok">{t("pages.create.preview.teamOnline")}</Badge>
          </div>
        </div>
      </Block>

      {/* —— 9. Plano (pricing) — TALL —— */}
      <Block kind="tall" kicker={t("pages.create.preview.planKicker")} title={t("pages.create.preview.planTitle")}>
        <div style={{ paddingBottom: 14, borderBottom: "1px solid var(--rule-soft)", display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: 40, fontWeight: 300, letterSpacing: "-0.02em", color: "var(--ink)" }}>
            {t("pages.create.preview.planPrice")}
          </span>
          <span style={mono10()}>{t("pages.create.preview.planPer")}</span>
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          <PlanFeature>{t("pages.create.preview.planFeat1")}</PlanFeature>
          <PlanFeature>{t("pages.create.preview.planFeat2")}</PlanFeature>
          <PlanFeature>{t("pages.create.preview.planFeat3")}</PlanFeature>
          <PlanFeature>{t("pages.create.preview.planFeat4")}</PlanFeature>
          <PlanFeature>{t("pages.create.preview.planFeat5")}</PlanFeature>
        </ul>
        <Button variant="primary" style={{ marginTop: "auto" }}>
          {t("pages.create.preview.planCta")}
        </Button>
      </Block>

      {/* —— 10. Tabs preview —— */}
      <Block kind="normal" kicker={t("pages.create.preview.tabsKicker")} title={t("pages.create.preview.tabsTitle")}>
        <PreviewTabs t={t} />
      </Block>

      {/* —— 11. Alertas —— */}
      <Block kind="normal" kicker={t("pages.create.preview.alertsKicker")} title={t("pages.create.preview.alertsTitle")}>
        <Alert variant="info" title={t("pages.create.preview.alertInfoTitle")}>
          {t("pages.create.preview.alertInfoBody")}
        </Alert>
        <Alert variant="ok" title={t("pages.create.preview.alertOkTitle")}>
          {t("pages.create.preview.alertOkBody")}
        </Alert>
      </Block>

      {/* —— 12. Lista de transações (wide) —— */}
      <Block kind="wide" kicker={t("pages.create.preview.txKicker")} title={t("pages.create.preview.txTitle")}>
        <TxRow date="12 mai" label={t("pages.create.preview.tx1")} amount="+ R$ 240,00" positive />
        <TxRow date="08 mai" label={t("pages.create.preview.tx2")} amount="− R$ 48,00" />
        <TxRow date="04 mai" label={t("pages.create.preview.tx3")} amount="− R$ 96,00" />
        <TxRow date="01 mai" label={t("pages.create.preview.tx4")} amount="+ R$ 720,00" positive />
        <TxRow date="28 abr" label={t("pages.create.preview.tx5")} amount="− R$ 32,00" />
      </Block>
    </>
  );
}

/* ================================================================
   Helpers de bloco
   ================================================================ */

function Block({ kind = "normal", kicker, title, children }) {
  return (
    <article className={`studio-block studio-block--${kind}`}>
      {(kicker || title) && (
        <header className="studio-block-head">
          {kicker && <span className="studio-block-kicker">{kicker}</span>}
          {title && <h3 className="studio-block-title">{title}</h3>}
        </header>
      )}
      <div className="studio-block-body">{children}</div>
    </article>
  );
}

function mono10() {
  return {
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--ink-faint)",
  };
}

function SmallStat({ label, value }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={mono10()}>{label}</span>
      <span style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 300, color: "var(--ink)", lineHeight: 1.1 }}>
        {value}
      </span>
    </div>
  );
}

function SettingRow({ label, hint, defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, paddingBottom: 12, borderBottom: "1px solid var(--rule-soft)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
        <span style={{ fontFamily: "var(--font-serif)", fontSize: 14, color: "var(--ink)" }}>{label}</span>
        <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 12, color: "var(--ink-soft)" }}>{hint}</span>
      </div>
      <Switch checked={on} onChange={setOn} />
    </div>
  );
}

function PlanFeature({ children }) {
  return (
    <li style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "var(--font-serif)", fontSize: 14, lineHeight: 1.4, color: "var(--ink-soft)" }}>
      <span style={{ color: "var(--accent)", fontFamily: "var(--font-serif)", fontStyle: "italic", lineHeight: 1 }}>✓</span>
      {children}
    </li>
  );
}

function TxRow({ date, label, amount, positive }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "70px 1fr auto", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--rule-soft)" }}>
      <span style={mono10()}>{date}</span>
      <span style={{ fontFamily: "var(--font-serif)", fontSize: 14, color: "var(--ink)" }}>{label}</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: positive ? "var(--ok)" : "var(--ink)" }}>
        {amount}
      </span>
    </div>
  );
}

/* Mini gráfico de barras desenhado em SVG, usando var(--accent) e
   var(--ink-faint) — reage ao tema sem código JS extra. */
function BarChart() {
  const data = [42, 58, 35, 72, 89, 65, 94, 78];
  const labels = ["S", "T", "Q", "Q", "S", "S", "D", "S"];
  const max = Math.max(...data);
  const W = 360;
  const H = 140;
  const pad = 12;
  const barW = (W - pad * 2) / data.length - 6;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" width="100%" height={140}>
      {data.map((v, i) => {
        const h = ((v / max) * (H - pad * 2 - 18));
        const x = pad + i * (barW + 6);
        const y = H - pad - 18 - h;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={h}
              fill={i === data.length - 2 ? "var(--accent)" : "var(--ink-faint)"}
            />
            <text
              x={x + barW / 2}
              y={H - 4}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="9"
              fill="var(--ink-faint)"
              style={{ letterSpacing: "0.1em" }}
            >
              {labels[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* Tabs preview com estado local */
function PreviewTabs({ t }) {
  const [tab, setTab] = useState("a");
  return (
    <Tabs value={tab} onChange={setTab}>
      <TabList>
        <Tab value="a">{t("pages.create.preview.tab1")}</Tab>
        <Tab value="b">{t("pages.create.preview.tab2")}</Tab>
        <Tab value="c">{t("pages.create.preview.tab3")}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="a">
          <p style={{ fontFamily: "var(--font-serif)", fontSize: 14, lineHeight: 1.5, color: "var(--ink-soft)", margin: "12px 0 0" }}>
            {t("pages.create.preview.tab1Body")}
          </p>
        </TabPanel>
        <TabPanel value="b">
          <p style={{ fontFamily: "var(--font-serif)", fontSize: 14, lineHeight: 1.5, color: "var(--ink-soft)", margin: "12px 0 0" }}>
            {t("pages.create.preview.tab2Body")}
          </p>
        </TabPanel>
        <TabPanel value="c">
          <p style={{ fontFamily: "var(--font-serif)", fontSize: 14, lineHeight: 1.5, color: "var(--ink-soft)", margin: "12px 0 0" }}>
            {t("pages.create.preview.tab3Body")}
          </p>
        </TabPanel>
      </TabPanels>
    </Tabs>
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
   Painel — subcomponentes (idem versão anterior)
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
