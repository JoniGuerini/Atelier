/* ================================================================
   Atelier — vitest setup (Roadmap · fase 6.4)
   ----------------------------------------------------------------
   Carregado automaticamente via vitest config (`setupFiles`).
   Adiciona os matchers do @testing-library/jest-dom para asserts
   ergonômicos como `.toBeInTheDocument()`, `.toHaveTextContent()`.

   matchMedia precisa de polyfill em jsdom — usado pelos hooks
   de ambiente (useMediaQuery, usePrefersReducedMotion).
   ================================================================ */

import fs from "node:fs";
import path from "node:path";
import "@testing-library/jest-dom/vitest";

/* Mesmo sprite que index.html (vite) — <use href="#..."> precisa dos <symbol> no documento. */
if (typeof document !== "undefined") {
  try {
    const spritePath = path.join(process.cwd(), "public", "icons.svg");
    let sprite = fs.readFileSync(spritePath, "utf8").trim();
    sprite = sprite.replace(
      "<svg ",
      '<svg style="position:absolute;width:0;height:0;overflow:hidden" '
    );
    document.body.insertAdjacentHTML("afterbegin", sprite);
  } catch {
    /* ignore — CI sem ficheiro ou path diferente */
  }
}

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
