import { useState } from "react";
import {
  PageHead,
  Section,
  Example,
  CompositionSection,
  Badge,
} from "../ds/primitives.tsx";
import {
  Sortable,
  DragSource,
  DropZone,
  DragDropProvider,
} from "../ds/DragDrop.tsx";
import { useT } from "../lib/i18n.tsx";

interface Card {
  id: number;
  title: string;
  tag: string;
}

const INITIAL: Card[] = [
  { id: 1, title: "Editorial brief", tag: "draft" },
  { id: 2, title: "Typography review", tag: "review" },
  { id: 3, title: "Color palette v3", tag: "review" },
  { id: 4, title: "Component map", tag: "draft" },
  { id: 5, title: "Style guide compendium", tag: "done" },
];

export default function DragDropPage() {
  const { t, tr } = useT();

  /* sortable demo */
  const [list, setList] = useState<Card[]>(INITIAL);

  /* horizontal sortable */
  const [pills, setPills] = useState([
    "Index",
    "Process",
    "Style",
    "Voice",
    "Color",
  ]);

  /* cross-container demo (kanban-lite) */
  const [todo, setTodo] = useState<Card[]>([
    { id: 11, title: "Sketch grid", tag: "ux" },
    { id: 12, title: "Audit current copy", tag: "writing" },
  ]);
  const [doing, setDoing] = useState<Card[]>([
    { id: 13, title: "Polish dropdown", tag: "ui" },
  ]);
  const [done, setDone] = useState<Card[]>([
    { id: 14, title: "Set up tokens", tag: "system" },
  ]);

  function moveTo(target: "todo" | "doing" | "done", card: Card) {
    const removeFromAll = () => {
      setTodo((p) => p.filter((c) => c.id !== card.id));
      setDoing((p) => p.filter((c) => c.id !== card.id));
      setDone((p) => p.filter((c) => c.id !== card.id));
    };
    removeFromAll();
    if (target === "todo") setTodo((p) => [...p, card]);
    if (target === "doing") setDoing((p) => [...p, card]);
    if (target === "done") setDone((p) => [...p, card]);
  }

  return (
    <DragDropProvider>
      <PageHead
        lead={t("pages.dragDrop.lead")}
        title={
          <>
            {tr("pages.dragDrop.titleA")}
            <em>{t("pages.dragDrop.titleB")}</em>
          </>
        }
        metaLabel={t("pages.dragDrop.metaLabel")}
        meta={t("pages.dragDrop.meta")}
        intro={tr("pages.dragDrop.intro")}
      />

      {/* i · Sortable vertical */}
      <Section
        num="i"
        title={<>{t("pages.dragDrop.sortable.title")}</>}
        kicker={t("pages.dragDrop.sortable.kicker")}
      >
        <p className="section-desc">{tr("pages.dragDrop.sortable.desc")}</p>
        <Example
          caption={t("pages.dragDrop.sortable.caption")}
          tech="Sortable"
          stack
          code={`<Sortable items={list} onChange={setList} getKey={(c) => c.id}>
  {(card) => <CardRow card={card} />}
</Sortable>`}
        >
          <Sortable items={list} onChange={setList} getKey={(c) => c.id}>
            {(card) => <CardRow card={card} />}
          </Sortable>
        </Example>
      </Section>

      {/* ii · Sortable horizontal */}
      <Section
        num="ii"
        title={<>{t("pages.dragDrop.horizontal.title")}</>}
        kicker={t("pages.dragDrop.horizontal.kicker")}
      >
        <p className="section-desc">
          {tr("pages.dragDrop.horizontal.desc")}
        </p>
        <Example
          caption={t("pages.dragDrop.horizontal.caption")}
          tech="orientation: horizontal"
          stack
          code={`<Sortable
  items={pills}
  onChange={setPills}
  orientation="horizontal"
>
  {(label) => <Pill>{label}</Pill>}
</Sortable>`}
        >
          <Sortable
            items={pills}
            onChange={setPills}
            orientation="horizontal"
            getKey={(p) => p}
          >
            {(label) => (
              <span
                style={{
                  display: "inline-block",
                  padding: "var(--space-2) var(--space-4)",
                  border: "1px solid var(--rule)",
                  background: "var(--bg-panel)",
                  fontFamily: "var(--font-serif)",
                  fontSize: 14,
                }}
              >
                {label}
              </span>
            )}
          </Sortable>
        </Example>
      </Section>

      {/* iii · Cross-container */}
      <Section
        num="iii"
        title={<>{t("pages.dragDrop.cross.title")}</>}
        kicker={t("pages.dragDrop.cross.kicker")}
      >
        <p className="section-desc">{tr("pages.dragDrop.cross.desc")}</p>
        <Example
          caption={t("pages.dragDrop.cross.caption")}
          tech="DragSource + DropZone + accepts"
          stack
          code={`<DragDropProvider>
  <DropZone onDrop={(card) => moveTo("doing", card)} accepts="card">
    {doing.map((c) => (
      <DragSource key={c.id} data={c} type="card">
        <CardRow card={c} />
      </DragSource>
    ))}
  </DropZone>
</DragDropProvider>`}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "1px",
              background: "var(--rule-soft)",
              border: "1px solid var(--rule-soft)",
            }}
          >
            <KanbanColumn
              label={t("pages.dragDrop.cross.todo")}
              cards={todo}
              onDrop={(c) => moveTo("todo", c)}
            />
            <KanbanColumn
              label={t("pages.dragDrop.cross.doing")}
              cards={doing}
              onDrop={(c) => moveTo("doing", c)}
            />
            <KanbanColumn
              label={t("pages.dragDrop.cross.done")}
              cards={done}
              onDrop={(c) => moveTo("done", c)}
            />
          </div>
        </Example>
      </Section>

      {/* iv · Keyboard */}
      <Section
        num="iv"
        title={<>{t("pages.dragDrop.keyboard.title")}</>}
        kicker={t("pages.dragDrop.keyboard.kicker")}
      >
        <p className="section-desc">
          {tr("pages.dragDrop.keyboard.desc")}
        </p>
        <Example
          caption={t("pages.dragDrop.keyboard.caption")}
          tech="Tab + Space + arrows"
          stack
          code={`// Tab pra focar um item da Sortable
// Space ou Enter pra "pegar"
// ↑ / ↓ pra mover (vertical) — ← / → (horizontal)
// Space pra "soltar" — Esc pra cancelar`}
        >
          <Sortable
            items={["Alpha", "Beta", "Gamma", "Delta", "Epsilon"]}
            onChange={() => {
              /* demo standalone — re-render via effect não importa aqui */
            }}
            getKey={(s) => s}
          >
            {(label) => (
              <div
                style={{
                  padding: "var(--space-3) var(--space-4)",
                  border: "1px solid var(--rule-soft)",
                  background: "var(--bg-panel)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                }}
              >
                {label}
              </div>
            )}
          </Sortable>
        </Example>
      </Section>

      <CompositionSection
        num="v"
        i18nPrefix="pages.dragDrop.composition"
        root="DragDrop kit"
        nodes={[
          {
            name: "<Sortable>",
            children: [
              { name: "props.items + onChange" },
              { name: "props.orientation" },
              { name: "internal: pointer drag" },
              { name: "internal: keyboard mode" },
            ],
          },
          {
            name: "<DragDropProvider>",
            children: [{ name: "context: current, pointer" }],
          },
          {
            name: "<DragSource>",
            children: [{ name: "props.data + type" }],
          },
          {
            name: "<DropZone>",
            children: [
              { name: "props.onDrop" },
              { name: "props.accepts (filter por type)" },
            ],
          },
          { name: "<DragGhost> (auto-mounted)" },
        ]}
      />
    </DragDropProvider>
  );
}

/* ------ helpers ------ */
function CardRow({ card }: { card: Card }) {
  return (
    <div
      style={{
        padding: "var(--space-3) var(--space-4)",
        background: "var(--bg-panel)",
        border: "1px solid var(--rule-soft)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "var(--space-3)",
        fontFamily: "var(--font-serif)",
      }}
    >
      <span style={{ fontSize: 14 }}>{card.title}</span>
      <Badge>{card.tag}</Badge>
    </div>
  );
}

function KanbanColumn({
  label,
  cards,
  onDrop,
}: {
  label: string;
  cards: Card[];
  onDrop: (c: Card) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--bg-sunken)",
        minHeight: 240,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--ink-soft)",
          padding: "var(--space-3) var(--space-3)",
          borderBottom: "1px solid var(--rule-soft)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>{label}</span>
        <span style={{ opacity: 0.6 }}>{cards.length}</span>
      </div>
      <DropZone
        onDrop={(c) => onDrop(c as Card)}
        accepts="card"
        ariaLabel={label}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-2)",
            padding: "var(--space-3)",
            minHeight: 200,
          }}
        >
          {cards.map((c) => (
            <DragSource key={c.id} data={c} type="card">
              <CardRow card={c} />
            </DragSource>
          ))}
        </div>
      </DropZone>
    </div>
  );
}
