import { useState } from "react";
import { PageHead, Section, Example, CompositionSection } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";

/* ================================================================
   SidebarSpecimen
   ----------------------------------------------------------------
   Miniatura fiel da Sidebar — não é o componente real do shell
   (não queremos o posicionamento fixo nem a navegação global).
   Reproduzimos o visual com tokens do DS para permitir interação
   contida (clicar em um item marca como ativo; o toggle colapsa).
   Classes prefixadas com `.ds-sidebar-specimen` para evitar
   conflito com `.sidebar` (layout real).
   ================================================================ */
function SidebarSpecimen({
  state = "expanded",
  activeItem = "colors",
  onItemClick,
  onToggle,
  interactive = true,
}: any) {
  const { t } = useT();
  const isCollapsed = state === "collapsed";

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
  ];

  return (
    <div
      className={`ds-sidebar-specimen ${isCollapsed ? "is-collapsed" : ""}`}
      aria-hidden="true"
    >
      <div className="ds-sidebar-specimen-head">
        <div className="ds-sidebar-specimen-brand">
          {t("nav.brand.title")}
          <em>.</em>
        </div>
        {interactive && (
          <button
            type="button"
            className="ds-sidebar-specimen-toggle"
            onClick={onToggle}
            aria-label={
              isCollapsed
                ? t("common.expandSidebar")
                : t("common.collapseSidebar")
            }
          >
            <span className="chev">‹</span>
          </button>
        )}
      </div>

      {!isCollapsed && (
        <nav className="ds-sidebar-specimen-nav">
          {groups.map((g: any) => (
            <div className="ds-sidebar-specimen-group" key={g.key}>
              <div className="ds-sidebar-specimen-group-title">
                {t(`nav.groups.${g.key}`)}
              </div>
              {g.items.map((it: any) => (
                <button
                  key={it.id}
                  type="button"
                  className={`ds-sidebar-specimen-item ${
                    activeItem === it.id ? "active" : ""
                  }`}
                  onClick={() => interactive && onItemClick?.(it.id)}
                  tabIndex={interactive ? 0 : -1}
                >
                  <span className="n">{it.n}</span>
                  <span>{t(`nav.items.${it.id}`)}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>
      )}

      {!isCollapsed && (
        <div className="ds-sidebar-specimen-foot">
          <b>{t("nav.footer.study")}</b>
          <br />
          {t("nav.footer.stack")}
        </div>
      )}
    </div>
  );
}

export default function SidebarPage() {
  const { t, tr, raw } = useT();
  const [activeItem, setActiveItem] = useState("colors");
  const [state, setState] = useState("expanded");

  const parts = raw("pages.sidebar.anatomy.parts") || [];
  const guidelines = raw("pages.sidebar.guidelines.items") || [];

  return (
    <>
      <PageHead
        lead={t("pages.sidebar.lead")}
        title={
          <>
            {tr("pages.sidebar.titleA")}
            <em>{t("pages.sidebar.titleB")}</em>
          </>
        }
        metaLabel={t("pages.sidebar.metaLabel")}
        meta={t("pages.sidebar.meta")}
        intro={tr("pages.sidebar.intro")}
      />

      {/* i · Anatomia */}
      <Section
        num="i"
        title={
          <>
            {t("pages.sidebar.anatomy.title")} ·{" "}
            <em>{t("pages.sidebar.anatomy.titleB")}</em>
          </>
        }
        kicker={t("pages.sidebar.anatomy.kicker")}
      >
        <Example
          caption={t("pages.sidebar.anatomy.caption")}
          tech=".sidebar"
          stack
        >
          <div className="ds-sidebar-anatomy">
            <div className="ds-sidebar-anatomy-stage">
              <SidebarSpecimen
                state="expanded"
                activeItem="colors"
                interactive={false}
              />
              <div className="ds-sidebar-anatomy-marker m1" aria-hidden="true">
                01
              </div>
              <div className="ds-sidebar-anatomy-marker m2" aria-hidden="true">
                02
              </div>
              <div className="ds-sidebar-anatomy-marker m3" aria-hidden="true">
                03
              </div>
              <div className="ds-sidebar-anatomy-marker m4" aria-hidden="true">
                04
              </div>
              <div className="ds-sidebar-anatomy-marker m5" aria-hidden="true">
                05
              </div>
            </div>
            <dl className="ds-anatomy-list">
              {parts.map((p: any, i: any) => (
                <div className="ds-anatomy-row" key={p.n}>
                  <dt>
                    <span className="n">{p.n}</span>
                    <span className="lbl">{p.label}</span>
                  </dt>
                  <dd>{tr(`pages.sidebar.anatomy.parts.${i}.desc`)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Example>
      </Section>

      {/* ii · Estados */}
      <Section
        num="ii"
        title={<>{t("pages.sidebar.states.title")}</>}
        kicker={t("pages.sidebar.states.kicker")}
      >
        <Example
          caption={tr("pages.sidebar.states.caption")}
          tech="expanded · collapsed"
          stack
        >
          <div className="ds-sidebar-states">
            <figure className="ds-state-figure">
              <SidebarSpecimen
                state="expanded"
                activeItem="colors"
                interactive={false}
              />
              <figcaption>
                <b>{t("pages.sidebar.states.expanded")}</b>
                <span>{t("pages.sidebar.states.expandedDesc")}</span>
              </figcaption>
            </figure>
            <figure className="ds-state-figure">
              <SidebarSpecimen state="collapsed" interactive={false} />
              <figcaption>
                <b>{t("pages.sidebar.states.collapsed")}</b>
                <span>{t("pages.sidebar.states.collapsedDesc")}</span>
              </figcaption>
            </figure>
          </div>
        </Example>
      </Section>

      {/* iii · Espécime ao vivo */}
      <Section
        num="iii"
        title={<>{t("pages.sidebar.specimen.title")}</>}
        kicker={t("pages.sidebar.specimen.kicker")}
      >
        <Example
          caption={t("pages.sidebar.specimen.caption")}
          tech="live"
          stack
        >
          <div className="ds-sidebar-live">
            <SidebarSpecimen
              state={state}
              activeItem={activeItem}
              onItemClick={setActiveItem}
              onToggle={() =>
                setState((s) => (s === "expanded" ? "collapsed" : "expanded"))
              }
            />
          </div>
        </Example>
      </Section>

      {/* iv · Composição */}
      <CompositionSection
        num="iv"
        i18nPrefix="pages.sidebar.composition"
        root="Sidebar"
        nodes={[
          {
            name: "SidebarHead",
            children: [{ name: "SidebarBrand" }, { name: "SidebarToggle" }],
          },
          {
            name: "SidebarNav",
            children: [
              {
                name: "SidebarGroup",
                children: [
                  { name: "SidebarGroupTitle" },
                  { name: "SidebarNavItem" },
                ],
              },
            ],
          },
          { name: "SidebarLocale" },
          { name: "SidebarTheme" },
          { name: "SidebarNavMode" },
          { name: "SidebarFooter" },
        ]}
      />

      {/* v · Quando usar */}
      <Section
        num="v"
        title={<>{t("pages.sidebar.guidelines.title")}</>}
        kicker={t("pages.sidebar.guidelines.kicker")}
      >
        <div className="ds-guidelines-grid">
          {guidelines.map((g: any, i: any) => (
            <article className="ds-guideline-card" key={g.n}>
              <div className="num">{g.n}</div>
              <h3>
                {g.titleA}
                <em>{g.titleB}</em>
                {g.titleC || ""}
              </h3>
              <p>{tr(`pages.sidebar.guidelines.items.${i}.body`)}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
