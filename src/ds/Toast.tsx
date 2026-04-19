import type { ReactNode } from "react";
import type { ToastProps } from "./types.ts";

interface SlotProps {
  children?: ReactNode;
}

/* ================================================================
   Toast — API composable.
   ----------------------------------------------------------------
   Modo composable:
     <Toast visible={open}>
       <ToastTitle>Salvo</ToastTitle>
       <ToastDescription>O artigo foi publicado.</ToastDescription>
       <ToastActions>
         <Button variant="link">Desfazer</Button>
       </ToastActions>
     </Toast>

   Modo curto (atalho retrocompatível):
     <Toast message="Copiado." visible={visible} />
   ================================================================ */

export function Toast({ message, visible, children, className = "" }: ToastProps) {
  const cls = ["ds-toast"];
  if (visible) cls.push("show");
  if (className) cls.push(className);
  return (
    <div className={cls.join(" ")} role="status" aria-live="polite">
      {children ?? message}
    </div>
  );
}

export function ToastTitle({ children }: SlotProps) {
  return <div className="toast-title">{children}</div>;
}

export function ToastDescription({ children }: SlotProps) {
  return <div className="toast-desc">{children}</div>;
}

export function ToastActions({ children }: SlotProps) {
  return (
    <div
      className="toast-actions"
      style={{
        marginTop: 8,
        display: "flex",
        gap: 8,
      }}
    >
      {children}
    </div>
  );
}
