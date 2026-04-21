# Changelog

Todas as mudanças notáveis do Atelier — formato [Keep a Changelog](https://keepachangelog.com/), versionamento [SemVer](https://semver.org/).

---

## [0.17] — Abril 2026

### Added — Componentes long-tail · 15.4 (App shell)

- **`NotificationBell`**, **`InboxPanel`**, **`InboxHeader`**, **`InboxItem`**, **`InboxFooter`** — composição com **`Popover`** para centro de notificações.
- **`CommentThread`** + **`Comment`** — feed de discussão / anotações (autor, hora, corpo).
- **`Snackbar`** — feedback **ancorado** em `anchorRef` (distinto do **Toaster** global); ação opcional e auto-dismiss.
- **`FileUploadQueue`** + **`FileUploadQueueItemRow`** — fila controlada com preview, progresso, estados, **retry** e remover; tipos em **`types.ts`** (`FileUploadQueueItem`).
- **Página `#/app-shell`** (Padrão · 83) — rotas, `searchIndex`, i18n PT+EN, **`CompositionSection`**, estilos em **`index.css`**.
- **`registry.json`** — 6 entradas novas (NotificationBell … FileUploadQueue).

### Removed

- **`Coachmark`** — componente retirado do código e da documentação; o padrão “destaque contextual” permanece descrito na página **Onboarding** sem implementação DS dedicada.

### Roadmap

- Fase **15** concluída; sub-fase **15.4** entregue em `src/lib/roadmap.ts`.

---

## [0.16] — Abril 2026

### Added — Componentes long-tail · 15.3 (Data display avançado)

- **`Stat`** + **`StatKicker`**, **`StatLabel`**, **`StatValue`**, **`StatDelta`**, **`StatSpark`** — cartão de KPI com delta (up/down/neutral) e **`Sparkline`** reutilizada de `Chart`.
- **`PricingTable`** família — tabela de comparação / pricing com coluna de destaque e células de check.
- **`DiffViewer`** + **`diffLines()`** — diff unificado linha a linha (LCS sobre linhas).
- **`Lightbox`** — imagem ampliada, backdrop, Escape, **focus trap** + **scroll lock**.
- **`CircularProgress`** — anel SVG 0–100 com label central opcional.
- **Página `#/data-display`** (Padrão · 82) — rotas, `searchIndex`, i18n PT+EN, `CompositionSection`, estilos em `index.css`.
- **`registry.json`** — 5 entradas novas (`Stat` → `Chart`, `Lightbox` → hooks).

### Changed

- **PricingTable** — refinamento da coluna em destaque (`accent`): continuidade visual, réguas e zebra; moldura + `border-radius` no `<table>` (scroll horizontal no wrapper); **`PricingTableTh`** aceita **`accent`**.
- **Lightbox** — overlay renderizado com **`createPortal`** em `document.body`; painel e área da imagem maiores (`og-image.svg` com dimensões intrínsecas 1200×630); na página **`#/data-display`**, a demo usa **`/og-image-dark.svg`** em tema escuro e **`/og-image.svg`** em tema claro.

### Roadmap

- Sub-fase **15.3** da fase 15 marcada como entregue em `src/lib/roadmap.ts`.

---

## [0.15] — Abril 2026

### Added — Componentes long-tail · 15.2 (Inputs avançados)

- **`NumberInput`** — valor numérico com stepper − / +, `min` / `max` / `step`, commit em Enter ou blur.
- **`PinInput`** — OTP 4–8 dígitos, colagem, navegação por setas; `onComplete` quando o comprimento fecha.
- **`PasswordInput`** — alternar visibilidade e barras heurísticas de força (0–4).
- **`PhoneInput`** — presets BR / US / PT com máscara nacional; helpers `phoneToE164`, `DEFAULT_COUNTRIES`.
- **`TimePicker`** — HH:MM com grelha em `Popover`, alinhado ao padrão do `DatePicker`; `parseTime` / `formatTime`.
- **`EditableText`** — leitura com clique para editar; Enter/blur grava, Esc cancela.
- **`MentionInput`** — textarea com `@` e painel de sugestões.
- **Página `#/advanced-inputs`** (Padrão · 81) — rota em `patterns`, `searchIndex`, i18n PT+EN, estilos em `index.css`, `CompositionSection`.
- **`registry.json`** — 7 entradas novas (`TimePicker` → `Popover`).

### Roadmap

- Sub-fase **15.2** da fase 15 marcada como entregue em `src/lib/roadmap.ts`.

---

## [0.14] — Abril 2026

### Added — Componentes long-tail · 15.1 (Disclosure & navegação)

- **`Accordion`** (`src/ds/Accordion.tsx`) — modo `single` | `multiple`, `collapsible`, composição AccordionItem/Header/Trigger/Content; painéis animados com **`Collapse`** (`Motion`).
- **`Collapsible`** + aliases **`Disclosure`**, **`DisclosureTrigger`**, **`DisclosureContent`** — um bloco com `aria-expanded` / `aria-controls`.
- **`HoverCard`** — trigger por hover com `openDelay` / `closeDelay`; conteúdo posicionado com **`computePosition`** exportado de `Popover.tsx`.
- **`Banner`**, **`BannerMessage`**, **`BannerAction`** — faixa full-width (variantes neutral / accent / ink), `sticky` opcional, dismiss.
- **`SegmentedControl`** + **`SegmentedControlItem`** — `radiogroup`, visual alinhado ao segmented de Tabs sem painéis de conteúdo.
- **`DescriptionList`** + **`DescriptionRow`** — `dl` editorial (grupo HTML5 `div` > dt + dd).
- **`Mark`** + **`Highlight`** — `<mark>` com variantes `default` | `accent`.
- **Página `#/disclosure`** (Padrão · 80) — exemplos por secção; rota em `patterns`, `searchIndex`, i18n PT+EN, `CompositionSection`.
- **`registry.json`** — 6 entradas novas (deps: Accordion→Motion, HoverCard→Popover).

### Changed

- **`Popover.tsx`** — exporta `computePosition` e o tipo `PopoverPosition` para reutilização pelo HoverCard.

### Roadmap

- Sub-fase **15.1** da fase 15 marcada como entregue em `src/lib/roadmap.ts`.

---

## [0.13] — Abril 2026

### Added — Distribuição & comunidade (Fase 14)

- **`@atelier/ds` e `@atelier/cli`** — workspaces em `packages/` com `sync-sources`, builds publicáveis, `npm run smoke:ds` / `smoke:cli` (sandbox + checks). Publicação NPM continua **manual** — ver `docs/PUBLISHING.md`.
- **Página `/cli`** — documentação completa dos comandos (`init`, `add`, `list`, flags, troubleshooting); rota 69, `searchIndex`, i18n PT+EN.
- **`/install`** — seção ponte “via CLI” com link para `#/cli`.
- **README de produção** — hero, badges, monorepo, tabela ds vs CLI, scripts, estrutura de pastas atualizada (TS, 36+18 registry, PWA).
- **`CONTRIBUTING.md`** — setup, onde colocar cada tipo de mudança, estilo, commits, PR checklist.
- **`SECURITY.md`** — escopo, disclosure coordenado, link para GitHub Security Advisories, alinhado a `public/.well-known/security.txt`.
- **`CODE_OF_CONDUCT.md`** — Contributor Covenant **2.1** (inglês canônico).
- **`.github/`** — `ISSUE_TEMPLATE/` (`bug_report.yml`, `feature_request.yml`, `config.yml` com link de segurança), `PULL_REQUEST_TEMPLATE.md`, `CODEOWNERS` (somente comentários até haver time), `FUNDING.yml` stub.
- **`docs/PUBLISHING.md`** — checklist pré-publish, comandos `npm publish`, OTP/registry, o que não está automatizado.

### Changed

- **Roadmap** — Fase **14** marcada como `done`; `meta.version` **0.13**; sequência editorial atualizada.
- **Versão do app** — `package.json` root **0.13.0**; kickers da página Roadmap em i18n; `ATELIER_VERSION` em `sandbox.ts` alinhado a **0.13**.
- **Badge NEW** — passa a ser **por utilizador** (`localStorage` + evento): some após a primeira visita à rota; Navbar fecha dropdown ao navegar.

### Roadmap

- Fase **14** entregue. Próxima onda editorial na sequência: **Fase 15 — Componentes long-tail** (já listada no `roadmap.ts`).

---

## [0.12] — Abril 2026

### Added — Editorial / About (Fase 12)

- **Grupo `about` em routes** — 5 entradas novas (73-77): `/about`, `/colophon`, `/credits`, `/license`, `/press-kit`. Layout editorial dedicado, fora do fluxo de docs de componentes.
- **Página `/about`** — manifesto longo, história curta (do primeiro commit ao estado atual) e não-objetivos declarados. Prosa em larga measure honra o tom de voz de `/voice`.
- **Página `/colophon`** — stack (React + Vite + TS, zero deps runtime), escolhas tipográficas (Fraunces + JetBrains Mono), princípio editorial da paleta e métricas vivas.
- **Página `/credits`** — inspirações declaradas (Vercel, Stripe, Linear, Nielsen Norman, Ruder, Müller-Brockmann), libs estudadas sem dependência (radix, ariakit, shadcn) e citações editoriais.
- **Página `/license`** — MIT clássico envolvido em anotações editoriais sobre uso, atribuição e a única exceção (logo Atelier).
- **Página `/press-kit`** — logo SVG em variantes light/dark exibidas lado a lado em stages com paleta hardcoded (independente do tema atual). Botões de download por variante + cópia. Paleta hex clicável + 3 boilerplates de descrição (1-line, 1-paragraph, 1-page).
- **`buildLogoSvg()` — wordmark fiel ao SidebarBrand** — função que monta SVG standalone com Atelier em Fraunces 48pt 300 + `.` italic colado via `<tspan dx="-2">`. ViewBox `160×50` dimensionado ao glifo real, `text-anchor="middle"` pra centralização robusta independente do fallback de fonte.
- **CSS `.about-*`** — tipografia em prosa, citações destacadas, métricas em grid 2x2, palette swatches clicáveis e `about-logo-pair` com stages light/dark hardcoded.
- **i18n PT+EN completo** — 5 blocos `pages.*` bilíngues + `nav.groups.about` + 5 `nav.items` + 5 descriptions.

### Roadmap

- Fase **12** entregue → marcada como `done` no `src/lib/roadmap.ts`. Sequência atualizada: próxima é a **Fase 14 — Distribuição & web standards**.

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
