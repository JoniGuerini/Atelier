import { useMemo, useState } from "react";
import {
  PageHead,
  Section,
  Example,
  CompositionSection,
  Button,
  Badge,
} from "../ds/primitives.tsx";
import { VirtualList } from "../ds/VirtualList.tsx";
import { useT } from "../lib/i18n.tsx";

interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  preview: string;
}

const AUTHORS = [
  "S. Marquez",
  "A. Hoffman",
  "L. Tanaka",
  "J. Bellamy",
  "R. Costa",
  "M. Eisinger",
  "P. Goldsmith",
];
const TITLES = [
  "On the discipline of negative space",
  "Editorial restraint in the age of velocity",
  "A short history of paper grain",
  "Letterspacing as a moral position",
  "The cabinet maker's brief",
  "Marginalia, ephemera, glosses",
  "Where the column gives way",
];

function makeArticles(n: number): Article[] {
  const out: Article[] = [];
  for (let i = 0; i < n; i++) {
    out.push({
      id: i + 1,
      title: `${TITLES[i % TITLES.length]} — vol. ${(i % 24) + 1}`,
      author: AUTHORS[i % AUTHORS.length],
      date: `${2024 + (i % 3)}.${String((i % 12) + 1).padStart(2, "0")}`,
      preview:
        "Notes from the workshop, set in the spirit of measured pages and slow afternoons.",
    });
  }
  return out;
}

export default function VirtualListPage() {
  const { t, tr } = useT();

  const tenK = useMemo(() => makeArticles(10000), []);
  const variable = useMemo(() => makeArticles(500), []);

  const [infinite, setInfinite] = useState<Article[]>(() => makeArticles(50));
  const onEnd = () => {
    setInfinite((prev) => {
      if (prev.length >= 1000) return prev;
      const start = prev.length;
      const more: Article[] = [];
      for (let i = 0; i < 25; i++) {
        const idx = start + i;
        more.push({
          id: idx + 1,
          title: `${TITLES[idx % TITLES.length]} — vol. ${(idx % 24) + 1}`,
          author: AUTHORS[idx % AUTHORS.length],
          date: `${2024 + (idx % 3)}.${String((idx % 12) + 1).padStart(2, "0")}`,
          preview:
            "Notes from the workshop, set in the spirit of measured pages and slow afternoons.",
        });
      }
      return [...prev, ...more];
    });
  };

  return (
    <>
      <PageHead
        lead={t("pages.virtualList.lead")}
        title={
          <>
            {tr("pages.virtualList.titleA")}
            <em>{t("pages.virtualList.titleB")}</em>
          </>
        }
        metaLabel={t("pages.virtualList.metaLabel")}
        meta={t("pages.virtualList.meta")}
        intro={tr("pages.virtualList.intro")}
      />

      {/* i · 10.000 items */}
      <Section
        num="i"
        title={<>{t("pages.virtualList.large.title")}</>}
        kicker={t("pages.virtualList.large.kicker")}
      >
        <p className="section-desc">{tr("pages.virtualList.large.desc")}</p>
        <Example
          caption={t("pages.virtualList.large.caption", {
            n: tenK.length.toLocaleString(),
          })}
          tech="VirtualList — itemHeight: 64"
          stack
          code={`<VirtualList
  items={tenThousandArticles}
  itemHeight={64}
  height={400}
  renderItem={(article) => <ArticleRow article={article} />}
/>`}
        >
          <VirtualList
            items={tenK}
            itemHeight={64}
            height={400}
            renderItem={(item) => <ArticleRow article={item} />}
            getKey={(item) => item.id}
          />
        </Example>
      </Section>

      {/* ii · variable height */}
      <Section
        num="ii"
        title={<>{t("pages.virtualList.variable.title")}</>}
        kicker={t("pages.virtualList.variable.kicker")}
      >
        <p className="section-desc">
          {tr("pages.virtualList.variable.desc")}
        </p>
        <Example
          caption={t("pages.virtualList.variable.caption")}
          tech="VirtualList — itemHeight: (i) => h"
          stack
          code={`<VirtualList
  items={items}
  itemHeight={(i) => (i % 3 === 0 ? 96 : i % 5 === 0 ? 128 : 56)}
  height={420}
  renderItem={(item) => <ArticleRow article={item} />}
/>`}
        >
          <VirtualList
            items={variable}
            itemHeight={(i) => (i % 3 === 0 ? 96 : i % 5 === 0 ? 128 : 56)}
            height={420}
            renderItem={(item, i) => (
              <ArticleRow
                article={item}
                size={i % 3 === 0 ? "lg" : i % 5 === 0 ? "xl" : "sm"}
              />
            )}
            getKey={(item) => item.id}
          />
        </Example>
      </Section>

      {/* iii · infinite scroll */}
      <Section
        num="iii"
        title={<>{t("pages.virtualList.infinite.title")}</>}
        kicker={t("pages.virtualList.infinite.kicker")}
      >
        <p className="section-desc">
          {tr("pages.virtualList.infinite.desc")}
        </p>
        <Example
          caption={t("pages.virtualList.infinite.caption", {
            n: String(infinite.length),
          })}
          tech="onEndReached"
          stack
          code={`<VirtualList
  items={items}
  itemHeight={64}
  height={400}
  onEndReached={loadMore}
  endThreshold={5}
  renderItem={(item) => <ArticleRow article={item} />}
/>`}
        >
          <VirtualList
            items={infinite}
            itemHeight={64}
            height={400}
            onEndReached={onEnd}
            endThreshold={5}
            renderItem={(item) => <ArticleRow article={item} />}
            getKey={(item) => item.id}
          />
          <div
            style={{
              marginTop: "var(--space-3)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 var(--space-3)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: "var(--ink-soft)",
                fontSize: 14,
              }}
            >
              {t("pages.virtualList.infinite.loaded", {
                n: String(infinite.length),
              })}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setInfinite(makeArticles(50))}
            >
              {t("pages.virtualList.infinite.reset")}
            </Button>
          </div>
        </Example>
      </Section>

      {/* iv · custom render */}
      <Section
        num="iv"
        title={<>{t("pages.virtualList.custom.title")}</>}
        kicker={t("pages.virtualList.custom.kicker")}
      >
        <p className="section-desc">
          {tr("pages.virtualList.custom.desc")}
        </p>
        <Example
          caption={t("pages.virtualList.custom.caption")}
          tech="renderItem custom"
          stack
          code={`<VirtualList
  items={items}
  itemHeight={48}
  renderItem={(item, i) => (
    <div className="my-row">
      <span>{i + 1}</span>
      <strong>{item.title}</strong>
      <Badge>{item.author}</Badge>
    </div>
  )}
/>`}
        >
          <VirtualList
            items={tenK.slice(0, 1000)}
            itemHeight={48}
            height={360}
            renderItem={(item, i) => (
              <div
                style={{
                  padding: "var(--space-2) var(--space-4)",
                  display: "grid",
                  gridTemplateColumns: "48px 1fr auto",
                  alignItems: "center",
                  gap: "var(--space-3)",
                  height: "100%",
                  fontFamily: "var(--font-serif)",
                  fontSize: 14,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "var(--ink-soft)",
                  }}
                >
                  {String(i + 1).padStart(4, "0")}
                </span>
                <strong style={{ fontWeight: 500 }}>{item.title}</strong>
                <Badge>{item.author}</Badge>
              </div>
            )}
            getKey={(item) => item.id}
          />
        </Example>
      </Section>

      <CompositionSection
        num="v"
        i18nPrefix="pages.virtualList.composition"
        root="VirtualList<T>"
        nodes={[
          {
            name: "props.items",
            children: [{ name: "T[] genérico" }],
          },
          {
            name: "props.itemHeight",
            children: [
              { name: "number — fixo" },
              { name: "(i) => number — variável" },
            ],
          },
          { name: "props.renderItem" },
          {
            name: "props.onEndReached",
            children: [{ name: "endThreshold" }],
          },
          { name: "props.overscan" },
        ]}
      />
    </>
  );
}

/* ------ helpers de demonstração ------ */
function ArticleRow({
  article,
  size = "md",
}: {
  article: Article;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const padY =
    size === "xl"
      ? "var(--space-4)"
      : size === "lg"
        ? "var(--space-3)"
        : "var(--space-2)";
  return (
    <div
      style={{
        padding: `${padY} var(--space-4)`,
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        gap: "var(--space-3)",
        height: "100%",
        fontFamily: "var(--font-serif)",
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {article.title}
        </div>
        {(size === "lg" || size === "xl") && (
          <div
            style={{
              fontSize: 12,
              color: "var(--ink-soft)",
              fontStyle: "italic",
              marginTop: 4,
            }}
          >
            {article.preview}
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          gap: "var(--space-3)",
          alignItems: "center",
          fontSize: 12,
          color: "var(--ink-soft)",
          fontFamily: "var(--font-mono)",
        }}
      >
        <span>{article.author}</span>
        <span>{article.date}</span>
      </div>
    </div>
  );
}
