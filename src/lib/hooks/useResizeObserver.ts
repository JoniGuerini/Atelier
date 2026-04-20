import { useEffect, useState, type RefObject } from "react";

/* ================================================================
   useResizeObserver (Roadmap · fase 10.1)
   ----------------------------------------------------------------
   Observa as dimensões de um elemento. Retorna { width, height }
   reativo, ou null antes da primeira medida.

   Pré-requisito formal do VirtualList em modo autoHeight (já usa
   ResizeObserver internamente). Útil também para gráficos
   responsivos, tabelas com colunas elásticas, qualquer SVG que
   precisa do tamanho do container.

   SSR-safe: null no server.
   ================================================================ */

export interface ResizeObserverSize {
  width: number;
  height: number;
}

export function useResizeObserver(
  ref: RefObject<Element | null>
): ResizeObserverSize | null {
  const [size, setSize] = useState<ResizeObserverSize | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("ResizeObserver" in window)) {
      return;
    }
    const node = ref.current;
    if (!node) return;

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}
