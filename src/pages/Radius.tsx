import { PageHead, Section } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";

/* ================================================================
   Radius — página /radius (Foundation · 08)
   ----------------------------------------------------------------
   Doc da escala --radius-* (Foundations II · fase 9.1).
   Atelier respeita o ângulo reto: --radius-none é o default.
   A escala existe para autorizar exceções controladas.
   ================================================================ */

const SCALE = [
  { token: "--radius-none", label: "0",      use: "default" },
  { token: "--radius-sm",   label: "2px",    use: "kbd · pills" },
  { token: "--radius-md",   label: "4px",    use: "buttons · badges" },
  { token: "--radius-lg",   label: "8px",    use: "cards · popovers" },
  { token: "--radius-full", label: "9999px", use: "avatar · switch" },
];

export default function Radius() {
  const { t, tr, raw } = useT();
  const rules = (raw("pages.radius.rules") as any[]) || [];

  return (
    <>
      <PageHead
        lead={t("pages.radius.lead")}
        title={
          <>
            {tr("pages.radius.titleA")}
            <em>{t("pages.radius.titleB")}</em>
          </>
        }
        metaLabel={t("pages.radius.metaLabel")}
        meta={t("pages.radius.meta")}
        intro={tr("pages.radius.intro")}
      />

      {/* i. Escala */}
      <Section
        num="i"
        title={<>{t("pages.radius.scaleTitle")}</>}
        kicker={t("pages.radius.scaleKicker")}
      >
        <p className="section-desc">{t("pages.radius.scaleDesc")}</p>
        <div className="foundations-grid foundations-grid--radius">
          {SCALE.map((s) => (
            <figure key={s.token} className="foundations-card">
              <div
                className="foundations-radius-swatch"
                style={{ borderRadius: `var(${s.token})` }}
              />
              <figcaption className="foundations-caption">
                <span className="foundations-token">{s.token}</span>
                <span className="foundations-meta">
                  {s.label} · {s.use}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* ii. Quando arredondar */}
      <Section
        num="ii"
        title={<>{t("pages.radius.whenTitle")}</>}
        kicker={t("pages.radius.whenKicker")}
      >
        <p className="section-desc">{t("pages.radius.whenDesc")}</p>
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
