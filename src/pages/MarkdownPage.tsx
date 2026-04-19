import { useState } from "react";
import {
  PageHead,
  Section,
  Example,
  CompositionSection,
  Field,
  Textarea,
} from "../ds/primitives.tsx";
import { MarkdownViewer } from "../ds/MarkdownViewer.tsx";
import { useT } from "../lib/i18n.tsx";

const SAMPLE_MD = `# Atelier — design system

Um design system **editorial** com [zero dependências](https://github.com).

## Princípios

- *Tipografia* como espinha
- **Cores** sóbrias, acento parcimonioso
- Right angles — sem \`border-radius\`

> A serifa não é decoração: é compromisso com a leitura.

### Code

\`\`\`tsx
import { Button } from "@atelier/ds";

<Button variant="primary">Confirmar</Button>
\`\`\`

---

Saiba mais em [/code](#code).`;

export default function MarkdownPage() {
  const { t, tr } = useT();
  const [draft, setDraft] = useState(SAMPLE_MD);

  return (
    <>
      <PageHead
        lead={t("pages.markdown.lead")}
        title={
          <>
            {tr("pages.markdown.titleA")}
            <em>{t("pages.markdown.titleB")}</em>
          </>
        }
        metaLabel={t("pages.markdown.metaLabel")}
        meta={t("pages.markdown.meta")}
        intro={tr("pages.markdown.intro")}
      />

      {/* i · Render básico */}
      <Section
        num="i"
        title={<>{t("pages.markdown.basic.title")}</>}
        kicker={t("pages.markdown.basic.kicker")}
      >
        <p className="section-desc">{tr("pages.markdown.basic.desc")}</p>
        <Example
          caption={t("pages.markdown.basic.caption")}
          tech="default"
          stack
          code={`<MarkdownViewer>{markdownString}</MarkdownViewer>`}
        >
          <div
            style={{
              padding: "var(--space-4)",
              border: "1px solid var(--rule-soft)",
              background: "var(--bg-panel)",
              width: "100%",
            }}
          >
            <MarkdownViewer>{SAMPLE_MD}</MarkdownViewer>
          </div>
        </Example>
      </Section>

      {/* ii · Editor + preview ao vivo */}
      <Section
        num="ii"
        title={<>{t("pages.markdown.live.title")}</>}
        kicker={t("pages.markdown.live.kicker")}
      >
        <p className="section-desc">{tr("pages.markdown.live.desc")}</p>
        <Example
          caption={t("pages.markdown.live.caption")}
          tech="textarea + viewer"
          stack
          code={`const [md, setMd] = useState("# Olá");

<>
  <Textarea value={md} onChange={(e) => setMd(e.target.value)} />
  <MarkdownViewer>{md}</MarkdownViewer>
</>`}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--space-4)",
              width: "100%",
            }}
          >
            <Field label={t("pages.markdown.live.editor")}>
              <Textarea
                rows={18}
                value={draft}
                onChange={(e: any) => setDraft(e.target.value)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  lineHeight: 1.6,
                }}
              />
            </Field>
            <Field label={t("pages.markdown.live.preview")}>
              <div
                style={{
                  padding: "var(--space-4)",
                  border: "1px solid var(--rule-soft)",
                  background: "var(--bg-panel)",
                  minHeight: 320,
                }}
              >
                <MarkdownViewer>{draft}</MarkdownViewer>
              </div>
            </Field>
          </div>
        </Example>
      </Section>

      {/* iii · Suporte */}
      <Section
        num="iii"
        title={<>{t("pages.markdown.support.title")}</>}
        kicker={t("pages.markdown.support.kicker")}
      >
        <p className="section-desc">{tr("pages.markdown.support.desc")}</p>
      </Section>

      <CompositionSection
        num="iv"
        i18nPrefix="pages.markdown.composition"
        root="MarkdownViewer"
        nodes={[]}
      />
    </>
  );
}
