import { createContext, useContext, useEffect, type ElementType, type ReactNode } from "react";
import type { DialogProps, ModalProps } from "./types.ts";

interface DialogContextValue {
  onClose: () => void;
}
interface DialogHeaderProps {
  children?: ReactNode;
}
interface DialogTitleProps {
  children?: ReactNode;
  as?: ElementType;
}
interface DialogCloseProps {
  label?: string;
}
interface DialogSlotProps {
  children?: ReactNode;
}
interface DialogPropsExt extends DialogProps {
  ariaLabel?: string;
}

/* ================================================================
   Dialog — API composable.
   ----------------------------------------------------------------
     <Dialog open={open} onClose={() => setOpen(false)}>
       <DialogHeader>
         <DialogTitle>Discard changes?</DialogTitle>
         <DialogClose />
       </DialogHeader>
       <DialogBody>...</DialogBody>
       <DialogFooter>
         <Button variant="ghost" onClick={...}>Cancel</Button>
         <Button variant="primary" onClick={...}>Discard</Button>
       </DialogFooter>
     </Dialog>

   `Modal` é mantido como alias retrocompatível (forma curta com
   props title/foot/children).
   ================================================================ */

const DialogContext = createContext<DialogContextValue>({ onClose: () => {} });

function useDialog() {
  return useContext(DialogContext);
}

export function Dialog({ open, onClose, children, ariaLabel }: DialogPropsExt) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <DialogContext.Provider value={{ onClose: onClose || (() => {}) }}>
      <div
        className="ds-modal-backdrop"
        onClick={(e) => e.target === e.currentTarget && onClose?.()}
      >
        <div
          className="ds-modal"
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
        >
          {children}
        </div>
      </div>
    </DialogContext.Provider>
  );
}

export function DialogHeader({ children }: DialogHeaderProps) {
  return <div className="ds-modal-head">{children}</div>;
}

export function DialogTitle({ children, as: Comp = "h3" }: DialogTitleProps) {
  return <Comp>{children}</Comp>;
}

export function DialogClose({ label = "Fechar" }: DialogCloseProps) {
  const { onClose } = useDialog();
  return (
    <button
      className="ds-modal-close"
      onClick={onClose}
      aria-label={label}
      type="button"
    >
      ×
    </button>
  );
}

export function DialogBody({ children }: DialogSlotProps) {
  return <div className="ds-modal-body">{children}</div>;
}

export function DialogFooter({ children }: DialogSlotProps) {
  return <div className="ds-modal-foot">{children}</div>;
}

/* ---------- Modal — alias retrocompatível ----------
   API curta com props (title, foot, children). Renderiza usando
   os subcomponentes internamente. */
export function Modal({ open, onClose, title, children, foot }: ModalProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogClose />
      </DialogHeader>
      <DialogBody>{children}</DialogBody>
      {foot && <DialogFooter>{foot}</DialogFooter>}
    </Dialog>
  );
}
