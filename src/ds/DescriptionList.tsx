import type { ReactNode } from "react";

/* ================================================================
   DescriptionList — dl editorial (Fase 15.1)
   ----------------------------------------------------------------
   Agrupa termo + definição em linhas legíveis. HTML5 permite
   <div> dentro de <dl> como grupo.

     <DescriptionList>
       <DescriptionRow term="Ink">#1a1a1a</DescriptionRow>
       <DescriptionRow term="Rule">1px solid var(--rule)</DescriptionRow>
     </DescriptionList>
   ================================================================ */

export function DescriptionList({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return <dl className={`ds-dl ${className}`.trim()}>{children}</dl>;
}

export interface DescriptionRowProps {
  term: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function DescriptionRow({ term, children, className = "" }: DescriptionRowProps) {
  return (
    <div className={`ds-dl-row ${className}`.trim()}>
      <dt className="ds-dl-term">{term}</dt>
      <dd className="ds-dl-def">{children}</dd>
    </div>
  );
}
