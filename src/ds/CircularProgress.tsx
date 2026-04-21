/* ================================================================
   CircularProgress — anel de progresso (Fase 15.3)
   ----------------------------------------------------------------
   Valor 0–100, SVG stroke-dasharray. Sem deps.
   ================================================================ */

export interface CircularProgressProps {
  value: number;
  /** Diâmetro em px (viewBox escala com ele). */
  size?: number;
  strokeWidth?: number;
  /** Texto central (ex.: "72%"). Se omitido, mostra valor arredondado. */
  label?: string;
  className?: string;
  "aria-label"?: string;
}

export function CircularProgress({
  value,
  size = 56,
  strokeWidth = 4,
  label,
  className = "",
  "aria-label": ariaLabel,
}: CircularProgressProps) {
  const pct = Math.max(0, Math.min(100, value));
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const dash = (pct / 100) * c;
  const gap = c - dash;
  const center = size / 2;
  const text = label ?? `${Math.round(pct)}%`;

  return (
    <div
      className={`ds-circular-progress ${className}`.trim()}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle
          className="ds-circular-progress-track"
          cx={center}
          cy={center}
          r={r}
          fill="none"
          strokeWidth={strokeWidth}
        />
        <circle
          className="ds-circular-progress-bar"
          cx={center}
          cy={center}
          r={r}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={`${dash} ${gap}`}
          strokeLinecap="butt"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      <span className="ds-circular-progress-label">{text}</span>
    </div>
  );
}
