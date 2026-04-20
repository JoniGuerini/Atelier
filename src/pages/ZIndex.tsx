import { PageHead, Section } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";

/* ================================================================
   Z-Index — página /z-index (Foundation · 09)
   ----------------------------------------------------------------
   Doc da escala --z-* (Foundations II · fase 9.1).
   Hierarquia oficial em nove camadas nomeadas.
   Diagrama editorial mostra a pilha como vista de lado.
   ================================================================ */

const STACK = [
  { token: "--z-skip-link", value: 9999, label: "skip-link", use: "a11y · sempre topo" },
  { token: "--z-palette",   value: 700,  label: "palette",   use: "command palette (⌘K)" },
  { token: "--z-toast",     value: 600,  label: "toast",     use: "Toaster" },
  { token: "--z-popover",   value: 500,  label: "popover",   use: "Popover · Tooltip" },
  { token: "--z-modal",     value: 400,  label: "modal",     use: "Drawer · Dialog panel" },
  { token: "--z-overlay",   value: 300,  label: "overlay",   use: "scrim de Drawer/Dialog" },
  { token: "--z-sticky",    value: 200,  label: "sticky",    use: "navbar/sidebar fixa" },
  { token: "--z-dropdown",  value: 100,  label: "dropdown",  use: "DropdownMenu · Combobox" },
  { token: "--z-raised",    value: 10,   label: "raised",    use: "hover lift · focus" },
  { token: "--z-base",      value: 0,    label: "base",      use: "fluxo normal" },
];

export default function ZIndex() {
  const { t, tr, raw } = useT();
  const rules = (raw("pages.zIndex.rules") as any[]) || [];

  return (
    <>
      <PageHead
        lead={t("pages.zIndex.lead")}
        title={
          <>
            {tr("pages.zIndex.titleA")}
            <em>{t("pages.zIndex.titleB")}</em>
          </>
        }
        metaLabel={t("pages.zIndex.metaLabel")}
        meta={t("pages.zIndex.meta")}
        intro={tr("pages.zIndex.intro")}
      />

      {/* i. A pilha — tabela */}
      <Section
        num="i"
        title={<>{t("pages.zIndex.stackTitle")}</>}
        kicker={t("pages.zIndex.stackKicker")}
      >
        <p className="section-desc">{t("pages.zIndex.stackDesc")}</p>
        <div className="foundations-table-wrap">
          <table className="foundations-table">
            <thead>
              <tr>
                <th style={{ width: "30%" }}>token</th>
                <th style={{ width: "15%" }}>value</th>
                <th>uso</th>
              </tr>
            </thead>
            <tbody>
              {STACK.map((s) => (
                <tr key={s.token}>
                  <td>
                    <code>{s.token}</code>
                  </td>
                  <td>
                    <code>{s.value}</code>
                  </td>
                  <td>{s.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ii. Diagrama */}
      <Section
        num="ii"
        title={<>{t("pages.zIndex.diagramTitle")}</>}
        kicker={t("pages.zIndex.diagramKicker")}
      >
        <p className="section-desc">{t("pages.zIndex.diagramDesc")}</p>
        <div className="foundations-z-stage">
          <div className="foundations-z-stack">
            {STACK.map((s, i) => (
              <div
                key={s.token}
                className="foundations-z-layer"
                style={{
                  transform: `translate(${i * 12}px, ${-i * 8}px)`,
                  zIndex: STACK.length - i,
                }}
              >
                <span className="foundations-z-layer-label">{s.label}</span>
                <span className="foundations-z-layer-value">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* iii. Regras */}
      <Section
        num="iii"
        title={<>{t("pages.zIndex.rulesTitle")}</>}
        kicker={t("pages.zIndex.rulesKicker")}
      >
        <div className="foundations-rules">
          {rules.map((r: any) => (
            <article key={r.n} className="foundations-rule">
              <div className="foundations-rule-num">{r.n}</div>
              <div className="foundations-rule-body">
                <h3 className="foundations-rule-title">{r.t}</h3>
                <p className="foundations-rule-text">{r.b}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
