import { useState } from "react";
import {
  PageHead,
  Section,
  Example,
  CompositionSection,
  Field,
} from "../ds/primitives.tsx";
import { ColorPicker } from "../ds/ColorPicker.tsx";
import { useT } from "../lib/i18n.tsx";

const ATELIER_PRESETS = [
  "#c8361d", // accent
  "#1a1a1a", // ink
  "#2d6a3e", // ok
  "#8a6d1a", // warn
  "#2e5a8a", // info
  "#5a5754", // ink-soft
  "#9a958d", // ink-faint
];

const VIVID_PRESETS = [
  "#ff3b30",
  "#ff9500",
  "#ffcc00",
  "#34c759",
  "#5ac8fa",
  "#007aff",
  "#5856d6",
  "#af52de",
  "#ff2d55",
];

export default function ColorPickerPage() {
  const { t, tr } = useT();
  const [c1, setC1] = useState("#c8361d");
  const [c2, setC2] = useState("#34c759");
  const [c3, setC3] = useState("#2e5a8a");

  return (
    <>
      <PageHead
        lead={t("pages.colorPicker.lead")}
        title={
          <>
            {tr("pages.colorPicker.titleA")}
            <em>{t("pages.colorPicker.titleB")}</em>
          </>
        }
        metaLabel={t("pages.colorPicker.metaLabel")}
        meta={t("pages.colorPicker.meta")}
        intro={tr("pages.colorPicker.intro")}
      />

      {/* i · Básico */}
      <Section
        num="i"
        title={<>{t("pages.colorPicker.basic.title")}</>}
        kicker={t("pages.colorPicker.basic.kicker")}
      >
        <p className="section-desc">{tr("pages.colorPicker.basic.desc")}</p>
        <Example
          caption={t("pages.colorPicker.basic.caption", { hex: c1 })}
          tech="HSV plane + hue"
          stack
          code={`const [color, setColor] = useState("#c8361d");

<ColorPicker value={color} onChange={setColor} />`}
        >
          <div
            style={{
              padding: "var(--space-4)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ColorPicker
              value={c1}
              onChange={setC1}
              ariaLabel={t("pages.colorPicker.basic.label")}
            />
          </div>
        </Example>
      </Section>

      {/* ii · Com presets */}
      <Section
        num="ii"
        title={<>{t("pages.colorPicker.presets.title")}</>}
        kicker={t("pages.colorPicker.presets.kicker")}
      >
        <p className="section-desc">{tr("pages.colorPicker.presets.desc")}</p>
        <Example
          caption={t("pages.colorPicker.presets.caption", { hex: c2 })}
          tech="presets array"
          stack
          code={`<ColorPicker
  value={color}
  onChange={setColor}
  presets={[
    "#ff3b30", "#ff9500", "#ffcc00",
    "#34c759", "#5ac8fa", "#007aff",
    "#5856d6", "#af52de", "#ff2d55",
  ]}
/>`}
        >
          <div
            style={{
              padding: "var(--space-4)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ColorPicker
              value={c2}
              onChange={setC2}
              presets={VIVID_PRESETS}
              ariaLabel={t("pages.colorPicker.presets.label")}
            />
          </div>
        </Example>
      </Section>

      {/* iii · Com alpha */}
      <Section
        num="iii"
        title={<>{t("pages.colorPicker.alpha.title")}</>}
        kicker={t("pages.colorPicker.alpha.kicker")}
      >
        <p className="section-desc">{tr("pages.colorPicker.alpha.desc")}</p>
        <Example
          caption={t("pages.colorPicker.alpha.caption", { hex: c3 })}
          tech="alpha=true"
          stack
          code={`<ColorPicker
  value={color}
  onChange={setColor}
  alpha
  presets={atelierPresets}
/>`}
        >
          <div
            style={{
              padding: "var(--space-4)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ColorPicker
              value={c3}
              onChange={setC3}
              alpha
              presets={ATELIER_PRESETS}
              ariaLabel={t("pages.colorPicker.alpha.label")}
            />
          </div>
        </Example>
      </Section>

      {/* iv · Compacto */}
      <Section
        num="iv"
        title={<>{t("pages.colorPicker.compact.title")}</>}
        kicker={t("pages.colorPicker.compact.kicker")}
      >
        <p className="section-desc">{tr("pages.colorPicker.compact.desc")}</p>
        <Example
          caption={t("pages.colorPicker.compact.caption")}
          tech="size=160"
          stack
          code={`<ColorPicker value={color} onChange={setColor} size={160} />`}
        >
          <div
            style={{
              padding: "var(--space-4)",
              display: "flex",
              gap: "var(--space-4)",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Field label={t("pages.colorPicker.compact.primary")}>
              <ColorPicker value={c1} onChange={setC1} size={160} />
            </Field>
            <Field label={t("pages.colorPicker.compact.secondary")}>
              <ColorPicker
                value={c2}
                onChange={setC2}
                size={160}
                presets={ATELIER_PRESETS}
              />
            </Field>
          </div>
        </Example>
      </Section>

      <CompositionSection
        num="v"
        i18nPrefix="pages.colorPicker.composition"
        root="ColorPicker"
        nodes={[]}
      />
    </>
  );
}
