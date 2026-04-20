# Changelog

Todas as mudanças notáveis do Atelier — formato [Keep a Changelog](https://keepachangelog.com/), versionamento [SemVer](https://semver.org/).

---

## [0.5] — Abril 2026

### Added — Theme tooling & DX

- **Studio · Export multiplo** — botão Export agora gera 3 formatos: `theme.css` (cola direto em `:root`), `tokens.json` (W3C Design Tokens / DTCG), `theme.ts` (objeto tipado pra apps consumidoras). UI com tabs editorial.
- **`src/lib/tokens.ts`** — inventory central com 88 tokens públicos categorizados (color, ink, rule, accent, semantic, type, spacing, motion, radius, shadow, z-index, breakpoint, opacity, aspect, density). Serve de fonte única para `/tokens` (visualização) e Studio (export).
- **Página `/changelog`** — esta própria página. Estréia oficial do `MarkdownViewer` em produção, lendo este arquivo em build-time via `?raw` do Vite.
- **Página `/tokens`** — visualização filtrável de todas as escalas, com swatch/preview, valores light vs dark side-by-side, copy-to-clipboard por token.

### Changed

- `studioTokens.ts` ganha `themeToJson` e `themeToTs` ao lado do `themeToCss` existente.
- `Create.tsx` consome o `downloadText` de `lib/tokens.ts` (helper genérico) — função local removida.

### Roadmap

- Sub-fases entregues: **7.1**, **7.3**, **7.4**.

---

## [0.4] — Abril 2026

### Added — Code splitting (8.1)

- **57 páginas em `React.lazy()`** — cada uma vira chunk próprio carregado on-demand. Overview mantido estático.
- **`Suspense` boundary** com `PageFallback` editorial (replica PageHead com Skeleton, evita layout shift).
- **`vite.config.js` com `manualChunks`** granular: `react`, `vendor`, `ds-core`, `ds-charts`, `ds-datatable`, `ds-dragdrop`, `ds-markdown`, `ds-colorpicker`, `ds-datepicker`. `chunkSizeWarningLimit` reduzido de 500 → 250 KB.
- **i18n lazy por locale** — refactor de `LocaleProvider`. Cada dicionário (~130 KB minified) virou chunk próprio carregado sob demanda. Cache em memória.

### Performance

- Entry: **922 KB → 24 KB** (−97%).
- First-paint payload (gzipped): **~272 KB → ~165 KB** (−110 KB).
- Maior chunk: 138 KB (react vendor).
- Total: **66 chunks**, nenhum acima de 200 KB minified. ✅

---

## [0.3] — Abril 2026

### Added — Hooks utilitários públicos (Fase 10)

14 hooks novos em `src/lib/hooks/`, exportados via barrel único.

**Ambiente (10.1):**

- `useMediaQuery(query)` — reativo via matchMedia, pareia com `--bp-*`.
- `usePrefersReducedMotion()` — wrapper sobre `useMediaQuery`.
- `useWindowSize()` — `{ width, height }` reativo.
- `useIntersectionObserver(ref, options?)` — pré-requisito de ScrollReveal (4.2).
- `useResizeObserver(ref)` — pré-requisito de VirtualList autoHeight.

**DOM (10.2):**

- `useClickOutside(ref, handler, active?)` — mouse + touch.
- `useScrollLock(active)` — counter empilhável (modal dentro de drawer).
- `useEventListener(event, handler, target?)` — tipado por overload.
- `useKeyPress(combo, handler, options?)` — parser próprio (`mod+k` adapta-se a Mac/PC).

**Estado (10.3):**

- `useLocalStorage(key, default)` — sync entre abas.
- `useDebounce(value, delay)`.
- `useThrottle(value, delay)`.
- `useControllableState({value, defaultValue, onChange})` — resolve controlled-vs-uncontrolled.
- `usePrevious(value)`.
- `useUpdateEffect(fn, deps)` — pula a primeira execução.

### Added — Página `/hooks` (10.4)

- Cards por sub-fase (assinatura + exemplo + nota), matriz de discovery "qual hook usar quando" (15 linhas), tabela dos 10 hooks de domínio para descoberta editorial.

---

## [0.2] — Abril 2026

### Added — Foundations II (Fase 9)

**Escalas estruturais (9.1):**

- `--radius-*` (none/sm/md/lg/full) — ângulos retos como default editorial.
- `--shadow-*` (none/sm/md/lg, light + dark) — flat por padrão.
- `--z-*` (10 camadas nomeadas: base → skip-link).
- `--bp-*` (sm 480 / md 720 / lg 960 / xl 1280 / 2xl 1600).
- `--opacity-*` (5/10/25/50/75/90).
- `--aspect-*` (square / landscape / portrait / ultrawide / golden).
- `--density-*` (pad-x / pad-y / gap / text) + classes `.is-density-compact` / `.is-density-spacious`.

**Páginas conceituais (9.2):**

- `/elevation`, `/radius`, `/z-index`, `/breakpoints`, `/density` — Foundations 07–11.

**Auditoria de uso (9.3):**

- 27 z-index numéricos → `var(--z-*)`. Zero literal restante.
- 32 border-radius literais → `var(--radius-*)`.
- 10 elevations reais → `var(--shadow-*)`. 4 overrides redundantes `[data-theme="dark"]` removidos (token já é tema-aware).
- 28 `@media` pareadas com comentário `/* --bp-X */` ou `/* ~--bp-X */`.

---

## [0.1] — Abril 2026

### Added — Estado inicial

- **Foundations**: Colors, Typography, Voice & tone, Spacing, Icons.
- **Components**: Buttons, Inputs, Controls, Badges, Avatars, Alerts, Cards, Tabs, Tables, Charts, Pagination, Breadcrumbs, Skeleton, Stepper.
- **Advanced**: Popover, DropdownMenu, ContextMenu, Drawer, Toaster, Combobox, RangeSlider, Calendar, DatePicker, Carousel, TreeView, ResizablePanels, ColorPicker, MarkdownViewer, Shortcuts, VirtualList, DragDrop.
- **Patterns**: Forms, EmptyStates, SidebarPage, NavbarPage.
- **Reference**: Accessibility, Code, KBD.
- **Data display heavy (Fase 3)**: DataTable, Timeline, TagInput, KBD primitives.
- **Tools**: Studio (`/create`), Roadmap (`/roadmap`).
- **Princípios codificados**: zero deps de runtime, editorial-first, composable, acessível por padrão, i18n sem dívida, tokens > hardcode, TS estrito gradual, doc = produto.
