import { PageHead, Section } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";

/* ================================================================
   Elevation — página /elevation (Foundation · 07)
   ----------------------------------------------------------------
   Doc da escala --shadow-* (Foundations II · fase 9.1).
   Atelier é flat-by-default: a página explicita esse princípio,
   apresenta os quatro degraus tokenizados, e codifica a decisão
   editorial de "quando elevar" em quatro regras numeradas.
   ================================================================ */

const SCALE = [
  { token: "--shadow-none", label: "none", use: "default" },
  { token: "--shadow-sm",   label: "sm",   use: "sticky" },
  { token: "--shadow-md",   label: "md",   use: "popover" },
  { token: "--shadow-lg",   label: "lg",   use: "modal" },
];

export default function Elevation() {
  const { t, tr, raw } = useT();
  const rules = (raw("pages.elevation.rules") as any[]) || [];

  return (
    <>
      <PageHead
        lead={t("pages.elevation.lead")}
        title={
          <>
            {tr("pages.elevation.titleA")}
            <em>{t("pages.elevation.titleB")}</em>
          </>
        }
        metaLabel={t("pages.elevation.metaLabel")}
        meta={t("pages.elevation.meta")}
        intro={tr("pages.elevation.intro")}
      />

      {/* i. Escala */}
      <Section
        num="i"
        title={<>{t("pages.elevation.scaleTitle")}</>}
        kicker={t("pages.elevation.scaleKicker")}
      >
        <p className="section-desc">{t("pages.elevation.scaleDesc")}</p>
        <div className="foundations-grid foundations-grid--shadow">
          {SCALE.map((s) => (
            <figure key={s.token} className="foundations-card">
              <div
                className="foundations-shadow-swatch"
                style={{ boxShadow: `var(${s.token})` }}
              />
              <figcaption className="foundations-caption">
                <span className="foundations-token">{s.token}</span>
                <span className="foundations-meta">{s.use}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* ii. Quando elevar */}
      <Section
        num="ii"
        title={<>{t("pages.elevation.whenTitle")}</>}
        kicker={t("pages.elevation.whenKicker")}
      >
        <p className="section-desc">{t("pages.elevation.whenDesc")}</p>
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

      {/* iii. Light vs Dark */}
      <Section
        num="iii"
        title={<>{t("pages.elevation.themeTitle")}</>}
        kicker={t("pages.elevation.themeKicker")}
      >
        <p className="section-desc">{t("pages.elevation.themeDesc")}</p>
        <div className="foundations-theme-pair">
          <div
            className="foundations-theme-stage"
            data-theme="light"
            style={{ background: "#f4f1ea", color: "#1a1a1a" }}
          >
            <div className="foundations-theme-label">light</div>
            <div className="foundations-theme-cards">
              {SCALE.map((s) => (
                <div
                  key={s.token}
                  className="foundations-theme-card"
                  style={{
                    boxShadow:
                      s.token === "--shadow-none"
                        ? "none"
                        : s.token === "--shadow-sm"
                        ? "0 1px 2px rgba(0, 0, 0, 0.04)"
                        : s.token === "--shadow-md"
                        ? "0 2px 6px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)"
                        : "0 6px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
                    background: "#faf8f3",
                    border: "1px solid #d9d3c4",
                  }}
                >
                  {s.label}
                </div>
              ))}
            </div>
          </div>
          <div
            className="foundations-theme-stage"
            data-theme="dark"
            style={{ background: "#121110", color: "#ede8dc" }}
          >
            <div
              className="foundations-theme-label"
              style={{ color: "#b8b1a2" }}
            >
              dark
            </div>
            <div className="foundations-theme-cards">
              {SCALE.map((s) => (
                <div
                  key={s.token}
                  className="foundations-theme-card"
                  style={{
                    boxShadow:
                      s.token === "--shadow-none"
                        ? "none"
                        : s.token === "--shadow-sm"
                        ? "0 1px 2px rgba(0, 0, 0, 0.4)"
                        : s.token === "--shadow-md"
                        ? "0 2px 6px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.4)"
                        : "0 6px 16px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.4)",
                    background: "#1a1917",
                    border: "1px solid #33302b",
                    color: "#ede8dc",
                  }}
                >
                  {s.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
