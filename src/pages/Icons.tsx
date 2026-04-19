import { PageHead, Section } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";

const GLYPHS = [
  { g: "→", key: "arrow" },
  { g: "↳", key: "enter" },
  { g: "×", key: "close" },
  { g: "+", key: "add" },
  { g: "−", key: "remove" },
  { g: "⋯", key: "more" },
  { g: "§", key: "section" },
  { g: "¶", key: "paragraph" },
  { g: "✓", key: "check" },
  { g: "!", key: "alert" },
  { g: "i", key: "info" },
  { g: "?", key: "help" },
];

export default function Icons() {
  const { t, tr } = useT();

  return (
    <>
      <PageHead
        lead={t("pages.icons.lead")}
        title={
          <>
            {tr("pages.icons.titleA")}
            <em>{t("pages.icons.titleB")}</em>
          </>
        }
        metaLabel={t("pages.icons.metaLabel")}
        meta={t("pages.icons.meta")}
        intro={tr("pages.icons.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.icons.repertoireTitle")}</>}
        kicker={t("pages.icons.repertoireKicker")}
      >
        <div className="grid cols-4">
          {GLYPHS.map((g: any) => (
            <div
              key={g.key}
              style={{
                border: "1px solid var(--rule-soft)",
                background: "var(--bg-panel)",
                padding: "var(--space-5)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: 56,
                  color: "var(--ink)",
                  lineHeight: 1,
                }}
              >
                {g.g}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--ink-faint)",
                }}
              >
                {t(`pages.icons.names.${g.key}`)}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        num="ii"
        title={<>{t("pages.icons.contextTitle")}</>}
        kicker={t("pages.icons.contextKicker")}
      >
        <p className="section-desc">{t("pages.icons.contextDesc")}</p>
        <div
          style={{
            border: "1px solid var(--rule-soft)",
            background: "var(--bg-panel)",
            padding: "var(--space-6)",
            fontFamily: "var(--font-serif)",
            fontSize: 20,
            lineHeight: 1.6,
            color: "var(--ink)",
          }}
        >
          {t("pages.icons.contextPhrase")}{" "}
          <em style={{ color: "var(--accent)", fontStyle: "italic" }}>→</em>
          {t("pages.icons.contextPhraseB")}
          <em style={{ color: "var(--accent)", fontStyle: "italic" }}>↳</em>
          {t("pages.icons.contextPhraseC")}
        </div>
      </Section>
    </>
  );
}
