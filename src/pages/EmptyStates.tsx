import {
  PageHead,
  Section,
  Button,
  Example,
  CompositionSection,
} from "../ds/primitives.tsx";
import {
  EmptyState,
  EmptyGlyph,
  EmptyTitle,
  EmptyDescription,
  EmptyActions,
} from "../ds/EmptyState.tsx";
import { useT } from "../lib/i18n.tsx";

export default function EmptyStates() {
  const { t, tr } = useT();

  const E = ({ k, glyph, num, variant }: any) => (
    <Section
      num={num}
      title={<>{t(`pages.emptyStates.${k}.title`)}</>}
      kicker={t(`pages.emptyStates.${k}.kicker`)}
    >
      <Example
        caption={t(`pages.emptyStates.${k}.caption`)}
        tech="EmptyState"
        stack
        code={`<EmptyState>
  <EmptyGlyph>${glyph}</EmptyGlyph>
  <EmptyTitle>
    ${t(`pages.emptyStates.${k}.emptyTitleA`)}<em>${t(`pages.emptyStates.${k}.emptyTitleB`)}</em>${t(`pages.emptyStates.${k}.emptyTitleC`)}
  </EmptyTitle>
  <EmptyDescription>${t(`pages.emptyStates.${k}.emptyBody`)}</EmptyDescription>
  <EmptyActions>
    <Button variant="${variant}">${t(`pages.emptyStates.${k}.cta`)}</Button>
  </EmptyActions>
</EmptyState>`}
      >
        <EmptyState>
          <EmptyGlyph>{glyph}</EmptyGlyph>
          <EmptyTitle>
            {t(`pages.emptyStates.${k}.emptyTitleA`)}
            <em>{t(`pages.emptyStates.${k}.emptyTitleB`)}</em>
            {t(`pages.emptyStates.${k}.emptyTitleC`)}
          </EmptyTitle>
          <EmptyDescription>
            {t(`pages.emptyStates.${k}.emptyBody`)}
          </EmptyDescription>
          <EmptyActions>
            <Button variant={variant}>
              {t(`pages.emptyStates.${k}.cta`)}
            </Button>
          </EmptyActions>
        </EmptyState>
      </Example>
    </Section>
  );

  return (
    <>
      <PageHead
        lead={t("pages.emptyStates.lead")}
        title={
          <>
            {tr("pages.emptyStates.titleA")}
            <em>{t("pages.emptyStates.titleB")}</em>
          </>
        }
        metaLabel={t("pages.emptyStates.metaLabel")}
        meta={t("pages.emptyStates.meta")}
        intro={tr("pages.emptyStates.intro")}
      />

      <E k="first" glyph="¶" num="i" variant="primary" />
      <E k="search" glyph="?" num="ii" variant="default" />
      <E k="offline" glyph="—" num="iii" variant="accent" />

      <CompositionSection
        num="iv"
        i18nPrefix="pages.emptyStates.composition"
        root="EmptyState"
        nodes={[
          { name: "EmptyGlyph" },
          { name: "EmptyTitle" },
          { name: "EmptyDescription" },
          { name: "EmptyActions" },
        ]}
      />
    </>
  );
}
