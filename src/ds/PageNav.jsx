import { FLAT_ROUTES, findFlatIndex } from "../lib/routes.js";
import { useT } from "../lib/i18n.jsx";

/* ================================================================
   PageNav — paginação editorial entre páginas consecutivas.
   ----------------------------------------------------------------
   Duas colunas, divididas por uma régua superior:
     ← anterior                              próximo →
     20 · sidebar                          21 · navbar

   Recebe o slug da página atual (`current`) e o callback de
   navegação. Decide automaticamente prev/next a partir de
   FLAT_ROUTES (a ordem de leitura).
   ================================================================ */

export function PageNav({ current, onNavigate }) {
  const { t } = useT();
  const idx = findFlatIndex(current);
  if (idx < 0) return null;

  const prev = idx > 0 ? FLAT_ROUTES[idx - 1] : null;
  const next = idx < FLAT_ROUTES.length - 1 ? FLAT_ROUTES[idx + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav className="page-nav" aria-label={t("common.pageNav.label")}>
      <div className="page-nav-side prev">
        {prev ? (
          <PageNavLink
            entry={prev}
            direction="prev"
            label={t("common.pageNav.previous")}
            onNavigate={onNavigate}
          />
        ) : (
          <span aria-hidden="true" />
        )}
      </div>
      <div className="page-nav-side next">
        {next ? (
          <PageNavLink
            entry={next}
            direction="next"
            label={t("common.pageNav.next")}
            onNavigate={onNavigate}
          />
        ) : (
          <span aria-hidden="true" />
        )}
      </div>
    </nav>
  );
}

function PageNavLink({ entry, direction, label, onNavigate }) {
  const { t } = useT();
  const arrow = direction === "prev" ? "←" : "→";
  const itemLabel = t(`nav.items.${entry.id}`);
  return (
    <a
      href={`#/${entry.slug}`}
      className={`page-nav-link ${direction}`}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        onNavigate?.(entry.slug);
        // Volta ao topo ao trocar de página — leitura recomeça do início.
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
    >
      <span className="page-nav-kicker">
        {direction === "prev" && (
          <span className="page-nav-arrow" aria-hidden="true">
            {arrow}
          </span>
        )}
        {label}
        {direction === "next" && (
          <span className="page-nav-arrow" aria-hidden="true">
            {arrow}
          </span>
        )}
      </span>
      <span className="page-nav-title">
        <span className="n">{entry.n}</span>
        <span>{itemLabel}</span>
      </span>
    </a>
  );
}
