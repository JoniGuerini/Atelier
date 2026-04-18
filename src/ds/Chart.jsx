import { useState } from "react";

/* ================================================================
   Chart — visualizações editoriais.
   ----------------------------------------------------------------
   Filosofia:
     · SVG puro, zero dependências externas.
     · Reage ao tema (var(--accent), var(--ink-faint), var(--ink)) —
       funciona automaticamente dentro do Studio.
     · Mínimo de cromo: sem grids cheias, sem hatching, sem áreas
       opacas. Acento usado com parcimônia (apenas no item destacado).
     · Composable. Wrappers `<Chart>` / `<ChartHeader>` / `<ChartLegend>`
       são opcionais — cada chart funciona standalone também.
     · Tooltips ao passar o mouse — bloco mono pequeno, fiel à voz
       editorial do Atelier.

   Exemplos:
     <Chart>
       <ChartHeader>
         <ChartKicker>Q2 · 2026</ChartKicker>
         <ChartTitle>Engajamento</ChartTitle>
       </ChartHeader>
       <BarChart data={[42, 58, 35, 72]} labels={["Jan","Fev","Mar","Abr"]} />
       <ChartLegend>
         <ChartLegendItem color="var(--accent)" label="Atual" />
         <ChartLegendItem color="var(--ink-faint)" label="Anterior" />
       </ChartLegend>
     </Chart>
   ================================================================ */

/* ---------- Wrappers composable ---------- */

export function Chart({ children, className = "" }) {
  const cls = ["ds-chart"];
  if (className) cls.push(className);
  return <article className={cls.join(" ")}>{children}</article>;
}

export function ChartHeader({ children }) {
  return <header className="ds-chart-head">{children}</header>;
}

export function ChartKicker({ children }) {
  return <span className="ds-chart-kicker">{children}</span>;
}

export function ChartTitle({ children, as: Comp = "h3" }) {
  return <Comp className="ds-chart-title">{children}</Comp>;
}

export function ChartLegend({ children }) {
  return <div className="ds-chart-legend">{children}</div>;
}

export function ChartLegendItem({ color = "var(--accent)", shape = "square", label }) {
  return (
    <span className="ds-chart-legend-item">
      <span
        className={`ds-chart-legend-mark ${shape}`}
        style={{ background: color }}
        aria-hidden="true"
      />
      <span className="ds-chart-legend-label">{label}</span>
    </span>
  );
}

/* ================================================================
   Helpers internos
   ================================================================ */

function normalizeData(data) {
  // Aceita number[] ou { label, value }[]
  return data.map((d, i) => {
    if (typeof d === "number") return { label: undefined, value: d, index: i };
    return { label: d.label, value: d.value, index: i };
  });
}

function pad(n, p = 0) {
  return Math.max(0, Number.isFinite(n) ? n : 0).toFixed(p);
}

function polarToCartesian(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

/* ================================================================
   ChartFrame — wrapper relative que sustenta um tooltip absoluto
   posicionado por % sobre o SVG. Usado internamente por todos os
   charts que reagem a hover.
================================================================ */

function ChartFrame({ children, tooltip }) {
  return (
    <div className="ds-chart-frame">
      {children}
      {tooltip && (
        <div
          className="ds-chart-tooltip"
          style={{
            left: `${tooltip.xPct}%`,
            top: `${tooltip.yPct}%`,
          }}
          role="tooltip"
        >
          <span className="ds-chart-tooltip-label">{tooltip.label}</span>
          <span className="ds-chart-tooltip-value">{tooltip.value}</span>
          {tooltip.sub && (
            <span className="ds-chart-tooltip-sub">{tooltip.sub}</span>
          )}
        </div>
      )}
    </div>
  );
}

function arcPath(cx, cy, r, startDeg, endDeg, innerR = 0) {
  // Trata ângulo total = 360 (1 fatia) com dois arcos para evitar zero-length
  const sweep = endDeg - startDeg;
  if (sweep >= 359.999) {
    if (innerR > 0) {
      return [
        `M ${cx} ${cy - r}`,
        `A ${r} ${r} 0 1 1 ${cx} ${cy + r}`,
        `A ${r} ${r} 0 1 1 ${cx} ${cy - r}`,
        `Z`,
        `M ${cx} ${cy - innerR}`,
        `A ${innerR} ${innerR} 0 1 0 ${cx} ${cy + innerR}`,
        `A ${innerR} ${innerR} 0 1 0 ${cx} ${cy - innerR}`,
        `Z`,
      ].join(" ");
    }
    return [
      `M ${cx} ${cy - r}`,
      `A ${r} ${r} 0 1 1 ${cx} ${cy + r}`,
      `A ${r} ${r} 0 1 1 ${cx} ${cy - r}`,
      `Z`,
    ].join(" ");
  }
  const start = polarToCartesian(cx, cy, r, endDeg);
  const end = polarToCartesian(cx, cy, r, startDeg);
  const largeArc = sweep <= 180 ? 0 : 1;
  if (innerR > 0) {
    const startInner = polarToCartesian(cx, cy, innerR, endDeg);
    const endInner = polarToCartesian(cx, cy, innerR, startDeg);
    return [
      `M ${start.x} ${start.y}`,
      `A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`,
      `L ${endInner.x} ${endInner.y}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 1 ${startInner.x} ${startInner.y}`,
      `Z`,
    ].join(" ");
  }
  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`,
    `Z`,
  ].join(" ");
}

/* ================================================================
   BarChart — barras verticais.
   ================================================================ */

export function BarChart({
  data,
  labels,
  height = 220,
  accentIndex,
  showValues = false,
  yTicks = 4,
  valueLabel,
  className = "",
}) {
  const norm = normalizeData(data);
  // viewBox alongado (W >> H) e preserveAspectRatio padrão fazem o
  // SVG manter proporção quando o container é largo, evitando o
  // "achatamento" do desenho.
  const W = 720;
  const H = height;
  const padL = 38;
  const padR = 12;
  const padT = 14;
  const padB = labels?.length ? 32 : 14;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const max = Math.max(...norm.map((d) => d.value), 1);
  const barW = (innerW / norm.length) * 0.66;
  const gap = (innerW / norm.length) * 0.34;

  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => {
    const v = (max / yTicks) * i;
    const y = padT + innerH - (v / max) * innerH;
    return { v, y };
  });

  const accent = accentIndex ?? norm.length - 1;

  const [hover, setHover] = useState(null);
  const tooltip = hover != null
    ? (() => {
        const d = norm[hover];
        const h = (d.value / max) * innerH;
        const x = padL + hover * (barW + gap) + gap / 2 + barW / 2;
        const y = padT + innerH - h;
        return {
          xPct: (x / W) * 100,
          yPct: (y / H) * 100,
          label: labels?.[hover] || `#${hover + 1}`,
          value: pad(d.value),
          sub: valueLabel,
        };
      })()
    : null;

  return (
    <ChartFrame tooltip={tooltip}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={`ds-chart-svg ${className}`}
        style={{ width: "100%", height: "auto" }}
        role="img"
        onMouseLeave={() => setHover(null)}
      >
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={padL}
            x2={W - padR}
            y1={t.y}
            y2={t.y}
            stroke="var(--rule-faint)"
            strokeWidth="1"
          />
        ))}
        {ticks.map((t, i) => (
          <text
            key={`l${i}`}
            x={padL - 8}
            y={t.y + 4}
            textAnchor="end"
            fontFamily="var(--font-mono)"
            fontSize="11"
            fill="var(--ink-faint)"
          >
            {Math.round(t.v)}
          </text>
        ))}
        {norm.map((d, i) => {
          const h = (d.value / max) * innerH;
          const x = padL + i * (barW + gap) + gap / 2;
          const y = padT + innerH - h;
          const isAccent = i === accent;
          const isHover = i === hover;
          return (
            <g
              key={i}
              onMouseEnter={() => setHover(i)}
              style={{ cursor: "pointer" }}
            >
              {/* hover hit area (full column, easy to grab) */}
              <rect
                x={padL + i * (barW + gap)}
                y={padT}
                width={barW + gap}
                height={innerH + padB - 14}
                fill="transparent"
              />
              <rect
                x={x}
                y={y}
                width={barW}
                height={Math.max(h, 1)}
                fill={isAccent ? "var(--accent)" : "var(--ink-faint)"}
                opacity={hover != null && !isHover ? 0.45 : 1}
                style={{ transition: "opacity 120ms ease" }}
              />
              {showValues && (
                <text
                  x={x + barW / 2}
                  y={y - 6}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize="11"
                  fill={isAccent ? "var(--accent)" : "var(--ink-soft)"}
                >
                  {pad(d.value)}
                </text>
              )}
              {labels && labels[i] && (
                <text
                  x={x + barW / 2}
                  y={H - 10}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize="11"
                  fill={isHover ? "var(--ink)" : "var(--ink-faint)"}
                  style={{ letterSpacing: "0.1em", transition: "fill 120ms ease" }}
                >
                  {labels[i]}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
}

/* ================================================================
   LineChart — linha simples.
   ================================================================ */

function buildLinePath(values, padL, padT, innerW, innerH, max, min) {
  const range = max - min || 1;
  const stepX = innerW / Math.max(1, values.length - 1);
  return values
    .map((v, i) => {
      const x = padL + i * stepX;
      const y = padT + innerH - ((v - min) / range) * innerH;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

export function LineChart({
  data,
  labels,
  height = 220,
  yTicks = 4,
  showDots = true,
  accentIndex,
  valueLabel,
  className = "",
}) {
  const norm = normalizeData(data);
  const values = norm.map((d) => d.value);
  const W = 720;
  const H = height;
  const padL = 38;
  const padR = 12;
  const padT = 14;
  const padB = labels?.length ? 32 : 14;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const max = Math.max(...values, 1);
  const min = Math.min(0, ...values);
  const range = max - min || 1;
  const stepX = innerW / Math.max(1, values.length - 1);

  const path = buildLinePath(values, padL, padT, innerW, innerH, max, min);

  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => {
    const v = min + (range / yTicks) * i;
    const y = padT + innerH - ((v - min) / range) * innerH;
    return { v, y };
  });

  const accent = accentIndex ?? values.length - 1;
  const [hover, setHover] = useState(null);

  // Calcula o índice mais próximo do mouse via getBoundingClientRect.
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPx = e.clientX - rect.left;
    const xRatio = xPx / rect.width; // 0..1 dentro do svg
    const xSvg = xRatio * W;
    // converte para índice (com clamp)
    const xInner = xSvg - padL;
    const idx = Math.round(xInner / stepX);
    if (idx >= 0 && idx < values.length) setHover(idx);
  };

  const tooltip = hover != null
    ? (() => {
        const v = values[hover];
        const x = padL + hover * stepX;
        const y = padT + innerH - ((v - min) / range) * innerH;
        return {
          xPct: (x / W) * 100,
          yPct: (y / H) * 100,
          label: labels?.[hover] || `#${hover + 1}`,
          value: pad(v),
          sub: valueLabel,
        };
      })()
    : null;

  return (
    <ChartFrame tooltip={tooltip}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={`ds-chart-svg ${className}`}
        style={{ width: "100%", height: "auto" }}
        role="img"
        onMouseMove={handleMove}
        onMouseLeave={() => setHover(null)}
      >
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={padL}
            x2={W - padR}
            y1={t.y}
            y2={t.y}
            stroke="var(--rule-faint)"
            strokeWidth="1"
          />
        ))}
        {ticks.map((t, i) => (
          <text
            key={`l${i}`}
            x={padL - 8}
            y={t.y + 4}
            textAnchor="end"
            fontFamily="var(--font-mono)"
            fontSize="11"
            fill="var(--ink-faint)"
          >
            {Math.round(t.v)}
          </text>
        ))}
        {/* guideline vertical no hover */}
        {hover != null && (
          <line
            x1={padL + hover * stepX}
            x2={padL + hover * stepX}
            y1={padT}
            y2={padT + innerH}
            stroke="var(--ink-faint)"
            strokeDasharray="2 3"
            strokeWidth="1"
          />
        )}
        <path
          d={path}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {showDots &&
          values.map((v, i) => {
            const x = padL + i * stepX;
            const y = padT + innerH - ((v - min) / range) * innerH;
            const isAccent = i === accent;
            const isHover = i === hover;
            const r = isHover ? 6 : isAccent ? 5 : 3;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={r}
                fill={isAccent || isHover ? "var(--accent)" : "var(--bg-panel)"}
                stroke="var(--accent)"
                strokeWidth="1.75"
                style={{ transition: "r 120ms ease" }}
              />
            );
          })}
        {labels &&
          labels.map((l, i) => (
            <text
              key={i}
              x={padL + i * stepX}
              y={H - 10}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="11"
              fill={i === hover ? "var(--ink)" : "var(--ink-faint)"}
              style={{ letterSpacing: "0.1em", transition: "fill 120ms ease" }}
            >
              {l}
            </text>
          ))}
      </svg>
    </ChartFrame>
  );
}

/* ================================================================
   AreaChart — linha + área preenchida abaixo.
   ================================================================ */

export function AreaChart({
  data,
  labels,
  height = 220,
  yTicks = 4,
  valueLabel,
  className = "",
}) {
  const norm = normalizeData(data);
  const values = norm.map((d) => d.value);
  const W = 720;
  const H = height;
  const padL = 38;
  const padR = 12;
  const padT = 14;
  const padB = labels?.length ? 32 : 14;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const max = Math.max(...values, 1);
  const min = Math.min(0, ...values);
  const range = max - min || 1;
  const stepX = innerW / Math.max(1, values.length - 1);

  const linePath = buildLinePath(values, padL, padT, innerW, innerH, max, min);
  const areaPath = `${linePath} L ${padL + (values.length - 1) * stepX} ${
    padT + innerH
  } L ${padL} ${padT + innerH} Z`;

  const gradId = `ds-area-grad-${Math.random().toString(36).slice(2, 8)}`;

  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => {
    const v = min + (range / yTicks) * i;
    const y = padT + innerH - ((v - min) / range) * innerH;
    return { v, y };
  });

  const [hover, setHover] = useState(null);
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const xSvg = xRatio * W;
    const idx = Math.round((xSvg - padL) / stepX);
    if (idx >= 0 && idx < values.length) setHover(idx);
  };

  const tooltip = hover != null
    ? (() => {
        const v = values[hover];
        const x = padL + hover * stepX;
        const y = padT + innerH - ((v - min) / range) * innerH;
        return {
          xPct: (x / W) * 100,
          yPct: (y / H) * 100,
          label: labels?.[hover] || `#${hover + 1}`,
          value: pad(v),
          sub: valueLabel,
        };
      })()
    : null;

  return (
    <ChartFrame tooltip={tooltip}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={`ds-chart-svg ${className}`}
        style={{ width: "100%", height: "auto" }}
        role="img"
        onMouseMove={handleMove}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={padL}
            x2={W - padR}
            y1={t.y}
            y2={t.y}
            stroke="var(--rule-faint)"
            strokeWidth="1"
          />
        ))}
        {ticks.map((t, i) => (
          <text
            key={`l${i}`}
            x={padL - 8}
            y={t.y + 4}
            textAnchor="end"
            fontFamily="var(--font-mono)"
            fontSize="11"
            fill="var(--ink-faint)"
          >
            {Math.round(t.v)}
          </text>
        ))}
        {hover != null && (
          <line
            x1={padL + hover * stepX}
            x2={padL + hover * stepX}
            y1={padT}
            y2={padT + innerH}
            stroke="var(--ink-faint)"
            strokeDasharray="2 3"
            strokeWidth="1"
          />
        )}
        <path d={areaPath} fill={`url(#${gradId})`} />
        <path
          d={linePath}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {hover != null && (
          <circle
            cx={padL + hover * stepX}
            cy={padT + innerH - ((values[hover] - min) / range) * innerH}
            r="5"
            fill="var(--accent)"
            stroke="var(--bg-panel)"
            strokeWidth="2"
          />
        )}
        {labels &&
          labels.map((l, i) => (
            <text
              key={i}
              x={padL + i * stepX}
              y={H - 10}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="11"
              fill={i === hover ? "var(--ink)" : "var(--ink-faint)"}
              style={{ letterSpacing: "0.1em", transition: "fill 120ms ease" }}
            >
              {l}
            </text>
          ))}
      </svg>
    </ChartFrame>
  );
}

/* ================================================================
   PieChart e DonutChart
   ================================================================ */

const SLICE_TONES = [
  "var(--accent)",
  "var(--ink)",
  "var(--ink-soft)",
  "var(--ink-faint)",
  "var(--accent-ink)",
  "var(--accent-soft)",
];

function PieOrDonut({ data, height = 200, donut = false, className = "" }) {
  const norm = normalizeData(data);
  const total = norm.reduce((s, d) => s + d.value, 0) || 1;
  const W = height; // square
  const H = height;
  const cx = W / 2;
  const cy = H / 2;
  const r = (Math.min(W, H) / 2) * 0.92;
  const innerR = donut ? r * 0.56 : 0;

  let startDeg = 0;
  const slices = norm.map((d, i) => {
    const sweep = (d.value / total) * 360;
    const midDeg = startDeg + sweep / 2;
    const path = arcPath(cx, cy, r, startDeg, startDeg + sweep, innerR);
    // posição "no meio" da fatia, a meio caminho entre o centro e a borda
    const tipR = donut ? (innerR + r) / 2 : r * 0.55;
    const tip = polarToCartesian(cx, cy, tipR, midDeg);
    const slice = {
      path,
      color: SLICE_TONES[i % SLICE_TONES.length],
      label: d.label,
      value: d.value,
      pct: (d.value / total) * 100,
      tip,
    };
    startDeg += sweep;
    return slice;
  });

  const [hover, setHover] = useState(null);
  const tooltip = hover != null
    ? {
        xPct: (slices[hover].tip.x / W) * 100,
        yPct: (slices[hover].tip.y / H) * 100,
        label: slices[hover].label || `#${hover + 1}`,
        value: pad(slices[hover].value),
        sub: `${slices[hover].pct.toFixed(1)} %`,
      }
    : null;

  return (
    <ChartFrame tooltip={tooltip}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={`ds-chart-svg ${className}`}
        style={{ width: H, height: H }}
        role="img"
        onMouseLeave={() => setHover(null)}
      >
        {slices.map((s, i) => (
          <path
            key={i}
            d={s.path}
            fill={s.color}
            stroke="var(--bg-panel)"
            strokeWidth="1.5"
            opacity={hover != null && hover !== i ? 0.55 : 1}
            style={{ transition: "opacity 120ms ease", cursor: "pointer" }}
            onMouseEnter={() => setHover(i)}
          />
        ))}
        {donut && (
          <text
            x={cx}
            y={cy + 4}
            textAnchor="middle"
            fontFamily="var(--font-serif)"
            fontSize={Math.round(H * 0.12)}
            fontWeight="300"
            fill="var(--ink)"
            pointerEvents="none"
          >
            {Math.round(total)}
          </text>
        )}
      </svg>
    </ChartFrame>
  );
}

export function PieChart(props) {
  return <PieOrDonut {...props} donut={false} />;
}

export function DonutChart(props) {
  return <PieOrDonut {...props} donut={true} />;
}

/* ================================================================
   Sparkline — micro line, sem axes, ideal pra inline em métricas.
   ================================================================ */

export function Sparkline({
  data,
  width = 120,
  height = 36,
  filled = false,
  className = "",
}) {
  const norm = normalizeData(data);
  const values = norm.map((d) => d.value);
  const W = width;
  const H = height;
  const padX = 2;
  const padY = 4;
  const innerW = W - padX * 2;
  const innerH = H - padY * 2;
  const max = Math.max(...values, 1);
  const min = Math.min(0, ...values);
  const range = max - min || 1;
  const stepX = innerW / Math.max(1, values.length - 1);

  const linePath = values
    .map((v, i) => {
      const x = padX + i * stepX;
      const y = padY + innerH - ((v - min) / range) * innerH;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const areaPath = filled
    ? `${linePath} L ${padX + (values.length - 1) * stepX} ${
        padY + innerH
      } L ${padX} ${padY + innerH} Z`
    : null;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
      className={`ds-chart-svg ds-chart-spark ${className}`}
      role="img"
      aria-label="trend"
    >
      {areaPath && <path d={areaPath} fill="var(--accent-soft)" />}
      <path
        d={linePath}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
