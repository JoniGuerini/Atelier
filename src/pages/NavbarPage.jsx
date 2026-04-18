import { useState } from "react";
import { PageHead, Section, Example } from "../ds/primitives.jsx";
import { useT } from "../lib/i18n.jsx";

/* ================================================================
   NavbarSpecimen
   ----------------------------------------------------------------
   Miniatura fiel da Navbar superior. Reproduzimos o visual com
   tokens do DS; o dropdown abre por hover (e por click no mobile).
   Classes prefixadas com `.ds-navbar-specimen` para não colidir
   com `.site-navbar` (layout real).
   ================================================================ */
function NavbarSpecimen({
  activeItem = "colors",
  onItemClick,
  interactive = true,
  forceOpen,
}) {
  const { t } = useT();

  const groups = [
    {
      key: "foundations",
      items: [
        { id: "colors", n: "02" },
        { id: "typography", n: "03" },
        { id: "spacing", n: "04" },
      ],
    },
    {
      key: "components",
      items: [
        { id: "buttons", n: "06" },
        { id: "inputs", n: "07" },
        { id: "badges", n: "09" },
      ],
    },
    {
      key: "patterns",
      items: [
        { id: "forms", n: "18" },
        { id: "sidebar", n: "20" },
      ],
    },
  ];

  return (
    <div className="ds-navbar-specimen" aria-hidden="true">
      <div className="ds-navbar-specimen-inner">
        <div className="ds-navbar-specimen-brand">
          {t("nav.brand.title")}
          <em>.</em>
        </div>

        <nav className="ds-navbar-specimen-nav">
          <ul>
            {groups.map((g) => {
              const anyActive = g.items.some((it) => it.id === activeItem);
              const isOpen = forceOpen === g.key;
              return (
                <li
                  key={g.key}
                  className={`ds-nav-menu ${anyActive ? "active" : ""} ${
                    isOpen ? "force-open" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="ds-nav-menu-trigger"
                    tabIndex={interactive ? 0 : -1}
                  >
                    <span>{t(`nav.groups.${g.key}`)}</span>
                    <span className="chev" aria-hidden="true">
                      ▾
                    </span>
                  </button>
                  <div className="ds-nav-menu-panel" role="menu">
                    <ul>
                      {g.items.map((it) => (
                        <li key={it.id}>
                          <button
                            type="button"
                            className={`ds-nav-menu-item ${
                              activeItem === it.id ? "is-current" : ""
                            }`}
                            onClick={() =>
                              interactive && onItemClick?.(it.id)
                            }
                            tabIndex={interactive ? 0 : -1}
                          >
                            <span className="n">{it.n}</span>
                            <span className="lbl">
                              {t(`nav.items.${it.id}`)}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ds-navbar-specimen-actions">
          <div className="pill">PT EN</div>
          <div className="pill square">☼</div>
          <div className="pill">SIDE TOP</div>
        </div>
      </div>
    </div>
  );
}

export default function NavbarPage() {
  const { t, tr, raw } = useT();
  const [activeItem, setActiveItem] = useState("colors");

  const parts = raw("pages.navbar.anatomy.parts") || [];
  const guidelines = raw("pages.navbar.guidelines.items") || [];

  return (
    <>
      <PageHead
        lead={t("pages.navbar.lead")}
        title={
          <>
            {tr("pages.navbar.titleA")}
            <em>{t("pages.navbar.titleB")}</em>
          </>
        }
        metaLabel={t("pages.navbar.metaLabel")}
        meta={t("pages.navbar.meta")}
        intro={tr("pages.navbar.intro")}
      />

      {/* i · Anatomia */}
      <Section
        num="i"
        title={
          <>
            {t("pages.navbar.anatomy.title")} ·{" "}
            <em>{t("pages.navbar.anatomy.titleB")}</em>
          </>
        }
        kicker={t("pages.navbar.anatomy.kicker")}
      >
        <Example
          caption={t("pages.navbar.anatomy.caption")}
          tech=".site-navbar"
          stack
        >
          <div className="ds-navbar-anatomy">
            <div className="ds-navbar-anatomy-stage">
              <NavbarSpecimen
                activeItem="colors"
                interactive={false}
                forceOpen="foundations"
              />
              <div className="ds-navbar-anatomy-marker m1" aria-hidden="true">
                01
              </div>
              <div className="ds-navbar-anatomy-marker m2" aria-hidden="true">
                02
              </div>
              <div className="ds-navbar-anatomy-marker m3" aria-hidden="true">
                03
              </div>
              <div className="ds-navbar-anatomy-marker m4" aria-hidden="true">
                04
              </div>
            </div>
            <dl className="ds-anatomy-list">
              {parts.map((p, i) => (
                <div className="ds-anatomy-row" key={p.n}>
                  <dt>
                    <span className="n">{p.n}</span>
                    <span className="lbl">{p.label}</span>
                  </dt>
                  <dd>{tr(`pages.navbar.anatomy.parts.${i}.desc`)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Example>
      </Section>

      {/* ii · Dropdowns */}
      <Section
        num="ii"
        title={<>{t("pages.navbar.dropdown.title")}</>}
        kicker={t("pages.navbar.dropdown.kicker")}
      >
        <Example
          caption={tr("pages.navbar.dropdown.caption")}
          tech=":hover · :focus-within"
          stack
        >
          <div className="ds-dropdown-explainer">
            <div className="ds-dropdown-explainer-card">
              <div className="note">
                <span className="tag">{t("pages.navbar.dropdown.hoverNote")}</span>
                {t("pages.navbar.dropdown.hoverDesc")}
              </div>
              <div className="note">
                <span className="tag">{t("pages.navbar.dropdown.focusNote")}</span>
                {tr("pages.navbar.dropdown.focusDesc")}
              </div>
            </div>
            <div className="ds-dropdown-explainer-stage">
              <NavbarSpecimen
                activeItem="colors"
                interactive={false}
                forceOpen="components"
              />
            </div>
          </div>
        </Example>
      </Section>

      {/* iii · Espécime ao vivo */}
      <Section
        num="iii"
        title={<>{t("pages.navbar.specimen.title")}</>}
        kicker={t("pages.navbar.specimen.kicker")}
      >
        <Example
          caption={t("pages.navbar.specimen.caption")}
          tech="live"
          stack
        >
          <div className="ds-navbar-live">
            <NavbarSpecimen
              activeItem={activeItem}
              onItemClick={setActiveItem}
            />
          </div>
        </Example>
      </Section>

      {/* iv · Quando usar */}
      <Section
        num="iv"
        title={<>{t("pages.navbar.guidelines.title")}</>}
        kicker={t("pages.navbar.guidelines.kicker")}
      >
        <div className="ds-guidelines-grid">
          {guidelines.map((g, i) => (
            <article className="ds-guideline-card" key={g.n}>
              <div className="num">{g.n}</div>
              <h3>
                {g.titleA}
                <em>{g.titleB}</em>
                {g.titleC || ""}
              </h3>
              <p>{tr(`pages.navbar.guidelines.items.${i}.body`)}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
