import { PageHead, Section } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";
import { emify } from "../lib/emify.tsx";

/* ================================================================
   About — /about (About · 73, fase 12)
   ----------------------------------------------------------------
   Manifesto longo. Tom narrativo, primeira pessoa do plural.
   Quatro seções: por que existe, princípios, história, não-objetivos.
   ================================================================ */

export default function About() {
  const { t, tr, raw } = useT();
  const principles = (raw("pages.about.principles.items") as { label: string; body: string }[]) || [];
  const nonGoals = (raw("pages.about.nonGoals.items") as { label: string; body: string }[]) || [];

  return (
    <>
      <PageHead
        lead={t("pages.about.lead")}
        title={
          <>
            {tr("pages.about.titleA")}
            <em>{t("pages.about.titleB")}</em>
          </>
        }
        metaLabel={t("pages.about.metaLabel")}
        meta={t("pages.about.meta")}
        intro={tr("pages.about.intro")}
      />

      {/* i — Por que existe */}
      <Section
        num="i"
        title={<>{t("pages.about.why.title")}</>}
        kicker={t("pages.about.why.kicker")}
      >
        <div className="about-prose">
          <p>{tr("pages.about.why.p1")}</p>
          <p>{tr("pages.about.why.p2")}</p>
          <p>{tr("pages.about.why.p3")}</p>
        </div>
        <blockquote className="about-quote">
          {emify(t("pages.about.why.quote"))}
          <span className="about-quote-attr">{t("pages.about.why.quoteAttr")}</span>
        </blockquote>
      </Section>

      {/* ii — Princípios */}
      <Section
        num="ii"
        title={<>{t("pages.about.principles.title")}</>}
        kicker={t("pages.about.principles.kicker")}
      >
        <p className="section-desc">{t("pages.about.principles.desc")}</p>
        <ul className="about-list">
          {principles.map((p, i) => (
            <li key={i}>
              <span className="about-list-label">{p.label}</span>
              <div className="about-list-body">{emify(p.body)}</div>
            </li>
          ))}
        </ul>
      </Section>

      {/* iii — História curta */}
      <Section
        num="iii"
        title={<>{t("pages.about.history.title")}</>}
        kicker={t("pages.about.history.kicker")}
      >
        <div className="about-prose">
          <p>{tr("pages.about.history.p1")}</p>
          <p>{tr("pages.about.history.p2")}</p>
          <p>{tr("pages.about.history.p3")}</p>
        </div>
      </Section>

      {/* iv — Não-objetivos */}
      <Section
        num="iv"
        title={<>{t("pages.about.nonGoals.title")}</>}
        kicker={t("pages.about.nonGoals.kicker")}
      >
        <p className="section-desc">{tr("pages.about.nonGoals.desc")}</p>
        <ul className="about-list">
          {nonGoals.map((n, i) => (
            <li key={i}>
              <span className="about-list-label">{n.label}</span>
              <div className="about-list-body">{emify(n.body)}</div>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
