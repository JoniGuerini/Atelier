import { useEffect } from "react";

/* ================================================================
   useFocusReturn — Roadmap · fase 6.2
   ----------------------------------------------------------------
   Captura o elemento focado no momento em que `active` vira true
   e restaura o foco quando o componente desmonta (ou `active` vira
   false). Garante que ao fechar um modal/drawer/popover o foco
   volte para o trigger original — comportamento esperado por
   leitores de tela e navegação por teclado.

   Uso típico (sempre junto de useFocusTrap em overlays):
     useFocusTrap(panelRef, isOpen);
     useFocusReturn(isOpen);
   ================================================================ */

export function useFocusReturn(active: boolean = true): void {
  useEffect(() => {
    if (!active) return;
    if (typeof document === "undefined") return;

    /* Captura o focado anterior — antes do trap pegar */
    const previous = document.activeElement as HTMLElement | null;

    return () => {
      /* Restaura só se o nó ainda está no DOM e é focável */
      if (previous && document.contains(previous)) {
        try {
          previous.focus({ preventScroll: true });
        } catch {
          /* alguns elementos não aceitam focus (ex: SVG sem tabindex) */
        }
      }
    };
  }, [active]);
}
