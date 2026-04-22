/* ================================================================
   Atelier — vitest setup (Roadmap · fase 6.4)
   ----------------------------------------------------------------
   Carregado automaticamente via vitest config (`setupFiles`).
   Adiciona os matchers do @testing-library/jest-dom para asserts
   ergonômicos como `.toBeInTheDocument()`, `.toHaveTextContent()`.

   matchMedia precisa de polyfill em jsdom — usado pelos hooks
   de ambiente (useMediaQuery, usePrefersReducedMotion).
   ================================================================ */

import "@testing-library/jest-dom/vitest";

/* Polyfill matchMedia (jsdom não implementa) */
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = function matchMediaPolyfill(query: string) {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    } as unknown as MediaQueryList;
  };
}

/* Polyfill IntersectionObserver — useIntersectionObserver / ScrollReveal */
if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
  class IntersectionObserverPolyfill {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).IntersectionObserver = IntersectionObserverPolyfill;
}

/* Polyfill ResizeObserver — useResizeObserver / VirtualList */
if (typeof window !== "undefined" && !("ResizeObserver" in window)) {
  class ResizeObserverPolyfill {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).ResizeObserver = ResizeObserverPolyfill;
}
