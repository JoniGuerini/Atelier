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

export function Table({ children, className = "" }) {
  return (
    <div className="ds-table-wrap">
      <table className={`ds-table ${className}`.trim()}>{children}</table>
    </div>
  );
}

export function TableHead({ children }) {
  return <thead>{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableFoot({ children }) {
  return <tfoot>{children}</tfoot>;
}

export function TableRow({ children, ...rest }) {
  return <tr {...rest}>{children}</tr>;
}

export function TableHeader({ children, width, align, ...rest }) {
  const style = {};
  if (width != null) style.width = width;
  if (align) style.textAlign = align;
  return (
    <th style={style} {...rest}>
      {children}
    </th>
  );
}

export function TableCell({ children, mono = false, align, ...rest }) {
  const cls = mono ? "mono" : undefined;
  const style = align ? { textAlign: align } : undefined;
  return (
    <td className={cls} style={style} {...rest}>
      {children}
    </td>
  );
}
