import { Fragment, type ReactNode } from "react";

/* ================================================================
   emify — parse simples de [em]…[/em] (Roadmap · fase 11)
   ----------------------------------------------------------------
   Várias páginas da Fase 11 carregam conteúdo editorial dentro de
   ARRAYS na i18n (rules, decisions, items). O tr() padrão da i18n
   só aceita uma chave inteira, não um item de array.

   Esta função recebe a string crua e devolve ReactNode com [em]
   parsed para <strong>. Sem dangerouslySetInnerHTML — seguro contra
   XSS mesmo se o conteúdo vier de fonte externa.
   ================================================================ */

export function emify(str: string): ReactNode[] {
  const parts = str.split(/\[em\]([\s\S]+?)\[\/em\]/g);
  return parts.map((p, i) =>
    i % 2 === 1 ? <strong key={i}>{p}</strong> : <Fragment key={i}>{p}</Fragment>
  );
}
