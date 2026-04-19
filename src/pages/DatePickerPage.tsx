import { useState } from "react";
import {
  PageHead,
  Section,
  Example,
  CompositionSection,
  Field,
} from "../ds/primitives.tsx";
import { DatePicker, DateRangePicker } from "../ds/DatePicker.tsx";
import { addDays, today } from "../ds/calendarUtils.ts";
import type { CalendarRange } from "../ds/Calendar.tsx";
import { useT } from "../lib/i18n.tsx";

export default function DatePickerPage() {
  const { t, tr } = useT();
  const [date, setDate] = useState<Date | null>(null);
  const [iso, setIso] = useState<Date | null>(today());
  const [bounded, setBounded] = useState<Date | null>(null);
  const [range, setRange] = useState<CalendarRange>([null, null]);
  const [bookedRange, setBookedRange] = useState<CalendarRange>([
    today(),
    addDays(today(), 4),
  ]);

  const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;

  return (
    <>
      <PageHead
        lead={t("pages.datePicker.lead")}
        title={
          <>
            {tr("pages.datePicker.titleA")}
            <em>{t("pages.datePicker.titleB")}</em>
          </>
        }
        metaLabel={t("pages.datePicker.metaLabel")}
        meta={t("pages.datePicker.meta")}
        intro={tr("pages.datePicker.intro")}
      />

      {/* i · Single date */}
      <Section
        num="i"
        title={<>{t("pages.datePicker.basic.title")}</>}
        kicker={t("pages.datePicker.basic.kicker")}
      >
        <p className="section-desc">{tr("pages.datePicker.basic.desc")}</p>
        <Example
          caption={t("pages.datePicker.basic.caption")}
          tech="single"
          stack
          code={`<DatePicker value={date} onChange={setDate} />`}
        >
          <div style={{ width: "100%", maxWidth: 280 }}>
            <Field label={t("pages.datePicker.basic.field")}>
              <DatePicker
                value={date}
                onChange={setDate}
                placeholder="dd/mm/aaaa"
                ariaLabel={t("pages.datePicker.basic.field")}
              />
            </Field>
          </div>
        </Example>
      </Section>

      {/* ii · Format ISO */}
      <Section
        num="ii"
        title={<>{t("pages.datePicker.format.title")}</>}
        kicker={t("pages.datePicker.format.kicker")}
      >
        <p className="section-desc">{tr("pages.datePicker.format.desc")}</p>
        <Example
          caption={t("pages.datePicker.format.caption")}
          tech='format="YYYY-MM-DD"'
          stack
          code={`<DatePicker
  value={date}
  onChange={setDate}
  format="YYYY-MM-DD"
/>`}
        >
          <div style={{ width: "100%", maxWidth: 280 }}>
            <Field label={t("pages.datePicker.format.field")}>
              <DatePicker
                value={iso}
                onChange={setIso}
                format="YYYY-MM-DD"
                ariaLabel={t("pages.datePicker.format.field")}
              />
            </Field>
          </div>
        </Example>
      </Section>

      {/* iii · Bounded + disabled days */}
      <Section
        num="iii"
        title={<>{t("pages.datePicker.bounded.title")}</>}
        kicker={t("pages.datePicker.bounded.kicker")}
      >
        <p className="section-desc">{tr("pages.datePicker.bounded.desc")}</p>
        <Example
          caption={t("pages.datePicker.bounded.caption")}
          tech="minDate + disabledDays"
          stack
          code={`<DatePicker
  value={date}
  onChange={setDate}
  minDate={today()}
  maxDate={addDays(today(), 60)}
  disabledDays={(d) => d.getDay() === 0 || d.getDay() === 6}
/>`}
        >
          <div style={{ width: "100%", maxWidth: 280 }}>
            <Field
              label={t("pages.datePicker.bounded.field")}
              hint={t("pages.datePicker.bounded.hint")}
            >
              <DatePicker
                value={bounded}
                onChange={setBounded}
                minDate={today()}
                maxDate={addDays(today(), 60)}
                disabledDays={isWeekend}
                ariaLabel={t("pages.datePicker.bounded.field")}
              />
            </Field>
          </div>
        </Example>
      </Section>

      {/* iv · Range picker */}
      <Section
        num="iv"
        title={<>{t("pages.datePicker.range.title")}</>}
        kicker={t("pages.datePicker.range.kicker")}
      >
        <p className="section-desc">{tr("pages.datePicker.range.desc")}</p>
        <Example
          caption={t("pages.datePicker.range.caption")}
          tech="DateRangePicker"
          stack
          code={`<DateRangePicker
  value={[start, end]}
  onChange={setRange}
/>`}
        >
          <div style={{ width: "100%", maxWidth: 360 }}>
            <Field label={t("pages.datePicker.range.field")}>
              <DateRangePicker
                value={range}
                onChange={setRange}
                ariaLabel={t("pages.datePicker.range.field")}
              />
            </Field>
          </div>
        </Example>
      </Section>

      {/* v · Range pré-preenchido */}
      <Section
        num="v"
        title={<>{t("pages.datePicker.booked.title")}</>}
        kicker={t("pages.datePicker.booked.kicker")}
      >
        <p className="section-desc">{tr("pages.datePicker.booked.desc")}</p>
        <Example
          caption={t("pages.datePicker.booked.caption")}
          tech="prefilled"
          stack
          code={`const [range, setRange] = useState<CalendarRange>([
  today(),
  addDays(today(), 4),
]);

<DateRangePicker value={range} onChange={setRange} />`}
        >
          <div style={{ width: "100%", maxWidth: 360 }}>
            <Field
              label={t("pages.datePicker.booked.field")}
              hint={t("pages.datePicker.booked.hint")}
            >
              <DateRangePicker
                value={bookedRange}
                onChange={setBookedRange}
                ariaLabel={t("pages.datePicker.booked.field")}
              />
            </Field>
          </div>
        </Example>
      </Section>

      <CompositionSection
        num="vi"
        i18nPrefix="pages.datePicker.composition"
        root="DatePicker"
        nodes={[]}
      />
    </>
  );
}
