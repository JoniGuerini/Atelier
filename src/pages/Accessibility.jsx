import {
  PageHead,
  Section,
  Example,
} from "../ds/primitives.jsx";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from "../ds/Table.jsx";
import { Card, CardKicker, CardTitle, CardBody } from "../ds/Card.jsx";
import { Alert } from "../ds/Alert.jsx";
import { useT } from "../lib/i18n.jsx";

export default function AccessibilityPage() {
  const { t, tr, raw } = useT();
  const principles = raw("pages.accessibility.principles.items") || [];
  const shortcuts = raw("pages.accessibility.shortcuts.items") || [];

  return (
    <>
      <PageHead
        lead={t("pages.accessibility.lead")}
        title={
          <>
            {tr("pages.accessibility.titleA")}
            <em>{t("pages.accessibility.titleB")}</em>
          </>
        }
        metaLabel={t("pages.accessibility.metaLabel")}
        meta={t("pages.accessibility.meta")}
        intro={tr("pages.accessibility.intro")}
      />

      {/* i · Princípios */}
      <Section
        num="i"
        title={<>{t("pages.accessibility.principles.title")}</>}
        kicker={t("pages.accessibility.principles.kicker")}
      >
        <p className="section-desc">
          {t("pages.accessibility.principles.desc")}
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "var(--space-4)",
            width: "100%",
          }}
        >
          {principles.map((p, i) => (
            <Card key={i}>
              <CardKicker>{p.n}</CardKicker>
              <CardTitle>
                {p.titleA}
                <em>{p.titleB}</em>
              </CardTitle>
              <CardBody>{tr(`pages.accessibility.principles.items.${i}.body`)}</CardBody>
            </Card>
          ))}
        </div>
      </Section>

      {/* ii · Atalhos de teclado */}
      <Section
        num="ii"
        title={<>{t("pages.accessibility.shortcuts.title")}</>}
        kicker={t("pages.accessibility.shortcuts.kicker")}
      >
        <p className="section-desc">
          {tr("pages.accessibility.shortcuts.desc")}
        </p>
        <Example
          caption={t("pages.accessibility.shortcuts.caption")}
          tech="global · contextual"
          stack
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader width={180}>
                  {t("pages.accessibility.shortcuts.thKeys")}
                </TableHeader>
                <TableHeader>
                  {t("pages.accessibility.shortcuts.thAction")}
                </TableHeader>
                <TableHeader width={120}>
                  {t("pages.accessibility.shortcuts.thScope")}
                </TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {shortcuts.map((s, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Keys keys={s.keys} />
                  </TableCell>
                  <TableCell>{s.action}</TableCell>
                  <TableCell mono>{s.scope}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Example>
      </Section>

      {/* iii · Foco */}
      <Section
        num="iii"
        title={<>{t("pages.accessibility.focus.title")}</>}
        kicker={t("pages.accessibility.focus.kicker")}
      >
        <p className="section-desc">{tr("pages.accessibility.focus.desc")}</p>
        <Alert variant="info" title={t("pages.accessibility.focus.tipTitle")}>
          {tr("pages.accessibility.focus.tipBody")}
        </Alert>
        <div style={{ marginTop: "var(--space-4)" }}>
          <Example
            caption={t("pages.accessibility.focus.caption")}
            tech=":focus-visible · skip-link"
            stack
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.14em",
                color: "var(--ink-soft)",
                lineHeight: 1.8,
              }}
            >
              <p style={{ margin: 0 }}>
                <strong style={{ color: "var(--ink)" }}>SKIP LINK</strong> ·{" "}
                {t("pages.accessibility.focus.skipNote")}
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: "var(--ink)" }}>:FOCUS-VISIBLE</strong>{" "}
                · {t("pages.accessibility.focus.focusNote")}
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: "var(--ink)" }}>TRAP</strong> ·{" "}
                {t("pages.accessibility.focus.trapNote")}
              </p>
            </div>
          </Example>
        </div>
      </Section>

      {/* iv · Movimento */}
      <Section
        num="iv"
        title={<>{t("pages.accessibility.motion.title")}</>}
        kicker={t("pages.accessibility.motion.kicker")}
      >
        <p className="section-desc">{tr("pages.accessibility.motion.desc")}</p>
        <Alert variant="ok" title={t("pages.accessibility.motion.tipTitle")}>
          {tr("pages.accessibility.motion.tipBody")}
        </Alert>
      </Section>

      {/* v · Contraste */}
      <Section
        num="v"
        title={<>{t("pages.accessibility.contrast.title")}</>}
        kicker={t("pages.accessibility.contrast.kicker")}
      >
        <p className="section-desc">
          {tr("pages.accessibility.contrast.desc")}
        </p>
        <Example
          caption={t("pages.accessibility.contrast.caption")}
          tech="WCAG AA · 4.5:1"
          stack
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--space-3)",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--ink-soft)",
            }}
          >
            <ContrastRow
              label="ink / bg"
              ratio="14.8:1"
              ok
            />
            <ContrastRow
              label="ink-soft / bg"
              ratio="6.3:1"
              ok
            />
            <ContrastRow
              label="ink-faint / bg"
              ratio="3.1:1"
              warn
            />
            <ContrastRow
              label="accent / bg"
              ratio="4.6:1"
              ok
            />
          </div>
        </Example>
      </Section>

      {/* vi · ARIA & screen readers */}
      <Section
        num="vi"
        title={<>{t("pages.accessibility.aria.title")}</>}
        kicker={t("pages.accessibility.aria.kicker")}
      >
        <p className="section-desc">{tr("pages.accessibility.aria.desc")}</p>
        <Example
          caption={t("pages.accessibility.aria.caption")}
          tech="role · aria-* · semantics"
          stack
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader width={180}>
                  {t("pages.accessibility.aria.thComponent")}
                </TableHeader>
                <TableHeader>
                  {t("pages.accessibility.aria.thStrategy")}
                </TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {(raw("pages.accessibility.aria.items") || []).map((row, i) => (
                <TableRow key={i}>
                  <TableCell mono>{row.component}</TableCell>
                  <TableCell>{row.strategy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Example>
      </Section>
    </>
  );
}

/* ---------- helpers locais ---------- */

function Keys({ keys }) {
  // keys = "⌘ K" → split por espaço, render kbd separado por +
  const parts = (keys || "").split(" ").filter(Boolean);
  return (
    <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
      {parts.map((k, i) => (
        <span
          key={i}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 24,
            height: 22,
            padding: "0 6px",
            border: "1px solid var(--rule-soft)",
            background: "var(--bg)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--ink)",
            letterSpacing: 0,
          }}
        >
          {k}
        </span>
      ))}
    </span>
  );
}

function ContrastRow({ label, ratio, ok = false, warn = false }) {
  const color = ok ? "var(--ok)" : warn ? "var(--warn)" : "var(--ink-soft)";
  const mark = ok ? "✓" : warn ? "!" : "·";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 14px",
        border: "1px solid var(--rule-soft)",
        background: "var(--bg-panel)",
      }}
    >
      <span>{label}</span>
      <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
        <span style={{ color }}>{ratio}</span>
        <span style={{ color }}>{mark}</span>
      </span>
    </div>
  );
}
