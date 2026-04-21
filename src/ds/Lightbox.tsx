import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "../lib/hooks/useFocusTrap.ts";
import { useScrollLock } from "../lib/hooks/useScrollLock.ts";

/* ================================================================
   Lightbox — imagem em zoom sobre overlay (Fase 15.3)
   ----------------------------------------------------------------
   Escape e clique no backdrop fecham. Focus trap + scroll lock.
   ================================================================ */

export interface LightboxProps {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  caption?: ReactNode;
  /** aria-label do dialog (acessibilidade). */
  dialogAriaLabel?: string;
  /** aria-label do botão fechar. */
  closeLabel?: string;
  className?: string;
}

export function Lightbox({
  open,
  onClose,
  src,
  alt,
  caption,
  dialogAriaLabel,
  closeLabel = "Close",
  className = "",
}: LightboxProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  useFocusTrap(panelRef, open);
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const node = (
    <div
      className={`ds-lightbox-backdrop ${className}`.trim()}
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        className="ds-lightbox-panel"
        role="dialog"
        aria-modal="true"
        aria-label={dialogAriaLabel ?? alt}
      >
        <button type="button" className="ds-lightbox-close" onClick={onClose} aria-label={closeLabel}>
          ×
        </button>
        <div className="ds-lightbox-frame">
          <img src={src} alt={alt} className="ds-lightbox-img" decoding="async" />
        </div>
        {caption != null ? <div className="ds-lightbox-caption">{caption}</div> : null}
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(node, document.body) : null;
}
