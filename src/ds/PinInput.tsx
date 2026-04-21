import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ClipboardEvent,
} from "react";

/* ================================================================
   PinInput / OTP — N dígitos com paste (Fase 15.2)
   ----------------------------------------------------------------
   value: string só com dígitos, comprimento <= length.
   onComplete dispara quando length dígitos válidos.
   ================================================================ */

export interface PinInputProps {
  length?: number;
  value?: string;
  onChange?: (digits: string) => void;
  onComplete?: (digits: string) => void;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

export function PinInput({
  length = 6,
  value = "",
  onChange,
  onComplete,
  disabled = false,
  className = "",
  "aria-label": ariaLabel,
}: PinInputProps) {
  const uid = useId();
  const cells = Math.min(8, Math.max(4, length));
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const [digits, setDigits] = useState(() => sanitize(value, cells));

  useEffect(() => {
    setDigits(sanitize(value, cells));
  }, [value, cells]);

  const push = useCallback(
    (next: string) => {
      const d = sanitize(next, cells);
      setDigits(d);
      onChange?.(d);
      if (d.length === cells) onComplete?.(d);
    },
    [cells, onChange, onComplete]
  );

  const setAt = (index: number, ch: string) => {
    const arr = digits.padEnd(cells, " ").split("");
    arr[index] = ch;
    push(arr.join("").replace(/\s/g, ""));
  };

  const onPaste = (e: ClipboardEvent, start: number) => {
    e.preventDefault();
    const t = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!t) return;
    const rest = cells - start;
    const chunk = t.slice(0, rest);
    const left = digits.slice(0, start);
    const right = digits.slice(start);
    const merged = sanitize(left + chunk + right, cells);
    push(merged);
    const focusIdx = Math.min(cells - 1, start + chunk.length);
    refs.current[focusIdx]?.focus();
  };

  return (
    <div
      className={`ds-pin-input ${className}`.trim()}
      role="group"
      aria-label={ariaLabel ?? "PIN"}
    >
      {Array.from({ length: cells }, (_, i) => (
        <input
          key={`${uid}-${i}`}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          disabled={disabled}
          className="ds-input ds-pin-cell"
          value={digits[i] ?? ""}
          aria-label={`Digit ${i + 1}`}
          onPaste={(e) => onPaste(e, i)}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, "");
            if (v === "") {
              const arr = digits.split("");
              arr[i] = "";
              push(arr.join(""));
              return;
            }
            setAt(i, v.slice(-1));
            if (v && i < cells - 1) refs.current[i + 1]?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !digits[i] && i > 0) {
              refs.current[i - 1]?.focus();
            }
            if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
            if (e.key === "ArrowRight" && i < cells - 1) refs.current[i + 1]?.focus();
          }}
        />
      ))}
    </div>
  );
}

function sanitize(s: string, maxLen: number): string {
  return s.replace(/\D/g, "").slice(0, maxLen);
}
