/* Presets de avatar do Atelier.
   Cada preset é um SVG inline — sem dependência de assets externos —
   mantendo a paleta e a tipografia do design system via CSS vars. */

/* ---------- Paleta suave dos fundos ---------- */
const SURFACES = [
  "var(--bg-panel)",
  "var(--bg-sunken)",
  "var(--accent-soft)",
  "var(--ok-soft)",
  "var(--warn-soft)",
];

/* ---------- i · Monogramas ----------
   Letras em Fraunces itálico sobre fundos alternados. */
function Monogram({ letter, bg = "var(--bg-panel)", ink = "var(--ink)" }: any) {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <rect width="64" height="64" fill={bg} />
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fontFamily="var(--font-serif)"
        fontStyle="italic"
        fontSize="34"
        fill={ink}
      >
        {letter}
      </text>
    </svg>
  );
}

/* ---------- ii · Geométricos ----------
   Formas abstratas, traço fino, estilo manual. */
function GeoArc() {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <rect width="64" height="64" fill="var(--bg-panel)" />
      <circle cx="32" cy="36" r="18" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M14 32 Q32 18 50 32" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
    </svg>
  );
}

function GeoBars() {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <rect width="64" height="64" fill="var(--bg-sunken)" />
      <rect x="14" y="14" width="36" height="4" fill="var(--ink)" />
      <rect x="14" y="28" width="22" height="4" fill="var(--ink)" />
      <rect x="14" y="42" width="30" height="4" fill="var(--accent)" />
    </svg>
  );
}

function GeoCross() {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <rect width="64" height="64" fill="var(--bg-panel)" />
      <path d="M12 12 L52 52 M52 12 L12 52" stroke="var(--ink)" strokeWidth="1.25" />
      <circle cx="32" cy="32" r="6" fill="var(--accent)" />
    </svg>
  );
}

function GeoMoon() {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <rect width="64" height="64" fill="var(--ink)" />
      <path
        d="M44 18 a16 16 0 1 0 0 28 a12 12 0 0 1 0 -28"
        fill="var(--bg-panel)"
      />
    </svg>
  );
}

/* ---------- iii · Ornamentos tipográficos ---------- */
function Ornament({ glyph, bg = "var(--bg-panel)", ink = "var(--accent)" }: any) {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <rect width="64" height="64" fill={bg} />
      <text
        x="32"
        y="44"
        textAnchor="middle"
        fontFamily="var(--font-serif)"
        fontSize="34"
        fill={ink}
      >
        {glyph}
      </text>
    </svg>
  );
}

/* ---------- Coleção exportada ---------- */
export const AVATAR_PRESETS = [
  { id: "mono-a", label: "A", kind: "monogram", render: () => <Monogram letter="A" bg={SURFACES[0]} /> },
  { id: "mono-c", label: "C", kind: "monogram", render: () => <Monogram letter="C" bg={SURFACES[2]} /> },
  { id: "mono-j", label: "J", kind: "monogram", render: () => <Monogram letter="J" bg={SURFACES[1]} /> },
  { id: "mono-o", label: "O", kind: "monogram", render: () => (
    <Monogram letter="O" bg="var(--ink)" ink="var(--bg-panel)" />
  ) },

  { id: "geo-arc", label: "Arco", kind: "geometric", render: () => <GeoArc /> },
  { id: "geo-bars", label: "Barras", kind: "geometric", render: () => <GeoBars /> },
  { id: "geo-cross", label: "Cruz", kind: "geometric", render: () => <GeoCross /> },
  { id: "geo-moon", label: "Lua", kind: "geometric", render: () => <GeoMoon /> },

  { id: "orn-section", label: "§", kind: "ornament", render: () => <Ornament glyph="§" /> },
  { id: "orn-pilcrow", label: "¶", kind: "ornament", render: () => <Ornament glyph="¶" bg={SURFACES[3]} ink="var(--ink)" /> },
  { id: "orn-fleur", label: "❦", kind: "ornament", render: () => <Ornament glyph="❦" bg={SURFACES[2]} /> },
  { id: "orn-star", label: "✦", kind: "ornament", render: () => (
    <Ornament glyph="✦" bg="var(--ink)" ink="var(--bg-panel)" />
  ) },
];

/* Agrupa presets por categoria (útil para galeria com seções). */
export function groupAvatarPresets(presets = AVATAR_PRESETS) {
  const groups = { monogram: [], geometric: [], ornament: [] };
  for (const p of presets) {
    if (groups[p.kind]) groups[p.kind].push(p);
  }
  return groups;
}
