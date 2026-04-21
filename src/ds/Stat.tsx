import type { ReactNode } from "react";
import { Sparkline } from "./Chart.tsx";

/* ================================================================
   Stat — cartão de métrica / KPI (Fase 15.3)
   ----------------------------------------------------------------
   Composição editorial: kicker, valor grande, delta opcional e
   Sparkline opcional no rodapé. Reutiliza Sparkline de Chart.
   ================================================================ */

export function Stat({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return <article className={`ds-stat ${className}`.trim()}>{children}</article>;
}

export function StatKicker({ children }: { children?: ReactNode }) {
  return <div className="ds-stat-kicker">{children}</div>;
}

export function StatLabel({ children }: { children?: ReactNode }) {
  return <div className="ds-stat-label">{children}</div>;
}

export function StatValue({ children }: { children?: ReactNode }) {
  return <div className="ds-stat-value">{children}</div>;
}

export type StatDeltaTrend = "up" | "down" | "neutral";

export function StatDelta({
  trend = "neutral",
  children,
}: {
  trend?: StatDeltaTrend;
  children?: ReactNode;
}) {
  return <div className={`ds-stat-delta trend-${trend}`}>{children}</div>;
}

export interface StatSparkProps {
  data: number[];
  width?: number;
  height?: number;
  filled?: boolean;
}

export function StatSpark({ data, width = 140, height = 40, filled = true }: StatSparkProps) {
  if (!data.length) return null;
  return (
    <div className="ds-stat-spark">
      <Sparkline data={data} width={width} height={height} filled={filled} />
    </div>
  );
}
