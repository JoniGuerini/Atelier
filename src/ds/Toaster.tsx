import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ================================================================
   Toaster — sistema de notificações com queue, auto-dismiss e
   posicionamento configurável.
   ----------------------------------------------------------------
   Diferente do <Toast> existente (componente puro, controlado pelo
   consumidor), o Toaster é um SISTEMA:

     1. Monte <Toaster /> uma vez no root da app (ex: dentro de App).
     2. Em qualquer lugar use o hook useToast() pra disparar.

   API mínima:
     const { toast } = useToast();
     toast("Salvo.");
     toast("Erro ao salvar", { variant: "danger" });

   API completa:
     toast({
       title: "Conexão restabelecida",
       description: "Você pode continuar onde parou.",
       variant: "ok",          // default | info | ok | warn | danger
       duration: 4000,         // ms; 0 ou Infinity = não auto-dismiss
       action: {               // botão de ação opcional
         label: "Desfazer",
         onClick: () => undo(),
       },
       glyph: "✓",             // glifo opcional (default: símbolo da variante)
     });

   Posicionamento (prop do <Toaster />):
     · "top-left", "top-center", "top-right"
     · "bottom-left", "bottom-center", "bottom-right"  (default)

   Ordem visual:
     · top-* → mais novo no topo
     · bottom-* → mais novo embaixo
     (regras de "perto da origem visual = mais recente")

   Behavior:
     · auto-dismiss após `duration` ms (pause ao hover)
     · click no × dismissa manualmente
     · stack vertical com gap respiratório
     · animação de entrada do lado correspondente
     · respeita prefers-reduced-motion (sem slide)
================================================================ */

export type ToastVariant = "default" | "info" | "ok" | "warn" | "danger";
export type ToasterPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastOptions {
  title?: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  /** ms até auto-dismiss. 0 ou Infinity desabilita. Default: 4000. */
  duration?: number;
  action?: ToastAction;
  /** Glifo customizado. Sem isso, herda o da variante. */
  glyph?: ReactNode;
}

interface ToastEntry extends Required<Pick<ToastOptions, "duration">> {
  id: number;
  title?: ReactNode;
  description?: ReactNode;
  variant: ToastVariant;
  action?: ToastAction;
  glyph?: ReactNode;
}

const VARIANT_GLYPH: Record<ToastVariant, string> = {
  default: "—",
  info: "i",
  ok: "✓",
  warn: "!",
  danger: "✕",
};

/* ----------------------------------------------------------------
   Context — store interno do Toaster.
---------------------------------------------------------------- */
interface ToasterContextValue {
  /** Adiciona um toast à fila. Aceita string (atalho) ou opções. */
  toast: (input: string | ToastOptions, opts?: ToastOptions) => number;
  /** Remove um toast pelo id. */
  dismiss: (id: number) => void;
  /** Limpa toda a fila. */
  clear: () => void;
}

const ToasterContext = createContext<ToasterContextValue | null>(null);

export function useToast(): ToasterContextValue {
  const ctx = useContext(ToasterContext);
  if (!ctx) {
    // Fallback no-op pra não quebrar testes / consumidores que esquecem
    // de montar o <Toaster />. Em desenvolvimento, avisa no console.
    if (typeof console !== "undefined" && import.meta.env?.DEV) {
      console.warn(
        "[Atelier] useToast() chamado sem <Toaster /> no root. Toasts serão ignorados.",
      );
    }
    return {
      toast: () => -1,
      dismiss: () => {},
      clear: () => {},
    };
  }
  return ctx;
}

/* ----------------------------------------------------------------
   Toaster — provider + render layer.
   Renderiza a stack na position especificada, com animação de
   entrada/saída.
---------------------------------------------------------------- */
export interface ToasterProps {
  /** Onde a stack aparece. Default: "bottom-right". */
  position?: ToasterPosition;
  /** Duração padrão em ms. Default: 4000. */
  defaultDuration?: number;
  /** Máximo de toasts simultaneamente visíveis. Default: 5. */
  limit?: number;
  children?: ReactNode;
}

let toastIdSeq = 0;

export function Toaster({
  position = "bottom-right",
  defaultDuration = 4000,
  limit = 5,
  children,
}: ToasterProps) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const timersRef = useRef<Map<number, number>>(new Map());

  const dismiss = useCallback((id: number) => {
    setToasts((curr) => curr.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      window.clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const scheduleDismiss = useCallback(
    (id: number, duration: number) => {
      if (!duration || duration === Infinity) return;
      const existing = timersRef.current.get(id);
      if (existing) window.clearTimeout(existing);
      const timer = window.setTimeout(() => dismiss(id), duration);
      timersRef.current.set(id, timer);
    },
    [dismiss],
  );

  const toast = useCallback(
    (input: string | ToastOptions, opts: ToastOptions = {}): number => {
      const merged: ToastOptions =
        typeof input === "string" ? { title: input, ...opts } : input;
      const id = ++toastIdSeq;
      const entry: ToastEntry = {
        id,
        title: merged.title,
        description: merged.description,
        variant: merged.variant ?? "default",
        duration: merged.duration ?? defaultDuration,
        action: merged.action,
        glyph: merged.glyph,
      };
      setToasts((curr) => {
        const next = [...curr, entry];
        // Aplica limit removendo os mais antigos
        if (next.length > limit) {
          const dropped = next.slice(0, next.length - limit);
          dropped.forEach((d) => {
            const t = timersRef.current.get(d.id);
            if (t) window.clearTimeout(t);
            timersRef.current.delete(d.id);
          });
          return next.slice(-limit);
        }
        return next;
      });
      scheduleDismiss(id, entry.duration);
      return id;
    },
    [defaultDuration, limit, scheduleDismiss],
  );

  const clear = useCallback(() => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current.clear();
    setToasts([]);
  }, []);

  // Cleanup geral ao desmontar
  useEffect(() => {
    return () => {
      timersRef.current.forEach((t) => window.clearTimeout(t));
      timersRef.current.clear();
    };
  }, []);

  // Pause-on-hover: cancelar timer; on leave: re-agendar com a duration original
  const pauseTimer = (id: number) => {
    const t = timersRef.current.get(id);
    if (t) {
      window.clearTimeout(t);
      timersRef.current.delete(id);
    }
  };
  const resumeTimer = (entry: ToastEntry) => {
    if (timersRef.current.has(entry.id)) return;
    scheduleDismiss(entry.id, entry.duration);
  };

  // top-* mostra mais novo no topo (ordem natural)
  // bottom-* mostra mais novo embaixo (também natural — array final)
  const visibleToasts = toasts;

  return (
    <ToasterContext.Provider value={{ toast, dismiss, clear }}>
      {children}
      <div
        className={`ds-toaster position-${position}`}
        role="region"
        aria-label="Notifications"
        aria-live="polite"
      >
        {visibleToasts.map((t) => (
          <ToastItem
            key={t.id}
            entry={t}
            position={position}
            onDismiss={() => dismiss(t.id)}
            onPause={() => pauseTimer(t.id)}
            onResume={() => resumeTimer(t)}
          />
        ))}
      </div>
    </ToasterContext.Provider>
  );
}

/* ----------------------------------------------------------------
   ToastItem — visual de um toast individual.
---------------------------------------------------------------- */
interface ToastItemProps {
  entry: ToastEntry;
  position: ToasterPosition;
  onDismiss: () => void;
  onPause: () => void;
  onResume: () => void;
}

function ToastItem({
  entry,
  position,
  onDismiss,
  onPause,
  onResume,
}: ToastItemProps) {
  const glyph = entry.glyph ?? VARIANT_GLYPH[entry.variant];
  const cls = ["ds-toaster-item", `variant-${entry.variant}`, `pos-${position}`];

  return (
    <div
      className={cls.join(" ")}
      role="status"
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      onFocus={onPause}
      onBlur={onResume}
    >
      <span className="ds-toaster-glyph" aria-hidden="true">
        {glyph}
      </span>
      <div className="ds-toaster-content">
        {entry.title && <div className="ds-toaster-title">{entry.title}</div>}
        {entry.description && (
          <div className="ds-toaster-desc">{entry.description}</div>
        )}
      </div>
      {entry.action && (
        <button
          type="button"
          className="ds-toaster-action"
          onClick={() => {
            entry.action!.onClick();
            onDismiss();
          }}
        >
          {entry.action.label}
        </button>
      )}
      <button
        type="button"
        className="ds-toaster-close"
        aria-label="Dismiss"
        onClick={onDismiss}
      >
        ×
      </button>
    </div>
  );
}
