import { PageHead, Button, Badge, Divider } from "../ds/primitives.jsx";
import { Card, CardKicker, CardTitle, CardBody, CardFooter } from "../ds/Card.jsx";
import { useT } from "../lib/i18n.jsx";

export default function Overview({ onNavigate }) {
  const { t, tr, raw } = useT();
  const cards = raw("pages.overview.cards") || [];
  const bk = (k) => t(`pages.overview.badges.${k}`);

  return (
    <>
      <PageHead
        lead={t("pages.overview.lead")}
        title={
          <>
            {tr("pages.overview.titleA")}
            <br />
            {tr("pages.overview.titleB")}
          </>
        }
        metaLabel={t("pages.overview.metaLabel")}
        meta={t("pages.overview.meta")}
        intro={tr("pages.overview.intro")}
      />

      <div className="grid cols-3" style={{ marginBottom: "var(--space-7)" }}>
        {cards.map((c, i) => (
          <Card key={i}>
            <CardKicker>{c.kicker}</CardKicker>
            <CardTitle>
              {c.titleA}
              <em>{c.titleB}</em>
            </CardTitle>
            <CardBody>{c.body}</CardBody>
            <CardFooter>
              <Button variant="link" onClick={() => onNavigate(c.to)}>
                {c.cta} →
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Divider>{t("pages.overview.indexLabel")}</Divider>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "var(--space-5)",
          alignItems: "start",
          marginTop: "var(--space-5)",
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
              marginBottom: 12,
            }}
          >
            {t("pages.overview.quickStartKicker")}
          </div>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--ink-soft)",
              marginBottom: 16,
              maxWidth: 520,
            }}
          >
            {tr("pages.overview.quickStartBody")}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button variant="primary" onClick={() => onNavigate("principles")}>
              {t("pages.overview.readPrinciples")}
            </Button>
            <Button onClick={() => onNavigate("buttons")}>
              {t("pages.overview.goComponents")}
            </Button>
            <Button variant="accent" onClick={() => onNavigate("code")}>
              {t("pages.overview.forDevs")}
            </Button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
            {t("pages.overview.glanceKicker")}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Badge>{bk("react")}</Badge>
            <Badge>{bk("vite")}</Badge>
            <Badge variant="solid">{bk("fraunces")}</Badge>
            <Badge variant="solid">{bk("mono")}</Badge>
            <Badge variant="accent" dot>{bk("editorial")}</Badge>
            <Badge variant="ok" dot>{bk("a11y")}</Badge>
            <Badge variant="info">{bk("light")}</Badge>
          </div>

          <blockquote
            style={{
              marginTop: 20,
              padding: "16px 20px",
              borderLeft: "2px solid var(--accent)",
              background: "var(--bg-panel)",
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: 18,
              lineHeight: 1.5,
              color: "var(--ink)",
            }}
          >
            {t("pages.overview.quote")}
            <div
              style={{
                marginTop: 10,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontStyle: "normal",
                color: "var(--ink-faint)",
              }}
            >
              {t("pages.overview.quoteAuthor")}
            </div>
          </blockquote>
        </div>
      </div>
    </>
  );
}
