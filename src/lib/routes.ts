/* Navigation map — labels are resolved via i18n dictionary
   (nav.items.<id> and nav.groups.<groupKey>). */

export interface RouteItem {
  id: string;
  n: string;
  route?: string;
  isNew?: boolean;
  /** Marca a rota como "ferramenta": fica fora da paginação editorial
      (prev/next no rodapé) e da numeração 00–NN. Não implica layout
      fluido — para isso, use `fluid: true`. */
  tool?: boolean;
  /** Quebra o max-width editorial e ocupa a largura total do main.
      Use para ferramentas visuais como o Studio (/create), onde o
      conteúdo precisa de toda a área. Páginas de doc (mesmo as
      `tool: true` como /roadmap) NÃO devem usar fluid. */
  fluid?: boolean;
}
export interface RouteGroup {
  groupKey: string;
  items: RouteItem[];
}

export const ROUTES: RouteGroup[] = [
  {
    groupKey: "start",
    items: [
      { id: "overview", n: "00" },
      { id: "principles", n: "01" },
    ],
  },
  {
    groupKey: "foundations",
    items: [
      { id: "colors", n: "02" },
      { id: "typography", n: "03" },
      { id: "voice", n: "04" },
      { id: "spacing", n: "05" },
      { id: "icons", n: "06" },
      { id: "elevation", n: "07" },
      { id: "radius", n: "08" },
      { id: "zIndex", n: "09", route: "z-index" },
      { id: "breakpoints", n: "10" },
      { id: "density", n: "11" },
      { id: "motion", n: "12", isNew: true },
    ],
  },
  {
    groupKey: "components",
    items: [
      { id: "buttons", n: "13" },
      { id: "inputs", n: "14" },
      { id: "controls", n: "15" },
      { id: "badges", n: "16" },
      { id: "avatars", n: "17" },
      { id: "alerts", n: "18" },
      { id: "cards", n: "19" },
      { id: "tabs", n: "20" },
      { id: "tables", n: "21" },
      { id: "charts", n: "22" },
      { id: "overlays", n: "23" },
      { id: "feedback", n: "24" },
      { id: "dropzone", n: "25" },
      { id: "pagination", n: "26" },
      { id: "breadcrumbs", n: "27" },
      { id: "skeleton", n: "28" },
      { id: "dataTable", n: "29", route: "data-table" },
      { id: "timeline", n: "30" },
      { id: "tagInput", n: "31", route: "tag-input" },
    ],
  },
  {
    groupKey: "advanced",
    items: [
      { id: "popover", n: "32" },
      { id: "dropdownMenu", n: "33", route: "dropdown-menu" },
      { id: "contextMenu", n: "34", route: "context-menu" },
      { id: "drawer", n: "35" },
      { id: "toaster", n: "36" },
      { id: "combobox", n: "37" },
      { id: "slider", n: "38" },
      { id: "calendar", n: "39" },
      { id: "datePicker", n: "40", route: "date-picker" },
      { id: "carousel", n: "41" },
      { id: "tree", n: "42" },
      { id: "resizable", n: "43" },
      { id: "colorPicker", n: "44", route: "color-picker" },
      { id: "markdown", n: "45" },
      { id: "shortcuts", n: "46" },
      { id: "virtualList", n: "47", route: "virtual-list" },
      { id: "dragDrop", n: "48", route: "drag-drop" },
    ],
  },
  {
    groupKey: "patterns",
    items: [
      { id: "forms", n: "49" },
      { id: "stepper", n: "50" },
      { id: "emptyStates", n: "51", route: "empty-states" },
      { id: "sidebar", n: "52" },
      { id: "navbar", n: "53" },
    ],
  },
  {
    groupKey: "reference",
    items: [
      { id: "accessibility", n: "54" },
      { id: "code", n: "55" },
      { id: "kbd", n: "56" },
      { id: "hooks", n: "57" },
      { id: "changelog", n: "58" },
      { id: "tokens", n: "59" },
      { id: "loadingStates",   n: "60", route: "loading-states",     isNew: true },
      { id: "errorHandling",   n: "61", route: "error-handling",     isNew: true },
      { id: "formsPatterns",   n: "62", route: "forms-patterns",     isNew: true },
      { id: "destructive",     n: "63", route: "destructive-actions", isNew: true },
      { id: "onboarding",      n: "64", isNew: true },
      { id: "darkMode",        n: "65", route: "dark-mode",          isNew: true },
      { id: "print",           n: "66", isNew: true },
      { id: "i18nPatterns",    n: "67", route: "i18n-patterns",      isNew: true },
      { id: "install",         n: "68", isNew: true },
      { id: "apiReference",    n: "69", route: "api-reference",      isNew: true },
      { id: "browserSupport",  n: "70", route: "browser-support",    isNew: true },
      { id: "performance",     n: "71", isNew: true },
      { id: "recipes",         n: "72", isNew: true },
    ],
  },
  {
    groupKey: "tools",
    // `tool: true` marca o item como ferramenta — fica fora da
    // numeração editorial (00-22) e da paginação prev/next.
    // Glifos no lugar do número reforçam a identidade de "lugar
    // à parte" do manual.
    items: [
      { id: "create", n: "✦", tool: true, fluid: true },
      { id: "roadmap", n: "❖", tool: true },
    ],
  },
];

/* All route ids (url slugs). Uses `route` override when it differs from `id`. */
export const ALL_ROUTE_IDS = ROUTES.flatMap((g: any) =>
  g.items.map((i: any) => i.route || i.id)
);

/* Map from id → route slug */
export const ROUTE_BY_ID = Object.fromEntries(
  ROUTES.flatMap((g: any) => g.items.map((i: any) => [i.id, i.route || i.id]))
);

/* Flattened reading order (used for prev/next pagination at the foot of
   each page). Each entry carries its slug, id, ordinal (`n`) and group.
   Items marked `tool: true` (eg. Create) are excluded — they are
   self-contained tools, not chapters in the manual. */
export const FLAT_ROUTES = ROUTES.flatMap((g: any) =>
  g.items
    .filter((i: any) => !i.tool)
    .map((i: any) => ({
      id: i.id,
      n: i.n,
      slug: i.route || i.id,
      groupKey: g.groupKey,
    }))
);

/** Slugs that should NOT render the global PageNav at the foot. */
export const TOOL_ROUTE_IDS = new Set<string>(
  ROUTES.flatMap((g: any) =>
    g.items.filter((i: any) => i.tool).map((i: any) => i.route || i.id)
  )
);

/** Slugs que renderizam em layout fluido (sem max-width editorial).
    Usado pelo Studio (/create); páginas de doc — mesmo as `tool:true` —
    ficam fora deste set para preservar o bloco central de leitura. */
export const FLUID_ROUTE_IDS = new Set<string>(
  ROUTES.flatMap((g: any) =>
    g.items.filter((i: any) => i.fluid).map((i: any) => i.route || i.id)
  )
);

export function findFlatIndex(slug: string): number {
  return FLAT_ROUTES.findIndex((r) => r.slug === slug);
}
