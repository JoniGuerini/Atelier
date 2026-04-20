import { useEffect, useState, type RefObject } from "react";

/* ================================================================
   useIntersectionObserver (Roadmap · fase 10.1)
   ----------------------------------------------------------------
   Observa um elemento e retorna o IntersectionObserverEntry mais
   recente (ou null antes da primeira observação).

   Pré-requisito do <ScrollReveal> (Fase 4.2 — Motion). Habilita
   lazy-loading de imagens, fade-in editorial em scroll, infinite
   scroll, etc.

   Exemplo:
     const ref = useRef<HTMLDivElement>(null);
     const entry = useIntersectionObserver(ref, { threshold: 0.2 });
     const isVisible = !!entry?.isIntersecting;

   SSR-safe: retorna null no server.
   ================================================================ */

export function useIntersectionObserver(
  ref: RefObject<Element | null>,
  options?: IntersectionObserverInit
): IntersectionObserverEntry | null {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([first]) => {
      if (first) setEntry(first);
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    /* options é dependência via spread porque cada chamada cria um
       novo objeto literal — confiamos no consumidor não recriar
       options em cada render (ou usar useMemo). Documentar no /hooks. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, options?.root, options?.rootMargin, options?.threshold?.toString()]);

  return entry;
}
