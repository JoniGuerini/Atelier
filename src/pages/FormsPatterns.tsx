import { PageHead, Section, Code } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";
import { emify } from "../lib/emify.tsx";

/* ================================================================
   FormsPatterns — /forms-patterns (Reference · 62, fase 11.2)
   ================================================================ */

export default function FormsPatterns() {
  const { t, tr, raw } = useT();
  const validation = (raw("pages.formsPatterns.validation.rows") as { pattern: string; use: string; avoid: string }[]) || [];
  const states = (raw("pages.formsPatterns.states.items") as { kicker: string; title: string; body: string }[]) || [];
  const dos = (raw("pages.formsPatterns.dosDonts.dos") as string[]) || [];
  const donts = (raw("pages.formsPatterns.dosDonts.donts") as string[]) || [];

  return (
    <>
      <PageHead
        lead={t("pages.formsPatterns.lead")}
        title={
          <>
            {tr("pages.formsPatterns.titleA")}
            <em>{t("pages.formsPatterns.titleB")}</em>
          </>
        }
        metaLabel={t("pages.formsPatterns.metaLabel")}
        meta={t("pages.formsPatterns.meta")}
        intro={tr("pages.formsPatterns.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.formsPatterns.validation.title")}</>}
        kicker={t("pages.formsPatterns.validation.kicker")}
      >
        <p className="section-desc">{tr("pages.formsPatterns.validation.desc")}</p>
        <div className="pattern-decision-wrap">
          <table className="pattern-decision">
            <thead>
              <tr>
                <th style={{ width: "22%" }}>{t("pages.formsPatterns.validation.thPattern")}</th>
                <th>{t("pages.formsPatterns.validation.thUse")}</th>
                <th style={{ width: "30%" }}>{t("pages.formsPatterns.validation.thAvoid")}</th>
              </tr>
            </thead>
            <tbody>
              {validation.map((row, i) => (
                <tr key={i}>
                  <td><code>{row.pattern}</code></td>
                  <td>{row.use}</td>
                  <td>{row.avoid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section
        num="ii"
        title={<>{t("pages.formsPatterns.states.title")}</>}
        kicker={t("pages.formsPatterns.states.kicker")}
      >
        <p className="section-desc">{t("pages.formsPatterns.states.desc")}</p>
        <div className="pattern-stack">
          {states.map((s, i) => (
            <article key={i} className="pattern-callout">
              <span className="pattern-callout-kicker">{s.kicker}</span>
              <h3 className="pattern-callout-title">{s.title}</h3>
              <p className="pattern-callout-body">{emify(s.body)}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        num="iii"
        title={<>{t("pages.formsPatterns.async.title")}</>}
        kicker={t("pages.formsPatterns.async.kicker")}
      >
        <p className="section-desc">{tr("pages.formsPatterns.async.desc")}</p>
        <Code>{`/* Padrão editorial: optimistic disable + Toast em sucesso/erro */
function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const toast = useToast();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    try {
      await api.send(new FormData(e.currentTarget));
      toast.success("Mensagem enviada");
    } catch (err) {
      if (err instanceof ValidationError) {
        setErrors(err.fieldErrors);
      } else {
        toast.error("Não foi possível enviar — tente de novo");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormField label="Nome" error={errors.name}>
        <Input name="name" disabled={submitting} />
      </FormField>
      <FormActions>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Enviando…" : "Enviar"}
        </Button>
      </FormActions>
    </Form>
  );
}`}</Code>
      </Section>

      <Section
        num="iv"
        title={<>{t("pages.formsPatterns.dosDonts.title")}</>}
        kicker={t("pages.formsPatterns.dosDonts.kicker")}
      >
        <div className="pattern-do-dont">
          <div className="pattern-do">
            <span className="pattern-do-label">{t("pages.formsPatterns.dosDonts.doLabel")}</span>
            <ul>
              {dos.map((d, i) => <li key={i}>{emify(d)}</li>)}
            </ul>
          </div>
          <div className="pattern-dont">
            <span className="pattern-dont-label">{t("pages.formsPatterns.dosDonts.dontLabel")}</span>
            <ul>
              {donts.map((d, i) => <li key={i}>{emify(d)}</li>)}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
