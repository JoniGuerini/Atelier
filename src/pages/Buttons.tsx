import { useState } from "react";
import {
  PageHead,
  Section,
  Button,
  Example,
  SidebarToggle,
  CompositionSection,
} from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";

export default function Buttons() {
  const { t, tr } = useT();
  const lb = (k: any) => t(`pages.buttons.labels.${k}`);
  const [demoCollapsed, setDemoCollapsed] = useState(false);

  return (
    <>
      <PageHead
        lead={t("pages.buttons.lead")}
        title={
          <>
            {tr("pages.buttons.titleA")}
            <em>{t("pages.buttons.titleB")}</em>
          </>
        }
        metaLabel={t("pages.buttons.metaLabel")}
        meta={t("pages.buttons.meta")}
        intro={tr("pages.buttons.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.buttons.variants.title")}</>}
        kicker={t("pages.buttons.variants.kicker")}
      >
        <Example
          caption={t("pages.buttons.variants.caption")}
          tech=".ds-btn"
          center
          code={`<Button variant="primary">${lb("primary")}</Button>
<Button>${lb("secondary")}</Button>
<Button variant="accent">${lb("accent")}</Button>
<Button variant="ghost">${lb("ghost")}</Button>
<Button variant="link">${lb("link")}</Button>`}
        >
          <Button variant="primary">{lb("primary")}</Button>
          <Button>{lb("secondary")}</Button>
          <Button variant="accent">{lb("accent")}</Button>
          <Button variant="ghost">{lb("ghost")}</Button>
          <Button variant="link">{lb("link")}</Button>
        </Example>
      </Section>

      <Section
        num="ii"
        title={<>{t("pages.buttons.sizes.title")}</>}
        kicker={t("pages.buttons.sizes.kicker")}
      >
        <Example
          caption={t("pages.buttons.sizes.caption")}
          tech="size prop"
          center
          code={`<Button size="sm" variant="primary">${lb("sm")}</Button>
<Button size="md" variant="primary">${lb("md")}</Button>
<Button size="lg" variant="primary">${lb("lg")}</Button>`}
        >
          <Button size="sm" variant="primary">{lb("sm")}</Button>
          <Button size="md" variant="primary">{lb("md")}</Button>
          <Button size="lg" variant="primary">{lb("lg")}</Button>
        </Example>
      </Section>

      <Section
        num="iii"
        title={<>{t("pages.buttons.states.title")}</>}
        kicker={t("pages.buttons.states.kicker")}
      >
        <Example
          caption={t("pages.buttons.states.caption")}
          tech="disabled"
          code={`<Button variant="primary">${lb("active")}</Button>
<Button variant="primary" disabled>${lb("disabled")}</Button>
<Button disabled>${lb("disabled")}</Button>
<Button variant="accent" disabled>${lb("disabled")}</Button>`}
        >
          <Button variant="primary">{lb("active")}</Button>
          <Button variant="primary" disabled>{lb("disabled")}</Button>
          <Button disabled>{lb("disabled")}</Button>
          <Button variant="accent" disabled>{lb("disabled")}</Button>
        </Example>
      </Section>

      <Section
        num="iv"
        title={
          <>
            {tr("pages.buttons.glyphs.titleA")}
            <em>{t("pages.buttons.glyphs.titleB")}</em>
          </>
        }
        kicker={t("pages.buttons.glyphs.kicker")}
      >
        <Example
          caption={t("pages.buttons.glyphs.caption")}
          tech="inline unicode"
          center
          code={`<Button variant="primary">
  ${lb("next")} <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>→</span>
</Button>

<Button>
  <span style={{ color: "var(--accent)", fontStyle: "italic" }}>+</span> ${lb("newItem")}
</Button>

<Button variant="ghost">
  ${lb("download")} <span style={{ color: "var(--accent)", fontStyle: "italic" }}>↓</span>
</Button>`}
        >
          <Button variant="primary">
            {lb("next")}{" "}
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: "currentColor",
                fontSize: 14,
                letterSpacing: 0,
              }}
            >
              →
            </span>
          </Button>
          <Button>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: "var(--accent)",
                fontSize: 14,
                letterSpacing: 0,
              }}
            >
              +
            </span>{" "}
            {lb("newItem")}
          </Button>
          <Button variant="ghost">
            {lb("download")}{" "}
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: "var(--accent)",
                fontSize: 14,
                letterSpacing: 0,
              }}
            >
              ↓
            </span>
          </Button>
        </Example>
      </Section>

      <Section
        num="v"
        title={<>{t("pages.buttons.group.title")}</>}
        kicker={t("pages.buttons.group.kicker")}
      >
        <Example
          caption={t("pages.buttons.group.caption")}
          tech="footer pattern"
          center
          code={`<div style={{ display: "flex", gap: 12 }}>
  <Button variant="ghost">${lb("cancel")}</Button>
  <Button>${lb("draft")}</Button>
  <Button variant="primary">${lb("publish")}</Button>
</div>`}
        >
          <div
            style={{
              display: "flex",
              gap: 12,
              padding: "16px 20px",
              background: "var(--bg)",
              border: "1px solid var(--rule-soft)",
            }}
          >
            <Button variant="ghost">{lb("cancel")}</Button>
            <Button>{lb("draft")}</Button>
            <Button variant="primary">{lb("publish")}</Button>
          </div>
        </Example>
      </Section>

      <Section
        num="vi"
        title={<>{t("pages.buttons.sidebarToggle.title")}</>}
        kicker={t("pages.buttons.sidebarToggle.kicker")}
        desc={tr("pages.buttons.sidebarToggle.note")}
      >
        <Example
          caption={t("pages.buttons.sidebarToggle.caption")}
          tech=".ds-sidebar-toggle"
          center
          code={`const [collapsed, setCollapsed] = useState(false);

<SidebarToggle
  collapsed={collapsed}
  onToggle={() => setCollapsed((c) => !c)}
/>`}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "16px 20px",
              background: "var(--bg)",
              border: "1px solid var(--rule-soft)",
            }}
          >
            <SidebarToggle
              collapsed={demoCollapsed}
              onToggle={() => setDemoCollapsed((c) => !c)}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--ink-faint)",
              }}
            >
              collapsed = {String(demoCollapsed)}
            </span>
          </div>
        </Example>
      </Section>

      <Section
        num="vii"
        title={<>{t("pages.buttons.backToTop.title")}</>}
        kicker={t("pages.buttons.backToTop.kicker")}
        desc={tr("pages.buttons.backToTop.note")}
      >
        <Example
          caption={t("pages.buttons.backToTop.caption")}
          tech=".ds-back-to-top"
          code={`// globalmente montado na aplicação
<BackToTop />

// ou com threshold customizado
<BackToTop threshold={600} />

// ou controlando um container rolável específico
<BackToTop scrollTarget={myRef.current} />`}
        >
          <div
            style={{
              padding: "16px 20px",
              background: "var(--bg)",
              border: "1px solid var(--rule-soft)",
              color: "var(--ink-faint)",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            ↳ role a página para vê-lo aparecer
          </div>
        </Example>
      </Section>

      <CompositionSection
        num="viii"
        i18nPrefix="pages.buttons.composition"
        root="Button"
        nodes={[
          { name: "SidebarToggle (variante)" },
          { name: "BackToTop (variante)" },
        ]}
      />
    </>
  );
}
