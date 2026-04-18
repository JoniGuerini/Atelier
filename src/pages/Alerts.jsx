import { PageHead, Section, Alert, Example } from "../ds/primitives.jsx";
import { useT } from "../lib/i18n.jsx";

export default function Alerts() {
  const { t, tr } = useT();
  const a = (k, f) => t(`pages.alerts.${k}.${f}`);

  const make = (key, num, variant) => (
    <Section
      num={num}
      title={<>{a(key, "title")}</>}
      kicker={a(key, "kicker")}
    >
      <Example
        caption={a(key, "caption")}
        tech={`variant='${variant}'`}
        stack
        code={`<Alert variant="${variant}" title="${a(key, "alertTitle")}">
  ${a(key, "alertText")}
</Alert>`}
      >
        <Alert variant={variant} title={a(key, "alertTitle")}>
          {a(key, "alertText")}
        </Alert>
      </Example>
    </Section>
  );

  return (
    <>
      <PageHead
        lead={t("pages.alerts.lead")}
        title={
          <>
            {tr("pages.alerts.titleA")}
            <em>{t("pages.alerts.titleB")}</em>
          </>
        }
        metaLabel={t("pages.alerts.metaLabel")}
        meta={t("pages.alerts.meta")}
        intro={tr("pages.alerts.intro")}
      />

      {make("info", "i", "info")}
      {make("ok", "ii", "ok")}
      {make("warn", "iii", "warn")}
      {make("danger", "iv", "danger")}
    </>
  );
}
