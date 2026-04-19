import { useState } from "react";
import {
  PageHead,
  Section,
  Example,
  CompositionSection,
  Button,
  Field,
  Input,
} from "../ds/primitives.tsx";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  type PopoverPlacement,
} from "../ds/Popover.tsx";
import { useT } from "../lib/i18n.tsx";

const PLACEMENTS: PopoverPlacement[] = [
  "top-start",
  "top-center",
  "top-end",
  "right-start",
  "right-center",
  "right-end",
  "bottom-start",
  "bottom-center",
  "bottom-end",
  "left-start",
  "left-center",
  "left-end",
];

export default function PopoverPage() {
  const { t, tr } = useT();
  const [name, setName] = useState("");

  return (
    <>
      <PageHead
        lead={t("pages.popover.lead")}
        title={
          <>
            {tr("pages.popover.titleA")}
            <em>{t("pages.popover.titleB")}</em>
          </>
        }
        metaLabel={t("pages.popover.metaLabel")}
        meta={t("pages.popover.meta")}
        intro={tr("pages.popover.intro")}
      />

      {/* i · Básico */}
      <Section
        num="i"
        title={<>{t("pages.popover.basic.title")}</>}
        kicker={t("pages.popover.basic.kicker")}
      >
        <p className="section-desc">{tr("pages.popover.basic.desc")}</p>
        <Example
          caption={t("pages.popover.basic.caption")}
          tech="uncontrolled"
          stack
          code={`<Popover>
  <PopoverTrigger>
    <Button>${t("pages.popover.basic.btn")}</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>${t("pages.popover.basic.body")}</p>
  </PopoverContent>
</Popover>`}
        >
          <div style={{ padding: "var(--space-6) 0" }}>
            <Popover>
              <PopoverTrigger>
                <Button>{t("pages.popover.basic.btn")}</Button>
              </PopoverTrigger>
              <PopoverContent>
                <div style={{ padding: "var(--space-4)" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 14,
                      lineHeight: 1.5,
                      color: "var(--ink)",
                      maxWidth: 240,
                    }}
                  >
                    {t("pages.popover.basic.body")}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </Example>
      </Section>

      {/* ii · 12 placements */}
      <Section
        num="ii"
        title={<>{t("pages.popover.placements.title")}</>}
        kicker={t("pages.popover.placements.kicker")}
      >
        <p className="section-desc">
          {tr("pages.popover.placements.desc")}
        </p>
        <Example
          caption={t("pages.popover.placements.caption")}
          tech="12 placements"
          stack
          code={`<Popover>
  <PopoverTrigger>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent placement="top-end">…</PopoverContent>
</Popover>`}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, auto)",
              gap: "var(--space-3)",
              padding: "var(--space-7) 0",
              justifyContent: "center",
            }}
          >
            {PLACEMENTS.map((p) => (
              <Popover key={p}>
                <PopoverTrigger>
                  <Button size="sm" variant="ghost">
                    {p}
                  </Button>
                </PopoverTrigger>
                <PopoverContent placement={p} arrow>
                  <div
                    style={{
                      padding: "var(--space-3) var(--space-4)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      color: "var(--ink-soft)",
                    }}
                  >
                    {p}
                  </div>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        </Example>
      </Section>

      {/* iii · Com arrow */}
      <Section
        num="iii"
        title={<>{t("pages.popover.arrow.title")}</>}
        kicker={t("pages.popover.arrow.kicker")}
      >
        <p className="section-desc">{tr("pages.popover.arrow.desc")}</p>
        <Example
          caption={t("pages.popover.arrow.caption")}
          tech="arrow"
          stack
          code={`<Popover>
  <PopoverTrigger>
    <Button variant="primary">${t("pages.popover.arrow.btn")}</Button>
  </PopoverTrigger>
  <PopoverContent arrow placement="bottom-center">
    …
  </PopoverContent>
</Popover>`}
        >
          <div
            style={{
              padding: "var(--space-6) 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Popover>
              <PopoverTrigger>
                <Button variant="primary">
                  {t("pages.popover.arrow.btn")}
                </Button>
              </PopoverTrigger>
              <PopoverContent arrow placement="bottom-center">
                <div
                  style={{
                    padding: "var(--space-4)",
                    fontFamily: "var(--font-serif)",
                    fontSize: 14,
                    color: "var(--ink)",
                    maxWidth: 220,
                  }}
                >
                  {t("pages.popover.arrow.body")}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </Example>
      </Section>

      {/* iv · Com formulário */}
      <Section
        num="iv"
        title={<>{t("pages.popover.form.title")}</>}
        kicker={t("pages.popover.form.kicker")}
      >
        <p className="section-desc">{tr("pages.popover.form.desc")}</p>
        <Example
          caption={t("pages.popover.form.caption")}
          tech="rich content"
          stack
          code={`<Popover>
  <PopoverTrigger>
    <Button variant="ghost">${t("pages.popover.form.btn")}</Button>
  </PopoverTrigger>
  <PopoverContent placement="bottom-start" minWidth={280}>
    <Field label="${t("pages.popover.form.label")}">
      <Input … />
    </Field>
    <Button variant="primary" size="sm">${t("pages.popover.form.save")}</Button>
  </PopoverContent>
</Popover>`}
        >
          <div style={{ padding: "var(--space-6) 0" }}>
            <Popover>
              <PopoverTrigger>
                <Button variant="ghost">
                  {t("pages.popover.form.btn")}
                </Button>
              </PopoverTrigger>
              <PopoverContent placement="bottom-start" minWidth={280}>
                <div
                  style={{
                    padding: "var(--space-4)",
                    display: "grid",
                    gap: "var(--space-3)",
                  }}
                >
                  <Field label={t("pages.popover.form.label")}>
                    <Input
                      value={name}
                      onChange={(e: any) => setName(e.target.value)}
                      placeholder={t("pages.popover.form.placeholder")}
                    />
                  </Field>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button size="sm" variant="ghost">
                      {t("pages.popover.form.cancel")}
                    </Button>
                    <Button size="sm" variant="primary">
                      {t("pages.popover.form.save")}
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </Example>
      </Section>

      {/* v · Auto-flip */}
      <Section
        num="v"
        title={<>{t("pages.popover.flip.title")}</>}
        kicker={t("pages.popover.flip.kicker")}
      >
        <p className="section-desc">{tr("pages.popover.flip.desc")}</p>
      </Section>

      <CompositionSection
        num="vi"
        i18nPrefix="pages.popover.composition"
        root="Popover"
        nodes={[
          { name: "PopoverTrigger" },
          { name: "PopoverContent" },
        ]}
      />
    </>
  );
}
