import type { HTMLAttributes, ReactNode } from "react";

/* ================================================================
   Mark / Highlight — ênfase inline editorial (Fase 15.1)
   ----------------------------------------------------------------
   Wrapper semântico em <mark>. Duas variantes de cor de fundo.

     <p>Texto com <Mark>destaque</Mark> e <Highlight variant="accent">alerta</Highlight>.</p>
   ================================================================ */

export type MarkVariant = "default" | "accent";

export interface MarkProps extends HTMLAttributes<HTMLElement> {
  variant?: MarkVariant;
  children?: ReactNode;
}

export function Mark({ variant = "default", className = "", children, ...rest }: MarkProps) {
  return (
    <mark className={`ds-mark variant-${variant} ${className}`.trim()} {...rest}>
      {children}
    </mark>
  );
}

/** Alias de <Mark> — mesmo componente. */
export function Highlight(props: MarkProps) {
  return <Mark {...props} />;
}
