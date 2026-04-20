import { PageHead, Section, Code } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";
import { emify } from "../lib/emify.tsx";

/* ================================================================
   Print — /print (Reference · 66, fase 11.3)
   ================================================================ */

export default function Print() {
  const { t, tr, raw } = useT();
  const principles = (raw("pages.print.principles.items") as { n: string; body: string }[]) || [];

  return (
    <>
      <PageHead
        lead={t("pages.print.lead")}
        title={
          <>
            {tr("pages.print.titleA")}
            <em>{t("pages.print.titleB")}</em>
          </>
        }
        metaLabel={t("pages.print.metaLabel")}
        meta={t("pages.print.meta")}
        intro={tr("pages.print.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.print.principles.title")}</>}
        kicker={t("pages.print.principles.kicker")}
      >
        <p className="section-desc">{t("pages.print.principles.desc")}</p>
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
        title={<>{t("pages.print.css.title")}</>}
        kicker={t("pages.print.css.kicker")}
      >
        <p className="section-desc">{tr("pages.print.css.desc")}</p>
        <Code>{`@media print {
  /* Cor preto-no-branco; força contraste P&B forte */
  :root {
    --bg: #fff;
    --ink: #000;
    --ink-soft: #333;
    --rule-soft: #ccc;
  }

  /* Esconde cromo da app */
  .site-navbar,
  .sidebar,
  .ds-back-to-top,
  .skip-link,
  .ds-pagenav,
  .site-footer { display: none !important; }

  /* Página inteira flui — sem max-width de tela */
  .content {
    max-width: none;
    padding: 0;
  }

  /* Quebra de página por seção */
  section { page-break-inside: avoid; }
  h1, h2, h3 { page-break-after: avoid; }

  /* Links exibem URL */
  a[href^="http"]::after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
    color: #666;
  }

  /* Imagens: redimensiona até a largura da página */
  img { max-width: 100%; height: auto; }
}`}</Code>
      </Section>
    </>
  );
}
