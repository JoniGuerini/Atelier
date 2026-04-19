import { useState } from "react";
import {
  PageHead,
  Section,
  Example,
  CompositionSection,
  Field,
} from "../ds/primitives.tsx";
import { Combobox, type ComboboxOption } from "../ds/Combobox.tsx";
import { useT } from "../lib/i18n.tsx";

const COUNTRIES: ComboboxOption[] = [
  { value: "br", label: "Brasil" },
  { value: "ar", label: "Argentina" },
  { value: "us", label: "Estados Unidos" },
  { value: "uk", label: "Reino Unido" },
  { value: "fr", label: "França" },
  { value: "de", label: "Alemanha" },
  { value: "it", label: "Itália" },
  { value: "es", label: "Espanha" },
  { value: "pt", label: "Portugal" },
  { value: "jp", label: "Japão" },
  { value: "cn", label: "China" },
  { value: "kr", label: "Coreia do Sul" },
  { value: "in", label: "Índia" },
  { value: "ng", label: "Nigéria" },
  { value: "za", label: "África do Sul" },
];

const LANGS: ComboboxOption[] = [
  { value: "ts", label: "TypeScript", group: "Tipados" },
  { value: "rs", label: "Rust", group: "Tipados" },
  { value: "go", label: "Go", group: "Tipados" },
  { value: "swift", label: "Swift", group: "Tipados" },
  { value: "js", label: "JavaScript", group: "Dinâmicos" },
  { value: "py", label: "Python", group: "Dinâmicos" },
  { value: "rb", label: "Ruby", group: "Dinâmicos" },
  { value: "ex", label: "Elixir", group: "Funcionais" },
  { value: "hs", label: "Haskell", group: "Funcionais" },
  { value: "clj", label: "Clojure", group: "Funcionais" },
];

const TAGS: ComboboxOption[] = [
  { value: "design", label: "Design", glyph: "§" },
  { value: "code", label: "Code", glyph: "¶" },
  { value: "writing", label: "Writing", glyph: "❦" },
  { value: "research", label: "Research", glyph: "✦" },
  { value: "music", label: "Music", glyph: "♪" },
  { value: "film", label: "Film", glyph: "▸" },
  { value: "books", label: "Books", glyph: "⌘" },
];

export default function ComboboxPage() {
  const { t, tr } = useT();
  const [country, setCountry] = useState<string | null>(null);
  const [lang, setLang] = useState<string | null>("ts");
  const [tagsSel, setTagsSel] = useState<string[]>(["design", "writing"]);
  const [framework, setFramework] = useState<string | null>(null);

  return (
    <>
      <PageHead
        lead={t("pages.combobox.lead")}
        title={
          <>
            {tr("pages.combobox.titleA")}
            <em>{t("pages.combobox.titleB")}</em>
          </>
        }
        metaLabel={t("pages.combobox.metaLabel")}
        meta={t("pages.combobox.meta")}
        intro={tr("pages.combobox.intro")}
      />

      {/* i · Básico */}
      <Section
        num="i"
        title={<>{t("pages.combobox.basic.title")}</>}
        kicker={t("pages.combobox.basic.kicker")}
      >
        <p className="section-desc">{tr("pages.combobox.basic.desc")}</p>
        <Example
          caption={t("pages.combobox.basic.caption")}
          tech="single"
          stack
          code={`<Combobox
  options={countries}
  value={country}
  onChange={setCountry}
  placeholder="${t("pages.combobox.basic.placeholder")}"
/>`}
        >
          <div style={{ width: "100%", maxWidth: 360 }}>
            <Field label={t("pages.combobox.basic.field")}>
              <Combobox
                options={COUNTRIES}
                value={country}
                onChange={setCountry}
                placeholder={t("pages.combobox.basic.placeholder")}
                emptyMessage={t("pages.combobox.basic.empty")}
              />
            </Field>
          </div>
        </Example>
      </Section>

      {/* ii · Multi-select */}
      <Section
        num="ii"
        title={<>{t("pages.combobox.multi.title")}</>}
        kicker={t("pages.combobox.multi.kicker")}
      >
        <p className="section-desc">{tr("pages.combobox.multi.desc")}</p>
        <Example
          caption={t("pages.combobox.multi.caption")}
          tech="multi"
          stack
          code={`<Combobox
  multi
  options={tags}
  value={selected}
  onChange={setSelected}
  placeholder="${t("pages.combobox.multi.placeholder")}"
/>`}
        >
          <div style={{ width: "100%", maxWidth: 480 }}>
            <Field
              label={t("pages.combobox.multi.field")}
              hint={t("pages.combobox.multi.hint")}
            >
              <Combobox
                multi
                options={TAGS}
                value={tagsSel}
                onChange={setTagsSel}
                placeholder={t("pages.combobox.multi.placeholder")}
                emptyMessage={t("pages.combobox.basic.empty")}
              />
            </Field>
          </div>
        </Example>
      </Section>

      {/* ii.b · Creatable */}
      <Section
        num="iii"
        title={<>{t("pages.combobox.creatable.title")}</>}
        kicker={t("pages.combobox.creatable.kicker")}
      >
        <p className="section-desc">
          {tr("pages.combobox.creatable.desc")}
        </p>
        <Example
          caption={t("pages.combobox.creatable.caption")}
          tech="creatable"
          stack
          code={`<Combobox
  multi
  creatable
  options={tags}
  value={selected}
  onChange={setSelected}
  createLabel={(q) => <>Criar <em>"{q}"</em></>}
/>`}
        >
          <div style={{ width: "100%", maxWidth: 480 }}>
            <Field
              label={t("pages.combobox.creatable.field")}
              hint={t("pages.combobox.creatable.hint")}
            >
              <Combobox
                multi
                creatable
                options={TAGS}
                value={tagsSel}
                onChange={setTagsSel}
                placeholder={t("pages.combobox.creatable.placeholder")}
                emptyMessage={t("pages.combobox.basic.empty")}
                createLabel={(q) => (
                  <>
                    {t("pages.combobox.creatable.create")} <em>"{q}"</em>
                  </>
                )}
              />
            </Field>
          </div>
        </Example>
      </Section>

      {/* iv · Grupos */}
      <Section
        num="iv"
        title={<>{t("pages.combobox.groups.title")}</>}
        kicker={t("pages.combobox.groups.kicker")}
      >
        <p className="section-desc">{tr("pages.combobox.groups.desc")}</p>
        <Example
          caption={t("pages.combobox.groups.caption")}
          tech="grouped"
          stack
          code={`const langs = [
  { value: "ts", label: "TypeScript", group: "Typed" },
  { value: "py", label: "Python", group: "Dynamic" },
  ...
];
<Combobox options={langs} value={lang} onChange={setLang} />`}
        >
          <div style={{ width: "100%", maxWidth: 360 }}>
            <Field label={t("pages.combobox.groups.field")}>
              <Combobox
                options={LANGS}
                value={lang}
                onChange={setLang}
                placeholder={t("pages.combobox.groups.placeholder")}
                emptyMessage={t("pages.combobox.basic.empty")}
              />
            </Field>
          </div>
        </Example>
      </Section>

      {/* v · Disabled state + custom render */}
      <Section
        num="v"
        title={<>{t("pages.combobox.states.title")}</>}
        kicker={t("pages.combobox.states.kicker")}
      >
        <p className="section-desc">{tr("pages.combobox.states.desc")}</p>
        <Example
          caption={t("pages.combobox.states.caption")}
          tech="disabled options"
          stack
          code={`const opts = [
  { value: "react",   label: "React" },
  { value: "vue",     label: "Vue", disabled: true },
  { value: "angular", label: "Angular" },
];`}
        >
          <div style={{ width: "100%", maxWidth: 360 }}>
            <Field
              label={t("pages.combobox.states.field")}
              hint={t("pages.combobox.states.hint")}
            >
              <Combobox
                options={[
                  { value: "react", label: "React" },
                  { value: "vue", label: "Vue", disabled: true },
                  { value: "svelte", label: "Svelte" },
                  { value: "angular", label: "Angular", disabled: true },
                  { value: "solid", label: "Solid" },
                  { value: "qwik", label: "Qwik" },
                ]}
                value={framework}
                onChange={setFramework}
                placeholder={t("pages.combobox.states.placeholder")}
              />
            </Field>
          </div>
        </Example>
      </Section>

      {/* vi · Disabled total */}
      <Section
        num="vi"
        title={<>{t("pages.combobox.disabled.title")}</>}
        kicker={t("pages.combobox.disabled.kicker")}
      >
        <p className="section-desc">{tr("pages.combobox.disabled.desc")}</p>
        <Example
          caption={t("pages.combobox.disabled.caption")}
          tech="disabled"
          stack
          code={`<Combobox disabled options={...} value="ts" />`}
        >
          <div style={{ width: "100%", maxWidth: 360 }}>
            <Field label={t("pages.combobox.disabled.field")}>
              <Combobox
                disabled
                options={LANGS}
                value="ts"
                onChange={() => {}}
                placeholder=""
              />
            </Field>
          </div>
        </Example>
      </Section>

      <CompositionSection
        num="vii"
        i18nPrefix="pages.combobox.composition"
        root="Combobox"
        nodes={[]}
      />
    </>
  );
}
