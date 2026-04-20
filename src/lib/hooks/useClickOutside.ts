import { useEffect, type RefObject } from "react";

/* ================================================================
   useClickOutside (Roadmap · fase 10.2)
   ----------------------------------------------------------------
   Dispara `handler` quando o usuário clica/toca FORA do `ref`.
   Cobre mouse e touch. Use em popovers, dropdowns, dialogs sem
   backdrop modal — qualquer overlay que se fecha ao perder foco
   externo.

   `active` (default true) controla se o listener está ativo —
   evita custo quando o overlay está fechado.

   Exemplo:
     const ref = useRef<HTMLDivElement>(null);
     useClickOutside(ref, () => setOpen(false), open);
   ================================================================ */

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
  active: boolean = true
): void {
  useEffect(() => {
    if (!active) return;
    if (typeof document === "undefined") return;

    const onPointer = (e: MouseEvent | TouchEvent) => {
      const node = ref.current;
      if (!node) return;
      const target = e.target as Node | null;
      if (target && node.contains(target)) return;
      handler(e);
    };

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [ref, handler, active]);
}
