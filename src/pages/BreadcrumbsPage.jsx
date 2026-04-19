import {
  PageHead,
  Section,
  Example,
  CompositionSection,
} from "../ds/primitives.jsx";
import {
  Breadcrumbs,
  BreadcrumbsRoot,
  Breadcrumb,
  BreadcrumbCurrent,
  BreadcrumbSeparator,
} from "../ds/Breadcrumbs.jsx";
import { useT } from "../lib/i18n.jsx";

export default function BreadcrumbsPage() {
  const { t, tr } = useT();

  return (
    <>
      <PageHead
        lead={t("pages.breadcrumbs.lead")}
        title={
          <>
            {tr("pages.breadcrumbs.titleA")}
            <em>{t("pages.breadcrumbs.titleB")}</em>
          </>
        }
        metaLabel={t("pages.breadcrumbs.metaLabel")}
        meta={t("pages.breadcrumbs.meta")}
        intro={tr("pages.breadcrumbs.intro")}
      />

      {/* i · Default short form */}
      <Section
        num="i"
        title={<>{t("pages.breadcrumbs.short.title")}</>}
        kicker={t("pages.breadcrumbs.short.kicker")}
      >
        <Example
          caption={t("pages.breadcrumbs.short.caption")}
          tech="<Breadcrumbs items=…/>"
          stack
          code={`<Breadcrumbs items={["Atelier", "Components", "Tabs"]} />`}
        >
          <Breadcrumbs items={["Atelier", "Components", "Tabs"]} />
        </Example>
      </Section>

      {/* ii · Custom separator */}
      <Section
        num="ii"
        title={<>{t("pages.breadcrumbs.separator.title")}</>}
        kicker={t("pages.breadcrumbs.separator.kicker")}
      >
        <Example
          caption={t("pages.breadcrumbs.separator.caption")}
          tech="separator='·' or '/'"
          stack
          code={`<Breadcrumbs items={[…]} separator="·" />
<Breadcrumbs items={[…]} separator="/" />`}
        >
          <div style={{ display: "grid", gap: "var(--space-3)" }}>
            <Breadcrumbs items={["Atelier", "Patterns", "Forms"]} separator="·" />
            <Breadcrumbs items={["Atelier", "Patterns", "Forms"]} separator="/" />
            <Breadcrumbs items={["Atelier", "Patterns", "Forms"]} separator="→" />
          </div>
        </Example>
      </Section>

      {/* iii · Composable */}
      <Section
        num="iii"
        title={<>{t("pages.breadcrumbs.composable.title")}</>}
        kicker={t("pages.breadcrumbs.composable.kicker")}
      >
        <Example
          caption={tr("pages.breadcrumbs.composable.caption")}
          tech="composable"
          stack
          code={`<BreadcrumbsRoot>
  <Breadcrumb href="#/overview">Atelier</Breadcrumb>
  <BreadcrumbSeparator />
  <Breadcrumb href="#/cards">Components</Breadcrumb>
  <BreadcrumbSeparator />
  <BreadcrumbCurrent>Tabs</BreadcrumbCurrent>
</BreadcrumbsRoot>`}
        >
          <BreadcrumbsRoot>
            <Breadcrumb href="#/overview">Atelier</Breadcrumb>
            <BreadcrumbSeparator />
            <Breadcrumb href="#/cards">Components</Breadcrumb>
            <BreadcrumbSeparator />
            <BreadcrumbCurrent>Tabs</BreadcrumbCurrent>
          </BreadcrumbsRoot>
        </Example>
      </Section>

      <CompositionSection
        num="iv"
        i18nPrefix="pages.breadcrumbs.composition"
        root="BreadcrumbsRoot"
        nodes={[
          { name: "Breadcrumb" },
          { name: "BreadcrumbSeparator" },
          { name: "BreadcrumbCurrent" },
        ]}
      />
    </>
  );
}
