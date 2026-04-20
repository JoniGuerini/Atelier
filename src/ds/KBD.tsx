import type { ReactNode, HTMLAttributes } from "react";

/* ================================================================
   KBD + InlineCode
   ----------------------------------------------------------------
   Primitivos públicos pra atalhos de teclado e código inline.
   Variantes:
     - subtle   linha de fundo discreta, sem caixa
     - boxed    caixa sólida com borda (default — leitura clara)
     - outline  só contorno, sem fill
   ================================================================ */

export type KbdVariant = "subtle" | "boxed" | "outline";

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  variant?: KbdVariant;
  size?: "sm" | "md";
  children?: ReactNode;
}

/** Tecla individual ou combinação curta dentro de uma frase. */
export function KBD({
  variant = "boxed",
  size = "md",
  className = "",
  children,
  ...rest
}: KbdProps) {
  return (
    <kbd
      className={`ds-kbd ds-kbd--${variant} ds-kbd--${size} ${className}`.trim()}
      {...rest}
    >
      {children}
    </kbd>
  );
}

export interface KbdComboProps extends HTMLAttributes<HTMLSpanElement> {
  /** Lista de teclas. Use strings curtas — '⌘', 'K', 'Shift', '?'. */
  keys: string[];
  variant?: KbdVariant;
  size?: "sm" | "md";
  /** Caractere visual entre teclas. Default: '+' (somente Windows-style).
   *  Use null pra remover (estilo Mac: ⌘K). */
  separator?: string | null;
}

/** Composição de teclas: <KbdCombo keys={["⌘","K"]} /> */
export function KbdCombo({
  keys,
  variant = "boxed",
  size = "md",
  separator = null,
  className = "",
  ...rest
}: KbdComboProps) {
  return (
    <span
      className={`ds-kbd-combo ${className}`.trim()}
      {...rest}
    >
      {keys.map((k, i) => (
        <span key={i} className="ds-kbd-combo-part">
          <KBD variant={variant} size={size}>
            {k}
          </KBD>
          {separator && i < keys.length - 1 && (
            <span className="ds-kbd-combo-sep" aria-hidden="true">
              {separator}
            </span>
          )}
        </span>
      ))}
    </span>
  );
}

export type InlineCodeVariant = "subtle" | "boxed" | "outline";

export interface InlineCodeProps extends HTMLAttributes<HTMLElement> {
  variant?: InlineCodeVariant;
  children?: ReactNode;
}

/** Trecho curto de código no meio de um parágrafo. */
export function InlineCode({
  variant = "subtle",
  className = "",
  children,
  ...rest
}: InlineCodeProps) {
  return (
    <code
      className={`ds-inline-code ds-inline-code--${variant} ${className}`.trim()}
      {...rest}
    >
      {children}
    </code>
  );
}
