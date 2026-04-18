import { PageHead, Section } from "../ds/primitives.jsx";
import { useT } from "../lib/i18n.jsx";

export default function Typography() {
  const { t, tr } = useT();
  const sp = (k, f) => t(`pages.typography.specimens.${k}.${f}`);

  const SPECIMENS = [
    {
      meta: sp("display", "meta"),
      token: "clamp(40px, 6vw, 72px)",
      weight: sp("display", "weight"),
      style: {
        fontFamily: "var(--font-serif)",
        fontWeight: 300,
        fontSize: "clamp(40px, 6vw, 72px)",
        lineHeight: 0.95,
        letterSpacing: "-0.03em",
      },
      text: (
        <>
          {sp("display", "textA")}
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
            {sp("display", "textB")}
          </em>
          {sp("display", "textC")}
        </>
      ),
    },
    {
      meta: sp("headline", "meta"),
      token: "36px · italic num",
      weight: sp("headline", "weight"),
      style: {
        fontFamily: "var(--font-serif)",
        fontWeight: 300,
        fontSize: 36,
        letterSpacing: "-0.02em",
      },
      text: (
        <>
          {sp("headline", "textA")}
          <em style={{ fontStyle: "italic" }}>{sp("headline", "textB")}</em>
          {sp("headline", "textC")}
        </>
      ),
    },
    {
      meta: sp("title", "meta"),
      token: "24px",
      weight: sp("title", "weight"),
      style: {
        fontFamily: "var(--font-serif)",
        fontWeight: 300,
        fontSize: 24,
        letterSpacing: "-0.01em",
      },
      text: sp("title", "text"),
    },
    {
      meta: sp("body", "meta"),
      token: "16px / 1.6",
      weight: sp("body", "weight"),
      style: {
        fontFamily: "var(--font-serif)",
        fontSize: 16,
        lineHeight: 1.6,
        maxWidth: 520,
      },
      text: sp("body", "text"),
    },
    {
      meta: sp("caption", "meta"),
      token: "10px · mono",
      weight: sp("caption", "weight"),
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "var(--ink-soft)",
      },
      text: sp("caption", "text"),
    },
    {
      meta: sp("mono", "meta"),
      token: "12px · mono",
      weight: sp("mono", "weight"),
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--ink)",
      },
      text: sp("mono", "text"),
    },
  ];

  return (
    <>
      <PageHead
        lead={t("pages.typography.lead")}
        title={
          <>
            {tr("pages.typography.titleA")}
            <em>{t("pages.typography.titleB")}</em>
          </>
        }
        metaLabel={t("pages.typography.metaLabel")}
        meta={t("pages.typography.meta")}
        intro={tr("pages.typography.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.typography.specimensTitle")}</>}
        kicker={t("pages.typography.specimensKicker")}
      >
        <div
          style={{
            border: "1px solid var(--rule)",
            background: "var(--bg-panel)",
            padding: "var(--space-6)",
          }}
        >
          {SPECIMENS.map((s, i) => (
            <div key={i} className="type-row">
              <div className="type-meta">
                <b>{s.meta}</b>
                {s.token}
                <br />
                {s.weight}
              </div>
              <div className="type-specimen" style={s.style}>
                {s.text}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        num="ii"
        title={<>{t("pages.typography.scaleTitle")}</>}
        kicker={t("pages.typography.scaleKicker")}
      >
        <p className="section-desc">{t("pages.typography.scaleDesc")}</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "var(--space-3)",
            alignItems: "baseline",
          }}
        >
          {[10, 12, 14, 16, 20, 28].map((n) => (
            <div
              key={n}
              style={{
                border: "1px solid var(--rule-soft)",
                background: "var(--bg-panel)",
                padding: "var(--space-4)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: n + 8,
                  fontWeight: 300,
                  color: "var(--ink)",
                  lineHeight: 1.1,
                  marginBottom: 12,
                }}
              >
                Aa
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ink-faint)",
                }}
              >
                {n}px
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
