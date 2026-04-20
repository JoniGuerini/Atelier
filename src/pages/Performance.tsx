import { PageHead, Section, Code } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";
import { emify } from "../lib/emify.tsx";

/* ================================================================
   Performance — /performance (Reference · 71, fase 11.5)
   ================================================================ */

interface BudgetRow {
  metric: string;
  target: string;
  current: string;
}

export default function Performance() {
  const { t, tr, raw } = useT();
  const budgets = (raw("pages.performance.budgets.rows") as BudgetRow[]) || [];
  const wins = (raw("pages.performance.wins.items") as { n: string; body: string }[]) || [];

  return (
    <>
      <PageHead
        lead={t("pages.performance.lead")}
        title={
          <>
            {tr("pages.performance.titleA")}
            <em>{t("pages.performance.titleB")}</em>
          </>
        }
        metaLabel={t("pages.performance.metaLabel")}
        meta={t("pages.performance.meta")}
        intro={tr("pages.performance.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.performance.budgets.title")}</>}
        kicker={t("pages.performance.budgets.kicker")}
      >
        <p className="section-desc">{tr("pages.performance.budgets.desc")}</p>
        <div className="pattern-decision-wrap">
          <table className="pattern-decision">
            <thead>
              <tr>
                <th style={{ width: "30%" }}>{t("pages.performance.budgets.thMetric")}</th>
                <th>{t("pages.performance.budgets.thTarget")}</th>
                <th>{t("pages.performance.budgets.thCurrent")}</th>
              </tr>
            </thead>
            <tbody>
              {budgets.map((row, i) => (
                <tr key={i}>
                  <td>{row.metric}</td>
                  <td><code>{row.target}</code></td>
                  <td><code>{row.current}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section
        num="ii"
        title={<>{t("pages.performance.wins.title")}</>}
        kicker={t("pages.performance.wins.kicker")}
      >
        <p className="section-desc">{t("pages.performance.wins.desc")}</p>
        <ol className="pattern-bullets">
          {wins.map((w, i) => (
            <li key={i}>
              <span className="pattern-bullets-num">{w.n}</span>
              <span className="pattern-bullets-body">{emify(w.body)}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        num="iii"
        title={<>{t("pages.performance.howto.title")}</>}
        kicker={t("pages.performance.howto.kicker")}
      >
        <p className="section-desc">{tr("pages.performance.howto.desc")}</p>
        <Code lang="bash">{`# Bundle analyzer (planejado para a fase 8.8 do roadmap)
npm install -D rollup-plugin-visualizer

# Em vite.config.js:
import { visualizer } from "rollup-plugin-visualizer";
plugins: [react(), visualizer({ filename: "dist/stats.html" })],

# Build + abre o relatório
npm run build && open dist/stats.html`}</Code>
      </Section>
    </>
  );
}
