import { useMemo } from "react";
import { useT } from "../lib/i18n.tsx";

/* ================================================================
   Pagination — paginação editorial para listas e tabelas longas.
   ----------------------------------------------------------------
   Versão smart (uma chamada):

     <Pagination
       current={3}
       total={20}
       onChange={(n) => setPage(n)}
       siblings={1}        // vizinhos do atual mostrados
       boundaries={1}      // quantos das pontas mostrados
       showLabels          // mostra "Anterior · Próximo" como texto
     />

   Versão composable (controle total):

     <PaginationRoot>
       <PaginationPrev disabled onClick={...} />
       <PaginationItem n={1} active onClick={...} />
       <PaginationEllipsis />
       <PaginationItem n={3} onClick={...} />
       <PaginationItem n={4} onClick={...} />
       <PaginationItem n={5} onClick={...} />
       <PaginationEllipsis />
       <PaginationItem n={20} onClick={...} />
       <PaginationNext onClick={...} />
     </PaginationRoot>

   Diferente do <PageNav> (paginação editorial entre capítulos do
   manual), este componente serve para listas/tabelas paginadas
   dentro de uma única página.
   ================================================================ */

/* ---------- Helper: range de páginas mostradas ----------
   Inspirado em Material UI / Mantine: gera array com números e
   "ellipsis" (string "...") nas posições corretas. */
export function getPaginationRange({ current, total, siblings = 1, boundaries = 1 }: any) {
  const totalNumbers = boundaries * 2 + siblings * 2 + 3; // primeiras + últimas + atual + 2 ellipses
  if (totalNumbers >= total) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const startPages = Array.from({ length: boundaries }, (_, i) => i + 1);
  const endPages = Array.from(
    { length: boundaries },
    (_, i) => total - boundaries + i + 1
  );
  const siblingsStart = Math.max(
    Math.min(current - siblings, total - boundaries - siblings * 2 - 1),
    boundaries + 2
  );
  const siblingsEnd = Math.min(
    Math.max(current + siblings, boundaries + siblings * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : total - 1
  );
  const result = [];
  result.push(...startPages);
  if (siblingsStart > boundaries + 2) result.push("...");
  else if (boundaries + 1 < total - boundaries) result.push(boundaries + 1);
  for (let i = siblingsStart; i <= siblingsEnd; i++) result.push(i);
  if (siblingsEnd < total - boundaries - 1) result.push("...");
  else if (total - boundaries > boundaries) result.push(total - boundaries);
  result.push(...endPages);
  return result;
}

/* ================================================================
   Smart component — uma chamada faz tudo
   ================================================================ */
export function Pagination({
  current,
  total,
  onChange,
  siblings = 1,
  boundaries = 1,
  showLabels = false,
  className = "",
}: any) {
  const range = useMemo(
    () => getPaginationRange({ current, total, siblings, boundaries }),
    [current, total, siblings, boundaries]
  );

  if (total <= 1) return null;

  const goPrev = () => current > 1 && onChange?.(current - 1);
  const goNext = () => current < total && onChange?.(current + 1);

  return (
    <PaginationRoot className={className}>
      <PaginationPrev
        disabled={current <= 1}
        onClick={goPrev}
        showLabel={showLabels}
      />
      {range.map((p, i) =>
        p === "..." ? (
          <PaginationEllipsis key={`e-${i}`} />
        ) : (
          <PaginationItem
            key={p}
            n={p}
            active={p === current}
            onClick={() => onChange?.(p)}
          />
        )
      )}
      <PaginationNext
        disabled={current >= total}
        onClick={goNext}
        showLabel={showLabels}
      />
    </PaginationRoot>
  );
}

/* ================================================================
   Composable subcomponents — controle total
   ================================================================ */

export function PaginationRoot({ children, ariaLabel, className = "" }: any) {
  const { t } = useT();
  return (
    <nav
      className={`ds-pagination ${className}`.trim()}
      aria-label={ariaLabel || t("ds.pagination.label")}
    >
      <ul>{children}</ul>
    </nav>
  );
}

export function PaginationItem({ n, active = false, onClick }: any) {
  return (
    <li>
      <button
        type="button"
        className={`ds-pagination-item ${active ? "active" : ""}`}
        aria-current={active ? "page" : undefined}
        aria-label={`Página ${n}`}
        onClick={onClick}
      >
        {n}
      </button>
    </li>
  );
}

export function PaginationEllipsis() {
  return (
    <li aria-hidden="true">
      <span className="ds-pagination-ellipsis">···</span>
    </li>
  );
}

export function PaginationPrev({ onClick, disabled = false, showLabel = false }: any) {
  const { t } = useT();
  return (
    <li>
      <button
        type="button"
        className="ds-pagination-arrow"
        onClick={onClick}
        disabled={disabled}
        aria-label={t("ds.pagination.previous")}
      >
        <span aria-hidden="true">←</span>
        {showLabel && <span>{t("ds.pagination.previous")}</span>}
      </button>
    </li>
  );
}

export function PaginationNext({ onClick, disabled = false, showLabel = false }: any) {
  const { t } = useT();
  return (
    <li>
      <button
        type="button"
        className="ds-pagination-arrow"
        onClick={onClick}
        disabled={disabled}
        aria-label={t("ds.pagination.next")}
      >
        {showLabel && <span>{t("ds.pagination.next")}</span>}
        <span aria-hidden="true">→</span>
      </button>
    </li>
  );
}
