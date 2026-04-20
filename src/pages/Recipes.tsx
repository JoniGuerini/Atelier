import { useMemo, useState } from "react";
import { PageHead, Section, Example } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";
import { RECIPES, type Recipe } from "../lib/recipes.tsx";

/* ================================================================
   Recipes — /recipes (Reference · 72, fase 13.3)
   ----------------------------------------------------------------
   Galeria curada de composições prontas. Cada receita renderiza
   AO VIVO + tem snippet editável + abre em StackBlitz/CodeSandbox.
   ================================================================ */

type Filter = Recipe["category"] | "all";

const CATEGORY_ORDER: Recipe["category"][] = ["form", "layout", "data", "marketing"];

export default function Recipes() {
  const { t, tr } = useT();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () => (filter === "all" ? RECIPES : RECIPES.filter((r) => r.category === filter)),
    [filter]
  );

  const counts = useMemo(() => {
    const out: Record<string, number> = { all: RECIPES.length };
    for (const c of CATEGORY_ORDER) out[c] = RECIPES.filter((r) => r.category === c).length;
    return out;
  }, []);

  return (
    <>
      <PageHead
        lead={t("pages.recipes.lead")}
        title={
          <>
            {tr("pages.recipes.titleA")}
            <em>{t("pages.recipes.titleB")}</em>
          </>
        }
        metaLabel={t("pages.recipes.metaLabel")}
        meta={t("pages.recipes.meta", { count: RECIPES.length })}
        intro={tr("pages.recipes.intro")}
      />

      {/* Chips de categoria */}
      <div className="recipes-chips" role="tablist" aria-label={t("pages.recipes.filterLabel")}>
        <button
          type="button"
          role="tab"
          aria-selected={filter === "all"}
          className={`recipes-chip ${filter === "all" ? "is-active" : ""}`}
          onClick={() => setFilter("all")}
        >
          {t("pages.recipes.categories.all")} <span className="recipes-chip-count">{counts.all}</span>
        </button>
        {CATEGORY_ORDER.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={filter === c}
            className={`recipes-chip ${filter === c ? "is-active" : ""}`}
            onClick={() => setFilter(c)}
          >
            {t(`pages.recipes.categories.${c}`)}{" "}
            <span className="recipes-chip-count">{counts[c]}</span>
          </button>
        ))}
      </div>

      {filtered.map((recipe, i) => (
        <Section
          key={recipe.id}
          num={String(i + 1).padStart(2, "0")}
          title={<>{t(`pages.recipes.items.${recipe.id}.title`)}</>}
          kicker={t(`pages.recipes.items.${recipe.id}.kicker`)}
        >
          <p className="section-desc">
            {tr(`pages.recipes.items.${recipe.id}.desc`)}
          </p>
          <Example
            caption={t(`pages.recipes.items.${recipe.id}.caption`)}
            tech={t(`pages.recipes.categories.${recipe.category}`)}
            stack
            code={recipe.snippet}
            editable
            sandbox
            sandboxTitle={`Atelier · ${t(`pages.recipes.items.${recipe.id}.title`)}`}
          >
            {recipe.preview}
          </Example>
        </Section>
      ))}
    </>
  );
}
