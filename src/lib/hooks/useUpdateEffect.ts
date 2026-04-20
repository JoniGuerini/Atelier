import { useEffect, useRef, type DependencyList, type EffectCallback } from "react";

/* ================================================================
   useUpdateEffect (Roadmap · fase 10.3)
   ----------------------------------------------------------------
   Igual a useEffect, mas pula a primeira execução (mount). Útil
   quando queremos reagir APENAS a mudanças subsequentes — ex:
   notificar mudança de tab visitada, sem disparar o efeito ao
   carregar a página.

   Equivalente conceitual ao componentDidUpdate de classes.

   Exemplo:
     useUpdateEffect(() => {
       toast(`Tema mudou para ${theme}`);
     }, [theme]);
   ================================================================ */

export function useUpdateEffect(
  effect: EffectCallback,
  deps?: DependencyList
): void {
  const isFirst = useRef(true);
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
