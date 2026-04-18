import { createContext, useContext, useEffect } from "react";

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

const DialogContext = createContext({ onClose: () => {} });

function useDialog() {
  return useContext(DialogContext);
}

export function Dialog({ open, onClose, children, ariaLabel }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <DialogContext.Provider value={{ onClose }}>
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

export function DialogHeader({ children }) {
  return <div className="ds-modal-head">{children}</div>;
}

export function DialogTitle({ children, as: Comp = "h3" }) {
  return <Comp>{children}</Comp>;
}

export function DialogClose({ label = "Fechar" }) {
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

export function DialogBody({ children }) {
  return <div className="ds-modal-body">{children}</div>;
}

export function DialogFooter({ children }) {
  return <div className="ds-modal-foot">{children}</div>;
}

/* ---------- Modal — alias retrocompatível ----------
   API curta com props (title, foot, children). Renderiza usando
   os subcomponentes internamente. */
export function Modal({ open, onClose, title, children, foot }) {
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
