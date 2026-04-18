import { PageHead, Section } from "../ds/primitives.jsx";
import { useT } from "../lib/i18n.jsx";

const SCALE = [
  { token: "--space-1", px: 4 },
  { token: "--space-2", px: 8 },
  { token: "--space-3", px: 12 },
  { token: "--space-4", px: 16 },
  { token: "--space-5", px: 24 },
  { token: "--space-6", px: 32 },
  { token: "--space-7", px: 48 },
  { token: "--space-8", px: 64 },
  { token: "--space-9", px: 96 },
];

export default function Spacing() {
  const { t, tr, raw } = useT();
  const rules = raw("pages.spacing.rules") || [];

  return (
    <>
      <PageHead
        lead={t("pages.spacing.lead")}
        title={
          <>
            {tr("pages.spacing.titleA")}
            <em>{t("pages.spacing.titleB")}</em>
          </>
        }
        metaLabel={t("pages.spacing.metaLabel")}
        meta={t("pages.spacing.meta")}
        intro={tr("pages.spacing.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.spacing.scaleTitle")}</>}
        kicker={t("pages.spacing.scaleKicker")}
      >
        <div
          style={{
            border: "1px solid var(--rule-soft)",
            background: "var(--bg-panel)",
            padding: "var(--space-5) var(--space-6)",
          }}
        >
          {SCALE.map((s) => (
            <div key={s.token} className="space-row">
              <div className="space-token">{s.token}</div>
              <div className="space-bar" style={{ width: s.px }} />
              <div className="space-value">{s.px}px</div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        num="ii"
        title={<>{t("pages.spacing.gridTitle")}</>}
        kicker={t("pages.spacing.gridKicker")}
      >
        <p className="section-desc">{t("pages.spacing.gridDesc")}</p>
        <div
          style={{
            border: "1px solid var(--rule-soft)",
            background: "var(--bg-panel)",
            padding: "var(--space-5)",
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 10,
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: 80,
                background: "var(--accent-soft)",
                border: "1px solid var(--accent)",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingBottom: 6,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.12em",
                color: "var(--accent-ink)",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
          ))}
        </div>
      </Section>

      <Section
        num="iii"
        title={<>{t("pages.spacing.rulesTitle")}</>}
        kicker={t("pages.spacing.rulesKicker")}
      >
        <div className="grid cols-3">
          {rules.map((r) => (
            <div
              key={r.n}
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
                {r.n}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 18,
                  marginBottom: 8,
                }}
              >
                {r.t}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "var(--ink-soft)",
                }}
              >
                {r.b}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
