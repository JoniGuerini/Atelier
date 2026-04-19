import { useT } from "../lib/i18n.tsx";

/* ================================================================
   LayoutToggle — alterna o navbar entre "boxed" (largura limitada
   pelo --content-max, alinhado com o conteúdo) e "wide" (ocupa
   100% do viewport, mais arejado em monitores grandes).
   ----------------------------------------------------------------
   Inspirado no toggle do shadcn/ui no canto superior do site.
   Aplica-se SOMENTE quando navMode === "navbar"; no modo sidebar
   o conceito não faz sentido (a sidebar já come a coluna esquerda).

   Glifo: dois retângulos lado a lado representando a janela —
   no estado "wide" o segundo retângulo abre, sugerindo expansão.
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
        {/* Moldura externa — sempre presente */}
        <rect
          x="1.5"
          y="3"
          width="13"
          height="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        {/* Coluna esquerda — fixa (representa o "boxed") */}
        <line
          x1="6"
          y1="3"
          x2="6"
          y2="13"
          stroke="currentColor"
          strokeWidth="1.25"
        />
      </svg>
    </button>
  );
}
