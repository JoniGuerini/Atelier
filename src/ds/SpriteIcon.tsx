/* ================================================================
   SpriteIcon — símbolos definidos em public/icons.svg (fase 8.4)
   ----------------------------------------------------------------
   O Vite injeta esse ficheiro no <body> de index.html; cada ícone
   usa <use href="#atelier-*"> no mesmo documento (referência externa
   a /icons.svg#id falha em Safari/WebKit). `currentColor` herda do
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

export function SpriteIcon({ name, size = 14, className = "" }: SpriteIconProps) {
  const id = `atelier-${name}`;
  const href = `#${id}`;
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
