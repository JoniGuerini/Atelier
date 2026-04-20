import { PageHead, Section } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";
import { emify } from "../lib/emify.tsx";

/* ================================================================
   Onboarding — /onboarding (Reference · 64, fase 11.2)
   ================================================================ */

export default function Onboarding() {
  const { t, tr, raw } = useT();
  const decisions = (raw("pages.onboarding.decision.rows") as { pattern: string; use: string; avoid: string }[]) || [];
  const principles = (raw("pages.onboarding.principles.items") as { n: string; body: string }[]) || [];

  return (
    <>
      <PageHead
        lead={t("pages.onboarding.lead")}
        title={
          <>
            {tr("pages.onboarding.titleA")}
            <em>{t("pages.onboarding.titleB")}</em>
          </>
        }
        metaLabel={t("pages.onboarding.metaLabel")}
        meta={t("pages.onboarding.meta")}
        intro={tr("pages.onboarding.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.onboarding.decision.title")}</>}
        kicker={t("pages.onboarding.decision.kicker")}
      >
        <p className="section-desc">{tr("pages.onboarding.decision.desc")}</p>
        <div className="pattern-decision-wrap">
          <table className="pattern-decision">
            <thead>
              <tr>
                <th style={{ width: "22%" }}>{t("pages.onboarding.decision.thPattern")}</th>
                <th>{t("pages.onboarding.decision.thUse")}</th>
                <th style={{ width: "30%" }}>{t("pages.onboarding.decision.thAvoid")}</th>
              </tr>
            </thead>
            <tbody>
              {decisions.map((row, i) => (
                <tr key={i}>
                  <td><code>{row.pattern}</code></td>
                  <td>{row.use}</td>
                  <td>{row.avoid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section
        num="ii"
        title={<>{t("pages.onboarding.principles.title")}</>}
        kicker={t("pages.onboarding.principles.kicker")}
      >
        <p className="section-desc">{t("pages.onboarding.principles.desc")}</p>
        <ol className="pattern-bullets">
          {principles.map((r, i) => (
            <li key={i}>
              <span className="pattern-bullets-num">{r.n}</span>
              <span className="pattern-bullets-body">{emify(r.body)}</span>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
