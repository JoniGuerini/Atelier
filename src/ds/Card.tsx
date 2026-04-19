import type { ElementType, HTMLAttributes, ReactNode } from "react";
import type { CardProps } from "./types.ts";

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

interface CardSlotProps {
  children?: ReactNode;
}
interface CardTitleProps extends CardSlotProps {
  as?: ElementType;
}

export function Card({
  children,
  className = "",
  ...rest
}: CardProps & HTMLAttributes<HTMLElement>) {
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
export function CardHeader({ children }: CardSlotProps) {
  return <>{children}</>;
}

export function CardKicker({ children }: CardSlotProps) {
  return <div className="card-kicker">{children}</div>;
}

export function CardTitle({ children, as: Comp = "h3" }: CardTitleProps) {
  return <Comp className="card-title">{children}</Comp>;
}

export function CardBody({ children }: CardSlotProps) {
  return <div className="card-body">{children}</div>;
}

export function CardFooter({ children }: CardSlotProps) {
  return <div className="card-foot">{children}</div>;
}
