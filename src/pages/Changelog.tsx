import { PageHead } from "../ds/primitives.tsx";
import { MarkdownViewer } from "../ds/MarkdownViewer.tsx";
import { useT } from "../lib/i18n.tsx";
/* Vite ?raw — importa o arquivo como string em build-time, evitando
   fetch em runtime (zero round-trip, funciona em SSR e em qualquer
   hosting estático). */
// @ts-expect-error — ?raw é resolvido pelo Vite, não tem tipo estático
import changelogMd from "../../CHANGELOG.md?raw";

/* ================================================================
   Changelog — página /changelog (Reference · 57)
   ----------------------------------------------------------------
   Estréia oficial do MarkdownViewer em produção (fase 7.4 do
   roadmap). Lê CHANGELOG.md do root via Vite ?raw e renderiza
   com o parser zero-dep do DS.
   ================================================================ */

export default function Changelog() {
  const { t, tr } = useT();
  return (
    <>
      <PageHead
        lead={t("pages.changelog.lead")}
        title={
          <>
            {tr("pages.changelog.titleA")}
            <em>{t("pages.changelog.titleB")}</em>
          </>
        }
        metaLabel={t("pages.changelog.metaLabel")}
        meta={t("pages.changelog.meta")}
        intro={tr("pages.changelog.intro")}
      />

      <div className="changelog-body">
        <MarkdownViewer maxWidth="75ch">{changelogMd}</MarkdownViewer>
      </div>
    </>
  );
}
