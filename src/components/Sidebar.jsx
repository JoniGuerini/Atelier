import { ROUTES, ROUTE_BY_ID } from "../lib/routes.js";
import { useT } from "../lib/i18n.jsx";
import {
  SidebarToggle,
  ThemeToggle,
  NavModeToggle,
} from "../ds/primitives.jsx";

export default function Sidebar({
  current,
  onNavigate,
  collapsed = false,
  onToggleSidebar,
  navMode = "sidebar",
  onToggleNavMode,
}) {
  const { t, locale, setLocale, locales } = useT();

  return (
    <aside
      id="app-sidebar"
      className="sidebar"
      aria-hidden={collapsed ? "true" : "false"}
    >
      <div className="sidebar-head">
        <a
          href="#/overview"
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("overview");
          }}
        >
          <div className="wordmark">
            {t("nav.brand.title")}
            <em>.</em>
          </div>
          <div className="caption">{t("nav.brand.caption")}</div>
        </a>
        {onToggleSidebar && (
          <SidebarToggle
            collapsed={collapsed}
            onToggle={onToggleSidebar}
            className="sidebar-toggle-inline"
            tabIndex={collapsed ? -1 : 0}
          />
        )}
      </div>

      <nav>
        {ROUTES.map((group) => (
          <div className="nav-group" key={group.groupKey}>
            <div className="group-title">{t(`nav.groups.${group.groupKey}`)}</div>
            {group.items.map((it) => {
              const slug = it.route || it.id;
              return (
                <button
                  key={it.id}
                  type="button"
                  className={`nav-item ${current === slug ? "active" : ""}`}
                  onClick={() => onNavigate(slug)}
                  tabIndex={collapsed ? -1 : 0}
                >
                  <span className="n">{it.n}</span>
                  <span>{t(`nav.items.${it.id}`)}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="sidebar-locale">
        <div className="group-title">{t("nav.footer.language")}</div>
        <div className="locale-switch" role="group" aria-label="Language">
          {locales.map((l) => (
            <button
              key={l.id}
              type="button"
              className={`locale-btn ${locale === l.id ? "active" : ""}`}
              onClick={() => setLocale(l.id)}
              aria-pressed={locale === l.id}
              title={l.label}
              tabIndex={collapsed ? -1 : 0}
            >
              {l.short}
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-theme" aria-hidden={collapsed ? "true" : "false"}>
        <div className="group-title">{t("nav.footer.theme")}</div>
        <ThemeToggle variant="compact" />
      </div>

      {onToggleNavMode && (
        <div className="sidebar-navmode" aria-hidden={collapsed ? "true" : "false"}>
          <div className="group-title">{t("nav.mode.label")}</div>
          <NavModeToggle mode={navMode} onChange={onToggleNavMode} />
        </div>
      )}

      <div className="sidebar-footer">
        <b>{t("nav.footer.study")}</b>
        <br />
        {t("nav.footer.stack")}
      </div>
    </aside>
  );
}

// re-export mapping for convenience elsewhere
export { ROUTE_BY_ID };
