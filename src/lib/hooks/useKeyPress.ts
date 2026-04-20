import { useEffect, useRef } from "react";

/* ================================================================
   useKeyPress (Roadmap · fase 10.2)
   ----------------------------------------------------------------
   Atalho granular: dispara `handler` quando o `combo` é pressionado.
   Para shortcuts globais e descobríveis (com ajuda em Shift+?), use
   o useShortcut da Shortcuts API. Este hook é o canivete fino para
   atalhos LOCAIS — uma combobox que escuta Escape, um input que
   reage a Enter, um drag que cancela com Esc.

   Sintaxe do combo (case-insensitive, separador `+`):
     "escape", "enter", "shift+enter", "cmd+k", "ctrl+/"
   Aliases: cmd → metaKey, ctrl → ctrlKey, alt → altKey, shift →
   shiftKey, mod → metaKey em mac, ctrlKey nos demais.

   `target` (default window). `active` (default true) controla se
   o listener está armado.
   ================================================================ */

export interface UseKeyPressOptions {
  active?: boolean;
  target?: Window | Document | { current: Element | null };
  /** Chama preventDefault no evento quando o combo bate. */
  preventDefault?: boolean;
}

const IS_MAC =
  typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

interface ParsedCombo {
  key: string;
  cmd: boolean;
  ctrl: boolean;
  alt: boolean;
  shift: boolean;
}

function parseCombo(combo: string): ParsedCombo {
  const parts = combo.toLowerCase().split("+").map((p) => p.trim());
  const result: ParsedCombo = {
    key: "",
    cmd: false,
    ctrl: false,
    alt: false,
    shift: false,
  };
  for (const p of parts) {
    if (p === "cmd" || p === "meta") result.cmd = true;
    else if (p === "ctrl" || p === "control") result.ctrl = true;
    else if (p === "alt" || p === "option") result.alt = true;
    else if (p === "shift") result.shift = true;
    else if (p === "mod") {
      if (IS_MAC) result.cmd = true;
      else result.ctrl = true;
    } else result.key = p;
  }
  return result;
}

function matches(parsed: ParsedCombo, e: KeyboardEvent): boolean {
  if (parsed.cmd !== e.metaKey) return false;
  if (parsed.ctrl !== e.ctrlKey) return false;
  if (parsed.alt !== e.altKey) return false;
  if (parsed.shift !== e.shiftKey) return false;
  /* mapeia algumas keys com nome amigável */
  const k = e.key.toLowerCase();
  const aliases: Record<string, string[]> = {
    esc: ["escape"],
    escape: ["escape"],
    space: [" "],
    " ": ["space"],
  };
  if (k === parsed.key) return true;
  return (aliases[parsed.key] ?? []).includes(k);
}

export function useKeyPress(
  combo: string,
  handler: (e: KeyboardEvent) => void,
  options: UseKeyPressOptions = {}
): void {
  const { active = true, target, preventDefault = false } = options;
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!active) return;
    if (typeof window === "undefined") return;
    const node: EventTarget | null = !target
      ? window
      : "current" in target
      ? target.current
      : target;
    if (!node) return;

    const parsed = parseCombo(combo);
    const listener = (e: Event) => {
      const ke = e as KeyboardEvent;
      if (!matches(parsed, ke)) return;
      if (preventDefault) ke.preventDefault();
      handlerRef.current(ke);
    };
    node.addEventListener("keydown", listener);
    return () => node.removeEventListener("keydown", listener);
  }, [combo, active, target, preventDefault]);
}
