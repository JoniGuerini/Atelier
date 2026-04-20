import { PageHead, Section, Code } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";
import { emify } from "../lib/emify.tsx";

/* ================================================================
   DestructiveActions — /destructive-actions (Reference · 63, fase 11.2)
   ================================================================ */

export default function DestructiveActions() {
  const { t, tr, raw } = useT();
  const tiers = (raw("pages.destructive.tiers.items") as { kicker: string; title: string; body: string }[]) || [];
  const dos = (raw("pages.destructive.dosDonts.dos") as string[]) || [];
  const donts = (raw("pages.destructive.dosDonts.donts") as string[]) || [];

  return (
    <>
      <PageHead
        lead={t("pages.destructive.lead")}
        title={
          <>
            {tr("pages.destructive.titleA")}
            <em>{t("pages.destructive.titleB")}</em>
          </>
        }
        metaLabel={t("pages.destructive.metaLabel")}
        meta={t("pages.destructive.meta")}
        intro={tr("pages.destructive.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.destructive.tiers.title")}</>}
        kicker={t("pages.destructive.tiers.kicker")}
      >
        <p className="section-desc">{tr("pages.destructive.tiers.desc")}</p>
        <div className="pattern-stack">
          {tiers.map((tt, i) => (
            <article key={i} className="pattern-callout">
              <span className="pattern-callout-kicker">{tt.kicker}</span>
              <h3 className="pattern-callout-title">{tt.title}</h3>
              <p className="pattern-callout-body">{emify(tt.body)}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        num="ii"
        title={<>{t("pages.destructive.undo.title")}</>}
        kicker={t("pages.destructive.undo.kicker")}
      >
        <p className="section-desc">{tr("pages.destructive.undo.desc")}</p>
        <Code>{`/* Pattern: ação imediata + toast com undo (5-10s) */
function deleteDraft(id: string) {
  const draft = drafts.find(d => d.id === id);
  setDrafts(prev => prev.filter(d => d.id !== id));   // remove imediato
  toast({
    variant: "info",
    title: \`Rascunho "\${draft.title}" descartado\`,
    duration: 8000,
    actions: [
      {
        label: "Desfazer",
        onClick: () => setDrafts(prev => [...prev, draft]),
      },
    ],
  });
}`}</Code>
      </Section>

      <Section
        num="iii"
        title={<>{t("pages.destructive.confirm.title")}</>}
        kicker={t("pages.destructive.confirm.kicker")}
      >
        <p className="section-desc">{tr("pages.destructive.confirm.desc")}</p>
        <Code>{`/* Pattern: typed confirmation pra ação irreversível */
<Modal title="Excluir conta">
  <p>Esta ação é definitiva. Para confirmar, digite o nome do projeto:</p>
  <Input value={typed} onChange={e => setTyped(e.target.value)} />
  <Button
    variant="danger"
    disabled={typed !== project.name}
    onClick={onDelete}
  >
    Excluir definitivamente
  </Button>
</Modal>`}</Code>
      </Section>

      <Section
        num="iv"
        title={<>{t("pages.destructive.dosDonts.title")}</>}
        kicker={t("pages.destructive.dosDonts.kicker")}
      >
        <div className="pattern-do-dont">
          <div className="pattern-do">
            <span className="pattern-do-label">{t("pages.destructive.dosDonts.doLabel")}</span>
            <ul>{dos.map((d, i) => <li key={i}>{emify(d)}</li>)}</ul>
          </div>
          <div className="pattern-dont">
            <span className="pattern-dont-label">{t("pages.destructive.dosDonts.dontLabel")}</span>
            <ul>{donts.map((d, i) => <li key={i}>{emify(d)}</li>)}</ul>
          </div>
        </div>
      </Section>
    </>
  );
}
