import { PageHead, Section } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";
import { emify } from "../lib/emify.tsx";

/* ================================================================
   Credits — /credits (About · 75, fase 12)
   ----------------------------------------------------------------
   Inspirações declaradas. Editorial: agradecer com generosidade
   e precisão — quem ensinou o quê, sem cair em buzzword.
   ================================================================ */

interface CreditEntry {
  name: string;
  body: string;
}

export default function Credits() {
  const { t, tr, raw } = useT();
  const inspirations = (raw("pages.credits.inspirations.items") as CreditEntry[]) || [];
  const studies = (raw("pages.credits.studies.items") as CreditEntry[]) || [];
  const refs = (raw("pages.credits.refs.items") as CreditEntry[]) || [];

  return (
    <>
      <PageHead
        lead={t("pages.credits.lead")}
        title={
          <>
            {tr("pages.credits.titleA")}
            <em>{t("pages.credits.titleB")}</em>
          </>
        }
        metaLabel={t("pages.credits.metaLabel")}
        meta={t("pages.credits.meta")}
        intro={tr("pages.credits.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.credits.inspirations.title")}</>}
        kicker={t("pages.credits.inspirations.kicker")}
      >
        <p className="section-desc">{tr("pages.credits.inspirations.desc")}</p>
        <ul className="about-list">
          {inspirations.map((it, i) => (
            <li key={i}>
              <span className="about-list-label">{it.name}</span>
              <div className="about-list-body">{emify(it.body)}</div>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        num="ii"
        title={<>{t("pages.credits.studies.title")}</>}
        kicker={t("pages.credits.studies.kicker")}
      >
        <p className="section-desc">{tr("pages.credits.studies.desc")}</p>
        <ul className="about-list">
          {studies.map((it, i) => (
            <li key={i}>
              <span className="about-list-label">{it.name}</span>
              <div className="about-list-body">{emify(it.body)}</div>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        num="iii"
        title={<>{t("pages.credits.refs.title")}</>}
        kicker={t("pages.credits.refs.kicker")}
      >
        <p className="section-desc">{tr("pages.credits.refs.desc")}</p>
        <ul className="about-list">
          {refs.map((it, i) => (
            <li key={i}>
              <span className="about-list-label">{it.name}</span>
              <div className="about-list-body">{emify(it.body)}</div>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        num="iv"
        title={<>{t("pages.credits.thanks.title")}</>}
        kicker={t("pages.credits.thanks.kicker")}
      >
        <div className="about-prose">
          <p>{tr("pages.credits.thanks.body")}</p>
        </div>
      </Section>
    </>
  );
}
