import type { ReactNode } from "react";

/* ================================================================
   Banner — faixa full-width persistente (Fase 15.1)
   ----------------------------------------------------------------
   Distinto de Alert: ocupa a largura do recipiente (ou viewport
   com sticky), tom de “comunicado institucional”, opcionalmente
   dispensável. Não substitui feedback contextual inline.

     <Banner variant="accent" onDismiss={() => setShow(false)}>
       <BannerMessage>Texto curto.</BannerMessage>
       <BannerAction href="#/changelog">Notas</BannerAction>
     </Banner>
   ================================================================ */

export type BannerVariant = "neutral" | "accent" | "ink";

export interface BannerProps {
  variant?: BannerVariant;
  /** Fixa no topo do viewport ao rolar. */
  sticky?: boolean;
  onDismiss?: () => void;
  dismissLabel?: string;
  className?: string;
  role?: "region" | "status";
  "aria-label"?: string;
  children?: ReactNode;
}

export function Banner({
  variant = "neutral",
  sticky = false,
  onDismiss,
  dismissLabel = "Dismiss",
  className = "",
  role = "region",
  "aria-label": ariaLabel,
  children,
}: BannerProps) {
  const cls = ["ds-banner", `variant-${variant}`, sticky ? "is-sticky" : "", className].filter(Boolean).join(" ");
  return (
    <div className={cls} role={role} aria-label={ariaLabel}>
      <div className="ds-banner-inner">{children}</div>
      {onDismiss && (
        <button
          type="button"
          className="ds-banner-dismiss"
          onClick={onDismiss}
          aria-label={dismissLabel}
        >
          <span aria-hidden="true">×</span>
        </button>
      )}
    </div>
  );
}

export function BannerMessage({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return <div className={`ds-banner-message ${className}`.trim()}>{children}</div>;
}

export interface BannerActionProps {
  href: string;
  children?: ReactNode;
  className?: string;
}

export function BannerAction({ href, children, className = "" }: BannerActionProps) {
  return (
    <a className={`ds-banner-action ${className}`.trim()} href={href}>
      {children}
    </a>
  );
}
