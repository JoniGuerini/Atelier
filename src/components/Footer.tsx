import type { ReactNode } from "react";
import { ROUTE_BY_ID, ROUTES } from "../lib/routes.ts";
import { useT } from "../lib/i18n.tsx";
import { SpriteIcon } from "../ds/SpriteIcon.tsx";

interface NavLinkProps {
  to: string;
  children?: ReactNode;
  onNavigate?: (route: string) => void;
}
interface FooterProps {
  onNavigate?: (route: string) => void;
}

/* Âncora interna de navegação: usa o hash router mas preserva
   href válido para acessibilidade / "abrir em nova aba". */
function NavLink({ to, children, onNavigate }: NavLinkProps) {
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

/* ----------------------------------------------------------------
   Estrutura editorial das colunas do footer.
   ----------------------------------------------------------------
   Diferente do sidebar (que reflete a leitura sequencial do manual),
   o footer reagrupa por afinidade prática:

     - Foundations  → tokens visuais
     - Components   → peças de UI básicas
     - Advanced     → peças complexas (overlays, dates, dnd...)
     - Patterns     → composições / templates
     - Atelier      → meta (overview, doc, ferramentas)

   Cada coluna referencia ids de ROUTES; itens adicionados em routes.ts
   aparecem aqui automaticamente sem precisar tocar no Footer. */
const FOOTER_COLUMNS: { key: string; groups: string[] }[] = [
  { key: "foundations", groups: ["foundations"] },
  { key: "components", groups: ["components"] },
  { key: "advanced", groups: ["advanced"] },
  { key: "patterns", groups: ["patterns"] },
  { key: "atelier", groups: ["start", "reference", "tools"] },
];

function getColumnItems(groupKeys: string[]) {
  const items: { id: string; n: string }[] = [];
  for (const gk of groupKeys) {
    const g = ROUTES.find((r) => r.groupKey === gk);
    if (!g) continue;
    for (const it of g.items) {
      items.push({ id: it.id, n: it.n });
    }
  }
  return items;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { t, raw } = useT();
  const year = new Date().getFullYear();

  const columns = FOOTER_COLUMNS.map((col) => ({
    key: col.key,
    items: getColumnItems(col.groups),
  }));

  const social = raw("footer.social") || {};

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <a
            href="#/"
            className="wordmark"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.("home");
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
                {col.items.map((it) => (
                  <li key={it.id}>
                    <NavLink to={it.id} onNavigate={onNavigate}>
                      {t(`nav.items.${it.id}`)}
                    </NavLink>
                  </li>
                ))}
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
                <SpriteIcon name="github" size={16} />
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
                <SpriteIcon name="linkedin" size={16} />
              </a>
            </li>
          )}
        </ul>
      </div>
    </footer>
  );
}
