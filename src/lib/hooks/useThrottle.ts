import { useEffect, useRef, useState } from "react";

/* ================================================================
   useThrottle (Roadmap · fase 10.3)
   ----------------------------------------------------------------
   Limita a publicação de um valor a no máximo uma atualização
   a cada `delay` ms. Diferente de debounce: NÃO espera a quietude,
   garante throughput máximo. Padrão para scroll handlers, mouse
   move tracking, qualquer evento high-frequency.

   Exemplo:
     const { width } = useWindowSize();
     const throttled = useThrottle(width, 200);
     // throttled atualiza no máximo 5x por segundo
   ================================================================ */

export function useThrottle<T>(value: T, delay: number = 300): T {
  const [throttled, setThrottled] = useState<T>(value);
  const lastRun = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const elapsed = now - lastRun.current;
    if (elapsed >= delay) {
      lastRun.current = now;
      setThrottled(value);
      return;
    }
    const id = setTimeout(() => {
      lastRun.current = Date.now();
      setThrottled(value);
    }, delay - elapsed);
    return () => clearTimeout(id);
  }, [value, delay]);

  return throttled;
}
