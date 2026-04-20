import { useEffect, useState } from "react";

/* ================================================================
   useWindowSize (Roadmap · fase 10.1)
   ----------------------------------------------------------------
   Retorna { width, height } reativo ao window.resize.

   Sem debounce embutido — se a aplicação precisa, pode compor com
   useDebounce(value, ms). Manter simples evita reabrir essa
   decisão fora do componente consumidor.

   SSR-safe: { width: 0, height: 0 } no primeiro render server,
   sincroniza no useEffect.
   ================================================================ */

export interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>(() => {
    if (typeof window === "undefined") return { width: 0, height: 0 };
    return { width: window.innerWidth, height: window.innerHeight };
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return size;
}
