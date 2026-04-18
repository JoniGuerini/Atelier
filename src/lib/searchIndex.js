import { ROUTES } from "./routes.js";

/* ================================================================
   searchIndex — índice estático para a Search Palette (⌘K).
   ----------------------------------------------------------------
   Indexa três famílias:
     · pages     — todas as rotas do app (do routes.js)
     · components — peças do DS exportadas (lista curada manual)
     · tokens    — variáveis CSS de cor (lista curada do index.css)

   A função `searchIndex(items, query)` faz match insensível a caso
   e a acentos, com pontuação simples (prefix > substring > keyword).
   ================================================================ */

/* ---------- COMPONENTES ----------
   Curados à mão para apontar ao consumidor o que existe no DS,
   incluindo a rota de docs onde o componente é estudado. */
const COMPONENTS = [
  { id: "button",   label: "Button",      route: "buttons",       keywords: ["btn", "ação", "click"] },
  { id: "field",    label: "Field",       route: "inputs",        keywords: ["campo", "form"] },
  { id: "input",    label: "Input",       route: "inputs",        keywords: ["campo", "text"] },
  { id: "textarea", label: "Textarea",    route: "inputs",        keywords: ["campo", "multiline"] },
  { id: "select",   label: "Select",      route: "inputs",        keywords: ["dropdown", "lista"] },
  { id: "checkbox", label: "Checkbox",    route: "controls",      keywords: ["check", "marcar"] },
  { id: "radio",    label: "Radio",       route: "controls",      keywords: ["opção"] },
  { id: "switch",   label: "Switch",      route: "controls",      keywords: ["toggle", "liga"] },
  { id: "badge",    label: "Badge",       route: "badges",        keywords: ["tag", "label", "status"] },
  { id: "avatar",   label: "Avatar",      route: "avatars",       keywords: ["pessoa", "perfil"] },
  { id: "alert",    label: "Alert",       route: "alerts",        keywords: ["aviso", "notice"] },
  { id: "card",     label: "Card",        route: "cards",         keywords: ["bloco", "panel"] },
  { id: "tabs",     label: "Tabs",        route: "tabs",          keywords: ["abas", "navegação"] },
  { id: "table",    label: "Table",       route: "tables",        keywords: ["tabela", "grid", "dados"] },
  { id: "chart",    label: "Chart",       route: "charts",        keywords: ["gráfico", "viz", "dados"] },
  { id: "barchart", label: "BarChart",    route: "charts",        keywords: ["barras", "gráfico"] },
  { id: "linechart",label: "LineChart",   route: "charts",        keywords: ["linha", "gráfico"] },
  { id: "areachart",label: "AreaChart",   route: "charts",        keywords: ["área", "gráfico"] },
  { id: "piechart", label: "PieChart",    route: "charts",        keywords: ["pizza", "gráfico"] },
  { id: "donut",    label: "DonutChart",  route: "charts",        keywords: ["donut", "gráfico"] },
  { id: "radar",    label: "RadarChart",  route: "charts",        keywords: ["radar", "gráfico"] },
  { id: "radial",   label: "RadialChart", route: "charts",        keywords: ["radial", "kpi"] },
  { id: "spark",    label: "Sparkline",   route: "charts",        keywords: ["mini", "métrica"] },
  { id: "dialog",   label: "Dialog",      route: "overlays",      keywords: ["modal", "diálogo"] },
  { id: "modal",    label: "Modal",       route: "overlays",      keywords: ["dialog"] },
  { id: "tooltip",  label: "Tooltip",     route: "overlays",      keywords: ["dica"] },
  { id: "toast",    label: "Toast",       route: "feedback",      keywords: ["notificação"] },
  { id: "progress", label: "Progress",    route: "feedback",      keywords: ["barra", "andamento"] },
  { id: "dropzone", label: "Dropzone",    route: "dropzone",      keywords: ["upload", "arquivo"] },
  { id: "form",     label: "Form",        route: "forms",         keywords: ["formulário"] },
  { id: "empty",    label: "EmptyState",  route: "empty-states",  keywords: ["vazio", "estado"] },
  { id: "sidebar",  label: "Sidebar",     route: "sidebar",       keywords: ["menu", "lateral"] },
  { id: "navbar",   label: "Navbar",      route: "navbar",        keywords: ["menu", "topo"] },
];

/* ---------- TOKENS DE COR ----------
   Lista direta dos tokens cromáticos do :root (index.css).
   Todos apontam para a página /colors onde a paleta vive. */
const TOKENS = [
  { id: "--bg",          family: "Surface" },
  { id: "--bg-panel",    family: "Surface" },
  { id: "--bg-sunken",   family: "Surface" },
  { id: "--bg-inverse",  family: "Surface" },
  { id: "--ink",         family: "Ink" },
  { id: "--ink-soft",    family: "Ink" },
  { id: "--ink-faint",   family: "Ink" },
  { id: "--ink-inverse", family: "Ink" },
  { id: "--accent",      family: "Accent" },
  { id: "--accent-ink",  family: "Accent" },
  { id: "--accent-soft", family: "Accent" },
  { id: "--ok",          family: "Semantic" },
  { id: "--warn",        family: "Semantic" },
  { id: "--danger",      family: "Semantic" },
  { id: "--info",        family: "Semantic" },
  { id: "--rule",        family: "Rule" },
  { id: "--rule-soft",   family: "Rule" },
  { id: "--rule-faint",  family: "Rule" },
];

/* ---------- BUILD INDEX ----------
   Recebe a função `t` (i18n) para resolver labels de páginas. */
export function buildSearchIndex(t) {
  const items = [];

  // 1) Páginas
  ROUTES.forEach((group) => {
    group.items.forEach((item) => {
      const slug = item.route || item.id;
      items.push({
        id: `page:${slug}`,
        type: "page",
        label: t(`nav.items.${item.id}`),
        group: t(`nav.groups.${group.groupKey}`),
        route: slug,
        n: item.n,
      });
    });
  });

  // 2) Componentes
  COMPONENTS.forEach((c) => {
    items.push({
      id: `comp:${c.id}`,
      type: "component",
      label: c.label,
      group: t("search.groups.components"),
      route: c.route,
      keywords: c.keywords,
    });
  });

  // 3) Tokens
  TOKENS.forEach((tk) => {
    items.push({
      id: `token:${tk.id}`,
      type: "token",
      label: tk.id,
      sub: tk.family,
      group: t("search.groups.tokens"),
      route: "colors",
    });
  });

  return items;
}

/* ---------- NORMALIZE ----------
   lowercase + remoção de diacríticos (NFD + strip). */
function normalize(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/* ---------- SEARCH ----------
   Pontuação simples:
     prefixMatch label  → 100
     containsLabel      →  60
     keywordMatch       →  40
     groupContains      →  20 */
function scoreMatch(item, q) {
  const label = normalize(item.label);
  const group = normalize(item.group || "");
  const sub = normalize(item.sub || "");
  const kws = (item.keywords || []).map(normalize);

  if (label === q) return 200;
  if (label.startsWith(q)) return 100;
  if (label.includes(q)) return 60;
  if (sub.includes(q)) return 40;
  if (kws.some((k) => k.includes(q))) return 40;
  if (group.includes(q)) return 20;
  return 0;
}

export function searchIndex(items, query) {
  const q = normalize(query);
  if (!q) {
    // Sem query → mostra páginas (top 16) ordenadas pela "n" da rota
    return items
      .filter((i) => i.type === "page")
      .sort((a, b) => String(a.n).localeCompare(String(b.n)))
      .slice(0, 16);
  }
  return items
    .map((it) => ({ it, score: scoreMatch(it, q) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 30)
    .map(({ it }) => it);
}
