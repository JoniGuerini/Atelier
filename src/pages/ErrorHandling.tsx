import { PageHead, Section, Code } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";
import { emify } from "../lib/emify.tsx";

/* ================================================================
   ErrorHandling — /error-handling (Reference · 61, fase 11.1)
   ================================================================ */

export default function ErrorHandling() {
  const { t, tr, raw } = useT();
  const layers = (raw("pages.errorHandling.layers.items") as { n: string; body: string }[]) || [];
  const messages = (raw("pages.errorHandling.messages.items") as { kicker: string; title: string; body: string }[]) || [];
  const dos = (raw("pages.errorHandling.dosDonts.dos") as string[]) || [];
  const donts = (raw("pages.errorHandling.dosDonts.donts") as string[]) || [];

  return (
    <>
      <PageHead
        lead={t("pages.errorHandling.lead")}
        title={
          <>
            {tr("pages.errorHandling.titleA")}
            <em>{t("pages.errorHandling.titleB")}</em>
          </>
        }
        metaLabel={t("pages.errorHandling.metaLabel")}
        meta={t("pages.errorHandling.meta")}
        intro={tr("pages.errorHandling.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.errorHandling.layers.title")}</>}
        kicker={t("pages.errorHandling.layers.kicker")}
      >
        <p className="section-desc">{t("pages.errorHandling.layers.desc")}</p>
        <ol className="pattern-bullets">
          {layers.map((l, i) => (
            <li key={i}>
              <span className="pattern-bullets-num">{l.n}</span>
              <span className="pattern-bullets-body">{emify(l.body)}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        num="ii"
        title={<>{t("pages.errorHandling.boundary.title")}</>}
        kicker={t("pages.errorHandling.boundary.kicker")}
      >
        <p className="section-desc">{tr("pages.errorHandling.boundary.desc")}</p>
        <Code>{`/* React 18 ErrorBoundary — class component obrigatório */
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    /* enviar pra Sentry / Datadog aqui */
    console.error("Boundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <EmptyState>
          <EmptyTitle>Algo quebrou nesta seção.</EmptyTitle>
          <EmptyDescription>{this.state.error.message}</EmptyDescription>
          <EmptyActions>
            <Button onClick={() => this.setState({ error: null })}>Tentar de novo</Button>
          </EmptyActions>
        </EmptyState>
      );
    }
    return this.props.children;
  }
}`}</Code>
      </Section>

      <Section
        num="iii"
        title={<>{t("pages.errorHandling.messages.title")}</>}
        kicker={t("pages.errorHandling.messages.kicker")}
      >
        <p className="section-desc">{t("pages.errorHandling.messages.desc")}</p>
        <div className="pattern-stack">
          {messages.map((m, i) => (
            <article key={i} className="pattern-callout">
              <span className="pattern-callout-kicker">{m.kicker}</span>
              <h3 className="pattern-callout-title">{m.title}</h3>
              <p className="pattern-callout-body">{emify(m.body)}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        num="iv"
        title={<>{t("pages.errorHandling.dosDonts.title")}</>}
        kicker={t("pages.errorHandling.dosDonts.kicker")}
      >
        <div className="pattern-do-dont">
          <div className="pattern-do">
            <span className="pattern-do-label">{t("pages.errorHandling.dosDonts.doLabel")}</span>
            <ul>
              {dos.map((d, i) => (
                <li key={i}>{emify(d)}</li>
              ))}
            </ul>
          </div>
          <div className="pattern-dont">
            <span className="pattern-dont-label">{t("pages.errorHandling.dosDonts.dontLabel")}</span>
            <ul>
              {donts.map((d, i) => (
                <li key={i}>{emify(d)}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
