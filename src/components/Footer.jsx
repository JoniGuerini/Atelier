import { ROUTE_BY_ID } from "../lib/routes.js";
import { useT } from "../lib/i18n.jsx";

/* Âncora interna de navegação: usa o hash router mas preserva
   href válido para acessibilidade / "abrir em nova aba". */
function NavLink({ to, children, onNavigate }) {
  const slug = ROUTE_BY_ID[to] || to;
  return (
    <a
      href={`#/${slug}`}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        onNavigate?.(to);
      }}
    >
      {children}
    </a>
  );
}

function GitHubGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
  );
}

function LinkedInGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M13.63 13.63h-2.37V9.92c0-.88-.02-2.02-1.23-2.02-1.23 0-1.42.96-1.42 1.96v3.77H6.24V6h2.27v1.04h.03c.32-.6 1.09-1.23 2.25-1.23 2.4 0 2.85 1.58 2.85 3.64v4.18zM3.56 4.96a1.37 1.37 0 1 1 0-2.75 1.37 1.37 0 0 1 0 2.75zm1.19 8.67H2.37V6h2.38v7.63zM14.82 0H1.18C.53 0 0 .52 0 1.16v13.68C0 15.48.53 16 1.18 16h13.64c.65 0 1.18-.52 1.18-1.16V1.16C16 .52 15.47 0 14.82 0z"
      />
    </svg>
  );
}

export default function Footer({ onNavigate }) {
  const { t, raw } = useT();
  const year = new Date().getFullYear();

  const columns = [
    { key: "foundations", items: ["principles", "colors", "typography", "spacing", "icons"] },
    { key: "components", items: ["buttons", "inputs", "avatars", "badges", "cards", "tables"] },
    { key: "patterns", items: ["forms", "empty-states", "sidebar", "navbar", "dropzone"] },
    { key: "atelier", items: ["overview", "code"] },
  ];

  const social = raw("footer.social") || {};

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <a
            href="#/overview"
            className="wordmark"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.("overview");
            }}
          >
            {t("nav.brand.title")}
            <em>.</em>
          </a>
          <p className="site-footer-tag">{t("footer.tagline")}</p>
          <p className="site-footer-stack">{t("footer.stack")}</p>
        </div>

        <nav className="site-footer-cols" aria-label={t("footer.navLabel")}>
          {columns.map((col) => (
            <div key={col.key} className="site-footer-col">
              <div className="site-footer-heading">
                {t(`footer.groups.${col.key}`)}
              </div>
              <ul>
                {col.items.map((id) => {
                  const labelKey = `footer.links.${id.replace(/-/g, "_")}`;
                  return (
                    <li key={id}>
                      <NavLink to={id} onNavigate={onNavigate}>
                        {t(labelKey)}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="site-footer-base">
        <div className="site-footer-copyright">
          © {year} {t("footer.copyright")}
        </div>
        <ul className="site-footer-social" aria-label={t("footer.socialLabel")}>
          {social.github && (
            <li>
              <a
                href={social.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                title="GitHub"
              >
                <GitHubGlyph />
              </a>
            </li>
          )}
          {social.linkedin && (
            <li>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <LinkedInGlyph />
              </a>
            </li>
          )}
        </ul>
      </div>
    </footer>
  );
}
