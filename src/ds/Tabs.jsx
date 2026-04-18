import { createContext, useContext } from "react";

/* ================================================================
   Tabs — API composable.
   ----------------------------------------------------------------
     <Tabs value={tab} onChange={setTab}>
       <TabList>
         <Tab value="a">A</Tab>
         <Tab value="b">B</Tab>
       </TabList>
       <TabPanels>
         <TabPanel value="a">…</TabPanel>
         <TabPanel value="b">…</TabPanel>
       </TabPanels>
     </Tabs>
   ================================================================ */

const TabsContext = createContext({ value: null, onChange: () => {} });

function useTabs() {
  return useContext(TabsContext);
}

export function Tabs({ value, onChange, children }) {
  return (
    <TabsContext.Provider value={{ value, onChange }}>
      {children}
    </TabsContext.Provider>
  );
}

export function TabList({ children, ariaLabel }) {
  return (
    <div className="ds-tabs" role="tablist" aria-label={ariaLabel}>
      {children}
    </div>
  );
}

export function Tab({ value, children, disabled = false }) {
  const ctx = useTabs();
  const active = ctx.value === value;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      disabled={disabled}
      className={`ds-tab ${active ? "active" : ""}`}
      onClick={() => ctx.onChange?.(value)}
    >
      {children}
    </button>
  );
}

export function TabPanels({ children }) {
  return <div className="ds-tab-panels">{children}</div>;
}

export function TabPanel({ value, children }) {
  const ctx = useTabs();
  if (ctx.value !== value) return null;
  return (
    <div className="ds-tab-panel" role="tabpanel">
      {children}
    </div>
  );
}
