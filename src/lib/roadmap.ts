/* ================================================================
   Roadmap — fonte única de verdade.
   ----------------------------------------------------------------
   Estruturado como dados (não markdown) para que a página /roadmap
   possa filtrar, buscar, contar progresso e linkar componentes
   entregues direto para suas docs.

   Convenções:
   - status: "done"     → entregue
              "next"     → próximo (ainda não começou)
              "ongoing"  → trabalho contínuo, sem fim definido
   - priority: "high"    → próxima onda recomendada
                "medium"  → relevante mas pode esperar
                "ongoing" → dívida técnica recorrente
                "none"    → sem prioridade atribuída (já entregue)

   Conteúdo em PT-BR — UI labels da página estão em i18n.
   ================================================================ */

export type RoadmapStatus = "done" | "next" | "ongoing";
export type RoadmapPriority = "high" | "medium" | "ongoing" | "none";

export interface RoadmapPrinciple {
  id: string;
  title: string;
  description: string;
}

export interface RoadmapDeliverable {
  /** Nome do componente / item entregue. */
  name: string;
  /** Descrição curta (1 linha). */
  note?: string;
  /** Slug da rota se já houver doc no app — usado para gerar link. */
  routeId?: string;
}

export interface RoadmapTaskGroup {
  /** Sub-numeração dentro da fase (ex: "3.1", "3.2"). */
  id: string;
  title: string;
  /** Resumo curto do escopo da sub-fase. */
  summary?: string;
  /** Lista de pontos do escopo (bullets). */
  scope?: string[];
  /** Componentes/sistemas internos dos quais depende. */
  deps?: string[];
  /** Critérios de aceite — o que precisa ser verdade pra fase fechar. */
  acceptance?: string[];
  /** Estimativa qualitativa de tamanho. */
  size?: string;
}

export interface RoadmapPhase {
  id: string;
  /** Numeração editorial: "1", "2", "3", "5.1", "5.2", "8". */
  number: string;
  title: string;
  status: RoadmapStatus;
  priority: RoadmapPriority;
  /** Resumo curto da fase inteira (1 parágrafo). */
  summary?: string;
  /** Itens entregues — usado quando status === "done". */
  delivered?: RoadmapDeliverable[];
  /** Sub-tarefas planejadas — usado quando status !== "done". */
  tasks?: RoadmapTaskGroup[];
}

export interface RoadmapConvention {
  title: string;
  items: (string | { label: string; routeId?: string })[];
}

export interface RoadmapSequenceStep {
  order: number;
  phaseRef: string; // ex: "3.1", "8.1"
  reason: string;
}

export interface Roadmap {
  meta: {
    version: string;
    updated: string; // "Abril 2026"
  };
  principles: RoadmapPrinciple[];
  phases: RoadmapPhase[];
  conventions: RoadmapConvention[];
  sequence: RoadmapSequenceStep[];
}

/* ================================================================
   Conteúdo
   ================================================================ */

export const ROADMAP: Roadmap = {
  meta: {
    version: "0.11",
    updated: "Abril 2026",
  },

  principles: [
    {
      id: "zero-deps",
      title: "Zero dependências de runtime",
      description:
        "O DS roda só com React + ReactDOM. Sem lodash, date-fns, framer-motion, radix, headlessui, recharts, react-dnd. Se precisar do recurso, escrevemos in-house.",
    },
    {
      id: "editorial",
      title: "Editorial-first",
      description:
        "Tipografia serif/mono, ângulos retos por padrão, --rule / --rule-soft / --rule-faint como única gramática de bordas.",
    },
    {
      id: "composable",
      title: "Composable (shadcn-style)",
      description:
        "Componentes públicos são montados a partir de subcomponentes exportados nominalmente. Toda página de doc tem seção Composição com CompositionTree honesta.",
    },
    {
      id: "a11y",
      title: "Acessível por padrão",
      description:
        "role, aria-*, foco visível, Escape fecha, roving tabindex em listas, prefers-reduced-motion respeitado, skip-link global. A11y é critério de aceite, não item separado.",
    },
    {
      id: "i18n",
      title: "i18n sem dívida",
      description:
        "Todo texto novo entra em pt-BR.ts e en.ts na mesma PR. Nada hardcoded em JSX.",
    },
    {
      id: "tokens",
      title: "Tokens > hardcode",
      description:
        "Cores, espaçamento, raios, durações e easings sempre via CSS var (--ink, --accent, --space-*, --dur-*, --ease).",
    },
    {
      id: "ts",
      title: "TypeScript estrito gradual",
      description:
        "Novos componentes nascem .tsx com tipos públicos em src/ds/types.ts. Migração dos .jsx legados é tarefa contínua.",
    },
    {
      id: "doc",
      title: "Documentação = produto",
      description:
        "Cada componente tem página própria com lead, meta, intro, exemplos, composição. Entra em routes.ts, searchIndex.ts e nas duas traduções.",
    },
  ],

  phases: [
    /* ------------------------------------------------------------ */
    /* Entregue                                                     */
    /* ------------------------------------------------------------ */
    {
      id: "phase-1",
      number: "1",
      title: "Foundations",
      status: "done",
      priority: "none",
      summary:
        "Primeiro lote de componentes utilitários e a página oficial de acessibilidade.",
      delivered: [
        { name: "Pagination", note: "Numeração editorial, ellipsis, teclado", routeId: "pagination" },
        { name: "Breadcrumbs", note: "Refatorado a partir do primitivo de Tabs", routeId: "breadcrumbs" },
        { name: "Skeleton", note: "Variantes text, circle, rect — respeita prefers-reduced-motion", routeId: "skeleton" },
        { name: "Stepper", note: "Horizontal e vertical, conectores em CSS Grid", routeId: "stepper" },
        { name: "Página /accessibility", note: "Manifesto + checklist por componente", routeId: "accessibility" },
      ],
    },
    {
      id: "phase-2",
      number: "2",
      title: "Overlays · Feedback · Forms · Date · Layout",
      status: "done",
      priority: "none",
      summary:
        "Cinco ondas que cobriram a maior parte dos componentes interativos não-triviais.",
      delivered: [
        { name: "Popover", note: "Trigger display:contents — resolveu bug de ref do cloneElement", routeId: "popover" },
        { name: "DropdownMenu", routeId: "dropdown-menu" },
        { name: "ContextMenu", routeId: "context-menu" },
        { name: "Drawer / Sheet", note: "Quatro lados", routeId: "drawer" },
        { name: "Toaster", note: "Fila centralizada, auto-dismiss, 5 variantes", routeId: "toaster" },
        { name: "Combobox", note: "Single + multi + creatable, sem perder seleções", routeId: "combobox" },
        { name: "RangeSlider", note: "Dois thumbs, pointer events", routeId: "slider" },
        { name: "Calendar", routeId: "calendar" },
        { name: "DatePicker + DateRangePicker", note: "Domingo como primeiro dia, utilitários zero-dep", routeId: "date-picker" },
        { name: "Carousel", note: "Swipe via pointer events", routeId: "carousel" },
        { name: "TreeView", note: "Roving tabindex, expand/collapse", routeId: "tree" },
        { name: "ResizablePanels + ResizableJunction", note: "3 painéis em L com handle invisível 20×20", routeId: "resizable" },
      ],
    },
    {
      id: "phase-5-1",
      number: "5.1",
      title: "Inputs exóticos",
      status: "done",
      priority: "none",
      summary: "Componentes de input avançados, ainda dentro da política zero-deps.",
      delivered: [
        { name: "ColorPicker", note: "HSL + alpha, conversões em colorUtils.ts", routeId: "color-picker" },
        { name: "MarkdownViewer", note: "Parser próprio, sem marked/remark", routeId: "markdown" },
        { name: "KeyboardShortcuts", note: "useShortcut + ShortcutsProvider + diálogo de ajuda", routeId: "shortcuts" },
      ],
    },
    {
      id: "phase-5-2",
      number: "5.2",
      title: "Performance · Data",
      status: "done",
      priority: "none",
      summary: "Foco em performance e interações de manipulação direta.",
      delivered: [
        { name: "VirtualList", note: "Windowing, itemHeight fixo ou função, infinite scroll, ResizeObserver", routeId: "virtual-list" },
        { name: "DragDrop kit", note: "Sortable, DragSource, DropZone, DragGhost auto-mounted; touch+mouse+pen+teclado", routeId: "drag-drop" },
      ],
    },
    {
      id: "polish-done",
      number: "✦",
      title: "Polimentos transversais já feitos",
      status: "done",
      priority: "none",
      summary: "Trabalho que não cabe em uma fase específica mas elevou o produto inteiro.",
      delivered: [
        { name: "Studio (/create)", note: "Presets, shuffle, reset que respeita tema atual, export", routeId: "create" },
        { name: "Charts (/charts)", note: "Bar / Line / Area / Pie / Donut / Radar / Radial / Sparkline + aba Tooltips", routeId: "charts" },
        { name: "Command palette (⌘K)", note: "Indexa páginas, componentes e tokens" },
        { name: "Layout toggle navbar", note: "Boxed / wide, persistido em localStorage" },
        { name: "Tabs com 5 variantes + vertical", note: "Underline, enclosed, pills, segmented, minimal", routeId: "tabs" },
        { name: "Rule of rules", note: "3 pesos de borda codificados em index.css" },
        { name: "CompositionTree refeita", note: "<ul> aninhado e linhas pixel-perfect via border-left + pseudoelementos" },
      ],
    },

    /* ------------------------------------------------------------ */
    /* Próximas fases                                               */
    /* ------------------------------------------------------------ */
    {
      id: "phase-3",
      number: "3",
      title: "Data display heavy",
      status: "done",
      priority: "none",
      summary:
        "Componentes de tabela e dado denso — o gap mais visível do DS preenchido em uma onda só.",
      delivered: [
        {
          name: "DataTable",
          note: "Tabela composable com sort, filtros tipados, seleção single/multi, paginação e virtualização opt-in.",
          routeId: "dataTable",
        },
        {
          name: "Timeline",
          note: "Vertical e horizontal, com markers (dot/hollow/number/glyph) e separador 'agora'.",
          routeId: "timeline",
        },
        {
          name: "TagInput · Tag",
          note: "Coletor de tags livres com chips removíveis, validação e separadores customizáveis.",
          routeId: "tagInput",
        },
        {
          name: "KBD · KbdCombo · InlineCode",
          note: "Primitivos editoriais para teclas e código inline, em três variantes (subtle, boxed, outline).",
          routeId: "kbd",
        },
      ],
    },

    {
      id: "phase-4",
      number: "4",
      title: "Motion & transitions",
      status: "done",
      priority: "none",
      summary:
        "Fechada em quatro sub-ondas (4.1 primitivos, 4.2 ScrollReveal, 4.3 page transitions, 4.4 página /motion). O DS para de usar transition ad-hoc — animação ganha vocabulário comum, page transitions ganham um hook leve e a página /motion documenta tudo com visualização interativa de cada easing.",
      delivered: [
        {
          name: "[4.1] Vocabulário expandido em :root",
          note:
            "Seis curvas nomeadas (--ease, --ease-in, --ease-out, --ease-in-out, --ease-out-expo, --ease-spring) + duração nova --dur-xl (480ms). Calibradas e documentadas no inventário central.",
        },
        {
          name: "[4.1] <Transition> — controlador genérico",
          note:
            "Mount/unmount com classes is-entering / is-entered / is-exiting / is-exited. Injeta --motion-dur e --motion-ease no filho via cloneElement — sem wrapper extra no DOM.",
        },
        {
          name: "[4.1] Atalhos: <Fade>, <Slide>, <Scale>",
          note: "Wrappers sobre <Transition>. Slide aceita from + distance; Scale aceita from. Todos respeitam prefers-reduced-motion automaticamente.",
        },
        {
          name: "[4.1] <Collapse> — height: auto correto",
          note: "Mede via scrollHeight, transiciona, restaura auto. Útil pra accordion, disclosure, expand/collapse genérico.",
        },
        {
          name: "[4.2] <ScrollReveal>",
          note:
            "Wrapper que anima entrada quando o elemento aparece na tela. Usa o useIntersectionObserver da Fase 10.1. Props: direction (up/down/left/right/none), delay, threshold, once, distance.",
        },
        {
          name: "[4.3] usePageTransition + integração no App",
          note:
            "Hook leve devolve { key, variant }. App.tsx aplica data-page-transition no <main> e key={current} no wrapper de página — CSS keyframes rodam na entrada. Variantes: fade (default), slide-up, cross-fade, none. Persistência de scroll opt-in via sessionStorage.",
        },
        {
          name: "Página /motion",
          note:
            "Foundation · 12. Tabelas de tokens, visualizador interativo de cada easing (curva SVG do cubic-bezier + bola animada com play), demos clicáveis dos 4 primitivos, demo do Collapse, strip do ScrollReveal nas 4 direções, snippet de page transitions, 4 regras editoriais 'quando NÃO animar'.",
          routeId: "motion",
        },
        {
          name: "Reduced motion respeitado em CSS, não em JS",
          note:
            "@media (prefers-reduced-motion: reduce) zera transforms nas classes .ds-motion-* e .ds-scroll-reveal. Hook usePrefersReducedMotion (10.1) cobre os casos JS (auto-play, drag).",
        },
      ],
    },

    {
      id: "phase-6",
      number: "6",
      title: "A11y / i18n avançado",
      status: "done",
      priority: "none",
      summary:
        "Fechada em quatro frentes (6.1 RTL, 6.2 hooks de foco, 6.3 contrast checker, 6.4 testes). Endurece a base existente: lógica de foco que vivia espalhada em 4+ componentes ganha 3 hooks públicos; RTL fica preparado em runtime + auditoria mínima de CSS; Studio audita contraste WCAG ao customizar; testes vitest rodam em CI.",
      delivered: [
        {
          name: "[6.2] useFocusTrap — Tab/Shift+Tab dentro do ref, wrap nas pontas",
          note: "Detecta visíveis via display/visibility (funciona em jsdom + browser real).",
        },
        {
          name: "[6.2] useFocusReturn — captura foco anterior e restaura ao desmontar",
          note: "preventScroll: true. Combine com useFocusTrap em todo overlay.",
        },
        {
          name: "[6.2] useRovingTabIndex — arrow keys em listas/grids",
          note: "Devolve { activeIndex, setActiveIndex, getItemProps }. Suporta horizontal/vertical/both, loop, Home/End. Padrão WAI-ARIA Composite Widget.",
        },
        {
          name: "[6.3] src/lib/contrast.ts — utilitários WCAG",
          note: "parseColor, relativeLuminance, contrastRatio, wcagLevel. Implementação 100% WCAG 2.x, testado contra valores de referência do WebAIM.",
        },
        {
          name: "[6.3] StudioContrast no Create",
          note: "Toggle 'Acessibilidade' no painel — checa 7 pares editorialmente relevantes (ink/bg, ink-soft/bg, accent/bg, accent-ink/accent-soft, ink-inverse/bg-inverse, etc) com ratio + badge AAA/AA/AA-large/Fail.",
        },
        {
          name: "[6.4] vitest + @testing-library/react + user-event",
          note: "Configurado em vite.config.js; jsdom; setup file com polyfills (matchMedia, IntersectionObserver, ResizeObserver). Scripts: npm run test, test:watch, test:ui.",
        },
        {
          name: "[6.4] 18 testes smoke passando",
          note: "contrast.test.ts (12), useDebounce.test.ts (3), useFocusTrap.test.tsx (3). Cobertura inicial focada em src/lib — adicionar testes por componente é tarefa contínua.",
        },
        {
          name: "[6.1] LocaleProvider · suporte runtime a dir=rtl",
          note: "Aplica <html dir lang> automaticamente para locales ar/he/fa/ur; expõe override manual em Settings → Direção (Auto/LTR/RTL) persistido em localStorage.",
        },
        {
          name: "[6.1] CSS RTL — auditoria mínima",
          note: "Glifos direcionais espelhados via data-rtl-flip + scaleX(-1); Drawer.left ↔ Drawer.right invertem; PageNav/Breadcrumbs/Carousel arrows tratados. Auditoria do CSS legado completo (padding-left → padding-inline-start, etc) declarada como dívida progressiva em /accessibility.",
        },
        {
          name: "Página /accessibility expandida",
          note: "3 seções novas: Hooks de foco (vi), RTL · Direction (vii), Testes automatizados (viii). Inclui 'como testar agora' editorial.",
          routeId: "accessibility",
        },
      ],
    },

    {
      id: "phase-7-2",
      number: "7.2",
      title: "Studio · Import de tokens",
      status: "done",
      priority: "none",
      summary:
        "Round-trip do Studio fechado. Drop zone + paste + parser ao vivo aceita CSS (:root) ou JSON DTCG, mostra preview, avisa sobre tokens desconhecidos, aplica via theme.overrides que sobrescreve qualquer preset. Reverso natural do export entregue na 7.1.",
      delivered: [
        {
          name: "Parsers em src/lib/tokens.ts",
          note: "parseCss (regex de --token: value), parseJson (DTCG ou flat), parseTokens (auto-detect pelo primeiro char). Devolvem { values, warnings, errors } — tokens desconhecidos viram warning, não erro.",
        },
        {
          name: "themeToStyle respeita theme.overrides",
          note: "Novo campo Record<string, string> aplicado POR ÚLTIMO no themeToStyle, sobrescreve qualquer preset. Permite importar valores arbitrários sem mapear pra preset. themeToCss/Json/Ts automaticamente incluem.",
        },
        {
          name: "<StudioImport> no painel do Studio",
          note: "Toggle 'Importar' abre painel com drop zone (.css/.json) + textarea de paste + preview ao vivo (count + lista de 6 + warnings collapsible) + botões Aplicar/Limpar. Erros fatais bloqueiam o Aplicar.",
        },
        {
          name: "Round-trip validado por testes",
          note: "12 testes novos em src/lib/tokens.test.ts cobrindo parseCss, parseJson, auto-detect e idempotência (export → parse preserva valores 1:1). Total: 30/30 testes passando.",
        },
      ],
    },

    {
      id: "phase-7-1",
      number: "7.1",
      title: "Studio · Export multi-formato",
      status: "done",
      priority: "none",
      summary:
        "O painel Export do Studio (/create) ganhou tabs editorial pra três formatos de saída — cobre os pipelines mais comuns: cola direta em CSS, troca via design tokens (DTCG) ou consumo TypeScript-tipado.",
      delivered: [
        {
          name: "theme.css",
          note: "Cola direto no :root. Inclui --studio-radius quando usuário ativou Advanced.",
        },
        {
          name: "tokens.json (W3C DTCG)",
          note: "Formato Design Tokens Community Group. $value, $type, $description e $extensions.atelier.dark quando o token tem variante dark.",
        },
        {
          name: "theme.ts (objeto tipado)",
          note: "Pronto pra import em apps consumidoras. Pares { light, dark } onde aplicável; categorias preservadas (color, ink, type, spacing).",
        },
        {
          name: "Helper downloadText em src/lib/tokens.ts",
          note: "Blob + URL.createObjectURL — zero dep. Substituiu a função local downloadCss do Create.tsx.",
        },
      ],
    },

    {
      id: "phase-7-3",
      number: "7.3",
      title: "Página /tokens",
      status: "done",
      priority: "none",
      summary:
        "Reference · 58. Visualização única de todos os 88 tokens públicos do DS, com swatch por tipo, valores light vs dark side-by-side, busca + filtros por categoria, copy individual e export do subset visível.",
      delivered: [
        {
          name: "src/lib/tokens.ts (inventory central)",
          note: "88 tokens declarados à mão em 19 categorias (color/ink/rule/accent/semantic/effect/scrollbar/code/type/spacing/layout/motion/radius/shadow/z-index/breakpoint/opacity/aspect/density). Tipos seguem W3C DTCG. Helpers: tokensByCategory, findToken, serializeCss/Json/Ts.",
        },
        {
          name: "Página /tokens com toolbar + chips + tabela editorial",
          note: "Busca textual, filtro por categoria com contador, tabela por grupo. Preview por tipo: par light+dark para cores, shadow real, barra para spacing, quadrado com radius, glifo Aa para tipografia.",
          routeId: "tokens",
        },
        {
          name: "Export do subset ativo (CSS/JSON/TS)",
          note: "Os 3 botões da toolbar respeitam o filtro selecionado — exportar com 'spacing' selecionado baixa só os --space-*.",
        },
        {
          name: "Copy individual por token",
          note: "Botão minimalista por linha; estado 'Copiado' temporário via useCopy.",
        },
      ],
    },

    {
      id: "phase-7-4",
      number: "7.4",
      title: "Página /changelog",
      status: "done",
      priority: "none",
      summary:
        "Reference · 57. Estréia oficial do MarkdownViewer em produção — o CHANGELOG.md do repo é importado via ?raw do Vite (zero round-trip em runtime) e renderizado pelo parser zero-dep do DS.",
      delivered: [
        {
          name: "CHANGELOG.md no root",
          note: "Formato Keep a Changelog + SemVer. Versões 0.1 → 0.6 documentando cada fase entregue.",
        },
        {
          name: "Página /changelog que lê o markdown via ?raw",
          note: "Sem fetch em runtime. O markdown viaja com a chunk da página. Mudou? Rebuild reflete imediatamente.",
          routeId: "changelog",
        },
        {
          name: "MarkdownViewer em produção pela primeira vez",
          note: "Já existia como componente documentado em /markdown — agora carrega doc real.",
        },
      ],
    },

    {
      id: "phase-7-5",
      number: "7.5",
      title: "Página /roadmap",
      status: "done",
      priority: "none",
      summary:
        "Esta própria página. Entregue na onda em que o arquivo nasceu (versão 0.1) — listada formalmente aqui para o contador de progresso refletir.",
      delivered: [
        {
          name: "Renderização dinâmica do roadmap.ts",
          note: "Lê o objeto ROADMAP exportado deste arquivo, renderiza fases, deliverables, tasks, princípios, convenções e sequência.",
          routeId: "roadmap",
        },
        {
          name: "Busca + filtros por status e prioridade + 'só o que falta'",
          note: "Toolbar editorial — query textual, chips de status (entregue/próximo/contínuo), chips de prioridade, toggle pendingOnly.",
        },
        {
          name: "Links diretos para componentes entregues",
          note: "Cada deliverable com routeId vira link 'Abrir documentação' apontando pra sua doc oficial.",
        },
      ],
    },

    {
      id: "phase-8",
      number: "8",
      title: "Polimento e dívida técnica",
      status: "ongoing",
      priority: "ongoing",
      summary:
        "Não tem 'fim' — vai entrando em pequenos lotes entre fases novas. Sub-tarefa 8.1 (code splitting) já entregue como sub-fase própria.",
      tasks: [
        {
          id: "8.2",
          title: "Migração .jsx → .tsx",
          scope: [
            "Auditar com find src -name '*.jsx' -o -name '*.js'",
            "Converter um por vez, adicionando tipos a src/ds/types.ts",
            "Apertar tsconfig gradualmente: noImplicitAny: true global, depois strictNullChecks",
          ],
        },
        {
          id: "8.3",
          title: "Toaster com createRoot lazy",
          scope: [
            "Hoje o portal é montado manualmente",
            "Trocar por createRoot chamado uma vez no primeiro toast() — evita custo no bootstrap",
          ],
        },
        {
          id: "8.4",
          title: "Ícones como sprite SVG",
          scope: [
            "Ícones inline crescem o bundle JS",
            "Avaliar mover para <symbol> em sprite /icons.svg referenciado via <use href>",
            "Ganha cache HTTP, perde flexibilidade de fill via JS — testar trade-off",
          ],
        },
        {
          id: "8.5",
          title: "Testes E2E mínimos",
          scope: [
            "playwright (devDep) com 5 fluxos críticos",
            "1. Trocar tema persiste no reload",
            "2. Command palette abre e navega",
            "3. Drawer fecha com Escape",
            "4. Combobox creatable adiciona sem perder seleção (regressão histórica)",
            "5. DragDrop kanban move card entre colunas (regressão histórica)",
          ],
        },
        {
          id: "8.6",
          title: "Storybook? (decisão pendente)",
          summary:
            "O Atelier já é o storybook. Adicionar Storybook real significaria duplicar conteúdo. Provavelmente NÃO fazer — anotar como decisão consciente.",
        },
        {
          id: "8.7",
          title: "axe-core em CI",
          summary:
            "Roda axe contra cada página do app — pega regressões de a11y antes do merge.",
          scope: [
            "@axe-core/playwright (devDep) integrado ao mesmo runner do 8.5",
            "Por página: nenhuma violação serious / critical",
            "Violações 'minor' viram aviso, não erro",
          ],
        },
        {
          id: "8.8",
          title: "Bundle analyzer publicado",
          scope: [
            "rollup-plugin-visualizer no build de produção",
            "Output em /stats.html publicado junto com o app",
            "Página /performance (ver Fase 11) linka direto pra ele",
          ],
        },
        {
          id: "8.9",
          title: "Visual regression",
          summary:
            "Decisão entre Playwright screenshots (in-house, zero-dep externa) vs Chromatic (serviço pago). Default: Playwright.",
          scope: [
            "Snapshot por página em light + dark, em 2 viewports (mobile, desktop)",
            "Diff em PR comments via GitHub Action",
            "Aceita override manual quando mudança é intencional",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------ */
    /* Fases novas — conceitos e fundação antes de novos components */
    /* ------------------------------------------------------------ */
    {
      id: "phase-9",
      number: "9",
      title: "Foundations II — tokens estruturais",
      status: "done",
      priority: "none",
      summary:
        "Fechada em três sub-ondas (9.1 escalas, 9.2 páginas conceituais, 9.3 auditoria de uso). O DS para de drift estrutural — radius, shadow, z-index, breakpoints, opacidade, aspect-ratio e densidade passam a viver em tokens documentados, com cinco páginas de manual e a codebase auditada para consumir tudo via var().",
      delivered: [
        {
          name: "[9.1] Sete escalas estruturais em :root",
          note:
            "--radius-* (none/sm/md/lg/full), --shadow-* (none/sm/md/lg, light + dark), --z-* (10 camadas nomeadas), --bp-* (sm/md/lg/xl/2xl), --opacity-*, --aspect-*, --density-* — todas com comentário editorial inline.",
        },
        {
          name: "[9.1] Classes utilitárias .is-density-compact / .is-density-spacious",
          note: "Sobrescrita por escopo via cascata de CSS vars — nenhum componente precisa de prop nova.",
        },
        {
          name: "Página /elevation",
          note: "Escala --shadow-* + 4 regras 'quando elevar' + comparativo light vs dark.",
          routeId: "elevation",
        },
        {
          name: "Página /radius",
          note: "Escala --radius-* + 4 regras 'quando arredondar'; codifica a decisão 'ângulos retos por padrão'.",
          routeId: "radius",
        },
        {
          name: "Página /z-index",
          note: "Tabela das 10 camadas + diagrama editorial 3D (pilha em pseudo-perspectiva) + 4 regras de hierarquia.",
          routeId: "zIndex",
        },
        {
          name: "Página /breakpoints",
          note: "Tabela + visualizador ao vivo que reage a window.resize, marcando o breakpoint ativo.",
          routeId: "breakpoints",
        },
        {
          name: "Página /density",
          note: "Mesma lista renderizada em 3 densidades lado a lado + tabela comparativa de tokens + exemplos de scoping.",
          routeId: "density",
        },
        {
          name: "[9.3] Auditoria z-index",
          note: "27 z-index numéricos (CSS + 2 inline em DragDrop) substituídos por var(--z-*); zero literal restante.",
        },
        {
          name: "[9.3] Auditoria border-radius",
          note: "32 border-radius literais (CSS + 2 inline em TimelinePage) → var(--radius-*); fallback obsoleto var(--radius-sm, 6px) removido.",
        },
        {
          name: "[9.3] Auditoria box-shadow",
          note: "10 elevations reais → var(--shadow-*); 4 overrides redundantes [data-theme='dark'] removidos (o token já é tema-aware). Rings/outlines mantidos literais por design.",
        },
        {
          name: "[9.3] @media pareadas com --bp-*",
          note: "28 @media queries com comentário /* --bp-X */ (exato) ou /* ~--bp-X */ (próximo); rastreabilidade total. Consolidação numérica fica como polish posterior, sem risco visual.",
        },
      ],
    },

    {
      id: "phase-10",
      number: "10",
      title: "Hooks utilitários públicos",
      status: "done",
      priority: "none",
      summary:
        "Fechada em quatro sub-ondas (10.1 ambiente, 10.2 DOM, 10.3 estado, 10.4 página). Lógica que estava espalhada — click-outside em cinco overlays, scroll-lock em três modais, controllable-state copiado ad-hoc — agora vive em 14 hooks públicos exportados de um único barrel (src/lib/hooks). Todos SSR-safe, com cleanup correto, zero deps externas.",
      delivered: [
        {
          name: "[10.1] useMediaQuery",
          note: "Reativo via matchMedia, pareia com --bp-* da Foundations II. Pré-requisito de toda lógica responsiva em JS.",
        },
        {
          name: "[10.1] usePrefersReducedMotion",
          note: "Wrapper sobre useMediaQuery. Permite gates JS pra animações além do que o CSS já faz.",
        },
        {
          name: "[10.1] useWindowSize",
          note: "{ width, height } reativo. Sem debounce embutido — componha com useDebounce se precisar.",
        },
        {
          name: "[10.1] useIntersectionObserver",
          note: "Retorna IntersectionObserverEntry. Habilita o <ScrollReveal> da Fase 4.2.",
        },
        {
          name: "[10.1] useResizeObserver",
          note: "{ width, height } por elemento. Pré-requisito formal de VirtualList autoHeight.",
        },
        {
          name: "[10.2] useClickOutside",
          note: "Mouse + touch, opt-out via flag active. Substitui lógica duplicada em Popover/DropdownMenu/ContextMenu.",
        },
        {
          name: "[10.2] useScrollLock",
          note: "Counter interno empilhável (modal dentro de drawer não destrava prematuramente). Compensa scrollbar.",
        },
        {
          name: "[10.2] useEventListener",
          note: "Tipado por overload (window/document/element). Handler estável via ref — re-render não recria listener.",
        },
        {
          name: "[10.2] useKeyPress",
          note: "Parser próprio: cmd+k, mod+s, escape; mod adapta-se a Mac/PC. Para atalhos LOCAIS (useShortcut continua sendo o global descobrível).",
        },
        {
          name: "[10.3] useLocalStorage",
          note: "API igual useState. Sync entre abas via storage event. Quota errors silenciosos.",
        },
        {
          name: "[10.3] useDebounce / useThrottle",
          note: "Padrões clássicos para inputs de busca (debounce) e scroll handlers (throttle).",
        },
        {
          name: "[10.3] useControllableState",
          note: "Resolve o padrão controlled-vs-uncontrolled. onChange dispara em ambos os modos. Decisão zero-deps vs Radix.",
        },
        {
          name: "[10.3] usePrevious / useUpdateEffect",
          note: "usePrevious devolve o valor do render anterior. useUpdateEffect pula a primeira execução (componentDidUpdate equivalente).",
        },
        {
          name: "Barrel src/lib/hooks/index.ts",
          note: "Re-exporta todos com tipos públicos (WindowSize, ResizeObserverSize, UseKeyPressOptions, UseControllableStateProps). Hooks de domínio (useT/useTheme/useShortcut/useDataTable etc) explicitamente NÃO entram aqui — vivem ao lado dos componentes.",
        },
        {
          name: "Página /hooks",
          note: "Reference · 56. Cards por sub-fase (assinatura + exemplo + nota), matriz de discovery 'qual hook usar quando' com 15 linhas, e tabela dos 10 hooks de domínio para descoberta editorial.",
          routeId: "hooks",
        },
      ],
    },

    {
      id: "phase-8-1",
      number: "8.1",
      title: "Code splitting",
      status: "done",
      priority: "none",
      summary:
        "Bundle único de 922 KB / 272 KB gz quebrado em 66 chunks. Entry caiu para 24 KB / 7.6 KB gz (−97%). First-paint passou de ~272 KB para ~165 KB gz. Nenhum chunk acima de 200 KB minified — critério de aceite cumprido. Aviso de bundle do Vite eliminado.",
      delivered: [
        {
          name: "React.lazy() em 57 páginas",
          note: "Cada página vira chunk próprio carregado on-demand. Overview mantido estático (página inicial — primeira tela sem fallback Suspense).",
        },
        {
          name: "Suspense + PageFallback editorial",
          note: "Esqueleto que replica a estrutura de PageHead (lead curto + título largo + intro de 3 linhas) — evita layout shift quando a página real monta.",
        },
        {
          name: "vite.config.js com manualChunks granular",
          note: "react vendor, ds-core, e peças pesadas isoladas (ds-charts, ds-datatable, ds-dragdrop, ds-markdown, ds-colorpicker, ds-datepicker). chunkSizeWarningLimit baixado de 500 → 250 KB.",
        },
        {
          name: "i18n lazy por locale",
          note: "Refactor de src/i18n/index.ts e LocaleProvider — cada dicionário (~130 KB minified) virou chunk próprio carregado sob demanda. Cache em memória evita rebaixar. App nasce mais leve em ~110 KB gz no first-paint.",
        },
      ],
    },

    {
      id: "phase-11",
      number: "11",
      title: "Padrões transversais (não-componente)",
      status: "done",
      priority: "none",
      summary:
        "Doze páginas conceituais que codificam o como-pensar do DS — estados de espera, erro, formulários, ações destrutivas, onboarding, dark mode, print, i18n, install, API reference, browser support e performance. Cada página segue o mesmo vocabulário visual: decision matrix, do/don't, callouts, bullets numerados.",
      delivered: [
        {
          name: "Página /loading-states",
          note: "Skeleton vs Spinner vs Progress vs Toast vs Empty — decision matrix com 5 padrões + 4 regras de tempo de espera (< 100ms, 100-500ms, 500ms-2s, > 5s).",
          routeId: "loadingStates",
        },
        {
          name: "Página /error-handling",
          note: "Quatro camadas (inline → operação → boundary → global), código real do ErrorBoundary React 18, anatomia da mensagem em três partes (WHAT/WHY/ACTION), do/don't.",
          routeId: "errorHandling",
        },
        {
          name: "Página /forms-patterns",
          note: "onChange vs onBlur vs onSubmit vs server-side, 5 estados de campo, padrão async com optimistic disable, 4 do/don't.",
          routeId: "formsPatterns",
        },
        {
          name: "Página /destructive-actions",
          note: "Três níveis de cerimônia (UNDO 5-10s → CONFIRM modal → TYPED confirmation), código de cada padrão, 4 do/don't.",
          routeId: "destructive",
        },
        {
          name: "Página /onboarding",
          note: "Tour vs Coachmark vs Empty State guiado — decision matrix + 5 princípios editoriais (skippable sempre, mostre não diga, etc).",
          routeId: "onboarding",
        },
        {
          name: "Página /dark-mode",
          note: "'Calibre, não inverta' — 4 princípios + bootstrap blocking sem flash + 3 edge cases (charts, code, imagens) + 4 do/don't.",
          routeId: "darkMode",
        },
        {
          name: "Página /print",
          note: "4 princípios editoriais + print stylesheet completa pronta pra colar (esconde cromo, força P&B, URLs visíveis, page-break inteligente).",
          routeId: "print",
        },
        {
          name: "Página /i18n-patterns",
          note: "Intl nativo zero-deps: PluralRules (6 categorias), NumberFormat, DateTimeFormat, ListFormat, RelativeTimeFormat. Cobre RTL via link pra 6.1.",
          routeId: "i18nPatterns",
        },
        {
          name: "Página /install",
          note: "4 decisões filosóficas (zero deps, CSS único, tree-shake, composable), comandos NPM, bootstrap dos 3 providers, primeiro componente.",
          routeId: "install",
        },
        {
          name: "Página /api-reference",
          note: "Mapa por família — 12 famílias (primitives, Card, Tabs, Drawer, Toaster, DataTable, Chart, Form, Motion, hooks, tokens, contrast) linkando código → doc.",
          routeId: "apiReference",
        },
        {
          name: "Página /browser-support",
          note: "Targets evergreen (Chrome 110, FF 109, Safari 16.4) + 6 APIs assumidas sem polyfill (ES2022, CSS Logical Properties, Custom Properties, Observers, Intl, color-mix).",
          routeId: "browserSupport",
        },
        {
          name: "Página /performance",
          note: "6 budgets verificáveis com valores atuais reais (entry 24 KB, first-paint 165 KB gz, etc) + 5 ganhos editoriais que entregaram performance (zero deps, code split, i18n lazy, ds-* chunks, CSS único).",
          routeId: "performance",
        },
        {
          name: "Helper src/lib/emify.tsx",
          note: "Sub-componente que faz parse seguro de [em]…[/em] em string crua → <strong>. Usado pelas 12 páginas quando o conteúdo vem dentro de array i18n. Sem dangerouslySetInnerHTML.",
        },
        {
          name: "CSS .pattern-* compartilhado",
          note: "Vocabulário visual coeso pra padrões editoriais: pattern-decision (matriz), pattern-do-dont (verde/vermelho), pattern-callout (kicker+título+texto), pattern-bullets (numerada), pattern-stack. Reutilizável em páginas futuras.",
        },
      ],
    },

    {
      id: "phase-12",
      number: "12",
      title: "Editorial / About",
      status: "next",
      priority: "medium",
      summary:
        "O Atelier tem voz forte em todos os componentes mas nenhuma página sobre si mesmo. Fechar essa lacuna é parte do produto, não enfeite.",
      tasks: [
        {
          id: "12.1",
          title: "/about",
          scope: [
            "Manifesto longo: por que existe, decisões filosóficas, posição editorial",
            "História curta: do primeiro commit ao estado atual",
            "Não-objetivos declarados (ex: 'não competimos com Material UI')",
          ],
        },
        {
          id: "12.2",
          title: "/colophon",
          scope: [
            "Como foi feito: stack (React + Vite + TS, zero deps de runtime)",
            "Tipografia: Fraunces, JetBrains Mono — por que essas escolhas",
            "Paleta editorial: cor de marca, princípio do papel envelhecido",
            "Métricas: tamanho do bundle, número de tokens, número de componentes",
          ],
        },
        {
          id: "12.3",
          title: "/credits",
          scope: [
            "Inspirações declaradas: Vercel, Stripe, Linear, Nielsen Norman, Ruder, Müller-Brockmann",
            "Bibliotecas open-source que estudamos sem usar (radix, ariakit, shadcn)",
            "Pessoas, livros, manuais editoriais citados",
          ],
        },
        {
          id: "12.4",
          title: "/license",
          scope: [
            "MIT (a definir) com anotações editoriais sobre uso",
            "Como atribuir, o que não pode (logo Atelier)",
          ],
        },
        {
          id: "12.5",
          title: "/press-kit",
          scope: [
            "Logo em SVG (light/dark)",
            "Paleta primária com hex copiável",
            "Screenshots em alta resolução",
            "Boilerplate de descrição (1-line, 1-paragraph, 1-page)",
          ],
        },
      ],
    },

    {
      id: "phase-13",
      number: "13",
      title: "Sandbox & DX",
      status: "done",
      priority: "none",
      summary:
        "Fechada em quatro frentes (13.1 live editor, 13.2 sandbox externo, 13.3 recipes, 13.4 CLI). Examples deixam de ser estáticos: editor inline + abertura em StackBlitz/CodeSandbox + galeria de composições prontas com previews ao vivo + CLI shadcn-style pra copiar componentes.",
      delivered: [
        {
          name: "[13.1] <Example editable> com editor inline",
          note: "Toggle 'Editar' troca <Code> por textarea editável; copy + restaurar embutidos. Sem live preview real (zero-deps — babel-standalone custaria 3 MB); decisão honesta de delegar pro sandbox externo.",
        },
        {
          name: "[13.2] src/lib/sandbox.ts — StackBlitz + CodeSandbox",
          note: "Helpers que constroem template completo (package.json + index.html + main.tsx + tsconfig + vite.config) e abrem via form POST. Zero deps, lazy-loaded sob clique.",
        },
        {
          name: "[13.2] <Example sandbox> com botões externos",
          note: "Botões 'StackBlitz' e 'CodeSandbox' abrem o snippet num projeto novo já configurado com @atelier/ds. Snippet sem export default é envolvido em <App> automaticamente.",
        },
        {
          name: "Página /recipes (Reference · 72)",
          note: "6 receitas curadas — Login (com phase async), Settings (Switch correto + saved-at), Pricing (3 tiers com seleção visual), Comment thread (lista mutável + Cmd+Enter), Onboarding stepper (3 passos), Newsletter (state subscribed). Cada uma renderiza ao vivo + edita + abre em sandbox.",
          routeId: "recipes",
        },
        {
          name: "[13.3] src/lib/recipes.tsx — registry editorial",
          note: "Cada receita = { id, category, preview, snippet }. Snippets espelham o comportamento real da preview — quem abre StackBlitz vê o mesmo que viu na galeria.",
        },
        {
          name: "[13.4] bin/atelier-cli.js — CLI shadcn-style",
          note: "Comandos: init (scaffold src/ds + src/lib + atelier.css), add <component> (copia + dependências transitivas), list [--category]. Zero deps externas — apenas Node 18+ stdlib (fs/path/url).",
        },
        {
          name: "[13.4] registry.json — fonte de verdade",
          note: "36 componentes + 18 hooks com paths e dependências transitivas. CLI resolve grafo de deps automaticamente (pedir DataTable puxa RangeSlider/Combobox/DatePicker/Pagination + hooks usados).",
        },
        {
          name: "package.json com bin + files",
          note: "bin: { atelier: './bin/atelier-cli.js' } pronto para publicação em NPM (Fase 14). Em dev: npm run cli list/init/add. Version bumped pra 0.10.0.",
        },
      ],
    },

    {
      id: "phase-14",
      number: "14",
      title: "Distribuição & web standards",
      status: "next",
      priority: "medium",
      summary:
        "Atelier hoje vive no app de docs. Para virar referência consumida, precisa estar instalável e descobrível.",
      tasks: [
        {
          id: "14.1",
          title: "PWA + SEO",
          scope: [
            "manifest.json + ícones em múltiplas resoluções",
            "Open Graph + Twitter cards por página",
            "<title> e <meta name='description'> dinâmicos por rota",
            "sitemap.xml gerado no build, robots.txt explícito",
          ],
        },
        {
          id: "14.2",
          title: "Pacote NPM",
          scope: [
            "@atelier/ds publicado com tree-shaking (sideEffects: false)",
            "Build dual: ESM + CJS via tsup ou Vite library mode",
            "Tipos exportados, peer deps de React 18+",
            "CHANGELOG.md alimentado automaticamente (linka 7.4)",
          ],
        },
        {
          id: "14.3",
          title: "README de produção",
          scope: [
            "README curto com proposta + screenshot + comando de install",
            "Link para docs (este app), changelog, license",
            "Badges (npm version, bundle size, license)",
            "Distinto do /code — esse é a porta de entrada de quem chega via GitHub",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------ */
    /* Componentes novos — explicitamente após tudo conceitual      */
    /* ------------------------------------------------------------ */
    {
      id: "phase-15",
      number: "15",
      title: "Componentes long-tail",
      status: "next",
      priority: "medium",
      summary:
        "Componentes ainda ausentes do DS. Posicionados ao final do roadmap por decisão consciente: vêm depois de fundação (9), hooks (10), padrões (11) e distribuição (14) — assim cada componente novo nasce sobre tokens, hooks e patterns sólidos, em vez de criar dívida nova.",
      tasks: [
        {
          id: "15.1",
          title: "Disclosure & navegação",
          scope: [
            "Accordion / Disclosure / Collapsible — usa <Collapse> da 4.1",
            "HoverCard — preview ao passar o mouse",
            "Banner / Announcement bar — distinto de Alert (full-width, fechável, persistente)",
            "SegmentedControl formal — hoje é variante de Tabs, virar componente próprio",
            "DescriptionList — dt/dd editorial",
            "Mark / Highlight — texto destacado inline",
          ],
        },
        {
          id: "15.2",
          title: "Inputs avançados",
          scope: [
            "NumberInput (com stepper)",
            "PinInput / OTP (4-6 dígitos, paste handling)",
            "PasswordInput (toggle visibilidade + medidor de força)",
            "PhoneInput (máscara por país)",
            "TimePicker (gêmeo do DatePicker existente)",
            "EditableText (clica e edita inline)",
            "MentionInput (@menções com autocomplete)",
          ],
        },
        {
          id: "15.3",
          title: "Data display avançado",
          scope: [
            "Stat / Metric / KPI (cartão grande com número + delta + sparkline)",
            "Comparison / Pricing table",
            "DiffViewer (texto antes/depois, line-level)",
            "Lightbox (imagem em zoom)",
            "CircularProgress",
          ],
        },
        {
          id: "15.4",
          title: "App shell",
          scope: [
            "Tour / Coachmark (onboarding guiado)",
            "NotificationBell + InboxPanel",
            "CommentThread / Annotations",
            "Snackbar (≠ Toast — ancorado em elemento)",
            "FileUploader avançado (Dropzone só inicia o fluxo — falta lista, retry, preview, progresso)",
          ],
        },
      ],
    },
  ],

  conventions: [
    {
      title: "Commits",
      items: [
        "Formato <area>: <verbo no imperativo>. Ex: 'datatable: adiciona resize de colunas'",
        "PT-BR ou EN, ambos OK desde que consistente dentro da PR",
      ],
    },
    {
      title: "Toda PR de componente novo precisa tocar 8 arquivos",
      items: [
        "src/ds/<Component>.tsx (componente)",
        "src/ds/types.ts (tipos públicos)",
        "src/index.css (estilos)",
        "src/pages/<Component>Page.tsx (doc)",
        "src/lib/routes.ts (entry + numeração)",
        "src/lib/searchIndex.ts (entry de busca)",
        "src/i18n/pt-BR.ts + src/i18n/en.ts (traduções)",
        "src/App.tsx (import + dicionário PAGES)",
      ],
    },
    {
      title: "Página de doc",
      items: [
        "Sempre tem: lead, meta (data + categoria), intro",
        "Exemplos numerados em i., ii., iii. (ordinais romanos minúsculos)",
        "Seção <CompositionSection> no final",
      ],
    },
    {
      title: "Badges de novidade",
      items: [
        "isNew: true na rota durante 1 fase, removido na próxima",
      ],
    },
  ],

  sequence: [
    {
      order: 1,
      phaseRef: "12",
      reason:
        "Editorial / About fecha a identidade do produto. Cinco páginas curtas (about, colophon, credits, license, press-kit) que dão voz ao Atelier sobre si mesmo — tarefa relativamente leve e narrativa.",
    },
    {
      order: 2,
      phaseRef: "14",
      reason:
        "Distribuição (NPM, PWA, SEO, sitemap) só faz sentido quando 12 está estável. Publicar antes congela API imatura.",
    },
    {
      order: 3,
      phaseRef: "15",
      reason:
        "Componentes long-tail por último — decisão consciente. Cada componente novo nasce sobre tokens (9 ✓), hooks (10 ✓), patterns (11 ✓), motion (4 ✓), a11y (6 ✓), DX (13 ✓) e theme tooling (7 ✓) maduros. Evita dívida.",
    },
    {
      order: 4,
      phaseRef: "8 (resto) + 8.7 + 8.8 + 8.9",
      reason: "Dívida técnica e qualidade em background, contínuo durante toda a régua. Sub-fase 8.1 (code splitting) já entregue.",
    },
  ],
};

/* ----------------------------------------------------------------
   Helpers
---------------------------------------------------------------- */

/** Conta itens entregues vs total (delivered + tasks). */
export function countProgress(roadmap: Roadmap = ROADMAP): {
  done: number;
  total: number;
} {
  let done = 0;
  let total = 0;
  for (const phase of roadmap.phases) {
    if (phase.status === "done") {
      const n = phase.delivered?.length ?? 0;
      done += n;
      total += n;
    } else {
      const n = phase.tasks?.length ?? 0;
      total += n;
    }
  }
  return { done, total };
}
