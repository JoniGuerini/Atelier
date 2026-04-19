import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

/* ================================================================
   RangeSlider — slider numérico com 1 ou 2 handles.
   ----------------------------------------------------------------
   Single (default):
     <RangeSlider min={0} max={100} value={42} onChange={setVal} />

   Dual (range):
     <RangeSlider
       min={0} max={100}
       value={[20, 80]}
       onChange={setRange}
     />

   Behavior:
     · Click/drag em qualquer ponto do track move o handle mais próximo
     · Keyboard: ← → ajustam por step; Shift+← Shift+→ por step*10;
       Home/End vão pro min/max
     · Marks/ticks opcionais (números fixos no eixo)
     · valueLabel — label flutuante acima do handle ao arrastar
       (ou sempre, com showValue="always")
     · Vertical opcional (orientation="vertical")
================================================================ */

export type SliderValue = number | [number, number];

interface CommonProps {
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  /** Marcas no track. Ex: [0, 25, 50, 75, 100]. */
  marks?: number[];
  /** Mostra label do valor. "always" | "active" (drag/focus) | "never". */
  showValue?: "always" | "active" | "never";
  /** Função pra formatar o label. Default: String(n). */
  formatValue?: (v: number) => string;
  /** Orientação. Default: horizontal. */
  orientation?: "horizontal" | "vertical";
  /** Comprimento da dimensão principal (ms vertical: altura; horiz: width). */
  size?: number | string;
  className?: string;
  id?: string;
  ariaLabel?: string;
}

export interface RangeSliderSingleProps extends CommonProps {
  value: number;
  onChange: (value: number) => void;
}

export interface RangeSliderDualProps extends CommonProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export type RangeSliderProps = RangeSliderSingleProps | RangeSliderDualProps;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function snap(v: number, step: number, min: number) {
  if (!step) return v;
  const offset = v - min;
  return min + Math.round(offset / step) * step;
}

export function RangeSlider(props: RangeSliderProps) {
  const {
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    marks,
    showValue = "active",
    formatValue = (v) => String(v),
    orientation = "horizontal",
    size,
    className = "",
    id,
    ariaLabel,
  } = props;

  const trackRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef<{ index: number; pointerId: number } | null>(
    null,
  );
  const baseId = useId();

  const isDual = Array.isArray(props.value);
  const values: number[] = isDual
    ? [(props.value as [number, number])[0], (props.value as [number, number])[1]]
    : [props.value as number];

  const setValues = useCallback(
    (next: number[]) => {
      if (isDual) {
        const sorted = [...next].sort((a, b) => a - b) as [number, number];
        (props as RangeSliderDualProps).onChange(sorted);
      } else {
        (props as RangeSliderSingleProps).onChange(next[0]);
      }
    },
    [isDual, props],
  );

  /* ---------- conversões ---------- */
  const range = max - min || 1;
  const toPercent = useCallback(
    (v: number) => ((v - min) / range) * 100,
    [min, range],
  );

  const fromClient = useCallback(
    (clientX: number, clientY: number): number => {
      const track = trackRef.current;
      if (!track) return min;
      const rect = track.getBoundingClientRect();
      let pct: number;
      if (orientation === "vertical") {
        pct = 1 - (clientY - rect.top) / rect.height;
      } else {
        pct = (clientX - rect.left) / rect.width;
      }
      pct = clamp(pct, 0, 1);
      return snap(min + pct * range, step, min);
    },
    [orientation, min, range, step],
  );

  /* ---------- drag ---------- */
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    const v = fromClient(e.clientX, e.clientY);
    // Em dual, escolhe o handle mais próximo
    let idx = 0;
    if (isDual) {
      idx = Math.abs(v - values[0]) <= Math.abs(v - values[1]) ? 0 : 1;
    }
    const next = [...values];
    next[idx] = clamp(v, min, max);
    setValues(next);
    draggingRef.current = { index: idx, pointerId: e.pointerId };
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = draggingRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    const v = fromClient(e.clientX, e.clientY);
    const next = [...values];
    next[drag.index] = clamp(v, min, max);
    setValues(next);
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = draggingRef.current;
    if (drag && drag.pointerId === e.pointerId) {
      draggingRef.current = null;
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    }
  };

  /* ---------- keyboard ---------- */
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>, idx: number) => {
    if (disabled) return;
    let delta = 0;
    const big = step * 10;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") delta = -step;
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") delta = step;
    else if (e.key === "PageDown") delta = -big;
    else if (e.key === "PageUp") delta = big;
    else if (e.key === "Home") {
      e.preventDefault();
      const next = [...values];
      next[idx] = min;
      setValues(next);
      return;
    } else if (e.key === "End") {
      e.preventDefault();
      const next = [...values];
      next[idx] = max;
      setValues(next);
      return;
    }
    if (delta !== 0) {
      e.preventDefault();
      if (e.shiftKey) delta *= 10;
      const next = [...values];
      next[idx] = clamp(next[idx] + delta, min, max);
      setValues(next);
    }
  };

  /* ---------- estilos ---------- */
  const cls = ["ds-slider", `orientation-${orientation}`];
  if (disabled) cls.push("disabled");
  if (className) cls.push(className);

  const lowPct = isDual ? toPercent(Math.min(values[0], values[1])) : 0;
  const highPct = isDual
    ? toPercent(Math.max(values[0], values[1]))
    : toPercent(values[0]);

  const fillStyle: CSSProperties =
    orientation === "vertical"
      ? {
          bottom: `${lowPct}%`,
          height: `${highPct - lowPct}%`,
        }
      : {
          left: `${lowPct}%`,
          width: `${highPct - lowPct}%`,
        };

  const trackStyle: CSSProperties =
    orientation === "vertical"
      ? { height: size ?? 200 }
      : { width: size ?? "100%" };

  return (
    <div className={cls.join(" ")} style={trackStyle}>
      <div
        ref={trackRef}
        className="ds-slider-track"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="ds-slider-fill" style={fillStyle} />
        {marks &&
          marks.map((m) => {
            if (m < min || m > max) return null;
            const p = toPercent(m);
            const style: CSSProperties =
              orientation === "vertical"
                ? { bottom: `${p}%` }
                : { left: `${p}%` };
            return <span key={m} className="ds-slider-mark" style={style} />;
          })}
        {values.map((v, i) => {
          const p = toPercent(v);
          const handleStyle: CSSProperties =
            orientation === "vertical"
              ? { bottom: `${p}%` }
              : { left: `${p}%` };
          return (
            <div
              key={i}
              id={id ? `${id}-handle-${i}` : `${baseId}-handle-${i}`}
              role="slider"
              aria-label={ariaLabel}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={v}
              aria-orientation={orientation}
              aria-disabled={disabled || undefined}
              tabIndex={disabled ? -1 : 0}
              className="ds-slider-handle"
              style={handleStyle}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {showValue !== "never" && (
                <span
                  className={`ds-slider-value ${
                    showValue === "always" ? "always" : ""
                  }`}
                  aria-hidden="true"
                >
                  {formatValue(v)}
                </span>
              )}
            </div>
          );
        })}
      </div>
      {marks && marks.length > 0 && orientation === "horizontal" && (
        <div className="ds-slider-marks-labels">
          {marks.map((m) => {
            if (m < min || m > max) return null;
            const p = toPercent(m);
            return (
              <span
                key={m}
                className="ds-slider-mark-label"
                style={{ left: `${p}%` }}
              >
                {formatValue(m)}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
