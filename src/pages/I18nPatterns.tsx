import { PageHead, Section, Code } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";
import { emify } from "../lib/emify.tsx";

/* ================================================================
   I18nPatterns — /i18n-patterns (Reference · 67, fase 11.4)
   ================================================================ */

export default function I18nPatterns() {
  const { t, tr, raw } = useT();
  const principles = (raw("pages.i18nPatterns.principles.items") as { n: string; body: string }[]) || [];

  return (
    <>
      <PageHead
        lead={t("pages.i18nPatterns.lead")}
        title={
          <>
            {tr("pages.i18nPatterns.titleA")}
            <em>{t("pages.i18nPatterns.titleB")}</em>
          </>
        }
        metaLabel={t("pages.i18nPatterns.metaLabel")}
        meta={t("pages.i18nPatterns.meta")}
        intro={tr("pages.i18nPatterns.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.i18nPatterns.principles.title")}</>}
        kicker={t("pages.i18nPatterns.principles.kicker")}
      >
        <p className="section-desc">{t("pages.i18nPatterns.principles.desc")}</p>
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
        title={<>{t("pages.i18nPatterns.plurals.title")}</>}
        kicker={t("pages.i18nPatterns.plurals.kicker")}
      >
        <p className="section-desc">{tr("pages.i18nPatterns.plurals.desc")}</p>
        <Code>{`/* Intl.PluralRules — zero deps, padrão web nativo */
function pluralize(locale: string, n: number, dict: { one: string; other: string; zero?: string }) {
  const rules = new Intl.PluralRules(locale);
  const tag = n === 0 && dict.zero ? "zero" : rules.select(n);
  return (dict[tag as keyof typeof dict] ?? dict.other).replace("{n}", String(n));
}

pluralize("pt-BR", 0, { zero: "Nenhum item", one: "{n} item", other: "{n} itens" });
// → "Nenhum item"

pluralize("pt-BR", 1, { one: "{n} item", other: "{n} itens" });
// → "1 item"

pluralize("ar", 11, {/* árabe tem 6 categorias: zero/one/two/few/many/other */});`}</Code>
      </Section>

      <Section
        num="iii"
        title={<>{t("pages.i18nPatterns.formats.title")}</>}
        kicker={t("pages.i18nPatterns.formats.kicker")}
      >
        <p className="section-desc">{tr("pages.i18nPatterns.formats.desc")}</p>
        <Code>{`/* Datas */
new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(date);
// → "18 de abril de 2026"

new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(date);
// → "Apr 18, 2026, 2:30 PM"

/* Números */
new Intl.NumberFormat("pt-BR").format(1234567.89);
// → "1.234.567,89"

/* Moeda */
new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(279);
// → "R$ 279,00"

/* Lista */
new Intl.ListFormat("pt-BR").format(["maçã", "pera", "uva"]);
// → "maçã, pera e uva"

/* Tempo relativo */
new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" }).format(-1, "day");
// → "ontem"`}</Code>
      </Section>

      <Section
        num="iv"
        title={<>{t("pages.i18nPatterns.rtl.title")}</>}
        kicker={t("pages.i18nPatterns.rtl.kicker")}
      >
        <p className="section-desc">{tr("pages.i18nPatterns.rtl.desc")}</p>
      </Section>
    </>
  );
}
