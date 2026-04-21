import { useState } from "react";
import {
  PageHead,
  Section,
  Example,
  CompositionSection,
} from "../ds/primitives.tsx";
import { TreeView, type TreeNode } from "../ds/TreeView.tsx";
import { useT } from "../lib/i18n.tsx";

const FILESYSTEM: TreeNode[] = [
  {
    id: "src",
    label: "src/",
    glyph: "▸",
    children: [
      {
        id: "ds",
        label: "ds/",
        glyph: "▸",
        children: [
          { id: "btn", label: "Button.tsx" },
          { id: "card", label: "Card.tsx" },
          { id: "tabs", label: "Tabs.tsx" },
        ],
      },
      {
        id: "pages",
        label: "pages/",
        glyph: "▸",
        children: [
          { id: "home", label: "Home.tsx" },
          { id: "overview", label: "Overview.tsx" },
          { id: "code", label: "Code.tsx" },
        ],
      },
      { id: "App", label: "App.tsx" },
      { id: "main", label: "main.tsx" },
    ],
  },
  {
    id: "public",
    label: "public/",
    glyph: "▸",
    children: [
      { id: "favicon", label: "favicon.ico" },
      { id: "robots", label: "robots.txt" },
    ],
  },
  { id: "pkg", label: "package.json" },
  { id: "ts", label: "tsconfig.json" },
  { id: "vite", label: "vite.config.ts" },
];

const CATEGORIES: TreeNode[] = [
  {
    id: "design",
    label: "Design",
    glyph: "§",
    children: [
      { id: "ux", label: "UX research" },
      { id: "ui", label: "UI patterns" },
      { id: "type", label: "Typography" },
    ],
  },
  {
    id: "code",
    label: "Code",
    glyph: "¶",
    children: [
      { id: "ts2", label: "TypeScript" },
      { id: "rs", label: "Rust" },
    ],
  },
  {
    id: "writing",
    label: "Writing",
    glyph: "❦",
    children: [
      { id: "essays", label: "Essays" },
      { id: "notes", label: "Notes" },
      { id: "fiction", label: "Fiction", disabled: true },
    ],
  },
];

export default function TreeViewPage() {
  const { t, tr } = useT();
  const [single, setSingle] = useState<string | null>("btn");
  const [multi, setMulti] = useState<string[]>(["ux", "essays"]);
  const [exp, setExp] = useState<string[]>(["src", "ds"]);

  return (
    <>
      <PageHead
        lead={t("pages.tree.lead")}
        title={
          <>
            {tr("pages.tree.titleA")}
            <em>{t("pages.tree.titleB")}</em>
          </>
        }
        metaLabel={t("pages.tree.metaLabel")}
        meta={t("pages.tree.meta")}
        intro={tr("pages.tree.intro")}
      />

      {/* i · Single */}
      <Section
        num="i"
        title={<>{t("pages.tree.single.title")}</>}
        kicker={t("pages.tree.single.kicker")}
      >
        <p className="section-desc">{tr("pages.tree.single.desc")}</p>
        <Example
          caption={t("pages.tree.single.caption")}
          tech="single"
          stack
          code={`<TreeView
  data={fs}
  selectionMode="single"
  value={selected}
  onChange={setSelected}
  defaultExpanded={["src", "ds"]}
/>`}
        >
          <div style={{ width: "100%", maxWidth: 360 }}>
            <TreeView
              data={FILESYSTEM}
              selectionMode="single"
              value={single}
              onChange={setSingle}
              defaultExpanded={["src", "ds"]}
              ariaLabel={t("pages.tree.single.label")}
            />
          </div>
        </Example>
      </Section>

      {/* ii · Multi */}
      <Section
        num="ii"
        title={<>{t("pages.tree.multi.title")}</>}
        kicker={t("pages.tree.multi.kicker")}
      >
        <p className="section-desc">{tr("pages.tree.multi.desc")}</p>
        <Example
          caption={t("pages.tree.multi.caption", {
            n: String(multi.length),
          })}
          tech="multi"
          stack
          code={`<TreeView
  data={categories}
  selectionMode="multi"
  value={selected}
  onChange={setSelected}
/>`}
        >
          <div style={{ width: "100%", maxWidth: 360 }}>
            <TreeView
              data={CATEGORIES}
              selectionMode="multi"
              value={multi}
              onChange={setMulti}
              defaultExpanded={["design", "writing"]}
              ariaLabel={t("pages.tree.multi.label")}
            />
          </div>
        </Example>
      </Section>

      {/* iii · Sem seleção (só nav) */}
      <Section
        num="iii"
        title={<>{t("pages.tree.nav.title")}</>}
        kicker={t("pages.tree.nav.kicker")}
      >
        <p className="section-desc">{tr("pages.tree.nav.desc")}</p>
        <Example
          caption={t("pages.tree.nav.caption")}
          tech="selectionMode=none"
          stack
          code={`<TreeView data={data} selectionMode="none" />`}
        >
          <div style={{ width: "100%", maxWidth: 360 }}>
            <TreeView
              data={FILESYSTEM}
              selectionMode="none"
              defaultExpanded={["src"]}
              ariaLabel={t("pages.tree.nav.label")}
            />
          </div>
        </Example>
      </Section>

      {/* iv · Controlado (expanded) */}
      <Section
        num="iv"
        title={<>{t("pages.tree.controlled.title")}</>}
        kicker={t("pages.tree.controlled.kicker")}
      >
        <p className="section-desc">{tr("pages.tree.controlled.desc")}</p>
        <Example
          caption={t("pages.tree.controlled.caption", {
            n: String(exp.length),
          })}
          tech="expanded controlled"
          stack
          code={`const [exp, setExp] = useState<string[]>(["src", "ds"]);

<TreeView
  data={fs}
  expanded={exp}
  onExpandedChange={setExp}
/>`}
        >
          <div style={{ width: "100%", maxWidth: 360 }}>
            <TreeView
              data={FILESYSTEM}
              selectionMode="single"
              value={single}
              onChange={setSingle}
              expanded={exp}
              onExpandedChange={setExp}
              ariaLabel={t("pages.tree.controlled.label")}
            />
          </div>
        </Example>
      </Section>

      <CompositionSection
        num="v"
        i18nPrefix="pages.tree.composition"
        root="TreeView"
        nodes={[]}
      />
    </>
  );
}
