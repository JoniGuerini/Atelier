import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useT } from "../lib/i18n.tsx";
import {
  Calendar,
  type CalendarRange,
} from "./Calendar.tsx";
import {
  Popover,
  PopoverContent,
  type PopoverPlacement,
} from "./Popover.tsx";
import {
  formatDate,
  isAfter,
  isBefore,
  maskDate,
  parseDate,
  type DateFormat,
} from "./calendarUtils.ts";

/* ================================================================
   DatePicker — Input mascarado + Calendar dentro de Popover.
   ----------------------------------------------------------------
   Single date:
     <DatePicker value={date} onChange={setDate} />

   Variants:
     · format: "DD/MM/YYYY" (default) | "MM/DD/YYYY" | "YYYY-MM-DD"
     · placeholder, disabled, minDate, maxDate, disabledDays
     · placement: passa pro Popover (default: bottom-start)

   O input aceita digitação manual com máscara automática:
     "0" → "0"
     "06" → "06"
     "061" → "06/1"
     "06121990" → "06/12/1990"

   Quando o usuário pressiona Enter com data válida, seleciona e
   fecha. Esc fecha sem alterar.
================================================================ */

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (value: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabledDays?: (date: Date) => boolean;
  weekStartsOn?: 0 | 1;
  format?: DateFormat;
  placement?: PopoverPlacement;
  width?: number | string;
  id?: string;
  className?: string;
  ariaLabel?: string;
}

export function DatePicker({
  value = null,
  onChange,
  placeholder,
  disabled = false,
  minDate,
  maxDate,
  disabledDays,
  weekStartsOn = 0,
  format = "DD/MM/YYYY",
  placement = "bottom-start",
  width = "100%",
  id,
  className = "",
  ariaLabel,
}: DatePickerProps) {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(formatDate(value, format));
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Sincroniza text ↔ value externo
  useEffect(() => {
    setText(formatDate(value, format));
  }, [value, format]);

  const commitText = () => {
    const parsed = parseDate(text, format);
    if (!parsed) {
      // Inválida — restaura ao último válido
      setText(formatDate(value, format));
      return;
    }
    if (minDate && isBefore(parsed, minDate)) {
      setText(formatDate(value, format));
      return;
    }
    if (maxDate && isAfter(parsed, maxDate)) {
      setText(formatDate(value, format));
      return;
    }
    if (disabledDays && disabledDays(parsed)) {
      setText(formatDate(value, format));
      return;
    }
    onChange?.(parsed);
    setText(formatDate(parsed, format));
  };

  const handleSelect = (d: Date | null) => {
    onChange?.(d);
    setText(formatDate(d, format));
    setOpen(false);
    inputRef.current?.focus();
  };

  const cls = ["ds-datepicker"];
  if (disabled) cls.push("disabled");
  if (className) cls.push(className);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={cls.join(" ")} style={{ width }}>
        <div className="ds-datepicker-input-wrap">
          <input
            ref={inputRef}
            id={id}
            type="text"
            inputMode="numeric"
            className="ds-datepicker-input"
            value={text}
            placeholder={placeholder ?? format.toLowerCase()}
            disabled={disabled}
            aria-label={ariaLabel}
            onChange={(e) => setText(maskDate(e.target.value, format))}
            onBlur={commitText}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commitText();
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
            className="ds-datepicker-trigger"
            disabled={disabled}
            aria-label={t("ds.calendar.openPicker")}
            onClick={() => setOpen((v) => !v)}
          >
            <CalendarGlyph />
          </button>
        </div>
        <PopoverContent placement={placement} minWidth={300}>
          <Calendar
            value={value}
            onChange={handleSelect}
            minDate={minDate}
            maxDate={maxDate}
            disabledDays={disabledDays}
            weekStartsOn={weekStartsOn}
            ariaLabel={ariaLabel}
          />
        </PopoverContent>
      </div>
    </Popover>
  );
}

/* ================================================================
   DateRangePicker — input duplo + 2 calendars side-by-side.
   ----------------------------------------------------------------
     <DateRangePicker
       value={[start, end]}
       onChange={setRange}
     />

   Mostra 2 meses lado a lado. Nav prev avança/recua os DOIS juntos.
================================================================ */

export interface DateRangePickerProps {
  value?: CalendarRange;
  onChange?: (value: CalendarRange) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabledDays?: (date: Date) => boolean;
  weekStartsOn?: 0 | 1;
  format?: DateFormat;
  placement?: PopoverPlacement;
  width?: number | string;
  id?: string;
  className?: string;
  ariaLabel?: string;
}

export function DateRangePicker({
  value = [null, null],
  onChange,
  placeholder,
  disabled = false,
  minDate,
  maxDate,
  disabledDays,
  weekStartsOn = 0,
  format = "DD/MM/YYYY",
  placement = "bottom-start",
  width = "100%",
  id,
  className = "",
  ariaLabel,
}: DateRangePickerProps) {
  const { t } = useT();
  const [open, setOpen] = useState(false);

  const [a, b] = value;
  const text = a && b
    ? `${formatDate(a, format)} → ${formatDate(b, format)}`
    : a
      ? `${formatDate(a, format)} → …`
      : "";

  const handleChange = (next: CalendarRange) => {
    onChange?.(next);
    if (next[0] && next[1]) {
      setOpen(false);
    }
  };

  const cls = ["ds-datepicker", "range"];
  if (disabled) cls.push("disabled");
  if (className) cls.push(className);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={cls.join(" ")} style={{ width }}>
        <div
          className="ds-datepicker-input-wrap"
          onClick={() => !disabled && setOpen((v) => !v)}
        >
          <input
            id={id}
            type="text"
            readOnly
            className="ds-datepicker-input"
            value={text}
            placeholder={placeholder ?? `${format.toLowerCase()} → ${format.toLowerCase()}`}
            disabled={disabled}
            aria-label={ariaLabel}
            onKeyDown={(e) => {
              if (e.key === "Escape" && open) setOpen(false);
              else if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                if (!disabled) setOpen((v) => !v);
              }
            }}
          />
          <button
            type="button"
            className="ds-datepicker-trigger"
            disabled={disabled}
            aria-label={t("ds.calendar.openPicker")}
            onClick={(e) => {
              e.stopPropagation();
              setOpen((v) => !v);
            }}
          >
            <CalendarGlyph />
          </button>
        </div>
        <PopoverContent placement={placement} minWidth={620}>
          <div className="ds-datepicker-range-cals">
            <Calendar
              mode="range"
              value={value}
              onChange={handleChange}
              defaultMonth={a ?? undefined}
              minDate={minDate}
              maxDate={maxDate}
              disabledDays={disabledDays}
              weekStartsOn={weekStartsOn}
              showTodayButton={false}
              ariaLabel={t("ds.calendar.rangeStart")}
            />
            <Calendar
              mode="range"
              value={value}
              onChange={handleChange}
              defaultMonth={b ?? (a ? new Date(a.getFullYear(), a.getMonth() + 1, 1) : undefined)}
              minDate={minDate}
              maxDate={maxDate}
              disabledDays={disabledDays}
              weekStartsOn={weekStartsOn}
              showTodayButton={false}
              ariaLabel={t("ds.calendar.rangeEnd")}
            />
          </div>
        </PopoverContent>
      </div>
    </Popover>
  );
}

/* ----------------------------------------------------------------
   CalendarGlyph — pequeno SVG 14×14 do ícone trigger
---------------------------------------------------------------- */
function CalendarGlyph(): ReactNode {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="2"
        y="3.5"
        width="12"
        height="11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <line
        x1="2"
        y1="6.5"
        x2="14"
        y2="6.5"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <line
        x1="5"
        y1="2"
        x2="5"
        y2="5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <line
        x1="11"
        y1="2"
        x2="11"
        y2="5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}
