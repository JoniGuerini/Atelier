import { ROUTES, ROUTE_BY_ID } from "../lib/routes.js";
import { useT } from "../lib/i18n.jsx";
import { ThemeToggle, NavModeToggle } from "../ds/primitives.jsx";

/* Item com dropdown disparado por hover (+ focus-within para teclado).
   O dropdown aparece ao passar o mouse sobre o trigger ou qualquer
   item da lista. A acessibilidade via teclado funciona por
   Tab/Shift+Tab — quando qualquer link interno ganha foco, o
   :focus-within mantém o menu aberto. */
function NavMenu({ group, current, onNavigate }) {
  const { t } = useT();
  const anyActive = group.items.some(
    (it) => (it.route || it.id) === current
  );

  return (
    <li className={`nav-menu ${anyActive ? "active" : ""}`}>
      <button type="button" className="nav-menu-trigger" aria-haspopup="true">
        <span>{t(`nav.groups.${group.groupKey}`)}</span>
        <span className="nav-menu-chev" aria-hidden="true">
          ▾
        </span>
      </button>

      <div className="nav-menu-panel" role="menu">
        <ul>
          {group.items.map((it) => {
            const slug = it.route || it.id;
            const isCurrent = current === slug;
            return (
              <li key={it.id} role="none">
                <a
                  role="menuitem"
                  href={`#/${slug}`}
                  className={`nav-menu-item ${isCurrent ? "is-current" : ""}`}
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                    e.preventDefault();
                    onNavigate(slug);
                  }}
                >
                  <span className="n">{it.n}</span>
                  <span className="label">{t(`nav.items.${it.id}`)}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

export default function Navbar({ current, onNavigate, navMode, onToggleNavMode }) {
  const { t, locale, setLocale, locales } = useT();

  return (
    <header className="site-navbar" role="banner">
      <div className="site-navbar-inner">
        <a
          href="#/overview"
          className="site-navbar-brand"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("overview");
          }}
        >
          <span className="wordmark">
            {t("nav.brand.title")}
            <em>.</em>
          </span>
        </a>

        <nav
          className="site-navbar-nav"
          aria-label={t("nav.navLabel") || "Primary"}
        >
          <ul>
            {ROUTES.map((group) => (
              <NavMenu
                key={group.groupKey}
                group={group}
                current={current}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </nav>

        <div className="site-navbar-actions">
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

          <ThemeToggle variant="compact" />

          <NavModeToggle mode={navMode} onChange={onToggleNavMode} />
        </div>
      </div>
    </header>
  );
}

export { ROUTE_BY_ID };
