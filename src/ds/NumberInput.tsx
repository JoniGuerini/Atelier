import { useCallback, useEffect, useId, useState } from "react";

/* ================================================================
   NumberInput — valor numérico com stepper (Fase 15.2)
   ----------------------------------------------------------------
   Controlado. Aceita decimais quando step tem casa decimal.
   Enter ou blur confirma; entradas inválidas revertem.
   ================================================================ */

function clamp(n: number, min?: number, max?: number): number {
  let v = n;
  if (min != null && v < min) v = min;
  if (max != null && v > max) v = max;
  return v;
}

export interface NumberInputProps {
  value?: number | null;
  onChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
}

export function NumberInput({
  value = null,
  onChange,
  min,
  max,
  step = 1,
  disabled = false,
  className = "",
  id,
  "aria-label": ariaLabel,
}: NumberInputProps) {
  const uid = useId();
  const inputId = id ?? uid;
  const [draft, setDraft] = useState(() => (value == null ? "" : String(value)));

  useEffect(() => {
    setDraft(value == null ? "" : String(value));
  }, [value]);

  const commit = useCallback(() => {
    const t = draft.trim();
    if (t === "" || t === "-" || t === "." || t === "-.") {
      onChange?.(null);
      setDraft("");
      return;
    }
    const n = Number(t.replace(",", "."));
    if (Number.isNaN(n)) {
      setDraft(value == null ? "" : String(value));
      return;
    }
    const c = clamp(n, min, max);
    onChange?.(c);
    setDraft(String(c));
  }, [draft, max, min, onChange, value]);

  const bump = (dir: 1 | -1) => {
    const base = value ?? 0;
    const raw = base + dir * step;
    const next = clamp(Number(raw.toPrecision(12)), min, max);
    onChange?.(next);
    setDraft(String(next));
  };

  const atMin = min != null && (value ?? min) <= min;
  const atMax = max != null && (value ?? max) >= max;

  return (
    <div className={`ds-number-input ${className}`.trim()}>
      <button
        type="button"
        className="ds-number-step"
        disabled={disabled || atMin}
        aria-label="Decrease"
        onClick={() => bump(-1)}
      >
        −
      </button>
      <input
        id={inputId}
        type="text"
        inputMode="decimal"
        className="ds-input ds-number-input-field"
        disabled={disabled}
        aria-label={ariaLabel}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            commit();
          }
        }}
      />
      <button
        type="button"
        className="ds-number-step"
        disabled={disabled || atMax}
        aria-label="Increase"
        onClick={() => bump(1)}
      >
        +
      </button>
    </div>
  );
}
