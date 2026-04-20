import {
  PageHead,
  Section,
  Example,
  CompositionSection,
} from "../ds/primitives.tsx";
import { KBD, KbdCombo, InlineCode } from "../ds/KBD.tsx";
import { useT } from "../lib/i18n.tsx";

export default function KBDPage() {
  const { t, tr } = useT();

  return (
    <>
      <PageHead
        lead={t("pages.kbd.lead")}
        title={
          <>
            {tr("pages.kbd.titleA")}
            <em>{t("pages.kbd.titleB")}</em>
          </>
        }
        metaLabel={t("pages.kbd.metaLabel")}
        meta={t("pages.kbd.meta")}
        intro={tr("pages.kbd.intro")}
      />

      {/* i · KBD variants */}
      <Section
        num="i"
        title={<>{t("pages.kbd.variants.title")}</>}
        kicker={t("pages.kbd.variants.kicker")}
      >
        <Example
          caption={t("pages.kbd.variants.caption")}
          tech="boxed · outline · subtle"
          stack
          code={`<KBD variant="boxed">⌘</KBD>
<KBD variant="outline">⌘</KBD>
<KBD variant="subtle">⌘</KBD>`}
        >
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <KBD variant="boxed">⌘</KBD>
            <KBD variant="boxed">K</KBD>
            <KBD variant="outline">Esc</KBD>
            <KBD variant="subtle">↵</KBD>
            <KBD variant="boxed">Shift</KBD>
            <KBD variant="boxed">?</KBD>
          </div>
        </Example>
      </Section>

      {/* ii · Sizes */}
      <Section
        num="ii"
        title={<>{t("pages.kbd.sizes.title")}</>}
        kicker={t("pages.kbd.sizes.kicker")}
      >
        <Example
          caption={t("pages.kbd.sizes.caption")}
          tech="size='sm' | 'md'"
          stack
          code={`<KBD size="sm">⌘</KBD>
<KBD size="md">⌘</KBD>`}
        >
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <KBD size="sm">⌘</KBD>
            <KBD size="sm">K</KBD>
            <span style={{ width: 24 }} />
            <KBD size="md">⌘</KBD>
            <KBD size="md">K</KBD>
          </div>
        </Example>
      </Section>

      {/* iii · KbdCombo */}
      <Section
        num="iii"
        title={<>{t("pages.kbd.combo.title")}</>}
        kicker={t("pages.kbd.combo.kicker")}
      >
        <Example
          caption={t("pages.kbd.combo.caption")}
          tech="<KbdCombo />"
          stack
          code={`<KbdCombo keys={["⌘", "K"]} />
<KbdCombo keys={["Ctrl", "Shift", "P"]} separator="+" />`}
        >
          <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            <KbdCombo keys={["⌘", "K"]} />
            <KbdCombo keys={["⌘", "Shift", "P"]} />
            <KbdCombo keys={["Ctrl", "Shift", "P"]} separator="+" />
            <KbdCombo keys={["?"]} variant="outline" />
          </div>
        </Example>
      </Section>

      {/* iv · Inline em parágrafo */}
      <Section
        num="iv"
        title={<>{t("pages.kbd.inline.title")}</>}
        kicker={t("pages.kbd.inline.kicker")}
      >
        <Example
          caption={t("pages.kbd.inline.caption")}
          tech="prose"
          stack
        >
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-serif)",
              fontSize: 15,
              lineHeight: 1.6,
              color: "var(--ink)",
            }}
          >
            {tr("pages.kbd.inline.paragraph", {
              cmd: <KbdCombo keys={["⌘", "K"]} />,
              esc: <KBD>Esc</KBD>,
            })}
          </p>
        </Example>
      </Section>

      {/* v · InlineCode */}
      <Section
        num="v"
        title={<>{t("pages.kbd.code.title")}</>}
        kicker={t("pages.kbd.code.kicker")}
      >
        <Example
          caption={t("pages.kbd.code.caption")}
          tech="<InlineCode />"
          stack
          code={`<InlineCode>useState()</InlineCode>
<InlineCode variant="boxed">npm install</InlineCode>
<InlineCode variant="outline">--flag</InlineCode>`}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-serif)",
              fontSize: 15,
              lineHeight: 1.7,
              color: "var(--ink)",
            }}
          >
            {tr("pages.kbd.code.paragraph", {
              hook: <InlineCode>useState()</InlineCode>,
              cmd: <InlineCode variant="boxed">npm install</InlineCode>,
              flag: <InlineCode variant="outline">--strict</InlineCode>,
            })}
          </p>
        </Example>
      </Section>

      <CompositionSection
        num="vi"
        i18nPrefix="pages.kbd.composition"
        root="KBD / InlineCode"
        nodes={[
          { name: "KBD", children: [{ name: "kbd (HTML)" }] },
          {
            name: "KbdCombo",
            children: [{ name: "KBD" }, { name: "separator (opcional)" }],
          },
          { name: "InlineCode", children: [{ name: "code (HTML)" }] },
        ]}
      />
    </>
  );
}
