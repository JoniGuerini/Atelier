import { useEffect } from "react";

/* ================================================================
   useScrollLock (Roadmap · fase 10.2)
   ----------------------------------------------------------------
   Trava o scroll do <body> enquanto `active === true`. Restaura
   ao desmontar ou ao virar `false`.

   Suporta múltiplas chamadas simultâneas (ex: dialog dentro de
   drawer): mantém um contador interno e só destrava quando o
   último consumidor solta. Sem isso, fechar o overlay interno
   destravaria o externo prematuramente.

   Implementação:
     - salva overflow original do body
     - aplica overflow: hidden enquanto contador > 0
     - preserva scrollY (compensa via padding-right pra não
       saltar layout quando a scrollbar some)

   SSR-safe: noop no server.
   ================================================================ */

let lockCount = 0;
let originalOverflow: string | null = null;
let originalPaddingRight: string | null = null;

function lock() {
  if (typeof document === "undefined") return;
  if (lockCount === 0) {
    const body = document.body;
    originalOverflow = body.style.overflow;
    originalPaddingRight = body.style.paddingRight;
    /* compensa largura da scrollbar pra não dar layout shift */
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
    body.style.overflow = "hidden";
  }
  lockCount += 1;
}

function unlock() {
  if (typeof document === "undefined") return;
  if (lockCount === 0) return;
  lockCount -= 1;
  if (lockCount === 0) {
    const body = document.body;
    body.style.overflow = originalOverflow ?? "";
    body.style.paddingRight = originalPaddingRight ?? "";
    originalOverflow = null;
    originalPaddingRight = null;
  }
}

export function useScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    lock();
    return () => unlock();
  }, [active]);
}
