import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

/* ================================================================
   ContextMenu — menu de ações disparado pelo clique direito
   (ou tecla Menu / Shift+F10) sobre um trigger.
   ----------------------------------------------------------------
   Diferente do DropdownMenu, ele não ancora num botão visível —
   abre nas coordenadas do cursor, com clamp de viewport pra não
   vazar para fora da tela.

   API:
     <ContextMenu>
       <ContextMenuTrigger>
         <div>Right-click me</div>
       </ContextMenuTrigger>
       <ContextMenuContent>
         <ContextMenuItem onSelect={...}>Cut</ContextMenuItem>
         <ContextMenuItem shortcut="⌘C">Copy</ContextMenuItem>
         <ContextMenuSeparator />
         <ContextMenuItem destructive>Delete</ContextMenuItem>
       </ContextMenuContent>
     </ContextMenu>

   Items reutilizam exatamente o mesmo CSS de DropdownMenuItem
   (.ds-menu-item) — visual idêntico, só a ancoragem muda.
================================================================ */

interface Coords {
  x: number;
  y: number;
}

interface ContextMenuContextValue {
  open: boolean;
  setOpen: (next: boolean) => void;
  coords: Coords | null;
  setCoords: (c: Coords | null) => void;
  itemsRef: React.MutableRefObject<HTMLButtonElement[]>;
  focusedIndex: number;
  setFocusedIndex: (i: number) => void;
  close: () => void;
}

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null);

function useCtxMenu(component: string) {
  const ctx = useContext(ContextMenuContext);
  if (!ctx) {
    throw new Error(
      `[Atelier] <${component}> deve estar dentro de <ContextMenu>.`,
    );
  }
  return ctx;
}

/* ----------------------------------------------------------------
   Root
---------------------------------------------------------------- */
export interface ContextMenuProps {
  children?: ReactNode;
}

export function ContextMenu({ children }: ContextMenuProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<Coords | null>(null);
  const itemsRef = useRef<HTMLButtonElement[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const close = useCallback(() => {
    setOpen(false);
    setCoords(null);
  }, []);

  return (
    <ContextMenuContext.Provider
      value={{
        open,
        setOpen,
        coords,
        setCoords,
        itemsRef,
        focusedIndex,
        setFocusedIndex,
        close,
      }}
    >
      {children}
    </ContextMenuContext.Provider>
  );
}

/* ----------------------------------------------------------------
   Trigger — wrapper transparente (display: contents) que captura
   o onContextMenu (right-click) e teclas Shift+F10 / Menu.
   Funciona com qualquer ReactNode, sem exigir forwardRef no filho.
---------------------------------------------------------------- */
export interface ContextMenuTriggerProps {
  children: ReactNode;
}

export function ContextMenuTrigger({ children }: ContextMenuTriggerProps) {
  const { setOpen, setCoords } = useCtxMenu("ContextMenuTrigger");

  return (
    <span
      style={{ display: "contents" }}
      onContextMenu={(e) => {
        if (e.defaultPrevented) return;
        e.preventDefault();
        setCoords({ x: e.clientX, y: e.clientY });
        setOpen(true);
      }}
      onKeyDown={(e) => {
        if (e.defaultPrevented) return;
        // tecla ContextMenu ou Shift+F10 → abre no centro do filho
        if (e.key === "ContextMenu" || (e.shiftKey && e.key === "F10")) {
          e.preventDefault();
          const target = e.currentTarget.firstElementChild as HTMLElement | null;
          const rect = (target ?? e.currentTarget).getBoundingClientRect();
          setCoords({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
          setOpen(true);
        }
      }}
    >
      {children}
    </span>
  );
}

/* ----------------------------------------------------------------
   Content — painel posicionado nas coords do clique.
---------------------------------------------------------------- */
export interface ContextMenuContentProps {
  children?: ReactNode;
  minWidth?: number;
  className?: string;
}

export function ContextMenuContent({
  children,
  minWidth = 200,
  className = "",
}: ContextMenuContentProps) {
  const ctx = useCtxMenu("ContextMenuContent");
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<Coords | null>(null);

  // Resetar lista de items
  ctx.itemsRef.current = [];

  // Posiciona com clamp no viewport
  useEffect(() => {
    if (!ctx.open || !ctx.coords || !contentRef.current) return;
    const rect = contentRef.current.getBoundingClientRect();
    const margin = 8;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let x = ctx.coords.x;
    let y = ctx.coords.y;
    if (x + rect.width + margin > vw) x = vw - rect.width - margin;
    if (y + rect.height + margin > vh) y = vh - rect.height - margin;
    if (x < margin) x = margin;
    if (y < margin) y = margin;
    setPos({ x, y });

    // Foca primeiro item
    const t = setTimeout(() => {
      const first = ctx.itemsRef.current[0];
      if (first) {
        first.focus();
        ctx.setFocusedIndex(0);
      }
    }, 10);
    return () => clearTimeout(t);
  }, [ctx.open, ctx.coords]); // eslint-disable-line react-hooks/exhaustive-deps

  // Click outside + Escape
  useEffect(() => {
    if (!ctx.open) return;
    const onDown = (e: globalThis.MouseEvent) => {
      const target = e.target as Node;
      if (!contentRef.current?.contains(target)) {
        ctx.close();
      }
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        ctx.close();
      }
    };
    const id = setTimeout(() => {
      document.addEventListener("mousedown", onDown);
    }, 0);
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(id);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [ctx.open, ctx]);

  // Keyboard nav
  const moveFocus = useCallback(
    (next: number) => {
      const items = ctx.itemsRef.current.filter((el) => el && !el.disabled);
      if (items.length === 0) return;
      let idx = next;
      if (idx < 0) idx = items.length - 1;
      if (idx >= items.length) idx = 0;
      items[idx]?.focus();
      ctx.setFocusedIndex(idx);
    },
    [ctx],
  );

  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      moveFocus(ctx.focusedIndex + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      moveFocus(ctx.focusedIndex - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      moveFocus(0);
    } else if (e.key === "End") {
      e.preventDefault();
      moveFocus(ctx.itemsRef.current.length - 1);
    }
  };

  if (!ctx.open) return null;

  const style: React.CSSProperties = pos
    ? { top: pos.y, left: pos.x, minWidth, position: "fixed" }
    : {
        top: ctx.coords?.y ?? 0,
        left: ctx.coords?.x ?? 0,
        visibility: "hidden",
        position: "fixed",
        minWidth,
      };

  return (
    <div
      ref={contentRef}
      role="menu"
      className={`ds-popover ds-menu side-bottom ${className}`.trim()}
      style={style}
      onKeyDown={handleKey}
    >
      {children}
    </div>
  );
}

/* ----------------------------------------------------------------
   Items — reutilizam o CSS do DropdownMenu mas usam contexto local
   pra registrar refs e fechar. Reimplementação enxuta dos items
   pra não amarrar com o context do DropdownMenu.
---------------------------------------------------------------- */
export interface ContextMenuItemProps {
  children?: ReactNode;
  onSelect?: () => void;
  glyph?: ReactNode;
  shortcut?: string;
  destructive?: boolean;
  disabled?: boolean;
}

export function ContextMenuItem({
  children,
  onSelect,
  glyph,
  shortcut,
  destructive = false,
  disabled = false,
}: ContextMenuItemProps) {
  const ctx = useCtxMenu("ContextMenuItem");
  const setRef = useCallback(
    (el: HTMLButtonElement | null) => {
      if (el) ctx.itemsRef.current.push(el);
    },
    [ctx.itemsRef],
  );
  const cls = ["ds-menu-item"];
  if (destructive) cls.push("destructive");

  return (
    <button
      ref={setRef}
      type="button"
      role="menuitem"
      tabIndex={-1}
      disabled={disabled}
      className={cls.join(" ")}
      onClick={() => {
        onSelect?.();
        ctx.close();
      }}
    >
      {glyph != null && (
        <span className="ds-menu-item-glyph" aria-hidden="true">
          {glyph}
        </span>
      )}
      <span className="ds-menu-item-label">{children}</span>
      {shortcut && (
        <span className="ds-menu-item-shortcut" aria-hidden="true">
          {shortcut}
        </span>
      )}
    </button>
  );
}

export function ContextMenuSeparator() {
  return <div role="separator" className="ds-menu-separator" />;
}

export function ContextMenuLabel({ children }: { children?: ReactNode }) {
  return <div className="ds-menu-label">{children}</div>;
}

export interface ContextMenuCheckboxItemProps {
  children?: ReactNode;
  checked?: boolean;
  onCheckedChange?: (next: boolean) => void;
  shortcut?: string;
  disabled?: boolean;
}

export function ContextMenuCheckboxItem({
  children,
  checked = false,
  onCheckedChange,
  shortcut,
  disabled = false,
}: ContextMenuCheckboxItemProps) {
  const ctx = useCtxMenu("ContextMenuCheckboxItem");
  const setRef = useCallback(
    (el: HTMLButtonElement | null) => {
      if (el) ctx.itemsRef.current.push(el);
    },
    [ctx.itemsRef],
  );
  return (
    <button
      ref={setRef}
      type="button"
      role="menuitemcheckbox"
      aria-checked={checked}
      tabIndex={-1}
      disabled={disabled}
      className={`ds-menu-item checkbox ${checked ? "checked" : ""}`}
      onClick={() => onCheckedChange?.(!checked)}
    >
      <span className="ds-menu-item-mark" aria-hidden="true">
        {checked ? "✓" : ""}
      </span>
      <span className="ds-menu-item-label">{children}</span>
      {shortcut && (
        <span className="ds-menu-item-shortcut" aria-hidden="true">
          {shortcut}
        </span>
      )}
    </button>
  );
}
