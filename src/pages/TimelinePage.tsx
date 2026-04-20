import { useState } from "react";
import {
  PageHead,
  Section,
  Example,
  CompositionSection,
} from "../ds/primitives.tsx";
import {
  Timeline,
  TimelineItem,
  TimelineMarker,
  TimelineContent,
  TimelineDate,
  TimelineTitle,
  TimelineNow,
} from "../ds/Timeline.tsx";
import { useT } from "../lib/i18n.tsx";

type TimelineDemoItem = { date?: string; title: string; body: string };

export default function TimelinePage() {
  const { t, tr, raw } = useT();
  const [variant, setVariant] = useState<"vertical" | "horizontal">("vertical");

  const verticalItems = (raw("pages.timeline.vertical.demo.items") ||
    []) as TimelineDemoItem[];
  const verticalNow = t("pages.timeline.vertical.demo.nowLabel");

  const markerItems = (raw("pages.timeline.markers.demo.items") ||
    []) as TimelineDemoItem[];

  const horizontalItems = (raw("pages.timeline.horizontal.demo.items") ||
    []) as TimelineDemoItem[];
  const toggleVerticalLabel = t("pages.timeline.horizontal.demo.toggleVertical");
  const toggleHorizontalLabel = t(
    "pages.timeline.horizontal.demo.toggleHorizontal"
  );

  return (
    <>
      <PageHead
        lead={t("pages.timeline.lead")}
        title={
          <>
            {tr("pages.timeline.titleA")}
            <em>{t("pages.timeline.titleB")}</em>
          </>
        }
        metaLabel={t("pages.timeline.metaLabel")}
        meta={t("pages.timeline.meta")}
        intro={tr("pages.timeline.intro")}
      />

      {/* i · Vertical default */}
      <Section
        num="i"
        title={<>{t("pages.timeline.vertical.title")}</>}
        kicker={t("pages.timeline.vertical.kicker")}
      >
        <Example
          caption={t("pages.timeline.vertical.caption")}
          tech="orientation='vertical'"
          stack
          code={`<Timeline>
  <TimelineItem state="past">
    <TimelineMarker variant="dot" />
    <TimelineContent>
      <TimelineDate>12 Mai 2025</TimelineDate>
      <TimelineTitle>Lançamento v1</TimelineTitle>
      <p>...</p>
    </TimelineContent>
  </TimelineItem>
  <TimelineNow />
  <TimelineItem state="future">
    <TimelineMarker variant="hollow" />
    ...
  </TimelineItem>
</Timeline>`}
        >
          <Timeline>
            {verticalItems.slice(0, 3).map((item, i) => (
              <TimelineItem
                key={i}
                state={i === 2 ? "present" : "past"}
              >
                <TimelineMarker variant="dot" />
                <TimelineContent>
                  <TimelineDate>{item.date}</TimelineDate>
                  <TimelineTitle>{item.title}</TimelineTitle>
                  <p>{item.body}</p>
                </TimelineContent>
              </TimelineItem>
            ))}
            <TimelineNow label={verticalNow} />
            {verticalItems.slice(3).map((item, i) => (
              <TimelineItem key={`f-${i}`} state="future">
                <TimelineMarker variant="hollow" />
                <TimelineContent>
                  <TimelineDate>{item.date}</TimelineDate>
                  <TimelineTitle>{item.title}</TimelineTitle>
                  <p>{item.body}</p>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Example>
      </Section>

      {/* ii · Markers */}
      <Section
        num="ii"
        title={<>{t("pages.timeline.markers.title")}</>}
        kicker={t("pages.timeline.markers.kicker")}
      >
        <Example
          caption={t("pages.timeline.markers.caption")}
          tech="dot · hollow · number · glyph"
          stack
          code={`<TimelineMarker variant="dot" />
<TimelineMarker variant="hollow" />
<TimelineMarker variant="number" n={1} />
<TimelineMarker variant="glyph">★</TimelineMarker>`}
        >
          <Timeline>
            {markerItems.map((item, i) => {
              const variants = ["dot", "hollow", "number", "glyph"] as const;
              const v = variants[i] ?? "dot";
              return (
                <TimelineItem key={i}>
                  {v === "number" ? (
                    <TimelineMarker variant="number" n={3} />
                  ) : v === "glyph" ? (
                    <TimelineMarker variant="glyph">★</TimelineMarker>
                  ) : (
                    <TimelineMarker variant={v} />
                  )}
                  <TimelineContent>
                    <TimelineTitle>{item.title}</TimelineTitle>
                    <p>{item.body}</p>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        </Example>
      </Section>

      {/* iii · Horizontal */}
      <Section
        num="iii"
        title={<>{t("pages.timeline.horizontal.title")}</>}
        kicker={t("pages.timeline.horizontal.kicker")}
      >
        <Example
          caption={t("pages.timeline.horizontal.caption")}
          tech="orientation='horizontal'"
          stack
          code={`<Timeline orientation="horizontal">
  <TimelineItem>
    <TimelineMarker variant="number" n={1} />
    <TimelineContent>...</TimelineContent>
  </TimelineItem>
  ...
</Timeline>`}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                onClick={() => setVariant("vertical")}
                className="ds-tabs-trigger"
                style={{
                  padding: "4px 10px",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  border: "1px solid var(--rule-soft)",
                  background:
                    variant === "vertical" ? "var(--bg-soft)" : "transparent",
                  color: "var(--ink)",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                }}
              >
                {toggleVerticalLabel}
              </button>
              <button
                type="button"
                onClick={() => setVariant("horizontal")}
                style={{
                  padding: "4px 10px",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  border: "1px solid var(--rule-soft)",
                  background:
                    variant === "horizontal" ? "var(--bg-soft)" : "transparent",
                  color: "var(--ink)",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                }}
              >
                {toggleHorizontalLabel}
              </button>
            </div>
            <Timeline orientation={variant}>
              {horizontalItems.map((item, i) => {
                const state =
                  i < 2 ? "past" : i === 2 ? "present" : "future";
                return (
                  <TimelineItem key={i} state={state}>
                    <TimelineMarker variant="number" n={i + 1} />
                    <TimelineContent>
                      <TimelineDate>{item.date}</TimelineDate>
                      <TimelineTitle>{item.title}</TimelineTitle>
                      <p>{item.body}</p>
                    </TimelineContent>
                  </TimelineItem>
                );
              })}
            </Timeline>
          </div>
        </Example>
      </Section>

      <CompositionSection
        num="iv"
        i18nPrefix="pages.timeline.composition"
        root="Timeline"
        nodes={[
          {
            name: "TimelineItem",
            children: [
              { name: "TimelineMarker (dot/hollow/number/glyph)" },
              {
                name: "TimelineContent",
                children: [
                  { name: "TimelineDate" },
                  { name: "TimelineTitle" },
                  { name: t("pages.timeline.composition.freeChildren") },
                ],
              },
            ],
          },
          { name: "TimelineNow" },
        ]}
      />
    </>
  );
}
