import { PageHead, Section } from "../ds/primitives.tsx";
import { useT } from "../lib/i18n.tsx";

/* ================================================================
   Hooks — página /hooks (Reference · 56)
   ----------------------------------------------------------------
   Doc dos 14 hooks utilitários públicos da Fase 10. Estrutura
   editorial: três sub-fases agrupadas (10.1 ambiente, 10.2 DOM,
   10.3 estado), uma matriz de descoberta "qual hook usar quando",
   e uma tabela de hooks de domínio listados para referência.
   ================================================================ */

interface HookCard {
  name: string;
  signature: string;
  example: string;
  note: string;
}

/* ---- 10.1 — Ambiente ---- */
const ENV_HOOKS: HookCard[] = [
  {
    name: "useMediaQuery",
    signature: "(query: string) => boolean",
    example: `const isWide = useMediaQuery("(min-width: 720px)");`,
    note: "Reativo via matchMedia. Pareia com a escala --bp-* (Foundations II).",
  },
  {
    name: "usePrefersReducedMotion",
    signature: "() => boolean",
    example: `const reduce = usePrefersReducedMotion();
if (!reduce) startAutoPlay();`,
    note: "Wrapper sobre useMediaQuery('(prefers-reduced-motion: reduce)').",
  },
  {
    name: "useWindowSize",
    signature: "() => { width: number; height: number }",
    example: `const { width } = useWindowSize();`,
    note: "Sem debounce embutido — componha com useDebounce se precisar.",
  },
  {
    name: "useIntersectionObserver",
    signature: "(ref, options?) => IntersectionObserverEntry | null",
    example: `const entry = useIntersectionObserver(ref, { threshold: 0.2 });
const isVisible = !!entry?.isIntersecting;`,
    note: "Pré-requisito do <ScrollReveal> (Fase 4.2).",
  },
  {
    name: "useResizeObserver",
    signature: "(ref) => { width, height } | null",
    example: `const size = useResizeObserver(chartRef);`,
    note: "Reativo às dimensões de um elemento. Útil em charts e VirtualList autoHeight.",
  },
];

/* ---- 10.2 — DOM ---- */
const DOM_HOOKS: HookCard[] = [
  {
    name: "useClickOutside",
    signature: "(ref, handler, active = true) => void",
    example: `useClickOutside(panelRef, () => setOpen(false), open);`,
    note: "Cobre mouse e touch. Use em popovers, dropdowns sem backdrop modal.",
  },
  {
    name: "useScrollLock",
    signature: "(active: boolean) => void",
    example: `useScrollLock(isOpen);`,
    note: "Counter interno — suporta múltiplos consumidores empilhados (modal dentro de drawer).",
  },
  {
    name: "useEventListener",
    signature: "(event, handler, target?) => void",
    example: `useEventListener("scroll", () => setY(window.scrollY));`,
    note: "Tipado por overload (window/document/element). Handler estável via ref.",
  },
  {
    name: "useKeyPress",
    signature: "(combo, handler, options?) => void",
    example: `useKeyPress("escape", () => close());
useKeyPress("mod+k", () => openSearch(), { preventDefault: true });`,
    note: "Parser próprio: mod adapta-se a cmd/ctrl conforme o SO.",
  },
];

/* ---- 10.3 — Estado ---- */
const STATE_HOOKS: HookCard[] = [
  {
    name: "useLocalStorage",
    signature: "<T>(key, default) => [T, (val) => void]",
    example: `const [theme, setTheme] = useLocalStorage("atelier:theme", "light");`,
    note: "API igual useState. Sync entre abas. Quota errors silenciosos.",
  },
  {
    name: "useDebounce",
    signature: "<T>(value, delay = 300) => T",
    example: `const debounced = useDebounce(query, 300);
useEffect(() => fetchSearch(debounced), [debounced]);`,
    note: "Espera quietude. Para inputs de busca, filtros caros.",
  },
  {
    name: "useThrottle",
    signature: "<T>(value, delay = 300) => T",
    example: `const throttled = useThrottle(scrollY, 200);`,
    note: "Throughput máximo. Para scroll handlers, mouse tracking.",
  },
  {
    name: "useControllableState",
    signature: "<T>({ value, defaultValue, onChange }) => [T, setter]",
    example: `const [open, setOpen] = useControllableState({
  value: openProp,
  defaultValue: defaultOpenProp ?? false,
  onChange: onOpenChange,
});`,
    note: "Resolve o padrão controlled-vs-uncontrolled. onChange dispara em ambos.",
  },
  {
    name: "usePrevious",
    signature: "<T>(value) => T | undefined",
    example: `const prev = usePrevious(count);
if (prev !== undefined && count > prev) playSound();`,
    note: "Valor do render anterior. Útil pra animar transições.",
  },
  {
    name: "useUpdateEffect",
    signature: "(effect, deps?) => void",
    example: `useUpdateEffect(() => {
  toast(\`Tema mudou para \${theme}\`);
}, [theme]);`,
    note: "Pula a primeira execução. Equivalente ao componentDidUpdate.",
  },
];

interface DomainRow {
  name: string;
  from: string;
  purpose: string;
}

interface DiscoveryRow {
  p: string;
  h: string;
}

function HookGrid({ items, sample }: { items: HookCard[]; sample: { signature: string; example: string } }) {
  return (
    <div className="hooks-grid">
      {items.map((h) => (
        <article key={h.name} className="hooks-card">
          <header className="hooks-card-head">
            <h3 className="hooks-card-name">{h.name}</h3>
            <p className="hooks-card-note">{h.note}</p>
          </header>
          <div className="hooks-card-block">
            <div className="hooks-card-block-label">{sample.signature}</div>
            <pre className="hooks-card-pre">
              <code>{h.signature}</code>
            </pre>
          </div>
          <div className="hooks-card-block">
            <div className="hooks-card-block-label">{sample.example}</div>
            <pre className="hooks-card-pre">
              <code>{h.example}</code>
            </pre>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function Hooks() {
  const { t, tr, raw } = useT();
  const sample = {
    signature: t("pages.hooks.sample.signature"),
    example: t("pages.hooks.sample.example"),
  };

  const discovery = (raw("pages.hooks.discovery.rows") as DiscoveryRow[]) || [];
  const domain = (raw("pages.hooks.domain.rows") as DomainRow[]) || [];

  return (
    <>
      <PageHead
        lead={t("pages.hooks.lead")}
        title={
          <>
            {tr("pages.hooks.titleA")}
            <em>{t("pages.hooks.titleB")}</em>
          </>
        }
        metaLabel={t("pages.hooks.metaLabel")}
        meta={t("pages.hooks.meta")}
        intro={tr("pages.hooks.intro")}
      />

      {/* i. Hooks de ambiente */}
      <Section
        num="i"
        title={<>{t("pages.hooks.env.title")}</>}
        kicker={t("pages.hooks.env.kicker")}
      >
        <p className="section-desc">{t("pages.hooks.env.desc")}</p>
        <HookGrid items={ENV_HOOKS} sample={sample} />
      </Section>

      {/* ii. Hooks de DOM */}
      <Section
        num="ii"
        title={<>{t("pages.hooks.dom.title")}</>}
        kicker={t("pages.hooks.dom.kicker")}
      >
        <p className="section-desc">{t("pages.hooks.dom.desc")}</p>
        <HookGrid items={DOM_HOOKS} sample={sample} />
      </Section>

      {/* iii. Hooks de estado */}
      <Section
        num="iii"
        title={<>{t("pages.hooks.state.title")}</>}
        kicker={t("pages.hooks.state.kicker")}
      >
        <p className="section-desc">{t("pages.hooks.state.desc")}</p>
        <HookGrid items={STATE_HOOKS} sample={sample} />
      </Section>

      {/* iv. Discovery — qual hook usar quando */}
      <Section
        num="iv"
        title={<>{t("pages.hooks.discovery.title")}</>}
        kicker={t("pages.hooks.discovery.kicker")}
      >
        <p className="section-desc">{t("pages.hooks.discovery.desc")}</p>
        <div className="hooks-table-wrap">
          <table className="hooks-table">
            <tbody>
              {discovery.map((row, i) => (
                <tr key={i}>
                  <td className="hooks-table-problem">{row.p}</td>
                  <td className="hooks-table-hook">
                    <code>{row.h}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* v. Hooks de domínio */}
      <Section
        num="v"
        title={<>{t("pages.hooks.domain.title")}</>}
        kicker={t("pages.hooks.domain.kicker")}
      >
        <p className="section-desc">{t("pages.hooks.domain.desc")}</p>
        <div className="hooks-table-wrap">
          <table className="hooks-table hooks-table--domain">
            <thead>
              <tr>
                <th style={{ width: "26%" }}>hook</th>
                <th style={{ width: "32%" }}>fonte</th>
                <th>função</th>
              </tr>
            </thead>
            <tbody>
              {domain.map((row) => (
                <tr key={row.name}>
                  <td>
                    <code>{row.name}</code>
                  </td>
                  <td>
                    <code className="hooks-table-from">{row.from}</code>
                  </td>
                  <td>{row.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}
