import { useEffect, useMemo, useState } from "react";
import {
  PageHead,
  Section,
  Example,
  CompositionSection,
} from "../ds/primitives.tsx";
import { NumberInput } from "../ds/NumberInput.tsx";
import { PinInput } from "../ds/PinInput.tsx";
import { PasswordInput } from "../ds/PasswordInput.tsx";
import {
  PhoneInput,
  phoneToE164,
  DEFAULT_COUNTRIES,
  type PhoneCountryId,
} from "../ds/PhoneInput.tsx";
import { TimePicker } from "../ds/TimePicker.tsx";
import { EditableText } from "../ds/EditableText.tsx";
import { MentionInput, type MentionOption } from "../ds/MentionInput.tsx";
import { useT, useLocale } from "../lib/i18n.tsx";

export default function AdvancedInputsPage() {
  const { t, tr } = useT();
  const { locale } = useLocale();
  const [n, setN] = useState<number | null>(3);
  const [pin, setPin] = useState("");
  const [pinDone, setPinDone] = useState<string | null>(null);
  const [pw, setPw] = useState("");
  const [country, setCountry] = useState<PhoneCountryId>("br");
  const [nat, setNat] = useState("11999887766");
  const [time, setTime] = useState<string | null>("14:30");
  const [title, setTitle] = useState("");
  const [mention, setMention] = useState("");

  useEffect(() => {
    setTitle(t("pages.advancedInputs.editable.initial"));
  }, [locale, t]);

  const mentionOpts: MentionOption[] = useMemo(
    () => [
      { id: "a", label: t("pages.advancedInputs.mention.optA") },
      { id: "b", label: t("pages.advancedInputs.mention.optB") },
      { id: "c", label: t("pages.advancedInputs.mention.optC") },
      { id: "d", label: t("pages.advancedInputs.mention.optD") },
    ],
    [t]
  );

  const phoneMeta = useMemo(
    () => DEFAULT_COUNTRIES.find((c) => c.id === country)!,
    [country]
  );

  return (
    <>
      <PageHead
        lead={t("pages.advancedInputs.lead")}
        title={
          <>
            {tr("pages.advancedInputs.titleA")}
            <em>{t("pages.advancedInputs.titleB")}</em>
          </>
        }
        metaLabel={t("pages.advancedInputs.metaLabel")}
        meta={t("pages.advancedInputs.meta")}
        intro={tr("pages.advancedInputs.intro")}
      />

      <Section num="i" title={<>{t("pages.advancedInputs.number.title")}</>} kicker={t("pages.advancedInputs.number.kicker")}>
        <p className="section-desc">{t("pages.advancedInputs.number.desc")}</p>
        <Example
          caption={t("pages.advancedInputs.number.caption")}
          tech="<NumberInput>"
          stack
          code={`<NumberInput value={n} onChange={setN} min={0} max={10} step={1} />`}
        >
          <NumberInput value={n} onChange={setN} min={0} max={10} step={1} aria-label={t("pages.advancedInputs.number.aria")} />
        </Example>
      </Section>

      <Section num="ii" title={<>{t("pages.advancedInputs.pin.title")}</>} kicker={t("pages.advancedInputs.pin.kicker")}>
        <p className="section-desc">{t("pages.advancedInputs.pin.desc")}</p>
        <Example
          caption={t("pages.advancedInputs.pin.caption")}
          tech="<PinInput>"
          stack
          code={`<PinInput length={4} value={pin} onChange={setPin} onComplete={setPinDone} />`}
        >
          <PinInput
            length={4}
            value={pin}
            onChange={(d) => {
              setPin(d);
              setPinDone(null);
            }}
            onComplete={setPinDone}
            aria-label={t("pages.advancedInputs.pin.aria")}
          />
          {pinDone ? (
            <p className="section-desc" style={{ marginTop: "0.75rem" }}>
              {t("pages.advancedInputs.pin.done", { code: pinDone })}
            </p>
          ) : null}
        </Example>
      </Section>

      <Section num="iii" title={<>{t("pages.advancedInputs.password.title")}</>} kicker={t("pages.advancedInputs.password.kicker")}>
        <p className="section-desc">{t("pages.advancedInputs.password.desc")}</p>
        <Example
          caption={t("pages.advancedInputs.password.caption")}
          tech="<PasswordInput>"
          stack
          code={`<PasswordInput value={pw} onChange={setPw} showStrength />`}
        >
          <PasswordInput value={pw} onChange={setPw} showStrength placeholder="••••••••" />
        </Example>
      </Section>

      <Section num="iv" title={<>{t("pages.advancedInputs.phone.title")}</>} kicker={t("pages.advancedInputs.phone.kicker")}>
        <p className="section-desc">{t("pages.advancedInputs.phone.desc")}</p>
        <Example
          caption={t("pages.advancedInputs.phone.caption")}
          tech="<PhoneInput> · phoneToE164"
          stack
          code={`<PhoneInput country={country} onCountryChange={…} nationalDigits={nat} onNationalDigitsChange={…} />`}
        >
          <PhoneInput
            country={country}
            onCountryChange={setCountry}
            nationalDigits={nat}
            onNationalDigitsChange={setNat}
          />
          <p className="section-desc" style={{ marginTop: "0.75rem", marginBottom: 0 }}>
            <code className="ds-inline-code">{phoneToE164(phoneMeta, nat)}</code>
          </p>
        </Example>
      </Section>

      <Section num="v" title={<>{t("pages.advancedInputs.time.title")}</>} kicker={t("pages.advancedInputs.time.kicker")}>
        <p className="section-desc">{t("pages.advancedInputs.time.desc")}</p>
        <Example
          caption={t("pages.advancedInputs.time.caption")}
          tech="<TimePicker>"
          stack
          code={`<TimePicker value={time} onChange={setTime} stepMinutes={15} />`}
        >
          <TimePicker value={time} onChange={setTime} stepMinutes={15} />
        </Example>
      </Section>

      <Section num="vi" title={<>{t("pages.advancedInputs.editable.title")}</>} kicker={t("pages.advancedInputs.editable.kicker")}>
        <p className="section-desc">{tr("pages.advancedInputs.editable.desc")}</p>
        <Example
          caption={t("pages.advancedInputs.editable.caption")}
          tech="<EditableText>"
          stack
          code={`<EditableText value={title} onCommit={setTitle} />`}
        >
          <EditableText value={title} onCommit={setTitle} />
        </Example>
      </Section>

      <Section num="vii" title={<>{t("pages.advancedInputs.mention.title")}</>} kicker={t("pages.advancedInputs.mention.kicker")}>
        <p className="section-desc">{t("pages.advancedInputs.mention.desc")}</p>
        <Example
          caption={t("pages.advancedInputs.mention.caption")}
          tech="<MentionInput>"
          stack
          code={`<MentionInput value={text} onChange={setText} suggestions={opts} />`}
        >
          <MentionInput
            value={mention}
            onChange={setMention}
            suggestions={mentionOpts}
            rows={4}
            placeholder={t("pages.advancedInputs.mention.placeholder")}
          />
        </Example>
      </Section>

      <CompositionSection
        num="viii"
        i18nPrefix="pages.advancedInputs.composition"
        root="NumberInput"
        nodes={[
          { name: "PinInput" },
          { name: "PasswordInput" },
          { name: "PhoneInput" },
          { name: "TimePicker" },
          { name: "EditableText" },
          { name: "MentionInput" },
        ]}
      />
    </>
  );
}
