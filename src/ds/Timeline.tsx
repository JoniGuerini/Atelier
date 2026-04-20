import {
  createContext,
  useContext,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import { useT } from "../lib/i18n.tsx";

/* ================================================================
   Timeline — eventos verticais ou horizontais.
   ----------------------------------------------------------------
   Composable:
     <Timeline orientation="vertical">
       <TimelineItem>
         <TimelineMarker variant="dot" />
         <TimelineContent>
           <TimelineDate>12 mai 2025</TimelineDate>
           <TimelineTitle>Lançamento v1</TimelineTitle>
           <p>...</p>
         </TimelineContent>
       </TimelineItem>
       <TimelineNow label="Agora" />
       ...
     </Timeline>

   Markers:
     - dot       círculo cheio (default)
     - hollow    círculo vazio (item futuro / pendente)
     - number    número dentro do círculo
     - glyph     glifo SVG (passe via children: <TimelineMarker><svg/></TimelineMarker>)
     - custom    qualquer ReactNode via children
   ================================================================ */

export type TimelineOrientation = "vertical" | "horizontal";

interface TimelineCtx {
  orientation: TimelineOrientation;
}
const TimelineContext = createContext<TimelineCtx>({ orientation: "vertical" });

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
  orientation?: TimelineOrientation;
  children?: ReactNode;
}

export function Timeline({
  orientation = "vertical",
  className = "",
  children,
  ...rest
}: TimelineProps) {
  return (
    <TimelineContext.Provider value={{ orientation }}>
      <ol
        className={`ds-timeline ds-timeline--${orientation} ${className}`.trim()}
        {...rest}
      >
        {children}
      </ol>
    </TimelineContext.Provider>
  );
}

export interface TimelineItemProps extends HTMLAttributes<HTMLLIElement> {
  /** Marca o item como passado, presente ou futuro — apenas afeta visual. */
  state?: "past" | "present" | "future";
  children?: ReactNode;
}

export function TimelineItem({
  state = "past",
  className = "",
  children,
  ...rest
}: TimelineItemProps) {
  return (
    <li
      className={`ds-timeline-item ds-timeline-item--${state} ${className}`.trim()}
      {...rest}
    >
      {children}
    </li>
  );
}

export type TimelineMarkerVariant = "dot" | "hollow" | "number" | "glyph";

export interface TimelineMarkerProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TimelineMarkerVariant;
  /** Usado quando variant="number" — qual número mostrar. */
  n?: number | string;
  /** Usado quando variant="glyph" ou "custom" — conteúdo arbitrário. */
  children?: ReactNode;
}

export function TimelineMarker({
  variant = "dot",
  n,
  className = "",
  children,
  ...rest
}: TimelineMarkerProps) {
  return (
    <span
      className={`ds-timeline-marker ds-timeline-marker--${variant} ${className}`.trim()}
      aria-hidden="true"
      {...rest}
    >
      {variant === "number" && <span className="ds-timeline-marker-num">{n}</span>}
      {(variant === "glyph" || children) && (
        <span className="ds-timeline-marker-glyph">{children}</span>
      )}
    </span>
  );
}

export interface TimelineContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function TimelineContent({
  className = "",
  children,
  ...rest
}: TimelineContentProps) {
  return (
    <div className={`ds-timeline-content ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}

export interface TimelineDateProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function TimelineDate({
  className = "",
  children,
  ...rest
}: TimelineDateProps) {
  return (
    <div className={`ds-timeline-date ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}

export interface TimelineTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3" | "h4" | "h5";
  children?: ReactNode;
}

export function TimelineTitle({
  as: As = "h4",
  className = "",
  children,
  ...rest
}: TimelineTitleProps) {
  return (
    <As className={`ds-timeline-title ${className}`.trim()} {...rest}>
      {children}
    </As>
  );
}

/* ----------------------------------------------------------------
   TimelineNow — marcador horizontal/vertical especial pra dividir
   passado e futuro. Renderiza uma linha tracejada com label.
---------------------------------------------------------------- */

export interface TimelineNowProps {
  label?: string;
  className?: string;
}

export function TimelineNow({ label, className = "" }: TimelineNowProps) {
  const { orientation } = useContext(TimelineContext);
  const { t } = useT();
  // Default localizado: pt-BR → "Agora", en → "Now". O dev ainda pode
  // override passando label explicitamente.
  const resolvedLabel = label ?? t("ds.timeline.nowLabel");
  return (
    <li
      className={`ds-timeline-now ds-timeline-now--${orientation} ${className}`.trim()}
      role="separator"
      aria-label={resolvedLabel}
    >
      <span className="ds-timeline-now-line" aria-hidden="true" />
      <span className="ds-timeline-now-label">{resolvedLabel}</span>
    </li>
  );
}
