import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
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
   ResizableJunction — layout em L-shape (3 painéis) com handle
   de JUNÇÃO no centro que redimensiona os 3 ao mesmo tempo.
   ----------------------------------------------------------------
   Diferente do ResizablePanels normal (aninhado), aqui o usuário
   pode agarrar o ponto onde os 3 painéis se encontram e arrastar
   em DUAS dimensões simultâneas — um movimento diagonal redimensiona
   tanto o split horizontal (One vs direita) quanto o vertical
   (Two vs Three) numa única ação.

   Uso:
     <ResizableJunction defaultHorizontal={50} defaultVertical={50}>
       <ResizablePanel>One</ResizablePanel>      // coluna esquerda
       <ResizablePanel>Two</ResizablePanel>      // direita topo
       <ResizablePanel>Three</ResizablePanel>    // direita base
     </ResizableJunction>

   Handles disponíveis:
     1. Handle vertical (entre One e a coluna direita) — só horizontal
     2. Handle horizontal (entre Two e Three, só na col direita) — só vertical
     3. Junction handle (no centro do "+") — DIAGONAL, move ambos

   Persistência opcional via storageKey.
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

  // State inicial: storage > defaults
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

  /* --- pointer handlers --- */
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

  // Re-render quando container cresce/encolhe pra recalcular rect no próximo drag
  useEffect(() => {
    /* sem-op: só pra reagir a resize do window */
  }, []);

  const cls = ["ds-junction"];
  if (className) cls.push(className);

  /* O container é position:relative pro JUNCTION handle (absoluto)
     ficar posicionado em coordenadas baseadas no container inteiro.
     Os 3 painéis + 2 handles internos usam flex (column dentro de row). */
  return (
    <div
      ref={containerRef}
      className={cls.join(" ")}
      role="group"
      aria-label={ariaLabel ?? t("ds.resizable.label")}
    >
      {/* Coluna esquerda — One */}
      <div className="ds-junction-left" style={{ width: `${h}%` }}>
        {one}
      </div>

      {/* Handle vertical (entre One e a coluna direita) */}
      <div
        role="separator"
        aria-orientation="vertical"
        aria-valuemin={minSize}
        aria-valuemax={100 - minSize}
        aria-valuenow={h}
        aria-label={t("ds.resizable.handle")}
        tabIndex={0}
        className="ds-resizable-handle"
        onPointerDown={(e) => onDown(e, "h")}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onKeyDown={(e) => onKey(e, "h")}
      >
        <span className="ds-resizable-handle-grip" aria-hidden="true" />
      </div>

      {/* Coluna direita — Two (topo) + Three (base), em column-flex */}
      <div className="ds-junction-right">
        <div className="ds-junction-top" style={{ height: `${v}%` }}>
          {two}
        </div>

        {/* Handle horizontal interno (entre Two e Three) */}
        <div
          role="separator"
          aria-orientation="horizontal"
          aria-valuemin={minSize}
          aria-valuemax={100 - minSize}
          aria-valuenow={v}
          aria-label={t("ds.resizable.handle")}
          tabIndex={0}
          className="ds-resizable-handle ds-junction-row-handle"
          onPointerDown={(e) => onDown(e, "v")}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onKeyDown={(e) => onKey(e, "v")}
        >
          <span className="ds-resizable-handle-grip" aria-hidden="true" />
        </div>

        <div className="ds-junction-bottom">{three}</div>
      </div>

      {/* JUNCTION HANDLE — no centro do "+" das 3 áreas. Drag em
          ambos eixos move horizontal E vertical simultaneamente.
          Position fixed-relative ao container (.ds-junction). */}
      <div
        role="separator"
        aria-label={t("ds.resizable.junction")}
        tabIndex={0}
        className="ds-junction-handle"
        style={{
          left: `calc(${h}% - 8px)`,
          top: `calc(${v}% - 8px)`,
        }}
        onPointerDown={(e) => onDown(e, "junction")}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onKeyDown={(e) => onKey(e, "junction")}
      >
        <span className="ds-junction-grip" aria-hidden="true" />
      </div>
    </div>
  );
}

/* Re-export pra conveniência (consumidor importa tudo daqui). */
export { ResizablePanel };
