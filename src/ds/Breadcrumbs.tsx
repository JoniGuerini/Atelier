import type { MouseEvent, ReactNode } from "react";
import { useT } from "../lib/i18n.tsx";
import type { BreadcrumbsProps, BreadcrumbProps } from "./types.ts";

interface BreadcrumbsRootProps {
  children?: ReactNode;
  className?: string;
  ariaLabel?: string;
}
interface BreadcrumbCurrentProps {
  children?: ReactNode;
}
interface BreadcrumbSeparatorProps {
  children?: ReactNode;
}

/* ================================================================
   Breadcrumbs — trilha de navegação editorial.
   ----------------------------------------------------------------
   Forma curta (atalho retrocompatível com a primitiva original):

     <Breadcrumbs items={["Atelier", "Components", "Tabs"]} />

   Forma composable (controle total):

     <BreadcrumbsRoot>
       <Breadcrumb href="#/home">Atelier</Breadcrumb>
       <BreadcrumbSeparator />
       <Breadcrumb href="#/cards">Components</Breadcrumb>
       <BreadcrumbSeparator />
       <BreadcrumbCurrent>Tabs</BreadcrumbCurrent>
     </BreadcrumbsRoot>
   ================================================================ */

export function Breadcrumbs({ items, separator, className = "" }: BreadcrumbsProps) {
  // Atalho: aceita array de strings; o último é o current.
  if (!items || items.length === 0) return null;
  return (
    <BreadcrumbsRoot className={className}>
      {items.map((label: any, i: any) => {
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

export function BreadcrumbsRoot({ children, className = "", ariaLabel }: BreadcrumbsRootProps) {
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

export function Breadcrumb({ href, onClick, children }: BreadcrumbProps) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
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

export function BreadcrumbCurrent({ children }: BreadcrumbCurrentProps) {
  return (
    <li className="ds-crumbs-item is-current" aria-current="page">
      {children}
    </li>
  );
}

export function BreadcrumbSeparator({ children = "/" }: BreadcrumbSeparatorProps) {
  return (
    <li className="ds-crumbs-sep" aria-hidden="true">
      {children}
    </li>
  );
}
