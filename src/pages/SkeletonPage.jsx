import {
  PageHead,
  Section,
  Example,
  CompositionSection,
} from "../ds/primitives.jsx";
import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
} from "../ds/Skeleton.jsx";
import { useT } from "../lib/i18n.jsx";

export default function SkeletonPage() {
  const { t, tr } = useT();

  return (
    <>
      <PageHead
        lead={t("pages.skeleton.lead")}
        title={
          <>
            {tr("pages.skeleton.titleA")}
            <em>{t("pages.skeleton.titleB")}</em>
          </>
        }
        metaLabel={t("pages.skeleton.metaLabel")}
        meta={t("pages.skeleton.meta")}
        intro={tr("pages.skeleton.intro")}
      />

      {/* i · Shapes */}
      <Section
        num="i"
        title={<>{t("pages.skeleton.shapes.title")}</>}
        kicker={t("pages.skeleton.shapes.kicker")}
      >
        <Example
          caption={t("pages.skeleton.shapes.caption")}
          tech="rect · circle"
          stack
          code={`<Skeleton width={120} height={20} />
<Skeleton variant="circle" size={40} />`}
        >
          <div
            style={{
              display: "flex",
              gap: "var(--space-4)",
              alignItems: "center",
            }}
          >
            <Skeleton width={120} height={20} />
            <Skeleton width={200} height={16} />
            <SkeletonAvatar size={48} />
            <SkeletonAvatar size={32} />
          </div>
        </Example>
      </Section>

      {/* ii · Text */}
      <Section
        num="ii"
        title={<>{t("pages.skeleton.text.title")}</>}
        kicker={t("pages.skeleton.text.kicker")}
      >
        <Example
          caption={t("pages.skeleton.text.caption")}
          tech="<SkeletonText />"
          stack
          code={`<SkeletonText lines={3} />`}
        >
          <div style={{ width: "100%", maxWidth: 480 }}>
            <SkeletonText lines={4} />
          </div>
        </Example>
      </Section>

      {/* iii · Card */}
      <Section
        num="iii"
        title={<>{t("pages.skeleton.card.title")}</>}
        kicker={t("pages.skeleton.card.kicker")}
      >
        <Example
          caption={t("pages.skeleton.card.caption")}
          tech="<SkeletonCard />"
          stack
          code={`<SkeletonCard />`}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--space-4)",
              width: "100%",
            }}
          >
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </Example>
      </Section>

      {/* iv · No pulse */}
      <Section
        num="iv"
        title={<>{t("pages.skeleton.static.title")}</>}
        kicker={t("pages.skeleton.static.kicker")}
      >
        <Example
          caption={tr("pages.skeleton.static.caption")}
          tech="pulse={false}"
          stack
          code={`<Skeleton width={200} height={16} pulse={false} />`}
        >
          <div
            style={{
              display: "flex",
              gap: "var(--space-4)",
              alignItems: "center",
            }}
          >
            <Skeleton width={200} height={16} pulse={false} />
            <SkeletonAvatar size={40} pulse={false} />
          </div>
        </Example>
      </Section>

      <CompositionSection
        num="v"
        i18nPrefix="pages.skeleton.composition"
        root="Skeleton"
        nodes={[
          { name: "SkeletonText" },
          { name: "SkeletonAvatar" },
          { name: "SkeletonCard" },
        ]}
      />
    </>
  );
}
