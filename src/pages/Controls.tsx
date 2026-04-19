import { useState } from "react";
import {
  PageHead,
  Section,
  Checkbox,
  Radio,
  Switch,
  Example,
  CompositionSection,
} from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";

export default function Controls() {
  const { t, tr, raw } = useT();
  const lb = (k) => t(`pages.controls.labels.${k}`);
  const plans = raw("pages.controls.labels.plans") || [];

  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [plan, setPlan] = useState("quarterly");
  const [notif, setNotif] = useState(true);

  return (
    <>
      <PageHead
        lead={t("pages.controls.lead")}
        title={
          <>
            {tr("pages.controls.titleA")}
            <em>{t("pages.controls.titleB")}</em>
          </>
        }
        metaLabel={t("pages.controls.metaLabel")}
        meta={t("pages.controls.meta")}
        intro={tr("pages.controls.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.controls.check.title")}</>}
        kicker={t("pages.controls.check.kicker")}
      >
        <Example
          caption={t("pages.controls.check.caption")}
          tech=".ds-check"
          code={`<Checkbox
  label="${lb("monthly")}"
  checked={a}
  onChange={(e) => setA(e.target.checked)}
/>

<Checkbox label="${lb("disabled")}" checked disabled />
<Checkbox label="${lb("uncheckedDisabled")}" disabled />`}
        >
          <div style={{ display: "grid", gap: 10 }}>
            <Checkbox
              label={lb("monthly")}
              checked={a}
              onChange={(e) => setA(e.target.checked)}
            />
            <Checkbox
              label={lb("early")}
              checked={b}
              onChange={(e) => setB(e.target.checked)}
            />
            <Checkbox label={lb("disabled")} checked disabled />
            <Checkbox label={lb("uncheckedDisabled")} disabled />
          </div>
        </Example>
      </Section>

      <Section
        num="ii"
        title={<>{t("pages.controls.radio.title")}</>}
        kicker={t("pages.controls.radio.kicker")}
      >
        <Example
          caption={t("pages.controls.radio.caption")}
          tech=".ds-check[type=radio]"
          code={`<Radio name="plan" label="${plans[0] || ""}" value="monthly"
  checked={plan === "monthly"} onChange={() => setPlan("monthly")} />

<Radio name="plan" label="${plans[1] || ""}" value="quarterly"
  checked={plan === "quarterly"} onChange={() => setPlan("quarterly")} />`}
        >
          <div style={{ display: "grid", gap: 10 }}>
            {["monthly", "quarterly", "annual"].map((v, i) => (
              <Radio
                key={v}
                name="plan"
                label={plans[i]}
                value={v}
                checked={plan === v}
                onChange={() => setPlan(v)}
              />
            ))}
          </div>
        </Example>
      </Section>

      <Section
        num="iii"
        title={<>{t("pages.controls.switch.title")}</>}
        kicker={t("pages.controls.switch.kicker")}
      >
        <Example
          caption={t("pages.controls.switch.caption")}
          tech=".ds-switch"
          code={`<Switch
  label="${lb("emailNotif")}"
  checked={notif}
  onChange={setNotif}
/>

<Switch label="${lb("quietMode")}" checked={false} onChange={() => {}} />
<Switch label="${lb("disabled")}" checked disabled onChange={() => {}} />`}
        >
          <div style={{ display: "grid", gap: 12 }}>
            <Switch
              label={lb("emailNotif")}
              checked={notif}
              onChange={setNotif}
            />
            <Switch
              label={lb("quietMode")}
              checked={false}
              onChange={() => {}}
            />
            <Switch
              label={lb("disabled")}
              checked
              disabled
              onChange={() => {}}
            />
          </div>
        </Example>
      </Section>

      <CompositionSection
        num="iv"
        i18nPrefix="pages.controls.composition"
        root="Controls"
        nodes={[
          { name: "Checkbox" },
          { name: "Radio" },
          { name: "Switch" },
        ]}
      />
    </>
  );
}
