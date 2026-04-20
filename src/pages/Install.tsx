import { PageHead, Section, Code } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";
import { emify } from "../lib/emify.tsx";

/* ================================================================
   Install — /install (Reference · 68, fase 11.5)
   ================================================================ */

export default function Install() {
  const { t, tr, raw } = useT();
  const philosophy = (raw("pages.install.philosophy.items") as { n: string; body: string }[]) || [];

  return (
    <>
      <PageHead
        lead={t("pages.install.lead")}
        title={
          <>
            {tr("pages.install.titleA")}
            <em>{t("pages.install.titleB")}</em>
          </>
        }
        metaLabel={t("pages.install.metaLabel")}
        meta={t("pages.install.meta")}
        intro={tr("pages.install.intro")}
      />

      <Section
        num="i"
        title={<>{t("pages.install.philosophy.title")}</>}
        kicker={t("pages.install.philosophy.kicker")}
      >
        <p className="section-desc">{t("pages.install.philosophy.desc")}</p>
        <ol className="pattern-bullets">
          {philosophy.map((p, i) => (
            <li key={i}>
              <span className="pattern-bullets-num">{p.n}</span>
              <span className="pattern-bullets-body">{emify(p.body)}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        num="ii"
        title={<>{t("pages.install.npm.title")}</>}
        kicker={t("pages.install.npm.kicker")}
      >
        <p className="section-desc">{tr("pages.install.npm.desc")}</p>
        <Code lang="bash">{`# Quando o pacote estiver no NPM (Fase 14):
npm install @atelier/ds

# Peer dependencies obrigatórias:
npm install react react-dom

# Em apps existentes — sem build extra, sem PostCSS, sem
# config de Tailwind. O DS é puro CSS + React.`}</Code>
      </Section>

      <Section
        num="iii"
        title={<>{t("pages.install.bootstrap.title")}</>}
        kicker={t("pages.install.bootstrap.kicker")}
      >
        <p className="section-desc">{tr("pages.install.bootstrap.desc")}</p>
        <Code>{`/* main.tsx */
import "@atelier/ds/styles.css";          // tokens + componentes
import { LocaleProvider, ShortcutsProvider, Toaster } from "@atelier/ds";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <LocaleProvider>
    <Toaster position="bottom-right">
      <ShortcutsProvider>
        <App />
      </ShortcutsProvider>
    </Toaster>
  </LocaleProvider>
);`}</Code>
      </Section>

      <Section
        num="iv"
        title={<>{t("pages.install.first.title")}</>}
        kicker={t("pages.install.first.kicker")}
      >
        <p className="section-desc">{tr("pages.install.first.desc")}</p>
        <Code>{`import { Button, Card, CardTitle, CardBody } from "@atelier/ds";

export function Welcome() {
  return (
    <Card>
      <CardTitle>Bem-vindo</CardTitle>
      <CardBody>
        Você acabou de instalar o Atelier. Continue lendo —
        cada componente tem uma decisão editorial que vale conhecer.
      </CardBody>
      <Button>Começar</Button>
    </Card>
  );
}`}</Code>
      </Section>
    </>
  );
}
