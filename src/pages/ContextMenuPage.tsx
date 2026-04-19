import { useState } from "react";
import {
  PageHead,
  Section,
  Example,
  CompositionSection,
} from "../ds/primitives.tsx";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuCheckboxItem,
} from "../ds/ContextMenu.tsx";
import { useT } from "../lib/i18n.tsx";

export default function ContextMenuPage() {
  const { t, tr } = useT();
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(true);
  const [actions, setActions] = useState<string[]>([]);
  const log = (a: string) =>
    setActions((prev) => [a, ...prev].slice(0, 5));

  return (
    <>
      <PageHead
        lead={t("pages.contextMenu.lead")}
        title={
          <>
            {tr("pages.contextMenu.titleA")}
            <em>{t("pages.contextMenu.titleB")}</em>
          </>
        }
        metaLabel={t("pages.contextMenu.metaLabel")}
        meta={t("pages.contextMenu.meta")}
        intro={tr("pages.contextMenu.intro")}
      />

      {/* i · Básico */}
      <Section
        num="i"
        title={<>{t("pages.contextMenu.basic.title")}</>}
        kicker={t("pages.contextMenu.basic.kicker")}
      >
        <p className="section-desc">{tr("pages.contextMenu.basic.desc")}</p>
        <Example
          caption={t("pages.contextMenu.basic.caption")}
          tech="right-click area"
          stack
          code={`<ContextMenu>
  <ContextMenuTrigger>
    <div>${t("pages.contextMenu.basic.area")}</div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem onSelect={...}>${t("pages.contextMenu.basic.cut")}</ContextMenuItem>
    <ContextMenuItem onSelect={...} shortcut="⌘C">${t("pages.contextMenu.basic.copy")}</ContextMenuItem>
    <ContextMenuItem onSelect={...} shortcut="⌘V">${t("pages.contextMenu.basic.paste")}</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem onSelect={...} destructive>${t("pages.contextMenu.basic.delete")}</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`}
        >
          <ContextMenu>
            <ContextMenuTrigger>
              <div
                tabIndex={0}
                style={{
                  padding: "var(--space-7)",
                  border: "1px dashed var(--rule-soft)",
                  background: "var(--bg-panel)",
                  textAlign: "center",
                  fontFamily: "var(--font-serif)",
                  fontSize: 15,
                  fontStyle: "italic",
                  color: "var(--ink-soft)",
                  cursor: "context-menu",
                  userSelect: "none",
                  width: "100%",
                }}
              >
                {t("pages.contextMenu.basic.area")}
                <br />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    fontStyle: "normal",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--ink-faint)",
                    marginTop: 8,
                    display: "inline-block",
                  }}
                >
                  {t("pages.contextMenu.basic.hint")}
                </span>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem
                shortcut="⌘X"
                onSelect={() => log(t("pages.contextMenu.basic.cut"))}
              >
                {t("pages.contextMenu.basic.cut")}
              </ContextMenuItem>
              <ContextMenuItem
                shortcut="⌘C"
                onSelect={() => log(t("pages.contextMenu.basic.copy"))}
              >
                {t("pages.contextMenu.basic.copy")}
              </ContextMenuItem>
              <ContextMenuItem
                shortcut="⌘V"
                onSelect={() => log(t("pages.contextMenu.basic.paste"))}
              >
                {t("pages.contextMenu.basic.paste")}
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem
                destructive
                onSelect={() => log(t("pages.contextMenu.basic.delete"))}
              >
                {t("pages.contextMenu.basic.delete")}
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
          {actions.length > 0 && (
            <div
              style={{
                marginTop: "var(--space-4)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--ink-faint)",
                letterSpacing: "0.1em",
              }}
            >
              {t("pages.contextMenu.basic.history")}: {actions.join(" · ")}
            </div>
          )}
        </Example>
      </Section>

      {/* ii · Editor formatting */}
      <Section
        num="ii"
        title={<>{t("pages.contextMenu.editor.title")}</>}
        kicker={t("pages.contextMenu.editor.kicker")}
      >
        <p className="section-desc">
          {tr("pages.contextMenu.editor.desc")}
        </p>
        <Example
          caption={t("pages.contextMenu.editor.caption")}
          tech="formatting"
          stack
          code={`<ContextMenu>
  <ContextMenuTrigger>
    <p>${t("pages.contextMenu.editor.lorem")}</p>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuLabel>${t("pages.contextMenu.editor.text")}</ContextMenuLabel>
    <ContextMenuCheckboxItem checked={bold} onCheckedChange={setBold}>
      ${t("pages.contextMenu.editor.bold")}
    </ContextMenuCheckboxItem>
    <ContextMenuCheckboxItem checked={italic} onCheckedChange={setItalic}>
      ${t("pages.contextMenu.editor.italic")}
    </ContextMenuCheckboxItem>
  </ContextMenuContent>
</ContextMenu>`}
        >
          <ContextMenu>
            <ContextMenuTrigger>
              <p
                tabIndex={0}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: "var(--ink-soft)",
                  padding: "var(--space-5)",
                  border: "1px dashed var(--rule-soft)",
                  cursor: "context-menu",
                  fontWeight: bold ? 600 : 400,
                  fontStyle: italic ? "italic" : "normal",
                  width: "100%",
                  margin: 0,
                }}
              >
                {t("pages.contextMenu.editor.lorem")}
              </p>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuLabel>
                {t("pages.contextMenu.editor.text")}
              </ContextMenuLabel>
              <ContextMenuCheckboxItem
                checked={bold}
                onCheckedChange={setBold}
                shortcut="⌘B"
              >
                {t("pages.contextMenu.editor.bold")}
              </ContextMenuCheckboxItem>
              <ContextMenuCheckboxItem
                checked={italic}
                onCheckedChange={setItalic}
                shortcut="⌘I"
              >
                {t("pages.contextMenu.editor.italic")}
              </ContextMenuCheckboxItem>
              <ContextMenuSeparator />
              <ContextMenuLabel>
                {t("pages.contextMenu.editor.actions")}
              </ContextMenuLabel>
              <ContextMenuItem glyph="¶">
                {t("pages.contextMenu.editor.paragraph")}
              </ContextMenuItem>
              <ContextMenuItem glyph="§">
                {t("pages.contextMenu.editor.heading")}
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </Example>
      </Section>

      <CompositionSection
        num="iii"
        i18nPrefix="pages.contextMenu.composition"
        root="ContextMenu"
        nodes={[
          { name: "ContextMenuTrigger" },
          {
            name: "ContextMenuContent",
            children: [
              { name: "ContextMenuLabel" },
              { name: "ContextMenuItem" },
              { name: "ContextMenuCheckboxItem" },
              { name: "ContextMenuSeparator" },
            ],
          },
        ]}
      />
    </>
  );
}
