import { createContext, useContext } from "react";
import { ROUTE_BY_ID } from "../lib/routes.ts";
import { useT } from "../lib/i18n.tsx";
import {
  SidebarToggle,
  ThemeToggle,
  NavModeToggle,
} from "../ds/primitives.tsx";

/* ================================================================
   Sidebar — API composable (estilo shadcn)
   ----------------------------------------------------------------
   O <Sidebar /> é apenas o invólucro. A estrutura interna é montada
   pelo consumidor através dos subcomponentes exportados:

     <Sidebar collapsed={...}>
       <SidebarHead>
         <SidebarBrand onNavigate={...} />
         <SidebarToggle ... />
       </SidebarHead>
       <SidebarNav>
         <SidebarGroup>
           <SidebarGroupTitle>...</SidebarGroupTitle>
           <SidebarNavItem n="01" active onClick={...}>...</SidebarNavItem>
         </SidebarGroup>
       </SidebarNav>
       <SidebarLocale />
       <SidebarTheme />
       <SidebarNavMode mode={...} onChange={...} />
       <SidebarFooter />
     </Sidebar>

   `collapsed` é compartilhado pelo Context para que itens profundos
   (NavItem, controles do rodapé) possam ajustar tabIndex/aria-hidden
   sem prop drilling.
   ================================================================ */

const SidebarContext = createContext({ collapsed: false });

function useSidebar() {
  return useContext(SidebarContext);
}

export function Sidebar({ collapsed = false, children, className = "" }: any) {
  const classes = ["sidebar"];
  if (className) classes.push(className);
  return (
    <SidebarContext.Provider value={{ collapsed }}>
      <aside
        id="app-sidebar"
        className={classes.join(" ")}
        aria-hidden={collapsed ? "true" : "false"}
      >
        {children}
      </aside>
    </SidebarContext.Provider>
  );
}

/* ---------- Head ---------- */
export function SidebarHead({ children }: any) {
  return <div className="sidebar-head">{children}</div>;
}

export function SidebarBrand({ onNavigate, target = "overview" }: any) {
  const { t } = useT();
  return (
    <a
      href={`#/${target}`}
      className="brand"
      onClick={(e) => {
        e.preventDefault();
        onNavigate?.(target);
      }}
    >
      <div className="wordmark">
        {t("nav.brand.title")}
        <em>.</em>
      </div>
      <div className="caption">{t("nav.brand.caption")}</div>
    </a>
  );
}

/* ---------- Nav ---------- */
export function SidebarNav({ children }: any) {
  return <nav>{children}</nav>;
}

export function SidebarGroup({ children }: any) {
  return <div className="nav-group">{children}</div>;
}

export function SidebarGroupTitle({ children }: any) {
  return <div className="group-title">{children}</div>;
}

export function SidebarNavItem({ n, active = false, onClick, children }: any) {
  const { collapsed } = useSidebar();
  return (
    <button
      type="button"
      className={`nav-item ${active ? "active" : ""}`}
      onClick={onClick}
      tabIndex={collapsed ? -1 : 0}
    >
      {n != null && <span className="n">{n}</span>}
      <span>{children}</span>
    </button>
  );
}

/* ---------- Controles do rodapé ---------- */
export function SidebarLocale() {
  const { t, locale, setLocale, locales } = useT();
  const { collapsed } = useSidebar();
  return (
    <div className="sidebar-locale">
      <div className="group-title">{t("nav.footer.language")}</div>
      <div className="locale-switch" role="group" aria-label="Language">
        {locales.map((l) => (
          <button
            key={l.id}
            type="button"
            className={`locale-btn ${locale === l.id ? "active" : ""}`}
            onClick={() => setLocale(l.id as any)}
            aria-pressed={locale === l.id}
            title={l.label}
            tabIndex={collapsed ? -1 : 0}
          >
            {l.short}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SidebarTheme() {
  const { t } = useT();
  const { collapsed } = useSidebar();
  return (
    <div className="sidebar-theme" aria-hidden={collapsed ? "true" : "false"}>
      <div className="group-title">{t("nav.footer.theme")}</div>
      <ThemeToggle variant="compact" />
    </div>
  );
}

export function SidebarNavMode({ mode, onChange }: any) {
  const { t } = useT();
  const { collapsed } = useSidebar();
  if (!onChange) return null;
  return (
    <div className="sidebar-navmode" aria-hidden={collapsed ? "true" : "false"}>
      <div className="group-title">{t("nav.mode.label")}</div>
      <NavModeToggle mode={mode} onChange={onChange} />
    </div>
  );
}

/* ---------- Footer ---------- */
export function SidebarFooter({ children }: any) {
  const { t } = useT();
  return (
    <div className="sidebar-footer">
      {children ?? (
        <>
          <b>{t("nav.footer.study")}</b>
          <br />
          {t("nav.footer.stack")}
        </>
      )}
    </div>
  );
}

// re-export mapping for convenience elsewhere
export { ROUTE_BY_ID };
