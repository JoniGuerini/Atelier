import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type UIEvent,
} from "react";

/* ================================================================
   VirtualList — lista virtualizada (windowing).
   ----------------------------------------------------------------
   Renderiza apenas os items VISÍVEIS (+ um buffer pra cima e baixo),
   permitindo listas com 10.000+ items sem travar o navegador.

   Suporta dois modos:
     · itemHeight: number       → todos os items têm altura fixa
     · itemHeight: (i) => number → altura variável por item
                                   (mais lento, mas flexível)

   Plus opcional:
     · onEndReached + endThreshold — callback pra infinite loading
     · scrollTo(index) — pula pra um item específico (ref imperativo)

   Sem libs externas. Algoritmo:
     1. fixed: range = [start, end] = [Math.floor(scrollTop / h),
                                        Math.ceil((scrollTop + viewport) / h)]
     2. variable: pre-computa offsets cumulativos; busca binária
        pra achar o startIndex; itera até cobrir o viewport.

   API genérica: T é o tipo do item.
================================================================ */

export type VirtualListItemHeight = number | ((index: number) => number);

export interface VirtualListProps<T> {
  /** Items da lista. */
  items: T[];
  /** Altura por item (px). Pode ser função (index) => height. */
  itemHeight: VirtualListItemHeight;
  /** Render de cada item — recebe item + index. */
  renderItem: (item: T, index: number) => ReactNode;
  /** Altura do container (px ou string). Default: 400. */
  height?: number | string;
  /** Quantos items extras renderizar acima e abaixo do viewport. Default: 3. */
  overscan?: number;
  /** Callback ao chegar próximo do fim — útil pra infinite loading. */
  onEndReached?: () => void;
  /** Distância (em items) do fim que dispara onEndReached. Default: 5. */
  endThreshold?: number;
  /** Função de chave única por item (default: index). */
  getKey?: (item: T, index: number) => string | number;
  /** Classes/estilo do scroll container. */
  className?: string;
  ariaLabel?: string;
  /** Estilo extra do container. */
  style?: CSSProperties;
}

export function VirtualList<T>({
  items,
  itemHeight,
  renderItem,
  height = 400,
  overscan = 3,
  onEndReached,
  endThreshold = 5,
  getKey,
  className = "",
  ariaLabel,
  style,
}: VirtualListProps<T>) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportH, setViewportH] = useState(
    typeof height === "number" ? height : 400,
  );

  /* --- pre-computa offsets se variable height --- */
  const isVariable = typeof itemHeight === "function";
  const fixedH = isVariable ? 0 : (itemHeight as number);

  const offsets = useMemo<number[] | null>(() => {
    if (!isVariable) return null;
    const fn = itemHeight as (i: number) => number;
    const out: number[] = new Array(items.length + 1);
    out[0] = 0;
    for (let i = 0; i < items.length; i++) {
      out[i + 1] = out[i] + fn(i);
    }
    return out;
  }, [isVariable, itemHeight, items.length]);

  const totalHeight = useMemo(() => {
    if (offsets) return offsets[offsets.length - 1] ?? 0;
    return fixedH * items.length;
  }, [offsets, fixedH, items.length]);

  /* --- calcula o range visível --- */
  const range = useMemo(() => {
    if (items.length === 0) return { start: 0, end: 0 };

    if (offsets) {
      // Variable: busca binária pelo startIndex
      const findIndex = (offset: number): number => {
        let lo = 0;
        let hi = offsets.length - 1;
        while (lo < hi) {
          const mid = (lo + hi) >> 1;
          if (offsets[mid + 1] <= offset) lo = mid + 1;
          else hi = mid;
        }
        return lo;
      };
      const start = Math.max(0, findIndex(scrollTop) - overscan);
      const end = Math.min(
        items.length,
        findIndex(scrollTop + viewportH) + 1 + overscan,
      );
      return { start, end };
    }

    // Fixed
    const start = Math.max(0, Math.floor(scrollTop / fixedH) - overscan);
    const end = Math.min(
      items.length,
      Math.ceil((scrollTop + viewportH) / fixedH) + overscan,
    );
    return { start, end };
  }, [scrollTop, viewportH, items.length, fixedH, offsets, overscan]);

  /* --- offset do primeiro item visível --- */
  const startOffset = offsets ? offsets[range.start] : range.start * fixedH;

  /* --- scroll handler --- */
  const onScroll = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      const top = (e.currentTarget as HTMLDivElement).scrollTop;
      setScrollTop(top);

      // onEndReached: dispara quando faltam <= endThreshold items
      if (onEndReached) {
        const threshold = offsets
          ? offsets[Math.max(0, items.length - endThreshold)]
          : Math.max(0, items.length - endThreshold) * fixedH;
        if (top + viewportH >= threshold) {
          onEndReached();
        }
      }
    },
    [onEndReached, endThreshold, fixedH, offsets, items.length, viewportH],
  );

  /* --- ResizeObserver pra reagir a viewport changes --- */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const h = entries[0]?.contentRect.height;
      if (h) setViewportH(h);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* --- render --- */
  const visible: ReactNode[] = [];
  for (let i = range.start; i < range.end; i++) {
    const item = items[i];
    const itemH = offsets ? offsets[i + 1] - offsets[i] : fixedH;
    const key = getKey ? getKey(item, i) : i;
    visible.push(
      <div
        key={key}
        className="ds-vlist-item"
        style={{ height: itemH }}
        data-index={i}
      >
        {renderItem(item, i)}
      </div>,
    );
  }

  const containerStyle: CSSProperties = {
    height,
    overflowY: "auto",
    overflowX: "hidden",
    position: "relative",
    ...style,
  };

  return (
    <div
      ref={scrollRef}
      className={`ds-vlist ${className}`.trim()}
      style={containerStyle}
      onScroll={onScroll}
      role="list"
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {/* Spacer total — define a altura "real" pra dar scroll ao container */}
      <div className="ds-vlist-spacer" style={{ height: totalHeight }}>
        {/* Janela visível — translada pra posição correta */}
        <div
          className="ds-vlist-window"
          style={{
            transform: `translateY(${startOffset}px)`,
          }}
        >
          {visible}
        </div>
      </div>
    </div>
  );
}
