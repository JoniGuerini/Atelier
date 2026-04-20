import { useMemo, useState } from "react";
import {
  PageHead,
  Section,
  Example,
  CompositionSection,
} from "../ds/primitives.tsx";
import {
  DataTable,
  DataTableHeader,
  DataTableBody,
  DataTableEmpty,
  DataTablePagination,
  DataTableToolbar,
  DataTableFilters,
  type DataTableColumn,
} from "../ds/DataTable.tsx";
import { useT } from "../lib/i18n.tsx";

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
  rating: number;
  published: Date;
}

const SAMPLE: Book[] = [
  { id: 1, title: "The Sun Also Rises", author: "Hemingway", year: 1926, genre: "fiction", rating: 4.1, published: new Date(1926, 9, 22) },
  { id: 2, title: "Ulysses", author: "Joyce", year: 1922, genre: "fiction", rating: 3.7, published: new Date(1922, 1, 2) },
  { id: 3, title: "The Waste Land", author: "Eliot", year: 1922, genre: "poetry", rating: 4.3, published: new Date(1922, 9, 1) },
  { id: 4, title: "To the Lighthouse", author: "Woolf", year: 1927, genre: "fiction", rating: 4.0, published: new Date(1927, 4, 5) },
  { id: 5, title: "The Great Gatsby", author: "Fitzgerald", year: 1925, genre: "fiction", rating: 4.2, published: new Date(1925, 3, 10) },
  { id: 6, title: "Mrs Dalloway", author: "Woolf", year: 1925, genre: "fiction", rating: 4.1, published: new Date(1925, 4, 14) },
  { id: 7, title: "The Trial", author: "Kafka", year: 1925, genre: "fiction", rating: 4.0, published: new Date(1925, 3, 26) },
  { id: 8, title: "The Magic Mountain", author: "Mann", year: 1924, genre: "fiction", rating: 4.2, published: new Date(1924, 10, 0) },
  { id: 9, title: "A Passage to India", author: "Forster", year: 1924, genre: "fiction", rating: 4.0, published: new Date(1924, 5, 4) },
  { id: 10, title: "Harmonium", author: "Stevens", year: 1923, genre: "poetry", rating: 4.1, published: new Date(1923, 8, 7) },
  { id: 11, title: "We", author: "Zamyatin", year: 1924, genre: "scifi", rating: 4.0, published: new Date(1924, 0, 1) },
  { id: 12, title: "Tractatus", author: "Wittgenstein", year: 1922, genre: "essay", rating: 3.9, published: new Date(1922, 0, 1) },
  { id: 13, title: "The Prophet", author: "Gibran", year: 1923, genre: "essay", rating: 4.4, published: new Date(1923, 8, 23) },
  { id: 14, title: "Cane", author: "Toomer", year: 1923, genre: "fiction", rating: 4.0, published: new Date(1923, 8, 1) },
  { id: 15, title: "Streets of Night", author: "Dos Passos", year: 1923, genre: "fiction", rating: 3.5, published: new Date(1923, 9, 1) },
];

const VIRTUAL: Book[] = Array.from({ length: 5000 }, (_, i) => ({
  id: i + 100,
  title: `Linha #${i + 1}`,
  author: ["Smith", "Doe", "Park", "Lee", "Sá"][i % 5],
  year: 1900 + (i % 125),
  genre: ["fiction", "essay", "poetry", "scifi"][i % 4],
  rating: Math.round((2 + Math.random() * 3) * 10) / 10,
  published: new Date(1900 + (i % 125), i % 12, (i % 28) + 1),
}));

export default function DataTablePage() {
  const { t, tr } = useT();

  /* --- exemplo i: básico ------------------------------------------ */
  const basicCols: DataTableColumn<Book>[] = useMemo(
    () => [
      { id: "title", header: "Title", sortable: true },
      { id: "author", header: "Author", sortable: true },
      { id: "year", header: "Year", sortable: true, align: "end", width: 80 },
    ],
    []
  );

  /* --- exemplo ii: filtros completos ------------------------------ */
  const filterCols: DataTableColumn<Book>[] = useMemo(
    () => [
      {
        id: "title",
        header: "Title",
        sortable: true,
        filter: { type: "text", placeholder: "Buscar título…" },
      },
      {
        id: "author",
        header: "Author",
        sortable: true,
        filter: { type: "text" },
      },
      {
        id: "genre",
        header: "Genre",
        sortable: true,
        filter: {
          type: "select",
          options: [
            { value: "fiction", label: "Fiction" },
            { value: "essay", label: "Essay" },
            { value: "poetry", label: "Poetry" },
            { value: "scifi", label: "Sci-fi" },
          ],
        },
      },
      {
        id: "year",
        header: "Year",
        sortable: true,
        align: "end",
        width: 130,
        filter: { type: "range", min: 1920, max: 1930 },
      },
      {
        id: "rating",
        header: "Rating",
        sortable: true,
        align: "end",
        width: 90,
        cell: (_, v) => <span style={{ fontFamily: "var(--font-mono)" }}>{(v as number).toFixed(1)}</span>,
      },
    ],
    []
  );

  /* --- exemplo iii: seleção -------------------------------------- */
  const [selection, setSelection] = useState<Set<number | string>>(new Set([1, 3]));

  /* --- exemplo iv: virtualização --------------------------------- */
  const virtCols: DataTableColumn<Book>[] = useMemo(
    () => [
      { id: "id", header: "#", width: 80, align: "end" },
      { id: "title", header: "Title", sortable: true },
      { id: "author", header: "Author", sortable: true, width: 120 },
      { id: "year", header: "Year", sortable: true, align: "end", width: 80 },
      { id: "rating", header: "Rating", sortable: true, align: "end", width: 90 },
    ],
    []
  );

  return (
    <>
      <PageHead
        lead={t("pages.dataTable.lead")}
        title={
          <>
            {tr("pages.dataTable.titleA")}
            <em>{t("pages.dataTable.titleB")}</em>
          </>
        }
        metaLabel={t("pages.dataTable.metaLabel")}
        meta={t("pages.dataTable.meta")}
        intro={tr("pages.dataTable.intro")}
      />

      {/* i · básico */}
      <Section
        num="i"
        title={<>{t("pages.dataTable.basic.title")}</>}
        kicker={t("pages.dataTable.basic.kicker")}
      >
        <Example
          caption={t("pages.dataTable.basic.caption")}
          tech="composable + sort"
          stack
          code={`const cols = [
  { id: "title",  header: "Title",  sortable: true },
  { id: "author", header: "Author", sortable: true },
  { id: "year",   header: "Year",   sortable: true, align: "end" },
]

<DataTable data={books} columns={cols}>
  <table>
    <DataTableHeader />
    <DataTableBody />
  </table>
  <DataTablePagination />
</DataTable>`}
        >
          <DataTable
            data={SAMPLE}
            columns={basicCols}
            defaultPageSize={5}
            ariaLabel="Catálogo básico"
          >
            <table>
              <DataTableHeader />
              <DataTableBody />
            </table>
            <DataTableEmpty />
            <DataTablePagination />
          </DataTable>
        </Example>
      </Section>

      {/* ii · filtros */}
      <Section
        num="ii"
        title={<>{t("pages.dataTable.filters.title")}</>}
        kicker={t("pages.dataTable.filters.kicker")}
      >
        <Example
          caption={tr("pages.dataTable.filters.caption")}
          tech="text · select · range"
          stack
          code={`const cols = [
  { id: "title",  header: "Title", sortable: true,
    filter: { type: "text", placeholder: "Buscar…" } },
  { id: "genre",  header: "Genre", sortable: true,
    filter: { type: "select", options: [...] } },
  { id: "year",   header: "Year",  sortable: true, align: "end",
    filter: { type: "range", min: 1920, max: 1930 } },
]

<DataTable data={books} columns={cols} zebra>
  <DataTableFilters />
  <table>
    <DataTableHeader />
    <DataTableBody />
  </table>
  <DataTablePagination />
</DataTable>`}
        >
          <DataTable
            data={SAMPLE}
            columns={filterCols}
            defaultPageSize={5}
            zebra
            ariaLabel="Catálogo com filtros"
          >
            <DataTableFilters clearLabel="Limpar tudo" />
            <table>
              <DataTableHeader />
              <DataTableBody />
            </table>
            <DataTableEmpty>Nenhum livro com esses filtros.</DataTableEmpty>
            <DataTablePagination />
          </DataTable>
        </Example>
      </Section>

      {/* iii · seleção + densidade */}
      <Section
        num="iii"
        title={<>{t("pages.dataTable.select.title")}</>}
        kicker={t("pages.dataTable.select.kicker")}
      >
        <Example
          caption={tr("pages.dataTable.select.caption", {
            count: <b>{String(selection.size)}</b>,
          })}
          tech="selectionMode='multi' · density='compact'"
          stack
          code={`const [sel, setSel] = useState(new Set())

<DataTable
  data={books}
  columns={cols}
  selection={sel}
  onSelectionChange={setSel}
  selectionMode="multi"
  density="compact"
>
  <table>
    <DataTableHeader />
    <DataTableBody />
  </table>
</DataTable>`}
        >
          <DataTable
            data={SAMPLE}
            columns={basicCols}
            selection={selection}
            onSelectionChange={setSelection}
            selectionMode="multi"
            density="compact"
            defaultPageSize={6}
            ariaLabel="Catálogo com seleção"
          >
            <DataTableToolbar>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--ink-soft)",
                }}
              >
                {selection.size} selecionado(s)
              </span>
            </DataTableToolbar>
            <table>
              <DataTableHeader />
              <DataTableBody />
            </table>
            <DataTablePagination />
          </DataTable>
        </Example>
      </Section>

      {/* iv · multi-sort */}
      <Section
        num="iv"
        title={<>{t("pages.dataTable.multisort.title")}</>}
        kicker={t("pages.dataTable.multisort.kicker")}
      >
        <Example
          caption={tr("pages.dataTable.multisort.caption")}
          tech="Shift+click no header"
          stack
          code={`<DataTable
  data={books}
  columns={cols}
  defaultSort={[{ id: "year", dir: "desc" }, { id: "title", dir: "asc" }]}
>
  ...
</DataTable>`}
        >
          <DataTable
            data={SAMPLE}
            columns={[
              { id: "title", header: "Title", sortable: true },
              { id: "author", header: "Author", sortable: true },
              { id: "year", header: "Year", sortable: true, align: "end", width: 100 },
              { id: "genre", header: "Genre", sortable: true, width: 120 },
            ]}
            defaultSort={[
              { id: "year", dir: "desc" },
              { id: "title", dir: "asc" },
            ]}
            defaultPageSize={8}
            ariaLabel="Multi-sort"
          >
            <table>
              <DataTableHeader />
              <DataTableBody />
            </table>
            <DataTablePagination />
          </DataTable>
        </Example>
      </Section>

      {/* v · virtualização */}
      <Section
        num="v"
        title={<>{t("pages.dataTable.virtual.title")}</>}
        kicker={t("pages.dataTable.virtual.kicker")}
      >
        <Example
          caption={tr("pages.dataTable.virtual.caption")}
          tech="virtualize · 5.000 rows"
          stack
          code={`<DataTable
  data={hugeList}
  columns={cols}
  virtualize
  rowHeight={40}
  virtualHeight={420}
  zebra
>
  <DataTableHeader />
  <DataTableBody />
</DataTable>`}
        >
          <DataTable
            data={VIRTUAL}
            columns={virtCols}
            virtualize
            rowHeight={40}
            virtualHeight={420}
            zebra
            ariaLabel="5 mil linhas virtualizadas"
          >
            <DataTableHeader />
            <DataTableBody />
          </DataTable>
        </Example>
      </Section>

      <CompositionSection
        num="vi"
        i18nPrefix="pages.dataTable.composition"
        root="DataTable"
        nodes={[
          { name: "DataTableToolbar (opcional, slot livre)" },
          {
            name: "DataTableFilters",
            children: [
              { name: "label + control (×N)" },
              { name: "button.clear (quando há filtros ativos)" },
            ],
          },
          {
            name: "table (HTML, opcional — omitida quando virtualize=true)",
            children: [
              {
                name: "DataTableHeader",
                children: [
                  { name: "th[aria-sort] (sortable)" },
                  { name: "div[role=columnheader] (no modo virtual)" },
                ],
              },
              {
                name: "DataTableBody",
                children: [
                  { name: "tr (×N rows)", children: [{ name: "td (×N cells)" }] },
                  { name: "VirtualBody (quando virtualize=true)" },
                ],
              },
            ],
          },
          { name: "DataTableEmpty (quando processedData = 0)" },
          { name: "DataTablePagination (Pagination integrada)" },
        ]}
      />
    </>
  );
}
