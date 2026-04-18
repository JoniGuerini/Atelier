/* ================================================================
   Card — API composable (estilo shadcn).
   ----------------------------------------------------------------
     <Card>
       <CardHeader>
         <CardKicker>Chronicle · 04</CardKicker>
         <CardTitle>Sobre <em>tipos</em></CardTitle>
       </CardHeader>
       <CardBody>...</CardBody>
       <CardFooter>...</CardFooter>
     </Card>
   ================================================================ */

export function Card({ children, className = "", ...rest }) {
  const classes = ["ds-card"];
  if (className) classes.push(className);
  return (
    <article className={classes.join(" ")} {...rest}>
      {children}
    </article>
  );
}

/* Header é opcional — pode-se usar CardKicker/CardTitle direto.
   Existe para semântica + agrupar quando o consumidor quiser. */
export function CardHeader({ children }) {
  return <>{children}</>;
}

export function CardKicker({ children }) {
  return <div className="card-kicker">{children}</div>;
}

export function CardTitle({ children, as: Comp = "h3" }) {
  return <Comp className="card-title">{children}</Comp>;
}

export function CardBody({ children }) {
  return <div className="card-body">{children}</div>;
}

export function CardFooter({ children }) {
  return <div className="card-foot">{children}</div>;
}
