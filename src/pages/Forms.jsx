import { useState } from "react";
import {
  PageHead,
  Section,
  Field,
  Input,
  Textarea,
  Select,
  Checkbox,
  Button,
  Example,
  Divider,
} from "../ds/primitives.jsx";
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
          code={`<form onSubmit={(e) => e.preventDefault()}>
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
    <Field label="${t("pages.forms.name")}"><Input placeholder="${t("pages.forms.namePh")}" /></Field>
    <Field label="${t("pages.forms.lastName")}"><Input placeholder="${t("pages.forms.lastNamePh")}" /></Field>
  </div>

  <Field label="${t("pages.forms.email")}" hint="${t("pages.forms.emailHint")}">
    <Input type="email" placeholder="${t("pages.forms.emailPh")}" />
  </Field>

  <Divider>${t("pages.forms.preferences")}</Divider>

  <Field label="${t("pages.forms.plan")}">
    <Select defaultValue="quarterly">
      <option value="monthly">${plans.monthly}</option>
      <option value="quarterly">${plans.quarterly}</option>
      <option value="annual">${plans.annual}</option>
    </Select>
  </Field>

  <Checkbox label="${t("pages.forms.accept")}" checked={accepted}
    onChange={(e) => setAccepted(e.target.checked)} />

  <Button type="submit" variant="primary" disabled={!accepted}>
    ${t("pages.forms.subscribe")}
  </Button>
</form>`}
        >
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{
              width: "100%",
              maxWidth: 560,
              display: "grid",
              gap: "var(--space-4)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--ink-faint)",
              }}
            >
              {t("pages.forms.stepYour")}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--space-4)",
              }}
            >
              <Field label={t("pages.forms.name")}>
                <Input placeholder={t("pages.forms.namePh")} />
              </Field>
              <Field label={t("pages.forms.lastName")}>
                <Input placeholder={t("pages.forms.lastNamePh")} />
              </Field>
            </div>

            <Field
              label={t("pages.forms.email")}
              hint={t("pages.forms.emailHint")}
            >
              <Input type="email" placeholder={t("pages.forms.emailPh")} />
            </Field>

            <Divider>{t("pages.forms.preferences")}</Divider>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--space-4)",
              }}
            >
              <Field label={t("pages.forms.plan")}>
                <Select defaultValue="quarterly">
                  <option value="monthly">{plans.monthly}</option>
                  <option value="quarterly">{plans.quarterly}</option>
                  <option value="annual">{plans.annual}</option>
                </Select>
              </Field>
              <Field label={t("pages.forms.format")}>
                <Select>
                  {formats.map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </Select>
              </Field>
            </div>

            <Field
              label={t("pages.forms.reason")}
              hint={t("pages.forms.reasonHint")}
            >
              <Textarea rows={3} placeholder={t("pages.forms.reasonPh")} />
            </Field>

            <Checkbox
              label={t("pages.forms.accept")}
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />

            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "flex-end",
                paddingTop: "var(--space-3)",
                borderTop: "1px solid var(--rule-soft)",
              }}
            >
              <Button type="button" variant="ghost">
                {t("pages.forms.cancel")}
              </Button>
              <Button type="submit" variant="primary" disabled={!accepted}>
                {t("pages.forms.subscribe")}
              </Button>
            </div>
          </form>
        </Example>
      </Section>
    </>
  );
}
