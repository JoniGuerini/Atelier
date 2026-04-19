import { useState } from "react";
import {
  PageHead,
  Section,
  Example,
  CompositionSection,
} from "../ds/primitives.tsx";
import {
  Pagination,
  PaginationRoot,
  PaginationPrev,
  PaginationNext,
  PaginationItem,
  PaginationEllipsis,
} from "../ds/Pagination.tsx";
import { useT } from "../lib/i18n.tsx";

export default function PaginationPage() {
  const { t, tr } = useT();
  const [a, setA] = useState(3);
  const [b, setB] = useState(7);
  const [c, setC] = useState(1);
  const [d, setD] = useState(50);

  return (
    <>
      <PageHead
        lead={t("pages.pagination.lead")}
        title={
          <>
            {tr("pages.pagination.titleA")}
            <em>{t("pages.pagination.titleB")}</em>
          </>
        }
        metaLabel={t("pages.pagination.metaLabel")}
        meta={t("pages.pagination.meta")}
        intro={tr("pages.pagination.intro")}
      />

      {/* i · Default */}
      <Section
        num="i"
        title={<>{t("pages.pagination.default.title")}</>}
        kicker={t("pages.pagination.default.kicker")}
      >
        <Example
          caption={t("pages.pagination.default.caption")}
          tech="<Pagination />"
          stack
          code={`<Pagination
  current={page}
  total={20}
  onChange={(n) => setPage(n)}
/>`}
        >
          <Pagination current={a} total={20} onChange={setA} />
        </Example>
      </Section>

      {/* ii · With labels */}
      <Section
        num="ii"
        title={<>{t("pages.pagination.labeled.title")}</>}
        kicker={t("pages.pagination.labeled.kicker")}
      >
        <Example
          caption={t("pages.pagination.labeled.caption")}
          tech="showLabels"
          stack
          code={`<Pagination
  current={page}
  total={20}
  onChange={setPage}
  showLabels
/>`}
        >
          <Pagination current={b} total={20} onChange={setB} showLabels />
        </Example>
      </Section>

      {/* iii · Edges (start / end) */}
      <Section
        num="iii"
        title={<>{t("pages.pagination.edges.title")}</>}
        kicker={t("pages.pagination.edges.kicker")}
      >
        <Example
          caption={t("pages.pagination.edges.caption")}
          tech="current=1 · current=total"
          stack
        >
          <div style={{ display: "grid", gap: "var(--space-3)" }}>
            <Pagination current={c} total={10} onChange={setC} showLabels />
            <Pagination current={d} total={50} onChange={setD} showLabels />
          </div>
        </Example>
      </Section>

      {/* iv · Compact (siblings=0) */}
      <Section
        num="iv"
        title={<>{t("pages.pagination.compact.title")}</>}
        kicker={t("pages.pagination.compact.kicker")}
      >
        <Example
          caption={t("pages.pagination.compact.caption")}
          tech="siblings=0"
          stack
          code={`<Pagination
  current={page}
  total={20}
  onChange={setPage}
  siblings={0}
/>`}
        >
          <Pagination current={a} total={20} onChange={setA} siblings={0} />
        </Example>
      </Section>

      {/* v · Composable manual */}
      <Section
        num="v"
        title={<>{t("pages.pagination.composable.title")}</>}
        kicker={t("pages.pagination.composable.kicker")}
      >
        <Example
          caption={tr("pages.pagination.composable.caption")}
          tech="composable"
          stack
          code={`<PaginationRoot>
  <PaginationPrev onClick={...} />
  <PaginationItem n={1} active />
  <PaginationEllipsis />
  <PaginationItem n={4} />
  <PaginationItem n={5} onClick={...} />
  <PaginationItem n={6} />
  <PaginationEllipsis />
  <PaginationItem n={20} />
  <PaginationNext onClick={...} />
</PaginationRoot>`}
        >
          <PaginationRoot>
            <PaginationPrev onClick={() => {}} />
            <PaginationItem n={1} active />
            <PaginationEllipsis />
            <PaginationItem n={4} onClick={() => {}} />
            <PaginationItem n={5} onClick={() => {}} />
            <PaginationItem n={6} onClick={() => {}} />
            <PaginationEllipsis />
            <PaginationItem n={20} onClick={() => {}} />
            <PaginationNext onClick={() => {}} />
          </PaginationRoot>
        </Example>
      </Section>

      <CompositionSection
        num="vi"
        i18nPrefix="pages.pagination.composition"
        root="PaginationRoot"
        nodes={[
          { name: "PaginationPrev" },
          { name: "PaginationItem" },
          { name: "PaginationEllipsis" },
          { name: "PaginationNext" },
        ]}
      />
    </>
  );
}
