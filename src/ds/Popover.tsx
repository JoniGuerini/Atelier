import {
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

/* ================================================================
   Popover — primitive de overlay genérico, controlado.
   ----------------------------------------------------------------
   Base reutilizável: o DropdownMenu, ContextMenu (e futuro
   Combobox / DatePicker / Tooltip avançado) compõem em cima dele.

   Filosofia editorial:
     · Sem libs externas (zero @floating-ui, @popperjs, etc.).
       Posicionamento próprio em ~40 linhas.
     · Right angles — nada de border-radius. Aceita arrow opcional
       como pequeno triângulo (também angular).
     · Motion sóbria: opacity + translate de 4px. Respeita
       prefers-reduced-motion.

   API composable:
     <Popover>
       <PopoverTrigger>
         <Button>Open</Button>
       </PopoverTrigger>
       <PopoverContent placement="bottom-start">
         …
       </PopoverContent>
     </Popover>

   Modo controlado:
     <Popover open={open} onOpenChange={setOpen}>…</Popover>

   Posicionamento:
     placement (12 opções) — `${side}-${align}`
       side  : top | right | bottom | left
       align : start | center | end
     Default: bottom-start

   Behavior:
     · click outside fecha (configurável)
     · Escape fecha (configurável)
     · auto-flip: se vai cortar no viewport, inverte side
     · focus volta pro trigger ao fechar
     · respeita aria-* (haspopup, expanded, controls)
================================================================ */

export type PopoverSide = "top" | "right" | "bottom" | "left";
export type PopoverAlign = "start" | "center" | "end";
export type PopoverPlacement = `${PopoverSide}-${PopoverAlign}`;

interface PopoverContextValue {
  open: boolean;
  setOpen: (next: boolean) => void;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
  contentId: string;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverCtx(component: string): PopoverContextValue {
  const ctx = useContext(PopoverContext);
  if (!ctx) {
    throw new Error(
      `[Atelier] <${component}> deve estar dentro de <Popover>.`,
    );
  }
  return ctx;
}

/* ----------------------------------------------------------------
   Popover (root) — gerencia estado open/close.
   Pode ser controlado (open + onOpenChange) ou descontrolado
   (estado interno).
---------------------------------------------------------------- */
export interface PopoverProps {
  /** Modo controlado. Se omitido, o estado é interno. */
  open?: boolean;
  /** Callback ao abrir/fechar — também usado pra controlar. */
  onOpenChange?: (open: boolean) => void;
  /** Estado inicial em modo descontrolado. Default: false. */
  defaultOpen?: boolean;
  children?: ReactNode;
}

export function Popover({
  open: openProp,
  onOpenChange,
  defaultOpen = false,
  children,
}: PopoverProps) {
  const [openInternal, setOpenInternal] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? !!openProp : openInternal;
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentId = useId();

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setOpenInternal(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  return (
    <PopoverContext.Provider
      value={{ open, setOpen, triggerRef, contentId }}
    >
      {children}
    </PopoverContext.Provider>
  );
}

/* ----------------------------------------------------------------
   PopoverTrigger — clona o filho e injeta os handlers.
   Aceita qualquer elemento focável (Button, a, etc.).
---------------------------------------------------------------- */
export interface PopoverTriggerProps {
  children: ReactElement;
  /** Se true, o trigger não dispara abertura (útil em controlado). */
  asChild?: boolean;
}

export function PopoverTrigger({ children }: PopoverTriggerProps) {
  const { open, setOpen, triggerRef, contentId } = usePopoverCtx(
    "PopoverTrigger",
  );

  if (!isValidElement(children)) {
    return <>{children}</>;
  }

  const childProps = (children.props || {}) as any;

  return cloneElement(children, {
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;
      // Forward ref se o filho tinha
      const orig = (children as any).ref;
      if (typeof orig === "function") orig(node);
      else if (orig && typeof orig === "object") orig.current = node;
    },
    onClick: (e: React.MouseEvent) => {
      childProps.onClick?.(e);
      if (!e.defaultPrevented) setOpen(!open);
    },
    "aria-haspopup": childProps["aria-haspopup"] ?? "dialog",
    "aria-expanded": open,
    "aria-controls": open ? contentId : undefined,
  } as any);
}

/* ----------------------------------------------------------------
   PopoverContent — o painel posicionado.
   Posicionamento manual: lê getBoundingClientRect do trigger,
   calcula coordenadas baseadas no placement, faz flip se vai
   cortar no viewport.
---------------------------------------------------------------- */
export interface PopoverContentProps {
  children?: ReactNode;
  /** Default: "bottom-start". */
  placement?: PopoverPlacement;
  /** Distância (px) entre trigger e content. Default: 6. */
  offset?: number;
  /** Mostra triangulinho apontando pro trigger. Default: false. */
  arrow?: boolean;
  /** Fecha ao clicar fora. Default: true. */
  closeOnClickOutside?: boolean;
  /** Fecha ao apertar Escape. Default: true. */
  closeOnEscape?: boolean;
  /** Largura mínima (px). Default: 200. */
  minWidth?: number;
  /** Classe CSS extra. */
  className?: string;
  /** role do painel. Default: "dialog". */
  role?: string;
  /** aria-label. */
  ariaLabel?: string;
}

interface Position {
  top: number;
  left: number;
  side: PopoverSide;
  arrowOffset: number;
}

function computePosition(
  trigger: DOMRect,
  content: DOMRect,
  placement: PopoverPlacement,
  offset: number,
): Position {
  const [sideRaw, alignRaw] = placement.split("-") as [PopoverSide, PopoverAlign];
  let side = sideRaw;

  // Auto-flip simples: se cabe no lado oposto melhor, troca
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const fits = {
    top: trigger.top - content.height - offset >= 0,
    bottom: trigger.bottom + content.height + offset <= vh,
    left: trigger.left - content.width - offset >= 0,
    right: trigger.right + content.width + offset <= vw,
  };
  if (side === "top" && !fits.top && fits.bottom) side = "bottom";
  else if (side === "bottom" && !fits.bottom && fits.top) side = "top";
  else if (side === "left" && !fits.left && fits.right) side = "right";
  else if (side === "right" && !fits.right && fits.left) side = "left";

  let top = 0;
  let left = 0;
  if (side === "top") {
    top = trigger.top - content.height - offset;
  } else if (side === "bottom") {
    top = trigger.bottom + offset;
  } else if (side === "left") {
    left = trigger.left - content.width - offset;
  } else {
    left = trigger.right + offset;
  }

  // Alinhamento na cross-axis
  if (side === "top" || side === "bottom") {
    if (alignRaw === "start") left = trigger.left;
    else if (alignRaw === "end") left = trigger.right - content.width;
    else left = trigger.left + (trigger.width - content.width) / 2;
  } else {
    if (alignRaw === "start") top = trigger.top;
    else if (alignRaw === "end") top = trigger.bottom - content.height;
    else top = trigger.top + (trigger.height - content.height) / 2;
  }

  // Clamp dentro do viewport com 8px de margem
  const margin = 8;
  left = Math.max(margin, Math.min(vw - content.width - margin, left));
  top = Math.max(margin, Math.min(vh - content.height - margin, top));

  // Calcula offset do arrow relativo ao content
  let arrowOffset = 0;
  if (side === "top" || side === "bottom") {
    const triggerCenterX = trigger.left + trigger.width / 2;
    arrowOffset = Math.max(8, Math.min(content.width - 8, triggerCenterX - left));
  } else {
    const triggerCenterY = trigger.top + trigger.height / 2;
    arrowOffset = Math.max(8, Math.min(content.height - 8, triggerCenterY - top));
  }

  return { top, left, side, arrowOffset };
}

export function PopoverContent({
  children,
  placement = "bottom-start",
  offset = 6,
  arrow = false,
  closeOnClickOutside = true,
  closeOnEscape = true,
  minWidth = 200,
  className = "",
  role = "dialog",
  ariaLabel,
}: PopoverContentProps) {
  const { open, setOpen, triggerRef, contentId } = usePopoverCtx(
    "PopoverContent",
  );
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<Position | null>(null);

  // Calcula posição quando abre + reposiciona em scroll/resize
  useLayoutEffect(() => {
    if (!open) return;
    const compute = () => {
      const t = triggerRef.current;
      const c = contentRef.current;
      if (!t || !c) return;
      const trigRect = t.getBoundingClientRect();
      const contRect = c.getBoundingClientRect();
      setPos(computePosition(trigRect, contRect, placement, offset));
    };
    compute();
    // Re-calcula em interações que podem deslocar
    window.addEventListener("scroll", compute, true);
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute, true);
      window.removeEventListener("resize", compute);
    };
  }, [open, placement, offset, triggerRef]);

  // Click outside
  useEffect(() => {
    if (!open || !closeOnClickOutside) return;
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        contentRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };
    // Pequeno delay pra não pegar o click que abriu
    const id = setTimeout(() => {
      document.addEventListener("mousedown", onDown);
    }, 0);
    return () => {
      clearTimeout(id);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open, closeOnClickOutside, setOpen, triggerRef]);

  // Escape
  useEffect(() => {
    if (!open || !closeOnEscape) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        // Devolve foco pro trigger
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeOnEscape, setOpen, triggerRef]);

  if (!open) return null;

  const style: React.CSSProperties = pos
    ? { top: pos.top, left: pos.left, minWidth, position: "fixed" }
    : { visibility: "hidden", position: "fixed", minWidth };

  const cls = ["ds-popover"];
  if (pos) cls.push(`side-${pos.side}`);
  if (className) cls.push(className);

  return (
    <div
      ref={contentRef}
      id={contentId}
      role={role}
      aria-label={ariaLabel}
      className={cls.join(" ")}
      style={style}
    >
      {arrow && pos && (
        <span
          className={`ds-popover-arrow side-${pos.side}`}
          style={
            pos.side === "top" || pos.side === "bottom"
              ? { left: pos.arrowOffset }
              : { top: pos.arrowOffset }
          }
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}

/* ----------------------------------------------------------------
   Hook utilitário pra controlar fora — útil em DropdownMenu
   custom etc.
---------------------------------------------------------------- */
export function usePopover() {
  const ctx = useContext(PopoverContext);
  return ctx;
}
