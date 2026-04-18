import { PageHead, Section } from "../ds/primitives.jsx";
import { useT } from "../lib/i18n.jsx";

export default function Principles() {
  const { t, tr, raw } = useT();
  const items = raw("pages.principles.items") || [];

  return (
    <>
      <PageHead
        lead={t("pages.principles.lead")}
        title={
          <>
            {tr("pages.principles.titleA")}
            <br />
            {tr("pages.principles.titleB")}
          </>
        }
        metaLabel={t("pages.principles.metaLabel")}
        meta={t("pages.principles.meta")}
        intro={tr("pages.principles.intro")}
      />

      <Section
        num="§"
        title={
          <>
            {tr("pages.principles.sectionTitleA")}
            <em>{t("pages.principles.sectionTitleB")}</em>
          </>
        }
        kicker={t("pages.principles.sectionKicker")}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
            border: "1px solid var(--rule)",
            background: "var(--bg-panel)",
          }}
        >
          {items.map((p, i) => (
            <div
              key={p.n}
              style={{
                padding: "28px 28px",
                borderBottom:
                  i < items.length - 2 ? "1px solid var(--rule-soft)" : "none",
                borderRight:
                  i % 2 === 0 ? "1px solid var(--rule-soft)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: 42,
                  fontWeight: 300,
                  color: "var(--accent)",
                  lineHeight: 1,
                  marginBottom: 10,
                }}
              >
                {p.n}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 300,
                  fontSize: 24,
                  letterSpacing: "-0.02em",
                  marginBottom: 10,
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "var(--ink-soft)",
                  maxWidth: 440,
                }}
              >
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
