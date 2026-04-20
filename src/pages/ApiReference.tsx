import { PageHead, Section } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";
import { emify } from "../lib/emify.tsx";

/* ================================================================
   ApiReference — /api-reference (Reference · 69, fase 11.5)
   ----------------------------------------------------------------
   Visão geral. A doc por componente já vive em cada página de
   componente (com props, exemplos, composição). Aqui é o índice
   editorial — onde encontrar o quê.
   ================================================================ */

interface ApiRow {
  family: string;
  exports: string;
  route: string;
}

export default function ApiReference() {
  const { t, tr, raw } = useT();
  const rows = (raw("pages.apiReference.table.rows") as ApiRow[]) || [];
  const principles = (raw("pages.apiReference.principles.items") as { n: string; body: string }[]) || [];

  return (
    <>
      <PageHead
        lead={t("pages.apiReference.lead")}
        title={
          <>
            {tr("pages.apiReference.titleA")}
            <em>{t("pages.apiReference.titleB")}</em>
          </>
        }
        metaLabel={t("pages.apiReference.metaLabel")}
        meta={t("pages.apiReference.meta")}
        intro={tr("pages.apiReference.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.apiReference.principles.title")}</>}
        kicker={t("pages.apiReference.principles.kicker")}
      >
        <p className="section-desc">{t("pages.apiReference.principles.desc")}</p>
        <ol className="pattern-bullets">
          {principles.map((p, i) => (
            <li key={i}>
              <span className="pattern-bullets-num">{p.n}</span>
              <span className="pattern-bullets-body">{emify(p.body)}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        num="ii"
        title={<>{t("pages.apiReference.table.title")}</>}
        kicker={t("pages.apiReference.table.kicker")}
      >
        <p className="section-desc">{t("pages.apiReference.table.desc")}</p>
        <div className="pattern-decision-wrap">
          <table className="pattern-decision">
            <thead>
              <tr>
                <th style={{ width: "22%" }}>{t("pages.apiReference.table.thFamily")}</th>
                <th>{t("pages.apiReference.table.thExports")}</th>
                <th style={{ width: "22%" }}>{t("pages.apiReference.table.thRoute")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td><code>{row.family}</code></td>
                  <td>
                    <code>{row.exports}</code>
                  </td>
                  <td>
                    <a href={`#/${row.route}`}>
                      <code>/{row.route}</code>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}
