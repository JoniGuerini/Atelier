import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  computePosition,
  type PopoverPlacement,
  type PopoverPosition,
} from "./Popover.tsx";

/* ================================================================
   HoverCard — painel ancorado ao hover (Fase 15.1)
   ----------------------------------------------------------------
   Geometria compartilhada com Popover (`computePosition`).

     <HoverCard openDelay={200} closeDelay={120}>
       <HoverCardTrigger><Button variant="ghost">Hover</Button></HoverCardTrigger>
       <HoverCardContent placement="bottom-start" minWidth={240}>
         …
       </HoverCardContent>
     </HoverCard>
   ================================================================ */

interface HoverCardContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
  contentId: string;
  openDelay: number;
  closeDelay: number;
}

const HoverCardContext = createContext<HoverCardContextValue | null>(null);

function useHoverCard(name: string): HoverCardContextValue {
  const ctx = useContext(HoverCardContext);
  if (!ctx) throw new Error(`[Atelier] <${name}> must be inside <HoverCard>.`);
  return ctx;
}

export interface HoverCardProps {
  openDelay?: number;
  closeDelay?: number;
  children?: ReactNode;
}

export function HoverCard({ openDelay = 200, closeDelay = 120, children }: HoverCardProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentId = useId();

  const ctx = useMemo<HoverCardContextValue>(
    () => ({
      open,
      setOpen,
      triggerRef,
      contentId,
      openDelay,
      closeDelay,
    }),
    [open, contentId, openDelay, closeDelay]
  );

  return (
    <HoverCardContext.Provider value={ctx}>
      <span className="ds-hover-card-root">{children}</span>
    </HoverCardContext.Provider>
  );
}

export interface HoverCardTriggerProps {
  children: ReactNode;
}

export function HoverCardTrigger({ children }: HoverCardTriggerProps) {
  const { setOpen, triggerRef, contentId, open, openDelay, closeDelay } =
    useHoverCard("HoverCardTrigger");
  const openT = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeT = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (openT.current) window.clearTimeout(openT.current);
    if (closeT.current) window.clearTimeout(closeT.current);
    openT.current = null;
    closeT.current = null;
  }, []);

  const scheduleOpen = useCallback(() => {
    clearTimers();
    openT.current = window.setTimeout(() => setOpen(true), openDelay);
  }, [clearTimers, openDelay, setOpen]);

  const scheduleClose = useCallback(() => {
    clearTimers();
    closeT.current = window.setTimeout(() => setOpen(false), closeDelay);
  }, [clearTimers, closeDelay, setOpen]);

  return (
    <span
      ref={(node) => {
        triggerRef.current = (node?.firstElementChild as HTMLElement) ?? node;
      }}
      style={{ display: "contents" }}
      onPointerEnter={() => {
        clearTimers();
        scheduleOpen();
      }}
      onPointerLeave={() => scheduleClose()}
      aria-describedby={open ? contentId : undefined}
    >
      {children}
    </span>
  );
}

export interface HoverCardContentProps {
  children?: ReactNode;
  placement?: PopoverPlacement;
  offset?: number;
  minWidth?: number;
  className?: string;
}

export function HoverCardContent({
  children,
  placement = "bottom-start",
  offset = 8,
  minWidth = 220,
  className = "",
}: HoverCardContentProps) {
  const { open, setOpen, triggerRef, contentId, closeDelay } = useHoverCard("HoverCardContent");
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<PopoverPosition | null>(null);
  const closeT = useRef<ReturnType<typeof setTimeout> | null>(null);

  useLayoutEffect(() => {
    if (!open) return;
    const run = () => {
      const t = triggerRef.current;
      const c = contentRef.current;
      if (!t || !c) return;
      setPos(
        computePosition(t.getBoundingClientRect(), c.getBoundingClientRect(), placement, offset)
      );
    };
    run();
    window.addEventListener("scroll", run, true);
    window.addEventListener("resize", run);
    return () => {
      window.removeEventListener("scroll", run, true);
      window.removeEventListener("resize", run);
    };
  }, [open, placement, offset, triggerRef]);

  useEffect(() => {
    if (!open) return;
    const el = contentRef.current;
    if (!el) return;
    const onEnter = () => {
      if (closeT.current) window.clearTimeout(closeT.current);
    };
    const onLeave = () => {
      closeT.current = window.setTimeout(() => setOpen(false), closeDelay);
    };
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      if (closeT.current) window.clearTimeout(closeT.current);
    };
  }, [open, closeDelay, setOpen]);

  if (!open) return null;

  const style: CSSProperties = pos
    ? {
        top: pos.top,
        left: pos.left,
        minWidth,
        position: "fixed",
        zIndex: "var(--z-popover)",
      }
    : { visibility: "hidden", position: "fixed", minWidth };

  return (
    <div
      ref={contentRef}
      id={contentId}
      role="region"
      className={`ds-hover-card ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}
