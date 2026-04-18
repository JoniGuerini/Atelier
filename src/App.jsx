import { useCallback, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { useHashRoute } from "./lib/useHashRoute.js";
import { ALL_ROUTE_IDS } from "./lib/routes.js";
import { SidebarToggle, BackToTop } from "./ds/primitives.jsx";

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
import Overlays from "./pages/Overlays.jsx";
import Feedback from "./pages/Feedback.jsx";
import DropzonePage from "./pages/DropzonePage.jsx";
import Forms from "./pages/Forms.jsx";
import EmptyStates from "./pages/EmptyStates.jsx";
import SidebarPage from "./pages/SidebarPage.jsx";
import NavbarPage from "./pages/NavbarPage.jsx";
import CodePage from "./pages/Code.jsx";

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
  overlays: Overlays,
  feedback: Feedback,
  dropzone: DropzonePage,
  forms: Forms,
  "empty-states": EmptyStates,
  sidebar: SidebarPage,
  navbar: NavbarPage,
  code: CodePage,
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
    if (typeof window === "undefined") return "sidebar";
    const v = window.localStorage.getItem(NAV_MODE_KEY);
    return v === "navbar" ? "navbar" : "sidebar";
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
        <Navbar
          current={current}
          onNavigate={navigate}
          navMode={navMode}
          onToggleNavMode={setNavMode}
        />
      ) : (
        <Sidebar
          current={current}
          onNavigate={navigate}
          collapsed={collapsed}
          onToggleSidebar={toggleSidebar}
          navMode={navMode}
          onToggleNavMode={setNavMode}
        />
      )}
      <main className="content">
        {!isTopbar && collapsed && (
          <SidebarToggle
            collapsed={collapsed}
            onToggle={toggleSidebar}
            className="sidebar-toggle-floating"
          />
        )}
        <Page onNavigate={navigate} />
      </main>
      <Footer onNavigate={navigate} />
      <BackToTop />
    </div>
  );
}
