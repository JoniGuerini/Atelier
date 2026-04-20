import { useT } from "../lib/i18n.tsx";

/* ================================================================
   LayoutToggle — alterna o navbar entre "boxed" (largura limitada
   pelo --content-max, alinhado com o conteúdo) e "wide" (ocupa
   100% do viewport, mais arejado em monitores grandes).
   ----------------------------------------------------------------
   Inspirado no toggle do shadcn/ui no canto superior do site.
   Aplica-se SOMENTE quando navMode === "navbar"; no modo sidebar
   o conceito não faz sentido (a sidebar já come a coluna esquerda).

   Glifo: traços verticais nas duas laterais (as bordas do viewport)
   com um retângulo central representando o conteúdo. No estado
   "boxed" o retângulo é estreito (longe das bordas); em "wide"
   ele se alarga, sugerindo a expansão até as margens.
   ================================================================ */

interface LayoutToggleProps {
  wide?: boolean;
  onToggle?: () => void;
}

export function LayoutToggle({ wide = false, onToggle }: LayoutToggleProps) {
  const { t } = useT();
  const label = wide ? t("nav.layout.toBoxed") : t("nav.layout.toWide");
  return (
    <button
      type="button"
      className={`layout-toggle ${wide ? "is-wide" : ""}`}
      onClick={onToggle}
      aria-pressed={wide}
      aria-label={label}
      title={label}
    >
      <svg
        viewBox="0 0 16 16"
        width="14"
        height="14"
        aria-hidden="true"
        focusable="false"
      >
        {/* Traço vertical esquerdo — borda do viewport */}
        <line
          x1="1.5"
          y1="3"
          x2="1.5"
          y2="13"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        {/* Retângulo central — o conteúdo. */}
        <rect
          x="5"
          y="4.5"
          width="6"
          height="7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        {/* Traço vertical direito — borda do viewport */}
        <line
          x1="14.5"
          y1="3"
          x2="14.5"
          y2="13"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
