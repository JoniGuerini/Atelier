import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Popover, PopoverContent, type PopoverPlacement } from "./Popover.tsx";

/* ================================================================
   TimePicker — HH:MM 24h + lista rápida (Fase 15.2)
   ----------------------------------------------------------------
   Mesmo arranjo que DatePicker: Popover + input + botão glyph,
   sem PopoverTrigger — painel ancorado ao wrapper quando aberto.
   ================================================================ */

const RE = /^([01]?\d|2[0-3]):([0-5]\d)$/;

export function parseTime(s: string): { h: number; m: number } | null {
  const t = s.trim();
  const m = t.match(RE);
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return null;
  return { h, m: min };
}

export function formatTime(h: number, m: number): string {
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function slots(step: number): string[] {
  const out: string[] = [];
  for (let t = 0; t < 24 * 60; t += step) {
    const h = Math.floor(t / 60);
    const m = t % 60;
    out.push(formatTime(h, m));
  }
  return out;
}

function ClockGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 4.5V8l2.5 1.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export interface TimePickerProps {
  value?: string | null;
  onChange?: (v: string | null) => void;
  stepMinutes?: number;
  disabled?: boolean;
  placement?: PopoverPlacement;
  className?: string;
  id?: string;
  placeholder?: string;
}

export function TimePicker({
  value = null,
  onChange,
  stepMinutes = 15,
  disabled = false,
  placement = "bottom-start",
  className = "",
  id,
  placeholder = "HH:MM",
}: TimePickerProps) {
  const uid = useId();
  const inputId = id ?? uid;
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(value ?? "");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setText(value ?? "");
  }, [value]);

  const list = useMemo(() => slots(Math.min(60, Math.max(5, stepMinutes))), [stepMinutes]);

  const commit = () => {
    const t = text.trim();
    if (t === "") {
      onChange?.(null);
      return;
    }
    const p = parseTime(t);
    if (!p) {
      setText(value ?? "");
      return;
    }
    const f = formatTime(p.h, p.m);
    onChange?.(f);
    setText(f);
    setOpen(false);
  };

  const pick = (s: string) => {
    onChange?.(s);
    setText(s);
    setOpen(false);
    inputRef.current?.focus();
  };

  const cls = ["ds-time-picker"];
  if (className) cls.push(className);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={cls.join(" ")}>
        <div className="ds-time-picker-input-wrap">
          <input
            ref={inputRef}
            id={inputId}
            type="text"
            className="ds-time-picker-inner"
            disabled={disabled}
            placeholder={placeholder}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commit();
                setOpen(false);
              } else if (e.key === "Escape" && open) {
                e.preventDefault();
                setOpen(false);
              } else if (e.key === "ArrowDown" && !open) {
                e.preventDefault();
                setOpen(true);
              }
            }}
            autoComplete="off"
          />
          <button
            type="button"
            className="ds-time-picker-trigger"
            disabled={disabled}
            aria-label="Open time list"
            onClick={() => setOpen((v) => !v)}
          >
            <ClockGlyph />
          </button>
        </div>
        <PopoverContent placement={placement} className="ds-time-picker-panel" minWidth={220}>
          <div className="ds-time-picker-grid" role="listbox" aria-label="Times">
            {list.map((s) => (
              <button
                key={s}
                type="button"
                role="option"
                aria-selected={s === value}
                className={`ds-time-picker-slot ${s === value ? "is-active" : ""}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </PopoverContent>
      </div>
    </Popover>
  );
}
