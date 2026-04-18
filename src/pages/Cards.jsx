import {
  PageHead,
  Section,
  Card,
  Button,
  Badge,
  Example,
  Avatar,
} from "../ds/primitives.jsx";
import { useT } from "../lib/i18n.jsx";

export default function Cards() {
  const { t, tr, raw } = useT();
  const items = raw("pages.cards.items") || [];
  const sub = raw("pages.cards.subscription") || {};
  const aut = raw("pages.cards.author") || {};

  return (
    <>
      <PageHead
        lead={t("pages.cards.lead")}
        title={
          <>
            {tr("pages.cards.titleA")}
            <em>{t("pages.cards.titleB")}</em>
          </>
        }
        metaLabel={t("pages.cards.metaLabel")}
        meta={t("pages.cards.meta")}
        intro={tr("pages.cards.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.cards.editorial.title")}</>}
        kicker={t("pages.cards.editorial.kicker")}
      >
        <Example
          caption={t("pages.cards.editorial.caption")}
          tech="grid.cols-3"
          stack
          code={`<Card kicker="${items[0]?.kicker || ""}" title={<>${items[0]?.titleA || ""}<em>${items[0]?.titleB || ""}</em>${items[0]?.titleC || ""}</>}
  foot={<>${items[0]?.foot || ""}</>}>
  …
</Card>`}
        >
          <div className="grid cols-3" style={{ width: "100%" }}>
            {items.map((c, i) => (
              <Card
                key={i}
                kicker={c.kicker}
                title={
                  <>
                    {c.titleA}
                    <em>{c.titleB}</em>
                    {c.titleC}
                  </>
                }
                foot={<>{c.foot}</>}
              >
                {/* body may contain [em]...[/em] */}
                {(() => {
                  const body = c.body || "";
                  const parts = body.split(/\[em\]|\[\/em\]/);
                  return parts.map((p, j) =>
                    j % 2 === 1 ? (
                      <em key={j} style={{ fontStyle: "italic" }}>
                        {p}
                      </em>
                    ) : (
                      p
                    )
                  );
                })()}
              </Card>
            ))}
          </div>
        </Example>
      </Section>

      <Section
        num="ii"
        title={
          <>
            {tr("pages.cards.actions.titleA")}
            <em>{t("pages.cards.actions.titleB")}</em>
          </>
        }
        kicker={t("pages.cards.actions.kicker")}
      >
        <Example
          caption={t("pages.cards.actions.caption")}
          tech="foot + button"
          center
          code={`<Card kicker="${sub.kicker || ""}"
  title={<>${sub.titleA || ""}<em>${sub.titleB || ""}</em></>}
  foot={
    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
      <span>${sub.price || ""}</span>
      <Button variant="primary">${sub.cta || ""}</Button>
    </div>
  }
>
  ${sub.body || ""}
</Card>`}
        >
          <div style={{ maxWidth: 380, width: "100%" }}>
            <Card
              kicker={sub.kicker}
              title={
                <>
                  {sub.titleA}
                  <em>{sub.titleB}</em>
                </>
              }
              foot={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <span>{sub.price}</span>
                  <Button variant="primary">{sub.cta}</Button>
                </div>
              }
            >
              {sub.body}
            </Card>
          </div>
        </Example>
      </Section>

      <Section
        num="iii"
        title={<>{t("pages.cards.profile.title")}</>}
        kicker={t("pages.cards.profile.kicker")}
      >
        <Example
          caption={t("pages.cards.profile.caption")}
          tech="Avatar + Badge"
          center
          code={`<div style={{ display: "flex", gap: 20, padding: "var(--space-5)" }}>
  <Avatar size="lg" variant="solid" initials="JA" />
  <div>
    <div>${aut.role || ""}</div>
    <div>${aut.nameA || ""}<em>${aut.nameB || ""}</em></div>
    <Badge dot variant="accent">${aut.active || ""}</Badge>
    <Badge>${aut.count || ""}</Badge>
  </div>
</div>`}
        >
          <div
            style={{
              border: "1px solid var(--rule-soft)",
              background: "var(--bg-panel)",
              padding: "var(--space-5)",
              display: "flex",
              gap: 20,
              alignItems: "center",
              maxWidth: 480,
              width: "100%",
            }}
          >
            <Avatar size="lg" variant="solid" initials="JA" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--ink-faint)",
                  marginBottom: 4,
                }}
              >
                {aut.role}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 22,
                  fontWeight: 300,
                  letterSpacing: "-0.01em",
                  marginBottom: 10,
                }}
              >
                {aut.nameA}
                <em style={{ fontStyle: "italic" }}>{aut.nameB}</em>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <Badge dot variant="accent">{aut.active}</Badge>
                <Badge>{aut.count}</Badge>
              </div>
            </div>
          </div>
        </Example>
      </Section>
    </>
  );
}
