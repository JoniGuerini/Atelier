import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useT } from "../lib/i18n.tsx";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "./Dialog.tsx";

/* ================================================================
   KeyboardShortcuts — registro de atalhos globais com painel de help.
   ----------------------------------------------------------------
   3 partes:
     1. <ShortcutsProvider> — registry global. Escuta keydown no
        document e dispara os handlers registrados.
     2. useShortcut(combo, handler, opts?) — hook que registra um
        atalho. Auto-cleanup no unmount.
     3. <ShortcutsHelp /> — painel modal com a lista de atalhos
        registrados, agrupados por seção.

   Sintaxe de combo (case-insensitive):
     "cmd+k"           → Meta+K (no macOS) ou Ctrl+K (cross-platform)
     "shift+?"         → Shift+/
     "alt+arrowup"     → Alt+ArrowUp
     "g d"             → sequência: G depois D (atalho composto)

   Modificadores: cmd | meta | ctrl | shift | alt
   "cmd" é equivalente a "meta" e funciona como Ctrl em Win/Linux.

   Atalhos pré-existentes do app (Cmd+K palette, Cmd+B sidebar)
   continuam funcionando — o Provider apenas adiciona um sistema
   reusável para QUALQUER atalho.
================================================================ */

export interface Shortcut {
  combo: string;
  handler: (e: KeyboardEvent) => void;
  /** Descrição mostrada no painel de help. */
  label?: string;
  /** Categoria/grupo no painel (ex: "Navegação", "Edição"). */
  group?: string;
  /** Não dispara quando o foco está num input/textarea. Default: true. */
  ignoreInInputs?: boolean;
  /** Permite repetir auto-fire enquanto a tecla está pressionada. Default: false. */
  allowRepeat?: boolean;
  /** Desabilita esse shortcut sem desregistrar. Default: false. */
  disabled?: boolean;
}

interface RegistryEntry extends Shortcut {
  id: number;
}

interface ShortcutsContextValue {
  register: (s: Shortcut) => number;
  unregister: (id: number) => void;
  list: () => RegistryEntry[];
  openHelp: () => void;
  closeHelp: () => void;
}

const ShortcutsContext = createContext<ShortcutsContextValue | null>(null);

let nextId = 0;

/* ----------------------------------------------------------------
   Combo parsing — string → match function
---------------------------------------------------------------- */
function isModifier(s: string): boolean {
  return ["cmd", "meta", "ctrl", "shift", "alt"].includes(s);
}

interface ParsedKeystroke {
  cmd: boolean;
  ctrl: boolean;
  shift: boolean;
  alt: boolean;
  key: string;
}

function parseKeystroke(combo: string): ParsedKeystroke {
  const parts = combo.toLowerCase().split("+").map((p) => p.trim());
  const out: ParsedKeystroke = {
    cmd: false,
    ctrl: false,
    shift: false,
    alt: false,
    key: "",
  };
  for (const p of parts) {
    if (p === "cmd" || p === "meta") out.cmd = true;
    else if (p === "ctrl") out.ctrl = true;
    else if (p === "shift") out.shift = true;
    else if (p === "alt" || p === "option") out.alt = true;
    else if (!isModifier(p)) out.key = p;
  }
  return out;
}

/** Combo pode ter múltiplos passos separados por espaço (ex: "g d"). */
function parseCombo(combo: string): ParsedKeystroke[] {
  return combo.trim().split(/\s+/).map(parseKeystroke);
}

function matchesKeystroke(e: KeyboardEvent, k: ParsedKeystroke): boolean {
  // "cmd" cobre tanto Meta (Mac) quanto Ctrl (Win/Linux). Se o consumidor
  // usou explicitamente "ctrl", vai aceitar só Ctrl.
  const cmdPressed = e.metaKey || e.ctrlKey;
  if (k.cmd && !cmdPressed) return false;
  if (!k.cmd && k.ctrl && !e.ctrlKey) return false;
  if (k.shift !== e.shiftKey) return false;
  if (k.alt !== e.altKey) return false;
  if (!k.key) return false;
  const keyLower = e.key.toLowerCase();
  // Special: "?" precisa Shift+/
  if (k.key === "?") return keyLower === "?";
  return keyLower === k.key;
}

/* ----------------------------------------------------------------
   Provider
---------------------------------------------------------------- */
export interface ShortcutsProviderProps {
  children?: ReactNode;
}

export function ShortcutsProvider({ children }: ShortcutsProviderProps) {
  const [registry, setRegistry] = useState<RegistryEntry[]>([]);
  const [helpOpen, setHelpOpen] = useState(false);

  /* TODO futuro: state de sequência pra combos compostos (ex: "g d").
     Por enquanto apenas combos de 1 passo. */

  const register = useCallback((s: Shortcut): number => {
    const id = ++nextId;
    setRegistry((curr) => [...curr, { ...s, id }]);
    return id;
  }, []);

  const unregister = useCallback((id: number) => {
    setRegistry((curr) => curr.filter((x) => x.id !== id));
  }, []);

  const list = useCallback(() => registry, [registry]);
  const openHelp = useCallback(() => setHelpOpen(true), []);
  const closeHelp = useCallback(() => setHelpOpen(false), []);

  // Atalho built-in: ? abre o help (não registramos via useShortcut pra
  // evitar dependência circular)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Detecta input/textarea/contenteditable
      const target = e.target as HTMLElement | null;
      const inInput =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      // Built-in: Shift+? → abre help (mesmo que GitHub, Linear, etc.)
      if (!inInput && e.shiftKey && e.key === "?") {
        e.preventDefault();
        setHelpOpen(true);
        return;
      }

      // Itera registry; primeiro match que casa, dispara
      for (const entry of registry) {
        if (entry.disabled) continue;
        if (entry.ignoreInInputs !== false && inInput) continue;
        if (!entry.allowRepeat && e.repeat) continue;
        const steps = parseCombo(entry.combo);
        if (steps.length === 0) continue;
        // Combos de 1 step (a maioria)
        if (steps.length === 1 && matchesKeystroke(e, steps[0])) {
          e.preventDefault();
          entry.handler(e);
          return;
        }
        // TODO: combos compostos (g d) — simplificação: apenas
        // 1-step na primeira versão. Multi-step requer máquina
        // de estado por usuário.
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [registry]);

  const value = useMemo<ShortcutsContextValue>(
    () => ({ register, unregister, list, openHelp, closeHelp }),
    [register, unregister, list, openHelp, closeHelp],
  );

  return (
    <ShortcutsContext.Provider value={value}>
      {children}
      <ShortcutsHelpDialog open={helpOpen} onClose={closeHelp} />
    </ShortcutsContext.Provider>
  );
}

/* ----------------------------------------------------------------
   Hook: useShortcut
---------------------------------------------------------------- */
export function useShortcut(
  combo: string,
  handler: (e: KeyboardEvent) => void,
  opts?: Omit<Shortcut, "combo" | "handler">,
): void {
  const ctx = useContext(ShortcutsContext);
  useEffect(() => {
    if (!ctx) {
      if (typeof console !== "undefined" && import.meta.env?.DEV) {
        console.warn(
          "[Atelier] useShortcut() chamado sem <ShortcutsProvider> no root. Atalho ignorado.",
        );
      }
      return;
    }
    const id = ctx.register({ combo, handler, ...opts });
    return () => ctx.unregister(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combo, handler, opts?.label, opts?.group, opts?.disabled]);
}

/* ----------------------------------------------------------------
   useShortcutsContext — pra abrir help programaticamente
---------------------------------------------------------------- */
export function useShortcutsContext(): ShortcutsContextValue {
  const ctx = useContext(ShortcutsContext);
  if (!ctx) {
    return {
      register: () => -1,
      unregister: () => {},
      list: () => [],
      openHelp: () => {},
      closeHelp: () => {},
    };
  }
  return ctx;
}

/* ----------------------------------------------------------------
   Help Dialog — renderizado pelo Provider, opt-in via Shift+?
---------------------------------------------------------------- */
interface ShortcutsHelpDialogProps {
  open: boolean;
  onClose: () => void;
}

function ShortcutsHelpDialog({ open, onClose }: ShortcutsHelpDialogProps) {
  const { t } = useT();
  const ctx = useContext(ShortcutsContext);
  const items = ctx?.list() ?? [];

  // Agrupa por `group` (default: "—")
  const groups = useMemo(() => {
    const map = new Map<string, RegistryEntry[]>();
    items.forEach((it) => {
      const g = it.group ?? t("ds.shortcuts.uncategorized");
      const arr = map.get(g) ?? [];
      arr.push(it);
      map.set(g, arr);
    });
    return Array.from(map.entries());
  }, [items, t]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogHeader>
        <DialogTitle>{t("ds.shortcuts.title")}</DialogTitle>
        <DialogClose label={t("ds.shortcuts.close")} />
      </DialogHeader>
      <DialogBody>
        {items.length === 0 ? (
          <p className="ds-shortcuts-empty">{t("ds.shortcuts.empty")}</p>
        ) : (
          <div className="ds-shortcuts-groups">
            {groups.map(([groupName, entries]) => (
              <section key={groupName} className="ds-shortcuts-group">
                <h4 className="ds-shortcuts-group-label">{groupName}</h4>
                <ul className="ds-shortcuts-list">
                  {entries.map((s) => (
                    <li key={s.id} className="ds-shortcuts-item">
                      <span className="ds-shortcuts-label">
                        {s.label ?? s.combo}
                      </span>
                      <ShortcutCombo combo={s.combo} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </DialogBody>
    </Dialog>
  );
}

/* ----------------------------------------------------------------
   ShortcutCombo — renderiza o combo como <kbd> separados
---------------------------------------------------------------- */
export function ShortcutCombo({ combo }: { combo: string }) {
  const parts = combo.toLowerCase().split(/\s*\+\s*/);
  return (
    <span className="ds-shortcuts-combo">
      {parts.map((p, i) => (
        <kbd key={i} className="ds-shortcuts-kbd">
          {prettyKey(p)}
        </kbd>
      ))}
    </span>
  );
}

function prettyKey(k: string): string {
  switch (k) {
    case "cmd":
    case "meta":
      return "⌘";
    case "ctrl":
      return "Ctrl";
    case "shift":
      return "⇧";
    case "alt":
    case "option":
      return "⌥";
    case "enter":
    case "return":
      return "↵";
    case "escape":
    case "esc":
      return "Esc";
    case "arrowup":
      return "↑";
    case "arrowdown":
      return "↓";
    case "arrowleft":
      return "←";
    case "arrowright":
      return "→";
    case "space":
      return "Space";
    case "tab":
      return "Tab";
    case "backspace":
      return "⌫";
    case "delete":
      return "Del";
    default:
      return k.length === 1 ? k.toUpperCase() : k;
  }
}
