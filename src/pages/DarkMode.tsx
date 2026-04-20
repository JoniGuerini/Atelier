import { PageHead, Section, Code } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";
import { emify } from "../lib/emify.tsx";

/* ================================================================
   DarkMode — /dark-mode (Reference · 65, fase 11.3)
   ================================================================ */

export default function DarkMode() {
  const { t, tr, raw } = useT();
  const principles = (raw("pages.darkMode.principles.items") as { n: string; body: string }[]) || [];
  const edges = (raw("pages.darkMode.edges.items") as { kicker: string; title: string; body: string }[]) || [];
  const dos = (raw("pages.darkMode.dosDonts.dos") as string[]) || [];
  const donts = (raw("pages.darkMode.dosDonts.donts") as string[]) || [];

  return (
    <>
      <PageHead
        lead={t("pages.darkMode.lead")}
        title={
          <>
            {tr("pages.darkMode.titleA")}
            <em>{t("pages.darkMode.titleB")}</em>
          </>
        }
        metaLabel={t("pages.darkMode.metaLabel")}
        meta={t("pages.darkMode.meta")}
        intro={tr("pages.darkMode.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.darkMode.principles.title")}</>}
        kicker={t("pages.darkMode.principles.kicker")}
      >
        <p className="section-desc">{t("pages.darkMode.principles.desc")}</p>
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
        title={<>{t("pages.darkMode.bootstrap.title")}</>}
        kicker={t("pages.darkMode.bootstrap.kicker")}
      >
        <p className="section-desc">{tr("pages.darkMode.bootstrap.desc")}</p>
        <Code>{`<!-- index.html — script blocking pra evitar flash em reload -->
<script>
  (function () {
    try {
      var saved = localStorage.getItem("atelier.theme");
      var preferDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var theme = saved || (preferDark ? "dark" : "light");
      document.documentElement.setAttribute("data-theme", theme);
    } catch (e) { /* fallback: light */ }
  })();
</script>`}</Code>
      </Section>

      <Section
        num="iii"
        title={<>{t("pages.darkMode.edges.title")}</>}
        kicker={t("pages.darkMode.edges.kicker")}
      >
        <p className="section-desc">{t("pages.darkMode.edges.desc")}</p>
        <div className="pattern-stack">
          {edges.map((e, i) => (
            <article key={i} className="pattern-callout">
              <span className="pattern-callout-kicker">{e.kicker}</span>
              <h3 className="pattern-callout-title">{e.title}</h3>
              <p className="pattern-callout-body">{emify(e.body)}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        num="iv"
        title={<>{t("pages.darkMode.dosDonts.title")}</>}
        kicker={t("pages.darkMode.dosDonts.kicker")}
      >
        <div className="pattern-do-dont">
          <div className="pattern-do">
            <span className="pattern-do-label">{t("pages.darkMode.dosDonts.doLabel")}</span>
            <ul>{dos.map((d, i) => <li key={i}>{emify(d)}</li>)}</ul>
          </div>
          <div className="pattern-dont">
            <span className="pattern-dont-label">{t("pages.darkMode.dosDonts.dontLabel")}</span>
            <ul>{donts.map((d, i) => <li key={i}>{emify(d)}</li>)}</ul>
          </div>
        </div>
      </Section>
    </>
  );
}
