import { useMediaQuery } from "./useMediaQuery.ts";

/* ================================================================
   usePrefersReducedMotion (Roadmap · fase 10.1)
   ----------------------------------------------------------------
   Wrapper do useMediaQuery sobre `(prefers-reduced-motion: reduce)`.
   Retorna `true` quando o usuário pediu menos animação no SO.

   O CSS já honra essa preferência globalmente (index.css linha
   ~218) zerando duração de animação/transição. Este hook serve
   pra casos JS — ex: pular um setTimeout de auto-play em Carousel
   ou desligar um spring-animation.

   Exemplo:
     const reduceMotion = usePrefersReducedMotion();
     useEffect(() => {
       if (reduceMotion) return;            // sem auto-rotate
       const id = setInterval(next, 4000);
       return () => clearInterval(id);
     }, [reduceMotion]);
   ================================================================ */

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
