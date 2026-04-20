import { useEffect, useRef } from "react";

/* ================================================================
   useEventListener (Roadmap · fase 10.2)
   ----------------------------------------------------------------
   Hook tipado e ergonômico para addEventListener. Resolve três
   chatices comuns:
     1. Tipagem correta por nome de evento (WindowEventMap, etc)
     2. Cleanup automático no unmount
     3. handler estável via ref — re-render NÃO recria o listener

   Sobrecargas: window (default), Document, Element via ref.

   Exemplos:
     useEventListener("scroll", () => console.log(window.scrollY));
     useEventListener("keydown", onKey, { current: window } as any);
     useEventListener("click", onClick, btnRef);
   ================================================================ */

export function useEventListener<K extends keyof WindowEventMap>(
  event: K,
  handler: (e: WindowEventMap[K]) => void
): void;
export function useEventListener<K extends keyof DocumentEventMap>(
  event: K,
  handler: (e: DocumentEventMap[K]) => void,
  target: Document
): void;
export function useEventListener<
  T extends Element,
  K extends keyof HTMLElementEventMap
>(
  event: K,
  handler: (e: HTMLElementEventMap[K]) => void,
  target: { current: T | null }
): void;

export function useEventListener(
  event: string,
  handler: (e: any) => void,
  target?: Document | { current: Element | null }
): void {
  const handlerRef = useRef(handler);
  /* mantém ref atualizada sem re-anexar listener */
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const node: EventTarget | null = !target
      ? window
      : "current" in target
      ? target.current
      : target;
    if (!node) return;

    const listener = (e: Event) => handlerRef.current(e);
    node.addEventListener(event, listener);
    return () => node.removeEventListener(event, listener);
  }, [event, target]);
}
