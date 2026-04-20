import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";
import { Pagination } from "./Pagination.tsx";
import { Combobox } from "./Combobox.tsx";
import { RangeSlider } from "./RangeSlider.tsx";
import { DateRangePicker } from "./DatePicker.tsx";

/* ================================================================
   DataTable — tabela editorial composable.
   ----------------------------------------------------------------
   Composable strict: declare uma vez as `columns`, depois monte
   livremente. <DataTableHeader/> e <DataTableBody/> renderizam
   automaticamente a partir do contexto.

     <DataTable data={rows} columns={cols}>
       <DataTableToolbar>...</DataTableToolbar>
       <table>
         <DataTableHeader />
         <DataTableBody />
       </table>
       <DataTablePagination />
     </DataTable>

   Sort, filtros, seleção e paginação rodam client-side por padrão
   (uncontrolled). Passe handlers (`onSortChange`, `onFilterChange`,
   `onSelectionChange`, `onPageChange`) pra mover pra controlled
   (server-side, ex: APIs paginadas).
   ================================================================ */

/* ----------------- Tipos públicos ----------------- */

export type SortDir = "asc" | "desc";
export interface SortState {
  id: string;
  dir: SortDir;
}
export type FilterState = Record<string, any>;
export type Density = "comfortable" | "regular" | "compact";

export type ColumnFilter =
  | { type: "text"; placeholder?: string }
  | { type: "select"; options: { value: string; label: string }[] }
  | { type: "multi"; options: { value: string; label: string }[] }
  | { type: "range"; min: number; max: number; step?: number }
  | { type: "date-range" };

export interface DataTableColumn<T> {
  id: string;
  header: ReactNode;
  /** Extrai o valor exibido. Se omitido, usa `row[id]`. */
  accessor?: (row: T) => any;
  /** Render custom. Recebe (row, value, rowIndex). */
  cell?: (row: T, value: any, rowIndex: number) => ReactNode;
  sortable?: boolean;
  /** Comparador custom. Default: localeCompare pra string, subtração pra number. */
  sortFn?: (a: any, b: any) => number;
  filter?: ColumnFilter;
  /** Comparador custom pra filtro. Default depende do tipo. */
  filterFn?: (rowValue: any, filterValue: any, row: T) => boolean;
  width?: number | string;
  minWidth?: number;
  align?: "start" | "center" | "end";
  /** Marca a coluna como sticky (gruda no scroll horizontal). */
  sticky?: "start" | "end";
  className?: string;
  /** Coluna fixa não-data (ex: actions). Ignora sort/filter. */
  meta?: boolean;
}

export type RowId = string | number;

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  /** Função pra extrair ID único de cada row. Default: row.id ?? índice. */
  getRowId?: (row: T, index: number) => RowId;

  /* ----------- sort ----------- */
  sort?: SortState[];
  defaultSort?: SortState[];
  onSortChange?: (next: SortState[]) => void;

  /* ----------- filter ----------- */
  filters?: FilterState;
  defaultFilters?: FilterState;
  onFilterChange?: (next: FilterState) => void;

  /* ----------- selection ----------- */
  selection?: Set<RowId>;
  defaultSelection?: Set<RowId>;
  onSelectionChange?: (next: Set<RowId>) => void;
  /** "none" desabilita seleção. "single" radio. "multi" checkbox + select-all. */
  selectionMode?: "none" | "single" | "multi";

  /* ----------- pagination ----------- */
  page?: number;
  pageSize?: number;
  defaultPage?: number;
  defaultPageSize?: number;
  onPageChange?: (next: number) => void;
  onPageSizeChange?: (next: number) => void;
  /** Total externo pra modo server-side. Default: filteredData.length. */
  totalRows?: number;

  /* ----------- visual ----------- */
  density?: Density;
  /** Sticky header (TOC scroll). */
  stickyHeader?: boolean;
  /** Linhas zebradas. */
  zebra?: boolean;
  /** Estilo da régua entre linhas. */
  ruleStyle?: "soft" | "faint" | "none";

  /* ----------- virtualização ----------- */
  virtualize?: boolean;
  rowHeight?: number;
  virtualHeight?: number;

  /* ----------- a11y ----------- */
  ariaLabel?: string;
  caption?: ReactNode;

  className?: string;
  children?: ReactNode;
}

/* ----------------- Contexto interno ----------------- */

interface DataTableCtx<T = any> {
  data: T[];
  columns: DataTableColumn<T>[];
  getRowId: (row: T, index: number) => RowId;

  sort: SortState[];
  toggleSort: (columnId: string, additive: boolean) => void;
  clearSort: () => void;

  filters: FilterState;
  setFilter: (columnId: string, value: any) => void;
  clearFilters: () => void;

  selection: Set<RowId>;
  toggleRow: (id: RowId) => void;
  toggleAll: () => void;
  isAllSelected: boolean;
  isSomeSelected: boolean;
  selectionMode: "none" | "single" | "multi";

  page: number;
  pageSize: number;
  setPage: (n: number) => void;
  setPageSize: (n: number) => void;

  density: Density;
  stickyHeader: boolean;
  zebra: boolean;
  ruleStyle: "soft" | "faint" | "none";

  virtualize: boolean;
  rowHeight: number;
  virtualHeight: number;

  /** Linhas após filtros + sort, antes de paginação. */
  processedData: T[];
  /** Linhas da página atual. */
  pageData: T[];
  totalRows: number;
  totalPages: number;
}

const DataTableContext = createContext<DataTableCtx | null>(null);

/** Hook pra acessar o estado/api do DataTable mais próximo. */
export function useDataTable<T = any>(): DataTableCtx<T> {
  const ctx = useContext(DataTableContext);
  if (!ctx) {
    throw new Error("useDataTable deve ser usado dentro de <DataTable>");
  }
  return ctx as DataTableCtx<T>;
}

/* ----------------- helpers ----------------- */

function defaultGetRowId<T>(row: any, index: number): RowId {
  return row?.id ?? index;
}

function getValue<T>(col: DataTableColumn<T>, row: T): any {
  return col.accessor ? col.accessor(row) : (row as any)[col.id];
}

function defaultSortFn(a: any, b: any): number {
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
  return String(a).localeCompare(String(b), undefined, { numeric: true });
}

function applyFilter<T>(
  col: DataTableColumn<T>,
  row: T,
  filterValue: any
): boolean {
  if (filterValue == null || filterValue === "" ||
    (Array.isArray(filterValue) && filterValue.length === 0))
    return true;

  const value = getValue(col, row);

  if (col.filterFn) return col.filterFn(value, filterValue, row);

  const filterType = col.filter?.type;
  switch (filterType) {
    case "text":
      return String(value ?? "")
        .toLowerCase()
        .includes(String(filterValue).toLowerCase());
    case "select":
      return String(value) === String(filterValue);
    case "multi":
      return (filterValue as string[]).some((v) => String(v) === String(value));
    case "range": {
      const [min, max] = filterValue as [number, number];
      return Number(value) >= min && Number(value) <= max;
    }
    case "date-range": {
      const [from, to] = filterValue as [Date | null, Date | null];
      const d = value instanceof Date ? value : new Date(value);
      if (Number.isNaN(d.getTime())) return false;
      if (from && d < from) return false;
      if (to && d > to) return false;
      return true;
    }
    default:
      return true;
  }
}

/* ================================================================
   <DataTable> — Provider raiz.
================================================================ */

export function DataTable<T>({
  data,
  columns,
  getRowId = defaultGetRowId,
  sort: sortProp,
  defaultSort = [],
  onSortChange,
  filters: filtersProp,
  defaultFilters = {},
  onFilterChange,
  selection: selectionProp,
  defaultSelection,
  onSelectionChange,
  selectionMode = "none",
  page: pageProp,
  pageSize: pageSizeProp,
  defaultPage = 1,
  defaultPageSize = 10,
  onPageChange,
  onPageSizeChange,
  totalRows: totalRowsProp,
  density = "regular",
  stickyHeader = false,
  zebra = false,
  ruleStyle = "soft",
  virtualize = false,
  rowHeight = 44,
  virtualHeight = 480,
  ariaLabel,
  caption,
  className = "",
  children,
}: DataTableProps<T>) {
  /* ----- estado interno (uncontrolled fallback) ----- */
  const [sortInternal, setSortInternal] = useState<SortState[]>(
    sortProp ?? defaultSort
  );
  const sort = sortProp ?? sortInternal;

  const [filtersInternal, setFiltersInternal] = useState<FilterState>(
    filtersProp ?? defaultFilters
  );
  const filters = filtersProp ?? filtersInternal;

  const [selectionInternal, setSelectionInternal] = useState<Set<RowId>>(
    selectionProp ?? defaultSelection ?? new Set()
  );
  const selection = selectionProp ?? selectionInternal;

  const [pageInternal, setPageInternal] = useState<number>(
    pageProp ?? defaultPage
  );
  const page = pageProp ?? pageInternal;

  const [pageSizeInternal, setPageSizeInternal] = useState<number>(
    pageSizeProp ?? defaultPageSize
  );
  const pageSize = pageSizeProp ?? pageSizeInternal;

  /* ----- handlers ----- */
  const updateSort = useCallback(
    (next: SortState[]) => {
      onSortChange?.(next);
      if (sortProp === undefined) setSortInternal(next);
    },
    [onSortChange, sortProp]
  );

  const toggleSort = useCallback(
    (columnId: string, additive: boolean) => {
      const existing = sort.find((s) => s.id === columnId);
      let next: SortState[];
      if (additive) {
        // multi-sort: adiciona/troca dir/remove dentro do array
        if (!existing) next = [...sort, { id: columnId, dir: "asc" }];
        else if (existing.dir === "asc")
          next = sort.map((s) =>
            s.id === columnId ? { id: columnId, dir: "desc" } : s
          );
        else next = sort.filter((s) => s.id !== columnId);
      } else {
        // mono-sort: substitui inteiro
        if (!existing) next = [{ id: columnId, dir: "asc" }];
        else if (existing.dir === "asc") next = [{ id: columnId, dir: "desc" }];
        else next = [];
      }
      updateSort(next);
    },
    [sort, updateSort]
  );

  const clearSort = useCallback(() => updateSort([]), [updateSort]);

  const setFilter = useCallback(
    (columnId: string, value: any) => {
      const next = { ...filters };
      if (
        value == null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      ) {
        delete next[columnId];
      } else {
        next[columnId] = value;
      }
      onFilterChange?.(next);
      if (filtersProp === undefined) setFiltersInternal(next);
      // resetar paginação ao mudar filtro
      if (pageProp === undefined) setPageInternal(1);
      onPageChange?.(1);
    },
    [filters, onFilterChange, filtersProp, pageProp, onPageChange]
  );

  const clearFilters = useCallback(() => {
    onFilterChange?.({});
    if (filtersProp === undefined) setFiltersInternal({});
  }, [onFilterChange, filtersProp]);

  /* ----- pipeline: filter → sort → paginate ----- */
  const filteredData = useMemo(() => {
    if (Object.keys(filters).length === 0) return data;
    return data.filter((row) =>
      columns.every((col) => {
        const fv = filters[col.id];
        if (fv == null) return true;
        return applyFilter(col, row, fv);
      })
    );
  }, [data, columns, filters]);

  const sortedData = useMemo(() => {
    if (sort.length === 0) return filteredData;
    const arr = filteredData.slice();
    arr.sort((a, b) => {
      for (const s of sort) {
        const col = columns.find((c) => c.id === s.id);
        if (!col) continue;
        const va = getValue(col, a);
        const vb = getValue(col, b);
        const cmp = (col.sortFn ?? defaultSortFn)(va, vb);
        if (cmp !== 0) return s.dir === "asc" ? cmp : -cmp;
      }
      return 0;
    });
    return arr;
  }, [filteredData, sort, columns]);

  const totalRows = totalRowsProp ?? sortedData.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));

  // Garante que a página atual nunca seja maior que o total (após filtros).
  useEffect(() => {
    if (page > totalPages) {
      onPageChange?.(totalPages);
      if (pageProp === undefined) setPageInternal(totalPages);
    }
  }, [page, totalPages, onPageChange, pageProp]);

  const pageData = useMemo(() => {
    if (totalRowsProp != null) {
      // server-side: assume que o data já vem paginado.
      return sortedData;
    }
    const start = (page - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, page, pageSize, totalRowsProp]);

  /* ----- selection ----- */
  const updateSelection = useCallback(
    (next: Set<RowId>) => {
      onSelectionChange?.(next);
      if (selectionProp === undefined) setSelectionInternal(next);
    },
    [onSelectionChange, selectionProp]
  );

  const toggleRow = useCallback(
    (id: RowId) => {
      if (selectionMode === "none") return;
      const next = new Set<RowId>();
      if (selectionMode === "single") {
        if (!selection.has(id)) next.add(id);
      } else {
        selection.forEach((v) => next.add(v));
        if (next.has(id)) next.delete(id);
        else next.add(id);
      }
      updateSelection(next);
    },
    [selection, selectionMode, updateSelection]
  );

  const visibleIds = useMemo(
    () => pageData.map((r, i) => getRowId(r, i)),
    [pageData, getRowId]
  );

  const isAllSelected =
    selectionMode === "multi" &&
    visibleIds.length > 0 &&
    visibleIds.every((id) => selection.has(id));

  const isSomeSelected =
    selectionMode === "multi" &&
    !isAllSelected &&
    visibleIds.some((id) => selection.has(id));

  const toggleAll = useCallback(() => {
    if (selectionMode !== "multi") return;
    const next = new Set(selection);
    if (isAllSelected) {
      visibleIds.forEach((id) => next.delete(id));
    } else {
      visibleIds.forEach((id) => next.add(id));
    }
    updateSelection(next);
  }, [selectionMode, selection, isAllSelected, visibleIds, updateSelection]);

  /* ----- paginação ----- */
  const setPage = useCallback(
    (n: number) => {
      onPageChange?.(n);
      if (pageProp === undefined) setPageInternal(n);
    },
    [onPageChange, pageProp]
  );

  const setPageSize = useCallback(
    (n: number) => {
      onPageSizeChange?.(n);
      if (pageSizeProp === undefined) setPageSizeInternal(n);
      // resetar pra página 1 ao mudar pageSize
      onPageChange?.(1);
      if (pageProp === undefined) setPageInternal(1);
    },
    [onPageSizeChange, pageSizeProp, onPageChange, pageProp]
  );

  const ctx: DataTableCtx<T> = {
    data,
    columns,
    getRowId,
    sort,
    toggleSort,
    clearSort,
    filters,
    setFilter,
    clearFilters,
    selection,
    toggleRow,
    toggleAll,
    isAllSelected,
    isSomeSelected,
    selectionMode,
    page,
    pageSize,
    setPage,
    setPageSize,
    density,
    stickyHeader,
    zebra,
    ruleStyle,
    virtualize,
    rowHeight,
    virtualHeight,
    processedData: sortedData,
    pageData,
    totalRows,
    totalPages,
  };

  return (
    <DataTableContext.Provider value={ctx as any}>
      <div
        className={`ds-data-table ds-data-table--${density} ${
          stickyHeader ? "is-sticky-header" : ""
        } ${zebra ? "is-zebra" : ""} ${
          virtualize ? "is-virtual" : ""
        } ds-data-table--rule-${ruleStyle} ${className}`.trim()}
        role={virtualize ? "table" : "region"}
        aria-label={ariaLabel}
        aria-rowcount={virtualize ? sortedData.length + 1 : undefined}
      >
        {caption && <div className="ds-data-table-caption">{caption}</div>}
        {children}
      </div>
    </DataTableContext.Provider>
  );
}

/* ================================================================
   <DataTableToolbar> — slot opcional pra search/actions/limpar
   filtros. Só wrapping visual; conteúdo é livre.
================================================================ */

export interface DataTableToolbarProps {
  children?: ReactNode;
  className?: string;
}

export function DataTableToolbar({ children, className = "" }: DataTableToolbarProps) {
  return (
    <div className={`ds-data-table-toolbar ${className}`.trim()}>{children}</div>
  );
}

/* ================================================================
   <DataTableHeader> — auto-monta thead a partir das columns.
   Filtros NÃO ficam mais aqui (vide <DataTableFilters/>).
================================================================ */

export interface DataTableHeaderProps {
  className?: string;
}

export function DataTableHeader({ className = "" }: DataTableHeaderProps) {
  const ctx = useDataTable();

  // Modo virtualizado: divs + ARIA roles (sem <thead>/<tr>/<th>) pra evitar
  // os hacks de display:block em elementos de tabela. Mesma semântica via
  // role="rowgroup" / "row" / "columnheader" — leitores de tela enxergam
  // como tabela porque o wrapper raiz tem role="table" (vide DataTable).
  if (ctx.virtualize) {
    return (
      <div
        role="rowgroup"
        className={`ds-data-table-vthead ${className}`.trim()}
      >
        <div role="row" className="ds-data-table-vthead-row">
          {ctx.selectionMode === "multi" && (
            <div
              role="columnheader"
              className="ds-data-table-vthead-cell ds-data-table-vthead-cell--checkbox"
            >
              <SelectAllCheckbox />
            </div>
          )}
          {ctx.selectionMode === "single" && (
            <div
              role="columnheader"
              className="ds-data-table-vthead-cell ds-data-table-vthead-cell--checkbox"
              aria-label="Seleção"
            />
          )}
          {ctx.columns.map((col) => (
            <VirtualHeaderCell key={col.id} col={col} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <thead className={`ds-data-table-thead ${className}`.trim()}>
      <tr>
        {ctx.selectionMode === "multi" && (
          <th
            className="ds-data-table-th ds-data-table-th--checkbox"
            scope="col"
          >
            <SelectAllCheckbox />
          </th>
        )}
        {ctx.selectionMode === "single" && (
          <th
            className="ds-data-table-th ds-data-table-th--checkbox"
            scope="col"
            aria-label="Seleção"
          />
        )}
        {ctx.columns.map((col) => (
          <HeaderCell key={col.id} col={col} />
        ))}
      </tr>
    </thead>
  );
}

/* ================================================================
   <DataTableFilters> — toolbar acima da tabela com um filtro por
   coluna que tenha `filter` declarado. Inline com wrap.
================================================================ */

export interface DataTableFiltersProps {
  /** Mostra botão "Limpar tudo" quando houver filtros ativos. Default: true. */
  showClear?: boolean;
  /** Label do botão de limpar. */
  clearLabel?: string;
  className?: string;
}

export function DataTableFilters({
  showClear = true,
  clearLabel = "Limpar filtros",
  className = "",
}: DataTableFiltersProps) {
  const ctx = useDataTable();
  const filterableCols = ctx.columns.filter((c) => c.filter);
  if (filterableCols.length === 0) return null;

  const hasActive = Object.keys(ctx.filters).length > 0;

  return (
    <div className={`ds-data-table-filters ${className}`.trim()}>
      <div className="ds-data-table-filters-list">
        {filterableCols.map((col) => (
          <div key={col.id} className="ds-data-table-filters-item">
            <span className="ds-data-table-filters-label">
              {asString(col.header) || col.id}
            </span>
            <div className="ds-data-table-filters-control">
              <FilterControl col={col} />
            </div>
          </div>
        ))}
      </div>
      {showClear && hasActive && (
        <button
          type="button"
          className="ds-data-table-filters-clear"
          onClick={ctx.clearFilters}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M2 2 L8 8 M8 2 L2 8" strokeLinecap="round" />
          </svg>
          {clearLabel}
        </button>
      )}
    </div>
  );
}

function cellStyle(col: DataTableColumn<any>): CSSProperties {
  const style: CSSProperties = {};
  if (col.width != null)
    style.width = typeof col.width === "number" ? `${col.width}px` : col.width;
  if (col.minWidth != null) style.minWidth = `${col.minWidth}px`;
  if (col.align) style.textAlign = col.align;
  return style;
}

/* Cálculo de flex usado tanto no header virtualizado quanto no row
   virtualizado — uma única fonte da verdade pro alinhamento de colunas. */
function virtualColumnFlex(col: DataTableColumn<any>): CSSProperties {
  const flex =
    col.width != null
      ? `0 0 ${typeof col.width === "number" ? col.width + "px" : col.width}`
      : "1 1 0";
  const style: CSSProperties = { flex };
  if (col.minWidth != null) style.minWidth = `${col.minWidth}px`;
  return style;
}

function virtualJustify(align?: "start" | "center" | "end"): CSSProperties {
  if (align === "end") return { justifyContent: "flex-end" };
  if (align === "center") return { justifyContent: "center" };
  return { justifyContent: "flex-start" };
}

function HeaderCell({ col }: { col: DataTableColumn<any> }) {
  const ctx = useDataTable();
  const sortIdx = ctx.sort.findIndex((s) => s.id === col.id);
  const sortState = sortIdx >= 0 ? ctx.sort[sortIdx] : null;

  const sortLabel =
    sortState?.dir === "asc"
      ? "ordenado crescente"
      : sortState?.dir === "desc"
        ? "ordenado decrescente"
        : "não ordenado";

  const onClick = (e: React.MouseEvent) => {
    if (!col.sortable) return;
    ctx.toggleSort(col.id, e.shiftKey);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!col.sortable) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      ctx.toggleSort(col.id, e.shiftKey);
    }
  };

  return (
    <th
      scope="col"
      className={`ds-data-table-th ${
        col.sortable ? "is-sortable" : ""
      } ${sortState ? "is-sorted" : ""} ${col.className ?? ""}`.trim()}
      style={cellStyle(col)}
      aria-sort={
        sortState?.dir === "asc"
          ? "ascending"
          : sortState?.dir === "desc"
            ? "descending"
            : "none"
      }
      tabIndex={col.sortable ? 0 : undefined}
      onClick={col.sortable ? onClick : undefined}
      onKeyDown={col.sortable ? onKeyDown : undefined}
      aria-label={col.sortable ? `${asString(col.header)}, ${sortLabel}` : undefined}
    >
      <span className="ds-data-table-th-content">
        <span className="ds-data-table-th-label">{col.header}</span>
        {col.sortable && (
          <SortIndicator
            dir={sortState?.dir ?? null}
            order={ctx.sort.length > 1 && sortIdx >= 0 ? sortIdx + 1 : null}
          />
        )}
      </span>
    </th>
  );
}

/* Versão div-based do header, usada quando virtualize=true.
   Layout flex idêntico ao VirtualRow → header e cells alinham por
   construção, sem hacks de display:block em <table>. */
function VirtualHeaderCell({ col }: { col: DataTableColumn<any> }) {
  const ctx = useDataTable();
  const sortIdx = ctx.sort.findIndex((s) => s.id === col.id);
  const sortState = sortIdx >= 0 ? ctx.sort[sortIdx] : null;

  const sortLabel =
    sortState?.dir === "asc"
      ? "ordenado crescente"
      : sortState?.dir === "desc"
        ? "ordenado decrescente"
        : "não ordenado";

  const onClick = (e: React.MouseEvent) => {
    if (!col.sortable) return;
    ctx.toggleSort(col.id, e.shiftKey);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!col.sortable) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      ctx.toggleSort(col.id, e.shiftKey);
    }
  };

  return (
    <div
      role="columnheader"
      className={`ds-data-table-vthead-cell ${
        col.sortable ? "is-sortable" : ""
      } ${sortState ? "is-sorted" : ""} ${col.className ?? ""}`.trim()}
      style={{ ...virtualColumnFlex(col), ...virtualJustify(col.align) }}
      aria-sort={
        sortState?.dir === "asc"
          ? "ascending"
          : sortState?.dir === "desc"
            ? "descending"
            : "none"
      }
      tabIndex={col.sortable ? 0 : undefined}
      onClick={col.sortable ? onClick : undefined}
      onKeyDown={col.sortable ? onKeyDown : undefined}
      aria-label={col.sortable ? `${asString(col.header)}, ${sortLabel}` : undefined}
    >
      <span className="ds-data-table-th-content">
        <span className="ds-data-table-th-label">{col.header}</span>
        {col.sortable && (
          <SortIndicator
            dir={sortState?.dir ?? null}
            order={ctx.sort.length > 1 && sortIdx >= 0 ? sortIdx + 1 : null}
          />
        )}
      </span>
    </div>
  );
}

function asString(node: ReactNode): string {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  return "";
}

function SortIndicator({
  dir,
  order,
}: {
  dir: SortDir | null;
  order: number | null;
}) {
  return (
    <span className="ds-data-table-sort" aria-hidden="true">
      <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
        <path
          d="M5 1 L9 6 L1 6 Z"
          fill={dir === "asc" ? "currentColor" : "var(--ink-faint)"}
          opacity={dir === "asc" ? 1 : 0.45}
        />
        <path
          d="M5 13 L9 8 L1 8 Z"
          fill={dir === "desc" ? "currentColor" : "var(--ink-faint)"}
          opacity={dir === "desc" ? 1 : 0.45}
        />
      </svg>
      {order != null && <sup className="ds-data-table-sort-order">{order}</sup>}
    </span>
  );
}

/* ================================================================
   <FilterControl> — switch interno por tipo de filtro.
================================================================ */

function FilterControl({ col }: { col: DataTableColumn<any> }) {
  const ctx = useDataTable();
  const value = ctx.filters[col.id];
  const f = col.filter!;

  if (f.type === "text") {
    return (
      <input
        type="search"
        className="ds-data-table-filter-input"
        value={value ?? ""}
        onChange={(e) => ctx.setFilter(col.id, e.target.value)}
        placeholder={f.placeholder ?? "Filtrar…"}
        aria-label={`Filtrar ${asString(col.header)}`}
      />
    );
  }

  if (f.type === "select") {
    return (
      <select
        className="ds-data-table-filter-select"
        value={value ?? ""}
        onChange={(e) => ctx.setFilter(col.id, e.target.value || null)}
        aria-label={`Filtrar ${asString(col.header)}`}
      >
        <option value="">Todos</option>
        {f.options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    );
  }

  if (f.type === "multi") {
    return (
      <Combobox
        multi
        options={f.options}
        value={value ?? []}
        onChange={(v: any) => ctx.setFilter(col.id, v)}
        placeholder="Todos"
      />
    );
  }

  if (f.type === "range") {
    const v = (value as [number, number]) ?? [f.min, f.max];
    return (
      <RangeSlider
        min={f.min}
        max={f.max}
        step={f.step ?? 1}
        value={v}
        onChange={(next: any) => ctx.setFilter(col.id, next)}
        ariaLabel={`Filtrar ${asString(col.header)}`}
      />
    );
  }

  if (f.type === "date-range") {
    return (
      <DateRangePicker
        value={(value as [Date | null, Date | null]) ?? [null, null]}
        onChange={(v) => {
          const [from, to] = v;
          ctx.setFilter(col.id, from || to ? v : null);
        }}
        placeholder="Período"
      />
    );
  }

  return null;
}

/* ================================================================
   <SelectAllCheckbox>
================================================================ */

function SelectAllCheckbox() {
  const ctx = useDataTable();
  return (
    <input
      type="checkbox"
      className="ds-data-table-checkbox"
      checked={ctx.isAllSelected}
      ref={(el) => {
        if (el) el.indeterminate = ctx.isSomeSelected;
      }}
      onChange={ctx.toggleAll}
      aria-label="Selecionar todas as linhas visíveis"
    />
  );
}

/* ================================================================
   <DataTableBody> — auto-renderiza tbody.
================================================================ */

export interface DataTableBodyProps {
  /** Renderiza row custom. Recebe (row, rowIndex). Retorna ReactNode pra
   *  substituir a row inteira (responsabilidade do dev pelo <tr>). */
  renderRow?: (row: any, index: number) => ReactNode;
  className?: string;
}

export function DataTableBody({ renderRow, className = "" }: DataTableBodyProps) {
  const ctx = useDataTable();

  if (ctx.virtualize) {
    // Virtualizado: render puro div com ARIA roles (sem <tbody>) — assim
    // não precisamos hackear display:block em elementos de tabela. Wrapper
    // raiz já tem role="table" via .ds-data-table.is-virtual.
    return (
      <div
        role="rowgroup"
        className={`ds-data-table-vtbody ${className}`.trim()}
      >
        <VirtualBody renderRow={renderRow} />
      </div>
    );
  }

  if (ctx.pageData.length === 0) {
    // Linha placeholder vazia — DataTableEmpty cuida do conteúdo visual.
    return null;
  }

  return (
    <tbody className={`ds-data-table-tbody ${className}`.trim()}>
      {ctx.pageData.map((row, i) =>
        renderRow ? renderRow(row, i) : <AutoRow key={ctx.getRowId(row, i)} row={row} index={i} />
      )}
    </tbody>
  );
}

function AutoRow({ row, index }: { row: any; index: number }) {
  const ctx = useDataTable();
  const id = ctx.getRowId(row, index);
  const selected = ctx.selection.has(id);

  return (
    <tr
      className={`ds-data-table-tr ${selected ? "is-selected" : ""}`}
      aria-selected={ctx.selectionMode !== "none" ? selected : undefined}
    >
      {ctx.selectionMode === "multi" && (
        <td className="ds-data-table-td ds-data-table-td--checkbox">
          <input
            type="checkbox"
            className="ds-data-table-checkbox"
            checked={selected}
            onChange={() => ctx.toggleRow(id)}
            aria-label={`Selecionar linha ${index + 1}`}
          />
        </td>
      )}
      {ctx.selectionMode === "single" && (
        <td className="ds-data-table-td ds-data-table-td--checkbox">
          <input
            type="radio"
            name="ds-data-table-radio"
            className="ds-data-table-radio"
            checked={selected}
            onChange={() => ctx.toggleRow(id)}
            aria-label={`Selecionar linha ${index + 1}`}
          />
        </td>
      )}
      {ctx.columns.map((col) => {
        const v = getValue(col, row);
        const content = col.cell ? col.cell(row, v, index) : v;
        return (
          <td
            key={col.id}
            className={`ds-data-table-td ${col.className ?? ""}`.trim()}
            style={cellStyle(col)}
          >
            {content as ReactNode}
          </td>
        );
      })}
    </tr>
  );
}

/* Virtualização — render puro com divs.
   Estrutura: scroller (overflow auto, altura visível)
              └─ inner (altura total, posição relativa)
                 └─ window (translateY = offset do startIdx)
                    └─ rows (apenas as visíveis + overscan)
   onScroll vive no scroller — único elemento que de fato rola. */
function VirtualBody({
  renderRow,
}: {
  renderRow?: (row: any, index: number) => ReactNode;
}) {
  const ctx = useDataTable();
  const [scrollTop, setScrollTop] = useState(0);
  const overscan = 4;

  const total = ctx.processedData.length;
  const startIdx = Math.max(0, Math.floor(scrollTop / ctx.rowHeight) - overscan);
  const visibleCount = Math.ceil(ctx.virtualHeight / ctx.rowHeight) + overscan * 2;
  const endIdx = Math.min(total, startIdx + visibleCount);
  const offset = startIdx * ctx.rowHeight;
  const totalHeight = total * ctx.rowHeight;

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop((e.target as HTMLDivElement).scrollTop);
  };

  return (
    <div
      className="ds-data-table-virtual-scroller"
      style={{ height: ctx.virtualHeight }}
      onScroll={onScroll}
    >
      <div
        className="ds-data-table-virtual-inner"
        style={{ height: totalHeight }}
      >
        <div
          className="ds-data-table-virtual-window"
          style={{ transform: `translateY(${offset}px)` }}
        >
          {ctx.processedData.slice(startIdx, endIdx).map((row, i) => {
            const realIndex = startIdx + i;
            if (renderRow) return renderRow(row, realIndex);
            return (
              <VirtualRow
                key={ctx.getRowId(row, realIndex)}
                row={row}
                index={realIndex}
                height={ctx.rowHeight}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function VirtualRow({
  row,
  index,
  height,
}: {
  row: any;
  index: number;
  height: number;
}) {
  const ctx = useDataTable();
  const id = ctx.getRowId(row, index);
  const selected = ctx.selection.has(id);

  return (
    <div
      className={`ds-data-table-virtual-row ${selected ? "is-selected" : ""} ${
        index % 2 === 1 ? "is-zebra" : ""
      }`.trim()}
      style={{ height }}
      role="row"
      aria-rowindex={index + 2 /* +1 header, +1 base-1 */}
      aria-selected={ctx.selectionMode !== "none" ? selected : undefined}
    >
      {ctx.selectionMode !== "none" && (
        <div
          role="cell"
          className="ds-data-table-virtual-cell ds-data-table-virtual-cell--checkbox"
        >
          <input
            type={ctx.selectionMode === "multi" ? "checkbox" : "radio"}
            className="ds-data-table-checkbox"
            checked={selected}
            onChange={() => ctx.toggleRow(id)}
            aria-label={`Selecionar linha ${index + 1}`}
          />
        </div>
      )}
      {ctx.columns.map((col) => {
        const v = getValue(col, row);
        const content = col.cell ? col.cell(row, v, index) : v;
        return (
          <div
            key={col.id}
            role="cell"
            className={`ds-data-table-virtual-cell ${col.className ?? ""}`.trim()}
            style={{
              ...virtualColumnFlex(col),
              ...virtualJustify(col.align),
            }}
          >
            <span className="ds-data-table-virtual-cell-text">
              {content as ReactNode}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ================================================================
   <DataTableEmpty> — render quando processedData.length === 0.
================================================================ */

export interface DataTableEmptyProps {
  children?: ReactNode;
  className?: string;
}

export function DataTableEmpty({
  children,
  className = "",
}: DataTableEmptyProps) {
  const ctx = useDataTable();
  if (ctx.processedData.length > 0) return null;
  return (
    <div className={`ds-data-table-empty ${className}`.trim()}>
      {children ?? <span>Nenhum resultado.</span>}
    </div>
  );
}

/* ================================================================
   <DataTablePagination> — wrapper que conecta o componente
   <Pagination> existente ao state interno.
================================================================ */

export interface DataTablePaginationProps {
  /** Mostra seletor de pageSize. Default: true. */
  showPageSize?: boolean;
  pageSizeOptions?: number[];
  className?: string;
}

export function DataTablePagination({
  showPageSize = true,
  pageSizeOptions = [10, 25, 50, 100],
  className = "",
}: DataTablePaginationProps) {
  const ctx = useDataTable();
  if (ctx.totalPages <= 1 && !showPageSize) return null;

  const start = (ctx.page - 1) * ctx.pageSize + 1;
  const end = Math.min(ctx.totalRows, ctx.page * ctx.pageSize);

  return (
    <div className={`ds-data-table-pagination ${className}`.trim()}>
      <div className="ds-data-table-pagination-info">
        {ctx.totalRows === 0 ? (
          <span>0 resultados</span>
        ) : (
          <span>
            <b>{start}</b>–<b>{end}</b> de <b>{ctx.totalRows}</b>
          </span>
        )}
      </div>
      {ctx.totalPages > 1 && (
        <Pagination
          current={ctx.page}
          total={ctx.totalPages}
          onChange={ctx.setPage}
        />
      )}
      {showPageSize && (
        <label className="ds-data-table-page-size">
          <select
            value={ctx.pageSize}
            onChange={(e) => ctx.setPageSize(Number(e.target.value))}
            aria-label="Linhas por página"
          >
            {pageSizeOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <span className="ds-data-table-page-size-label">por página</span>
        </label>
      )}
    </div>
  );
}
