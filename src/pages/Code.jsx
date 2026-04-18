import { PageHead, Section, Code, Divider } from "../ds/primitives.jsx";
import { useT } from "../lib/i18n.jsx";

/* The token block and install snippets are language-agnostic
   (just CSS / shell) and stay inline. */
const TOKENS = `:root {
  /* Surface */
  --bg: #f4f1ea;
  --bg-panel: #faf8f3;
  --bg-sunken: #efeadc;
  --bg-inverse: #1a1a1a;

  /* Ink */
  --ink: #1a1a1a;
  --ink-soft: #5a5754;
  --ink-faint: #9a958d;
  --ink-inverse: #e8e3d6;

  /* Rules */
  --rule: #1a1a1a;
  --rule-soft: #d9d3c4;
  --rule-faint: #e6e0d0;

  /* Accent */
  --accent: #c8361d;
  --accent-soft: #f1ddd5;
  --accent-ink: #8c2414;

  /* Semantic */
  --ok: #2d6a3e;        --ok-soft: #dbe8d8;
  --warn: #8a6d1a;      --warn-soft: #f0e6c8;
  --danger: #c8361d;    --danger-soft: #f1ddd5;
  --info: #2e5a8a;      --info-soft: #d9e3ee;

  /* Typography */
  --font-serif: "Fraunces", Georgia, serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  /* Spacing (8pt base) */
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;
  --space-4: 16px;  --space-5: 24px;  --space-6: 32px;
  --space-7: 48px;  --space-8: 64px;  --space-9: 96px;

  /* Motion */
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --dur-fast: 120ms;
  --dur: 200ms;
  --dur-slow: 320ms;
}`;

const FONT_IMPORT = `<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=JetBrains+Mono:wght@400;500;600&display=swap"
  rel="stylesheet"
/>`;

const INSTALL = `$ npm create vite@latest my-app -- --template react
$ cd my-app
$ npm install`;

const IMPORT_CSS = `/* src/main.jsx */
import "./index.css";`;

/* Component API — the example snippets stay in a neutral / English-friendly
   form so developers can copy/paste directly regardless of UI locale. */
const API = [
  {
    id: "buttons",
    name: "Button",
    route: "buttons",
    props: [
      ["variant", "'default' | 'primary' | 'accent' | 'ghost' | 'link'", "'default'"],
      ["size", "'sm' | 'md' | 'lg'", "'md'"],
      ["disabled", "boolean", "false"],
    ],
    code: `import { Button } from "./ds/primitives";

<Button variant="primary">Confirm</Button>
<Button>Secondary</Button>
<Button variant="accent">Featured</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Editorial link</Button>

<Button size="sm" variant="primary">Small</Button>
<Button size="lg" variant="primary">Large</Button>`,
  },
  {
    id: "inputs",
    name: "Field + Input / Textarea / Select",
    route: "inputs",
    props: [
      ["label", "ReactNode", "—"],
      ["hint", "ReactNode", "—"],
      ["error", "ReactNode", "—"],
      ["invalid", "boolean", "false"],
    ],
    code: `import { Field, Input, Textarea, Select } from "./ds/primitives";

<Field label="Email" hint="We only use it to send the edition.">
  <Input type="email" placeholder="clara@atelier.com" />
</Field>

<Field label="About you" error="Required field.">
  <Textarea rows={3} invalid placeholder="Write something…" />
</Field>

<Field label="Plan">
  <Select defaultValue="quarterly">
    <option value="monthly">Monthly</option>
    <option value="quarterly">Quarterly</option>
    <option value="annual">Annual</option>
  </Select>
</Field>`,
  },
  {
    id: "controls",
    name: "Checkbox · Radio · Switch",
    route: "controls",
    props: [
      ["label", "ReactNode", "—"],
      ["checked", "boolean", "false"],
      ["onChange", "(event | boolean) => void", "—"],
      ["disabled", "boolean", "false"],
    ],
    code: `import { Checkbox, Radio, Switch } from "./ds/primitives";

<Checkbox
  label="I agree to receive the edition"
  checked={accepted}
  onChange={(e) => setAccepted(e.target.checked)}
/>

<Radio
  name="plan"
  label="Quarterly — $ 16"
  value="quarterly"
  checked={plan === "quarterly"}
  onChange={() => setPlan("quarterly")}
/>

<Switch
  label="Email notifications"
  checked={notif}
  onChange={setNotif}
/>`,
  },
  {
    id: "badges",
    name: "Badge",
    route: "badges",
    props: [
      ["variant", "'default' | 'solid' | 'accent' | 'ok' | 'warn' | 'info'", "'default'"],
      ["dot", "boolean", "false"],
    ],
    code: `import { Badge } from "./ds/primitives";

<Badge>Default</Badge>
<Badge variant="solid">Solid</Badge>
<Badge variant="accent" dot>New</Badge>
<Badge variant="ok" dot>Published</Badge>
<Badge variant="warn">Draft</Badge>
<Badge variant="info">Info</Badge>`,
  },
  {
    id: "alerts",
    name: "Alert",
    route: "alerts",
    props: [
      ["variant", "'info' | 'ok' | 'warn' | 'danger'", "'default'"],
      ["title", "ReactNode", "—"],
    ],
    code: `import { Alert } from "./ds/primitives";

<Alert variant="info" title="About this edition">
  Atelier publishes one issue per quarter.
</Alert>

<Alert variant="ok" title="Draft published">
  Your piece has been published in the April edition.
</Alert>

<Alert variant="warn" title="Three images without caption">
  Before publishing, add captions.
</Alert>

<Alert variant="danger" title="Could not save">
  We lost the connection mid-upload.
</Alert>`,
  },
  {
    id: "cards",
    name: "Card",
    route: "cards",
    props: [
      ["kicker", "ReactNode", "—"],
      ["title", "ReactNode", "—"],
      ["foot", "ReactNode", "—"],
    ],
    code: `import { Card, Button } from "./ds/primitives";

<Card
  kicker="Chronicle · 04"
  title={<>On the <em>silence</em> of interfaces</>}
  foot={<>By Clara A. · 5 min</>}
>
  There is a difference between quiet and empty.
</Card>`,
  },
  {
    id: "tabs",
    name: "Tabs · Breadcrumbs",
    route: "tabs",
    props: [
      ["value", "string", "—"],
      ["onChange", "(value: string) => void", "—"],
      ["items", "{ value, label, panel }[]", "—"],
    ],
    code: `import { Tabs, Breadcrumbs } from "./ds/primitives";

<Tabs
  value={tab}
  onChange={setTab}
  items={[
    { value: "a", label: "Foundations", panel: <p>…</p> },
    { value: "b", label: "Components", panel: <p>…</p> },
  ]}
/>

<Breadcrumbs items={["Atelier", "Components", "Tabs"]} />`,
  },
  {
    id: "overlays",
    name: "Modal · Tooltip",
    route: "overlays",
    props: [
      ["open", "boolean", "false"],
      ["onClose", "() => void", "—"],
      ["title", "ReactNode", "—"],
      ["foot", "ReactNode", "—"],
    ],
    code: `import { Modal, Tooltip, Button } from "./ds/primitives";

<Tooltip tip="Copy to clipboard">
  <Button>Copy</Button>
</Tooltip>

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title={<>Discard <em>draft</em>?</>}
  foot={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="primary" onClick={() => setOpen(false)}>Discard</Button>
    </>
  }
>
  This action is final.
</Modal>`,
  },
  {
    id: "feedback",
    name: "Progress · Toast",
    route: "feedback",
    props: [
      ["value (Progress)", "number (0–100)", "0"],
      ["message (Toast)", "string", "—"],
      ["visible (Toast)", "boolean", "false"],
    ],
    code: `import { Progress, Toast } from "./ds/primitives";

<Progress value={42} label="Uploading file" />

<Toast message="Copied to clipboard" visible={show} />`,
  },
];

function ApiTable({ rows, labels }) {
  return (
    <div className="ds-table-wrap">
      <table className="ds-table">
        <thead>
          <tr>
            <th style={{ width: "30%" }}>{labels.prop}</th>
            <th>{labels.type}</th>
            <th style={{ width: "20%" }}>{labels.default}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, type, def]) => (
            <tr key={name}>
              <td className="mono">{name}</td>
              <td className="mono" style={{ color: "var(--ink-soft)" }}>
                {type}
              </td>
              <td className="mono">{def}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CodePage({ onNavigate }) {
  const { t, tr, raw } = useT();
  const conventions = raw("pages.code.conventions.items") || [];
  const tableLabels = {
    prop: t("common.prop"),
    type: t("common.type"),
    default: t("common.default"),
  };

  return (
    <>
      <PageHead
        lead={t("pages.code.lead")}
        title={
          <>
            {tr("pages.code.titleA")}
            <em>{t("pages.code.titleB")}</em>
          </>
        }
        metaLabel={t("pages.code.metaLabel")}
        meta={t("pages.code.meta")}
        intro={tr("pages.code.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.code.start.title")}</>}
        kicker={t("pages.code.start.kicker")}
      >
        <p className="section-desc">{tr("pages.code.start.desc")}</p>

        <h3 className="sub">{t("pages.code.start.step1")}</h3>
        <Code lang="shell">{INSTALL}</Code>

        <h3 className="sub">{t("pages.code.start.step2")}</h3>
        <Code lang="jsx">{FONT_IMPORT}</Code>

        <h3 className="sub">{t("pages.code.start.step3")}</h3>
        <Code lang="jsx">{IMPORT_CSS}</Code>
      </Section>

      <Section
        num="ii"
        title={
          <>
            {tr("pages.code.tokens.titleA")}
            <em>{t("pages.code.tokens.titleB")}</em>
          </>
        }
        kicker={t("pages.code.tokens.kicker")}
      >
        <p className="section-desc">{tr("pages.code.tokens.desc")}</p>
        <Code lang="css">{TOKENS}</Code>
      </Section>

      <Divider>{t("pages.code.divider")}</Divider>

      <Section
        num="iii"
        title={
          <>
            {tr("pages.code.api.titleA")}
            <em>{t("pages.code.api.titleB")}</em>
          </>
        }
        kicker={t("pages.code.api.kicker")}
      >
        <p className="section-desc">{tr("pages.code.api.desc")}</p>

        {API.map((c) => (
          <div
            key={c.id}
            style={{
              border: "1px solid var(--rule-soft)",
              background: "var(--bg-panel)",
              marginBottom: "var(--space-5)",
            }}
          >
            <header
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: "var(--space-4)",
                padding: "var(--space-4) var(--space-5)",
                borderBottom: "1px solid var(--rule-soft)",
                background: "var(--bg)",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--ink-faint)",
                    marginBottom: 4,
                  }}
                >
                  {t("common.import")}
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate?.(c.route)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    fontFamily: "var(--font-serif)",
                    fontWeight: 300,
                    fontSize: 22,
                    letterSpacing: "-0.01em",
                    color: "var(--ink)",
                  }}
                >
                  <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
                    {c.name.split(" ")[0]}
                  </em>
                  {c.name.includes(" ") && (
                    <span style={{ color: "var(--ink-soft)" }}>
                      {" " + c.name.slice(c.name.indexOf(" "))}
                    </span>
                  )}
                </button>
              </div>
              <button
                type="button"
                onClick={() => onNavigate?.(c.route)}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                }}
              >
                {t("pages.code.api.view")}
              </button>
            </header>

            <div style={{ padding: "var(--space-5)" }}>
              <h4
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--ink-faint)",
                  marginBottom: 10,
                }}
              >
                {t("common.props")}
              </h4>
              <ApiTable rows={c.props} labels={tableLabels} />

              <h4
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--ink-faint)",
                  margin: "var(--space-5) 0 10px",
                }}
              >
                {t("common.example")}
              </h4>
              <Code lang="jsx">{c.code}</Code>
            </div>
          </div>
        ))}
      </Section>

      <Section
        num="iv"
        title={<>{t("pages.code.conventions.title")}</>}
        kicker={t("pages.code.conventions.kicker")}
      >
        <div className="grid cols-3">
          {conventions.map((rule) => (
            <div
              key={rule.n}
              style={{
                border: "1px solid var(--rule-soft)",
                background: "var(--bg-panel)",
                padding: "var(--space-5)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: 36,
                  color: "var(--accent)",
                  marginBottom: 10,
                }}
              >
                {rule.n}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 18,
                  marginBottom: 8,
                }}
              >
                {rule.titleA}
                <em style={{ fontStyle: "italic" }}>{rule.titleB}</em>
                {rule.titleC || ""}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "var(--ink-soft)",
                }}
              >
                {(() => {
                  const parts = rule.body.split(/\[em\]|\[\/em\]/);
                  return parts.map((p, i) =>
                    i % 2 === 1 ? (
                      <em key={i} style={{ fontStyle: "italic" }}>
                        {p}
                      </em>
                    ) : (
                      p
                    )
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
