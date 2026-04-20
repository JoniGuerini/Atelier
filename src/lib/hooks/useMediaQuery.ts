import { useEffect, useState } from "react";

/* ================================================================
   useMediaQuery — reactive matchMedia hook (Roadmap · fase 10.1)
   ----------------------------------------------------------------
   Retorna `true` quando o viewport bate com a `query` CSS dada,
   `false` caso contrário. Reativo: re-renderiza ao cruzar o ponto.

   Pareia com a escala --bp-* (Foundations II, fase 9). Em CSS o
   token vive paralelo ao número literal; em JS este hook resolve
   o token e cria um listener.

   Exemplo:
     const isWide = useMediaQuery("(min-width: 720px)");
     // ou via token:
     const bpMd = getComputedStyle(document.documentElement)
       .getPropertyValue("--bp-md").trim();
     const isWide = useMediaQuery(`(min-width: ${bpMd})`);

   SSR-safe: retorna `false` no primeiro render (server) e
   sincroniza no useEffect (client).
   ================================================================ */

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    if (mql.addEventListener) {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }
    /* Safari < 14 fallback */
    mql.addListener(update);
    return () => mql.removeListener(update);
  }, [query]);

  return matches;
}
