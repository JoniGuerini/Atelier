import { useCallback, useState } from "react";
import {
  PageHead,
  Section,
  Example,
  CompositionSection,
  Button,
} from "../ds/primitives.tsx";
import {
  ShortcutCombo,
  useShortcut,
  useShortcutsContext,
} from "../ds/Shortcuts.tsx";
import { useToast } from "../ds/Toaster.tsx";
import { useT } from "../lib/i18n.tsx";

export default function ShortcutsPage() {
  const { t, tr } = useT();
  const { openHelp } = useShortcutsContext();
  const { toast } = useToast();
  const [counter, setCounter] = useState(0);

  /* Registra alguns atalhos só pra essa página. Eles desaparecem
     do help dialog quando o user navega pra outra página. */
  useShortcut(
    "cmd+s",
    useCallback(() => {
      toast(t("pages.shortcuts.demo.savedTitle"), {
        description: t("pages.shortcuts.demo.savedBody"),
        variant: "ok",
      });
    }, [toast, t]),
    {
      label: t("pages.shortcuts.demo.save"),
      group: t("pages.shortcuts.groups.editor"),
    },
  );

  useShortcut(
    "cmd+enter",
    useCallback(() => {
      toast(t("pages.shortcuts.demo.published"), { variant: "info" });
    }, [toast, t]),
    {
      label: t("pages.shortcuts.demo.publish"),
      group: t("pages.shortcuts.groups.editor"),
    },
  );

  useShortcut(
    "cmd+z",
    useCallback(() => {
      setCounter((n) => Math.max(0, n - 1));
    }, []),
    {
      label: t("pages.shortcuts.demo.undo"),
      group: t("pages.shortcuts.groups.editor"),
    },
  );

  useShortcut(
    "alt+arrowup",
    useCallback(() => {
      setCounter((n) => n + 1);
    }, []),
    {
      label: t("pages.shortcuts.demo.increment"),
      group: t("pages.shortcuts.groups.demo"),
    },
  );

  useShortcut(
    "alt+arrowdown",
    useCallback(() => {
      setCounter((n) => Math.max(0, n - 1));
    }, []),
    {
      label: t("pages.shortcuts.demo.decrement"),
      group: t("pages.shortcuts.groups.demo"),
    },
  );

  return (
    <>
      <PageHead
        lead={t("pages.shortcuts.lead")}
        title={
          <>
            {tr("pages.shortcuts.titleA")}
            <em>{t("pages.shortcuts.titleB")}</em>
          </>
        }
        metaLabel={t("pages.shortcuts.metaLabel")}
        meta={t("pages.shortcuts.meta")}
        intro={tr("pages.shortcuts.intro")}
      />

      {/* i · Setup */}
      <Section
        num="i"
        title={<>{t("pages.shortcuts.setup.title")}</>}
        kicker={t("pages.shortcuts.setup.kicker")}
      >
        <p className="section-desc">{tr("pages.shortcuts.setup.desc")}</p>
        <Example
          caption={t("pages.shortcuts.setup.caption")}
          tech="ShortcutsProvider + useShortcut"
          stack
          code={`// 1) No root da app
import { ShortcutsProvider } from "./ds/Shortcuts";

<ShortcutsProvider>
  <App />
</ShortcutsProvider>

// 2) Em qualquer componente
import { useShortcut } from "./ds/Shortcuts";

useShortcut("cmd+s", () => save(), {
  label: "Salvar",
  group: "Editor",
});

// 3) Built-in: Shift+? abre o help dialog automaticamente
//    com a lista de todos os atalhos registrados`}
        >
          <div
            style={{
              padding: "var(--space-4)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 14,
                color: "var(--ink-soft)",
                textAlign: "center",
              }}
            >
              {tr("pages.shortcuts.setup.try", {
                key: "Shift+?",
              })}
            </div>
            <Button onClick={openHelp}>
              {t("pages.shortcuts.setup.btn")}
            </Button>
          </div>
        </Example>
      </Section>

      {/* ii · Atalhos ativos */}
      <Section
        num="ii"
        title={<>{t("pages.shortcuts.active.title")}</>}
        kicker={t("pages.shortcuts.active.kicker")}
      >
        <p className="section-desc">{tr("pages.shortcuts.active.desc")}</p>
        <Example
          caption={t("pages.shortcuts.active.caption", {
            n: String(counter),
          })}
          tech="live demo"
          stack
          code={`useShortcut("cmd+s",        () => toast("Saved."));
useShortcut("cmd+enter",    () => toast("Published."));
useShortcut("alt+arrowup",  () => increment());
useShortcut("alt+arrowdown",() => decrement());`}
        >
          <div
            style={{
              padding: "var(--space-5)",
              display: "grid",
              gap: "var(--space-3)",
              fontFamily: "var(--font-serif)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 14,
              }}
            >
              <span>{t("pages.shortcuts.demo.save")}</span>
              <ShortcutCombo combo="cmd+s" />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 14,
              }}
            >
              <span>{t("pages.shortcuts.demo.publish")}</span>
              <ShortcutCombo combo="cmd+enter" />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 14,
              }}
            >
              <span>{t("pages.shortcuts.demo.increment")}</span>
              <ShortcutCombo combo="alt+arrowup" />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 14,
              }}
            >
              <span>{t("pages.shortcuts.demo.decrement")}</span>
              <ShortcutCombo combo="alt+arrowdown" />
            </div>
            <div
              style={{
                marginTop: "var(--space-3)",
                paddingTop: "var(--space-3)",
                borderTop: "1px solid var(--rule-soft)",
                textAlign: "center",
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: 18,
                color: "var(--accent)",
              }}
            >
              {t("pages.shortcuts.active.counter")}: {counter}
            </div>
          </div>
        </Example>
      </Section>

      {/* iii · ShortcutCombo */}
      <Section
        num="iii"
        title={<>{t("pages.shortcuts.combo.title")}</>}
        kicker={t("pages.shortcuts.combo.kicker")}
      >
        <p className="section-desc">{tr("pages.shortcuts.combo.desc")}</p>
        <Example
          caption={t("pages.shortcuts.combo.caption")}
          tech="ShortcutCombo"
          stack
          code={`<ShortcutCombo combo="cmd+k" />
<ShortcutCombo combo="shift+?" />
<ShortcutCombo combo="alt+arrowup" />
<ShortcutCombo combo="cmd+shift+enter" />`}
        >
          <div
            style={{
              padding: "var(--space-4)",
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-3)",
              justifyContent: "center",
            }}
          >
            <ShortcutCombo combo="cmd+k" />
            <ShortcutCombo combo="shift+?" />
            <ShortcutCombo combo="alt+arrowup" />
            <ShortcutCombo combo="cmd+shift+enter" />
            <ShortcutCombo combo="ctrl+space" />
            <ShortcutCombo combo="escape" />
          </div>
        </Example>
      </Section>

      <CompositionSection
        num="iv"
        i18nPrefix="pages.shortcuts.composition"
        root="ShortcutsProvider"
        nodes={[
          { name: "useShortcut() hook" },
          { name: "useShortcutsContext() hook" },
          { name: "ShortcutCombo component" },
        ]}
      />
    </>
  );
}
