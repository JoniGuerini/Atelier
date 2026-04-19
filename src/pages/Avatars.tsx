import { useState } from "react";
import {
  PageHead,
  Section,
  Example,
  Avatar,
  AvatarGroup,
  CompositionSection,
} from "../ds/primitives.tsx";
import { AvatarPicker } from "../ds/AvatarPicker.tsx";
import { AVATAR_PRESETS } from "../ds/avatarPresets.tsx";
import { useT } from "../lib/i18n.tsx";

/* Imagem-exemplo 100% inline (sem asset externo) — retrato tipográfico. */
const SAMPLE_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
  <defs>
    <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#c8361d"/>
      <stop offset="1" stop-color="#8c2414"/>
    </linearGradient>
  </defs>
  <rect width="96" height="96" fill="url(#g)"/>
  <text x="48" y="62" text-anchor="middle"
        font-family="Georgia, serif" font-style="italic"
        font-size="48" fill="#faf8f3">C</text>
</svg>`);

export default function Avatars() {
  const { t, tr } = useT();
  const [value, setValue] = useState({ kind: "initials", initials: "CA" });

  return (
    <>
      <PageHead
        lead={t("pages.avatars.lead")}
        title={
          <>
            {tr("pages.avatars.titleA")}
            <em>{t("pages.avatars.titleB")}</em>
          </>
        }
        metaLabel={t("pages.avatars.metaLabel")}
        meta={t("pages.avatars.meta")}
        intro={tr("pages.avatars.intro")}
      />

      {/* i · Variantes */}
      <Section
        num="i"
        title={<>{t("pages.avatars.variants.title")}</>}
        kicker={t("pages.avatars.variants.kicker")}
      >
        <Example
          caption={t("pages.avatars.variants.caption")}
          tech=".ds-avatar"
          center
          code={`<Avatar initials="CA" />
<Avatar initials="JO" variant="solid" />
<Avatar initials="MR" variant="accent" />`}
        >
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <Avatar initials="CA" />
            <Avatar initials="JO" variant="solid" />
            <Avatar initials="MR" variant="accent" />
          </div>
        </Example>
      </Section>

      {/* ii · Tamanhos */}
      <Section
        num="ii"
        title={<>{t("pages.avatars.sizes.title")}</>}
        kicker={t("pages.avatars.sizes.kicker")}
      >
        <Example
          caption={t("pages.avatars.sizes.caption")}
          tech="size prop"
          center
          code={`<Avatar initials="CA" size="sm" />
<Avatar initials="CA" />
<Avatar initials="CA" size="lg" />
<Avatar initials="CA" size="xl" />`}
        >
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <Avatar initials="CA" size="sm" />
            <Avatar initials="CA" />
            <Avatar initials="CA" size="lg" />
            <Avatar initials="CA" size="xl" />
          </div>
        </Example>
      </Section>

      {/* iii · Com imagem */}
      <Section
        num="iii"
        title={<>{t("pages.avatars.image.title")}</>}
        kicker={t("pages.avatars.image.kicker")}
      >
        <Example
          caption={t("pages.avatars.image.caption")}
          tech="src prop"
          center
          code={`<Avatar src="/me.jpg" alt="Clara" initials="CA" />
<Avatar src="/me.jpg" alt="Clara" size="lg" shape="circle" />
<Avatar src="/me.jpg" alt="Clara" size="xl" shape="circle" />`}
        >
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <Avatar src={SAMPLE_IMAGE} initials="CA" alt="Clara" />
            <Avatar src={SAMPLE_IMAGE} initials="CA" alt="Clara" size="lg" shape="circle" />
            <Avatar src={SAMPLE_IMAGE} initials="CA" alt="Clara" size="xl" shape="circle" />
          </div>
        </Example>
      </Section>

      {/* iv · Galeria de presets */}
      <Section
        num="iv"
        title={<>{t("pages.avatars.presets.title")}</>}
        kicker={t("pages.avatars.presets.kicker")}
      >
        <Example
          caption={t("pages.avatars.presets.caption")}
          tech="AVATAR_PRESETS"
          stack
          code={`import { AVATAR_PRESETS } from "@/ds/avatarPresets";

{AVATAR_PRESETS.map(p => (
  <Avatar key={p.id} shape="circle" size="lg">
    {p.render()}
  </Avatar>
))}`}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
              gap: 16,
              width: "100%",
            }}
          >
            {AVATAR_PRESETS.map((p: any) => (
              <div
                key={p.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Avatar shape="circle" size="lg">
                  {p.render()}
                </Avatar>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--ink-faint)",
                  }}
                >
                  {p.id}
                </span>
              </div>
            ))}
          </div>
        </Example>
      </Section>

      {/* v · Picker completo */}
      <Section
        num="v"
        title={<>{t("pages.avatars.picker.title")}</>}
        kicker={t("pages.avatars.picker.kicker")}
      >
        <Example
          caption={t("pages.avatars.picker.caption")}
          tech="<AvatarPicker />"
          stack
          code={`import { AvatarPicker } from "@/ds/AvatarPicker";

const [value, setValue] = useState({ kind: "initials", initials: "CA" });

<AvatarPicker
  value={value}
  onChange={setValue}
  initials="CA"
/>`}
        >
          <AvatarPicker value={value} onChange={setValue} initials="CA" />
        </Example>
      </Section>

      {/* vi · Grupo sobreposto */}
      <Section
        num="vi"
        title={<>{t("pages.avatars.group.title")}</>}
        kicker={t("pages.avatars.group.kicker")}
      >
        <Example
          caption={t("pages.avatars.group.caption")}
          tech="<AvatarGroup />"
          center
          code={`<AvatarGroup max={4}>
  <Avatar initials="CA" />
  <Avatar initials="JO" variant="solid" />
  <Avatar initials="MR" variant="accent" />
  <Avatar initials="LP" />
  <Avatar initials="XX" />
  <Avatar initials="YY" />
</AvatarGroup>`}
        >
          <AvatarGroup max={4}>
            <Avatar initials="CA" />
            <Avatar initials="JO" variant="solid" />
            <Avatar initials="MR" variant="accent" />
            <Avatar initials="LP" />
            <Avatar initials="XX" />
            <Avatar initials="YY" />
          </AvatarGroup>
        </Example>
      </Section>

      <CompositionSection
        num="vii"
        i18nPrefix="pages.avatars.composition"
        root="Avatar"
        nodes={[
          { name: "AvatarGroup", children: [{ name: "Avatar" }] },
          {
            name: "AvatarPicker",
            children: [
              { name: "AvatarPicker.Trigger" },
              { name: "AvatarPicker.Cropper" },
              { name: "AvatarPicker.Gallery" },
            ],
          },
        ]}
      />
    </>
  );
}
