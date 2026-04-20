import { PageHead, Section } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";
import { emify } from "../lib/emify.tsx";

/* ================================================================
   BrowserSupport — /browser-support (Reference · 70, fase 11.5)
   ================================================================ */

interface BrowserRow {
  name: string;
  version: string;
  notes: string;
}

export default function BrowserSupport() {
  const { t, tr, raw } = useT();
  const rows = (raw("pages.browserSupport.table.rows") as BrowserRow[]) || [];
  const features = (raw("pages.browserSupport.features.items") as { n: string; body: string }[]) || [];

  return (
    <>
      <PageHead
        lead={t("pages.browserSupport.lead")}
        title={
          <>
            {tr("pages.browserSupport.titleA")}
            <em>{t("pages.browserSupport.titleB")}</em>
          </>
        }
        metaLabel={t("pages.browserSupport.metaLabel")}
        meta={t("pages.browserSupport.meta")}
        intro={tr("pages.browserSupport.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.browserSupport.table.title")}</>}
        kicker={t("pages.browserSupport.table.kicker")}
      >
        <p className="section-desc">{t("pages.browserSupport.table.desc")}</p>
        <div className="pattern-decision-wrap">
          <table className="pattern-decision">
            <thead>
              <tr>
                <th style={{ width: "26%" }}>{t("pages.browserSupport.table.thBrowser")}</th>
                <th style={{ width: "18%" }}>{t("pages.browserSupport.table.thMin")}</th>
                <th>{t("pages.browserSupport.table.thNotes")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td><code>{row.name}</code></td>
                  <td><code>{row.version}</code></td>
                  <td>{emify(row.notes)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section
        num="ii"
        title={<>{t("pages.browserSupport.features.title")}</>}
        kicker={t("pages.browserSupport.features.kicker")}
      >
        <p className="section-desc">{tr("pages.browserSupport.features.desc")}</p>
        <ol className="pattern-bullets">
          {features.map((f, i) => (
            <li key={i}>
              <span className="pattern-bullets-num">{f.n}</span>
              <span className="pattern-bullets-body">{emify(f.body)}</span>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
