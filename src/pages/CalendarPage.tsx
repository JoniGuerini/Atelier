import { useState } from "react";
import {
  PageHead,
  Section,
  Example,
  CompositionSection,
} from "../ds/primitives.tsx";
import { Calendar, type CalendarRange } from "../ds/Calendar.tsx";
import { addDays, today } from "../ds/calendarUtils.ts";
import { useT } from "../lib/i18n.tsx";

export default function CalendarPage() {
  const { t, tr } = useT();
  const [single, setSingle] = useState<Date | null>(today());
  const [range, setRange] = useState<CalendarRange>([
    today(),
    addDays(today(), 5),
  ]);
  const [multi, setMulti] = useState<Date[]>([
    today(),
    addDays(today(), 2),
    addDays(today(), 7),
  ]);
  const [bounded, setBounded] = useState<Date | null>(null);

  // Disabled days: weekends (sábado=6, domingo=0)
  const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;

  return (
    <>
      <PageHead
        lead={t("pages.calendar.lead")}
        title={
          <>
            {tr("pages.calendar.titleA")}
            <em>{t("pages.calendar.titleB")}</em>
          </>
        }
        metaLabel={t("pages.calendar.metaLabel")}
        meta={t("pages.calendar.meta")}
        intro={tr("pages.calendar.intro")}
      />

      {/* i · Single */}
      <Section
        num="i"
        title={<>{t("pages.calendar.single.title")}</>}
        kicker={t("pages.calendar.single.kicker")}
      >
        <p className="section-desc">{tr("pages.calendar.single.desc")}</p>
        <Example
          caption={t("pages.calendar.single.caption")}
          tech="single"
          stack
          code={`const [date, setDate] = useState<Date | null>(today());

<Calendar value={date} onChange={setDate} />`}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "var(--space-4) 0",
            }}
          >
            <Calendar
              value={single}
              onChange={setSingle}
              ariaLabel={t("pages.calendar.single.label")}
            />
          </div>
        </Example>
      </Section>

      {/* ii · Range */}
      <Section
        num="ii"
        title={<>{t("pages.calendar.range.title")}</>}
        kicker={t("pages.calendar.range.kicker")}
      >
        <p className="section-desc">{tr("pages.calendar.range.desc")}</p>
        <Example
          caption={t("pages.calendar.range.caption")}
          tech="mode=range"
          stack
          code={`<Calendar
  mode="range"
  value={[start, end]}
  onChange={setRange}
/>`}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "var(--space-4) 0",
            }}
          >
            <Calendar
              mode="range"
              value={range}
              onChange={setRange}
              ariaLabel={t("pages.calendar.range.label")}
            />
          </div>
        </Example>
      </Section>

      {/* iii · Multiple */}
      <Section
        num="iii"
        title={<>{t("pages.calendar.multiple.title")}</>}
        kicker={t("pages.calendar.multiple.kicker")}
      >
        <p className="section-desc">{tr("pages.calendar.multiple.desc")}</p>
        <Example
          caption={t("pages.calendar.multiple.caption", {
            n: String(multi.length),
          })}
          tech="mode=multiple"
          stack
          code={`<Calendar
  mode="multiple"
  value={dates}
  onChange={setDates}
/>`}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "var(--space-4) 0",
            }}
          >
            <Calendar
              mode="multiple"
              value={multi}
              onChange={setMulti}
              ariaLabel={t("pages.calendar.multiple.label")}
            />
          </div>
        </Example>
      </Section>

      {/* iv · Min/max */}
      <Section
        num="iv"
        title={<>{t("pages.calendar.minmax.title")}</>}
        kicker={t("pages.calendar.minmax.kicker")}
      >
        <p className="section-desc">{tr("pages.calendar.minmax.desc")}</p>
        <Example
          caption={t("pages.calendar.minmax.caption")}
          tech="minDate + maxDate"
          stack
          code={`<Calendar
  value={date}
  onChange={setDate}
  minDate={today()}
  maxDate={addDays(today(), 30)}
/>`}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "var(--space-4) 0",
            }}
          >
            <Calendar
              value={bounded}
              onChange={setBounded}
              minDate={today()}
              maxDate={addDays(today(), 30)}
              ariaLabel={t("pages.calendar.minmax.label")}
            />
          </div>
        </Example>
      </Section>

      {/* v · Disabled days (weekends) */}
      <Section
        num="v"
        title={<>{t("pages.calendar.disabled.title")}</>}
        kicker={t("pages.calendar.disabled.kicker")}
      >
        <p className="section-desc">{tr("pages.calendar.disabled.desc")}</p>
        <Example
          caption={t("pages.calendar.disabled.caption")}
          tech="disabledDays"
          stack
          code={`const isWeekend = (d) => d.getDay() === 0 || d.getDay() === 6;

<Calendar
  value={date}
  onChange={setDate}
  disabledDays={isWeekend}
/>`}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "var(--space-4) 0",
            }}
          >
            <Calendar
              value={null}
              onChange={() => {}}
              disabledDays={isWeekend}
              ariaLabel={t("pages.calendar.disabled.label")}
            />
          </div>
        </Example>
      </Section>

      <CompositionSection
        num="vi"
        i18nPrefix="pages.calendar.composition"
        root="Calendar"
        nodes={[]}
      />
    </>
  );
}
