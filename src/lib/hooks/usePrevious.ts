import { useEffect, useRef } from "react";

/* ================================================================
   usePrevious (Roadmap · fase 10.3)
   ----------------------------------------------------------------
   Retorna o valor de `value` no render anterior, ou undefined no
   primeiro. Útil para detectar transições — ex: animar quando um
   contador cresce, comparar antes/depois em useEffect.

   Exemplo:
     const prev = usePrevious(count);
     useEffect(() => {
       if (prev !== undefined && count > prev) playSound();
     }, [count, prev]);
   ================================================================ */

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
