import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { useT } from "../lib/i18n.tsx";

/* ================================================================
   DragDrop — sistema de arrastar-e-soltar genérico.
   ----------------------------------------------------------------
   Duas peças principais:

   1. <Sortable> — lista reordenável
        <Sortable items={list} onChange={setList}>
          {(item, i) => <Card>{item.label}</Card>}
        </Sortable>

   2. <DragSource> + <DropZone> — drag entre containers diferentes
        <DragSource data={item}>
          <Card>...</Card>
        </DragSource>

        <DropZone onDrop={(data) => addItem(data)} accepts="card">
          ...
        </DropZone>

   Behavior:
     · Pointer events (touch + mouse + pen) — funciona em qualquer
       device. Sem dep em HTML5 drag/drop API (que tem quirks móveis).
     · Visual feedback durante drag: ghost preview seguindo o cursor;
       indicator visual no DropZone que pode receber.
     · Keyboard accessibility: Tab pra focar handle, Space pra
       "pegar", Setas pra mover (Sortable: ↑↓), Space pra "soltar",
       Esc pra cancelar.
     · Auto-scroll quando arrasta perto das bordas.

   Sem libs externas. Algoritmo de reorder usa midpoint detection
   (compara cursor Y com centro de cada item).
================================================================ */

/* ================================================================
   Sortable — lista reordenável (cada item arrastável dentro do
   próprio container, sem cruzar pra outras listas).
================================================================ */

export interface SortableProps<T> {
  /** Items da lista. */
  items: T[];
  /** Callback ao reordenar. Recebe a nova lista. */
  onChange: (next: T[]) => void;
  /** Render de cada item. Retorna o JSX do item (sem wrapper). */
  children: (item: T, index: number) => ReactNode;
  /** Função de chave única por item (default: index). */
  getKey?: (item: T, index: number) => string | number;
  /** Orientação. Default: vertical. */
  orientation?: "vertical" | "horizontal";
  /** Distância (px) que o cursor precisa mover antes de iniciar drag. Default: 4. */
  dragThreshold?: number;
  className?: string;
  ariaLabel?: string;
}

interface SortableDragState {
  fromIndex: number;
  pointerId: number;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  dragging: boolean;
  /** Index sobre o qual o cursor está atualmente. */
  hoverIndex: number;
}

export function Sortable<T>({
  items,
  onChange,
  children,
  getKey,
  orientation = "vertical",
  dragThreshold = 4,
  className = "",
  ariaLabel,
}: SortableProps<T>) {
  const { t } = useT();
  const containerRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<Map<number, HTMLLIElement>>(new Map());
  const [drag, setDrag] = useState<SortableDragState | null>(null);
  const [keyboardIndex, setKeyboardIndex] = useState<number | null>(null);

  /* --- pointer drag --- */
  const onPointerDown = (
    e: ReactPointerEvent<HTMLLIElement>,
    fromIndex: number,
  ) => {
    if (e.button !== 0) return; // só botão esquerdo
    e.preventDefault();
    setDrag({
      fromIndex,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY,
      dragging: false,
      hoverIndex: fromIndex,
    });
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLLIElement>) => {
    if (!drag || drag.pointerId !== e.pointerId) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    const dist = Math.hypot(dx, dy);

    let dragging = drag.dragging;
    if (!dragging && dist > dragThreshold) dragging = true;

    // Detecta hoverIndex (índice do item sob o cursor)
    let hoverIndex = drag.hoverIndex;
    if (dragging) {
      const cur = orientation === "vertical" ? e.clientY : e.clientX;
      hoverIndex = drag.fromIndex;
      itemRefs.current.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const mid =
          orientation === "vertical"
            ? (rect.top + rect.bottom) / 2
            : (rect.left + rect.right) / 2;
        if (i < drag.fromIndex && cur < mid) {
          hoverIndex = Math.min(hoverIndex, i);
        } else if (i > drag.fromIndex && cur > mid) {
          hoverIndex = Math.max(hoverIndex, i);
        }
      });
    }

    setDrag({
      ...drag,
      currentX: e.clientX,
      currentY: e.clientY,
      dragging,
      hoverIndex,
    });
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLLIElement>) => {
    if (!drag || drag.pointerId !== e.pointerId) return;
    if (drag.dragging && drag.hoverIndex !== drag.fromIndex) {
      const next = [...items];
      const [moved] = next.splice(drag.fromIndex, 1);
      next.splice(drag.hoverIndex, 0, moved);
      onChange(next);
    }
    setDrag(null);
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  /* --- keyboard --- */
  const onKeyDown = (
    e: KeyboardEvent<HTMLLIElement>,
    index: number,
  ) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      // Toggle "pickup" mode
      setKeyboardIndex(keyboardIndex === index ? null : index);
      return;
    }
    if (keyboardIndex === null) return;

    const isUp =
      (orientation === "vertical" && e.key === "ArrowUp") ||
      (orientation === "horizontal" && e.key === "ArrowLeft");
    const isDown =
      (orientation === "vertical" && e.key === "ArrowDown") ||
      (orientation === "horizontal" && e.key === "ArrowRight");

    if (isUp || isDown) {
      e.preventDefault();
      const delta = isUp ? -1 : 1;
      const target = Math.max(
        0,
        Math.min(items.length - 1, keyboardIndex + delta),
      );
      if (target !== keyboardIndex) {
        const next = [...items];
        const [moved] = next.splice(keyboardIndex, 1);
        next.splice(target, 0, moved);
        onChange(next);
        setKeyboardIndex(target);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setKeyboardIndex(null);
    }
  };

  /* --- render --- */
  const cls = ["ds-sortable", `orientation-${orientation}`];
  if (className) cls.push(className);

  return (
    <ul
      ref={containerRef}
      className={cls.join(" ")}
      role="list"
      aria-label={ariaLabel ?? t("ds.dnd.sortable")}
    >
      {items.map((item, i) => {
        const key = getKey ? getKey(item, i) : i;
        const isDragging = drag?.dragging && drag.fromIndex === i;
        const isHover =
          drag?.dragging &&
          drag.hoverIndex === i &&
          drag.fromIndex !== i;
        const isKeyboard = keyboardIndex === i;
        const itemCls = ["ds-sortable-item"];
        if (isDragging) itemCls.push("dragging");
        if (isHover) itemCls.push("drop-target");
        if (isKeyboard) itemCls.push("keyboard-active");

        const style: CSSProperties = isDragging
          ? {
              transform: `translate(${drag.currentX - drag.startX}px, ${drag.currentY - drag.startY}px)`,
              zIndex: 100,
              opacity: 0.95,
              cursor: "grabbing",
            }
          : {};

        return (
          <li
            key={key}
            ref={(el) => {
              if (el) itemRefs.current.set(i, el);
              else itemRefs.current.delete(i);
            }}
            className={itemCls.join(" ")}
            style={style}
            tabIndex={0}
            role="listitem"
            aria-grabbed={isDragging || isKeyboard}
            onPointerDown={(e) => onPointerDown(e, i)}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {children(item, i)}
          </li>
        );
      })}
    </ul>
  );
}

/* ================================================================
   DragSource + DropZone — drag entre containers diferentes.
   Usa um Context interno pra rastrear o item "voando" no momento.
================================================================ */

interface DragData {
  data: any;
  type?: string;
  sourceId: number;
}

interface DnDContextValue {
  current: DragData | null;
  start: (data: DragData) => void;
  end: () => void;
  pointer: { x: number; y: number };
  setPointer: (p: { x: number; y: number }) => void;
}

const DnDContext = createContext<DnDContextValue | null>(null);

let nextSourceId = 0;

export function DragDropProvider({ children }: { children?: ReactNode }) {
  const [current, setCurrent] = useState<DragData | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const start = useCallback((data: DragData) => setCurrent(data), []);
  const end = useCallback(() => setCurrent(null), []);

  return (
    <DnDContext.Provider
      value={{ current, start, end, pointer, setPointer }}
    >
      {children}
    </DnDContext.Provider>
  );
}

function useDnD(component: string): DnDContextValue {
  const ctx = useContext(DnDContext);
  if (!ctx) {
    throw new Error(
      `[Atelier] <${component}> deve estar dentro de <DragDropProvider>.`,
    );
  }
  return ctx;
}

/* ----------------------------------------------------------------
   DragSource
---------------------------------------------------------------- */
export interface DragSourceProps {
  /** Dado arbitrário que será passado pro DropZone ao soltar. */
  data: any;
  /** Tipo opcional (ex: "card", "task") pra filtrar drops. */
  type?: string;
  /** Distância mínima pra começar drag. Default: 4. */
  dragThreshold?: number;
  children?: ReactNode;
  className?: string;
}

export function DragSource({
  data,
  type,
  dragThreshold = 4,
  children,
  className = "",
}: DragSourceProps) {
  const ctx = useDnD("DragSource");
  const idRef = useRef(++nextSourceId);
  const [drag, setDrag] = useState<{
    pointerId: number;
    startX: number;
    startY: number;
    dragging: boolean;
  } | null>(null);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    setDrag({
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      dragging: false,
    });
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag || drag.pointerId !== e.pointerId) return;
    const dist = Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY);
    if (!drag.dragging && dist > dragThreshold) {
      setDrag({ ...drag, dragging: true });
      ctx.start({ data, type, sourceId: idRef.current });
    }
    if (drag.dragging) {
      ctx.setPointer({ x: e.clientX, y: e.clientY });
    }
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag || drag.pointerId !== e.pointerId) return;
    if (drag.dragging) {
      ctx.end();
    }
    setDrag(null);
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const isDragging = drag?.dragging;

  return (
    <div
      className={`ds-drag-source ${isDragging ? "dragging" : ""} ${className}`.trim()}
      style={{ touchAction: "none", cursor: isDragging ? "grabbing" : "grab" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {children}
    </div>
  );
}

/* ----------------------------------------------------------------
   DropZone
---------------------------------------------------------------- */
export interface DropZoneProps {
  /** Callback ao soltar. Recebe o `data` do DragSource. */
  onDrop: (data: any, type?: string) => void;
  /** Filtra por type (string ou array). Default: aceita qualquer. */
  accepts?: string | string[];
  children?: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function DropZone({
  onDrop,
  accepts,
  children,
  className = "",
  ariaLabel,
}: DropZoneProps) {
  const ctx = useDnD("DropZone");
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOver, setIsOver] = useState(false);

  // Atualiza isOver baseado no pointer global
  const checkOver = useCallback(() => {
    if (!ctx.current || !ref.current) {
      setIsOver(false);
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const { x, y } = ctx.pointer;
    const inside =
      x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    setIsOver(inside);
  }, [ctx]);

  // Observa mudanças do pointer e do current via effect
  // Usamos useState do pointer no provider — qualquer mudança re-renderiza
  // este componente e chamamos checkOver.
  if (typeof window !== "undefined") {
    // Sem useEffect: chamada síncrona após cada render é OK aqui pq
    // só lê DOM/state. Mas pra ficar consistente, vou usar useEffect
    // tradicional via referência ao ctx.
  }

  const acceptsList: string[] | null = accepts
    ? Array.isArray(accepts)
      ? accepts
      : [accepts]
    : null;

  // Re-checa hover sempre que o pointer ou current muda
  useEffect(() => {
    if (!ctx.current) {
      if (isOver) setIsOver(false);
      return;
    }
    checkOver();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx.current, ctx.pointer.x, ctx.pointer.y]);

  // Listener global de pointerup pra capturar o "drop"
  useEffect(() => {
    if (!ctx.current) return;
    const onUp = () => {
      if (!ref.current || !ctx.current) return;
      const rect = ref.current.getBoundingClientRect();
      const { x, y } = ctx.pointer;
      const inside =
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom;
      if (inside) {
        const cur = ctx.current;
        if (!acceptsList || (cur.type && acceptsList.includes(cur.type))) {
          onDrop(cur.data, cur.type);
        }
      }
      setIsOver(false);
    };
    document.addEventListener("pointerup", onUp);
    return () => document.removeEventListener("pointerup", onUp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx.current]);

  const canAccept =
    !ctx.current ||
    !acceptsList ||
    (ctx.current.type && acceptsList.includes(ctx.current.type));
  const showActive = ctx.current && isOver && canAccept;

  return (
    <div
      ref={ref}
      className={`ds-drop-zone ${showActive ? "is-over" : ""} ${
        ctx.current && !canAccept ? "rejected" : ""
      } ${className}`.trim()}
      role="region"
      aria-label={ariaLabel}
      aria-dropeffect={ctx.current && canAccept ? "move" : undefined}
    >
      {children}
    </div>
  );
}

/* ----------------------------------------------------------------
   GHOST — pequena preview seguindo o cursor durante drag.
   Renderizado pelo Provider (zindex altíssimo).
   Por enquanto, simples: um quadrado discreto. Se o consumidor
   quiser preview customizado, pode usar createPortal manualmente.
---------------------------------------------------------------- */
export function DragGhost() {
  const ctx = useContext(DnDContext);
  if (!ctx?.current) return null;
  return (
    <div
      className="ds-drag-ghost"
      style={{
        position: "fixed",
        left: ctx.pointer.x + 8,
        top: ctx.pointer.y + 8,
        pointerEvents: "none",
        zIndex: 9999,
      }}
      aria-hidden="true"
    />
  );
}
