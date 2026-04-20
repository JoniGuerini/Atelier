import { useState } from "react";
import {
  PageHead,
  Section,
  Example,
  CompositionSection,
} from "../ds/primitives.tsx";
import { TagInput, Tag } from "../ds/TagInput.tsx";
import { useT } from "../lib/i18n.tsx";

export default function TagInputPage() {
  const { t, tr } = useT();
  const [tags1, setTags1] = useState<string[]>(["editorial", "minimal"]);
  const [tags2, setTags2] = useState<string[]>(["a@b.com"]);
  const [tags3, setTags3] = useState<string[]>(["news", "product"]);
  const [tags4, setTags4] = useState<string[]>(["sealed"]);

  return (
    <>
      <PageHead
        lead={t("pages.tagInput.lead")}
        title={
          <>
            {tr("pages.tagInput.titleA")}
            <em>{t("pages.tagInput.titleB")}</em>
          </>
        }
        metaLabel={t("pages.tagInput.metaLabel")}
        meta={t("pages.tagInput.meta")}
        intro={tr("pages.tagInput.intro")}
      />

      {/* i · Default */}
      <Section
        num="i"
        title={<>{t("pages.tagInput.default.title")}</>}
        kicker={t("pages.tagInput.default.kicker")}
      >
        <Example
          caption={t("pages.tagInput.default.caption")}
          tech="<TagInput />"
          stack
          code={`const [tags, setTags] = useState<string[]>([])

<TagInput
  value={tags}
  onChange={setTags}
  placeholder="Adicione tags…"
/>`}
        >
          <TagInput
            value={tags1}
            onChange={setTags1}
            placeholder="Adicione tags…"
          />
        </Example>
      </Section>

      {/* ii · Validate (e-mail) */}
      <Section
        num="ii"
        title={<>{t("pages.tagInput.validate.title")}</>}
        kicker={t("pages.tagInput.validate.kicker")}
      >
        <Example
          caption={t("pages.tagInput.validate.caption")}
          tech="validate prop"
          stack
          code={`const isEmail = (s) => /^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(s)

<TagInput
  value={emails}
  onChange={setEmails}
  placeholder="email@dominio.com"
  validate={(t) => isEmail(t) || "Email inválido"}
  separators={[",", ";", " "]}
/>`}
        >
          <TagInput
            value={tags2}
            onChange={setTags2}
            placeholder="email@dominio.com"
            validate={(s) =>
              /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s) || "Email inválido"
            }
            separators={[",", ";", " "]}
          />
        </Example>
      </Section>

      {/* iii · Max + unique */}
      <Section
        num="iii"
        title={<>{t("pages.tagInput.max.title")}</>}
        kicker={t("pages.tagInput.max.kicker")}
      >
        <Example
          caption={t("pages.tagInput.max.caption")}
          tech="maxTags + unique"
          stack
          code={`<TagInput
  value={tags}
  onChange={setTags}
  maxTags={3}
  unique
  placeholder="Até 3 tópicos…"
/>`}
        >
          <TagInput
            value={tags3}
            onChange={setTags3}
            maxTags={3}
            unique
            placeholder="Até 3 tópicos…"
          />
        </Example>
      </Section>

      {/* iv · ReadOnly */}
      <Section
        num="iv"
        title={<>{t("pages.tagInput.readonly.title")}</>}
        kicker={t("pages.tagInput.readonly.kicker")}
      >
        <Example
          caption={t("pages.tagInput.readonly.caption")}
          tech="readOnly"
          stack
          code={`<TagInput value={tags} onChange={setTags} readOnly />`}
        >
          <TagInput value={tags4} onChange={setTags4} readOnly />
        </Example>
      </Section>

      {/* v · Tag isolada */}
      <Section
        num="v"
        title={<>{t("pages.tagInput.tag.title")}</>}
        kicker={t("pages.tagInput.tag.kicker")}
      >
        <Example
          caption={t("pages.tagInput.tag.caption")}
          tech="<Tag />"
          stack
          code={`<Tag label="editorial" onRemove={() => …} />
<Tag label="readonly" />`}
        >
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Tag label="editorial" onRemove={() => {}} />
            <Tag label="minimal" onRemove={() => {}} />
            <Tag label="readonly (sem X)" />
            <Tag label="muito longo que quebra com elipse aqui no fim" />
          </div>
        </Example>
      </Section>

      <CompositionSection
        num="vi"
        i18nPrefix="pages.tagInput.composition"
        root="TagInput"
        nodes={[
          {
            name: "ds-tag-input-tags",
            children: [
              {
                name: "Tag (×N)",
                children: [
                  { name: "ds-tag-label" },
                  { name: "ds-tag-remove (button × svg)" },
                ],
              },
              { name: "input (campo de texto)" },
            ],
          },
          { name: "ds-tag-input-error (quando inválido)" },
        ]}
      />
    </>
  );
}
