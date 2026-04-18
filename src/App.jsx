import { useCallback, useEffect, useState } from "react";
import {
  Sidebar,
  SidebarHead,
  SidebarBrand,
  SidebarNav,
  SidebarGroup,
  SidebarGroupTitle,
  SidebarNavItem,
  SidebarLocale,
  SidebarTheme,
  SidebarNavMode,
  SidebarFooter,
} from "./components/Sidebar.jsx";
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarDropdown,
  NavbarDropdownItem,
  NavbarActions,
  NavbarLocale,
} from "./components/Navbar.jsx";
import { ThemeToggle, NavModeToggle } from "./ds/primitives.jsx";
import Footer from "./components/Footer.jsx";
import { useT } from "./lib/i18n.jsx";
import { useHashRoute } from "./lib/useHashRoute.js";
import { ALL_ROUTE_IDS, ROUTES, TOOL_ROUTE_IDS } from "./lib/routes.js";
import { SidebarToggle, BackToTop } from "./ds/primitives.jsx";
import { PageNav } from "./ds/PageNav.jsx";

import Overview from "./pages/Overview.jsx";
import Principles from "./pages/Principles.jsx";
import Colors from "./pages/Colors.jsx";
import Typography from "./pages/Typography.jsx";
import Spacing from "./pages/Spacing.jsx";
import Icons from "./pages/Icons.jsx";
import Buttons from "./pages/Buttons.jsx";
import Inputs from "./pages/Inputs.jsx";
import Controls from "./pages/Controls.jsx";
import Badges from "./pages/Badges.jsx";
import Avatars from "./pages/Avatars.jsx";
import Alerts from "./pages/Alerts.jsx";
import Cards from "./pages/Cards.jsx";
import TabsPage from "./pages/TabsPage.jsx";
import Tables from "./pages/Tables.jsx";
import Charts from "./pages/Charts.jsx";
import Overlays from "./pages/Overlays.jsx";
import Feedback from "./pages/Feedback.jsx";
import DropzonePage from "./pages/DropzonePage.jsx";
import Forms from "./pages/Forms.jsx";
import EmptyStates from "./pages/EmptyStates.jsx";
import SidebarPage from "./pages/SidebarPage.jsx";
import NavbarPage from "./pages/NavbarPage.jsx";
import CodePage from "./pages/Code.jsx";
import Create from "./pages/Create.jsx";

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
  overlays: Overlays,
  feedback: Feedback,
  dropzone: DropzonePage,
  forms: Forms,
  "empty-states": EmptyStates,
  sidebar: SidebarPage,
  navbar: NavbarPage,
  code: CodePage,
  create: Create,
};

const SIDEBAR_KEY = "atelier.sidebarCollapsed";
const NAV_MODE_KEY = "atelier.navMode";

export default function App() {
  const [route, navigate] = useHashRoute();
  const current = ALL_ROUTE_IDS.includes(route) ? route : "overview";
  const Page = PAGES[current] || Overview;

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

  const toggleSidebar = useCallback(() => setCollapsed((c) => !c), []);

  // Atalho: Ctrl/Cmd + B  (convenção de editores; não conflita com o navegador)
  useEffect(() => {
    const handler = (e) => {
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
    <div className={shellClasses.join(" ")}>
      {isTopbar ? (
        <AppNavbar
          current={current}
          navigate={navigate}
          navMode={navMode}
          setNavMode={setNavMode}
        />
      ) : (
        <AppSidebar
          current={current}
          navigate={navigate}
          collapsed={collapsed}
          toggleSidebar={toggleSidebar}
          navMode={navMode}
          setNavMode={setNavMode}
        />
      )}
      <main className={`content ${TOOL_ROUTE_IDS.has(current) ? "content--tool" : ""}`}>
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
    </div>
  );
}

/* ----------------------------------------------------------------
   AppNavbar — composição real da Navbar do Atelier.
   Documenta, no próprio uso, a árvore exposta na página #/navbar.
---------------------------------------------------------------- */
function AppNavbar({ current, navigate, navMode, setNavMode }) {
  const { t } = useT();
  return (
    <Navbar current={current} onNavigate={navigate}>
      <NavbarBrand />
      <NavbarNav ariaLabel={t("nav.navLabel") || "Primary"}>
        {ROUTES.map((group) => {
          const anyActive = group.items.some(
            (it) => (it.route || it.id) === current
          );
          return (
            <NavbarDropdown
              key={group.groupKey}
              label={t(`nav.groups.${group.groupKey}`)}
              active={anyActive}
            >
              {group.items.map((it) => {
                const slug = it.route || it.id;
                return (
                  <NavbarDropdownItem
                    key={it.id}
                    slug={slug}
                    n={it.n}
                    active={current === slug}
                  >
                    {t(`nav.items.${it.id}`)}
                  </NavbarDropdownItem>
                );
              })}
            </NavbarDropdown>
          );
        })}
      </NavbarNav>
      <NavbarActions>
        <NavbarLocale />
        <ThemeToggle variant="compact" />
        <NavModeToggle mode={navMode} onChange={setNavMode} />
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
}) {
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
        {ROUTES.map((group) => (
          <SidebarGroup key={group.groupKey}>
            <SidebarGroupTitle>
              {t(`nav.groups.${group.groupKey}`)}
            </SidebarGroupTitle>
            {group.items.map((it) => {
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

      <SidebarLocale />
      <SidebarTheme />
      <SidebarNavMode mode={navMode} onChange={setNavMode} />
      <SidebarFooter />
    </Sidebar>
  );
}
