import { lazy, Suspense, useCallback, useEffect, useState } from "react";
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
import { usePageTransition } from "./lib/usePageTransition.ts";
import { ALL_ROUTE_IDS, ROUTES, TOOL_ROUTE_IDS, FLUID_ROUTE_IDS } from "./lib/routes.ts";
import { SidebarToggle, BackToTop } from "./ds/primitives.tsx";
import { PageNav } from "./ds/PageNav.tsx";
import { SettingsMenu } from "./ds/SettingsMenu.tsx";
import { LayoutToggle } from "./ds/LayoutToggle.tsx";
import {
  SearchPalette,
  SearchTrigger,
  useSearchHotkey,
} from "./ds/SearchPalette.tsx";
import { SkeletonText } from "./ds/Skeleton.tsx";

/* ================================================================
   Pages — lazy-loaded (Roadmap · fase 8.1, Code splitting)
   ----------------------------------------------------------------
   Cada página vira um chunk independente carregado on-demand.
   Com 50+ páginas, isso troca um único bundle de ~270 KB gz por
   um shell pequeno + chunks de 5-20 KB cada.

   Critério de aceite: nenhum chunk > 200 KB minified.
   Vite gera nomes "stable" baseados no path importado.

   Não há lazy "Overview" intencional — é a página inicial e a
   mais comum; queremos ela já no entry. Se essa decisão mudar,
   troque a linha de Overview por lazy.
   ================================================================ */
import Overview from "./pages/Overview.tsx";

const Principles      = lazy(() => import("./pages/Principles.tsx"));
const Colors          = lazy(() => import("./pages/Colors.tsx"));
const Typography      = lazy(() => import("./pages/Typography.tsx"));
const Voice           = lazy(() => import("./pages/Voice.tsx"));
const Spacing         = lazy(() => import("./pages/Spacing.tsx"));
const Icons           = lazy(() => import("./pages/Icons.tsx"));
const Elevation       = lazy(() => import("./pages/Elevation.tsx"));
const Radius          = lazy(() => import("./pages/Radius.tsx"));
const ZIndex          = lazy(() => import("./pages/ZIndex.tsx"));
const Breakpoints     = lazy(() => import("./pages/Breakpoints.tsx"));
const Density         = lazy(() => import("./pages/Density.tsx"));
const Motion          = lazy(() => import("./pages/Motion.tsx"));
const Buttons         = lazy(() => import("./pages/Buttons.tsx"));
const Inputs          = lazy(() => import("./pages/Inputs.tsx"));
const Controls        = lazy(() => import("./pages/Controls.tsx"));
const Badges          = lazy(() => import("./pages/Badges.tsx"));
const Avatars         = lazy(() => import("./pages/Avatars.tsx"));
const Alerts          = lazy(() => import("./pages/Alerts.tsx"));
const Cards           = lazy(() => import("./pages/Cards.tsx"));
const TabsPage        = lazy(() => import("./pages/TabsPage.tsx"));
const Tables          = lazy(() => import("./pages/Tables.tsx"));
const Charts          = lazy(() => import("./pages/Charts.tsx"));
const PaginationPage  = lazy(() => import("./pages/Pagination.tsx"));
const BreadcrumbsPage = lazy(() => import("./pages/BreadcrumbsPage.tsx"));
const SkeletonPage    = lazy(() => import("./pages/SkeletonPage.tsx"));
const StepperPage     = lazy(() => import("./pages/StepperPage.tsx"));
const AccessibilityPage = lazy(() => import("./pages/Accessibility.tsx"));
const Overlays        = lazy(() => import("./pages/Overlays.tsx"));
const Feedback        = lazy(() => import("./pages/Feedback.tsx"));
const DropzonePage    = lazy(() => import("./pages/DropzonePage.tsx"));
const Forms           = lazy(() => import("./pages/Forms.tsx"));
const EmptyStates     = lazy(() => import("./pages/EmptyStates.tsx"));
const SidebarPage     = lazy(() => import("./pages/SidebarPage.tsx"));
const NavbarPage      = lazy(() => import("./pages/NavbarPage.tsx"));
const CodePage        = lazy(() => import("./pages/Code.tsx"));
const Create          = lazy(() => import("./pages/Create.tsx"));
const PopoverPage     = lazy(() => import("./pages/PopoverPage.tsx"));
const DropdownMenuPage = lazy(() => import("./pages/DropdownMenuPage.tsx"));
const ContextMenuPage = lazy(() => import("./pages/ContextMenuPage.tsx"));
const DrawerPage      = lazy(() => import("./pages/DrawerPage.tsx"));
const ToasterPage     = lazy(() => import("./pages/ToasterPage.tsx"));
const ComboboxPage    = lazy(() => import("./pages/ComboboxPage.tsx"));
const RangeSliderPage = lazy(() => import("./pages/RangeSliderPage.tsx"));
const CalendarPage    = lazy(() => import("./pages/CalendarPage.tsx"));
const DatePickerPage  = lazy(() => import("./pages/DatePickerPage.tsx"));
const CarouselPage    = lazy(() => import("./pages/CarouselPage.tsx"));
const TreeViewPage    = lazy(() => import("./pages/TreeViewPage.tsx"));
const ResizablePage   = lazy(() => import("./pages/ResizablePage.tsx"));
const ColorPickerPage = lazy(() => import("./pages/ColorPickerPage.tsx"));
const MarkdownPage    = lazy(() => import("./pages/MarkdownPage.tsx"));
const ShortcutsPage   = lazy(() => import("./pages/ShortcutsPage.tsx"));
const VirtualListPage = lazy(() => import("./pages/VirtualListPage.tsx"));
const DragDropPage    = lazy(() => import("./pages/DragDropPage.tsx"));
const RoadmapPage     = lazy(() => import("./pages/RoadmapPage.tsx"));
const DataTablePage   = lazy(() => import("./pages/DataTablePage.tsx"));
const TimelinePage    = lazy(() => import("./pages/TimelinePage.tsx"));
const TagInputPage    = lazy(() => import("./pages/TagInputPage.tsx"));
const KBDPage         = lazy(() => import("./pages/KBDPage.tsx"));
const Hooks           = lazy(() => import("./pages/Hooks.tsx"));
const Changelog       = lazy(() => import("./pages/Changelog.tsx"));
const TokensPage      = lazy(() => import("./pages/Tokens.tsx"));
const LoadingStates   = lazy(() => import("./pages/LoadingStates.tsx"));
const ErrorHandling   = lazy(() => import("./pages/ErrorHandling.tsx"));
const FormsPatterns   = lazy(() => import("./pages/FormsPatterns.tsx"));
const DestructiveActions = lazy(() => import("./pages/DestructiveActions.tsx"));
const Onboarding      = lazy(() => import("./pages/Onboarding.tsx"));
const DarkMode        = lazy(() => import("./pages/DarkMode.tsx"));
const Print           = lazy(() => import("./pages/Print.tsx"));
const I18nPatterns    = lazy(() => import("./pages/I18nPatterns.tsx"));
const Install         = lazy(() => import("./pages/Install.tsx"));
const ApiReference    = lazy(() => import("./pages/ApiReference.tsx"));
const BrowserSupport  = lazy(() => import("./pages/BrowserSupport.tsx"));
const Performance     = lazy(() => import("./pages/Performance.tsx"));
const Recipes         = lazy(() => import("./pages/Recipes.tsx"));

import { Toaster } from "./ds/Toaster.tsx";
import { ShortcutsProvider } from "./ds/Shortcuts.tsx";

const PAGES = {
  overview: Overview,
  principles: Principles,
  colors: Colors,
  typography: Typography,
  voice: Voice,
  spacing: Spacing,
  icons: Icons,
  elevation: Elevation,
  radius: Radius,
  "z-index": ZIndex,
  breakpoints: Breakpoints,
  density: Density,
  motion: Motion,
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
  "virtual-list": VirtualListPage,
  "drag-drop": DragDropPage,
  roadmap: RoadmapPage,
  "data-table": DataTablePage,
  timeline: TimelinePage,
  "tag-input": TagInputPage,
  kbd: KBDPage,
  hooks: Hooks,
  changelog: Changelog,
  tokens: TokensPage,
  "loading-states": LoadingStates,
  "error-handling": ErrorHandling,
  "forms-patterns": FormsPatterns,
  "destructive-actions": DestructiveActions,
  onboarding: Onboarding,
  "dark-mode": DarkMode,
  print: Print,
  "i18n-patterns": I18nPatterns,
  install: Install,
  "api-reference": ApiReference,
  "browser-support": BrowserSupport,
  performance: Performance,
  recipes: Recipes,
};

const SIDEBAR_KEY = "atelier.sidebarCollapsed";
const NAV_MODE_KEY = "atelier.navMode";
const NAV_WIDE_KEY = "atelier.navWide";

export default function App() {
  const { t } = useT();
  const [route, navigate] = useHashRoute();
  const current = ALL_ROUTE_IDS.includes(route) ? route : "overview";
  const Page = (PAGES as any)[current] || Overview;
  /* Page transitions (fase 4.3) — fade editorial em cada troca de rota.
     Persistência de scroll fica off por padrão (manual editorial = topo
     em cada visita). */
  const transition = usePageTransition(current, { variant: "fade" });

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
        className={`content ${FLUID_ROUTE_IDS.has(current) ? "content--tool" : ""}`}
        data-page-transition={transition.variant}
      >
        {!isTopbar && collapsed && (
          <SidebarToggle
            collapsed={collapsed}
            onToggle={toggleSidebar}
            className="sidebar-toggle-floating"
          />
        )}
        <Suspense fallback={<PageFallback />}>
          {/* key força remount em cada troca de rota — anima entrada via CSS */}
          <div key={transition.key} className="page-transition-frame">
            <Page onNavigate={navigate} />
          </div>
        </Suspense>
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

/* ----------------------------------------------------------------
   PageFallback — Suspense boundary para chunks de página.
   Mostra um esqueleto editorial discreto enquanto o JS chega.
   Replica a estrutura de PageHead (lead curto + título largo +
   intro de 3 linhas) pra evitar layout shift quando a página real
   monta.
---------------------------------------------------------------- */
function PageFallback() {
  return (
    <div className="page-fallback" aria-busy="true" aria-live="polite">
      <SkeletonText lines={1} pulse />
      <div className="page-fallback-title">
        <SkeletonText lines={1} pulse />
      </div>
      <SkeletonText lines={3} pulse />
    </div>
  );
}
