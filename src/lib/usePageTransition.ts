import { useEffect, useRef } from "react";

/* ================================================================
   usePageTransition — Roadmap · fase 4.3
   ----------------------------------------------------------------
   Hook leve consumido pelo router caseiro em App.tsx. Em vez de
   uma máquina de estado complexa de enter/exit, usamos a estratégia
   declarativa do React: mudar a key remonta a árvore. CSS faz a
   animação na entrada.

   Variantes:
     - "fade" (default editorial): opacity 0 → 1
     - "slide-up": translate Y(8px) → 0 + opacity
     - "cross-fade": fade simultâneo (sem hold)

   Persistência de scroll opt-in: salva window.scrollY por slug em
   sessionStorage, restaura ao voltar. Off por padrão — scroll-to-top
   é o comportamento esperado de "manual editorial".
   ================================================================ */

export type PageTransitionVariant = "fade" | "slide-up" | "cross-fade" | "none";

export interface UsePageTransitionOptions {
  variant?: PageTransitionVariant;
  /** Persistir scrollY por slug em sessionStorage (off default). */
  persistScroll?: boolean;
}

const SCROLL_KEY_PREFIX = "atelier.scroll:";

export interface PageTransitionResult {
  /** Use como `key` no componente de página — força remount em troca. */
  key: string;
  /** Use como `data-variant` no main — CSS reage para animar. */
  variant: PageTransitionVariant;
}

export function usePageTransition(
  current: string,
  options: UsePageTransitionOptions = {}
): PageTransitionResult {
  const { variant = "fade", persistScroll = false } = options;
  const previous = useRef<string>(current);

  /* Persistência de scroll opcional */
  useEffect(() => {
    if (!persistScroll) return;
    if (typeof window === "undefined") return;
    const prevSlug = previous.current;

    /* Salva scroll do anterior antes de trocar */
    if (prevSlug && prevSlug !== current) {
      try {
        sessionStorage.setItem(
          SCROLL_KEY_PREFIX + prevSlug,
          String(window.scrollY)
        );
      } catch {
        /* sessionStorage indisponível — silencia */
      }
    }

    /* Restaura scroll do novo (se existir) — depois da animação ter
       começado, num próximo frame, pra não conflitar com o scroll-to-top
       do useHashRoute. */
    if (current !== prevSlug) {
      try {
        const saved = sessionStorage.getItem(SCROLL_KEY_PREFIX + current);
        if (saved !== null) {
          requestAnimationFrame(() => {
            window.scrollTo({ top: parseInt(saved, 10), behavior: "auto" });
          });
        }
      } catch {
        /* ignore */
      }
    }

    previous.current = current;
  }, [current, persistScroll]);

  return {
    key: current,
    variant,
  };
}
