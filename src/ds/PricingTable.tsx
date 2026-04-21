import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";

/* ================================================================
   PricingTable / Comparison — tabela editorial de planos (15.3)
   ----------------------------------------------------------------
   Wrapper semântico + slots finos sobre table/thead/tbody/tr/th/td.
   ================================================================ */

export function PricingTable({
  children,
  className = "",
  ...rest
}: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="ds-pricing-scroll">
      <table className={`ds-pricing-table ${className}`.trim()} {...rest}>
        {children}
      </table>
    </div>
  );
}

export function PricingTableHead({ children }: { children?: ReactNode }) {
  return <thead className="ds-pricing-thead">{children}</thead>;
}

export function PricingTableBody({ children }: { children?: ReactNode }) {
  return <tbody className="ds-pricing-tbody">{children}</tbody>;
}

export function PricingTableRow({ children, className = "" }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={`ds-pricing-tr ${className}`.trim()}>{children}</tr>;
}

export interface PricingTableThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Alinha o fundo de destaque com as células `accent` da mesma coluna. */
  accent?: boolean;
}

export function PricingTableTh({
  children,
  className = "",
  accent = false,
  ...rest
}: PricingTableThProps) {
  const cls = ["ds-pricing-th"];
  if (accent) cls.push("is-accent");
  if (className) cls.push(className);
  return (
    <th className={cls.join(" ")} {...rest}>
      {children}
    </th>
  );
}

export interface PricingTableTdProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /** Destaque de coluna de produto (acento leve). */
  accent?: boolean;
  /** Célula só com ícone de inclusão (✓ / —). */
  check?: boolean;
}

export function PricingTableTd({
  children,
  className = "",
  accent = false,
  check = false,
  ...rest
}: PricingTableTdProps) {
  const cls = ["ds-pricing-td"];
  if (accent) cls.push("is-accent");
  if (check) cls.push("is-check");
  if (className) cls.push(className);
  return (
    <td className={cls.join(" ")} {...rest}>
      {children}
    </td>
  );
}
