import {
  PageHead,
  Section,
  Example,
  CompositionSection,
} from "../ds/primitives.tsx";
import { Alert } from "../ds/Alert.tsx";
import { useT } from "../lib/i18n.tsx";

export default function Alerts() {
  const { t, tr } = useT();
  const a = (k: any, f: any) => t(`pages.alerts.${k}.${f}`);

  const make = (key: any, num: any, variant: any) => (
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

      <CompositionSection
        num="v"
        i18nPrefix="pages.alerts.composition"
        root="Alert"
        nodes={[
          { name: "AlertMark" },
          {
            name: "AlertContent",
            children: [
              { name: "AlertTitle" },
              { name: "AlertDescription" },
              { name: "AlertActions" },
            ],
          },
        ]}
      />
    </>
  );
}
