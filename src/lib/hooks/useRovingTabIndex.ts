import { useCallback, useEffect, useRef, useState } from "react";

/* ================================================================
   useRovingTabIndex — Roadmap · fase 6.2
   ----------------------------------------------------------------
   Navegação por arrow keys em listas e grids. Apenas UM item
   recebe `tabIndex={0}` por vez — os outros ficam em -1. Tab move
   o foco PARA FORA do widget; arrow keys movem DENTRO. Padrão
   adotado por TreeView, Carousel, Toolbar, Tabs (pode substituir
   o tabindex manual em vários lugares).

   Devolve:
     - activeIndex   : índice ativo
     - setActiveIndex: setter externo (ex: ao clicar)
     - getItemProps  : (index) => { tabIndex, ref, onKeyDown }
                        passe ESPALHADO no item.

   Comportamento por orientation:
     - "horizontal": ArrowLeft/Right
     - "vertical":   ArrowUp/Down
     - "both":       todos (default — útil em grids)
   Home → primeiro, End → último. Loop ativo por padrão.
   ================================================================ */

export type RovingOrientation = "horizontal" | "vertical" | "both";

export interface UseRovingTabIndexOptions {
  orientation?: RovingOrientation;
  /** Loop nas pontas. Default true. */
  loop?: boolean;
  /** Índice inicial. Default 0. */
  initialIndex?: number;
}

export interface RovingItemProps {
  ref: (el: HTMLElement | null) => void;
  tabIndex: number;
  onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
  onFocus: () => void;
}

export function useRovingTabIndex(
  count: number,
  options: UseRovingTabIndexOptions = {}
): {
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  getItemProps: (index: number) => RovingItemProps;
} {
  const {
    orientation = "both",
    loop = true,
    initialIndex = 0,
  } = options;

  const [activeIndex, setActiveIndex] = useState<number>(
    Math.max(0, Math.min(initialIndex, count - 1))
  );
  const itemsRef = useRef<(HTMLElement | null)[]>([]);

  /* Mantém o vetor com tamanho `count` */
  if (itemsRef.current.length !== count) {
    itemsRef.current.length = count;
  }

  /* Foca o item correspondente quando activeIndex muda por teclado */
  const moveFocus = useCallback(
    (next: number) => {
      const target = itemsRef.current[next];
      if (target) target.focus();
    },
    []
  );

  const next = useCallback(
    (delta: number) => {
      setActiveIndex((cur) => {
        let n = cur + delta;
        if (loop) {
          n = ((n % count) + count) % count;
        } else {
          n = Math.max(0, Math.min(count - 1, n));
        }
        moveFocus(n);
        return n;
      });
    },
    [count, loop, moveFocus]
  );

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(count - 1, index));
      setActiveIndex(clamped);
      moveFocus(clamped);
    },
    [count, moveFocus]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      const horizontal = orientation === "horizontal" || orientation === "both";
      const vertical = orientation === "vertical" || orientation === "both";

      switch (e.key) {
        case "ArrowRight":
          if (!horizontal) return;
          e.preventDefault();
          next(1);
          break;
        case "ArrowLeft":
          if (!horizontal) return;
          e.preventDefault();
          next(-1);
          break;
        case "ArrowDown":
          if (!vertical) return;
          e.preventDefault();
          next(1);
          break;
        case "ArrowUp":
          if (!vertical) return;
          e.preventDefault();
          next(-1);
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(count - 1);
          break;
      }
    },
    [orientation, next, goTo, count]
  );

  const getItemProps = useCallback(
    (index: number): RovingItemProps => ({
      ref: (el) => {
        itemsRef.current[index] = el;
      },
      tabIndex: index === activeIndex ? 0 : -1,
      onKeyDown: handleKeyDown,
      onFocus: () => setActiveIndex(index),
    }),
    [activeIndex, handleKeyDown]
  );

  useEffect(() => {
    /* clamp se o count diminuir abaixo do activeIndex */
    if (activeIndex >= count) {
      setActiveIndex(Math.max(0, count - 1));
    }
  }, [count, activeIndex]);

  return { activeIndex, setActiveIndex: goTo, getItemProps };
}
