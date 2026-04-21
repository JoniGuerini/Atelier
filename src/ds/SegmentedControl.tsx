import { createContext, useContext, useMemo, type ReactNode } from "react";

/* ================================================================
   SegmentedControl — toggle exclusivo fora de Tabs (Fase 15.1)
   ----------------------------------------------------------------
   Visual alinhado à variante segmented de Tabs, API dedicada para
   filtros de vista, período, etc. — sem painéis de conteúdo.

     <SegmentedControl value={v} onChange={setV} aria-label="Period">
       <SegmentedControlItem value="d">Day</SegmentedControlItem>
       <SegmentedControlItem value="w">Week</SegmentedControlItem>
     </SegmentedControl>
   ================================================================ */

interface SegmentedControlContextValue {
  value: string;
  onChange: (next: string) => void;
  disabled: boolean;
}

const SegmentedControlContext = createContext<SegmentedControlContextValue | null>(null);

function useSegCtx(name: string): SegmentedControlContextValue {
  const ctx = useContext(SegmentedControlContext);
  if (!ctx) throw new Error(`[Atelier] <${name}> must be inside <SegmentedControl>.`);
  return ctx;
}

export interface SegmentedControlProps {
  value: string;
  onChange: (next: string) => void;
  /** Orientação vertical (lista empilhada). */
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
  children?: ReactNode;
}

export function SegmentedControl({
  value,
  onChange,
  orientation = "horizontal",
  disabled = false,
  className = "",
  "aria-label": ariaLabel,
  children,
}: SegmentedControlProps) {
  const ctx = useMemo(
    () => ({ value, onChange, disabled }),
    [value, onChange, disabled]
  );
  const cls = [
    "ds-seg",
    orientation === "vertical" ? "orientation-vertical" : "orientation-horizontal",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <SegmentedControlContext.Provider value={ctx}>
      <div className={cls} role="radiogroup" aria-label={ariaLabel}>
        {children}
      </div>
    </SegmentedControlContext.Provider>
  );
}

export interface SegmentedControlItemProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

export function SegmentedControlItem({
  value,
  disabled: itemDisabled,
  className = "",
  children,
}: SegmentedControlItemProps) {
  const ctx = useSegCtx("SegmentedControlItem");
  const active = ctx.value === value;
  const disabled = ctx.disabled || itemDisabled;
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      disabled={disabled}
      className={`ds-seg-item ${active ? "is-active" : ""} ${className}`.trim()}
      onClick={() => {
        if (!disabled && value !== ctx.value) ctx.onChange(value);
      }}
    >
      <span className="ds-seg-item-label">{children}</span>
    </button>
  );
}
