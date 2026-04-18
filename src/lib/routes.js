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
      { id: "overlays", n: "15" },
      { id: "feedback", n: "16" },
      { id: "dropzone", n: "17" },
    ],
  },
  {
    groupKey: "patterns",
    items: [
      { id: "forms", n: "18" },
      { id: "emptyStates", n: "19", route: "empty-states" },
      { id: "sidebar", n: "20" },
      { id: "navbar", n: "21" },
    ],
  },
  {
    groupKey: "reference",
    items: [{ id: "code", n: "22" }],
  },
  {
    groupKey: "studio",
    items: [{ id: "create", n: "23" }],
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
   each page). Each entry carries its slug, id, ordinal (`n`) and group. */
export const FLAT_ROUTES = ROUTES.flatMap((g) =>
  g.items.map((i) => ({
    id: i.id,
    n: i.n,
    slug: i.route || i.id,
    groupKey: g.groupKey,
  }))
);

export function findFlatIndex(slug) {
  return FLAT_ROUTES.findIndex((r) => r.slug === slug);
}
