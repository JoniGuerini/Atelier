import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";

/* ================================================================
   TagInput — coleta uma lista de tags livres do usuário.
   ----------------------------------------------------------------
   Irmão do Combobox sem dropdown. Captura strings via Enter,
   vírgula ou Tab; remove via Backspace na string vazia ou clique
   no X. Suporta validação síncrona e modo readonly.

   API:
     <TagInput
       value={tags}
       onChange={setTags}
       placeholder="Adicione tags..."
       separators={[",", ";"]}
       validate={(t) => t.length >= 2 || "Mín. 2 caracteres"}
       maxTags={10}
     />
   ================================================================ */

export interface TagInputProps {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  /** Caracteres que commitam a tag (além de Enter e Tab). Default: [","]. */
  separators?: string[];
  /** Função de validação. Retorna true (ok), false (inválido sem msg) ou
   *  string (mensagem de erro inline). */
  validate?: (value: string, current: string[]) => boolean | string;
  /** Não permite duplicatas (case-insensitive). Default: true. */
  unique?: boolean;
  /** Limite máximo de tags. */
  maxTags?: number;
  /** Não permite adicionar/remover, mostra como lista read-only. */
  readOnly?: boolean;
  /** Tamanho do componente. */
  size?: "sm" | "md";
  /** Aria-label do input interno. */
  ariaLabel?: string;
  /** ID do input (para <label htmlFor>). */
  id?: string;
  className?: string;
}

export function TagInput({
  value,
  onChange,
  placeholder,
  separators = [","],
  validate,
  unique = true,
  maxTags,
  readOnly = false,
  size = "md",
  ariaLabel,
  id,
  className = "",
}: TagInputProps) {
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const atMax = maxTags != null && value.length >= maxTags;

  const tryCommit = useCallback(
    (raw: string): boolean => {
      const t = raw.trim();
      if (!t) return false;
      if (atMax) {
        setError(`Máximo de ${maxTags} tags atingido`);
        return false;
      }
      if (unique && value.some((v) => v.toLowerCase() === t.toLowerCase())) {
        setError("Tag já adicionada");
        return false;
      }
      if (validate) {
        const r = validate(t, value);
        if (r === false) {
          setError("Tag inválida");
          return false;
        }
        if (typeof r === "string") {
          setError(r);
          return false;
        }
      }
      onChange([...value, t]);
      setError(null);
      setDraft("");
      return true;
    },
    [value, onChange, validate, unique, atMax, maxTags]
  );

  const removeAt = useCallback(
    (idx: number) => {
      if (readOnly) return;
      const next = value.slice();
      next.splice(idx, 1);
      onChange(next);
      setError(null);
    },
    [value, onChange, readOnly]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (readOnly) return;

      if (e.key === "Enter") {
        if (draft.trim()) {
          e.preventDefault();
          tryCommit(draft);
        }
        return;
      }
      if (e.key === "Tab" && draft.trim()) {
        // Tab só commita se houver draft, senão deixa navegar.
        e.preventDefault();
        tryCommit(draft);
        return;
      }
      if (e.key === "Backspace" && !draft && value.length > 0) {
        e.preventDefault();
        removeAt(value.length - 1);
        return;
      }
    },
    [draft, tryCommit, value, removeAt, readOnly]
  );

  const onChangeDraft = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      // Detecta separadores no meio do input (paste de "a, b, c").
      const found = separators.find((sep) => raw.includes(sep));
      if (found) {
        const parts = raw.split(found);
        const last = parts.pop() ?? "";
        for (const p of parts) {
          tryCommit(p);
        }
        setDraft(last);
      } else {
        setDraft(raw);
        if (error) setError(null);
      }
    },
    [separators, tryCommit, error]
  );

  // Limpa erro quando value externo muda
  useEffect(() => {
    if (error && value.length === 0) setError(null);
  }, [value, error]);

  return (
    <div
      className={`ds-tag-input ds-tag-input--${size} ${
        readOnly ? "is-readonly" : ""
      } ${error ? "is-invalid" : ""} ${className}`.trim()}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="ds-tag-input-tags">
        {value.map((t, i) => (
          <Tag
            key={`${t}-${i}`}
            label={t}
            onRemove={readOnly ? undefined : () => removeAt(i)}
          />
        ))}
        {!readOnly && (
          <input
            ref={inputRef}
            id={inputId}
            type="text"
            value={draft}
            onChange={onChangeDraft}
            onKeyDown={onKeyDown}
            placeholder={value.length === 0 ? placeholder : undefined}
            className="ds-tag-input-field"
            aria-label={ariaLabel}
            disabled={atMax}
          />
        )}
      </div>
      {error && (
        <div className="ds-tag-input-error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------
   Tag — visual de uma tag isolada. Exportado para reuso em outras
   listas de tags (ex: filtros de DataTable, breadcrumbs de busca).
---------------------------------------------------------------- */

export interface TagProps {
  label: string;
  onRemove?: () => void;
  className?: string;
}

export function Tag({ label, onRemove, className = "" }: TagProps) {
  return (
    <span className={`ds-tag ${className}`.trim()}>
      <span className="ds-tag-label">{label}</span>
      {onRemove && (
        <button
          type="button"
          className="ds-tag-remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={`Remover ${label}`}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M2 2 L8 8 M8 2 L2 8" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </span>
  );
}
