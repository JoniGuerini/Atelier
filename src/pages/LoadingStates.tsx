import { PageHead, Section } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";
import { emify } from "../lib/emify.tsx";

/* ================================================================
   LoadingStates — /loading-states (Reference · 60, fase 11.1)
   ----------------------------------------------------------------
   Decisão editorial: quando usar cada estado de espera. Skeleton vs
   Spinner vs Progress vs Toast vs Empty — cada um responde a uma
   pergunta diferente do leitor.
   ================================================================ */

interface DecisionRow {
  pattern: string;
  use: string;
  avoid: string;
}

export default function LoadingStates() {
  const { t, tr, raw } = useT();
  const decisions = (raw("pages.loadingStates.decision.rows") as DecisionRow[]) || [];
  const rules = (raw("pages.loadingStates.rules.items") as { n: string; body: string }[]) || [];

  return (
    <>
      <PageHead
        lead={t("pages.loadingStates.lead")}
        title={
          <>
            {tr("pages.loadingStates.titleA")}
            <em>{t("pages.loadingStates.titleB")}</em>
          </>
        }
        metaLabel={t("pages.loadingStates.metaLabel")}
        meta={t("pages.loadingStates.meta")}
        intro={tr("pages.loadingStates.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.loadingStates.decision.title")}</>}
        kicker={t("pages.loadingStates.decision.kicker")}
      >
        <p className="section-desc">{tr("pages.loadingStates.decision.desc")}</p>
        <div className="pattern-decision-wrap">
          <table className="pattern-decision">
            <thead>
              <tr>
                <th style={{ width: "22%" }}>{t("pages.loadingStates.decision.thPattern")}</th>
                <th>{t("pages.loadingStates.decision.thUse")}</th>
                <th style={{ width: "30%" }}>{t("pages.loadingStates.decision.thAvoid")}</th>
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
        title={<>{t("pages.loadingStates.rules.title")}</>}
        kicker={t("pages.loadingStates.rules.kicker")}
      >
        <p className="section-desc">{t("pages.loadingStates.rules.desc")}</p>
        <ol className="pattern-bullets">
          {rules.map((r, i) => (
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
