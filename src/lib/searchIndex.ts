import { ROUTES } from "./routes.ts";

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
  { id: "pagination",  label: "Pagination",  route: "pagination",  keywords: ["paginação", "paginar", "next", "prev"] },
  { id: "breadcrumbs", label: "Breadcrumbs", route: "breadcrumbs", keywords: ["trilha", "navegação"] },
  { id: "skeleton",    label: "Skeleton",    route: "skeleton",    keywords: ["loading", "placeholder", "carregar"] },
  { id: "stepper",     label: "Stepper",     route: "stepper",     keywords: ["wizard", "passos", "etapas", "multi-step"] },
  { id: "step",        label: "Step",        route: "stepper",     keywords: ["passo", "etapa"] },
  { id: "popover",     label: "Popover",     route: "popover",     keywords: ["overlay", "tooltip", "balão", "anchor"] },
  { id: "dropdown",    label: "DropdownMenu", route: "dropdown-menu", keywords: ["menu", "ações", "dropdown", "popup"] },
  { id: "ctxmenu",     label: "ContextMenu", route: "context-menu", keywords: ["menu", "right-click", "clique direito", "contextual"] },
  { id: "drawer",      label: "Drawer",      route: "drawer",      keywords: ["sheet", "lateral", "side panel", "modal"] },
  { id: "toaster",     label: "Toaster",     route: "toaster",     keywords: ["toast", "notification", "notificação", "queue", "snackbar"] },
  { id: "combobox",    label: "Combobox",    route: "combobox",    keywords: ["autocomplete", "select", "search", "busca", "tags"] },
  { id: "slider",      label: "RangeSlider", route: "slider",      keywords: ["slider", "range", "intervalo", "deslizar", "knob"] },
  { id: "calendar",    label: "Calendar",    route: "calendar",    keywords: ["data", "date", "mês", "month", "agenda"] },
  { id: "datePicker",  label: "DatePicker",  route: "date-picker", keywords: ["data", "date input", "range", "intervalo", "calendário"] },
  { id: "carousel",    label: "Carousel",    route: "carousel",    keywords: ["slide", "slider", "slides", "swipe", "galeria"] },
  { id: "tree",        label: "TreeView",    route: "tree",        keywords: ["árvore", "tree", "hierárquico", "explorer", "outline"] },
  { id: "resizable",   label: "ResizablePanels", route: "resizable", keywords: ["split", "panel", "divisor", "resize", "redimensionar"] },
  { id: "color-picker", label: "ColorPicker", route: "color-picker", keywords: ["cor", "color", "hex", "rgb", "hsv", "picker"] },
  { id: "markdown",    label: "MarkdownViewer", route: "markdown",  keywords: ["markdown", "md", "render", "viewer", "texto"] },
  { id: "shortcuts",   label: "Shortcuts",   route: "shortcuts",   keywords: ["keyboard", "atalhos", "teclado", "hotkey", "kbd"] },
  { id: "virtual-list", label: "VirtualList", route: "virtual-list", keywords: ["virtual", "windowing", "performance", "lista", "scroll", "10000"] },
  { id: "drag-drop",   label: "Drag & Drop", route: "drag-drop",   keywords: ["drag", "drop", "sortable", "reorder", "kanban", "arrastar"] },
  { id: "a11y",          label: "Accessibility", route: "accessibility", keywords: ["a11y", "acessibilidade", "wcag", "aria", "atalhos", "keyboard", "skip link"] },
  { id: "skip-link",     label: "Skip link",     route: "accessibility", keywords: ["skip", "pular", "teclado"] },
  { id: "keyboard-map",  label: "Keyboard map",  route: "accessibility", keywords: ["atalhos", "teclado", "shortcut"] },
  { id: "roadmap",       label: "Roadmap",       route: "roadmap",       keywords: ["roadmap", "fases", "phases", "motion", "rtl", "tokens export", "changelog", "próximos passos", "next steps", "planejamento"] },
  { id: "data-table",    label: "DataTable",     route: "data-table",    keywords: ["table", "tabela", "grid", "sort", "ordenar", "filter", "filtro", "pagination", "paginação", "selection", "seleção", "virtualize", "rows", "linhas"] },
  { id: "data-table-header", label: "DataTableHeader", route: "data-table", keywords: ["thead", "header", "ordenar", "filtros"] },
  { id: "data-table-body",   label: "DataTableBody",   route: "data-table", keywords: ["tbody", "rows", "linhas"] },
  { id: "data-table-pagination", label: "DataTablePagination", route: "data-table", keywords: ["paginação", "pagination", "page size"] },
  { id: "timeline",      label: "Timeline",      route: "timeline",      keywords: ["timeline", "linha do tempo", "histórico", "events", "agora", "now", "vertical", "horizontal", "marker"] },
  { id: "tag-input",     label: "TagInput",      route: "tag-input",     keywords: ["tags", "chips", "multi", "input", "etiquetas", "validate", "separator", "email"] },
  { id: "tag",           label: "Tag",           route: "tag-input",     keywords: ["chip", "label", "remover"] },
  { id: "kbd",           label: "KBD",           route: "kbd",           keywords: ["keyboard", "kbd", "tecla", "atalho", "shortcut", "key", "combo"] },
  { id: "kbd-combo",     label: "KbdCombo",      route: "kbd",           keywords: ["combo", "atalho", "shortcut", "cmd", "ctrl"] },
  { id: "inline-code",   label: "InlineCode",    route: "kbd",           keywords: ["code", "código", "inline", "mono", "monospace"] },
  { id: "voice",         label: "Voice & tone",  route: "voice",         keywords: ["voz", "voice", "tom", "tone", "writing", "escrita", "microcopy", "vocabulário", "vocabulary", "person", "pessoa", "estilo editorial"] },
  { id: "tone",          label: "Tone of voice", route: "voice",         keywords: ["tom", "tone", "voz", "voice", "matriz", "matrix", "context", "contexto"] },
  { id: "microcopy",     label: "Microcopy",     route: "voice",         keywords: ["microcopy", "ui copy", "button", "placeholder", "label", "hint", "error", "empty state"] },
  { id: "vocabulary",    label: "Vocabulary",    route: "voice",         keywords: ["vocabulário", "vocabulary", "palavras", "words", "preferimos", "evitamos"] },
  { id: "capitalization",label: "Capitalization",route: "voice",         keywords: ["capitalização", "capitalization", "sentence case", "title case", "caixa"] },
  { id: "punctuation",   label: "Punctuation",   route: "voice",         keywords: ["pontuação", "punctuation", "aspas", "quotes", "em-dash", "ellipsis", "ampersand", "nbsp"] },
  { id: "elevation",     label: "Elevation",     route: "elevation",     keywords: ["elevation", "elevação", "shadow", "sombra", "flat", "box-shadow", "depth", "profundidade"] },
  { id: "shadow",        label: "Shadow scale",  route: "elevation",     keywords: ["shadow", "sombra", "--shadow-sm", "--shadow-md", "--shadow-lg", "elevation"] },
  { id: "radius",        label: "Radius",        route: "radius",        keywords: ["radius", "raio", "cantos", "corners", "border-radius", "rounded", "arredondado", "ângulos retos", "sharp"] },
  { id: "z-index",       label: "Z-Index · Layers", route: "z-index",    keywords: ["z-index", "stacking", "layers", "camadas", "overlay", "modal", "dropdown", "toast", "palette"] },
  { id: "layering",      label: "Layering",      route: "z-index",       keywords: ["layering", "camadas", "stacking", "overlay", "z"] },
  { id: "breakpoints",   label: "Breakpoints",   route: "breakpoints",   keywords: ["breakpoint", "responsivo", "responsive", "media query", "viewport", "mobile", "tablet", "desktop", "--bp-sm", "--bp-md", "--bp-lg"] },
  { id: "responsive",    label: "Responsive",    route: "breakpoints",   keywords: ["responsive", "responsivo", "mobile", "tablet", "desktop", "viewport", "media query"] },
  { id: "density",       label: "Density",       route: "density",       keywords: ["density", "densidade", "compact", "comfortable", "spacious", "compacto", "espaçoso", "padding", "gap"] },
  /* ---- Hooks (fase 10) ---- */
  { id: "hooks-page",    label: "Hooks · index",       route: "hooks", keywords: ["hooks", "hook", "useEffect", "useState", "react", "utility", "barrel", "fase 10", "phase 10"] },
  { id: "useMediaQuery", label: "useMediaQuery",       route: "hooks", keywords: ["matchMedia", "media query", "breakpoint", "responsive", "reactive", "viewport"] },
  { id: "usePrefersReducedMotion", label: "usePrefersReducedMotion", route: "hooks", keywords: ["motion", "reduced motion", "a11y", "animation", "prefers-reduced-motion"] },
  { id: "useWindowSize", label: "useWindowSize",       route: "hooks", keywords: ["window", "viewport", "resize", "innerWidth", "innerHeight"] },
  { id: "useIntersectionObserver", label: "useIntersectionObserver", route: "hooks", keywords: ["intersection observer", "scroll reveal", "lazy load", "in view", "visibility"] },
  { id: "useResizeObserver", label: "useResizeObserver", route: "hooks", keywords: ["resize observer", "container", "responsive", "auto height", "dimensions"] },
  { id: "useClickOutside", label: "useClickOutside",   route: "hooks", keywords: ["click outside", "outside", "popover", "dropdown", "dismiss", "fora"] },
  { id: "useScrollLock", label: "useScrollLock",       route: "hooks", keywords: ["scroll lock", "body scroll", "modal", "drawer", "dialog", "trava"] },
  { id: "useEventListener", label: "useEventListener", route: "hooks", keywords: ["event", "listener", "addEventListener", "typed", "tipado"] },
  { id: "useKeyPress",   label: "useKeyPress",         route: "hooks", keywords: ["keyboard", "shortcut", "atalho", "key", "tecla", "escape", "enter", "cmd", "ctrl", "mod"] },
  { id: "useLocalStorage", label: "useLocalStorage",   route: "hooks", keywords: ["localStorage", "persist", "persistir", "storage", "tabs", "sync"] },
  { id: "useDebounce",   label: "useDebounce",         route: "hooks", keywords: ["debounce", "delay", "input", "search", "busca", "atraso"] },
  { id: "useThrottle",   label: "useThrottle",         route: "hooks", keywords: ["throttle", "rate limit", "scroll", "performance", "frequência"] },
  { id: "useControllableState", label: "useControllableState", route: "hooks", keywords: ["controlled", "uncontrolled", "controlável", "value", "defaultValue", "onChange"] },
  { id: "usePrevious",   label: "usePrevious",         route: "hooks", keywords: ["previous", "anterior", "prev", "compare"] },
  { id: "useUpdateEffect", label: "useUpdateEffect",   route: "hooks", keywords: ["update effect", "componentDidUpdate", "skip mount", "pula primeira"] },
  /* ---- Changelog + Tokens (fase 7) ---- */
  { id: "changelog",     label: "Changelog",        route: "changelog", keywords: ["changelog", "release", "versão", "version", "histórico", "history", "keep a changelog", "semver"] },
  { id: "tokens-page",   label: "Tokens · index",   route: "tokens",    keywords: ["tokens", "design tokens", "inventory", "css var", "swatch", "export", "DTCG", "W3C", "JSON", "CSS", "TypeScript"] },
  { id: "tokens-export", label: "Tokens · export",  route: "tokens",    keywords: ["export", "download", "tokens.json", "theme.css", "theme.ts", "DTCG"] },
  { id: "studio-export", label: "Studio · export multiplo", route: "create", keywords: ["export", "studio", "css", "json", "ts", "tokens", "DTCG", "theme"] },
  /* ---- Motion (fase 4) ---- */
  { id: "motion",         label: "Motion",          route: "motion", keywords: ["motion", "movimento", "animation", "transition", "ease", "duration", "fase 4"] },
  { id: "transition",     label: "Transition",      route: "motion", keywords: ["transition", "enter", "exit", "mount", "unmount", "css transition"] },
  { id: "fade",           label: "Fade",            route: "motion", keywords: ["fade", "opacity", "in", "out"] },
  { id: "slide",          label: "Slide",           route: "motion", keywords: ["slide", "translate", "direction", "from"] },
  { id: "scale",          label: "Scale",           route: "motion", keywords: ["scale", "zoom", "transform"] },
  { id: "collapse",       label: "Collapse",        route: "motion", keywords: ["collapse", "expand", "height", "auto", "accordion", "disclosure"] },
  { id: "scroll-reveal",  label: "ScrollReveal",    route: "motion", keywords: ["scroll reveal", "intersection", "fade in", "lazy reveal", "in view"] },
  { id: "page-transition",label: "Page transition", route: "motion", keywords: ["page transition", "usePageTransition", "fade", "slide-up", "router"] },
  { id: "easings",        label: "Easings (--ease-*)", route: "motion", keywords: ["ease", "easing", "cubic-bezier", "spring", "out-expo"] },
  /* ---- Focus hooks + RTL + a11y (fase 6) ---- */
  { id: "useFocusTrap",   label: "useFocusTrap",   route: "hooks", keywords: ["focus trap", "trap", "modal", "dialog", "drawer", "tab loop", "a11y", "fase 6.2"] },
  { id: "useFocusReturn", label: "useFocusReturn", route: "hooks", keywords: ["focus return", "restore focus", "modal close", "a11y", "fase 6.2"] },
  { id: "useRovingTabIndex", label: "useRovingTabIndex", route: "hooks", keywords: ["roving tabindex", "arrow keys", "list navigation", "tablist", "tree", "carousel", "a11y", "fase 6.2"] },
  { id: "rtl",            label: "RTL · Direction", route: "accessibility", keywords: ["rtl", "right to left", "direction", "dir", "ar", "he", "arabic", "hebrew", "i18n"] },
  { id: "contrast-checker", label: "Contrast checker (Studio)", route: "create", keywords: ["contrast", "wcag", "AA", "AAA", "accessibility", "studio"] },
  /* ---- Patterns transversais (fase 11) ---- */
  { id: "loading-states",    label: "Loading states",    route: "loading-states",     keywords: ["loading", "skeleton", "spinner", "progress", "empty", "wait", "espera"] },
  { id: "error-handling",    label: "Error handling",    route: "error-handling",     keywords: ["error", "erro", "boundary", "fallback", "retry", "exception"] },
  { id: "forms-patterns",    label: "Forms patterns",    route: "forms-patterns",     keywords: ["form", "formulário", "validation", "validação", "submit", "async", "onBlur"] },
  { id: "destructive",       label: "Destructive actions",route: "destructive-actions",keywords: ["destructive", "destrutivo", "delete", "undo", "confirm", "irreversible"] },
  { id: "onboarding",        label: "Onboarding",        route: "onboarding",         keywords: ["onboarding", "tour", "coachmark", "first-run", "guide"] },
  { id: "dark-mode",         label: "Dark mode",         route: "dark-mode",          keywords: ["dark", "escuro", "theme", "tema", "palette", "contrast"] },
  { id: "print",             label: "Print styles",      route: "print",              keywords: ["print", "impressão", "@media print", "paper", "papel"] },
  { id: "i18n-patterns",     label: "i18n patterns",     route: "i18n-patterns",      keywords: ["i18n", "intl", "plural", "format", "locale", "currency", "date"] },
  { id: "install",           label: "Install",           route: "install",            keywords: ["install", "setup", "npm", "peer deps", "começar"] },
  { id: "api-reference",     label: "API reference",     route: "api-reference",      keywords: ["api", "exports", "componentes", "mapa", "reference"] },
  { id: "browser-support",   label: "Browser support",   route: "browser-support",    keywords: ["browser", "navegador", "compatibility", "polyfill", "evergreen", "safari", "chrome", "firefox"] },
  { id: "performance",       label: "Performance",       route: "performance",        keywords: ["performance", "bundle", "budget", "code split", "lazy", "tree shake"] },
  /* ---- Recipes + sandbox + CLI (fase 13) ---- */
  { id: "recipes",           label: "Recipes",           route: "recipes",            keywords: ["recipes", "receitas", "examples", "templates", "sandbox", "live", "stackblitz", "codesandbox", "compositions"] },
  { id: "recipe-login",      label: "Recipe · Login",    route: "recipes",            keywords: ["login", "auth", "form", "signin", "recipe"] },
  { id: "recipe-pricing",    label: "Recipe · Pricing",  route: "recipes",            keywords: ["pricing", "tier", "plan", "marketing", "recipe"] },
  { id: "recipe-comments",   label: "Recipe · Comments", route: "recipes",            keywords: ["comment", "thread", "social", "discussion", "recipe"] },
  { id: "recipe-onboarding", label: "Recipe · Onboarding stepper", route: "recipes",  keywords: ["onboarding", "stepper", "wizard", "multi-step", "recipe"] },
  { id: "live-example",      label: "Live editor (Example)", route: "code",            keywords: ["example", "live", "editor", "edit", "inline", "snippet"] },
  { id: "stackblitz",        label: "Open in StackBlitz",route: "recipes",            keywords: ["stackblitz", "sandbox", "codesandbox", "open", "external"] },
  { id: "atelier-cli",       label: "atelier-cli (npx atelier)", route: "install",     keywords: ["cli", "npx", "shadcn", "add", "init", "registry"] },
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
export function buildSearchIndex(t: (k: string) => any): any[] {
  const items: any[] = [];

  // 1) Páginas
  ROUTES.forEach((group: any) => {
    group.items.forEach((item: any) => {
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
  COMPONENTS.forEach((c: any) => {
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
  TOKENS.forEach((tk: any) => {
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
function normalize(s: any): string {
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
function scoreMatch(item: any, q: string): number {
  const label = normalize(item.label);
  const group = normalize(item.group || "");
  const sub = normalize(item.sub || "");
  const kws = (item.keywords || []).map(normalize);

  if (label === q) return 200;
  if (label.startsWith(q)) return 100;
  if (label.includes(q)) return 60;
  if (sub.includes(q)) return 40;
  if (kws.some((k: any) => k.includes(q))) return 40;
  if (group.includes(q)) return 20;
  return 0;
}

export function searchIndex(items: any[], query: string): any[] {
  const q = normalize(query);
  if (!q) {
    // Sem query → mostra páginas (top 16) ordenadas pela "n" da rota
    return items
      .filter((i: any) => i.type === "page")
      .sort((a: any, b: any) => String(a.n).localeCompare(String(b.n)))
      .slice(0, 16);
  }
  return items
    .map((it: any) => ({ it, score: scoreMatch(it, q) }))
    .filter(({ score }) => score > 0)
    .sort((a: any, b: any) => b.score - a.score)
    .slice(0, 30)
    .map(({ it }) => it);
}
