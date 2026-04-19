import type {
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";
import type {
  TableHeaderCellProps,
  TableCellProps,
  TableAlign,
} from "./types.ts";

/* ================================================================
   Table — API composable, ainda baseada em <table> nativa.
   ----------------------------------------------------------------
     <Table>
       <TableHead>
         <TableRow>
           <TableHeader>n</TableHeader>
           <TableHeader>Título</TableHeader>
         </TableRow>
       </TableHead>
       <TableBody>
         <TableRow>
           <TableCell mono>01</TableCell>
           <TableCell><em>Sobre tipos</em></TableCell>
         </TableRow>
       </TableBody>
     </Table>
   ================================================================ */

interface TableProps {
  children?: ReactNode;
  className?: string;
}
interface SectionProps {
  children?: ReactNode;
}

export function Table({ children, className = "" }: TableProps) {
  return (
    <div className="ds-table-wrap">
      <table className={`ds-table ${className}`.trim()}>{children}</table>
    </div>
  );
}

export function TableHead({ children }: SectionProps) {
  return <thead>{children}</thead>;
}

export function TableBody({ children }: SectionProps) {
  return <tbody>{children}</tbody>;
}

export function TableFoot({ children }: SectionProps) {
  return <tfoot>{children}</tfoot>;
}

export function TableRow({
  children,
  ...rest
}: { children?: ReactNode } & HTMLAttributes<HTMLTableRowElement>) {
  return <tr {...rest}>{children}</tr>;
}

export function TableHeader({
  children,
  width,
  align,
  ...rest
}: TableHeaderCellProps & ThHTMLAttributes<HTMLTableCellElement>) {
  const style: CSSProperties = {};
  if (width != null) style.width = width;
  if (align) style.textAlign = align as TableAlign;
  return (
    <th style={style} {...rest}>
      {children}
    </th>
  );
}

export function TableCell({
  children,
  mono = false,
  align,
  ...rest
}: TableCellProps & TdHTMLAttributes<HTMLTableCellElement>) {
  const cls = mono ? "mono" : undefined;
  const style: CSSProperties | undefined = align ? { textAlign: align as TableAlign } : undefined;
  return (
    <td className={cls} style={style} {...rest}>
      {children}
    </td>
  );
}
