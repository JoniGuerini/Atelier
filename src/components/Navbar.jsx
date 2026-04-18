import { createContext, useContext } from "react";
import { ROUTE_BY_ID } from "../lib/routes.js";
import { useT } from "../lib/i18n.jsx";
import { ThemeToggle, NavModeToggle } from "../ds/primitives.jsx";

/* ================================================================
   Navbar — API composable (estilo shadcn)
   ----------------------------------------------------------------
   <Navbar>
     <NavbarBrand onNavigate={...} />
     <NavbarNav ariaLabel={...}>
       <NavbarDropdown label="Foundations" active={...}>
         <NavbarDropdownItem href="#/colors" active n="02">Colors</NavbarDropdownItem>
       </NavbarDropdown>
     </NavbarNav>
     <NavbarActions>
       <LocaleSwitch />
       <ThemeToggle />
       <NavModeToggle ... />
     </NavbarActions>
   </Navbar>
   ================================================================ */

const NavbarContext = createContext({ current: null, onNavigate: () => {} });

function useNavbar() {
  return useContext(NavbarContext);
}

export function Navbar({ current, onNavigate, children, className = "" }) {
  const classes = ["site-navbar"];
  if (className) classes.push(className);
  return (
    <NavbarContext.Provider value={{ current, onNavigate }}>
      <header className={classes.join(" ")} role="banner">
        <div className="site-navbar-inner">{children}</div>
      </header>
    </NavbarContext.Provider>
  );
}

export function NavbarBrand({ target = "overview", children }) {
  const { t } = useT();
  const { onNavigate } = useNavbar();
  return (
    <a
      href={`#/${target}`}
      className="site-navbar-brand"
      onClick={(e) => {
        e.preventDefault();
        onNavigate?.(target);
      }}
    >
      <span className="wordmark">
        {children ?? (
          <>
            {t("nav.brand.title")}
            <em>.</em>
          </>
        )}
      </span>
    </a>
  );
}

export function NavbarNav({ ariaLabel = "Primary", children }) {
  return (
    <nav className="site-navbar-nav" aria-label={ariaLabel}>
      <ul>{children}</ul>
    </nav>
  );
}

/* Dropdown — abre por hover (e por focus-within para teclado).
   `active` é controlado pelo consumidor (ex: algum item filho é current). */
export function NavbarDropdown({ label, active = false, children }) {
  return (
    <li className={`nav-menu ${active ? "active" : ""}`}>
      <button type="button" className="nav-menu-trigger" aria-haspopup="true">
        <span>{label}</span>
        <span className="nav-menu-chev" aria-hidden="true">▾</span>
      </button>
      <NavbarDropdownPanel>{children}</NavbarDropdownPanel>
    </li>
  );
}

export function NavbarDropdownPanel({ children }) {
  return (
    <div className="nav-menu-panel" role="menu">
      <ul>{children}</ul>
    </div>
  );
}

export function NavbarDropdownItem({
  href,
  slug,
  active = false,
  n,
  children,
}) {
  const { onNavigate } = useNavbar();
  const url = href ?? (slug ? `#/${slug}` : "#");
  return (
    <li role="none">
      <a
        role="menuitem"
        href={url}
        className={`nav-menu-item ${active ? "is-current" : ""}`}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey) return;
          if (slug) {
            e.preventDefault();
            onNavigate?.(slug);
          }
        }}
      >
        {n != null && <span className="n">{n}</span>}
        <span className="label">{children}</span>
      </a>
    </li>
  );
}

export function NavbarActions({ children }) {
  return <div className="site-navbar-actions">{children}</div>;
}

/* LocaleSwitch — extraído para que NavbarActions fique self-contained */
export function NavbarLocale() {
  const { t, locale, setLocale, locales } = useT();
  return (
    <div
      className="locale-switch"
      role="group"
      aria-label={t("nav.footer.language")}
    >
      {locales.map((l) => (
        <button
          key={l.id}
          type="button"
          className={`locale-btn ${locale === l.id ? "active" : ""}`}
          onClick={() => setLocale(l.id)}
          aria-pressed={locale === l.id}
          title={l.label}
        >
          {l.short}
        </button>
      ))}
    </div>
  );
}

// Re-exporta para que o consumidor possa usar dentro de NavbarActions sem outro import
export { ThemeToggle, NavModeToggle, ROUTE_BY_ID };
