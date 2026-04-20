import { useEffect, type RefObject } from "react";

/* ================================================================
   useFocusTrap — Roadmap · fase 6.2
   ----------------------------------------------------------------
   Prende o foco do teclado dentro do `ref` enquanto `active === true`.
   Padrão obrigatório em modais, drawers, popovers de menu e qualquer
   overlay que captura interação — sem isso, Tab vaza pra trás do
   scrim.

   Algoritmo:
     1. Identifica os focusable descendentes do nó (selector próprio
        — sem libs externas).
     2. No primeiro Tab, leva foco pro primeiro item.
     3. Em Shift+Tab no primeiro → vai pro último (wrap).
     4. Em Tab no último → vai pro primeiro (wrap).

   NÃO restaura o foco anterior — pra isso, combine com useFocusReturn.

   Uso típico:
     const ref = useRef<HTMLDivElement>(null);
     useFocusTrap(ref, isOpen);
     return <div ref={ref} role="dialog">…</div>;
   ================================================================ */

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
  "[contenteditable='true']",
].join(",");

function isVisible(el: HTMLElement): boolean {
  if (el.hidden) return false;
  if (el.style.display === "none") return false;
  if (el.style.visibility === "hidden") return false;
  /* computed style — mais preciso, mas pode falhar em jsdom sem layout */
  if (typeof window !== "undefined" && typeof getComputedStyle === "function") {
    try {
      const cs = getComputedStyle(el);
      if (cs.display === "none") return false;
      if (cs.visibility === "hidden") return false;
    } catch {
      /* sem computed style disponível — assume visível */
    }
  }
  return true;
}

function getFocusable(root: HTMLElement): HTMLElement[] {
  const all = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
  return all.filter((el) => {
    if (el.hasAttribute("inert")) return false;
    if (el.getAttribute("aria-hidden") === "true") return false;
    return isVisible(el);
  });
}

export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  active: boolean = true
): void {
  useEffect(() => {
    if (!active) return;
    if (typeof document === "undefined") return;
    const node = ref.current;
    if (!node) return;

    /* Se o foco ainda não está dentro, leva pro primeiro focusable */
    const focusables = getFocusable(node);
    if (focusables.length > 0 && !node.contains(document.activeElement)) {
      focusables[0].focus();
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = getFocusable(node);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (current === first || !node.contains(current)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (current === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    node.addEventListener("keydown", onKey);
    return () => node.removeEventListener("keydown", onKey);
  }, [ref, active]);
}
