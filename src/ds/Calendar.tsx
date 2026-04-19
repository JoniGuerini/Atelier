import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useT } from "../lib/i18n.tsx";
import {
  addDays,
  addMonths,
  addYears,
  cloneDate,
  endOfMonth,
  getMonthGrid,
  isAfter,
  isBefore,
  isInRange,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  today,
  type CalendarCell,
} from "./calendarUtils.ts";

/* ================================================================
   Calendar — view de mês inteiro com seleção single, range ou
   multiple. Lógica em JS puro (sem date-fns).
   ----------------------------------------------------------------
   API uniforme (controlada):
     <Calendar value={date} onChange={setDate} />              // single
     <Calendar mode="range" value={[a, b]} onChange={setR} />  // range
     <Calendar mode="multiple" value={[d1, d2]} onChange={setM} />

   Behavior:
     · Header com mês/ano + chevrons prev/next + botão "Hoje"
     · Grid 6×7 (sempre 6 semanas pra altura estável)
     · Hoje destacado, dias fora do mês esmaecidos
     · min/max date opcional
     · disabledDays(date) opcional (function pra disable de qualquer regra)
     · Keyboard nav completa (←→↑↓ Home End PageUp PageDown +Shift)
     · Range: clica primeiro a "start", depois "end"; hover entre
       primeiro click e segundo click mostra preview
================================================================ */

export type CalendarMode = "single" | "range" | "multiple";

export type CalendarRange = [Date | null, Date | null];

interface CalendarCommonProps {
  /** Data inicial mostrada quando não há value. Default: today. */
  defaultMonth?: Date;
  /** Limites do range navegável. */
  minDate?: Date;
  maxDate?: Date;
  /** Predicado pra desabilitar dias específicos. */
  disabledDays?: (date: Date) => boolean;
  /** Domingo (0) ou segunda (1). Default: 0. */
  weekStartsOn?: 0 | 1;
  /** Mostra botão "Hoje" no header. Default: true. */
  showTodayButton?: boolean;
  className?: string;
  ariaLabel?: string;
}

export interface CalendarSingleProps extends CalendarCommonProps {
  mode?: "single";
  value?: Date | null;
  onChange?: (value: Date | null) => void;
}

export interface CalendarRangeProps extends CalendarCommonProps {
  mode: "range";
  value?: CalendarRange;
  onChange?: (value: CalendarRange) => void;
}

export interface CalendarMultipleProps extends CalendarCommonProps {
  mode: "multiple";
  value?: Date[];
  onChange?: (value: Date[]) => void;
}

export type CalendarProps =
  | CalendarSingleProps
  | CalendarRangeProps
  | CalendarMultipleProps;

/* ----------------------------------------------------------------
   Helper: data "anchor" pra navegação por teclado
---------------------------------------------------------------- */
function getAnchor(props: CalendarProps): Date {
  if (props.mode === "range") {
    const [a, b] = (props.value as CalendarRange) ?? [null, null];
    return a ?? b ?? today();
  }
  if (props.mode === "multiple") {
    const arr = (props.value as Date[]) ?? [];
    return arr[arr.length - 1] ?? today();
  }
  return (props.value as Date | null) ?? today();
}

/* ----------------------------------------------------------------
   Calendar
---------------------------------------------------------------- */
export function Calendar(props: CalendarProps) {
  const {
    defaultMonth,
    minDate,
    maxDate,
    disabledDays,
    weekStartsOn = 0,
    showTodayButton = true,
    className = "",
    ariaLabel,
  } = props;
  const mode = props.mode ?? "single";
  const { t, locale } = useT();

  // Mês visível (independente do value — pode navegar livremente)
  const [viewMonth, setViewMonth] = useState<Date>(() =>
    startOfMonth(defaultMonth ?? getAnchor(props)),
  );
  // Foco do teclado dentro do grid
  const [focused, setFocused] = useState<Date>(() =>
    startOfDay(getAnchor(props)),
  );
  // Preview de range entre primeiro click e hover
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  // Quando o value muda externamente, ajusta o viewMonth se tiver
  // mudado de mês — não muda se a data ainda está no mesmo mês.
  useEffect(() => {
    const a = getAnchor(props);
    if (!isSameMonth(a, viewMonth)) {
      setViewMonth(startOfMonth(a));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

  const grid = useMemo(
    () => getMonthGrid(viewMonth, weekStartsOn),
    [viewMonth, weekStartsOn],
  );

  /* ----- helpers de checagem ----- */
  const isDisabled = useCallback(
    (d: Date): boolean => {
      if (minDate && isBefore(d, minDate)) return true;
      if (maxDate && isAfter(d, maxDate)) return true;
      if (disabledDays && disabledDays(d)) return true;
      return false;
    },
    [minDate, maxDate, disabledDays],
  );

  const isSelected = useCallback(
    (d: Date): boolean => {
      if (mode === "single") {
        const v = props.value as Date | null | undefined;
        return v ? isSameDay(d, v) : false;
      }
      if (mode === "range") {
        const [a, b] = ((props.value as CalendarRange) ?? [null, null]);
        if (a && isSameDay(d, a)) return true;
        if (b && isSameDay(d, b)) return true;
        return false;
      }
      // multiple
      const arr = (props.value as Date[]) ?? [];
      return arr.some((x) => isSameDay(d, x));
    },
    [mode, props.value],
  );

  /** Para mode="range": dia está dentro do intervalo (start, end). */
  const isInSelectedRange = useCallback(
    (d: Date): boolean => {
      if (mode !== "range") return false;
      const [a, b] = ((props.value as CalendarRange) ?? [null, null]);
      if (a && b) return isInRange(d, a, b);
      // Preview enquanto hover (1º click feito, esperando 2º)
      if (a && !b && hoverDate) {
        const start = isBefore(hoverDate, a) ? hoverDate : a;
        const end = isBefore(hoverDate, a) ? a : hoverDate;
        return isInRange(d, start, end);
      }
      return false;
    },
    [mode, props.value, hoverDate],
  );

  /* ----- ações ----- */
  const handleSelect = (d: Date) => {
    if (isDisabled(d)) return;
    if (mode === "single") {
      const single = props as CalendarSingleProps;
      const isCurrent =
        single.value && isSameDay(single.value, d);
      single.onChange?.(isCurrent ? null : cloneDate(d));
      return;
    }
    if (mode === "range") {
      const r = props as CalendarRangeProps;
      const [a, b] = (r.value ?? [null, null]) as CalendarRange;
      if (!a || (a && b)) {
        // Começo de novo range
        r.onChange?.([cloneDate(d), null]);
        setHoverDate(null);
      } else {
        // Fechar o range
        const start = isBefore(d, a) ? cloneDate(d) : cloneDate(a);
        const end = isBefore(d, a) ? cloneDate(a) : cloneDate(d);
        r.onChange?.([start, end]);
        setHoverDate(null);
      }
      return;
    }
    // multiple
    const m = props as CalendarMultipleProps;
    const arr = (m.value ?? []) as Date[];
    const exists = arr.some((x) => isSameDay(x, d));
    m.onChange?.(
      exists ? arr.filter((x) => !isSameDay(x, d)) : [...arr, cloneDate(d)],
    );
  };

  /* ----- keyboard ----- */
  const gridRef = useRef<HTMLDivElement | null>(null);
  const moveFocus = (next: Date) => {
    const clamped =
      minDate && isBefore(next, minDate)
        ? cloneDate(minDate)
        : maxDate && isAfter(next, maxDate)
          ? cloneDate(maxDate)
          : next;
    setFocused(clamped);
    if (!isSameMonth(clamped, viewMonth)) {
      setViewMonth(startOfMonth(clamped));
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      moveFocus(addDays(focused, -1));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      moveFocus(addDays(focused, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      moveFocus(addDays(focused, -7));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      moveFocus(addDays(focused, 7));
    } else if (e.key === "Home") {
      e.preventDefault();
      const day = focused.getDay();
      const offset = (day - weekStartsOn + 7) % 7;
      moveFocus(addDays(focused, -offset));
    } else if (e.key === "End") {
      e.preventDefault();
      const day = focused.getDay();
      const offset = (day - weekStartsOn + 7) % 7;
      moveFocus(addDays(focused, 6 - offset));
    } else if (e.key === "PageUp") {
      e.preventDefault();
      moveFocus(e.shiftKey ? addYears(focused, -1) : addMonths(focused, -1));
    } else if (e.key === "PageDown") {
      e.preventDefault();
      moveFocus(e.shiftKey ? addYears(focused, 1) : addMonths(focused, 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(focused);
    }
  };

  // Refoca a célula focada quando ela mudar (mantém visível)
  useEffect(() => {
    const el = gridRef.current?.querySelector<HTMLButtonElement>(
      ".ds-cal-day.focused",
    );
    el?.focus({ preventScroll: true });
  }, [focused]);

  /* ----- header ----- */
  const goPrev = () => setViewMonth((m) => addMonths(m, -1));
  const goNext = () => setViewMonth((m) => addMonths(m, 1));
  const goToday = () => {
    const tdy = today();
    setViewMonth(startOfMonth(tdy));
    setFocused(tdy);
  };

  /* ----- nomes localizados (Intl) ----- */
  const monthName = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === "en" ? "en-US" : "pt-BR", {
        month: "long",
        year: "numeric",
      }).format(viewMonth),
    [viewMonth, locale],
  );

  const dowNames = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(
      locale === "en" ? "en-US" : "pt-BR",
      { weekday: "narrow" },
    );
    const base = new Date(2024, 0, 7); // 2024-01-07 era um domingo
    return Array.from({ length: 7 }, (_, i) =>
      fmt.format(addDays(base, i + weekStartsOn)),
    );
  }, [locale, weekStartsOn]);

  /* ----- render ----- */
  const cls = ["ds-cal"];
  if (className) cls.push(className);

  return (
    <div className={cls.join(" ")} role="group" aria-label={ariaLabel}>
      {/* Header */}
      <div className="ds-cal-head">
        <button
          type="button"
          className="ds-cal-nav"
          onClick={goPrev}
          aria-label={t("ds.calendar.prev")}
        >
          ‹
        </button>
        <span className="ds-cal-title" aria-live="polite">
          {monthName}
        </span>
        <button
          type="button"
          className="ds-cal-nav"
          onClick={goNext}
          aria-label={t("ds.calendar.next")}
        >
          ›
        </button>
        {showTodayButton && (
          <button
            type="button"
            className="ds-cal-today"
            onClick={goToday}
            aria-label={t("ds.calendar.today")}
          >
            {t("ds.calendar.today")}
          </button>
        )}
      </div>

      {/* DOW header */}
      <div className="ds-cal-dow" role="row">
        {dowNames.map((n, i) => (
          <span key={i} className="ds-cal-dow-cell">
            {n}
          </span>
        ))}
      </div>

      {/* Grid 6×7 */}
      <div
        ref={gridRef}
        className="ds-cal-grid"
        role="grid"
        onKeyDown={onKeyDown}
        onMouseLeave={() => setHoverDate(null)}
      >
        {grid.map((cell: CalendarCell, i) => {
          const sel = isSelected(cell.date);
          const inRange = isInSelectedRange(cell.date);
          const dis = isDisabled(cell.date);
          const isFocused = isSameDay(cell.date, focused);
          const cellCls = ["ds-cal-day"];
          if (!cell.inMonth) cellCls.push("out");
          if (cell.isToday) cellCls.push("today");
          if (sel) cellCls.push("selected");
          if (inRange && !sel) cellCls.push("in-range");
          if (dis) cellCls.push("disabled");
          if (isFocused) cellCls.push("focused");
          return (
            <button
              key={i}
              type="button"
              role="gridcell"
              tabIndex={isFocused ? 0 : -1}
              disabled={dis}
              aria-selected={sel}
              aria-current={cell.isToday ? "date" : undefined}
              className={cellCls.join(" ")}
              onClick={() => handleSelect(cell.date)}
              onMouseEnter={() =>
                mode === "range" ? setHoverDate(cell.date) : undefined
              }
            >
              {cell.date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export type { CalendarCell };
