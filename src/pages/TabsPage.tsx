import { useState } from "react";
import {
  PageHead,
  Section,
  Example,
  CompositionSection,
} from "../ds/primitives.tsx";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "../ds/Tabs.tsx";
import type { TabsVariant } from "../ds/types.ts";
import { useT } from "../lib/i18n.tsx";

export default function TabsPage() {
  const { t, tr } = useT();
  const [tab, setTab] = useState("foundations");
  const [enclosed, setEnclosed] = useState("foundations");
  const [pills, setPills] = useState("foundations");
  const [segmented, setSegmented] = useState("foundations");
  const [minimal, setMinimal] = useState("foundations");
  const [vertical, setVertical] = useState("foundations");
  const [extras, setExtras] = useState("foundations");

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

  /* Helper que renderiza o conjunto Tabs+Panels para uma variante.
     Centraliza pra evitar repetição em cada Section. */
  const renderTabs = (
    variant: TabsVariant,
    value: string,
    onChange: (v: string) => void,
  ) => (
    <div style={{ width: "100%" }}>
      <Tabs value={value} onChange={onChange} variant={variant}>
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
  );

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

      {/* i · Underline (default) */}
      <Section
        num="i"
        title={<>{t("pages.tabs.variants.underline.title")}</>}
        kicker={t("pages.tabs.variants.underline.kicker")}
      >
        <p className="section-desc">
          {tr("pages.tabs.variants.underline.desc")}
        </p>
        <Example
          caption={t("pages.tabs.variants.underline.caption")}
          tech="default"
          stack
          code={`<Tabs value={tab} onChange={setTab}>
  <TabList>
    <Tab value="foundations">${tabsItems[0].label}</Tab>
    <Tab value="components">${tabsItems[1].label}</Tab>
    <Tab value="patterns">${tabsItems[2].label}</Tab>
  </TabList>
  <TabPanels>
    <TabPanel value="foundations">…</TabPanel>
    <TabPanel value="components">…</TabPanel>
    <TabPanel value="patterns">…</TabPanel>
  </TabPanels>
</Tabs>`}
        >
          {renderTabs("underline", tab, setTab)}
        </Example>
      </Section>

      {/* ii · Enclosed */}
      <Section
        num="ii"
        title={<>{t("pages.tabs.variants.enclosed.title")}</>}
        kicker={t("pages.tabs.variants.enclosed.kicker")}
      >
        <p className="section-desc">
          {tr("pages.tabs.variants.enclosed.desc")}
        </p>
        <Example
          caption={t("pages.tabs.variants.enclosed.caption")}
          tech="enclosed"
          stack
          code={`<Tabs value={tab} onChange={setTab} variant="enclosed">
  <TabList>…</TabList>
  <TabPanels>…</TabPanels>
</Tabs>`}
        >
          {renderTabs("enclosed", enclosed, setEnclosed)}
        </Example>
      </Section>

      {/* iii · Pills */}
      <Section
        num="iii"
        title={<>{t("pages.tabs.variants.pills.title")}</>}
        kicker={t("pages.tabs.variants.pills.kicker")}
      >
        <p className="section-desc">
          {tr("pages.tabs.variants.pills.desc")}
        </p>
        <Example
          caption={t("pages.tabs.variants.pills.caption")}
          tech="pills"
          stack
          code={`<Tabs value={tab} onChange={setTab} variant="pills">…</Tabs>`}
        >
          {renderTabs("pills", pills, setPills)}
        </Example>
      </Section>

      {/* iv · Segmented */}
      <Section
        num="iv"
        title={<>{t("pages.tabs.variants.segmented.title")}</>}
        kicker={t("pages.tabs.variants.segmented.kicker")}
      >
        <p className="section-desc">
          {tr("pages.tabs.variants.segmented.desc")}
        </p>
        <Example
          caption={t("pages.tabs.variants.segmented.caption")}
          tech="segmented"
          stack
          code={`<Tabs value={tab} onChange={setTab} variant="segmented">…</Tabs>`}
        >
          {renderTabs("segmented", segmented, setSegmented)}
        </Example>
      </Section>

      {/* v · Minimal */}
      <Section
        num="v"
        title={<>{t("pages.tabs.variants.minimal.title")}</>}
        kicker={t("pages.tabs.variants.minimal.kicker")}
      >
        <p className="section-desc">
          {tr("pages.tabs.variants.minimal.desc")}
        </p>
        <Example
          caption={t("pages.tabs.variants.minimal.caption")}
          tech="minimal"
          stack
          code={`<Tabs value={tab} onChange={setTab} variant="minimal">…</Tabs>`}
        >
          {renderTabs("minimal", minimal, setMinimal)}
        </Example>
      </Section>

      {/* vi · Vertical orientation */}
      <Section
        num="vi"
        title={<>{t("pages.tabs.variants.vertical.title")}</>}
        kicker={t("pages.tabs.variants.vertical.kicker")}
      >
        <p className="section-desc">
          {tr("pages.tabs.variants.vertical.desc")}
        </p>
        <Example
          caption={t("pages.tabs.variants.vertical.caption")}
          tech="vertical"
          stack
          code={`<Tabs value={tab} onChange={setTab} orientation="vertical">…</Tabs>`}
        >
          <div style={{ width: "100%" }}>
            <Tabs
              value={vertical}
              onChange={setVertical}
              orientation="vertical"
            >
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

      {/* vii · Extras (glyph + count) */}
      <Section
        num="vii"
        title={<>{t("pages.tabs.variants.extras.title")}</>}
        kicker={t("pages.tabs.variants.extras.kicker")}
      >
        <p className="section-desc">
          {tr("pages.tabs.variants.extras.desc")}
        </p>
        <Example
          caption={t("pages.tabs.variants.extras.caption")}
          tech="glyph + count"
          stack
          code={`<Tabs value={tab} onChange={setTab}>
  <TabList>
    <Tab value="foundations" glyph="§" count={4}>${tabsItems[0].label}</Tab>
    <Tab value="components" glyph="¶" count={13}>${tabsItems[1].label}</Tab>
    <Tab value="patterns" glyph="✦" count={5}>${tabsItems[2].label}</Tab>
  </TabList>
</Tabs>`}
        >
          <div style={{ width: "100%" }}>
            <Tabs value={extras} onChange={setExtras}>
              <TabList>
                <Tab value="foundations" glyph="§" count={4}>
                  {tabsItems[0].label}
                </Tab>
                <Tab value="components" glyph="¶" count={13}>
                  {tabsItems[1].label}
                </Tab>
                <Tab value="patterns" glyph="✦" count={5}>
                  {tabsItems[2].label}
                </Tab>
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

      <CompositionSection
        num="viii"
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
