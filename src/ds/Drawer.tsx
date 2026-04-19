import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

/* ================================================================
   Drawer (Sheet) — modal lateral que desliza de um dos 4 lados.
   ----------------------------------------------------------------
   Diferente do Dialog (que centraliza no viewport), o Drawer ancora
   numa borda da tela e ocupa a dimensão perpendicular inteira.
   Útil para menus mobile, painéis de configuração e detalhes
   secundários sem interromper o fluxo principal.

   API composable (espelha Dialog/Popover):
     <Drawer side="right" open={open} onOpenChange={setOpen}>
       <DrawerContent>
         <DrawerHeader>
           <DrawerTitle>Configurações</DrawerTitle>
           <DrawerClose />
         </DrawerHeader>
         <DrawerBody>…</DrawerBody>
         <DrawerFooter>…</DrawerFooter>
       </DrawerContent>
     </Drawer>

   Uncontrolled também funciona:
     <Drawer defaultOpen={false}>
       <DrawerTrigger><Button>Open</Button></DrawerTrigger>
       <DrawerContent>…</DrawerContent>
     </Drawer>

   Behavior:
     · backdrop semi-opaco com fade-in
     · slide-in animado pelo lado escolhido (top/right/bottom/left)
     · click no backdrop fecha (configurável)
     · Escape fecha (configurável)
     · focus trap: Tab cicla apenas dentro do Drawer
     · scroll do body bloqueado enquanto aberto
     · respeita prefers-reduced-motion (sem slide)
================================================================ */

export type DrawerSide = "top" | "right" | "bottom" | "left";

interface DrawerContextValue {
  open: boolean;
  setOpen: (next: boolean) => void;
  side: DrawerSide;
  contentId: string;
  titleId: string;
  closeOnBackdrop: boolean;
  closeOnEscape: boolean;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

function useDrawerCtx(component: string): DrawerContextValue {
  const ctx = useContext(DrawerContext);
  if (!ctx) {
    throw new Error(
      `[Atelier] <${component}> deve estar dentro de <Drawer>.`,
    );
  }
  return ctx;
}

/* ----------------------------------------------------------------
   Root — gerencia state + side + IDs.
---------------------------------------------------------------- */
export interface DrawerProps {
  /** Modo controlado. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  /** De que lado o Drawer abre. Default: "right". */
  side?: DrawerSide;
  /** Fecha ao clicar no backdrop. Default: true. */
  closeOnBackdrop?: boolean;
  /** Fecha ao apertar Escape. Default: true. */
  closeOnEscape?: boolean;
  children?: ReactNode;
}

export function Drawer({
  open: openProp,
  onOpenChange,
  defaultOpen = false,
  side = "right",
  closeOnBackdrop = true,
  closeOnEscape = true,
  children,
}: DrawerProps) {
  const [openInternal, setOpenInternal] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? !!openProp : openInternal;
  const contentId = useId();
  const titleId = useId();

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setOpenInternal(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  return (
    <DrawerContext.Provider
      value={{
        open,
        setOpen,
        side,
        contentId,
        titleId,
        closeOnBackdrop,
        closeOnEscape,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

/* ----------------------------------------------------------------
   Trigger — wrapper transparente, mesmo padrão do Popover.
---------------------------------------------------------------- */
export interface DrawerTriggerProps {
  children: ReactNode;
}

export function DrawerTrigger({ children }: DrawerTriggerProps) {
  const { open, setOpen, contentId } = useDrawerCtx("DrawerTrigger");
  return (
    <span
      style={{ display: "contents" }}
      onClick={(e) => {
        if (!e.defaultPrevented) setOpen(!open);
      }}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={open ? contentId : undefined}
    >
      {children}
    </span>
  );
}

/* ----------------------------------------------------------------
   Content — backdrop + painel deslizante.
   Renderiza inline (sem portal por enquanto — o overflow:hidden de
   ancestrais não atrapalha porque o painel usa position:fixed).
---------------------------------------------------------------- */
export interface DrawerContentProps {
  children?: ReactNode;
  /** Largura (right/left) ou altura (top/bottom) em px. Default: 380. */
  size?: number;
  className?: string;
  ariaLabel?: string;
}

export function DrawerContent({
  children,
  size = 380,
  className = "",
  ariaLabel,
}: DrawerContentProps) {
  const ctx = useDrawerCtx("DrawerContent");
  const panelRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Bloqueia scroll do body enquanto aberto + restaura ao fechar.
  // Salva o foco anterior pra devolver depois.
  useEffect(() => {
    if (!ctx.open) return;
    previouslyFocusedRef.current = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Foca o painel após a animação começar
    const t = setTimeout(() => {
      panelRef.current?.focus();
    }, 30);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = overflow;
      previouslyFocusedRef.current?.focus?.();
    };
  }, [ctx.open]);

  // Escape
  useEffect(() => {
    if (!ctx.open || !ctx.closeOnEscape) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        ctx.setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [ctx]);

  // Focus trap simples — Tab cicla entre os focusables do painel
  useEffect(() => {
    if (!ctx.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [ctx.open]);

  if (!ctx.open) return null;

  const panelStyle: React.CSSProperties = {};
  if (ctx.side === "right" || ctx.side === "left") {
    panelStyle.width = size;
  } else {
    panelStyle.height = size;
  }

  return (
    <div
      className="ds-drawer-backdrop"
      onClick={(e) => {
        if (!ctx.closeOnBackdrop) return;
        if (e.target === e.currentTarget) ctx.setOpen(false);
      }}
    >
      <div
        ref={panelRef}
        id={ctx.contentId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ctx.titleId}
        aria-label={ariaLabel}
        tabIndex={-1}
        className={`ds-drawer side-${ctx.side} ${className}`.trim()}
        style={panelStyle}
      >
        {children}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   Subcomponents — Header, Title, Body, Footer, Close.
---------------------------------------------------------------- */
interface SlotProps {
  children?: ReactNode;
}

export function DrawerHeader({ children }: SlotProps) {
  return <div className="ds-drawer-head">{children}</div>;
}

export interface DrawerTitleProps {
  children?: ReactNode;
  as?: ElementType;
}
export function DrawerTitle({ children, as: Comp = "h2" }: DrawerTitleProps) {
  const { titleId } = useDrawerCtx("DrawerTitle");
  return (
    <Comp id={titleId} className="ds-drawer-title">
      {children}
    </Comp>
  );
}

export interface DrawerCloseProps {
  label?: string;
}
export function DrawerClose({ label = "Fechar" }: DrawerCloseProps) {
  const { setOpen } = useDrawerCtx("DrawerClose");
  return (
    <button
      type="button"
      className="ds-drawer-close"
      aria-label={label}
      onClick={() => setOpen(false)}
    >
      ×
    </button>
  );
}

export function DrawerBody({ children }: SlotProps) {
  return <div className="ds-drawer-body">{children}</div>;
}

export function DrawerFooter({ children }: SlotProps) {
  return <div className="ds-drawer-foot">{children}</div>;
}
