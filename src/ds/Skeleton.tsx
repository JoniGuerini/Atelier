import type { CSSProperties } from "react";
import type {
  SkeletonProps,
  SkeletonTextProps,
  SkeletonVariant,
} from "./types.ts";

interface ExtendedSkeletonProps extends Omit<SkeletonProps, "variant"> {
  /** "text" cai pro SkeletonText; "circle" pode cair pro SkeletonAvatar se size for passado. */
  variant?: SkeletonVariant | "text";
  /** Quando variant="text", número de linhas. */
  lines?: number;
}
interface SkeletonAvatarProps {
  size?: number | string;
  className?: string;
  pulse?: boolean;
  style?: CSSProperties;
}
interface SkeletonCardProps {
  className?: string;
}
interface InternalSkeletonTextProps extends SkeletonTextProps {
  pulse?: boolean;
}

/* ================================================================
   Skeleton — placeholders editoriais para estados de loading.
   ----------------------------------------------------------------
   Filosofia: nada de gradiente colorido pulsando como em libs
   genéricas. O Atelier usa um pulso silencioso de --rule-faint
   pra simular "tinta fresca" — paciência editorial, não pressa.

     <Skeleton />                       // bloco padrão
     <Skeleton width={120} height={20} />
     <Skeleton variant="circle" size={40} />
     <Skeleton variant="text" lines={3} />
     <SkeletonText lines={4} />
     <SkeletonAvatar size={48} />
     <SkeletonCard />
   ================================================================ */

export function Skeleton({
  variant = "rect",
  width,
  height,
  size,
  lines,
  className = "",
  pulse = true,
  style,
}: ExtendedSkeletonProps) {
  if (variant === "text" && lines && lines > 0) {
    return <SkeletonText lines={lines} className={className} pulse={pulse} />;
  }
  if (variant === "circle" && size) {
    return (
      <SkeletonAvatar size={size} className={className} pulse={pulse} style={style} />
    );
  }
  const cls = ["ds-skeleton", `variant-${variant}`];
  if (pulse) cls.push("pulse");
  if (className) cls.push(className);
  const styleProps = {
    ...(width != null ? { width } : {}),
    ...(height != null ? { height } : {}),
    ...style,
  };
  return <span className={cls.join(" ")} style={styleProps} aria-hidden="true" />;
}

export function SkeletonText({ lines = 3, className = "", pulse = true }: InternalSkeletonTextProps) {
  return (
    <span
      className={`ds-skeleton-text ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: lines }, (_, i) => {
        // Última linha mais curta (mimetiza fim de parágrafo)
        const isLast = i === lines - 1;
        const w = isLast ? "62%" : "100%";
        const cls = ["ds-skeleton", "variant-rect"];
        if (pulse) cls.push("pulse");
        return (
          <span
            key={i}
            className={cls.join(" ")}
            style={{ width: w, height: 12 }}
          />
        );
      })}
    </span>
  );
}

export function SkeletonAvatar({ size = 40, className = "", pulse = true, style }: SkeletonAvatarProps) {
  const cls = ["ds-skeleton", "variant-circle"];
  if (pulse) cls.push("pulse");
  if (className) cls.push(className);
  return (
    <span
      className={cls.join(" ")}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    />
  );
}

/* SkeletonCard — composição comum: avatar + título + 2 linhas */
export function SkeletonCard({ className = "" }: SkeletonCardProps) {
  return (
    <div className={`ds-skeleton-card ${className}`} aria-hidden="true">
      <div className="ds-skeleton-card-head">
        <SkeletonAvatar size={36} />
        <div style={{ display: "grid", gap: 6, flex: 1 }}>
          <Skeleton width="40%" height={12} />
          <Skeleton width="25%" height={10} />
        </div>
      </div>
      <SkeletonText lines={3} />
    </div>
  );
}
