import { useState } from "react";
import {
  PageHead,
  Section,
  Example,
  Button,
  CompositionSection,
} from "../ds/primitives.jsx";
import { Stepper, Step } from "../ds/Stepper.jsx";
import { useT } from "../lib/i18n.jsx";

export default function StepperPage() {
  const { t, tr } = useT();
  const [step, setStep] = useState(1);

  return (
    <>
      <PageHead
        lead={t("pages.stepper.lead")}
        title={
          <>
            {tr("pages.stepper.titleA")}
            <em>{t("pages.stepper.titleB")}</em>
          </>
        }
        metaLabel={t("pages.stepper.metaLabel")}
        meta={t("pages.stepper.meta")}
        intro={tr("pages.stepper.intro")}
      />

      {/* i · Horizontal */}
      <Section
        num="i"
        title={<>{t("pages.stepper.horizontal.title")}</>}
        kicker={t("pages.stepper.horizontal.kicker")}
      >
        <Example
          caption={t("pages.stepper.horizontal.caption")}
          tech="orientation='horizontal'"
          stack
          code={`<Stepper current={1}>
  <Step n="01" label="Conta" description="Seus dados" />
  <Step n="02" label="Plano" description="Frequência e formato" />
  <Step n="03" label="Confirmar" description="Revisar e enviar" />
</Stepper>`}
        >
          <Stepper current={1}>
            <Step n="01" label={t("pages.stepper.s1Label")} description={t("pages.stepper.s1Desc")} />
            <Step n="02" label={t("pages.stepper.s2Label")} description={t("pages.stepper.s2Desc")} />
            <Step n="03" label={t("pages.stepper.s3Label")} description={t("pages.stepper.s3Desc")} />
          </Stepper>
        </Example>
      </Section>

      {/* ii · Vertical */}
      <Section
        num="ii"
        title={<>{t("pages.stepper.vertical.title")}</>}
        kicker={t("pages.stepper.vertical.kicker")}
      >
        <Example
          caption={t("pages.stepper.vertical.caption")}
          tech="orientation='vertical'"
          stack
          code={`<Stepper current={2} orientation="vertical">
  <Step n="01" label="Conta" />
  <Step n="02" label="Plano" />
  <Step n="03" label="Confirmar" />
  <Step n="04" label="Concluído" />
</Stepper>`}
        >
          <Stepper current={2} orientation="vertical">
            <Step n="01" label={t("pages.stepper.s1Label")} description={t("pages.stepper.s1Desc")} />
            <Step n="02" label={t("pages.stepper.s2Label")} description={t("pages.stepper.s2Desc")} />
            <Step n="03" label={t("pages.stepper.s3Label")} description={t("pages.stepper.s3Desc")} />
            <Step n="04" label={t("pages.stepper.s4Label")} description={t("pages.stepper.s4Desc")} />
          </Stepper>
        </Example>
      </Section>

      {/* iii · Interactive */}
      <Section
        num="iii"
        title={<>{t("pages.stepper.interactive.title")}</>}
        kicker={t("pages.stepper.interactive.kicker")}
      >
        <Example
          caption={t("pages.stepper.interactive.caption")}
          tech="state-driven"
          stack
        >
          <div style={{ display: "grid", gap: "var(--space-4)", width: "100%" }}>
            <Stepper current={step}>
              <Step n="01" label={t("pages.stepper.s1Label")} />
              <Step n="02" label={t("pages.stepper.s2Label")} />
              <Step n="03" label={t("pages.stepper.s3Label")} />
              <Step n="04" label={t("pages.stepper.s4Label")} />
            </Stepper>
            <div
              style={{
                display: "flex",
                gap: 8,
                paddingTop: "var(--space-3)",
                borderTop: "1px solid var(--rule-soft)",
              }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step <= 0}
              >
                {t("pages.stepper.back")}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setStep((s) => Math.min(3, s + 1))}
                disabled={step >= 3}
              >
                {t("pages.stepper.next")}
              </Button>
            </div>
          </div>
        </Example>
      </Section>

      <CompositionSection
        num="iv"
        i18nPrefix="pages.stepper.composition"
        root="Stepper"
        nodes={[{ name: "Step" }]}
      />
    </>
  );
}
