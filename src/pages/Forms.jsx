import { useState } from "react";
import {
  PageHead,
  Section,
  Input,
  Textarea,
  Select,
  Checkbox,
  Button,
  Example,
  CompositionSection,
} from "../ds/primitives.jsx";
import {
  Form,
  FormStep,
  FormRow,
  FormField,
  FormDivider,
  FormActions,
} from "../ds/Form.jsx";
import { useT } from "../lib/i18n.jsx";

export default function Forms() {
  const { t, tr, raw } = useT();
  const [accepted, setAccepted] = useState(true);
  const plans = raw("pages.forms.plans") || {};
  const formats = raw("pages.forms.formats") || [];

  return (
    <>
      <PageHead
        lead={t("pages.forms.lead")}
        title={
          <>
            {tr("pages.forms.titleA")}
            <em>{t("pages.forms.titleB")}</em>
          </>
        }
        metaLabel={t("pages.forms.metaLabel")}
        meta={t("pages.forms.meta")}
        intro={tr("pages.forms.intro")}
      />

      <Section
        num="i"
        title={
          <>
            {tr("pages.forms.completeTitleA")}
            <em>{t("pages.forms.completeTitleB")}</em>
          </>
        }
        kicker={t("pages.forms.completeKicker")}
      >
        <Example
          caption={t("pages.forms.completeCaption")}
          tech="form pattern"
          stack
          code={`<Form onSubmit={(e) => e.preventDefault()}>
  <FormStep>${t("pages.forms.stepYour")}</FormStep>

  <FormRow cols={2}>
    <FormField label="${t("pages.forms.name")}"><Input placeholder="${t("pages.forms.namePh")}" /></FormField>
    <FormField label="${t("pages.forms.lastName")}"><Input placeholder="${t("pages.forms.lastNamePh")}" /></FormField>
  </FormRow>

  <FormField label="${t("pages.forms.email")}" hint="${t("pages.forms.emailHint")}">
    <Input type="email" placeholder="${t("pages.forms.emailPh")}" />
  </FormField>

  <FormDivider>${t("pages.forms.preferences")}</FormDivider>

  <FormRow cols={2}>
    <FormField label="${t("pages.forms.plan")}">
      <Select defaultValue="quarterly">
        <option value="monthly">${plans.monthly}</option>
        <option value="quarterly">${plans.quarterly}</option>
        <option value="annual">${plans.annual}</option>
      </Select>
    </FormField>
    <FormField label="${t("pages.forms.format")}">
      <Select>${(formats || []).map((f) => `<option>${f}</option>`).join("")}</Select>
    </FormField>
  </FormRow>

  <FormField label="${t("pages.forms.reason")}" hint="${t("pages.forms.reasonHint")}">
    <Textarea rows={3} placeholder="${t("pages.forms.reasonPh")}" />
  </FormField>

  <Checkbox label="${t("pages.forms.accept")}" checked={accepted}
    onChange={(e) => setAccepted(e.target.checked)} />

  <FormActions>
    <Button variant="ghost">${t("pages.forms.cancel")}</Button>
    <Button variant="primary" type="submit" disabled={!accepted}>
      ${t("pages.forms.subscribe")}
    </Button>
  </FormActions>
</Form>`}
        >
          <Form onSubmit={(e) => e.preventDefault()}>
            <FormStep>{t("pages.forms.stepYour")}</FormStep>

            <FormRow cols={2}>
              <FormField label={t("pages.forms.name")}>
                <Input placeholder={t("pages.forms.namePh")} />
              </FormField>
              <FormField label={t("pages.forms.lastName")}>
                <Input placeholder={t("pages.forms.lastNamePh")} />
              </FormField>
            </FormRow>

            <FormField
              label={t("pages.forms.email")}
              hint={t("pages.forms.emailHint")}
            >
              <Input type="email" placeholder={t("pages.forms.emailPh")} />
            </FormField>

            <FormDivider>{t("pages.forms.preferences")}</FormDivider>

            <FormRow cols={2}>
              <FormField label={t("pages.forms.plan")}>
                <Select defaultValue="quarterly">
                  <option value="monthly">{plans.monthly}</option>
                  <option value="quarterly">{plans.quarterly}</option>
                  <option value="annual">{plans.annual}</option>
                </Select>
              </FormField>
              <FormField label={t("pages.forms.format")}>
                <Select>
                  {formats.map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </Select>
              </FormField>
            </FormRow>

            <FormField
              label={t("pages.forms.reason")}
              hint={t("pages.forms.reasonHint")}
            >
              <Textarea rows={3} placeholder={t("pages.forms.reasonPh")} />
            </FormField>

            <Checkbox
              label={t("pages.forms.accept")}
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />

            <FormActions>
              <Button type="button" variant="ghost">
                {t("pages.forms.cancel")}
              </Button>
              <Button type="submit" variant="primary" disabled={!accepted}>
                {t("pages.forms.subscribe")}
              </Button>
            </FormActions>
          </Form>
        </Example>
      </Section>

      <CompositionSection
        num="ii"
        i18nPrefix="pages.forms.composition"
        root="Form"
        nodes={[
          { name: "FormStep" },
          {
            name: "FormRow",
            children: [
              {
                name: "FormField",
                children: [{ name: "Input · Textarea · Select" }],
              },
            ],
          },
          { name: "FormDivider" },
          { name: "FormActions" },
        ]}
      />
    </>
  );
}
