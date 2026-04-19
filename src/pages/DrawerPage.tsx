import { useState } from "react";
import {
  PageHead,
  Section,
  Example,
  CompositionSection,
  Button,
  Field,
  Input,
  Textarea,
} from "../ds/primitives.tsx";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerBody,
  DrawerFooter,
  type DrawerSide,
} from "../ds/Drawer.tsx";
import { useT } from "../lib/i18n.tsx";

const SIDES: DrawerSide[] = ["right", "left", "top", "bottom"];

export default function DrawerPage() {
  const { t, tr } = useT();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  return (
    <>
      <PageHead
        lead={t("pages.drawer.lead")}
        title={
          <>
            {tr("pages.drawer.titleA")}
            <em>{t("pages.drawer.titleB")}</em>
          </>
        }
        metaLabel={t("pages.drawer.metaLabel")}
        meta={t("pages.drawer.meta")}
        intro={tr("pages.drawer.intro")}
      />

      {/* i · Básico (right) */}
      <Section
        num="i"
        title={<>{t("pages.drawer.basic.title")}</>}
        kicker={t("pages.drawer.basic.kicker")}
      >
        <p className="section-desc">{tr("pages.drawer.basic.desc")}</p>
        <Example
          caption={t("pages.drawer.basic.caption")}
          tech="side=right"
          stack
          code={`<Drawer side="right">
  <DrawerTrigger>
    <Button>${t("pages.drawer.basic.btn")}</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>${t("pages.drawer.basic.heading")}</DrawerTitle>
      <DrawerClose />
    </DrawerHeader>
    <DrawerBody>${t("pages.drawer.basic.body")}</DrawerBody>
  </DrawerContent>
</Drawer>`}
        >
          <div style={{ padding: "var(--space-5) 0" }}>
            <Drawer side="right">
              <DrawerTrigger>
                <Button>{t("pages.drawer.basic.btn")}</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>{t("pages.drawer.basic.heading")}</DrawerTitle>
                  <DrawerClose label={t("pages.drawer.close")} />
                </DrawerHeader>
                <DrawerBody>
                  <p style={{ margin: 0 }}>{t("pages.drawer.basic.body")}</p>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </div>
        </Example>
      </Section>

      {/* ii · 4 lados */}
      <Section
        num="ii"
        title={<>{t("pages.drawer.sides.title")}</>}
        kicker={t("pages.drawer.sides.kicker")}
      >
        <p className="section-desc">{tr("pages.drawer.sides.desc")}</p>
        <Example
          caption={t("pages.drawer.sides.caption")}
          tech="4 sides"
          stack
          code={`<Drawer side="left">…</Drawer>
<Drawer side="right">…</Drawer>
<Drawer side="top">…</Drawer>
<Drawer side="bottom">…</Drawer>`}
        >
          <div
            style={{
              padding: "var(--space-5) 0",
              display: "flex",
              gap: "var(--space-3)",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {SIDES.map((side) => (
              <Drawer key={side} side={side}>
                <DrawerTrigger>
                  <Button variant="ghost">
                    {t(`pages.drawer.sides.${side}`)}
                  </Button>
                </DrawerTrigger>
                <DrawerContent
                  size={side === "top" || side === "bottom" ? 240 : 380}
                >
                  <DrawerHeader>
                    <DrawerTitle>
                      {t("pages.drawer.sides.title2")}{" "}
                      <em>{t(`pages.drawer.sides.${side}`)}</em>
                    </DrawerTitle>
                    <DrawerClose label={t("pages.drawer.close")} />
                  </DrawerHeader>
                  <DrawerBody>
                    <p style={{ margin: 0 }}>
                      {t("pages.drawer.sides.body")}
                    </p>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            ))}
          </div>
        </Example>
      </Section>

      {/* iii · Com formulário */}
      <Section
        num="iii"
        title={<>{t("pages.drawer.form.title")}</>}
        kicker={t("pages.drawer.form.kicker")}
      >
        <p className="section-desc">{tr("pages.drawer.form.desc")}</p>
        <Example
          caption={t("pages.drawer.form.caption")}
          tech="rich content"
          stack
          code={`<Drawer side="right">
  <DrawerTrigger>
    <Button variant="primary">${t("pages.drawer.form.btn")}</Button>
  </DrawerTrigger>
  <DrawerContent size={420}>
    <DrawerHeader>
      <DrawerTitle>${t("pages.drawer.form.heading")}</DrawerTitle>
      <DrawerClose />
    </DrawerHeader>
    <DrawerBody>
      <Field label="${t("pages.drawer.form.name")}"><Input /></Field>
      <Field label="${t("pages.drawer.form.bio")}"><Textarea /></Field>
    </DrawerBody>
    <DrawerFooter>
      <Button variant="ghost">${t("pages.drawer.form.cancel")}</Button>
      <Button variant="primary">${t("pages.drawer.form.save")}</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
        >
          <div style={{ padding: "var(--space-5) 0" }}>
            <Drawer side="right">
              <DrawerTrigger>
                <Button variant="primary">
                  {t("pages.drawer.form.btn")}
                </Button>
              </DrawerTrigger>
              <DrawerContent size={420}>
                <DrawerHeader>
                  <DrawerTitle>{t("pages.drawer.form.heading")}</DrawerTitle>
                  <DrawerClose label={t("pages.drawer.close")} />
                </DrawerHeader>
                <DrawerBody>
                  <div style={{ display: "grid", gap: "var(--space-4)" }}>
                    <Field label={t("pages.drawer.form.name")}>
                      <Input
                        value={name}
                        onChange={(e: any) => setName(e.target.value)}
                        placeholder={t("pages.drawer.form.namePh")}
                      />
                    </Field>
                    <Field
                      label={t("pages.drawer.form.bio")}
                      hint={t("pages.drawer.form.bioHint")}
                    >
                      <Textarea
                        value={bio}
                        onChange={(e: any) => setBio(e.target.value)}
                        rows={5}
                      />
                    </Field>
                  </div>
                </DrawerBody>
                <DrawerFooter>
                  <Button variant="ghost">
                    {t("pages.drawer.form.cancel")}
                  </Button>
                  <Button variant="primary">
                    {t("pages.drawer.form.save")}
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </Example>
      </Section>

      {/* iv · Tamanho customizado */}
      <Section
        num="iv"
        title={<>{t("pages.drawer.size.title")}</>}
        kicker={t("pages.drawer.size.kicker")}
      >
        <p className="section-desc">{tr("pages.drawer.size.desc")}</p>
        <Example
          caption={t("pages.drawer.size.caption")}
          tech="size prop"
          stack
          code={`<DrawerContent size={560}>…</DrawerContent>`}
        >
          <div
            style={{
              padding: "var(--space-5) 0",
              display: "flex",
              gap: "var(--space-3)",
              justifyContent: "center",
            }}
          >
            {[280, 380, 560].map((size) => (
              <Drawer key={size} side="right">
                <DrawerTrigger>
                  <Button variant="ghost">{size}px</Button>
                </DrawerTrigger>
                <DrawerContent size={size}>
                  <DrawerHeader>
                    <DrawerTitle>{size}px</DrawerTitle>
                    <DrawerClose label={t("pages.drawer.close")} />
                  </DrawerHeader>
                  <DrawerBody>
                    <p style={{ margin: 0 }}>
                      {t("pages.drawer.size.body", {
                        size: String(size),
                      })}
                    </p>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            ))}
          </div>
        </Example>
      </Section>

      <CompositionSection
        num="v"
        i18nPrefix="pages.drawer.composition"
        root="Drawer"
        nodes={[
          { name: "DrawerTrigger" },
          {
            name: "DrawerContent",
            children: [
              {
                name: "DrawerHeader",
                children: [
                  { name: "DrawerTitle" },
                  { name: "DrawerClose" },
                ],
              },
              { name: "DrawerBody" },
              { name: "DrawerFooter" },
            ],
          },
        ]}
      />
    </>
  );
}
