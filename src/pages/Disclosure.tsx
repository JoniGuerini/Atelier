import { useState } from "react";
import {
  PageHead,
  Section,
  Example,
  CompositionSection,
  Button,
} from "../ds/primitives.tsx";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../ds/Accordion.tsx";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "../ds/HoverCard.tsx";
import { Banner, BannerMessage, BannerAction } from "../ds/Banner.tsx";
import { SegmentedControl, SegmentedControlItem } from "../ds/SegmentedControl.tsx";
import { DescriptionList, DescriptionRow } from "../ds/DescriptionList.tsx";
import { Mark, Highlight } from "../ds/Mark.tsx";
import { useT } from "../lib/i18n.tsx";

export default function DisclosurePage() {
  const { t, tr } = useT();
  const [seg, setSeg] = useState("list");
  const [bannerOn, setBannerOn] = useState(true);

  return (
    <>
      <PageHead
        lead={t("pages.disclosure.lead")}
        title={
          <>
            {tr("pages.disclosure.titleA")}
            <em>{t("pages.disclosure.titleB")}</em>
          </>
        }
        metaLabel={t("pages.disclosure.metaLabel")}
        meta={t("pages.disclosure.meta")}
        intro={tr("pages.disclosure.intro")}
      />

      <Section num="i" title={<>{t("pages.disclosure.accordion.title")}</>} kicker={t("pages.disclosure.accordion.kicker")}>
        <p className="section-desc">{t("pages.disclosure.accordion.desc")}</p>
        <Example
          caption={t("pages.disclosure.accordion.caption")}
          tech="<Accordion> · <Collapse>"
          stack
          code={`<Accordion type="single" defaultValue="one" collapsible>
  <AccordionItem value="one">…</AccordionItem>
</Accordion>`}
        >
          <Accordion type="single" defaultValue="one" collapsible>
            <AccordionItem value="one">
              <AccordionHeader>
                <AccordionTrigger>{t("pages.disclosure.accordion.q1")}</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <p>{t("pages.disclosure.accordion.a1")}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="two">
              <AccordionHeader>
                <AccordionTrigger>{t("pages.disclosure.accordion.q2")}</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <p>{t("pages.disclosure.accordion.a2")}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Example>
      </Section>

      <Section num="ii" title={<>{t("pages.disclosure.collapsible.title")}</>} kicker={t("pages.disclosure.collapsible.kicker")}>
        <p className="section-desc">{t("pages.disclosure.collapsible.desc")}</p>
        <Example
          caption={t("pages.disclosure.collapsible.caption")}
          tech="<Collapsible>"
          stack
          code={`<Collapsible defaultOpen>
  <CollapsibleTrigger>…</CollapsibleTrigger>
  <CollapsibleContent>…</CollapsibleContent>
</Collapsible>`}
        >
          <Collapsible defaultOpen={false}>
            <CollapsibleTrigger>{t("pages.disclosure.collapsible.trigger")}</CollapsibleTrigger>
            <CollapsibleContent>
              <p>{t("pages.disclosure.collapsible.body")}</p>
            </CollapsibleContent>
          </Collapsible>
        </Example>
      </Section>

      <Section num="iii" title={<>{t("pages.disclosure.hover.title")}</>} kicker={t("pages.disclosure.hover.kicker")}>
        <p className="section-desc">{t("pages.disclosure.hover.desc")}</p>
        <Example
          caption={t("pages.disclosure.hover.caption")}
          tech="<HoverCard>"
          stack
          code={`<HoverCard openDelay={200} closeDelay={120}>
  <HoverCardTrigger><Button variant="ghost">…</Button></HoverCardTrigger>
  <HoverCardContent placement="bottom-start">…</HoverCardContent>
</HoverCard>`}
        >
          <HoverCard>
            <HoverCardTrigger>
              <Button variant="ghost" size="sm">
                {t("pages.disclosure.hover.trigger")}
              </Button>
            </HoverCardTrigger>
            <HoverCardContent placement="bottom-start">
              <p style={{ margin: 0 }}>{t("pages.disclosure.hover.panel")}</p>
            </HoverCardContent>
          </HoverCard>
        </Example>
      </Section>

      <Section num="iv" title={<>{t("pages.disclosure.banner.title")}</>} kicker={t("pages.disclosure.banner.kicker")}>
        <p className="section-desc">{t("pages.disclosure.banner.desc")}</p>
        <Example
          caption={t("pages.disclosure.banner.caption")}
          tech="<Banner>"
          stack
          code={`<Banner variant="accent" onDismiss={…}>
  <BannerMessage>…</BannerMessage>
  <BannerAction href="#">…</BannerAction>
</Banner>`}
        >
          <div style={{ display: "grid", gap: "var(--space-4)" }}>
            {bannerOn && (
              <Banner
                variant="accent"
                onDismiss={() => setBannerOn(false)}
                dismissLabel={t("pages.disclosure.banner.dismiss")}
                aria-label={t("pages.disclosure.banner.region")}
              >
                <BannerMessage>{t("pages.disclosure.banner.message")}</BannerMessage>
                <BannerAction href="#/changelog">{t("pages.disclosure.banner.action")}</BannerAction>
              </Banner>
            )}
            {!bannerOn && (
              <Button variant="ghost" size="sm" onClick={() => setBannerOn(true)}>
                {t("pages.disclosure.banner.reset")}
              </Button>
            )}
          </div>
        </Example>
      </Section>

      <Section num="v" title={<>{t("pages.disclosure.segmented.title")}</>} kicker={t("pages.disclosure.segmented.kicker")}>
        <p className="section-desc">{t("pages.disclosure.segmented.desc")}</p>
        <Example
          caption={t("pages.disclosure.segmented.caption")}
          tech="<SegmentedControl>"
          stack
          code={`<SegmentedControl value={v} onChange={setV} aria-label="…">
  <SegmentedControlItem value="list">List</SegmentedControlItem>
  <SegmentedControlItem value="board">Board</SegmentedControlItem>
</SegmentedControl>`}
        >
          <SegmentedControl
            value={seg}
            onChange={setSeg}
            aria-label={t("pages.disclosure.segmented.aria")}
          >
            <SegmentedControlItem value="list">{t("pages.disclosure.segmented.list")}</SegmentedControlItem>
            <SegmentedControlItem value="board">{t("pages.disclosure.segmented.board")}</SegmentedControlItem>
            <SegmentedControlItem value="timeline">{t("pages.disclosure.segmented.timeline")}</SegmentedControlItem>
          </SegmentedControl>
        </Example>
      </Section>

      <Section num="vi" title={<>{t("pages.disclosure.dl.title")}</>} kicker={t("pages.disclosure.dl.kicker")}>
        <p className="section-desc">{t("pages.disclosure.dl.desc")}</p>
        <Example
          caption={t("pages.disclosure.dl.caption")}
          tech="<DescriptionList>"
          stack
          code={`<DescriptionList>
  <DescriptionRow term="Ink">#1a1a1a</DescriptionRow>
</DescriptionList>`}
        >
          <DescriptionList>
            <DescriptionRow term={t("pages.disclosure.dl.row1t")}>{t("pages.disclosure.dl.row1d")}</DescriptionRow>
            <DescriptionRow term={t("pages.disclosure.dl.row2t")}>{t("pages.disclosure.dl.row2d")}</DescriptionRow>
            <DescriptionRow term={t("pages.disclosure.dl.row3t")}>{t("pages.disclosure.dl.row3d")}</DescriptionRow>
          </DescriptionList>
        </Example>
      </Section>

      <Section num="vii" title={<>{t("pages.disclosure.mark.title")}</>} kicker={t("pages.disclosure.mark.kicker")}>
        <p className="section-desc">{tr("pages.disclosure.mark.desc")}</p>
        <Example
          caption={t("pages.disclosure.mark.caption")}
          tech="<Mark> · <Highlight>"
          stack
          code={`<p>… <Mark>destaque</Mark> … <Highlight variant="accent">accent</Highlight></p>`}
        >
          <p className="section-desc" style={{ marginTop: 0 }}>
            {t("pages.disclosure.mark.line1")}{" "}
            <Mark>{t("pages.disclosure.mark.word1")}</Mark>{" "}
            {t("pages.disclosure.mark.line2")}{" "}
            <Highlight variant="accent">{t("pages.disclosure.mark.word2")}</Highlight>.
          </p>
        </Example>
      </Section>

      <CompositionSection
        num="viii"
        i18nPrefix="pages.disclosure.composition"
        root="Accordion"
        nodes={[
          {
            name: "AccordionItem",
            children: [
              { name: "AccordionHeader", children: [{ name: "AccordionTrigger" }] },
              { name: "AccordionContent" },
            ],
          },
          { name: "Collapsible" },
          { name: "CollapsibleTrigger" },
          { name: "CollapsibleContent" },
          { name: "HoverCard" },
          { name: "HoverCardTrigger" },
          { name: "HoverCardContent" },
          { name: "Banner" },
          { name: "BannerMessage" },
          { name: "BannerAction" },
          { name: "SegmentedControl" },
          { name: "SegmentedControlItem" },
          { name: "DescriptionList" },
          { name: "DescriptionRow" },
          { name: "Mark" },
        ]}
      />
    </>
  );
}
