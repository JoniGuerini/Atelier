import { useState } from "react";
import {
  PageHead,
  Section,
  Field,
  Input,
  Textarea,
  Select,
  Example,
} from "../ds/primitives.jsx";
import { useT } from "../lib/i18n.jsx";

export default function Inputs() {
  const { t, tr, raw } = useT();
  const lb = (k) => t(`pages.inputs.labels.${k}`);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("clara@atelier.com");
  const emailInvalid = email.length > 0 && !email.includes("@");

  const formatOpts = raw("pages.inputs.labels.formatOpts") || [];

  return (
    <>
      <PageHead
        lead={t("pages.inputs.lead")}
        title={
          <>
            {tr("pages.inputs.titleA")}
            <em>{t("pages.inputs.titleB")}</em>
          </>
        }
        metaLabel={t("pages.inputs.metaLabel")}
        meta={t("pages.inputs.meta")}
        intro={tr("pages.inputs.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.inputs.text.title")}</>}
        kicker={t("pages.inputs.text.kicker")}
      >
        <Example
          caption={t("pages.inputs.text.caption")}
          tech=".ds-input"
          code={`<Field label="${lb("fullName")}" hint="${lb("fullNameHint")}">
  <Input
    placeholder="${lb("fullNamePh")}"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
</Field>

<Field
  label="${lb("email")}"
  error={emailInvalid ? "${lb("emailError")}" : null}
>
  <Input
    type="email"
    value={email}
    invalid={emailInvalid}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="clara@atelier.com"
  />
</Field>

<Field label="${lb("disabled")}">
  <Input disabled value="${lb("disabledValue")}" />
</Field>`}
        >
          <div style={{ display: "grid", gap: 16, width: "100%", maxWidth: 420 }}>
            <Field label={lb("fullName")} hint={lb("fullNameHint")}>
              <Input
                placeholder={lb("fullNamePh")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
            <Field
              label={lb("email")}
              hint={emailInvalid ? null : lb("emailHint")}
              error={emailInvalid ? lb("emailError") : null}
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                invalid={emailInvalid}
                placeholder="clara@atelier.com"
              />
            </Field>
            <Field label={lb("disabled")}>
              <Input disabled value={lb("disabledValue")} />
            </Field>
          </div>
        </Example>
      </Section>

      <Section
        num="ii"
        title={<>{t("pages.inputs.textarea.title")}</>}
        kicker={t("pages.inputs.textarea.kicker")}
      >
        <Example
          caption={t("pages.inputs.textarea.caption")}
          tech=".ds-textarea"
          code={`<Field label="${lb("about")}" hint="${lb("aboutHint")}">
  <Textarea
    placeholder="${lb("aboutPh")}"
    rows={4}
  />
</Field>`}
        >
          <div style={{ width: "100%", maxWidth: 560 }}>
            <Field label={lb("about")} hint={lb("aboutHint")}>
              <Textarea placeholder={lb("aboutPh")} rows={4} />
            </Field>
          </div>
        </Example>
      </Section>

      <Section
        num="iii"
        title={<>{t("pages.inputs.select.title")}</>}
        kicker={t("pages.inputs.select.kicker")}
      >
        <Example
          caption={t("pages.inputs.select.caption")}
          tech=".ds-select"
          code={`<Field label="${lb("edition")}">
  <Select defaultValue="2026">
    <option>2024</option>
    <option>2025</option>
    <option>2026</option>
  </Select>
</Field>

<Field label="${lb("format")}">
  <Select>
${formatOpts.map((o) => `    <option>${o}</option>`).join("\n")}
  </Select>
</Field>`}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              width: "100%",
              maxWidth: 520,
            }}
          >
            <Field label={lb("edition")}>
              <Select defaultValue="2026">
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
              </Select>
            </Field>
            <Field label={lb("format")}>
              <Select>
                {formatOpts.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </Select>
            </Field>
          </div>
        </Example>
      </Section>
    </>
  );
}
