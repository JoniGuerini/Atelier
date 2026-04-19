/* Navigation map — labels are resolved via i18n dictionary
   (nav.items.<id> and nav.groups.<groupKey>). */

export const ROUTES = [
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
      { id: "spacing", n: "04" },
      { id: "icons", n: "05" },
    ],
  },
  {
    groupKey: "components",
    items: [
      { id: "buttons", n: "06" },
      { id: "inputs", n: "07" },
      { id: "controls", n: "08" },
      { id: "badges", n: "09" },
      { id: "avatars", n: "10" },
      { id: "alerts", n: "11" },
      { id: "cards", n: "12" },
      { id: "tabs", n: "13" },
      { id: "tables", n: "14" },
      { id: "charts", n: "15" },
      { id: "overlays", n: "16" },
      { id: "feedback", n: "17" },
      { id: "dropzone", n: "18" },
      { id: "pagination", n: "19", isNew: true },
      { id: "breadcrumbs", n: "20", isNew: true },
      { id: "skeleton", n: "21", isNew: true },
    ],
  },
  {
    groupKey: "patterns",
    items: [
      { id: "forms", n: "22" },
      { id: "stepper", n: "23", isNew: true },
      { id: "emptyStates", n: "24", route: "empty-states" },
      { id: "sidebar", n: "25" },
      { id: "navbar", n: "26" },
    ],
  },
  {
    groupKey: "reference",
    items: [{ id: "code", n: "27" }],
  },
  {
    groupKey: "studio",
    // `tool: true` marca o item como ferramenta — fica fora da
    // numeração editorial (00-22) e da paginação prev/next.
    // O glifo "✦" no lugar do número reforça a identidade de "lugar
    // à parte" do manual.
    items: [{ id: "create", n: "✦", tool: true }],
  },
];

/* All route ids (url slugs). Uses `route` override when it differs from `id`. */
export const ALL_ROUTE_IDS = ROUTES.flatMap((g) =>
  g.items.map((i) => i.route || i.id)
);

/* Map from id → route slug */
export const ROUTE_BY_ID = Object.fromEntries(
  ROUTES.flatMap((g) => g.items.map((i) => [i.id, i.route || i.id]))
);

/* Flattened reading order (used for prev/next pagination at the foot of
   each page). Each entry carries its slug, id, ordinal (`n`) and group.
   Items marked `tool: true` (eg. Create) are excluded — they are
   self-contained tools, not chapters in the manual. */
export const FLAT_ROUTES = ROUTES.flatMap((g) =>
  g.items
    .filter((i) => !i.tool)
    .map((i) => ({
      id: i.id,
      n: i.n,
      slug: i.route || i.id,
      groupKey: g.groupKey,
    }))
);

/** Slugs that should NOT render the global PageNav at the foot. */
export const TOOL_ROUTE_IDS = new Set(
  ROUTES.flatMap((g) =>
    g.items.filter((i) => i.tool).map((i) => i.route || i.id)
  )
);

export function findFlatIndex(slug) {
  return FLAT_ROUTES.findIndex((r) => r.slug === slug);
}
