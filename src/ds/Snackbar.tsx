/* ================================================================
   Snackbar — feedback ancorado (≠ Toaster)
   ----------------------------------------------------------------
   Portal posicionado em fixed relativo a anchorRef. Ação opcional;
   auto-dismiss configurável. Escape fecha; não rouba foco global.
   ================================================================ */

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

function getPortalParent(): HTMLElement {
  return document.getElementById("root") ?? document.body;
}

export interface SnackbarProps {
  open: boolean;
  onClose: () => void;
  anchorRef: RefObject<HTMLElement | null>;
  message: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  /** ms; 0 desliga auto-dismiss. Default: 5200 */
  duration?: number;
  className?: string;
  /** aria-label do botão de fechar */
  dismissLabel?: string;
}

interface Pos {
  top: number;
  left: number;
  width: number;
}

export function Snackbar({
  open,
  onClose,
  anchorRef,
  message,
  actionLabel,
  onAction,
  duration = 5200,
  className,
  dismissLabel = "Dismiss",
}: SnackbarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<Pos | null>(null);

  const layout = useCallback(() => {
    const a = anchorRef.current;
    if (!a || !open) return;
    const r = a.getBoundingClientRect();
    const w = Math.min(400, Math.max(240, r.width));
    let left = r.left;
    if (left + w > window.innerWidth - 12) {
      left = Math.max(12, window.innerWidth - 12 - w);
    }
    const h = barRef.current?.offsetHeight ?? 48;
    let top = r.bottom + 8;
    if (top + h > window.innerHeight - 12) {
      top = Math.max(12, r.top - h - 8);
    }
    setPos({ top, left, width: w });
  }, [anchorRef, open]);

  useLayoutEffect(() => {
    if (!open) {
      setPos(null);
      return;
    }
    layout();
  }, [open, layout]);

  useEffect(() => {
    if (!open) return;
    const on = () => layout();
    window.addEventListener("resize", on);
    window.addEventListener("scroll", on, true);
    return () => {
      window.removeEventListener("resize", on);
      window.removeEventListener("scroll", on, true);
    };
  }, [open, layout]);

  useEffect(() => {
    if (!open || !duration) return;
    const t = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(t);
  }, [open, duration, onClose]);

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, onClose]);

  const mount = typeof document !== "undefined" ? getPortalParent() : null;
  if (!open || !mount || !pos) return null;

  const node = (
    <div
      ref={barRef}
      className={["ds-snackbar", className].filter(Boolean).join(" ")}
      style={{ top: pos.top, left: pos.left, width: pos.width }}
      role="status"
      aria-live="polite"
    >
      <div className="ds-snackbar-msg">{message}</div>
      {actionLabel ? (
        <button type="button" className="ds-snackbar-action" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
      <button type="button" className="ds-snackbar-dismiss" onClick={onClose} aria-label={dismissLabel}>
        ×
      </button>
    </div>
  );

  return createPortal(node, mount);
}
