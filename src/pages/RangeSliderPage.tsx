import { useState } from "react";
import {
  PageHead,
  Section,
  Example,
  CompositionSection,
  Field,
} from "../ds/primitives.tsx";
import { RangeSlider } from "../ds/RangeSlider.tsx";
import { useT } from "../lib/i18n.tsx";

export default function RangeSliderPage() {
  const { t, tr } = useT();
  const [vol, setVol] = useState(42);
  const [budget, setBudget] = useState<[number, number]>([200, 800]);
  const [year, setYear] = useState(1985);
  const [strength, setStrength] = useState(50);
  const [vertVal, setVertVal] = useState(60);

  return (
    <>
      <PageHead
        lead={t("pages.slider.lead")}
        title={
          <>
            {tr("pages.slider.titleA")}
            <em>{t("pages.slider.titleB")}</em>
          </>
        }
        metaLabel={t("pages.slider.metaLabel")}
        meta={t("pages.slider.meta")}
        intro={tr("pages.slider.intro")}
      />

      {/* i · Single */}
      <Section
        num="i"
        title={<>{t("pages.slider.single.title")}</>}
        kicker={t("pages.slider.single.kicker")}
      >
        <p className="section-desc">{tr("pages.slider.single.desc")}</p>
        <Example
          caption={t("pages.slider.single.caption", { value: String(vol) })}
          tech="single handle"
          stack
          code={`<RangeSlider min={0} max={100} value={vol} onChange={setVol} />`}
        >
          <div style={{ width: "100%", maxWidth: 480, padding: "var(--space-3) 0" }}>
            <Field label={t("pages.slider.single.field")}>
              <RangeSlider
                min={0}
                max={100}
                value={vol}
                onChange={setVol}
                ariaLabel={t("pages.slider.single.field")}
                formatValue={(v) => `${v}%`}
              />
            </Field>
          </div>
        </Example>
      </Section>

      {/* ii · Dual handle */}
      <Section
        num="ii"
        title={<>{t("pages.slider.dual.title")}</>}
        kicker={t("pages.slider.dual.kicker")}
      >
        <p className="section-desc">{tr("pages.slider.dual.desc")}</p>
        <Example
          caption={t("pages.slider.dual.caption", {
            min: String(budget[0]),
            max: String(budget[1]),
          })}
          tech="dual handle"
          stack
          code={`<RangeSlider
  min={0} max={1000}
  value={[200, 800]}
  onChange={setBudget}
  step={50}
/>`}
        >
          <div style={{ width: "100%", maxWidth: 480, padding: "var(--space-3) 0" }}>
            <Field
              label={t("pages.slider.dual.field")}
              hint={t("pages.slider.dual.hint")}
            >
              <RangeSlider
                min={0}
                max={1000}
                step={50}
                value={budget}
                onChange={setBudget}
                ariaLabel={t("pages.slider.dual.field")}
                formatValue={(v) => `$${v}`}
              />
            </Field>
          </div>
        </Example>
      </Section>

      {/* iii · Marks */}
      <Section
        num="iii"
        title={<>{t("pages.slider.marks.title")}</>}
        kicker={t("pages.slider.marks.kicker")}
      >
        <p className="section-desc">{tr("pages.slider.marks.desc")}</p>
        <Example
          caption={t("pages.slider.marks.caption", { value: String(year) })}
          tech="marks + labels"
          stack
          code={`<RangeSlider
  min={1900} max={2025}
  value={year}
  onChange={setYear}
  marks={[1900, 1950, 2000, 2025]}
/>`}
        >
          <div style={{ width: "100%", maxWidth: 560, padding: "var(--space-3) 0" }}>
            <Field label={t("pages.slider.marks.field")}>
              <RangeSlider
                min={1900}
                max={2025}
                value={year}
                onChange={setYear}
                marks={[1900, 1925, 1950, 1975, 2000, 2025]}
                ariaLabel={t("pages.slider.marks.field")}
              />
            </Field>
          </div>
        </Example>
      </Section>

      {/* iv · Always show value */}
      <Section
        num="iv"
        title={<>{t("pages.slider.always.title")}</>}
        kicker={t("pages.slider.always.kicker")}
      >
        <p className="section-desc">{tr("pages.slider.always.desc")}</p>
        <Example
          caption={t("pages.slider.always.caption", {
            value: String(strength),
          })}
          tech='showValue="always"'
          stack
          code={`<RangeSlider … showValue="always" />`}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 480,
              padding: "var(--space-7) 0 var(--space-3)",
            }}
          >
            <Field label={t("pages.slider.always.field")}>
              <RangeSlider
                min={0}
                max={100}
                value={strength}
                onChange={setStrength}
                showValue="always"
                ariaLabel={t("pages.slider.always.field")}
              />
            </Field>
          </div>
        </Example>
      </Section>

      {/* v · Vertical */}
      <Section
        num="v"
        title={<>{t("pages.slider.vertical.title")}</>}
        kicker={t("pages.slider.vertical.kicker")}
      >
        <p className="section-desc">{tr("pages.slider.vertical.desc")}</p>
        <Example
          caption={t("pages.slider.vertical.caption", {
            value: String(vertVal),
          })}
          tech='orientation="vertical"'
          stack
          code={`<RangeSlider orientation="vertical" size={200} … />`}
        >
          <div
            style={{
              padding: "var(--space-3) 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <RangeSlider
              orientation="vertical"
              size={200}
              min={0}
              max={100}
              value={vertVal}
              onChange={setVertVal}
              ariaLabel={t("pages.slider.vertical.field")}
            />
          </div>
        </Example>
      </Section>

      {/* vi · Disabled */}
      <Section
        num="vi"
        title={<>{t("pages.slider.disabled.title")}</>}
        kicker={t("pages.slider.disabled.kicker")}
      >
        <p className="section-desc">{tr("pages.slider.disabled.desc")}</p>
        <Example
          caption={t("pages.slider.disabled.caption")}
          tech="disabled"
          stack
          code={`<RangeSlider disabled value={50} onChange={() => {}} />`}
        >
          <div style={{ width: "100%", maxWidth: 480, padding: "var(--space-3) 0" }}>
            <Field label={t("pages.slider.disabled.field")}>
              <RangeSlider
                disabled
                min={0}
                max={100}
                value={50}
                onChange={() => {}}
              />
            </Field>
          </div>
        </Example>
      </Section>

      <CompositionSection
        num="vii"
        i18nPrefix="pages.slider.composition"
        root="RangeSlider"
        nodes={[]}
      />
    </>
  );
}
