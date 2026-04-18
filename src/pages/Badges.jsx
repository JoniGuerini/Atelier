import { PageHead, Section, Badge, Example } from "../ds/primitives.jsx";
import { useT } from "../lib/i18n.jsx";

export default function Badges() {
  const { t, tr } = useT();
  const lb = (k) => t(`pages.badges.labels.${k}`);

  return (
    <>
      <PageHead
        lead={t("pages.badges.lead")}
        title={
          <>
            {tr("pages.badges.titleA")}
            <em>{t("pages.badges.titleB")}</em>
          </>
        }
        metaLabel={t("pages.badges.metaLabel")}
        meta={t("pages.badges.meta")}
        intro={tr("pages.badges.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.badges.variants.title")}</>}
        kicker={t("pages.badges.variants.kicker")}
      >
        <Example
          caption={t("pages.badges.variants.caption")}
          tech=".ds-badge"
          center
          code={`<Badge>${lb("default")}</Badge>
<Badge variant="solid">${lb("solid")}</Badge>
<Badge variant="accent">${lb("accent")}</Badge>
<Badge variant="ok">${lb("ok")}</Badge>
<Badge variant="warn">${lb("warn")}</Badge>
<Badge variant="info">${lb("info")}</Badge>`}
        >
          <Badge>{lb("default")}</Badge>
          <Badge variant="solid">{lb("solid")}</Badge>
          <Badge variant="accent">{lb("accent")}</Badge>
          <Badge variant="ok">{lb("ok")}</Badge>
          <Badge variant="warn">{lb("warn")}</Badge>
          <Badge variant="info">{lb("info")}</Badge>
        </Example>
      </Section>

      <Section
        num="ii"
        title={
          <>
            {tr("pages.badges.dot.titleA")}
            <em>{t("pages.badges.dot.titleB")}</em>
          </>
        }
        kicker={t("pages.badges.dot.kicker")}
      >
        <Example
          caption={t("pages.badges.dot.caption")}
          tech="dot prop"
          center
          code={`<Badge dot variant="ok">${lb("published")}</Badge>
<Badge dot variant="warn">${lb("draft")}</Badge>
<Badge dot variant="accent">${lb("edited")}</Badge>
<Badge dot>${lb("archived")}</Badge>`}
        >
          <Badge dot variant="ok">{lb("published")}</Badge>
          <Badge dot variant="warn">{lb("draft")}</Badge>
          <Badge dot variant="accent">{lb("edited")}</Badge>
          <Badge dot>{lb("archived")}</Badge>
        </Example>
      </Section>

      <Section
        num="iii"
        title={<>{t("pages.badges.context.title")}</>}
        kicker={t("pages.badges.context.kicker")}
      >
        <Example
          caption={t("pages.badges.context.caption")}
          tech="pattern"
          code={`<div style={{
  display: "flex",
  alignItems: "center",
  gap: 14,
  padding: "var(--space-5)",
  border: "1px solid var(--rule-soft)",
  background: "var(--bg-panel)",
}}>
  <Badge dot variant="accent">${lb("new")}</Badge>
  <span style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 300 }}>
    ${t("pages.badges.contextTitleA")}<em>${t("pages.badges.contextTitleB")}</em>${t("pages.badges.contextTitleC")}
  </span>
  <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 10 }}>
    ${t("pages.badges.contextDate")}
  </span>
</div>`}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "var(--space-5)",
              border: "1px solid var(--rule-soft)",
              background: "var(--bg-panel)",
              width: "100%",
            }}
          >
            <Badge dot variant="accent">{lb("new")}</Badge>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 22,
                fontWeight: 300,
                letterSpacing: "-0.01em",
              }}
            >
              {t("pages.badges.contextTitleA")}
              <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
                {t("pages.badges.contextTitleB")}
              </em>
              {t("pages.badges.contextTitleC")}
            </span>
            <span
              style={{
                marginLeft: "auto",
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--ink-faint)",
              }}
            >
              {t("pages.badges.contextDate")}
            </span>
          </div>
        </Example>
      </Section>
    </>
  );
}
