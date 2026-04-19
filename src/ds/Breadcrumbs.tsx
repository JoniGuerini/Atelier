import { useT } from "../lib/i18n.tsx";

/* ================================================================
   Breadcrumbs — trilha de navegação editorial.
   ----------------------------------------------------------------
   Forma curta (atalho retrocompatível com a primitiva original):

     <Breadcrumbs items={["Atelier", "Components", "Tabs"]} />

   Forma composable (controle total):

     <BreadcrumbsRoot>
       <Breadcrumb href="#/overview">Atelier</Breadcrumb>
       <BreadcrumbSeparator />
       <Breadcrumb href="#/cards">Components</Breadcrumb>
       <BreadcrumbSeparator />
       <BreadcrumbCurrent>Tabs</BreadcrumbCurrent>
     </BreadcrumbsRoot>
   ================================================================ */

export function Breadcrumbs({ items, separator, className = "" }: any) {
  // Atalho: aceita array de strings; o último é o current.
  if (!items || items.length === 0) return null;
  return (
    <BreadcrumbsRoot className={className}>
      {items.map((label, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="ds-crumbs-group">
            {isLast ? (
              <BreadcrumbCurrent>{label}</BreadcrumbCurrent>
            ) : (
              <Breadcrumb>{label}</Breadcrumb>
            )}
            {!isLast && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
          </span>
        );
      })}
    </BreadcrumbsRoot>
  );
}

export function BreadcrumbsRoot({ children, className = "", ariaLabel }: any) {
  const { t } = useT();
  return (
    <nav
      className={`ds-crumbs ${className}`.trim()}
      aria-label={ariaLabel || t("ds.breadcrumbs.label")}
    >
      <ol>{children}</ol>
    </nav>
  );
}

export function Breadcrumb({ href, onClick, children }: any) {
  const handle = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };
  if (href || onClick) {
    return (
      <li className="ds-crumbs-item">
        <a href={href || "#"} onClick={handle} className="ds-crumbs-link">
          {children}
        </a>
      </li>
    );
  }
  return <li className="ds-crumbs-item">{children}</li>;
}

export function BreadcrumbCurrent({ children }: any) {
  return (
    <li className="ds-crumbs-item is-current" aria-current="page">
      {children}
    </li>
  );
}

export function BreadcrumbSeparator({ children = "/" }: any) {
  return (
    <li className="ds-crumbs-sep" aria-hidden="true">
      {children}
    </li>
  );
}
