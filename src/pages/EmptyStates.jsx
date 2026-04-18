import { PageHead, Section, Button, Example } from "../ds/primitives.jsx";
import { useT } from "../lib/i18n.jsx";

function Empty({ glyph, title, body, cta }) {
  return (
    <div
      style={{
        border: "1px solid var(--rule-soft)",
        background: "var(--bg-panel)",
        padding: "var(--space-8) var(--space-6)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 14,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: 96,
          color: "var(--accent)",
          lineHeight: 0.9,
          marginBottom: 4,
        }}
      >
        {glyph}
      </div>
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 26,
          fontWeight: 300,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 15,
          lineHeight: 1.6,
          color: "var(--ink-soft)",
          maxWidth: 420,
        }}
      >
        {body}
      </div>
      {cta && <div style={{ marginTop: 10 }}>{cta}</div>}
    </div>
  );
}

export default function EmptyStates() {
  const { t, tr } = useT();

  const E = ({ k, glyph, num, variant }) => (
    <Section
      num={num}
      title={<>{t(`pages.emptyStates.${k}.title`)}</>}
      kicker={t(`pages.emptyStates.${k}.kicker`)}
    >
      <Example
        caption={t(`pages.emptyStates.${k}.caption`)}
        tech="pattern"
        stack
        code={`<Empty
  glyph="${glyph}"
  title={<>${t(`pages.emptyStates.${k}.emptyTitleA`)}<em>${t(`pages.emptyStates.${k}.emptyTitleB`)}</em>${t(`pages.emptyStates.${k}.emptyTitleC`)}</>}
  body="${t(`pages.emptyStates.${k}.emptyBody`)}"
  cta={<Button variant="${variant}">${t(`pages.emptyStates.${k}.cta`)}</Button>}
/>`}
      >
        <Empty
          glyph={glyph}
          title={
            <>
              {t(`pages.emptyStates.${k}.emptyTitleA`)}
              <em>{t(`pages.emptyStates.${k}.emptyTitleB`)}</em>
              {t(`pages.emptyStates.${k}.emptyTitleC`)}
            </>
          }
          body={t(`pages.emptyStates.${k}.emptyBody`)}
          cta={
            <Button variant={variant}>
              {t(`pages.emptyStates.${k}.cta`)}
            </Button>
          }
        />
      </Example>
    </Section>
  );

  return (
    <>
      <PageHead
        lead={t("pages.emptyStates.lead")}
        title={
          <>
            {tr("pages.emptyStates.titleA")}
            <em>{t("pages.emptyStates.titleB")}</em>
          </>
        }
        metaLabel={t("pages.emptyStates.metaLabel")}
        meta={t("pages.emptyStates.meta")}
        intro={tr("pages.emptyStates.intro")}
      />

      <E k="first" glyph="¶" num="i" variant="primary" />
      <E k="search" glyph="?" num="ii" variant="default" />
      <E k="offline" glyph="—" num="iii" variant="accent" />
    </>
  );
}
