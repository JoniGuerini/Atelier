import { PageHead, Section, Code } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";

/* ================================================================
   Density — página /density (Foundation · 11)
   ----------------------------------------------------------------
   Doc dos tokens --density-* e das classes utilitárias
   .is-density-compact / .is-density-spacious (Foundations II,
   fase 9.1). Demonstra o mesmo "rowset" em três densidades
   lado a lado, todas consumindo as mesmas CSS vars.
   ================================================================ */

const ROWS = [
  { label: "Item primeiro", meta: "12 ago" },
  { label: "Item segundo", meta: "14 ago" },
  { label: "Item terceiro", meta: "21 ago" },
];

const TOKENS = [
  { token: "--density-pad-x", comfortable: "var(--space-4) · 16px",  compact: "var(--space-3) · 12px",  spacious: "var(--space-5) · 24px" },
  { token: "--density-pad-y", comfortable: "var(--space-3) · 12px",  compact: "var(--space-2) · 8px",   spacious: "var(--space-4) · 16px" },
  { token: "--density-gap",   comfortable: "var(--space-3) · 12px",  compact: "var(--space-2) · 8px",   spacious: "var(--space-4) · 16px" },
  { token: "--density-text",  comfortable: "var(--text-sm) · 14px",  compact: "var(--text-xs) · 13px",  spacious: "var(--text-md) · 16px" },
];

function DemoList({ label }: { label: string }) {
  return (
    <div className="foundations-density-demo">
      <div className="foundations-density-demo-label">{label}</div>
      <ul className="foundations-density-list">
        {ROWS.map((r, i) => (
          <li key={i} className="foundations-density-row">
            <span>{r.label}</span>
            <span className="foundations-density-row-meta">{r.meta}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Density() {
  const { t, tr } = useT();

  return (
    <>
      <PageHead
        lead={t("pages.density.lead")}
        title={
          <>
            {tr("pages.density.titleA")}
            <em>{t("pages.density.titleB")}</em>
          </>
        }
        metaLabel={t("pages.density.metaLabel")}
        meta={t("pages.density.meta")}
        intro={tr("pages.density.intro")}
      />

      {/* i. Os três níveis */}
      <Section
        num="i"
        title={<>{t("pages.density.scaleTitle")}</>}
        kicker={t("pages.density.scaleKicker")}
      >
        <p className="section-desc">{t("pages.density.scaleDesc")}</p>
        <div className="foundations-density-trio">
          <div className="is-density-compact">
            <DemoList label="compact" />
          </div>
          <div>
            <DemoList label="comfortable (default)" />
          </div>
          <div className="is-density-spacious">
            <DemoList label="spacious" />
          </div>
        </div>
      </Section>

      {/* ii. Os tokens */}
      <Section
        num="ii"
        title={<>{t("pages.density.tokensTitle")}</>}
        kicker={t("pages.density.tokensKicker")}
      >
        <p className="section-desc">{tr("pages.density.tokensDesc")}</p>
        <div className="foundations-table-wrap">
          <table className="foundations-table">
            <thead>
              <tr>
                <th style={{ width: "26%" }}>token</th>
                <th>compact</th>
                <th>comfortable</th>
                <th>spacious</th>
              </tr>
            </thead>
            <tbody>
              {TOKENS.map((tk) => (
                <tr key={tk.token}>
                  <td>
                    <code>{tk.token}</code>
                  </td>
                  <td>
                    <code>{tk.compact}</code>
                  </td>
                  <td>
                    <code>{tk.comfortable}</code>
                  </td>
                  <td>
                    <code>{tk.spacious}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* iii. Como aplicar */}
      <Section
        num="iii"
        title={<>{t("pages.density.howTitle")}</>}
        kicker={t("pages.density.howKicker")}
      >
        <p className="section-desc">{t("pages.density.howDesc")}</p>
        <Code>{`/* Em qualquer ancestral — escopo arbitrário */
<section className="is-density-compact">
  <DataTable ... />     {/* todos os componentes filhos */}
  <Form ... />          {/* respeitam o escopo automaticamente */}
</section>

/* Sobrescrever só uma região */
<main>
  <Hero />              {/* default = comfortable */}
  <div className="is-density-spacious">
    <FeatureCards />    {/* mais respiração só aqui */}
  </div>
</main>

/* Componentes consomem via var() */
.my-row {
  padding: var(--density-pad-y) var(--density-pad-x);
  gap: var(--density-gap);
  font-size: var(--density-text);
}`}</Code>
      </Section>
    </>
  );
}
