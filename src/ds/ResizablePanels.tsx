import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { useT } from "../lib/i18n.tsx";

/* ================================================================
   ResizablePanels — 2+ painéis com handles arrastáveis entre eles.
   ----------------------------------------------------------------
   API:
     <ResizablePanels orientation="horizontal" defaultSizes={[60, 40]}>
       <ResizablePanel>Esquerda</ResizablePanel>
       <ResizablePanel>Direita</ResizablePanel>
     </ResizablePanels>

   Props:
     · orientation: "horizontal" (default — handle vertical) | "vertical"
     · defaultSizes: array de % (soma 100). Default: dividir igual.
     · sizes (controlado): array de % atual.
     · onSizesChange: callback ao redimensionar.
     · minSize: % mínimo por painel. Default: 10.
     · storageKey: persiste em localStorage (opcional).

   Behavior:
     · Drag do handle ajusta os % do painel anterior + posterior
     · Keyboard: Tab no handle, ←→ (horizontal) ou ↑↓ (vertical)
       ajusta por 5%, Shift+seta por 10%, Home/End extremos
     · Min size respeitado (não deixa colapsar abaixo)
     · Persistência opcional em localStorage
================================================================ */

export type ResizableOrientation = "horizontal" | "vertical";

export interface ResizablePanelProps {
  children?: ReactNode;
  className?: string;
  /** ID único — usado pra storage. Se não passar, gera um. */
  id?: string;
  /** Style — usado internamente pelo ResizablePanels via cloneElement
      para aplicar o width/height. Consumidor pode passar style extra
      (será mesclado). */
  style?: CSSProperties;
}

export function ResizablePanel({
  children,
  className = "",
  style,
}: ResizablePanelProps) {
  const cls = ["ds-resizable-panel"];
  if (className) cls.push(className);
  return (
    <div className={cls.join(" ")} style={style}>
      {children}
    </div>
  );
}

export interface ResizablePanelsProps {
  children?: ReactNode;
  orientation?: ResizableOrientation;
  defaultSizes?: number[];
  sizes?: number[];
  onSizesChange?: (sizes: number[]) => void;
  minSize?: number;
  /** Persiste em localStorage. Mesma key = mesmo state. */
  storageKey?: string;
  className?: string;
  ariaLabel?: string;
}

export function ResizablePanels({
  children,
  orientation = "horizontal",
  defaultSizes,
  sizes: sizesProp,
  onSizesChange,
  minSize = 10,
  storageKey,
  className = "",
  ariaLabel,
}: ResizablePanelsProps) {
  const { t } = useT();
  const panels = Children.toArray(children).filter(isValidElement);
  const total = panels.length;
  const baseId = useId();

  // State inicial: storage > defaultSizes > divisão igual
  const computeInitial = (): number[] => {
    if (storageKey && typeof window !== "undefined") {
      try {
        const raw = window.localStorage.getItem(storageKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length === total) {
            return parsed;
          }
        }
      } catch {
        /* ignore */
      }
    }
    if (defaultSizes && defaultSizes.length === total) return defaultSizes;
    const each = 100 / total;
    return Array.from({ length: total }, () => each);
  };

  const [sizesInternal, setSizesInternal] = useState<number[]>(computeInitial);
  const isControlled = sizesProp !== undefined;
  const sizes = isControlled ? sizesProp! : sizesInternal;

  const setSizes = useCallback(
    (next: number[]) => {
      if (!isControlled) setSizesInternal(next);
      onSizesChange?.(next);
      if (storageKey && typeof window !== "undefined") {
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(next));
        } catch {
          /* ignore */
        }
      }
    },
    [isControlled, onSizesChange, storageKey],
  );

  /* ---- Drag de handle ---- */
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{
    handleIdx: number;
    startCoord: number;
    startSizeA: number;
    startSizeB: number;
    containerSize: number;
    pointerId: number;
  } | null>(null);

  const onHandleDown = (e: ReactPointerEvent<HTMLDivElement>, handleIdx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerSize =
      orientation === "horizontal" ? rect.width : rect.height;
    dragRef.current = {
      handleIdx,
      startCoord: orientation === "horizontal" ? e.clientX : e.clientY,
      startSizeA: sizes[handleIdx],
      startSizeB: sizes[handleIdx + 1],
      containerSize,
      pointerId: e.pointerId,
    };
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onHandleMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    const coord = orientation === "horizontal" ? e.clientX : e.clientY;
    const deltaPx = coord - drag.startCoord;
    const deltaPct = (deltaPx / drag.containerSize) * 100;
    const newA = Math.max(minSize, drag.startSizeA + deltaPct);
    const newB = Math.max(minSize, drag.startSizeB - deltaPct);
    // Se algum bate no min, congela ambos
    if (newA <= minSize || newB <= minSize) return;
    const next = [...sizes];
    next[drag.handleIdx] = newA;
    next[drag.handleIdx + 1] = newB;
    setSizes(next);
  };

  const onHandleUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag && drag.pointerId === e.pointerId) {
      dragRef.current = null;
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    }
  };

  /* ---- Keyboard ---- */
  const onHandleKey = (e: KeyboardEvent<HTMLDivElement>, handleIdx: number) => {
    let delta = 0;
    const big = e.shiftKey ? 10 : 5;
    if (orientation === "horizontal") {
      if (e.key === "ArrowLeft") delta = -big;
      else if (e.key === "ArrowRight") delta = big;
    } else {
      if (e.key === "ArrowUp") delta = -big;
      else if (e.key === "ArrowDown") delta = big;
    }
    if (e.key === "Home") {
      e.preventDefault();
      const next = [...sizes];
      const merged = next[handleIdx] + next[handleIdx + 1];
      next[handleIdx] = minSize;
      next[handleIdx + 1] = merged - minSize;
      setSizes(next);
      return;
    }
    if (e.key === "End") {
      e.preventDefault();
      const next = [...sizes];
      const merged = next[handleIdx] + next[handleIdx + 1];
      next[handleIdx] = merged - minSize;
      next[handleIdx + 1] = minSize;
      setSizes(next);
      return;
    }
    if (delta !== 0) {
      e.preventDefault();
      const next = [...sizes];
      const newA = Math.max(minSize, next[handleIdx] + delta);
      const newB = Math.max(minSize, next[handleIdx + 1] - delta);
      if (newA > minSize && newB > minSize) {
        next[handleIdx] = newA;
        next[handleIdx + 1] = newB;
        setSizes(next);
      }
    }
  };

  /* ---- Render ---- */
  const cls = ["ds-resizable", `orientation-${orientation}`];
  if (className) cls.push(className);

  // Garante array correto se panels mudou de tamanho
  useEffect(() => {
    if (sizes.length !== total) {
      const each = 100 / total;
      setSizes(Array.from({ length: total }, () => each));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  return (
    <div
      ref={containerRef}
      className={cls.join(" ")}
      role="group"
      aria-label={ariaLabel ?? t("ds.resizable.label")}
    >
      {panels.map((panel, i) => {
        const sizeStyle: CSSProperties =
          orientation === "horizontal"
            ? { width: `${sizes[i] ?? 100 / total}%` }
            : { height: `${sizes[i] ?? 100 / total}%` };
        return (
          <Fragment key={i}>
            {/* Aplica o size ao panel via cloneElement (mesclando
                qualquer style já passado pelo consumidor). */}
            {cloneElement(panel as ReactElement, {
              style: {
                ...(((panel as ReactElement).props as any)?.style || {}),
                ...sizeStyle,
              },
            } as any)}
            {/* Handle entre cada par de panels (não depois do último). */}
            {i < total - 1 && (
              <div
                role="separator"
                aria-orientation={orientation}
                aria-valuemin={minSize}
                aria-valuemax={100 - minSize}
                aria-valuenow={sizes[i]}
                aria-label={`${t("ds.resizable.handle")} ${i + 1}`}
                tabIndex={0}
                className="ds-resizable-handle"
                id={`${baseId}-handle-${i}`}
                onPointerDown={(e) => onHandleDown(e, i)}
                onPointerMove={onHandleMove}
                onPointerUp={onHandleUp}
                onPointerCancel={onHandleUp}
                onKeyDown={(e) => onHandleKey(e, i)}
              >
                <span className="ds-resizable-handle-grip" aria-hidden="true" />
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
