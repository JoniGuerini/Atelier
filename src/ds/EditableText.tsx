import { useEffect, useId, useRef, useState } from "react";

/* ================================================================
   EditableText — clique para editar inline (Fase 15.2)
   ----------------------------------------------------------------
   Modo leitura mostra texto; clique vira input. Enter ou blur
   chama onCommit; Esc cancela e restaura.
   ================================================================ */

export interface EditableTextProps {
  value: string;
  onCommit: (next: string) => void;
  disabled?: boolean;
  className?: string;
  emptyText?: string;
}

export function EditableText({
  value,
  onCommit,
  disabled = false,
  className = "",
  emptyText = "—",
}: EditableTextProps) {
  const uid = useId();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const cancel = () => {
    setDraft(value);
    setEditing(false);
  };

  const save = () => {
    onCommit(draft.trim());
    setEditing(false);
  };

  if (disabled) {
    return (
      <span className={`ds-editable-text is-disabled ${className}`.trim()}>
        {value || emptyText}
      </span>
    );
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        id={uid}
        className={`ds-input ds-editable-input ${className}`.trim()}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            save();
          }
          if (e.key === "Escape") {
            e.preventDefault();
            cancel();
          }
        }}
      />
    );
  }

  return (
    <button
      type="button"
      className={`ds-editable-text ${className}`.trim()}
      onClick={() => setEditing(true)}
    >
      {value || emptyText}
    </button>
  );
}
