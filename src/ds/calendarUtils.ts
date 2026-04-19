/* ================================================================
   calendarUtils — date helpers para Calendar / DatePicker.
   ----------------------------------------------------------------
   Sem date-fns. Sem timezones. Trabalhamos em [em]Date local[/em] —
   o consumidor é responsável por converter de/para UTC se precisar.
   Toda função que retorna Date sempre devolve uma cópia (não muta).
   ================================================================ */

/** Cria uma cópia da data (não muta). */
export const cloneDate = (d: Date): Date =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);

/** Retorna a data zerada à meia-noite local. */
export const startOfDay = (d: Date): Date =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);

/** Adiciona N dias (pode ser negativo). */
export const addDays = (d: Date, n: number): Date => {
  const x = cloneDate(d);
  x.setDate(x.getDate() + n);
  return x;
};

/** Adiciona N meses. Trata transbordo de dia (31 jan + 1 mês = 28/29 fev). */
export const addMonths = (d: Date, n: number): Date => {
  const x = cloneDate(d);
  const day = x.getDate();
  x.setDate(1);
  x.setMonth(x.getMonth() + n);
  const lastDay = endOfMonth(x).getDate();
  x.setDate(Math.min(day, lastDay));
  return x;
};

/** Adiciona N anos. */
export const addYears = (d: Date, n: number): Date => addMonths(d, n * 12);

/** Primeiro dia do mês. */
export const startOfMonth = (d: Date): Date =>
  new Date(d.getFullYear(), d.getMonth(), 1);

/** Último dia do mês. */
export const endOfMonth = (d: Date): Date =>
  new Date(d.getFullYear(), d.getMonth() + 1, 0);

/** Compara dois Dates ignorando a hora. */
export const isSameDay = (a: Date | null, b: Date | null): boolean => {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

/** Compara meses (ignora dia). */
export const isSameMonth = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

/** Hoje, à meia-noite local. */
export const today = (): Date => startOfDay(new Date());

/** Verifica se `d` está em [start, end] (inclusive nas duas pontas). */
export const isInRange = (d: Date, start: Date, end: Date): boolean => {
  const t = startOfDay(d).getTime();
  return t >= startOfDay(start).getTime() && t <= startOfDay(end).getTime();
};

/** Verifica se `d` está antes de `ref`. */
export const isBefore = (d: Date, ref: Date): boolean =>
  startOfDay(d).getTime() < startOfDay(ref).getTime();

/** Verifica se `d` está depois de `ref`. */
export const isAfter = (d: Date, ref: Date): boolean =>
  startOfDay(d).getTime() > startOfDay(ref).getTime();

/** Faixa entre duas datas (inclusive). */
export const clampDate = (d: Date, min?: Date, max?: Date): Date => {
  if (min && isBefore(d, min)) return cloneDate(min);
  if (max && isAfter(d, max)) return cloneDate(max);
  return d;
};

/* ----------------------------------------------------------------
   Grid do mês — gera as 6 semanas (42 células) que vão na view.
   Inclui dias do mês anterior/próximo pra preencher a primeira e
   última semana (estilo "leak" típico de calendar grids).
---------------------------------------------------------------- */
export interface CalendarCell {
  date: Date;
  /** Pertence ao mês visível ou é "leak" (anterior/próximo)? */
  inMonth: boolean;
  /** É hoje? */
  isToday: boolean;
}

/**
 * Constrói o grid 6×7 de uma view de mês.
 * @param month — qualquer data dentro do mês desejado (usamos year+month)
 * @param weekStartsOn — 0=domingo (default), 1=segunda
 */
export function getMonthGrid(
  month: Date,
  weekStartsOn: 0 | 1 = 0,
): CalendarCell[] {
  const first = startOfMonth(month);
  const firstDow = first.getDay(); // 0=dom, 6=sáb
  // Quantos dias do mês anterior precisam preencher antes do dia 1
  const offset = (firstDow - weekStartsOn + 7) % 7;
  const start = addDays(first, -offset);
  const tdy = today();

  const cells: CalendarCell[] = [];
  for (let i = 0; i < 42; i++) {
    const d = addDays(start, i);
    cells.push({
      date: d,
      inMonth: isSameMonth(d, month),
      isToday: isSameDay(d, tdy),
    });
  }
  return cells;
}

/* ----------------------------------------------------------------
   Format — DD/MM/YYYY (padrão pt-BR/europeu) e MM/DD/YYYY (en-US).
   Sem libs. Funções puras.
---------------------------------------------------------------- */
export type DateFormat = "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";

const pad = (n: number) => String(n).padStart(2, "0");

export function formatDate(d: Date | null, fmt: DateFormat = "DD/MM/YYYY"): string {
  if (!d) return "";
  const dd = pad(d.getDate());
  const mm = pad(d.getMonth() + 1);
  const yyyy = String(d.getFullYear());
  if (fmt === "DD/MM/YYYY") return `${dd}/${mm}/${yyyy}`;
  if (fmt === "MM/DD/YYYY") return `${mm}/${dd}/${yyyy}`;
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Tenta parsear uma string seguindo o `fmt`. Retorna null se inválida
 * (formato errado, dia inexistente, etc.).
 */
export function parseDate(input: string, fmt: DateFormat = "DD/MM/YYYY"): Date | null {
  if (!input) return null;
  const sep = fmt.includes("-") ? "-" : "/";
  const parts = input.split(sep);
  if (parts.length !== 3) return null;
  let dd: number, mm: number, yyyy: number;
  if (fmt === "DD/MM/YYYY") {
    [dd, mm, yyyy] = parts.map(Number);
  } else if (fmt === "MM/DD/YYYY") {
    [mm, dd, yyyy] = parts.map(Number);
  } else {
    [yyyy, mm, dd] = parts.map(Number);
  }
  if (
    !Number.isFinite(dd) ||
    !Number.isFinite(mm) ||
    !Number.isFinite(yyyy) ||
    yyyy < 1000 ||
    yyyy > 9999 ||
    mm < 1 ||
    mm > 12 ||
    dd < 1 ||
    dd > 31
  ) {
    return null;
  }
  const d = new Date(yyyy, mm - 1, dd);
  // Verifica que a data não foi normalizada (ex: 31/02 vira 03/03)
  if (
    d.getFullYear() !== yyyy ||
    d.getMonth() !== mm - 1 ||
    d.getDate() !== dd
  ) {
    return null;
  }
  return d;
}

/**
 * Aplica máscara DD/MM/YYYY conforme o usuário digita — insere as barras
 * automaticamente. Usado pelo DatePicker pra dar a sensação de "input
 * estruturado" sem usar contenteditable nem libs externas.
 */
export function maskDate(input: string, fmt: DateFormat = "DD/MM/YYYY"): string {
  const sep = fmt.includes("-") ? "-" : "/";
  const digits = input.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (fmt === "YYYY-MM-DD") {
    if (digits.length <= 4) return digits;
    if (digits.length <= 6)
      return `${digits.slice(0, 4)}${sep}${digits.slice(4)}`;
    return `${digits.slice(0, 4)}${sep}${digits.slice(4, 6)}${sep}${digits.slice(6)}`;
  }
  // DD/MM/YYYY ou MM/DD/YYYY
  if (digits.length <= 4)
    return `${digits.slice(0, 2)}${sep}${digits.slice(2)}`;
  return `${digits.slice(0, 2)}${sep}${digits.slice(2, 4)}${sep}${digits.slice(4)}`;
}
