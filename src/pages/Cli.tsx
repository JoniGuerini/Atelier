import { PageHead, Section, Code } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";
import { emify } from "../lib/emify.tsx";

/* ================================================================
   Cli — /cli (Reference · 69, fase 14.5)
   ----------------------------------------------------------------
   Documentacao do pacote @atelier/cli — comandos, flags, registry,
   filosofia copy-paste e quando escolher CLI vs library mode.

   A pagina espelha a saida real do binario instalado, capturada
   na sandbox do smoke test. Sem screenshots — apenas <Code>
   blocos com a saida formatada como o terminal renderiza.
   ================================================================ */

interface PhilosophyItem { n: string; body: string }
interface Requirement { label: string; value: string }
interface Flag { name: string; body: string }
interface VsRow { topic: string; cli: string; lib: string }
interface TroubleItem { problem: string; solution: string }

export default function Cli() {
  const { t, tr, raw } = useT();
  const philosophy = (raw("pages.cli.philosophy.items") as PhilosophyItem[]) || [];
  const requirements = (raw("pages.cli.requirements.items") as Requirement[]) || [];
  const initFlags = (raw("pages.cli.init.flags") as Flag[]) || [];
  const addFlags = (raw("pages.cli.add.flags") as Flag[]) || [];
  const categories = (raw("pages.cli.list.categories") as string[]) || [];
  const vsRows = (raw("pages.cli.vsLibrary.rows") as VsRow[]) || [];
  const trouble = (raw("pages.cli.troubleshooting.items") as TroubleItem[]) || [];

  return (
    <>
      <PageHead
        lead={t("pages.cli.lead")}
        title={
          <>
            {tr("pages.cli.titleA")}
            <em>{t("pages.cli.titleB")}</em>
          </>
        }
        metaLabel={t("pages.cli.metaLabel")}
        meta={t("pages.cli.meta")}
        intro={tr("pages.cli.intro")}
      />

      {/* ============= i. Filosofia ============= */}
      <Section
        num="i"
        title={<>{t("pages.cli.philosophy.title")}</>}
        kicker={t("pages.cli.philosophy.kicker")}
      >
        <p className="section-desc">{t("pages.cli.philosophy.desc")}</p>
        <ol className="pattern-bullets">
          {philosophy.map((p, i) => (
            <li key={i}>
              <span className="pattern-bullets-num">{p.n}</span>
              <span className="pattern-bullets-body">{emify(p.body)}</span>
            </li>
          ))}
        </ol>
      </Section>

      {/* ============= ii. Pre-requisitos ============= */}
      <Section
        num="ii"
        title={<>{t("pages.cli.requirements.title")}</>}
        kicker={t("pages.cli.requirements.kicker")}
      >
        <p className="section-desc">{t("pages.cli.requirements.desc")}</p>
        <div className="ds-table-wrap">
          <table className="ds-table cli-requirements-table">
            <tbody>
              {requirements.map((r, i) => (
                <tr key={i}>
                  <th scope="row">{r.label}</th>
                  <td>{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ============= iii. atelier init ============= */}
      <Section
        num="iii"
        title={<>{t("pages.cli.init.title")}</>}
        kicker={t("pages.cli.init.kicker")}
      >
        <p className="section-desc">{tr("pages.cli.init.desc")}</p>

        <Code lang="shell">{`# Em qualquer projeto novo ou existente:
npx atelier init`}</Code>

        <p className="cli-output-label">{t("pages.cli.init.outputLabel")}</p>
        <Code lang="shell">{`  Atelier · init  cwd: /your/project

  ✓ criou src/ds/
  ✓ criou src/lib/
  ✓ criou src/lib/hooks/
  ✓ copiou src/atelier.css (306.1 KB)

  Pronto. Importe "./atelier.css" no entry e adicione componentes:
    $ npx atelier add Button
    $ npx atelier add DataTable`}</Code>

        {initFlags.length > 0 && (
          <>
            <p className="cli-flags-label">{t("pages.cli.init.flagsLabel")}</p>
            <ul className="cli-flag-list">
              {initFlags.map((f, i) => (
                <li key={i}>
                  <code className="cli-flag-name">{f.name}</code>
                  <span className="cli-flag-body">{emify(f.body)}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </Section>

      {/* ============= iv. atelier add ============= */}
      <Section
        num="iv"
        title={<>{t("pages.cli.add.title")}</>}
        kicker={t("pages.cli.add.kicker")}
      >
        <p className="section-desc">{tr("pages.cli.add.desc")}</p>

        <Code lang="shell">{`# Um componente:
npx atelier add Button

# Multiplos:
npx atelier add Dialog Drawer Toaster

# Com forca para sobrescrever:
npx atelier add Button --force`}</Code>

        <p className="cli-output-label">{t("pages.cli.add.transitiveLabel")}</p>
        <p className="cli-trans-desc">{tr("pages.cli.add.transitiveDesc")}</p>
        <Code lang="shell">{`$ npx atelier add Dialog

  Atelier · add  -> Dialog

  ✓ src/ds/Dialog.tsx
  ✓ src/lib/hooks/useFocusTrap.ts
  ✓ src/lib/hooks/useFocusReturn.ts
  ✓ src/lib/hooks/useScrollLock.ts

  Resumo: 4 adicionado(s) · 0 ignorado(s)

  import { Dialog } from "./ds/Dialog";`}</Code>

        {addFlags.length > 0 && (
          <>
            <p className="cli-flags-label">{t("pages.cli.add.flagsLabel")}</p>
            <ul className="cli-flag-list">
              {addFlags.map((f, i) => (
                <li key={i}>
                  <code className="cli-flag-name">{f.name}</code>
                  <span className="cli-flag-body">{emify(f.body)}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </Section>

      {/* ============= v. atelier list ============= */}
      <Section
        num="v"
        title={<>{t("pages.cli.list.title")}</>}
        kicker={t("pages.cli.list.kicker")}
      >
        <p className="section-desc">{tr("pages.cli.list.desc")}</p>

        <Code lang="shell">{`# Tudo:
npx atelier list

# Filtrado por categoria:
npx atelier list --category=overlay
npx atelier list --category=form`}</Code>

        <Code lang="shell">{`$ npx atelier list --category=overlay

  5 componentes (categoria: overlay)

    Drawer             overlay     Side sheet · 4 lados      -> useFocusTrap, useScrollLock
    Popover            overlay     Anchored panel            -> useClickOutside
    DropdownMenu       overlay     Menu de acoes             -> useClickOutside
    ContextMenu        overlay     Right-click               -> useClickOutside
    Dialog             overlay     Modal · focus trap        -> useFocusTrap, useFocusReturn, useScrollLock`}</Code>

        <p className="cli-categories-label">{t("pages.cli.list.categoriesLabel")}</p>
        <ul className="cli-category-list">
          {categories.map((c) => (
            <li key={c}><code>{c}</code></li>
          ))}
        </ul>
        <p className="cli-alias-note">{emify(t("pages.cli.list.aliasNote"))}</p>
      </Section>

      {/* ============= vi. --version / --help ============= */}
      <Section
        num="vi"
        title={<>{t("pages.cli.meta2.title")}</>}
        kicker={t("pages.cli.meta2.kicker")}
      >
        <p className="section-desc">{tr("pages.cli.meta2.desc")}</p>
        <Code lang="shell">{`npx atelier --version    # 0.1.0
npx atelier --help       # banner com todos os comandos
npx atelier              # equivale a --help
npx atelier help         # idem`}</Code>
      </Section>

      {/* ============= vii. CLI vs Library ============= */}
      <Section
        num="vii"
        title={<>{t("pages.cli.vsLibrary.title")}</>}
        kicker={t("pages.cli.vsLibrary.kicker")}
      >
        <p className="section-desc">{t("pages.cli.vsLibrary.desc")}</p>
        <div className="ds-table-wrap">
          <table className="ds-table cli-vs-table">
            <thead>
              <tr>
                <th scope="col">&nbsp;</th>
                <th scope="col"><code>@atelier/cli</code></th>
                <th scope="col"><code>@atelier/ds</code></th>
              </tr>
            </thead>
            <tbody>
              {vsRows.map((r, i) => (
                <tr key={i}>
                  <th scope="row">{r.topic}</th>
                  <td>{emify(r.cli)}</td>
                  <td>{emify(r.lib)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ============= viii. Troubleshooting ============= */}
      <Section
        num="viii"
        title={<>{t("pages.cli.troubleshooting.title")}</>}
        kicker={t("pages.cli.troubleshooting.kicker")}
      >
        <p className="section-desc">{t("pages.cli.troubleshooting.desc")}</p>
        <dl className="cli-trouble-list">
          {trouble.map((it, i) => (
            <div key={i} className="cli-trouble-item">
              <dt>{emify(it.problem)}</dt>
              <dd>{emify(it.solution)}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ============= ix. See also ============= */}
      <Section
        num="ix"
        title={<>{t("pages.cli.seeAlso.title")}</>}
        kicker={t("pages.cli.seeAlso.kicker")}
      >
        <div className="cli-see-also">
          <a className="cli-see-also-card" href="#/install">
            <div className="cli-see-also-label">
              {t("pages.cli.seeAlso.installLabel")}
              <span className="cli-see-also-arrow" aria-hidden="true">→</span>
            </div>
            <p>{t("pages.cli.seeAlso.installDesc")}</p>
          </a>
          <a className="cli-see-also-card" href="#/api-reference">
            <div className="cli-see-also-label">
              {t("pages.cli.seeAlso.registryLabel")}
              <span className="cli-see-also-arrow" aria-hidden="true">→</span>
            </div>
            <p>{t("pages.cli.seeAlso.registryDesc")}</p>
          </a>
        </div>
      </Section>
    </>
  );
}
