/* ================================================================
   FileUploadQueue — fila após Dropzone
   ----------------------------------------------------------------
   Lista controlada: nome, tamanho, barra de progresso, estado e
   ações retry / remover. Preview fica a cargo do app (slot ou URL).
   ================================================================ */

import type { ReactNode } from "react";
import type { FileUploadQueueItem } from "./types.ts";

export type { FileUploadQueueItem } from "./types.ts";

export interface FileUploadQueueProps {
  children?: ReactNode;
  className?: string;
}

export function FileUploadQueue({ children, className }: FileUploadQueueProps) {
  return (
    <ul className={["ds-file-queue", className].filter(Boolean).join(" ")} role="list">
      {children}
    </ul>
  );
}

export interface FileUploadQueueItemProps {
  item: FileUploadQueueItem;
  /** preview opcional — miniatura ou ícone */
  preview?: ReactNode;
  onRemove?: (id: string) => void;
  onRetry?: (id: string) => void;
  retryLabel?: string;
  removeLabel?: string;
}

export function FileUploadQueueItemRow({
  item,
  preview,
  onRemove,
  onRetry,
  retryLabel = "Retry",
  removeLabel = "Remove",
}: FileUploadQueueItemProps) {
  const { id, name, sizeLabel, progress, status } = item;
  const err = status === "error";
  const done = status === "done";
  const pct = Math.max(0, Math.min(100, progress));

  return (
    <li className={`ds-file-queue-row${err ? " is-error" : ""}${done ? " is-done" : ""}`}>
      {preview != null ? <div className="ds-file-queue-preview">{preview}</div> : null}
      <div className="ds-file-queue-main">
        <div className="ds-file-queue-name">{name}</div>
        <div className="ds-file-queue-meta">
          <span>{sizeLabel}</span>
          <span className="ds-file-queue-status" data-status={status}>
            {status}
          </span>
        </div>
        <div className="ds-file-queue-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
          <div className="ds-file-queue-bar-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="ds-file-queue-actions">
        {err && onRetry ? (
          <button type="button" className="ds-file-queue-btn" onClick={() => onRetry(id)}>
            {retryLabel}
          </button>
        ) : null}
        {onRemove ? (
          <button type="button" className="ds-file-queue-btn ds-file-queue-btn-ghost" onClick={() => onRemove(id)}>
            {removeLabel}
          </button>
        ) : null}
      </div>
    </li>
  );
}
