import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { ROUTE_BY_ID } from "../lib/routes.ts";
import { useT } from "../lib/i18n.tsx";
import { ThemeToggle, NavModeToggle } from "../ds/primitives.tsx";
import type {
  NavbarProps,
  NavbarDropdownProps,
  NavbarDropdownItemProps,
} from "../ds/types.ts";

interface SlotProps {
  children?: ReactNode;
}
interface NavbarBrandProps {
  target?: string;
  children?: ReactNode;
}
interface NavbarNavProps {
  ariaLabel?: string;
  children?: ReactNode;
}
interface NavbarDropdownPanelProps {
  cols?: 1 | 2 | 3;
  isOpen?: boolean;
  children?: ReactNode;
}
interface NavbarDropdownItemPropsExt extends NavbarDropdownItemProps {
  href?: string;
  active?: boolean;
}

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

const NavbarContext = createContext<{ current: any; onNavigate: (route: string) => void }>(
  { current: null, onNavigate: () => {} }
);

function useNavbar() {
  return useContext(NavbarContext);
}

/* ---------- Menu state ----------
   Controle de qual dropdown está aberto (compartilhado entre triggers
   e painéis). Um pequeno timeout (120ms) ao sair com o mouse permite
   atravessar o gap vertical/horizontal entre trigger e painel sem
   fechar — o painel fica ancorado à nav inteira (não ao trigger),
   então o usuário precisa de uma "ponte" temporal. */
interface MenuStateValue {
  activeKey: string | null;
  open: (key: string) => void;
  scheduleClose: () => void;
  cancelClose: () => void;
}
const MenuStateContext = createContext<MenuStateValue>({
  activeKey: null,
  open: () => {},
  scheduleClose: () => {},
  cancelClose: () => {},
});

function useMenuState() {
  return useContext(MenuStateContext);
}

function MenuStateProvider({ children }: SlotProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const open = (key: string) => {
    cancelClose();
    setActiveKey(key);
  };

  const scheduleClose = () => {
    cancelClose();
    timerRef.current = setTimeout(() => setActiveKey(null), 180);
  };

  /* ----------------------------------------------------------------
     Quando algum menu está aberto, escutamos mouse moves no document
     pra detectar com precisão se o cursor saiu da combinação
     (.site-navbar-nav + .nav-menu-panel.is-open). Os listeners
     individuais nos elementos têm pontos cegos (gaps entre triggers,
     entrada direta vinda de fora etc.); o detector global é o único
     jeito 100% confiável de fechar SOMENTE quando o cursor está
     realmente fora.
  ---------------------------------------------------------------- */
  useEffect(() => {
    if (!activeKey) return;
    const onMove = (e: MouseEvent) => {
      const nav = document.querySelector(".site-navbar-nav");
      const panel = document.querySelector(".nav-menu-panel.is-open");
      const target = e.target as Node;
      const inside =
        (nav && nav.contains(target)) ||
        (panel && panel.contains(target));
      if (inside) {
        cancelClose();
      } else {
        // Já agendado? Mantém. Senão, agenda.
        if (!timerRef.current) {
          timerRef.current = setTimeout(() => setActiveKey(null), 180);
        }
      }
    };
    document.addEventListener("mouseover", onMove);
    return () => document.removeEventListener("mouseover", onMove);
  }, [activeKey]);

  return (
    <MenuStateContext.Provider value={{ activeKey, open, scheduleClose, cancelClose }}>
      {children}
    </MenuStateContext.Provider>
  );
}

export function Navbar({ current, onNavigate, children, className = "" }: NavbarProps & { className?: string }) {
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

export function NavbarBrand({ target = "overview", children }: NavbarBrandProps) {
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

export function NavbarNav({ ariaLabel = "Primary", children }: NavbarNavProps) {
  // O abre/fecha não usa mais onMouseEnter/Leave aqui — o detector
  // global no MenuStateProvider (mouseover no document) cuida de
  // tudo com precisão, evitando os pontos cegos de listeners locais.
  return (
    <nav className="site-navbar-nav" aria-label={ariaLabel}>
      <ul>{children}</ul>
    </nav>
  );
}

/* Dropdown — controlado pelo MenuStateProvider.
   `active` é só visual (algum item filho é current).
   `cols` define o layout do painel (1 / 2 / 3). */
export function NavbarDropdown({ label, active = false, cols = 1, children }: NavbarDropdownProps & { active?: boolean }) {
  // Chave única para identificar este menu no estado compartilhado.
  const keyRef = useRef(`menu-${Math.random().toString(36).slice(2, 9)}`);
  const key = keyRef.current;
  const { activeKey, open } = useMenuState();
  const isOpen = activeKey === key;

  // Note: onMouseLeave NÃO vive aqui — ele vive na <NavbarNav>
  // inteira, então atravessar o gap entre triggers não fecha o
  // painel. Só onMouseEnter pra atualizar qual menu está ativo.
  return (
    <li
      className={`nav-menu cols-${cols} ${active ? "active" : ""} ${isOpen ? "open" : ""}`}
      onMouseEnter={() => open(key)}
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

export function NavbarDropdownPanel({ cols = 1, isOpen = false, children }: NavbarDropdownPanelProps) {
  // Sem handlers locais — quem decide abrir/fechar é o detector
  // global. Mantemos só o role/className.
  return (
    <div
      className={`nav-menu-panel cols-${cols} ${isOpen ? "is-open" : ""}`}
      role="menu"
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
  isNew = false,
  children,
}: NavbarDropdownItemPropsExt) {
  const { onNavigate } = useNavbar();
  const { t } = useT();
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
          <span className="label">
            {children}
            {isNew && (
              <span className="nav-menu-new-badge" aria-label={t("nav.newBadge")}>
                {t("nav.newBadge")}
              </span>
            )}
          </span>
          {rich && <span className="desc">{description}</span>}
        </span>
      </a>
    </li>
  );
}

export function NavbarActions({ children }: SlotProps) {
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
      {locales.map((l: any) => (
        <button
          key={l.id}
          type="button"
          className={`locale-btn ${locale === l.id ? "active" : ""}`}
          onClick={() => setLocale(l.id as any)}
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
