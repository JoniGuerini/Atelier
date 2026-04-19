import { useCallback, useEffect, useState } from "react";
import {
  Sidebar,
  SidebarHead,
  SidebarBrand,
  SidebarNav,
  SidebarGroup,
  SidebarGroupTitle,
  SidebarNavItem,
  SidebarFooter,
} from "./components/Sidebar.tsx";
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarDropdown,
  NavbarDropdownItem,
  NavbarActions,
} from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import { useT } from "./lib/i18n.tsx";
import { useHashRoute } from "./lib/useHashRoute.ts";
import { ALL_ROUTE_IDS, ROUTES, TOOL_ROUTE_IDS } from "./lib/routes.ts";
import { SidebarToggle, BackToTop } from "./ds/primitives.tsx";
import { PageNav } from "./ds/PageNav.tsx";
import { SettingsMenu } from "./ds/SettingsMenu.tsx";
import { LayoutToggle } from "./ds/LayoutToggle.tsx";
import {
  SearchPalette,
  SearchTrigger,
  useSearchHotkey,
} from "./ds/SearchPalette.tsx";

import Overview from "./pages/Overview.tsx";
import Principles from "./pages/Principles.tsx";
import Colors from "./pages/Colors.tsx";
import Typography from "./pages/Typography.tsx";
import Spacing from "./pages/Spacing.tsx";
import Icons from "./pages/Icons.tsx";
import Buttons from "./pages/Buttons.tsx";
import Inputs from "./pages/Inputs.tsx";
import Controls from "./pages/Controls.tsx";
import Badges from "./pages/Badges.tsx";
import Avatars from "./pages/Avatars.tsx";
import Alerts from "./pages/Alerts.tsx";
import Cards from "./pages/Cards.tsx";
import TabsPage from "./pages/TabsPage.tsx";
import Tables from "./pages/Tables.tsx";
import Charts from "./pages/Charts.tsx";
import PaginationPage from "./pages/Pagination.tsx";
import BreadcrumbsPage from "./pages/BreadcrumbsPage.tsx";
import SkeletonPage from "./pages/SkeletonPage.tsx";
import StepperPage from "./pages/StepperPage.tsx";
import AccessibilityPage from "./pages/Accessibility.tsx";
import Overlays from "./pages/Overlays.tsx";
import Feedback from "./pages/Feedback.tsx";
import DropzonePage from "./pages/DropzonePage.tsx";
import Forms from "./pages/Forms.tsx";
import EmptyStates from "./pages/EmptyStates.tsx";
import SidebarPage from "./pages/SidebarPage.tsx";
import NavbarPage from "./pages/NavbarPage.tsx";
import CodePage from "./pages/Code.tsx";
import Create from "./pages/Create.tsx";
import PopoverPage from "./pages/PopoverPage.tsx";
import DropdownMenuPage from "./pages/DropdownMenuPage.tsx";
import ContextMenuPage from "./pages/ContextMenuPage.tsx";
import DrawerPage from "./pages/DrawerPage.tsx";
import ToasterPage from "./pages/ToasterPage.tsx";
import ComboboxPage from "./pages/ComboboxPage.tsx";
import RangeSliderPage from "./pages/RangeSliderPage.tsx";
import CalendarPage from "./pages/CalendarPage.tsx";
import DatePickerPage from "./pages/DatePickerPage.tsx";
import CarouselPage from "./pages/CarouselPage.tsx";
import TreeViewPage from "./pages/TreeViewPage.tsx";
import ResizablePage from "./pages/ResizablePage.tsx";
import ColorPickerPage from "./pages/ColorPickerPage.tsx";
import MarkdownPage from "./pages/MarkdownPage.tsx";
import ShortcutsPage from "./pages/ShortcutsPage.tsx";
import { Toaster } from "./ds/Toaster.tsx";
import { ShortcutsProvider } from "./ds/Shortcuts.tsx";

const PAGES = {
  overview: Overview,
  principles: Principles,
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  icons: Icons,
  buttons: Buttons,
  inputs: Inputs,
  controls: Controls,
  badges: Badges,
  avatars: Avatars,
  alerts: Alerts,
  cards: Cards,
  tabs: TabsPage,
  tables: Tables,
  charts: Charts,
  pagination: PaginationPage,
  breadcrumbs: BreadcrumbsPage,
  skeleton: SkeletonPage,
  stepper: StepperPage,
  accessibility: AccessibilityPage,
  overlays: Overlays,
  feedback: Feedback,
  dropzone: DropzonePage,
  forms: Forms,
  "empty-states": EmptyStates,
  sidebar: SidebarPage,
  navbar: NavbarPage,
  code: CodePage,
  create: Create,
  popover: PopoverPage,
  "dropdown-menu": DropdownMenuPage,
  "context-menu": ContextMenuPage,
  drawer: DrawerPage,
  toaster: ToasterPage,
  combobox: ComboboxPage,
  slider: RangeSliderPage,
  calendar: CalendarPage,
  "date-picker": DatePickerPage,
  carousel: CarouselPage,
  tree: TreeViewPage,
  resizable: ResizablePage,
  "color-picker": ColorPickerPage,
  markdown: MarkdownPage,
  shortcuts: ShortcutsPage,
};

const SIDEBAR_KEY = "atelier.sidebarCollapsed";
const NAV_MODE_KEY = "atelier.navMode";
const NAV_WIDE_KEY = "atelier.navWide";

export default function App() {
  const { t } = useT();
  const [route, navigate] = useHashRoute();
  const current = ALL_ROUTE_IDS.includes(route) ? route : "overview";
  const Page = (PAGES as any)[current] || Overview;

  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(SIDEBAR_KEY) === "1";
  });

  const [navMode, setNavMode] = useState(() => {
    if (typeof window === "undefined") return "navbar";
    const v = window.localStorage.getItem(NAV_MODE_KEY);
    if (v === "sidebar") return "sidebar";
    return "navbar";
  });

  // Layout do navbar: "boxed" (default — limita ao --content-max,
  // alinhado com o conteúdo da página) ou "wide" (ocupa 100% do
  // viewport, mais arejado em monitores grandes). Replica o toggle
  // que o shadcn tem no canto superior do site deles.
  const [navWide, setNavWide] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(NAV_WIDE_KEY) === "1";
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(SIDEBAR_KEY, collapsed ? "1" : "0");
    } catch {
      /* storage indisponível — segue sem persistir */
    }
  }, [collapsed]);

  useEffect(() => {
    try {
      window.localStorage.setItem(NAV_MODE_KEY, navMode);
    } catch {
      /* storage indisponível */
    }
  }, [navMode]);

  useEffect(() => {
    try {
      window.localStorage.setItem(NAV_WIDE_KEY, navWide ? "1" : "0");
    } catch {
      /* storage indisponível */
    }
  }, [navWide]);

  const toggleNavWide = useCallback(() => setNavWide((v) => !v), []);

  const toggleSidebar = useCallback(() => setCollapsed((c) => !c), []);

  // ⌘/Ctrl + K — abre a paleta de busca (atalho global)
  const [searchOpen, setSearchOpen] = useState(false);
  useSearchHotkey(useCallback(() => setSearchOpen(true), []));

  // Atalho: Ctrl/Cmd + B  (convenção de editores; não conflita com o navegador)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
        if (e.key === "b" || e.key === "B") {
          e.preventDefault();
          toggleSidebar();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggleSidebar]);

  const isTopbar = navMode === "navbar";
  const shellClasses = ["shell"];
  if (isTopbar) shellClasses.push("shell--topbar");
  else if (collapsed) shellClasses.push("collapsed");

  return (
    <Toaster position="bottom-right">
      <ShortcutsProvider>
      <div className={shellClasses.join(" ")}>
        {/* Skip link — visualmente escondido até receber foco por teclado.
            Pula direto pro conteúdo principal, evitando re-tabular toda
            a sidebar/navbar quando o usuário só quer LER. */}
        <a href="#main-content" className="skip-link">
          {t("accessibility.skipLink")}
        </a>

      {isTopbar ? (
        <AppNavbar
          current={current}
          navigate={navigate}
          navMode={navMode}
          setNavMode={setNavMode}
          navWide={navWide}
          toggleNavWide={toggleNavWide}
          openSearch={() => setSearchOpen(true)}
        />
      ) : (
        <AppSidebar
          current={current}
          navigate={navigate}
          collapsed={collapsed}
          toggleSidebar={toggleSidebar}
          navMode={navMode}
          setNavMode={setNavMode}
          openSearch={() => setSearchOpen(true)}
        />
      )}
      <main
        id="main-content"
        tabIndex={-1}
        className={`content ${TOOL_ROUTE_IDS.has(current) ? "content--tool" : ""}`}
      >
        {!isTopbar && collapsed && (
          <SidebarToggle
            collapsed={collapsed}
            onToggle={toggleSidebar}
            className="sidebar-toggle-floating"
          />
        )}
        <Page onNavigate={navigate} />
        {!TOOL_ROUTE_IDS.has(current) && (
          <PageNav current={current} onNavigate={navigate} />
        )}
      </main>
      <Footer onNavigate={navigate} />
      <BackToTop />
      <SearchPalette
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={navigate}
      />
    </div>
      </ShortcutsProvider>
    </Toaster>
  );
}

/* ----------------------------------------------------------------
   AppNavbar — composição real da Navbar do Atelier.
   Documenta, no próprio uso, a árvore exposta na página #/navbar.
---------------------------------------------------------------- */
function AppNavbar({
  current,
  navigate,
  navMode,
  setNavMode,
  navWide,
  toggleNavWide,
  openSearch,
}: any) {
  const { t } = useT();
  return (
    <Navbar current={current} onNavigate={navigate} wide={navWide}>
      <NavbarBrand />
      <NavbarNav ariaLabel={t("nav.navLabel") || "Primary"}>
        {ROUTES.map((group: any) => {
          const anyActive = group.items.some(
            (it: any) => (it.route || it.id) === current
          );
          // Quantas colunas no painel? Escala com o tamanho do grupo.
          // Threshold mais cedo para 2 colunas — 3 itens já justifica
          // par-de-coluna (evita listas longas e estreitas):
          //   < 3 itens  → 1 col (Start, Reference, Studio)
          //   3-8 itens  → 2 cols (Foundations, Patterns)
          //   9+ itens   → 3 cols (Components — 13 itens)
          const n = group.items.length;
          const cols = n >= 9 ? 3 : n >= 3 ? 2 : 1;
          return (
            <NavbarDropdown
              key={group.groupKey}
              label={t(`nav.groups.${group.groupKey}`)}
              active={anyActive}
              cols={cols}
            >
              {group.items.map((it: any) => {
                const slug = it.route || it.id;
                // Tenta resolver descrição específica (se i18n
                // declarou nav.descriptions.<id>); cai num fallback
                // vazio para itens sem descrição.
                const descKey = `nav.descriptions.${it.id}`;
                const desc = t(descKey);
                const description = desc !== descKey ? desc : null;
                return (
                  <NavbarDropdownItem
                    key={it.id}
                    slug={slug}
                    n={it.n}
                    description={description}
                    active={current === slug}
                    isNew={it.isNew}
                  >
                    {t(`nav.items.${it.id}`)}
                  </NavbarDropdownItem>
                );
              })}
            </NavbarDropdown>
          );
        })}
      </NavbarNav>
      <SearchTrigger onClick={openSearch} />
      <NavbarActions>
        <LayoutToggle wide={navWide} onToggle={toggleNavWide} />
        <SettingsMenu
          navMode={navMode}
          onToggleNavMode={setNavMode}
          placement="bottom-end"
        />
      </NavbarActions>
    </Navbar>
  );
}

/* ----------------------------------------------------------------
   AppSidebar — composição real da Sidebar do Atelier.
   Documenta, no próprio uso, a árvore exposta na página #/sidebar.
---------------------------------------------------------------- */
function AppSidebar({
  current,
  navigate,
  collapsed,
  toggleSidebar,
  navMode,
  setNavMode,
  openSearch,
}: any) {
  const { t } = useT();
  return (
    <Sidebar collapsed={collapsed}>
      <SidebarHead>
        <SidebarBrand onNavigate={navigate} />
        <SidebarToggle
          collapsed={collapsed}
          onToggle={toggleSidebar}
          className="sidebar-toggle-inline"
          tabIndex={collapsed ? -1 : 0}
        />
      </SidebarHead>

      <SidebarNav>
        {ROUTES.map((group: any) => (
          <SidebarGroup key={group.groupKey}>
            <SidebarGroupTitle>
              {t(`nav.groups.${group.groupKey}`)}
            </SidebarGroupTitle>
            {group.items.map((it: any) => {
              const slug = it.route || it.id;
              return (
                <SidebarNavItem
                  key={it.id}
                  n={it.n}
                  active={current === slug}
                  onClick={() => navigate(slug)}
                >
                  {t(`nav.items.${it.id}`)}
                </SidebarNavItem>
              );
            })}
          </SidebarGroup>
        ))}
      </SidebarNav>

      <SidebarFooter>
        <div className="sidebar-footer-text">
          <b>{t("nav.footer.study")}</b>
          <br />
          {t("nav.footer.stack")}
        </div>
        <div className="sidebar-footer-actions">
          <SearchTrigger onClick={openSearch} compact />
          <SettingsMenu
            navMode={navMode}
            onToggleNavMode={setNavMode}
            placement="top-end"
          />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
