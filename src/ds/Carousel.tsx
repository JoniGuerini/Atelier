import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { useT } from "../lib/i18n.tsx";

/* ================================================================
   Carousel — slides horizontais com navegação prev/next, dots
   indicadores, auto-play opcional e swipe touch.
   ----------------------------------------------------------------
   API:
     <Carousel autoPlay loop>
       <CarouselSlide>…</CarouselSlide>
       <CarouselSlide>…</CarouselSlide>
       <CarouselSlide>…</CarouselSlide>
     </Carousel>

   Props principais:
     · loop — ao chegar no fim, volta pro começo (default: false)
     · autoPlay — avança automaticamente (default: false)
     · interval — ms entre auto-advances (default: 5000)
     · showDots — indicadores embaixo (default: true)
     · showArrows — botões prev/next (default: true)
     · transition — "slide" (default) | "fade"

   Behavior:
     · Touch swipe (PointerEvents) — mín 30px de movimento
     · Keyboard: ← → navega quando o carousel tem foco
     · Auto-play pausa em hover/focus (como Toaster)
     · Respeita prefers-reduced-motion (transição instantânea)
================================================================ */

export type CarouselTransition = "slide" | "fade";

export interface CarouselProps {
  children?: ReactNode;
  /** Loop infinito (default: false). */
  loop?: boolean;
  /** Avança automaticamente. Default: false. */
  autoPlay?: boolean;
  /** ms entre advances quando autoPlay. Default: 5000. */
  interval?: number;
  /** Mostra dots indicadores. Default: true. */
  showDots?: boolean;
  /** Mostra setas prev/next. Default: true. */
  showArrows?: boolean;
  /** Tipo de transição visual. Default: "slide". */
  transition?: CarouselTransition;
  /** Slide inicial (controlado externamente se quiser). */
  defaultIndex?: number;
  /** Callback quando o slide muda. */
  onChange?: (index: number) => void;
  className?: string;
  ariaLabel?: string;
}

export function Carousel({
  children,
  loop = false,
  autoPlay = false,
  interval = 5000,
  showDots = true,
  showArrows = true,
  transition = "slide",
  defaultIndex = 0,
  onChange,
  className = "",
  ariaLabel,
}: CarouselProps) {
  const { t } = useT();
  const slides = Array.isArray(children) ? children.filter(Boolean) : [children];
  const total = slides.length;
  const [idx, setIdx] = useState(Math.min(defaultIndex, total - 1));
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ x: number; pointerId: number } | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  const goTo = useCallback(
    (n: number) => {
      let next = n;
      if (loop) {
        next = ((n % total) + total) % total;
      } else {
        next = Math.max(0, Math.min(total - 1, n));
      }
      setIdx(next);
      onChange?.(next);
    },
    [loop, total, onChange],
  );

  const goPrev = useCallback(() => goTo(idx - 1), [idx, goTo]);
  const goNext = useCallback(() => goTo(idx + 1), [idx, goTo]);

  /* ---- Auto-play ---- */
  useEffect(() => {
    if (!autoPlay || isPaused || total <= 1) return;
    const timer = window.setTimeout(() => {
      goTo(loop ? idx + 1 : Math.min(idx + 1, total - 1));
      // Sem loop: para no último (não fica em loop infinito de timer)
    }, interval);
    return () => window.clearTimeout(timer);
  }, [autoPlay, isPaused, idx, total, loop, interval, goTo]);

  /* ---- Keyboard ---- */
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(total - 1);
    }
  };

  /* ---- Touch / mouse swipe (PointerEvents) ---- */
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (transition !== "slide" || total <= 1) return;
    dragRef.current = { x: e.clientX, pointerId: e.pointerId };
    setIsPaused(true);
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    setDragOffset(e.clientX - drag.x);
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    const dx = e.clientX - drag.x;
    const threshold = 30;
    if (dx > threshold) goPrev();
    else if (dx < -threshold) goNext();
    dragRef.current = null;
    setDragOffset(0);
    setIsPaused(false);
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  /* ---- Render ---- */
  const cls = ["ds-carousel", `transition-${transition}`];
  if (className) cls.push(className);

  // Cálculo do transform: cada slide ocupa 100% do width, então
  // translateX(-idx*100% + dragOffsetPx).
  const translatePct = -idx * 100;
  const trackStyle: React.CSSProperties =
    transition === "slide"
      ? {
          transform: `translateX(calc(${translatePct}% + ${dragOffset}px))`,
          transition: dragOffset !== 0
            ? "none"
            : `transform var(--dur) var(--ease)`,
        }
      : {};

  return (
    <div
      className={cls.join(" ")}
      role="region"
      aria-label={ariaLabel ?? t("ds.carousel.label")}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => autoPlay && setIsPaused(true)}
      onMouseLeave={() => autoPlay && setIsPaused(false)}
      onFocus={() => autoPlay && setIsPaused(true)}
      onBlur={() => autoPlay && setIsPaused(false)}
    >
      <div
        ref={trackRef}
        className="ds-carousel-viewport"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="ds-carousel-track" style={trackStyle}>
          {slides.map((slide, i) => {
            const isActive = i === idx;
            const slideCls = ["ds-carousel-slide"];
            if (isActive) slideCls.push("active");
            return (
              <div
                key={i}
                className={slideCls.join(" ")}
                role="group"
                aria-label={`${i + 1} / ${total}`}
                aria-hidden={!isActive}
                style={
                  transition === "fade"
                    ? { opacity: isActive ? 1 : 0 }
                    : undefined
                }
              >
                {slide}
              </div>
            );
          })}
        </div>
      </div>

      {showArrows && total > 1 && (
        <>
          <button
            type="button"
            className="ds-carousel-arrow prev"
            onClick={goPrev}
            disabled={!loop && idx === 0}
            aria-label={t("ds.carousel.prev")}
          >
            ‹
          </button>
          <button
            type="button"
            className="ds-carousel-arrow next"
            onClick={goNext}
            disabled={!loop && idx === total - 1}
            aria-label={t("ds.carousel.next")}
          >
            ›
          </button>
        </>
      )}

      {showDots && total > 1 && (
        <div className="ds-carousel-dots" role="tablist">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === idx}
              aria-label={`${t("ds.carousel.goTo")} ${i + 1}`}
              className={`ds-carousel-dot ${i === idx ? "active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------
   CarouselSlide — wrapper opcional (útil pra typing + future hooks).
---------------------------------------------------------------- */
export interface CarouselSlideProps {
  children?: ReactNode;
  className?: string;
}
export function CarouselSlide({ children, className = "" }: CarouselSlideProps) {
  const cls = ["ds-carousel-slide-content"];
  if (className) cls.push(className);
  return <div className={cls.join(" ")}>{children}</div>;
}
