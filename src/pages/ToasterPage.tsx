import {
  PageHead,
  Section,
  Example,
  CompositionSection,
  Button,
  Code,
} from "../ds/primitives.tsx";
import { useToast, type ToastVariant } from "../ds/Toaster.tsx";
import { useT } from "../lib/i18n.tsx";

const VARIANTS: ToastVariant[] = ["default", "info", "ok", "warn", "danger"];

export default function ToasterPage() {
  const { t, tr } = useT();
  const { toast, clear } = useToast();

  return (
    <>
      <PageHead
        lead={t("pages.toaster.lead")}
        title={
          <>
            {tr("pages.toaster.titleA")}
            <em>{t("pages.toaster.titleB")}</em>
          </>
        }
        metaLabel={t("pages.toaster.metaLabel")}
        meta={t("pages.toaster.meta")}
        intro={tr("pages.toaster.intro")}
      />

      {/* i · Setup */}
      <Section
        num="i"
        title={<>{t("pages.toaster.setup.title")}</>}
        kicker={t("pages.toaster.setup.kicker")}
      >
        <p className="section-desc">{tr("pages.toaster.setup.desc")}</p>
        <Code lang="jsx">{`// Em App.tsx — uma vez no root
import { Toaster } from "./ds/Toaster";

export default function App() {
  return (
    <Toaster position="bottom-right">
      {/* resto da app */}
    </Toaster>
  );
}

// Em qualquer componente
import { useToast } from "./ds/Toaster";

function SaveButton() {
  const { toast } = useToast();
  return (
    <Button onClick={() => toast("Salvo.")}>
      Salvar
    </Button>
  );
}`}</Code>
      </Section>

      {/* ii · Forma curta */}
      <Section
        num="ii"
        title={<>{t("pages.toaster.short.title")}</>}
        kicker={t("pages.toaster.short.kicker")}
      >
        <p className="section-desc">{tr("pages.toaster.short.desc")}</p>
        <Example
          caption={t("pages.toaster.short.caption")}
          tech="toast(string)"
          stack
          code={`toast("${t("pages.toaster.short.message")}");`}
        >
          <div
            style={{
              padding: "var(--space-5) 0",
              display: "flex",
              gap: "var(--space-3)",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() => toast(t("pages.toaster.short.message"))}
            >
              {t("pages.toaster.short.btn")}
            </Button>
          </div>
        </Example>
      </Section>

      {/* iii · 5 variantes */}
      <Section
        num="iii"
        title={<>{t("pages.toaster.variants.title")}</>}
        kicker={t("pages.toaster.variants.kicker")}
      >
        <p className="section-desc">{tr("pages.toaster.variants.desc")}</p>
        <Example
          caption={t("pages.toaster.variants.caption")}
          tech="5 variants"
          stack
          code={`toast("Connection lost", { variant: "danger" });
toast("Saved.", { variant: "ok" });
toast("New message", { variant: "info" });
toast("Storage almost full", { variant: "warn" });`}
        >
          <div
            style={{
              padding: "var(--space-5) 0",
              display: "flex",
              gap: "var(--space-2)",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {VARIANTS.map((v) => (
              <Button
                key={v}
                size="sm"
                variant="ghost"
                onClick={() =>
                  toast(t(`pages.toaster.variants.${v}.title`), {
                    description: t(`pages.toaster.variants.${v}.desc`),
                    variant: v,
                  })
                }
              >
                {v}
              </Button>
            ))}
          </div>
        </Example>
      </Section>

      {/* iv · Com ação */}
      <Section
        num="iv"
        title={<>{t("pages.toaster.action.title")}</>}
        kicker={t("pages.toaster.action.kicker")}
      >
        <p className="section-desc">{tr("pages.toaster.action.desc")}</p>
        <Example
          caption={t("pages.toaster.action.caption")}
          tech="action button"
          stack
          code={`toast("${t("pages.toaster.action.title2")}", {
  description: "${t("pages.toaster.action.desc2")}",
  variant: "ok",
  action: {
    label: "${t("pages.toaster.action.undo")}",
    onClick: () => undo(),
  },
});`}
        >
          <div
            style={{
              padding: "var(--space-5) 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() =>
                toast(t("pages.toaster.action.title2"), {
                  description: t("pages.toaster.action.desc2"),
                  variant: "ok",
                  duration: 8000,
                  action: {
                    label: t("pages.toaster.action.undo"),
                    onClick: () =>
                      toast(t("pages.toaster.action.undone"), {
                        variant: "info",
                      }),
                  },
                })
              }
            >
              {t("pages.toaster.action.btn")}
            </Button>
          </div>
        </Example>
      </Section>

      {/* v · Persistente */}
      <Section
        num="v"
        title={<>{t("pages.toaster.persistent.title")}</>}
        kicker={t("pages.toaster.persistent.kicker")}
      >
        <p className="section-desc">
          {tr("pages.toaster.persistent.desc")}
        </p>
        <Example
          caption={t("pages.toaster.persistent.caption")}
          tech="duration: 0"
          stack
          code={`toast("${t("pages.toaster.persistent.title2")}", {
  variant: "warn",
  duration: 0,  // não auto-dismiss
});`}
        >
          <div
            style={{
              padding: "var(--space-5) 0",
              display: "flex",
              gap: "var(--space-3)",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() =>
                toast(t("pages.toaster.persistent.title2"), {
                  description: t("pages.toaster.persistent.desc2"),
                  variant: "warn",
                  duration: 0,
                })
              }
            >
              {t("pages.toaster.persistent.btn")}
            </Button>
            <Button variant="ghost" onClick={clear}>
              {t("pages.toaster.persistent.clear")}
            </Button>
          </div>
        </Example>
      </Section>

      {/* vi · Stack */}
      <Section
        num="vi"
        title={<>{t("pages.toaster.stack.title")}</>}
        kicker={t("pages.toaster.stack.kicker")}
      >
        <p className="section-desc">{tr("pages.toaster.stack.desc")}</p>
        <Example
          caption={t("pages.toaster.stack.caption")}
          tech="queue + limit"
          stack
          code={`<Toaster limit={5} defaultDuration={4000} position="bottom-right" />`}
        >
          <div
            style={{
              padding: "var(--space-5) 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() => {
                for (let i = 1; i <= 6; i++) {
                  setTimeout(
                    () =>
                      toast(`${t("pages.toaster.stack.label")} ${i}`, {
                        description: t("pages.toaster.stack.body", {
                          n: String(i),
                        }),
                        variant: (
                          ["default", "info", "ok", "warn", "danger"] as const
                        )[i % 5],
                      }),
                    i * 200,
                  );
                }
              }}
            >
              {t("pages.toaster.stack.btn")}
            </Button>
          </div>
        </Example>
      </Section>

      <CompositionSection
        num="vii"
        i18nPrefix="pages.toaster.composition"
        root="Toaster"
        nodes={[
          { name: "useToast() hook" },
          { name: "toast(input, options?)" },
          { name: "dismiss(id)" },
          { name: "clear()" },
        ]}
      />
    </>
  );
}
