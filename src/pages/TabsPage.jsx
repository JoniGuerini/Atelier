import { useState } from "react";
import {
  PageHead,
  Section,
  Breadcrumbs,
  Example,
  CompositionSection,
} from "../ds/primitives.jsx";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "../ds/Tabs.jsx";
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

<Tabs value={tab} onChange={setTab}>
  <TabList>
    <Tab value="foundations">${tabsItems[0].label}</Tab>
    <Tab value="components">${tabsItems[1].label}</Tab>
    <Tab value="patterns">${tabsItems[2].label}</Tab>
  </TabList>
  <TabPanels>
    <TabPanel value="foundations"><p>…</p></TabPanel>
    <TabPanel value="components"><p>…</p></TabPanel>
    <TabPanel value="patterns"><p>…</p></TabPanel>
  </TabPanels>
</Tabs>`}
        >
          <div style={{ width: "100%" }}>
            <Tabs value={tab} onChange={setTab}>
              <TabList>
                {tabsItems.map((it) => (
                  <Tab key={it.value} value={it.value}>
                    {it.label}
                  </Tab>
                ))}
              </TabList>
              <TabPanels>
                {tabsItems.map((it) => (
                  <TabPanel key={it.value} value={it.value}>
                    <p>{it.body}</p>
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
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

      <CompositionSection
        num="iii"
        i18nPrefix="pages.tabs.composition"
        root="Tabs"
        nodes={[
          { name: "TabList", children: [{ name: "Tab" }] },
          { name: "TabPanels", children: [{ name: "TabPanel" }] },
        ]}
      />
    </>
  );
}
