import { createContext, useContext, useRef, useState } from "react";
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

/* ---------- Menu state ----------
   Controle de qual dropdown está aberto (compartilhado entre triggers
   e painéis). Um pequeno timeout (120ms) ao sair com o mouse permite
   atravessar o gap vertical/horizontal entre trigger e painel sem
   fechar — o painel fica ancorado à nav inteira (não ao trigger),
   então o usuário precisa de uma "ponte" temporal. */
const MenuStateContext = createContext({
  activeKey: null,
  open: () => {},
  scheduleClose: () => {},
  cancelClose: () => {},
});

function useMenuState() {
  return useContext(MenuStateContext);
}

function MenuStateProvider({ children }) {
  const [activeKey, setActiveKey] = useState(null);
  const timerRef = useRef(null);

  const cancelClose = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const open = (key) => {
    cancelClose();
    setActiveKey(key);
  };

  const scheduleClose = () => {
    cancelClose();
    timerRef.current = setTimeout(() => setActiveKey(null), 120);
  };

  return (
    <MenuStateContext.Provider value={{ activeKey, open, scheduleClose, cancelClose }}>
      {children}
    </MenuStateContext.Provider>
  );
}

export function Navbar({ current, onNavigate, children, className = "" }) {
  const classes = ["site-navbar"];
  if (className) classes.push(className);
  return (
    <NavbarContext.Provider value={{ current, onNavigate }}>
      <MenuStateProvider>
        <header className={classes.join(" ")} role="banner">
          <div className="site-navbar-inner">{children}</div>
        </header>
      </MenuStateProvider>
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

/* Dropdown — controlado pelo MenuStateProvider.
   `active` é só visual (algum item filho é current).
   `cols` define o layout do painel (1 / 2 / 3). */
export function NavbarDropdown({ label, active = false, cols = 1, children }) {
  // Chave única para identificar este menu no estado compartilhado.
  // Usamos a label como chave (estável o suficiente em runtime).
  const keyRef = useRef(`menu-${Math.random().toString(36).slice(2, 9)}`);
  const key = keyRef.current;
  const { activeKey, open, scheduleClose } = useMenuState();
  const isOpen = activeKey === key;

  return (
    <li
      className={`nav-menu ${active ? "active" : ""} ${isOpen ? "open" : ""}`}
      onMouseEnter={() => open(key)}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className="nav-menu-trigger"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onFocus={() => open(key)}
      >
        <span>{label}</span>
        <span className="nav-menu-chev" aria-hidden="true">▾</span>
      </button>
      <NavbarDropdownPanel cols={cols} isOpen={isOpen}>
        {children}
      </NavbarDropdownPanel>
    </li>
  );
}

export function NavbarDropdownPanel({ cols = 1, isOpen = false, children }) {
  const { open, scheduleClose, cancelClose } = useMenuState();
  return (
    <div
      className={`nav-menu-panel cols-${cols} ${isOpen ? "is-open" : ""}`}
      role="menu"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      <ul>{children}</ul>
    </div>
  );
}

/* Item rico: aceita título (children) + `description` opcional. Quando
   o consumidor passa descrição, o item ganha layout em duas linhas
   estilo shadcn — título em serif + descrição em mono pequeno. Quando
   não passa, mantém o formato compacto antigo (n + label). */
export function NavbarDropdownItem({
  href,
  slug,
  active = false,
  n,
  description,
  children,
}) {
  const { onNavigate } = useNavbar();
  const url = href ?? (slug ? `#/${slug}` : "#");
  const rich = !!description;
  return (
    <li role="none">
      <a
        role="menuitem"
        href={url}
        className={`nav-menu-item ${rich ? "rich" : ""} ${active ? "is-current" : ""}`}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey) return;
          if (slug) {
            e.preventDefault();
            onNavigate?.(slug);
          }
        }}
      >
        {n != null && <span className="n">{n}</span>}
        <span className="text">
          <span className="label">{children}</span>
          {rich && <span className="desc">{description}</span>}
        </span>
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
