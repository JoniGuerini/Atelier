import { createContext, useContext, type ReactNode } from "react";
import type { TabsProps, TabProps, TabPanelProps } from "./types.ts";

/* ================================================================
   Tabs — API composable, agora com 5 variantes + 2 orientações.
   ----------------------------------------------------------------
     <Tabs value={tab} onChange={setTab} variant="enclosed">
       <TabList>
         <Tab value="a">A</Tab>
         <Tab value="b">B</Tab>
       </TabList>
       <TabPanels>
         <TabPanel value="a">…</TabPanel>
         <TabPanel value="b">…</TabPanel>
       </TabPanels>
     </Tabs>

   variant:
     · "underline" (default) — linha accent embaixo do ativo,
        divisor sutil. O canon editorial.
     · "enclosed"            — abas com bordas, conectadas ao
        painel embaixo (estilo cadernos/pastas).
     · "pills"               — ativo com fundo accent, ângulos
        retos (sem radius, fiel ao DNA).
     · "segmented"           — todos numa caixa única, ativo
        invertido (estilo ThemeToggle/NavModeToggle).
     · "minimal"             — só texto. Ativo em accent +
        peso heavier. Para listas longas e contextos densos.

   orientation:
     · "horizontal" (default)
     · "vertical"            — TabList em coluna na esquerda,
        TabPanels do lado.

   Backward-compat: sem variant → underline (visual idêntico
   ao que existia antes).
   ================================================================ */

export type TabsVariant =
  | "underline"
  | "enclosed"
  | "pills"
  | "segmented"
  | "minimal";
export type TabsOrientation = "horizontal" | "vertical";

interface TabsContextValue {
  value: any;
  onChange: (value: any) => void;
  variant: TabsVariant;
  orientation: TabsOrientation;
}

interface TabsPropsExt extends TabsProps {
  variant?: TabsVariant;
  orientation?: TabsOrientation;
  className?: string;
}

interface TabListProps {
  children?: ReactNode;
  ariaLabel?: string;
}
interface TabPanelsProps {
  children?: ReactNode;
}
interface TabPropsExt extends TabProps {
  disabled?: boolean;
  /** Glifo opcional antes do label (ex: ✓, §, ●). */
  glyph?: ReactNode;
  /** Contador opcional depois do label (ex: 12). */
  count?: number | string;
}

const TabsContext = createContext<TabsContextValue>({
  value: null,
  onChange: () => {},
  variant: "underline",
  orientation: "horizontal",
});

function useTabs() {
  return useContext(TabsContext);
}

export function Tabs({
  value,
  onChange,
  children,
  variant = "underline",
  orientation = "horizontal",
  className = "",
}: TabsPropsExt) {
  const cls = [
    "ds-tabs-root",
    `variant-${variant}`,
    `orientation-${orientation}`,
  ];
  if (className) cls.push(className);
  return (
    <TabsContext.Provider value={{ value, onChange, variant, orientation }}>
      <div className={cls.join(" ")}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabList({ children, ariaLabel }: TabListProps) {
  const { variant, orientation } = useTabs();
  return (
    <div
      className={`ds-tabs variant-${variant} orientation-${orientation}`}
      role="tablist"
      aria-orientation={orientation}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}

export function Tab({
  value,
  children,
  disabled = false,
  glyph,
  count,
}: TabPropsExt) {
  const ctx = useTabs();
  const active = ctx.value === value;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      disabled={disabled}
      className={`ds-tab variant-${ctx.variant} ${active ? "active" : ""}`}
      onClick={() => ctx.onChange?.(value)}
    >
      {glyph != null && (
        <span className="ds-tab-glyph" aria-hidden="true">
          {glyph}
        </span>
      )}
      <span className="ds-tab-label">{children}</span>
      {count != null && (
        <span className="ds-tab-count" aria-hidden="true">
          {count}
        </span>
      )}
    </button>
  );
}

export function TabPanels({ children }: TabPanelsProps) {
  const { orientation } = useTabs();
  return (
    <div className={`ds-tab-panels orientation-${orientation}`}>{children}</div>
  );
}

export function TabPanel({ value, children }: TabPanelProps) {
  const ctx = useTabs();
  if (ctx.value !== value) return null;
  return (
    <div className="ds-tab-panel" role="tabpanel">
      {children}
    </div>
  );
}
