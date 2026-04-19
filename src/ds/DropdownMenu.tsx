import {
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  type PopoverPlacement,
} from "./Popover.tsx";

/* ================================================================
   DropdownMenu — menu de ações disparado por um botão.
   ----------------------------------------------------------------
   Composto sobre <Popover>. Adiciona:
     · keyboard nav: ↑/↓ para navegar items, Enter pra selecionar,
       Home/End pulam pro primeiro/último.
     · gerencia foco (move pro primeiro item ao abrir, devolve pro
       trigger ao fechar).
     · roving tabindex (apenas item ativo é focável; reduz Tab spam).
     · suporte a items checkbox/radio (com indicador editorial),
       separadores, labels de grupo, shortcuts mono à direita,
       glifos opcionais à esquerda, items destrutivos.

   API composable (estilo Radix / shadcn):
     <DropdownMenu>
       <DropdownMenuTrigger>
         <Button>Actions</Button>
       </DropdownMenuTrigger>
       <DropdownMenuContent>
         <DropdownMenuLabel>Account</DropdownMenuLabel>
         <DropdownMenuItem onSelect={...}>Profile</DropdownMenuItem>
         <DropdownMenuItem shortcut="⌘K">Settings</DropdownMenuItem>
         <DropdownMenuSeparator />
         <DropdownMenuCheckboxItem checked={dark} onCheckedChange={setDark}>
           Dark mode
         </DropdownMenuCheckboxItem>
         <DropdownMenuSeparator />
         <DropdownMenuItem destructive>Delete</DropdownMenuItem>
       </DropdownMenuContent>
     </DropdownMenu>
================================================================ */

interface MenuContextValue {
  /** Lista de refs dos items (pra navegação ↑↓). */
  itemsRef: React.MutableRefObject<HTMLButtonElement[]>;
  /** Index do item atualmente focado. */
  focusedIndex: number;
  setFocusedIndex: (i: number) => void;
  /** Fecha o menu (ex.: depois de selecionar). */
  close: () => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

function useMenuCtx(component: string) {
  const ctx = useContext(MenuContext);
  if (!ctx) {
    throw new Error(
      `[Atelier] <${component}> deve estar dentro de <DropdownMenuContent>.`,
    );
  }
  return ctx;
}

/* ----------------------------------------------------------------
   Root + Trigger — espelham o Popover (mesma API).
---------------------------------------------------------------- */
export interface DropdownMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  children?: ReactNode;
}

export function DropdownMenu({
  open,
  onOpenChange,
  defaultOpen,
  children,
}: DropdownMenuProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
      {children}
    </Popover>
  );
}

export interface DropdownMenuTriggerProps {
  children: ReactElement;
}

export function DropdownMenuTrigger({ children }: DropdownMenuTriggerProps) {
  if (!isValidElement(children)) return <>{children}</>;
  // Trocar aria-haspopup pra "menu" (semântica mais precisa)
  const cloned = cloneElement(children, {
    "aria-haspopup": "menu",
  } as any);
  return <PopoverTrigger>{cloned}</PopoverTrigger>;
}

/* ----------------------------------------------------------------
   Content — wrapper do PopoverContent que adiciona:
     · role="menu"
     · keyboard navigation
     · auto-focus no primeiro item
---------------------------------------------------------------- */
export interface DropdownMenuContentProps {
  children?: ReactNode;
  placement?: PopoverPlacement;
  offset?: number;
  minWidth?: number;
  className?: string;
  ariaLabel?: string;
}

export function DropdownMenuContent({
  children,
  placement = "bottom-start",
  offset = 6,
  minWidth = 220,
  className = "",
  ariaLabel,
}: DropdownMenuContentProps) {
  const itemsRef = useRef<HTMLButtonElement[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  // Reseta lista de items a cada render
  itemsRef.current = [];

  // Quando abre, foca o primeiro item após um tick
  useEffect(() => {
    const id = setTimeout(() => {
      const first = itemsRef.current[0];
      if (first) {
        first.focus();
        setFocusedIndex(0);
      }
    }, 10);
    return () => clearTimeout(id);
  }, []);

  // Move foco usando os refs registrados
  const moveFocus = useCallback((next: number) => {
    const items = itemsRef.current.filter((el) => el && !el.disabled);
    if (items.length === 0) return;
    let idx = next;
    if (idx < 0) idx = items.length - 1;
    if (idx >= items.length) idx = 0;
    items[idx]?.focus();
    setFocusedIndex(idx);
  }, []);

  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      moveFocus(focusedIndex + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      moveFocus(focusedIndex - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      moveFocus(0);
    } else if (e.key === "End") {
      e.preventDefault();
      moveFocus(itemsRef.current.length - 1);
    }
  };

  return (
    <PopoverContent
      placement={placement}
      offset={offset}
      minWidth={minWidth}
      className={`ds-menu ${className}`.trim()}
      role="menu"
      ariaLabel={ariaLabel}
    >
      <MenuContext.Provider
        value={{
          itemsRef,
          focusedIndex,
          setFocusedIndex,
          close: () => {
            // Acessa Popover via documento — fechamento via Escape ou click outside
            // O onSelect dos items chama close() implicitamente via document.activeElement.blur
            // Mas precisamos disparar o popover. Vamos enviar Escape sintético.
            const ev = new KeyboardEvent("keydown", { key: "Escape" });
            document.dispatchEvent(ev);
          },
        }}
      >
        <div onKeyDown={handleKey}>{children}</div>
      </MenuContext.Provider>
    </PopoverContent>
  );
}

/* ----------------------------------------------------------------
   Item — botão clicável.
---------------------------------------------------------------- */
export interface DropdownMenuItemProps {
  children?: ReactNode;
  /** Chamado quando o item é selecionado (click ou Enter). */
  onSelect?: () => void;
  /** Glifo opcional à esquerda (Unicode ou SVG). */
  glyph?: ReactNode;
  /** Texto à direita em mono (ex: "⌘K"). */
  shortcut?: string;
  /** Item de ação destrutiva (cor accent). */
  destructive?: boolean;
  disabled?: boolean;
}

export function DropdownMenuItem({
  children,
  onSelect,
  glyph,
  shortcut,
  destructive = false,
  disabled = false,
}: DropdownMenuItemProps) {
  const { itemsRef, close } = useMenuCtx("DropdownMenuItem");
  const ref = useRef<HTMLButtonElement | null>(null);

  // Auto-registra o ref na lista (evita useEffect — registra inline na render)
  const setRef = useCallback((el: HTMLButtonElement | null) => {
    ref.current = el;
    if (el) itemsRef.current.push(el);
  }, [itemsRef]);

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
        close();
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

/* ----------------------------------------------------------------
   CheckboxItem — toggle visível.
---------------------------------------------------------------- */
export interface DropdownMenuCheckboxItemProps {
  children?: ReactNode;
  checked?: boolean;
  onCheckedChange?: (next: boolean) => void;
  shortcut?: string;
  disabled?: boolean;
}

export function DropdownMenuCheckboxItem({
  children,
  checked = false,
  onCheckedChange,
  shortcut,
  disabled = false,
}: DropdownMenuCheckboxItemProps) {
  const { itemsRef, close } = useMenuCtx("DropdownMenuCheckboxItem");
  const setRef = useCallback((el: HTMLButtonElement | null) => {
    if (el) itemsRef.current.push(el);
  }, [itemsRef]);

  return (
    <button
      ref={setRef}
      type="button"
      role="menuitemcheckbox"
      aria-checked={checked}
      tabIndex={-1}
      disabled={disabled}
      className={`ds-menu-item checkbox ${checked ? "checked" : ""}`}
      onClick={() => {
        onCheckedChange?.(!checked);
        // Não fecha — checkbox normalmente fica aberto pra múltipla escolha
      }}
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

/* ----------------------------------------------------------------
   RadioGroup + RadioItem — escolha única.
---------------------------------------------------------------- */
interface RadioGroupContextValue {
  value: string | null;
  onValueChange?: (value: string) => void;
}
const RadioGroupContext = createContext<RadioGroupContextValue>({
  value: null,
});

export interface DropdownMenuRadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children?: ReactNode;
}
export function DropdownMenuRadioGroup({
  value = null as any,
  onValueChange,
  children,
}: DropdownMenuRadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div role="group">{children}</div>
    </RadioGroupContext.Provider>
  );
}

export interface DropdownMenuRadioItemProps {
  value: string;
  children?: ReactNode;
  shortcut?: string;
  disabled?: boolean;
}
export function DropdownMenuRadioItem({
  value,
  children,
  shortcut,
  disabled = false,
}: DropdownMenuRadioItemProps) {
  const { itemsRef } = useMenuCtx("DropdownMenuRadioItem");
  const group = useContext(RadioGroupContext);
  const checked = group.value === value;
  const setRef = useCallback((el: HTMLButtonElement | null) => {
    if (el) itemsRef.current.push(el);
  }, [itemsRef]);

  return (
    <button
      ref={setRef}
      type="button"
      role="menuitemradio"
      aria-checked={checked}
      tabIndex={-1}
      disabled={disabled}
      className={`ds-menu-item radio ${checked ? "checked" : ""}`}
      onClick={() => group.onValueChange?.(value)}
    >
      <span className="ds-menu-item-mark" aria-hidden="true">
        {checked ? "●" : "○"}
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

/* ----------------------------------------------------------------
   Label de grupo (não é selecionável).
---------------------------------------------------------------- */
export function DropdownMenuLabel({ children }: { children?: ReactNode }) {
  return <div className="ds-menu-label">{children}</div>;
}

/* ----------------------------------------------------------------
   Separator entre grupos.
---------------------------------------------------------------- */
export function DropdownMenuSeparator() {
  return <div role="separator" className="ds-menu-separator" />;
}
