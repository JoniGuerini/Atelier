import { useState } from "react";
import {
  PageHead,
  Section,
  Tabs,
  Breadcrumbs,
  Example,
} from "../ds/primitives.jsx";
import { useT } from "../lib/i18n.jsx";

export default function TabsPage() {
  const { t, tr, raw } = useT();
  const [tab, setTab] = useState("foundations");

  const tabsItems = [
    {
      value: "foundations",
      label: t("pages.tabs.tabs.foundations.label"),
      body: t("pages.tabs.tabs.foundations.body"),
    },
    {
      value: "components",
      label: t("pages.tabs.tabs.components.label"),
      body: t("pages.tabs.tabs.components.body"),
    },
    {
      value: "patterns",
      label: t("pages.tabs.tabs.patterns.label"),
      body: t("pages.tabs.tabs.patterns.body"),
    },
  ];

  const crumbsA = raw("pages.tabs.crumbs.aBase") || [];
  const crumbsB = raw("pages.tabs.crumbs.bBase") || [];

  return (
    <>
      <PageHead
        lead={t("pages.tabs.lead")}
        title={
          <>
            {tr("pages.tabs.titleA")}
            <em>{t("pages.tabs.titleB")}</em>
          </>
        }
        metaLabel={t("pages.tabs.metaLabel")}
        meta={t("pages.tabs.meta")}
        intro={tr("pages.tabs.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.tabs.tabs.title")}</>}
        kicker={t("pages.tabs.tabs.kicker")}
      >
        <Example
          caption={t("pages.tabs.tabs.caption")}
          tech="state-driven"
          stack
          code={`const [tab, setTab] = useState("foundations");

<Tabs
  value={tab}
  onChange={setTab}
  items={[
    { value: "foundations", label: "${tabsItems[0].label}", panel: <p>…</p> },
    { value: "components",  label: "${tabsItems[1].label}", panel: <p>…</p> },
    { value: "patterns",    label: "${tabsItems[2].label}", panel: <p>…</p> },
  ]}
/>`}
        >
          <div style={{ width: "100%" }}>
            <Tabs
              value={tab}
              onChange={setTab}
              items={tabsItems.map((it) => ({
                value: it.value,
                label: it.label,
                panel: <p>{it.body}</p>,
              }))}
            />
          </div>
        </Example>
      </Section>

      <Section
        num="ii"
        title={<>{t("pages.tabs.crumbs.title")}</>}
        kicker={t("pages.tabs.crumbs.kicker")}
      >
        <Example
          caption={t("pages.tabs.crumbs.caption")}
          tech=".ds-crumbs"
          stack
          code={`<Breadcrumbs items={${JSON.stringify(crumbsA)}} />

<Breadcrumbs items={${JSON.stringify(crumbsB)}} />`}
        >
          <Breadcrumbs items={crumbsA} />
          <div style={{ height: 12 }} />
          <Breadcrumbs items={crumbsB} />
        </Example>
      </Section>
    </>
  );
}
