/* ================================================================
   SpriteIcon — referência a símbolos em /icons.svg (fase 8.4)
   ----------------------------------------------------------------
   Caminhos duplicados saem do bundle JS; o ficheiro público pode
   ser cacheado pelo browser. `currentColor` nos símbolos herda do
   <svg> que envolve o <use>.
   ================================================================ */

export type SpriteIconId =
  | "chevron-right"
  | "chevron-up"
  | "nav-sidebar"
  | "nav-navbar"
  | "theme-dark"
  | "theme-light"
  | "github"
  | "linkedin";

export interface SpriteIconProps {
  name: SpriteIconId;
  /** Lado em px (viewBox 16×16). Default 14. */
  size?: number;
  className?: string;
}

const spriteUrl = `${import.meta.env.BASE_URL}icons.svg`;

export function SpriteIcon({ name, size = 14, className = "" }: SpriteIconProps) {
  const id = `atelier-${name}`;
  const href = `${spriteUrl}#${id}`;
  return (
    <svg
      className={["ds-sprite-icon", className].filter(Boolean).join(" ")}
      viewBox="0 0 16 16"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      <use href={href} />
    </svg>
  );
}
