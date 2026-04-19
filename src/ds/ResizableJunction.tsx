import {
  Children,
  isValidElement,
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { useT } from "../lib/i18n.tsx";
import { ResizablePanel } from "./ResizablePanels.tsx";

/* ================================================================
   ResizableJunction — layout L-shape (3 painéis) com junction
   handle no centro que redimensiona em 2 dimensões simultâneas.
   ----------------------------------------------------------------
   Reescrito do zero usando CSS Grid em vez de flex aninhado.
   A grade tem 3 colunas × 3 linhas:

     col 1 (var --h%)  col 2 (1px)    col 3 (rest)
     ----------------  -------------  -------------
     |              |  |           |  |   Two    | row 1 (var --v%)
     |    One       |  |  vert     |  |----------|
     |              |  |  handle   |  |  horiz   | row 2 (1px)
     |              |  |           |  |  handle  |
     |              |  |           |  |----------|
     |              |  |           |  |  Three   | row 3 (rest)

   One ocupa col 1, span de todas as 3 rows (grid-row: 1 / -1).
   Vertical handle ocupa col 2, span de todas as rows.
   Horizontal handle ocupa col 3, row 2 apenas.
   Junction handle (cruz) é absoluto, posicionado no centro do "+".

   Cada painel tem cor própria + bordas sutis pra delimitar
   visualmente. Os handles são linhas sólidas de 1px (a célula
   inteira é a área draggable de 6px cobrindo essa linha).
================================================================ */

export interface ResizableJunctionProps {
  /** Exatamente 3 ResizablePanel: One (left), Two (top-right), Three (bot-right). */
  children?: ReactNode;
  /** % da coluna esquerda. Default: 50. */
  defaultHorizontal?: number;
  /** % do topo da coluna direita. Default: 50. */
  defaultVertical?: number;
  /** Modo controlado. */
  horizontal?: number;
  vertical?: number;
  onChange?: (sizes: { horizontal: number; vertical: number }) => void;
  /** % mínimo por painel. Default: 10. */
  minSize?: number;
  /** Persiste em localStorage. */
  storageKey?: string;
  className?: string;
  ariaLabel?: string;
}

/* O handle visual é 1px, mas a área draggable é 6px (3px pra cada lado).
   Como a grid usa 1px como track, a área "extra" é simulada com padding
   no próprio handle via box-sizing/border. Mas mais simples: o track
   é 6px, e dentro dele uma linha de 1px representa visualmente a borda.
   Vamos com: track 1px (linha pura) + hit area expandida via ::before. */
const HANDLE_TRACK = 6; // px — largura do track na grid (área de drag)

export function ResizableJunction({
  children,
  defaultHorizontal = 50,
  defaultVertical = 50,
  horizontal: hProp,
  vertical: vProp,
  onChange,
  minSize = 10,
  storageKey,
  className = "",
  ariaLabel,
}: ResizableJunctionProps) {
  const { t } = useT();
  const panels = Children.toArray(children).filter(isValidElement).slice(0, 3);
  const [one, two, three] = [panels[0], panels[1], panels[2]];

  /* --- state --- */
  const computeInitial = (): { h: number; v: number } => {
    if (storageKey && typeof window !== "undefined") {
      try {
        const raw = window.localStorage.getItem(storageKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (
            typeof parsed?.horizontal === "number" &&
            typeof parsed?.vertical === "number"
          ) {
            return { h: parsed.horizontal, v: parsed.vertical };
          }
        }
      } catch {
        /* ignore */
      }
    }
    return { h: defaultHorizontal, v: defaultVertical };
  };

  const [internal, setInternal] = useState(computeInitial);
  const isControlled = hProp !== undefined && vProp !== undefined;
  const h = isControlled ? hProp! : internal.h;
  const v = isControlled ? vProp! : internal.v;

  const setSizes = useCallback(
    (next: { h: number; v: number }) => {
      if (!isControlled) setInternal(next);
      onChange?.({ horizontal: next.h, vertical: next.v });
      if (storageKey && typeof window !== "undefined") {
        try {
          window.localStorage.setItem(
            storageKey,
            JSON.stringify({ horizontal: next.h, vertical: next.v }),
          );
        } catch {
          /* ignore */
        }
      }
    },
    [isControlled, onChange, storageKey],
  );

  /* --- pointer drag --- */
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{
    type: "h" | "v" | "junction";
    startH: number;
    startV: number;
    startClientX: number;
    startClientY: number;
    rect: DOMRect;
    pointerId: number;
  } | null>(null);

  const clampPair = (h: number, v: number) => ({
    h: Math.max(minSize, Math.min(100 - minSize, h)),
    v: Math.max(minSize, Math.min(100 - minSize, v)),
  });

  const onDown = (
    e: ReactPointerEvent<HTMLDivElement>,
    type: "h" | "v" | "junction",
  ) => {
    if (!containerRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    const rect = containerRef.current.getBoundingClientRect();
    dragRef.current = {
      type,
      startH: h,
      startV: v,
      startClientX: e.clientX,
      startClientY: e.clientY,
      rect,
      pointerId: e.pointerId,
    };
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    const dxPct = ((e.clientX - drag.startClientX) / drag.rect.width) * 100;
    const dyPct = ((e.clientY - drag.startClientY) / drag.rect.height) * 100;
    let newH = drag.startH;
    let newV = drag.startV;
    if (drag.type === "h" || drag.type === "junction") newH = drag.startH + dxPct;
    if (drag.type === "v" || drag.type === "junction") newV = drag.startV + dyPct;
    setSizes(clampPair(newH, newV));
  };

  const onUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag && drag.pointerId === e.pointerId) {
      dragRef.current = null;
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    }
  };

  /* --- keyboard --- */
  const onKey = (
    e: KeyboardEvent<HTMLDivElement>,
    type: "h" | "v" | "junction",
  ) => {
    const big = e.shiftKey ? 10 : 5;
    let newH = h;
    let newV = v;
    if (type === "h" || type === "junction") {
      if (e.key === "ArrowLeft") newH = h - big;
      else if (e.key === "ArrowRight") newH = h + big;
    }
    if (type === "v" || type === "junction") {
      if (e.key === "ArrowUp") newV = v - big;
      else if (e.key === "ArrowDown") newV = v + big;
    }
    if (newH !== h || newV !== v) {
      e.preventDefault();
      setSizes(clampPair(newH, newV));
    }
  };

  /* --- render ---
     Grid 3×3:
       cols: ${h}% | HANDLE_TRACK px | rest
       rows: ${v}% | HANDLE_TRACK px | rest
     - One (col 1, span all rows)
     - Vertical handle (col 2, span all rows)
     - Two (col 3, row 1)
     - Horizontal handle (col 3, row 2)
     - Three (col 3, row 3)
     - Junction handle (absolute overlay, centro do "+")
  */
  const cls = ["ds-junction-grid"];
  if (className) cls.push(className);

  const gridStyle: CSSProperties = {
    gridTemplateColumns: `${h}% ${HANDLE_TRACK}px 1fr`,
    gridTemplateRows: `${v}% ${HANDLE_TRACK}px 1fr`,
  };

  return (
    <div
      ref={containerRef}
      className={cls.join(" ")}
      role="group"
      aria-label={ariaLabel ?? t("ds.resizable.label")}
      style={gridStyle}
    >
      {/* Cell: One (col 1, all rows) */}
      <div className="ds-junction-grid-cell cell-one">{one}</div>

      {/* Vertical handle (col 2, all rows) */}
      <div
        role="separator"
        aria-orientation="vertical"
        aria-valuemin={minSize}
        aria-valuemax={100 - minSize}
        aria-valuenow={h}
        aria-label={t("ds.resizable.handle")}
        tabIndex={0}
        className="ds-junction-grid-handle handle-v"
        onPointerDown={(e) => onDown(e, "h")}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onKeyDown={(e) => onKey(e, "h")}
      />

      {/* Cell: Two (col 3, row 1) */}
      <div className="ds-junction-grid-cell cell-two">{two}</div>

      {/* Horizontal handle (col 3, row 2) */}
      <div
        role="separator"
        aria-orientation="horizontal"
        aria-valuemin={minSize}
        aria-valuemax={100 - minSize}
        aria-valuenow={v}
        aria-label={t("ds.resizable.handle")}
        tabIndex={0}
        className="ds-junction-grid-handle handle-h"
        onPointerDown={(e) => onDown(e, "v")}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onKeyDown={(e) => onKey(e, "v")}
      />

      {/* Cell: Three (col 3, row 3) */}
      <div className="ds-junction-grid-cell cell-three">{three}</div>

      {/* Junction handle — área invisível draggable centrada no "+".
          Sem visual: apenas cursor "move" + leve highlight no hover.
          Tamanho 20×20, posicionado em (h%, v%) com offset pra
          centralizar (10px = metade do tamanho). */}
      <div
        role="separator"
        aria-label={t("ds.resizable.junction")}
        tabIndex={0}
        className="ds-junction-grid-cross"
        style={{
          left: `calc(${h}% - 10px + ${HANDLE_TRACK / 2}px)`,
          top: `calc(${v}% - 10px + ${HANDLE_TRACK / 2}px)`,
        }}
        onPointerDown={(e) => onDown(e, "junction")}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onKeyDown={(e) => onKey(e, "junction")}
      />
    </div>
  );
}

export { ResizablePanel };
