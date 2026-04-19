const ptBR = {
  common: {
    composition: {
      title: "Composição",
      titleB: "árvore",
      kicker: "estrutura",
      caption:
        "Use a [em]composição[/em] a seguir para montar um [em]{root}[/em] — cada nó é um subcomponente exportado.",
      captionAtomic:
        "[em]{root}[/em] é um componente atômico — sem subcomponentes; varia por props.",
    },
    pageNav: {
      label: "Paginação",
      previous: "Anterior",
      next: "Próximo",
    },
    viewCode: "Ver código",
    hideCode: "Ocultar código",
    copy: "Copiar",
    copied: "Copiado",
    cancel: "Cancelar",
    confirm: "Confirmar",
    close: "Fechar",
    save: "Salvar",
    discard: "Descartar",
    subscribe: "Assinar",
    retry: "Tentar novamente",
    back: "Voltar",
    next: "Próximo",
    previous: "Anterior",
    props: "Props",
    prop: "Prop",
    type: "Tipo",
    default: "Padrão",
    example: "Exemplo",
    import: "import",
    collapseSidebar: "Recolher menu",
    expandSidebar: "Expandir menu",
    backToTop: "Voltar ao topo",
  },

  theme: {
    label: "Tema",
    light: "Claro",
    dark: "Escuro",
    switchToLight: "Mudar para o modo claro",
    switchToDark: "Mudar para o modo escuro",
  },

  nav: {
    brand: { title: "Atelier", caption: "Design System · v0.1" },
    groups: {
      start: "Início",
      foundations: "Fundamentos",
      components: "Componentes",
      advanced: "Avançados",
      patterns: "Padrões",
      reference: "Referência",
      studio: "Studio",
    },
    items: {
      overview: "Visão geral",
      principles: "Princípios",
      colors: "Cores",
      typography: "Tipografia",
      spacing: "Espaçamento",
      icons: "Glifos",
      buttons: "Botões",
      inputs: "Campos",
      controls: "Controles",
      badges: "Badges",
      avatars: "Avatares",
      alerts: "Alertas",
      cards: "Cards",
      tabs: "Abas",
      tables: "Tabelas",
      charts: "Gráficos",
      overlays: "Sobreposições",
      feedback: "Feedback",
      dropzone: "Dropzone",
      pagination: "Paginação",
      breadcrumbs: "Breadcrumbs",
      skeleton: "Skeleton",
      popover: "Popover",
      dropdownMenu: "Dropdown Menu",
      contextMenu: "Context Menu",
      drawer: "Drawer",
      toaster: "Toaster",
      combobox: "Combobox",
      slider: "Range Slider",
      forms: "Formulários",
      stepper: "Stepper",
      emptyStates: "Estados vazios",
      sidebar: "Sidebar",
      navbar: "Navbar",
      accessibility: "Acessibilidade",
      code: "Para devs · código",
      create: "Create · personalizar",
    },
    descriptions: {
      overview: "A capa do manual — o que vem pela frente.",
      principles: "As seis regras que regem o estilo editorial.",
      colors: "Quatro famílias: superfícies, tinta, acento, semânticas.",
      typography: "Voz editorial em Fraunces e JetBrains Mono.",
      spacing: "Escala 8pt e o grid de doze colunas.",
      icons: "Doze glifos tipográficos — não ícones de UI.",
      buttons: "Primário, ghost, link e variantes.",
      inputs: "Campos, textareas e selects com hint e erro.",
      controls: "Checkbox, radio e switch.",
      badges: "Pequenos selos de estado e categoria.",
      avatars: "Iniciais, imagem ou SVG — solo ou em grupo.",
      alerts: "Mensagens com ícone, título e ação.",
      cards: "Blocos editoriais com kicker, título, corpo, rodapé.",
      tabs: "Painéis empilhados com transição discreta.",
      tables: "Cabeçalho mono, corpo serif — leitura editorial.",
      charts: "Bar, line, area, pie, radar, radial e sparkline.",
      overlays: "Diálogos e tooltips sobre o conteúdo.",
      feedback: "Toast e progress — sinais discretos.",
      dropzone: "Upload de arquivo com preview de metadados.",
      pagination: "Paginar listas e tabelas — anterior/próximo + páginas.",
      breadcrumbs: "Trilha de onde o leitor está no mapa do site.",
      skeleton: "Placeholders editoriais para estados de loading.",
      popover: "Painel posicionado ancorado a um trigger — base de dropdowns, tooltips ricos e mais.",
      dropdownMenu: "Menu de ações com items, separadores, checkbox/radio e shortcuts.",
      contextMenu: "Menu disparado pelo clique direito — abre nas coordenadas do cursor.",
      drawer: "Modal lateral que desliza de um dos quatro lados — sheets, painéis de configuração.",
      toaster: "Sistema de notificações com queue, auto-dismiss e cinco variantes semânticas.",
      combobox: "Select com input de busca em tempo real, multi-select, grupos e teclado completo.",
      slider: "Slider numérico com 1 ou 2 handles, marks, vertical e suporte total a teclado.",
      forms: "Composição completa: campos, divisores e ações.",
      stepper: "Indicador de progresso multi-etapa para forms longos.",
      emptyStates: "Convites, não derrotas — espaço com intenção.",
      sidebar: "Sumário vertical para sites com muitas páginas.",
      navbar: "Cabeçalho horizontal com dropdowns por hover.",
      accessibility: "Atalhos, foco, contraste e ARIA.",
      code: "Tokens, primitivas e API para desenvolvedores.",
      create: "Construa seu tema ao vivo e exporte os tokens.",
    },
    footer: {
      study: "Um estudo silencioso",
      stack: "React · Vite · 2026",
      language: "Idioma",
      theme: "Tema",
    },
    mode: {
      label: "Navegação",
      sidebar: "Lateral",
      navbar: "Superior",
    },
    settings: {
      label: "Configurações",
      kicker: "preferências",
      title: "Configurações",
    },
    layout: {
      toWide: "Expandir para largura total",
      toBoxed: "Voltar à largura padrão",
    },
    newBadge: "Novo",
    navLabel: "Navegação principal",
  },

  /* ============================================================ */
  /* Labels usados internamente por componentes do DS (aria-label, etc.) */
  ds: {
    pagination: {
      label: "Paginação",
      previous: "Anterior",
      next: "Próximo",
    },
    breadcrumbs: {
      label: "Trilha de navegação",
    },
  },

  /* ============================================================ */
  /* Acessibilidade (skip link, etc.) */
  accessibility: {
    skipLink: "Pular para o conteúdo",
  },

  /* ============================================================ */
  /* Search Palette (⌘K) — global, fora de `nav` por isso */
  search: {
    title: "Buscar",
    trigger: "Buscar",
    placeholder: "Buscar páginas, componentes, cores...",
    empty: "Nada encontrado para",
    groups: {
      pages: "Páginas",
      components: "Componentes",
      tokens: "Cores · Tokens",
    },
    foot: {
      navigate: "navegar",
      select: "abrir",
      close: "fechar",
    },
  },

  /* ============================================================ */
  footer: {
    navLabel: "Navegação de rodapé",
    socialLabel: "Redes sociais",
    tagline: "Um manual silencioso para interfaces editoriais.",
    stack: "React · Vite · 2026",
    copyright: "Atelier · feito com cuidado",
    groups: {
      foundations: "Fundamentos",
      components: "Componentes",
      patterns: "Padrões",
      atelier: "Ateliê",
    },
    links: {
      /* foundations */
      principles: "Princípios",
      colors: "Cores",
      typography: "Tipografia",
      spacing: "Espaçamento",
      icons: "Glifos",
      /* components */
      buttons: "Botões",
      inputs: "Campos",
      avatars: "Avatares",
      badges: "Badges",
      cards: "Cards",
      tables: "Tabelas",
      /* patterns */
      forms: "Formulários",
      empty_states: "Estados vazios",
      sidebar: "Sidebar",
      navbar: "Navbar",
      dropzone: "Dropzone",
      /* atelier */
      overview: "Visão geral",
      code: "Para devs · código",
    },
    social: {
      github: "https://github.com/",
      linkedin: "https://www.linkedin.com/in/joniguerini/",
    },
  },

  /* ============================================================ */
  pages: {
    /* ------------- Overview ------------- */
    overview: {
      lead: "Atelier · Um manual silencioso",
      titleA: "Um design system [acc]editorial[/acc],",
      titleB: "feito para respirar.",
      metaLabel: "Edição",
      meta: "Nº 01 · 2026",
      intro:
        "[em]Atelier[/em] é uma coleção enxuta de princípios, fundamentos e componentes. Pensado como uma revista de arquitetura — margens generosas, tipos vivos, gestos precisos. Nada estridente. Nada supérfluo.",
      cards: [
        {
          kicker: "I · Fundamentos",
          titleA: "A matéria-",
          titleB: "prima",
          body:
            "Cores, tipografia, espaçamento, grid e glifos. A espinha silenciosa sobre a qual tudo se apoia.",
          cta: "Explorar cores",
          to: "colors",
        },
        {
          kicker: "II · Componentes",
          titleA: "Os ",
          titleB: "instrumentos",
          body:
            "Botões, campos, cartões, alertas, abas — cada um refinado e previsível. Sem decorações gratuitas.",
          cta: "Ver componentes",
          to: "buttons",
        },
        {
          kicker: "III · Padrões",
          titleA: "As ",
          titleB: "composições",
          body:
            "Formulários, estados vazios, navegação. Receitas para combinar bem aquilo que já está pronto.",
          cta: "Ver padrões",
          to: "forms",
        },
      ],
      indexLabel: "índice",
      quickStartKicker: "Começo rápido",
      quickStartBody:
        "Comece pela [em]Visão dos princípios[/em] para entender a filosofia, ou salte direto para componentes se já está implementando.",
      readPrinciples: "Ler os princípios",
      goComponents: "Ir para componentes",
      forDevs: "Para devs · código →",
      glanceKicker: "Em um olhar",
      badges: {
        react: "React 18",
        vite: "Vite 5",
        fraunces: "Fraunces",
        mono: "JetBrains Mono",
        editorial: "Editorial",
        a11y: "Acessível",
        light: "Sem dependências pesadas",
      },
      quote: "“Boa tipografia é invisível. Boa interface, também.”",
      quoteAuthor: "— o manifesto",
    },

    /* ------------- Principles ------------- */
    principles: {
      lead: "I · O manifesto",
      titleA: "Seis [acc]princípios[/acc] que",
      titleB: "guiam cada decisão.",
      metaLabel: "Capítulo",
      meta: "Princípios",
      intro:
        "Um sistema é tão consistente quanto as convicções que o sustentam. Estas são as nossas — [em]curtas, obstinadas e revisitadas a cada edição[/em].",
      sectionTitleA: "Os ",
      sectionTitleB: "seis",
      sectionKicker: "manifesto",
      items: [
        {
          n: "01",
          title: "Silêncio como default",
          body:
            "Interface não é vitrine. A cor mais ruidosa — o vermelho — é usada com parcimônia, como anotação à margem. Tudo começa em repouso.",
        },
        {
          n: "02",
          title: "Tipografia antes de pixels",
          body:
            "A hierarquia é tipográfica, não cromática. Tamanho, itálico e espaço fazem o trabalho pesado. Cores apenas confirmam o que a fonte já disse.",
        },
        {
          n: "03",
          title: "Ângulos retos",
          body:
            "Nenhum border-radius. Nenhuma sombra. A geometria é editorial: papel, tinta, régua. A interface lembra um caderno bem encadernado.",
        },
        {
          n: "04",
          title: "Medida humana",
          body:
            "Colunas máximas de 1080px. Linhas nunca ultrapassam 70 caracteres. O olho precisa descansar entre as palavras.",
        },
        {
          n: "05",
          title: "Gestos previsíveis",
          body:
            "Cada animação dura entre 120 e 320 ms, com easing único. O movimento é discreto — confirma ações, não as anuncia.",
        },
        {
          n: "06",
          title: "Acessível por construção",
          body:
            "Contraste mínimo de 4.5:1 no corpo de texto. Focos visíveis. Componentes navegáveis por teclado. Tudo como deveria ser.",
        },
      ],
    },

    /* ------------- Colors ------------- */
    colors: {
      lead: "Fundamento · 02",
      titleA: "A ",
      titleB: "paleta",
      metaLabel: "Tokens",
      meta: "19 cores",
      intro:
        "Quatro famílias: [em]superfícies[/em] para apoiar o olho, [em]tinta[/em] para o conteúdo, [em]acento[/em] para pontuar, e [em]semânticas[/em] para estados. Nada mais.",
      copyToken: "Copiar token {token}",
      copyHex: "Copiar {hex}",
      sections: {
        theme: {
          num: "i",
          title: "Tema",
          kicker: "light · dark",
          desc:
            "Tokens [acc]cromáticos[/acc] são organizados em camadas: invariantes (espaço, tipografia, motion) e cromáticos (por tema). Na primeira visita, o tema inicial segue o [em]prefers-color-scheme[/em] do sistema; depois disso, sua escolha prevalece e é preservada. Abaixo, as paletas se apresentam em ambos os modos — o hex em destaque é o [em]ativo[/em]; o secundário é o par oposto.",
        },
        surface: {
          num: "ii",
          title: "Superfícies",
          kicker: "backgrounds",
          desc:
            "O fundo é papel, não tela. Um creme quente que suaviza o contraste e imita o descanso do impresso.",
        },
        ink: {
          num: "iii",
          title: "Tinta",
          kicker: "typography",
          desc:
            "Quatro níveis de presença — do título impositivo ao metadado quase apagado.",
        },
        accent: {
          num: "iv",
          title: "Acento",
          kicker: "emphasis",
          desc:
            "Usado como anotação em vermelho — bordas de foco, numerais editoriais, pontuação pontual. Nunca em grandes áreas.",
        },
        semantic: {
          num: "v",
          title: "Semânticas",
          kicker: "status",
          desc:
            "Pares (ink + soft) para comunicar sucesso, alerta, perigo e informação sem alterar o tom da página.",
        },
      },
      swatches: {
        paper: "Papel",
        panel: "Painel",
        sunken: "Afundado",
        inverse: "Inverso",
        ink: "Tinta",
        inkSoft: "Tinta suave",
        inkFaint: "Tinta tênue",
        inkInverse: "Tinta inversa",
        accent: "Acento",
        accentInk: "Acento tinta",
        accentSoft: "Acento suave",
        success: "Sucesso",
        successSoft: "Sucesso suave",
        warning: "Atenção",
        warningSoft: "Atenção suave",
        danger: "Perigo",
        dangerSoft: "Perigo suave",
        info: "Info",
        infoSoft: "Info suave",
      },
    },

    /* ------------- Typography ------------- */
    typography: {
      lead: "Fundamento · 03",
      titleA: "A ",
      titleB: "tipografia",
      metaLabel: "Famílias",
      meta: "Fraunces · JetBrains Mono",
      intro:
        "Duas famílias fazem todo o trabalho. [em]Fraunces[/em] para leitura e ênfase, [em]JetBrains Mono[/em] para metadados e código. O itálico é a única decoração permitida.",
      specimensTitle: "Especimens",
      specimensKicker: "hierarchy",
      scaleTitle: "Escala",
      scaleKicker: "ratios",
      scaleDesc:
        "Proporção perfect-fifth (1.5) para a serifada, reduzida para passos discretos na monoespaçada. Nunca mais de seis níveis por tela.",
      specimens: {
        display: {
          meta: "Display",
          weight: "300 · italic optional",
          textA: "A ",
          textB: "manhã",
          textC: " começa no título.",
        },
        headline: {
          meta: "Headline",
          weight: "300",
          textA: "Os silêncios também ",
          textB: "têm",
          textC: " voz.",
        },
        title: {
          meta: "Title",
          weight: "300",
          text: "Um parágrafo bem respirado convida o leitor.",
        },
        body: {
          meta: "Body serif",
          weight: "400",
          text:
            "A tipografia do Atelier apoia-se em Fraunces — um serif moderno com formas vivas, optical sizing e um itálico expressivo usado apenas em ênfase.",
        },
        caption: {
          meta: "Caption",
          weight: "500 · uppercase",
          text: "Metadado · rodapé · etiqueta",
        },
        mono: { meta: "Mono inline", weight: "400", text: "--accent: #c8361d;" },
      },
    },

    /* ------------- Spacing ------------- */
    spacing: {
      lead: "Fundamento · 04",
      titleA: "O ",
      titleB: "espaço",
      metaLabel: "Base",
      meta: "8pt",
      intro:
        "Toda medida é múltipla de 4 — com preferência por 8. O espaço é o principal [em]material[/em] de composição: respira o layout e dita o ritmo da leitura.",
      scaleTitle: "Escala",
      scaleKicker: "8pt grid",
      gridTitle: "Grid editorial",
      gridKicker: "12 columns",
      gridDesc:
        "Uma coluna máxima de 1080px sobre 12 subcolunas. Calhas de 24px. O conteúdo respeita margens generosas em todas as direções.",
      rulesTitle: "Regras de uso",
      rulesKicker: "rhythm",
      rules: [
        {
          n: "I",
          t: "Dentro de um componente",
          b:
            "Use 4–12px. Nunca mais. O componente deve parecer um objeto coeso.",
        },
        {
          n: "II",
          t: "Entre componentes",
          b:
            "Use 16–32px. O espaço separa sem dividir — como parágrafos em um ensaio.",
        },
        {
          n: "III",
          t: "Entre seções",
          b: "Use 48–96px. A mudança de assunto pede pausa. Ofereça pausa.",
        },
      ],
    },

    /* ------------- Icons ------------- */
    icons: {
      lead: "Fundamento · 05",
      titleA: "Os ",
      titleB: "glifos",
      metaLabel: "Biblioteca",
      meta: "Apenas o essencial",
      intro:
        "Usamos glifos tipográficos antes de ícones desenhados. Caracteres Unicode renderizados em Fraunces carregam a mesma linguagem do texto — [em]menos ruído, mais coesão[/em].",
      repertoireTitle: "Repertório",
      repertoireKicker: "unicode",
      contextTitle: "Em contexto",
      contextKicker: "inline usage",
      contextDesc:
        "Em meio ao texto, o glifo deve ter o mesmo peso tipográfico. Em destaque (numerais, setas editoriais), aceita o acento em vermelho.",
      contextPhrase: "Continue lendo",
      contextPhraseB: " avance para a próxima seção. Ou volte ",
      contextPhraseC: " ao topo.",
      names: {
        arrow: "seta",
        enter: "retornar",
        close: "fechar",
        add: "adicionar",
        remove: "remover",
        more: "mais",
        section: "seção",
        paragraph: "parágrafo",
        check: "confirmar",
        alert: "alertar",
        info: "info",
        help: "ajuda",
      },
    },

    /* ------------- Buttons ------------- */
    buttons: {
      lead: "Componente · 06",
      titleA: "Os ",
      titleB: "botões",
      metaLabel: "Variantes",
      meta: "5 · 3 tamanhos",
      intro:
        "O botão é o gesto. Cinco variantes cobrem da chamada principal ao link discreto. Todos em caixa alta, monoespaçados, sem arredondar — [em]clicáveis à primeira vista[/em].",
      variants: { title: "Variantes", kicker: "hierarchy", caption: "Cinco variantes" },
      sizes: { title: "Tamanhos", kicker: "sm · md · lg", caption: "Três tamanhos" },
      states: { title: "Estados", kicker: "hover · disabled", caption: "Desabilitado e focado" },
      glyphs: {
        titleA: "Com ",
        titleB: "glifo",
        kicker: "inline mark",
        caption: "Glifos tipográficos",
      },
      group: {
        title: "Em um grupo",
        kicker: "actions row",
        caption: "Barra de ações",
      },
      sidebarToggle: {
        title: "Recolher a navegação",
        kicker: "sidebar toggle",
        caption: "Dois estados, um gesto",
        note:
          "O [acc]SidebarToggle[/acc] é um botão dedicado para retrair o menu lateral. Ele é [em]totalmente controlado[/em] — recebe [em]collapsed[/em] e [em]onToggle[/em]. O chevron gira 180° quando a sidebar está recolhida. Use [em]Ctrl + B[/em] para alternar sem tirar as mãos do teclado.",
      },
      backToTop: {
        title: "Voltar ao topo",
        kicker: "back to top",
        caption: "Aparece depois do scroll",
        note:
          "O [acc]BackToTop[/acc] é [em]autocontido[/em]: observa o scroll e aparece com fade suave depois de [em]threshold[/em] pixels (padrão 320). Ao clicar, rola a página até o topo — com [em]smooth scroll[/em] ou instantâneo, conforme a preferência do sistema. Está sempre presente nesta página; role para baixo para vê-lo surgir no canto inferior-direito.",
      },
      labels: {
        primary: "Confirmar",
        secondary: "Secundário",
        accent: "Ação em destaque",
        ghost: "Fantasma",
        link: "Link editorial",
        sm: "Pequeno",
        md: "Médio",
        lg: "Grande",
        active: "Ativo",
        disabled: "Desabilitado",
        next: "Avançar",
        newItem: "Novo item",
        download: "Baixar",
        cancel: "Cancelar",
        draft: "Rascunho",
        publish: "Publicar",
      },
    },

    /* ------------- Inputs ------------- */
    inputs: {
      lead: "Componente · 07",
      titleA: "Os ",
      titleB: "campos",
      metaLabel: "Tipos",
      meta: "Input · Textarea · Select",
      intro:
        "Campos silenciosos — bordas suaves até receberem o foco. Nenhum truque; apenas um fio fino e legível que se torna [em]vermelho[/em] quando há atenção.",
      text: { title: "Texto", kicker: "input", caption: "Input padrão" },
      textarea: {
        title: "Áreas de texto",
        kicker: "textarea",
        caption: "Para conteúdo longo",
      },
      select: { title: "Seleção", kicker: "select", caption: "Listas suspensas" },
      labels: {
        fullName: "Nome completo",
        fullNameHint: "Como gostaria de ser chamado?",
        fullNamePh: "Clara Almeida",
        email: "E-mail",
        emailHint: "Endereço válido e único",
        emailError: "E-mail inválido.",
        disabled: "Desabilitado",
        disabledValue: "Não é possível editar",
        about: "Sobre você",
        aboutHint: "Máximo 280 caracteres.",
        aboutPh: "Uma linha, um parágrafo, um ensaio breve…",
        edition: "Edição",
        format: "Formato",
        formatOpts: ["Revista", "Jornal", "Livro"],
      },
    },

    /* ------------- Controls ------------- */
    controls: {
      lead: "Componente · 08",
      titleA: "Os ",
      titleB: "controles",
      metaLabel: "Binários",
      meta: "Checkbox · Radio · Switch",
      intro:
        "Toque único, resposta imediata. Os controles vestem a mesma geometria dos campos — bordas retas, marcadores sólidos em [em]vermelho[/em] quando ativos.",
      check: {
        title: "Caixas de seleção",
        kicker: "checkbox",
        caption: "Múltipla escolha",
      },
      radio: {
        title: "Botões de rádio",
        kicker: "radio",
        caption: "Escolha única",
      },
      switch: {
        title: "Interruptores",
        kicker: "switch",
        caption: "Alternância discreta",
      },
      labels: {
        monthly: "Aceito receber a edição mensal",
        early: "Quero acesso antecipado a rascunhos",
        disabled: "Desabilitado",
        uncheckedDisabled: "Desmarcado e desabilitado",
        plans: [
          "Mensal — R$ 29",
          "Trimestral — R$ 79",
          "Anual — R$ 279",
        ],
        emailNotif: "Notificações por e-mail",
        quietMode: "Modo silencioso",
      },
    },

    /* ------------- Badges ------------- */
    badges: {
      lead: "Componente · 09",
      titleA: "Os ",
      titleB: "badges",
      metaLabel: "Pequeno",
      meta: "Apenas o rótulo",
      intro:
        "Etiquetas monoespaçadas em caixa alta. Servem para classificar, nunca para decorar. Um [em]ponto[/em] à esquerda indica estado ativo.",
      variants: {
        title: "Variantes",
        kicker: "status",
        caption: "Uma família, vários tons",
      },
      dot: {
        titleA: "Com ",
        titleB: "ponto",
        kicker: "live state",
        caption: "Indicador de presença",
      },
      context: {
        title: "Em contexto",
        kicker: "inline",
        caption: "Junto ao título de um artigo",
      },
      labels: {
        default: "Padrão",
        solid: "Sólido",
        accent: "Em destaque",
        ok: "Sucesso",
        warn: "Atenção",
        info: "Info",
        published: "Publicado",
        draft: "Rascunho",
        edited: "Editado",
        archived: "Arquivado",
        new: "Novo",
      },
      contextTitleA: "A ",
      contextTitleB: "manhã",
      contextTitleC: " começa no título",
      contextDate: "18 · abr",
    },

    /* ------------- Avatars ------------- */
    avatars: {
      lead: "Componente · 10",
      titleA: "Os ",
      titleB: "avatares",
      metaLabel: "Identidade",
      meta: "Retrato · presets · upload",
      intro:
        "Um [em]avatar[/em] é o retrato silencioso de quem escreve — iniciais, uma imagem pessoal ou um preset do ateliê. Diversas formas, um mesmo tom.",
      variants: {
        title: "Variantes",
        kicker: "base state",
        caption: "Três tons tipográficos",
      },
      sizes: {
        title: "Tamanhos",
        kicker: "scale",
        caption: "Do glifo discreto ao retrato editorial",
      },
      image: {
        title: "Com imagem",
        kicker: "photographic",
        caption: "Upload direto, com fallback para iniciais",
      },
      presets: {
        title: "Presets do ateliê",
        kicker: "pronto para usar",
        caption: "Monogramas, formas e ornamentos",
      },
      picker: {
        title: "Seletor completo",
        kicker: "upload + crop + galeria",
        caption: "Envie uma foto, enquadre, ou escolha um preset",
        currentLabel: "Atual",
        stateImage: "Imagem personalizada",
        statePreset: "Preset do ateliê",
        stateInitials: "Apenas iniciais",
        remove: "Remover e voltar para iniciais",
        uploadA: "Arraste uma ",
        uploadB: "imagem",
        uploadC: " ou clique para escolher",
        uploadHint: "PNG, JPG, SVG · até alguns MB",
        zoom: "Zoom",
        cancel: "Cancelar",
        apply: "Aplicar",
        groups: {
          monogram: "Monogramas",
          geometric: "Geométricos",
          ornament: "Ornamentos",
        },
      },
      group: {
        title: "Grupo de avatares",
        kicker: "stack",
        caption: "Até quatro visíveis; o excedente vira contador",
      },
    },

    /* ------------- Alerts ------------- */
    alerts: {
      lead: "Componente · 11",
      titleA: "Os ",
      titleB: "alertas",
      metaLabel: "Variantes",
      meta: "4 tons",
      intro:
        "Mensagens estáticas em bloco, para o texto que precisa ser lido com atenção. Uma barra colorida à esquerda e um glifo sinalizam o [em]assunto[/em] sem gritar.",
      info: {
        title: "Informação",
        kicker: "info",
        caption: "Cor fria, leitura calma",
        alertTitle: "Sobre esta edição",
        alertText:
          "O Atelier publica uma edição por trimestre. Você pode assinar pela sidebar para receber uma carta breve no dia do lançamento.",
      },
      ok: {
        title: "Sucesso",
        kicker: "ok",
        caption: "Ação bem concluída",
        alertTitle: "Rascunho publicado",
        alertText:
          "Seu artigo foi publicado na edição de abril. Obrigado por escrever com a gente.",
      },
      warn: {
        title: "Atenção",
        kicker: "warn",
        caption: "Algo precisa da sua revisão",
        alertTitle: "Três imagens sem legenda",
        alertText:
          "Antes de publicar, recomendamos adicionar legendas às imagens destacadas. O editor continuará funcionando normalmente.",
      },
      danger: {
        title: "Perigo",
        kicker: "danger",
        caption: "Algo impediu a ação",
        alertTitle: "Não foi possível salvar",
        alertText:
          "Perdemos a conexão com o servidor no meio do envio. Nenhuma alteração foi perdida — tente novamente quando a rede voltar.",
      },
    },

    /* ------------- Cards ------------- */
    cards: {
      lead: "Componente · 12",
      titleA: "Os ",
      titleB: "cartões",
      metaLabel: "Blocos",
      meta: "Conteúdo tabular",
      intro:
        "Um cartão é um [em]parágrafo dentro de uma página[/em]: tem kicker, título, corpo e rodapé. Sempre retangular, sempre sobre papel.",
      editorial: {
        title: "Padrão editorial",
        kicker: "kicker · title · body",
        caption: "Três cartões em grade",
      },
      actions: {
        titleA: "Com ",
        titleB: "ações",
        kicker: "actionable",
        caption: "Cartão com CTA",
      },
      profile: {
        title: "Perfil",
        kicker: "avatar + meta",
        caption: "Autor em destaque",
      },
      items: [
        {
          kicker: "Crônica · 04",
          titleA: "Sobre o ",
          titleB: "silêncio",
          titleC: " das interfaces",
          body:
            "Há uma diferença entre quieto e vazio. Nem toda pausa pede ruído para ser preenchida — às vezes, o espaço [em]é[/em] o conteúdo.",
          foot: "Por Clara A. · 5 min",
        },
        {
          kicker: "Ensaio · 02",
          titleA: "A serifa e o seu ",
          titleB: "lugar",
          titleC: "",
          body:
            "Fraunces é uma carta de amor aos tipos do século XIX, escrita com vocabulário de 2026. Um serif moderno que aceita voltas italianas.",
          foot: "Por J. Mesquita · 8 min",
        },
        {
          kicker: "Manual · 01",
          titleA: "Cinco ",
          titleB: "regras",
          titleC: " para uma régua",
          body:
            "Uma medida coerente transforma bom trabalho em trabalho comparável. Começamos pelo 8pt — depois, negociamos.",
          foot: "Por Atelier Team · 3 min",
        },
      ],
      subscription: {
        kicker: "Assinatura · anual",
        titleA: "Atelier, ",
        titleB: "todo trimestre",
        body:
          "Quatro edições impressas, o acervo digital completo e um convite para o encontro anual de leitores.",
        price: "R$ 279 / ano",
        cta: "Assinar",
      },
      author: {
        role: "Editor-chefe",
        nameA: "Joaquim ",
        nameB: "Álvaro",
        active: "Ativo",
        count: "12 artigos",
      },
    },

    /* ------------- Tabs ------------- */
    tabs: {
      lead: "Componente · 13",
      titleA: "As ",
      titleB: "abas",
      metaLabel: "Navegação",
      meta: "5 variantes · 2 orientações",
      intro:
        "Abas para alternar visões dentro de uma única página. A cor [em]vermelha[/em] marca o presente — o resto é silêncio. Cinco variantes para diferentes níveis de [em]ênfase visual[/em].",
      tabs: {
        foundations: {
          label: "Fundamentos",
          body:
            "Cores, tipografia e espaçamento. A espinha silenciosa sobre a qual tudo se apoia — o resto é orquestração.",
        },
        components: {
          label: "Componentes",
          body:
            "Instrumentos refinados. Cada um tem uma única função clara e responde previsivelmente aos mesmos estímulos.",
        },
        patterns: {
          label: "Padrões",
          body:
            "Como compor instrumentos em peças maiores — formulários, navegações, estados vazios. Receitas, não regras.",
        },
      },
      variants: {
        underline: {
          title: "Sublinhado",
          kicker: "default · canon",
          desc:
            "A variante padrão e mais discreta. Linha [em]accent[/em] embaixo do ativo, divisor sutil. Usada nas docs do Atelier inteiro.",
          caption: "Tabs sublinhadas — fiel ao DNA editorial",
        },
        enclosed: {
          title: "Envolvidas",
          kicker: "enclosed",
          desc:
            "Abas com bordas conectadas ao painel embaixo. Visual de [em]pastas/cadernos[/em] físicos — mais corpóreo, ideal para áreas de configuração.",
          caption: "Tabs envolvidas — para contextos densos",
        },
        pills: {
          title: "Pílulas",
          kicker: "pills",
          desc:
            "Tab ativo com fundo accent + texto inverso. [em]Ângulos retos[/em] (sem radius) preservam o canon. Ideal para alternar entre poucos modos com forte ênfase.",
          caption: "Pílulas — ênfase máxima no ativo",
        },
        segmented: {
          title: "Segmentadas",
          kicker: "segmented",
          desc:
            "Todos os tabs em uma [em]caixa única[/em], divididos por linhas internas. Mesma linguagem do ThemeToggle e NavModeToggle. Para 2-4 opções de mesma importância.",
          caption: "Segmented control — visual de toggle",
        },
        minimal: {
          title: "Mínimas",
          kicker: "minimal",
          desc:
            "Só texto. O ativo se distingue pela [em]cor accent[/em] e peso ligeiramente mais firme. Para listas longas onde os indicadores visuais distrairiam.",
          caption: "Mínimas — silêncio absoluto",
        },
        vertical: {
          title: "Orientação vertical",
          kicker: "orientation=\"vertical\"",
          desc:
            "TabList vira coluna na esquerda; o painel ocupa a direita. Funciona com [em]qualquer variante[/em] — útil em painéis de configuração e sub-páginas.",
          caption: "Tabs verticais — sidebar interna",
        },
        extras: {
          title: "Glifos e contadores",
          kicker: "glyph + count",
          desc:
            "Cada Tab aceita opcionalmente um [em]glyph[/em] (símbolo serifado antes do label) e um [em]count[/em] (badge mono depois). Use com parcimônia.",
          caption: "Tabs com glifo e contador",
        },
      },
    },

    /* ------------- Tables ------------- */
    tables: {
      lead: "Componente · 14",
      titleA: "As ",
      titleB: "tabelas",
      metaLabel: "Dados",
      meta: "Denso mas respirável",
      intro:
        "Tabelas serifadas com metadados em mono. Sem zebrado — confiamos na [em]linha[/em] para separar os dados. O hover é a única surpresa.",
      standardTitle: "Estrutura padrão",
      standardKicker: ".ds-table",
      standardCaption: "Lista de artigos",
      headers: { n: "Nº", title: "Título", author: "Autor", state: "Estado", date: "Data" },
      states: { published: "Publicado", draft: "Rascunho", review: "Revisão" },
      readCta: "Ler →",
      rows: [
        { n: "001", title: "A manhã começa no título", author: "Clara A.",    stateKey: "published", date: "18 · abr" },
        { n: "002", title: "Sobre o silêncio das interfaces", author: "J. Mesquita", stateKey: "draft", date: "14 · abr" },
        { n: "003", title: "A serifa e o seu lugar", author: "Ana L.", stateKey: "review", date: "09 · abr" },
        { n: "004", title: "Cinco regras para uma régua", author: "Atelier", stateKey: "published", date: "02 · abr" },
      ],
    },

    /* ------------- Charts ------------- */
    charts: {
      lead: "Componente · 15",
      titleA: "Os ",
      titleB: "gráficos",
      metaLabel: "Visualização",
      meta: "Dados em silêncio",
      intro:
        "Quando os números precisam ser ditos, [em]diga-os baixinho[/em]. Cada gráfico do Atelier é editorial — sem grids pesadas, sem áreas saturadas. O acento é usado [em]uma vez[/em] para marcar o que importa; o resto se apaga em [em]tinta fraca[/em].",
      gallery: {
        title: "Galeria",
        kicker: "explore",
      },
      tabs: {
        bar: "Bar",
        line: "Line",
        area: "Area",
        pie: "Pie · Donut",
        radar: "Radar",
        radial: "Radial",
        tooltips: "Tooltips",
      },
      units: {
        editions: "edições",
        subscribers: "assinantes",
        visits: "visitas",
        reads: "leituras",
        engagement: "engajamento",
        bounce: "rejeição",
      },
      bar: {
        var1: "Crescimento mensal",
        var2: "Trimestres do ano",
        var3: "Visitas na semana",
        var4: "Estabilidade — com valores",
      },
      line: {
        var1: "Crescimento — 8 meses",
        var2: "Decaimento contínuo",
        var3: "Oscilação (sem dots)",
        var4: "Ano completo",
      },
      area: {
        var1: "Crescimento com volume",
        var2: "Estável — base alta",
        var3: "Oscilação intensa",
      },
      pie: {
        var1: "Pizza com legenda",
        var2: "Donut com total",
        var3: "Cobertura binária",
        var4: "Donut binário",
      },
      radar: {
        var1: "Perfil único",
        var2: "Comparação de duas marcas",
      },
      radial: {
        var1: "Múltiplas métricas",
        var2: "Conclusão única",
        average: "Média",
        completion: "Concluído",
      },
      tooltips: {
        intro:
          "Todos os gráficos respondem ao mouse. O bloco de tooltip [em]segue exatamente o estilo do `Tooltip` do Atelier[/em] — uma linha mono, paleta inversa, sem cromo extra. Use estas variações para ver o comportamento em cada tipo.",
        var1: "Tooltip simples (label · valor)",
        var2: "Tooltip com unidade",
        var3: "Linha — guia vertical pontilhada",
        var4: "Pizza — destaque por opacidade",
      },
      spark: {
        title: "Sparkline",
        kicker: "métrica",
        caption: "Gráfico minúsculo, ao lado de uma métrica — direção sem narrativa.",
        metric1Label: "Edição corrente",
        metric2Label: "Assinantes",
        metric3Label: "Próxima",
      },
      composition: {
        title: "Composição",
        titleB: "árvore",
        kicker: "estrutura",
        caption:
          "Use a [em]composição[/em] a seguir para envolver qualquer gráfico do Atelier — cada nó é um subcomponente exportado.",
      },
    },

    /* ------------- Overlays ------------- */
    overlays: {
      lead: "Componente · 16",
      titleA: "As ",
      titleB: "sobreposições",
      metaLabel: "Foco",
      meta: "Modal · Tooltip",
      intro:
        "Interrompem a leitura com cerimônia. Um [em]modal[/em] pede atenção total; um [em]tooltip[/em] apenas sussurra contexto.",
      modal: {
        title: "Modal",
        kicker: ".ds-modal",
        caption: "Bloqueia o fundo e recebe o foco",
        open: "Abrir modal",
        titleA: "Descartar ",
        titleB: "rascunho",
        titleC: "?",
        body:
          "Seu rascunho será removido do Atelier e não poderá ser recuperado. Esta é uma ação definitiva — pausamos um instante para ter certeza de que é mesmo o que você quer.",
      },
      tooltip: {
        title: "Tooltip",
        kicker: ".ds-tt",
        caption: "Contexto em hover / foco",
        copy: "Copiar",
        copyTip: "Copiar para a área de transferência",
        download: "Baixar",
        downloadTip: "Baixar como arquivo",
        publish: "Publicar",
        publishTip: "Esta ação é permanente",
      },
    },

    /* ------------- Feedback ------------- */
    feedback: {
      lead: "Componente · 17",
      titleA: "O ",
      titleB: "retorno",
      metaLabel: "Progresso · Toast",
      meta: "Respostas discretas",
      intro:
        "Feedback é gentileza. Barras finas para tempo, mensagens breves que aparecem e [em]desaparecem[/em].",
      progress: {
        title: "Barra de progresso",
        kicker: ".ds-progress",
        caption: "Progresso determinado",
        label: "Enviando arquivo",
        finish: "Concluir",
        reset: "Reiniciar",
      },
      toast: {
        title: "Toast",
        kicker: ".ds-toast",
        caption: "Mensagem fugaz",
        confirm: "Mostrar confirmação",
        save: "Salvar rascunho",
        simulate: "Simular erro",
        copied: "Copiado para a área de transferência",
        saved: "Rascunho salvo",
        lost: "Conexão perdida",
      },
    },

    /* ------------- Dropzone ------------- */
    dropzone: {
      lead: "Componente · 18",
      titleA: "O ",
      titleB: "dropzone",
      metaLabel: "Arquivos",
      meta: "Drag & drop",
      intro:
        "A origem deste design system foi um pequeno conversor de CSV. Aqui fica preservado o componente que lhe deu forma: um [em]dropzone[/em] tipográfico, editorial.",
      empty: {
        title: "Vazio",
        kicker: "idle state",
        caption: "Cursor convidativo, área tracejada",
        dragA: "Arraste um ",
        dragB: "arquivo",
        dragC: " aqui",
        orPick: "ou clique para escolher",
      },
      filled: {
        title: "Com arquivo",
        kicker: "filled state",
        caption: "Cartão de arquivo selecionado",
        size: "Tamanho",
        type: "Tipo",
        modified: "Modificado",
        reset: "Remover e recomeçar",
        defaultType: "texto/plano",
        hint: "Escolha um arquivo na seção acima para visualizar este estado.",
      },
    },

    /* ------------- Pagination ------------- */
    pagination: {
      lead: "Componente · 19",
      titleA: "A ",
      titleB: "paginação",
      metaLabel: "Lista longa",
      meta: "Paginar listas e tabelas",
      intro:
        "Diferente do [em]PageNav[/em] (que conduz o leitor entre capítulos do manual), a [em]Paginação[/em] vive [em]dentro de uma página[/em] — divide listas e tabelas longas em pedaços confortáveis.",
      default: {
        title: "Padrão",
        kicker: "default",
        caption: "Anterior/próximo, números visíveis e ellipses pra abreviar quando há muitas páginas.",
      },
      labeled: {
        title: "Com rótulos",
        kicker: "showLabels",
        caption: "Mostra \"Anterior · Próximo\" como texto, além das setas — útil em interfaces densas.",
      },
      edges: {
        title: "Nas pontas",
        kicker: "first · last",
        caption: "Comportamento na primeira página e na última — um dos botões fica desabilitado.",
      },
      compact: {
        title: "Compacta",
        kicker: "siblings=0",
        caption: "Sem vizinhos — economiza espaço em barras estreitas.",
      },
      composable: {
        title: "Composável",
        kicker: "subcomponentes",
        caption:
          "Para casos especiais (rotulagem custom, ícones diferentes), monte mão a mão com [em]PaginationItem[/em] e amigos.",
      },
      composition: {
        title: "Composição",
        titleB: "árvore",
        kicker: "estrutura",
        caption:
          "Use a [em]composição[/em] a seguir para montar uma paginação manualmente.",
      },
    },

    /* ------------- Breadcrumbs ------------- */
    breadcrumbs: {
      lead: "Componente · 20",
      titleA: "Os ",
      titleB: "breadcrumbs",
      metaLabel: "Localização",
      meta: "Trilha de navegação",
      intro:
        "Uma trilha discreta de [em]onde o leitor está[/em] no mapa do site — mostra o caminho hierárquico, separado por um glifo. Usado em apps com mais de dois níveis.",
      short: {
        title: "Forma curta",
        kicker: "items prop",
        caption: "Passe um array de strings; o último item vira o atual automaticamente.",
      },
      separator: {
        title: "Separador customizado",
        kicker: "separator prop",
        caption: "Troque o glifo separador para combinar com a voz tipográfica do projeto.",
      },
      deep: {
        title: "Trilhas profundas",
        kicker: "3 a 4 níveis",
        caption: "O conjunto inteiro do caminho — útil em sites de documentação ou catálogos.",
        a: ["Atelier", "Componentes", "Abas"],
        b: ["Atelier", "Fundamentos", "Cores", "Acento"],
      },
      composable: {
        title: "Composable",
        kicker: "subcomponentes",
        caption:
          "Para links com onClick custom ou um Current diferente, use os [em]subcomponentes[/em] diretamente.",
      },
      composition: {
        title: "Composição",
        titleB: "árvore",
        kicker: "estrutura",
        caption:
          "Use a [em]composição[/em] a seguir para montar uma trilha de navegação manualmente.",
      },
    },

    /* ------------- Skeleton ------------- */
    skeleton: {
      lead: "Componente · 21",
      titleA: "Os ",
      titleB: "skeletons",
      metaLabel: "Espera",
      meta: "Placeholders de loading",
      intro:
        "Enquanto o conteúdo carrega, o esqueleto pulsa com discrição — [em]paciência editorial[/em], não a pressa do shimmer agressivo das libs genéricas. O leitor sabe que algo está chegando.",
      shapes: {
        title: "Formas",
        kicker: "rect · circle",
        caption: "Os blocos básicos: retângulo (texto, imagem) e círculo (avatar).",
      },
      text: {
        title: "Texto",
        kicker: "lines",
        caption: "Múltiplas linhas — a última fica mais curta, mimetizando fim de parágrafo.",
      },
      card: {
        title: "Card composto",
        kicker: "card",
        caption: "Composição comum: avatar + título + linhas de corpo. Pra listas e feeds.",
      },
      static: {
        title: "Sem pulso",
        kicker: "pulse=false",
        caption:
          "Para quando o tempo de espera for [em]curtíssimo[/em] — o pulso seria mais ruidoso que ausente.",
      },
      composition: {
        title: "Composição",
        titleB: "árvore",
        kicker: "estrutura",
        caption:
          "Use os [em]subcomponentes[/em] a seguir conforme a forma do conteúdo que carrega.",
      },
    },

    /* ------------- Popover ------------- */
    popover: {
      lead: "Avançado · 22",
      titleA: "O ",
      titleB: "popover",
      metaLabel: "Overlay",
      meta: "Base de menus, tooltips ricos, datepickers",
      intro:
        "Um painel posicionado ancorado a um trigger. É a [em]primitive[/em] sobre a qual nascem o DropdownMenu, o ContextMenu, e — em breve — Combobox e DatePicker. Sem libs externas: posicionamento próprio em ~40 linhas, com auto-flip e clamp de viewport.",
      basic: {
        title: "Uso básico",
        kicker: "primitive",
        desc:
          "Trigger + Content. Sem props obrigatórias — o estado open/close é interno (descontrolado).",
        caption: "Popover básico ao lado do trigger",
        btn: "Abrir popover",
        body:
          "Conteúdo arbitrário. Pode receber qualquer ReactNode — texto, formulário, lista, gráfico.",
      },
      placements: {
        title: "Doze posicionamentos",
        kicker: "placement",
        desc:
          "[em]side-align[/em]. Quatro lados (top, right, bottom, left) × três alinhamentos (start, center, end). Default: [em]bottom-start[/em].",
        caption: "Os 12 placements possíveis",
      },
      arrow: {
        title: "Com indicador",
        kicker: "arrow",
        desc:
          "Triângulo angular apontando pro trigger. Útil quando o painel pode estar visualmente desconectado do que o originou.",
        caption: "Popover com arrow",
        btn: "Abrir com arrow",
        body:
          "O triângulo é desenhado em CSS puro (sem SVG) — mantém a coerência angular do Atelier.",
      },
      form: {
        title: "Conteúdo rico",
        kicker: "rich content",
        desc:
          "Aceita qualquer composição React — formulários, listas, painéis. O foco fica preso dentro do painel até o usuário fechar.",
        caption: "Popover com formulário inline",
        btn: "Editar nome",
        label: "Nome de exibição",
        placeholder: "Como gostaria de ser chamado?",
        save: "Salvar",
        cancel: "Cancelar",
      },
      flip: {
        title: "Auto-flip",
        kicker: "viewport-aware",
        desc:
          "Se o painel não cabe no lado preferido, o Popover [em]inverte[/em] automaticamente para o lado oposto. Tente abrir um trigger perto do canto inferior da tela com placement=\"bottom\" — ele abre pra cima sozinho.",
      },
      composition: {
        title: "Composição",
        titleB: "árvore",
        kicker: "estrutura",
        caption: "Os subcomponentes do Popover.",
      },
    },

    /* ------------- DropdownMenu ------------- */
    dropdownMenu: {
      lead: "Avançado · 23",
      titleA: "Os ",
      titleB: "menus",
      metaLabel: "Ações",
      meta: "Composto sobre Popover",
      intro:
        "Menu de ações disparado por um botão. Items, separadores, labels de grupo, [em]checkbox/radio[/em], shortcuts mono, glifos serifados, items destrutivos. Navegação por teclado completa.",
      basic: {
        title: "Uso básico",
        kicker: "items",
        desc:
          "Apenas itens clicáveis. [em]Enter[/em] ou clique selecionam, [em]Escape[/em] fecha.",
        caption: "Menu básico de edição",
        btn: "Editar",
        cut: "Recortar",
        copy: "Copiar",
        paste: "Colar",
      },
      rich: {
        title: "Glifos e atalhos",
        kicker: "glyph + shortcut",
        desc:
          "Cada item aceita [em]glyph[/em] (símbolo serifado à esquerda) e [em]shortcut[/em] (texto mono à direita). Use com parcimônia — itens com glifo demais ficam pesados.",
        caption: "Menu rico com label, glifo, shortcut e item destrutivo",
        btn: "Conta",
        account: "Conta",
        profile: "Perfil",
        settings: "Configurações",
        bookmarks: "Favoritos",
        signOut: "Sair",
      },
      checkbox: {
        title: "Checkbox items",
        kicker: "menuitemcheckbox",
        desc:
          "Toggle visíveis dentro do menu — não fecham ao serem clicados, permitindo múltipla seleção. Marca usa [em]✓[/em] em accent.",
        caption: "Menu com toggles persistentes",
        btn: "Visualização",
        preferences: "Preferências",
        rulers: "Mostrar réguas",
        hidden: "Mostrar arquivos ocultos",
      },
      radio: {
        title: "Radio group",
        kicker: "menuitemradio",
        desc:
          "Escolha única entre opções mutuamente excludentes. Indicador usa [em]●[/em] em accent.",
        caption: "Seletor de tema",
        btn: "Tema",
        label: "Aparência",
        auto: "Automático",
        light: "Claro",
        dark: "Escuro",
      },
      composition: {
        title: "Composição",
        titleB: "árvore",
        kicker: "estrutura",
        caption: "Os subcomponentes do DropdownMenu.",
      },
    },

    /* ------------- ContextMenu ------------- */
    contextMenu: {
      lead: "Avançado · 24",
      titleA: "O ",
      titleB: "context menu",
      metaLabel: "Right-click",
      meta: "Ancorado nas coordenadas do cursor",
      intro:
        "Menu disparado pelo [em]clique direito[/em] (ou Shift+F10 no teclado). Diferente do DropdownMenu, abre exatamente onde o cursor está — com [em]clamp de viewport[/em] pra não vazar pra fora da tela.",
      basic: {
        title: "Ações básicas",
        kicker: "right-click area",
        desc:
          "Clique com o botão direito sobre a área. As mesmas opções primitivas de qualquer menu de aplicação.",
        caption: "Menu contextual com cut/copy/paste/delete",
        area: "Clique com o botão direito aqui",
        hint: "Right-click ou Shift+F10",
        cut: "Recortar",
        copy: "Copiar",
        paste: "Colar",
        delete: "Excluir",
        history: "Última ação",
      },
      editor: {
        title: "Editor de texto",
        kicker: "formatting",
        desc:
          "Caso de uso clássico: formatação inline. Mistura [em]checkbox items[/em] (estados toggláveis: bold, italic) com items normais para ações.",
        caption: "Menu contextual de formatação",
        lorem:
          "Clique com o botão direito sobre este parágrafo para abrir o menu de formatação — alterne negrito e itálico, e veja o texto reagir em tempo real.",
        text: "Texto",
        bold: "Negrito",
        italic: "Itálico",
        actions: "Ações",
        paragraph: "Transformar em parágrafo",
        heading: "Transformar em título",
      },
      composition: {
        title: "Composição",
        titleB: "árvore",
        kicker: "estrutura",
        caption: "Os subcomponentes do ContextMenu.",
      },
    },

    /* ------------- Drawer ------------- */
    drawer: {
      lead: "Avançado · 25",
      titleA: "O ",
      titleB: "drawer",
      metaLabel: "Modal lateral",
      meta: "4 lados · focus trap · backdrop",
      intro:
        "Modal lateral que desliza de uma das [em]quatro bordas[/em] da tela. Diferente do Dialog (centralizado), o Drawer é ideal para [em]menus mobile[/em], painéis de configuração e detalhes secundários — sem interromper completamente o fluxo principal.",
      basic: {
        title: "Uso básico",
        kicker: "side=right",
        desc:
          "Trigger + Content. Default abre da [em]direita[/em], com 380px de largura. Backdrop semi-opaco fecha ao clique; Escape também.",
        caption: "Drawer básico abrindo da direita",
        btn: "Abrir drawer",
        heading: "Painel lateral",
        body:
          "Conteúdo arbitrário aqui dentro. O scroll do body é bloqueado enquanto o Drawer está aberto, e o foco volta para o trigger ao fechar.",
      },
      sides: {
        title: "Os quatro lados",
        kicker: "side prop",
        desc:
          "[em]top, right, bottom, left[/em]. Cada lado tem sua animação de slide correspondente. Em [em]top[/em] e [em]bottom[/em], a prop [em]size[/em] é tratada como altura.",
        caption: "Drawer abrindo de cada um dos quatro lados",
        title2: "Aberto da",
        right: "Direita",
        left: "Esquerda",
        top: "Topo",
        bottom: "Base",
        body:
          "Os quatro lados compartilham todos os subcomponentes — só o eixo de animação muda.",
      },
      form: {
        title: "Conteúdo rico — formulário",
        kicker: "Header + Body + Footer",
        desc:
          "Caso típico: edição de um item secundário sem deixar a página atual. O Footer fica fixado na base com as ações de confirmar/cancelar.",
        caption: "Drawer com formulário e ações",
        btn: "Editar perfil",
        heading: "Editar perfil",
        name: "Nome",
        namePh: "Como você gostaria de aparecer?",
        bio: "Bio",
        bioHint: "Algumas linhas sobre você. Markdown suportado.",
        save: "Salvar",
        cancel: "Cancelar",
      },
      size: {
        title: "Tamanho customizado",
        kicker: "size prop",
        desc:
          "Para left/right, [em]size[/em] é a largura. Para top/bottom, é a altura. Em pixels.",
        caption: "Três tamanhos diferentes",
        body:
          "Este Drawer tem {size}px no eixo paralelo à borda escolhida.",
      },
      close: "Fechar",
      composition: {
        title: "Composição",
        titleB: "árvore",
        kicker: "estrutura",
        caption: "Os subcomponentes do Drawer.",
      },
    },

    /* ------------- Toaster ------------- */
    toaster: {
      lead: "Avançado · 26",
      titleA: "O ",
      titleB: "toaster",
      metaLabel: "Notificações",
      meta: "Queue · 5 variantes · 6 posições",
      intro:
        "Sistema de notificações com [em]queue[/em], auto-dismiss e [em]pause-on-hover[/em]. Diferente do <Toast> existente (componente puro), o Toaster é um sistema: monta-se [em]uma vez[/em] no root da app, e em qualquer lugar usa-se o hook [em]useToast()[/em] para disparar.",
      setup: {
        title: "Setup inicial",
        kicker: "uma vez no root",
        desc:
          "Envolva a árvore da app com [em]<Toaster />[/em]. Em qualquer descendente, use o hook [em]useToast()[/em] para disparar notificações.",
      },
      short: {
        title: "Forma curta",
        kicker: "toast(string)",
        desc:
          "Para o caso mais comum (uma mensagem rápida sem extras), basta passar uma string.",
        caption: "Forma mínima",
        message: "Salvo.",
        btn: "Disparar toast",
      },
      variants: {
        title: "Cinco variantes",
        kicker: "default · info · ok · warn · danger",
        desc:
          "Cada variante muda a [em]borda esquerda[/em] (cor semântica) e o glifo padrão. Use com parcimônia — o silêncio é o tom da casa.",
        caption: "Clique para disparar cada variante",
        default: { title: "Notificação", desc: "Uma mensagem neutra, sem urgência." },
        info: { title: "Nova mensagem", desc: "Você tem uma conversa não lida no inbox." },
        ok: { title: "Salvo.", desc: "Suas alterações foram registradas." },
        warn: { title: "Espaço quase cheio", desc: "Restam 2GB de armazenamento. Considere limpar arquivos antigos." },
        danger: { title: "Conexão perdida", desc: "Tentando reconectar — sua mudança será sincronizada quando voltar." },
      },
      action: {
        title: "Toast com ação",
        kicker: "action button",
        desc:
          "Botão de ação à direita — útil para [em]Desfazer[/em], [em]Tentar de novo[/em] etc. Clicar na ação dispara o callback e dismissa o toast.",
        caption: "Toast com botão Desfazer",
        title2: "Item enviado para a lixeira.",
        desc2: "Você pode reverter por alguns segundos.",
        undo: "Desfazer",
        undone: "Restaurado.",
        btn: "Excluir item",
      },
      persistent: {
        title: "Toast persistente",
        kicker: "duration: 0",
        desc:
          "Para erros críticos ou avisos que [em]exigem ação[/em], desabilite o auto-dismiss. O usuário precisa fechar manualmente.",
        caption: "Toast que não desaparece sozinho",
        title2: "Conexão indisponível",
        desc2: "Algumas funcionalidades estão limitadas até a rede voltar.",
        btn: "Disparar toast persistente",
        clear: "Limpar todos",
      },
      stack: {
        title: "Stack e fila",
        kicker: "queue + limit",
        desc:
          "Múltiplos toasts empilham com gap respiratório. O Toaster aceita uma prop [em]limit[/em] (default: 5) — quando excede, os mais antigos são removidos. [em]Pause-on-hover[/em] congela o auto-dismiss enquanto o cursor está sobre qualquer item.",
        caption: "Dispara 6 toasts em sequência (limit=5)",
        label: "Toast",
        body: "Mensagem #{n} disparada em sequência.",
        btn: "Disparar 6 toasts",
      },
      composition: {
        title: "API",
        titleB: " do hook",
        kicker: "useToast",
        caption: "O hook expõe três funções:",
      },
    },

    /* ------------- Combobox ------------- */
    combobox: {
      lead: "Avançado · 27",
      titleA: "O ",
      titleB: "combobox",
      metaLabel: "Select com busca",
      meta: "Single + multi · grupos · teclado",
      intro:
        "Select com [em]input de busca em tempo real[/em]. Filtragem insensível a caso e acentos, navegação completa por teclado, modo single ou multi com chips, agrupamento opcional. Substitui [em]<select>[/em] nativo quando há mais de meia dúzia de opções ou quando a UX precisa respirar.",
      basic: {
        title: "Single — uso básico",
        kicker: "single select",
        desc:
          "Digite pra filtrar, [em]↑↓[/em] navega, [em]Enter[/em] seleciona, [em]Esc[/em] fecha. Botão × limpa a seleção atual.",
        caption: "Selecione um país",
        field: "País",
        placeholder: "Digite para buscar…",
        empty: "Nenhum resultado",
      },
      multi: {
        title: "Multi — várias seleções",
        kicker: "multi=true",
        desc:
          "Cada item selecionado vira um [em]chip[/em] dentro do input. [em]Backspace[/em] com input vazio remove o último chip. O painel não fecha entre seleções.",
        caption: "Tags do artigo",
        field: "Tags",
        hint: "Você pode escolher várias. Backspace remove a última.",
        placeholder: "Adicionar tag…",
      },
      creatable: {
        title: "Creatable — aceita valores novos",
        kicker: "creatable=true",
        desc:
          "Combobox padrão é um [em]select[/em] — só permite escolher do array. Com [em]creatable[/em], aparece uma linha [em]Criar \"…\"[/em] no topo do painel sempre que o que você digitou não bate com nenhuma opção existente. Enter ou click cria o item livre — em multi vira chip, em single vira o valor.",
        caption: "Tags com criação livre — digite e Enter",
        field: "Tags do artigo",
        hint: "Escolha das sugestões ou digite uma tag nova e tecle Enter.",
        placeholder: "Tag existente ou nova…",
        create: "Criar",
      },
      groups: {
        title: "Grupos",
        kicker: "option.group",
        desc:
          "Quando uma opção tem [em]group[/em], o Combobox renderiza um [em]label[/em] separando os grupos no painel. A ordem dos grupos segue a ordem de aparição.",
        caption: "Linguagens agrupadas por paradigma",
        field: "Linguagem favorita",
        placeholder: "Escolha uma linguagem…",
      },
      states: {
        title: "Opções desabilitadas",
        kicker: "option.disabled",
        desc:
          "Items individuais podem ser marcados como [em]disabled[/em] — ficam visíveis no painel mas não selecionáveis.",
        caption: "Frameworks (alguns indisponíveis)",
        field: "Framework",
        hint: "Vue e Angular estão indisponíveis nesta versão.",
        placeholder: "Escolha um framework…",
      },
      disabled: {
        title: "Disabled total",
        kicker: "disabled",
        desc:
          "O Combobox inteiro fica inerte — não abre, não recebe foco, mostra a seleção atual em estilo apagado.",
        caption: "Estado disabled (somente leitura visual)",
        field: "Linguagem (bloqueada)",
      },
      composition: {
        title: "API",
        titleB: "",
        kicker: "uma única tag",
        caption:
          "O Combobox é uma [em]única tag[/em] — sem subcomponentes. Toda a customização vai por props (options, value, onChange, multi, getOptionValue, getOptionLabel, renderOption, etc.).",
      },
    },

    /* ------------- RangeSlider ------------- */
    slider: {
      lead: "Avançado · 28",
      titleA: "O ",
      titleB: "range slider",
      metaLabel: "Numérico",
      meta: "1 ou 2 handles · marks · vertical",
      intro:
        "Slider numérico para [em]valores contínuos[/em] ou [em]intervalos[/em]. Click/drag em qualquer ponto move o handle mais próximo, [em]←→[/em] ajusta por step (Shift por step×10), [em]Home/End[/em] vão pro extremo. Sem libs externas — drag manual com PointerEvents.",
      single: {
        title: "Single — um valor",
        kicker: "value: number",
        desc:
          "O caso mais comum. Drag, click no track ou teclado. O label flutua acima do handle apenas durante o hover/foco — silêncio quando não está em uso.",
        caption: "Volume: {value}%",
        field: "Volume",
      },
      dual: {
        title: "Dual — intervalo",
        kicker: "value: [number, number]",
        desc:
          "Dois handles. O Combobox detecta automaticamente quando você passa um array. Os valores são [em]ordenados[/em] no onChange — sempre [min, max].",
        caption: "Orçamento: ${min} – ${max}",
        field: "Faixa de preço",
        hint: "Mova qualquer um dos dois handles. Step de $50.",
      },
      marks: {
        title: "Marks (ticks)",
        kicker: "marks: number[]",
        desc:
          "Pequenas marcas no track + labels embaixo. Não funcionam como [em]snap pontos[/em] — apenas referência visual. Pra snap, ajuste o [em]step[/em].",
        caption: "Ano: {value}",
        field: "Ano",
      },
      always: {
        title: "Label sempre visível",
        kicker: 'showValue="always"',
        desc:
          "O default mostra o label só no hover/foco. Quando o valor é [em]a informação principal[/em] (ex: força de senha, brilho), use [em]showValue=\"always\"[/em].",
        caption: "Força: {value}",
        field: "Força da senha",
      },
      vertical: {
        title: "Vertical",
        kicker: 'orientation="vertical"',
        desc:
          "↑ aumenta, ↓ diminui — natural pra equalizadores, brilho, e qualquer eixo onde [em]mais é em cima[/em].",
        caption: "Brilho: {value}",
        field: "Brilho",
      },
      disabled: {
        title: "Disabled",
        kicker: "disabled",
        desc:
          "Track e fill ficam apagados, handle não responde a eventos.",
        caption: "Slider em estado bloqueado",
        field: "Configuração indisponível",
      },
      composition: {
        title: "API",
        titleB: "",
        kicker: "uma única tag",
        caption:
          "Como o Combobox, o RangeSlider é uma [em]única tag[/em]. Comportamento controlado por props — sem subcomponentes.",
      },
    },

    /* ------------- Forms ------------- */
    forms: {
      lead: "Padrão · 29",
      titleA: "Os ",
      titleB: "formulários",
      metaLabel: "Composição",
      meta: "Campos + ações",
      intro:
        "Formulário é narrativa em etapas — cabeçalho, corpo e ações. Use [em]divisores[/em] para agrupar, não bordas internas.",
      completeTitleA: "Formulário ",
      completeTitleB: "completo",
      completeKicker: "pattern",
      completeCaption: "Assinatura do Atelier",
      stepYour: "i · Seus dados",
      name: "Nome",
      namePh: "Clara",
      lastName: "Sobrenome",
      lastNamePh: "Almeida",
      email: "E-mail",
      emailHint: "Usaremos apenas para enviar a edição.",
      emailPh: "clara@atelier.com",
      preferences: "preferências",
      plan: "Plano",
      plans: { monthly: "Mensal", quarterly: "Trimestral", annual: "Anual" },
      format: "Formato",
      formats: ["Impresso + digital", "Apenas digital"],
      reason: "Motivo (opcional)",
      reasonHint: "Conta pra gente o que te trouxe?",
      reasonPh: "Uma linha, um parágrafo…",
      accept: "Concordo em receber uma carta breve a cada nova edição.",
      cancel: "Cancelar",
      subscribe: "Assinar",
      composition: {
        title: "Composição",
        titleB: "árvore",
        kicker: "estrutura",
        caption:
          "Use a [em]composição[/em] a seguir para montar um [em]Form[/em] — cada nó é um subcomponente exportado.",
      },
    },

    /* ------------- Stepper ------------- */
    stepper: {
      lead: "Padrão · 30",
      titleA: "O ",
      titleB: "stepper",
      metaLabel: "Multi-etapa",
      meta: "Progresso em capítulos",
      intro:
        "Quando o formulário pede [em]várias etapas[/em], o leitor merece saber em que ato está. O stepper é uma marcação editorial — número, título, descrição — em uma linha (horizontal) ou em coluna (vertical).",
      horizontal: {
        title: "Horizontal",
        kicker: "default",
        caption: "Ideal para 3-5 etapas que cabem numa linha — onboarding, checkout, assinatura.",
      },
      vertical: {
        title: "Vertical",
        kicker: "orientation=vertical",
        caption:
          "Para fluxos mais longos ou onde cada etapa precisa de descrição estendida.",
      },
      interactive: {
        title: "Interativo",
        kicker: "state-driven",
        caption:
          "Avance e volte com os botões — o stepper reflete o estado em tempo real.",
      },
      back: "Voltar",
      next: "Avançar",
      s1Label: "Conta",
      s1Desc: "Seus dados básicos",
      s2Label: "Plano",
      s2Desc: "Frequência e formato",
      s3Label: "Confirmar",
      s3Desc: "Revisar e enviar",
      s4Label: "Concluído",
      s4Desc: "Seu pedido foi recebido",
      composition: {
        title: "Composição",
        titleB: "árvore",
        kicker: "estrutura",
        caption:
          "Cada [em]Step[/em] é um filho do [em]Stepper[/em] — o estado (completed, active, pending) é resolvido automaticamente pela posição.",
      },
    },

    /* ------------- Empty States ------------- */
    emptyStates: {
      lead: "Padrão · 31",
      titleA: "Os ",
      titleB: "vazios",
      metaLabel: "Sem conteúdo",
      meta: "Convites, não derrotas",
      intro:
        "Um estado vazio é [em]espaço em branco com intenção[/em]. Convida o leitor à ação seguinte, explica o que virá — nunca apenas diz “nada aqui”.",
      first: {
        title: "Primeira visita",
        kicker: "onboarding",
        caption: "Antes do primeiro conteúdo",
        emptyTitleA: "Ainda sem ",
        emptyTitleB: "artigos",
        emptyTitleC: "",
        emptyBody:
          "Quando um autor publicar a primeira peça, ela aparecerá aqui — na edição em que foi lançada. Enquanto isso, explore os fundamentos.",
        cta: "Convidar um autor",
      },
      search: {
        title: "Busca sem resultado",
        kicker: "search",
        caption: "Termo não encontrado",
        emptyTitleA: "Sem resultados para ",
        emptyTitleB: "“serifa”",
        emptyTitleC: "",
        emptyBody:
          "Tente uma variação do termo, remova filtros ou percorra os temas mais recentes pela capa.",
        cta: "Voltar à capa",
      },
      offline: {
        title: "Offline",
        kicker: "network",
        caption: "Sem conexão",
        emptyTitleA: "Perdemos a ",
        emptyTitleB: "conexão",
        emptyTitleC: "",
        emptyBody:
          "Nada que você escreveu se perdeu. Quando a rede voltar, seguimos exatamente de onde paramos.",
        cta: "Tentar novamente",
      },
      composition: {
        title: "Composição",
        titleB: "árvore",
        kicker: "estrutura",
        caption:
          "Use a [em]composição[/em] a seguir para montar um [em]EmptyState[/em] — cada nó é um subcomponente exportado.",
      },
    },

    /* ------------- Sidebar (pattern) ------------- */
    sidebar: {
      lead: "Padrão · 32",
      titleA: "A ",
      titleB: "sidebar",
      metaLabel: "Navegação",
      meta: "Estrutura vertical",
      intro:
        "A [em]sidebar[/em] é o sumário do Atelier: traz o ritmo da leitura em colunas, com grupos hierárquicos e o próprio toque editorial. É a navegação primária quando há muitas páginas e o usuário precisa [em]folhear[/em] o conteúdo.",
      anatomy: {
        title: "Anatomia",
        titleB: "partes",
        kicker: "parts",
        caption: "Cinco regiões empilhadas, cada uma com um papel tipográfico.",
        parts: [
          {
            n: "01",
            label: "Marca",
            desc:
              "Wordmark com ponto acentuado. Clica na capa. [em]Abre[/em] a pilha.",
          },
          {
            n: "02",
            label: "Grupos",
            desc:
              "Títulos em caixa-alta, versaletes, espaçamento de chumbo. Cortam o ritmo.",
          },
          {
            n: "03",
            label: "Itens",
            desc:
              "Número + label. O ativo ganha filete à esquerda — pequeno acento tipográfico.",
          },
          {
            n: "04",
            label: "Controles",
            desc:
              "Idioma, tema e modo de navegação. Mesmos componentes da navbar superior.",
          },
          {
            n: "05",
            label: "Rodapé",
            desc:
              "Assinatura discreta em monoespaçado. Versão + colofão.",
          },
        ],
      },
      states: {
        title: "Estados",
        kicker: "expanded · collapsed",
        caption:
          "Duas larguras: expandida (leitura) e colapsada (foco no conteúdo). O atalho [em]⌘B[/em] alterna.",
        expanded: "Expandida",
        collapsed: "Colapsada",
        expandedDesc:
          "Modo padrão. Tipografia completa visível — cada item com número e label.",
        collapsedDesc:
          "Modo foco. Só o toggle fica à mostra, flutuando no canto. Recupera o espaço para a leitura.",
      },
      specimen: {
        title: "Espécime",
        kicker: "live preview",
        caption: "Miniatura fiel. Toca nos itens para ver o estado ativo.",
      },
      composition: {
        title: "Composição",
        titleB: "árvore",
        kicker: "estrutura",
        caption:
          "Use a [em]composição[/em] a seguir para montar um layout com [em]Sidebar[/em] — cada nó é um bloco lógico, com seu próprio papel tipográfico.",
      },
      guidelines: {
        title: "Quando usar",
        kicker: "diretrizes",
        items: [
          {
            n: "I",
            titleA: "Muitas ",
            titleB: "páginas",
            body:
              "Use a sidebar quando a navegação tem mais de [em]doze[/em] destinos. Ela respira verticalmente; a navbar não.",
          },
          {
            n: "II",
            titleA: "Leitura por ",
            titleB: "capítulos",
            body:
              "Conteúdo editorial, documentação longa, design systems. O leitor volta ao sumário o tempo todo.",
          },
          {
            n: "III",
            titleA: "Evite em ",
            titleB: "landings",
            body:
              "Em sites de uma página ou marketing, a navbar é mais econômica — menos cromo, mais conteúdo.",
          },
        ],
      },
    },

    /* ------------- Navbar (pattern) ------------- */
    navbar: {
      lead: "Padrão · 33",
      titleA: "A ",
      titleB: "navbar",
      metaLabel: "Navegação",
      meta: "Estrutura horizontal",
      intro:
        "A [em]navbar[/em] é o cabeçalho editorial: uma faixa horizontal que revela a estrutura através de [em]menus de hover[/em]. Cada grupo de rotas vira um dropdown — o leitor vê o mapa sem precisar descer a página.",
      anatomy: {
        title: "Anatomia",
        titleB: "partes",
        kicker: "parts",
        caption: "Três regiões horizontais, pesos tipográficos distintos.",
        parts: [
          {
            n: "01",
            label: "Marca",
            desc:
              "Wordmark com ponto acentuado. Volta para a capa. Ancora a esquerda.",
          },
          {
            n: "02",
            label: "Menus",
            desc:
              "Um trigger por grupo. Hover abre; foco mantém aberto para teclado.",
          },
          {
            n: "03",
            label: "Dropdown",
            desc:
              "Lista de itens com número + label. O item ativo fica em negrito discreto.",
          },
          {
            n: "04",
            label: "Controles",
            desc:
              "Idioma, tema e modo de navegação — ancoram a direita como um cluster.",
          },
        ],
      },
      dropdown: {
        title: "Dropdowns",
        kicker: "hover · focus-within",
        caption:
          "O painel aparece ao passar o mouse — e permanece aberto enquanto qualquer item interno tem foco, garantindo navegação por teclado.",
        hoverNote: "Hover",
        hoverDesc: "Trigger ou item recebe o cursor.",
        focusNote: "Foco",
        focusDesc: "Tab percorre os itens — [em]:focus-within[/em] trava o menu aberto.",
      },
      specimen: {
        title: "Espécime",
        kicker: "live preview",
        caption: "Miniatura fiel. Passe o mouse em um menu para ver o dropdown.",
      },
      composition: {
        title: "Composição",
        titleB: "árvore",
        kicker: "estrutura",
        caption:
          "Use a [em]composição[/em] a seguir para montar um layout com [em]Navbar[/em] — cada nó é um subcomponente exportado.",
      },
      guidelines: {
        title: "Quando usar",
        kicker: "diretrizes",
        items: [
          {
            n: "I",
            titleA: "Poucas ",
            titleB: "categorias",
            body:
              "Funciona bem com até [em]cinco[/em] grupos. Cada dropdown pode ter mais itens — o limite é a horizontal.",
          },
          {
            n: "II",
            titleA: "Landings e ",
            titleB: "capas",
            body:
              "Em sites de marketing, blogs e portfolios, a navbar libera o espaço lateral e alinha melhor com a narrativa visual.",
          },
          {
            n: "III",
            titleA: "Evite em ",
            titleB: "documentação densa",
            body:
              "Se o leitor precisa [em]voltar ao sumário[/em] o tempo todo, a sidebar é mais gentil — a navbar esconde a estrutura.",
          },
        ],
      },
    },

    /* ------------- Code page ------------- */
    code: {
      lead: "Manual · para desenvolvedores",
      titleA: "O ",
      titleB: "código",
      metaLabel: "Referência",
      meta: "Tokens + API",
      intro:
        "Tudo que um desenvolvedor precisa para adotar o Atelier em outro projeto: [em]instalar fontes[/em], colar os tokens, importar os componentes. Cada bloco abaixo tem botão de copiar.",
      start: {
        title: "Começo",
        kicker: "install",
        desc:
          "O Atelier é React puro, sem dependências além de [em]react[/em] e [em]react-dom[/em]. Três passos — e o visual editorial fica disponível no seu projeto.",
        step1: "1 · criar o projeto",
        step2: "2 · importar as fontes (no index.html)",
        step3: "3 · aplicar os tokens (no index.css)",
      },
      tokens: {
        titleA: "Os ",
        titleB: "tokens",
        kicker: "design tokens",
        desc:
          "Todas as variáveis CSS do Atelier. Cole este bloco dentro do seu [em]:root[/em] e todas as classes do DS funcionam. Sobrescreva em temas ou modos.",
      },
      api: {
        titleA: "API dos ",
        titleB: "componentes",
        kicker: "primitives.jsx",
        desc:
          "Todas as primitives exportadas, com props, assinatura e snippet de uso. Clique em um título para abrir a página de exemplos.",
        view: "Ver exemplos →",
      },
      conventions: {
        title: "Convenções",
        kicker: "code style",
        items: [
          {
            n: "I",
            titleA: "Classes começam em ",
            titleB: "ds-",
            body:
              "Toda classe pública do design system tem o prefixo [em].ds-[/em] para não conflitar com o seu código de aplicação.",
          },
          {
            n: "II",
            titleA: "Nunca use ",
            titleB: "border-radius",
            body:
              "Ângulos retos são o coração da linguagem editorial. Se um componente parecer rígido, ajuste o espaço, não o canto.",
          },
          {
            n: "III",
            titleA: "Itálico é ",
            titleB: "ênfase",
            titleC: ", não decoração",
            body:
              "Use itálico para marcar a palavra que carrega o sentido. Quando tudo é itálico, nada é.",
          },
        ],
      },
      decisions: {
        titleA: "Decisões de ",
        titleB: "arquitetura",
        kicker: "ADRs",
        desc:
          "Os porquês por trás das escolhas estruturais do Atelier — registradas como [em]Architecture Decision Records[/em] curtos, em ordem cronológica.",
        items: [
          {
            n: "ADR-001",
            status: "accepted",
            titleA: "Zero ",
            titleB: "dependências",
            titleC: " além do React",
            body:
              "O Atelier roda só com [em]react[/em] e [em]react-dom[/em]. Sem libraries de UI, sem bibliotecas de ícones, sem framework CSS. Cada glifo, cada gráfico, cada animação foi desenhado à mão. O bundle pesa o estritamente necessário, e qualquer pessoa consegue ler todo o código em poucas tardes.",
          },
          {
            n: "ADR-002",
            status: "accepted",
            titleA: "Glifos ",
            titleB: "tipográficos",
            titleC: ", não uma library de ícones",
            body:
              "Em vez de Lucide ou Phosphor, o Atelier usa caracteres Unicode reais ([em]→ ✓ § ¶ ⋯[/em]) renderizados em Fraunces itálico. A página [em]/icons[/em] documenta o repertório oficial. Ícones de UI específicos (chevron, sliders, etc.) são SVGs inline curtinhos. Coerência total com a alma editorial.",
          },
          {
            n: "ADR-003",
            status: "accepted",
            titleA: "API ",
            titleB: "composable",
            titleC: " (estilo shadcn)",
            body:
              "Todo componente expõe seus subcomponentes — [em]<Card><CardKicker /><CardTitle /></Card>[/em] em vez de [em]<Card kicker=\"…\" title=\"…\" />[/em]. O consumidor monta a árvore como quiser. Cada página de doc tem uma seção [em]Composição[/em] com a árvore real exportada.",
          },
          {
            n: "ADR-004",
            status: "accepted",
            titleA: "Peso da régua ",
            titleB: "= significado",
            body:
              "[em]--rule[/em] (linha forte) marca [em]affordance ou hierarquia[/em] (botões, divisores de seção, linha das tabs). [em]--rule-soft[/em] (linha suave) marca [em]container[/em] (cards, painéis, modais, sidebar). Nunca alternar arbitrariamente. O comentário em [em]:root[/em] codifica essa regra.",
          },
          {
            n: "ADR-005",
            status: "accepted",
            titleA: "Right angles ",
            titleB: "no border-radius",
            body:
              "O DS [em]nasce angular[/em]. O Studio expõe um slider de border-radius marcado como [em]Avançado · fora do cânone[/em] — quem quiser arredondar, sabe que está saindo do estilo. O default permanece intocado.",
          },
          {
            n: "ADR-006",
            status: "accepted",
            titleA: "Studio ",
            titleB: "escopado",
            body:
              "O playground de tema (Studio) injeta CSS vars apenas dentro de [em][data-studio-scope][/em], nunca no [em]:root[/em] global. Brincar com o tema não afeta a sidebar, navbar ou qualquer outra página — separação total entre [em]ferramenta[/em] e [em]aplicação[/em].",
          },
          {
            n: "ADR-007",
            status: "accepted",
            titleA: "Search ",
            titleB: "estática",
            titleC: " indexada em build-time",
            body:
              "A paleta [em]⌘K[/em] usa um índice estático construído de [em]routes.js[/em] + uma lista curada de componentes e tokens. Sem fuse.js, sem servidor, sem fetch. Build-time → instantâneo no client. Trade-off aceito: precisa atualizar [em]searchIndex.js[/em] ao adicionar componentes.",
          },
          {
            n: "ADR-008",
            status: "accepted",
            titleA: "i18n com ",
            titleB: "fallback genérico",
            body:
              "[em]<CompositionSection>[/em] tenta [em]pages.X.composition.title[/em] e cai em [em]common.composition.title[/em] se não existir. Páginas novas ganham a seção [em]Composição[/em] sem precisar replicar boilerplate de tradução. Mesmo padrão pra outros helpers que vierem.",
          },
        ],
      },
      divider: "componentes",
      dividerDecisions: "decisões",
    },

    /* ------------- Accessibility ------------- */
    accessibility: {
      lead: "Referência · 34",
      titleA: "A ",
      titleB: "acessibilidade",
      metaLabel: "Conformidade",
      meta: "WCAG · ARIA · teclado",
      intro:
        "Acessibilidade no Atelier não é um [em]extra[/em]; está na raiz do estilo. Tipografia generosa, contraste cuidadoso, foco visível, atalhos consistentes e movimento contido — tudo escolhido para que o leitor possa [em]ler[/em], independente de como.",
      principles: {
        title: "Princípios",
        kicker: "six rules",
        desc: "Seis compromissos que regem cada decisão de DS.",
        items: [
          { n: "01", titleA: "Contraste ", titleB: "alto", body: "Texto em [em]ink[/em] sobre [em]bg[/em] mantém ≥ 4.5:1 (WCAG AA). Cores secundárias também passam." },
          { n: "02", titleA: "Foco ", titleB: "visível", body: "Sempre. Filete de 2px em [em]--accent[/em] em qualquer elemento focável — nunca [em]outline: none[/em] sem substituto." },
          { n: "03", titleA: "Tipografia ", titleB: "legível", body: "Mínimo de 14px no body, 10-12px só em metadados. [em]Line-height[/em] ≥ 1.5 em texto longo." },
          { n: "04", titleA: "Movimento ", titleB: "contido", body: "Transições entre 120-320ms. Respeita [em]prefers-reduced-motion[/em] desligando animações automaticamente." },
          { n: "05", titleA: "Teclado ", titleB: "completo", body: "Tudo que se faz com mouse se faz com teclado. Atalhos consistentes ([em]⌘K[/em], [em]⌘B[/em], [em]Esc[/em], [em]Tab[/em])." },
          { n: "06", titleA: "ARIA ", titleB: "quando preciso", body: "Semântica HTML primeiro. ARIA só pra preencher gaps — [em]nunca substituir[/em] tags semânticas." },
        ],
      },
      shortcuts: {
        title: "Atalhos de teclado",
        kicker: "keyboard map",
        desc: "Atalhos globais funcionam em [em]qualquer página[/em]; os contextuais valem dentro de seus componentes.",
        caption: "Cobre 100% das ações principais sem mouse.",
        thKeys: "Teclas",
        thAction: "Ação",
        thScope: "Escopo",
        items: [
          { keys: "⌘ K", action: "Abrir paleta de busca", scope: "global" },
          { keys: "⌃ K", action: "Abrir paleta de busca (Windows/Linux)", scope: "global" },
          { keys: "⌘ B", action: "Recolher / expandir sidebar", scope: "global" },
          { keys: "Esc", action: "Fechar overlays (modal, popover, palette)", scope: "overlay" },
          { keys: "Tab", action: "Avançar foco", scope: "global" },
          { keys: "⇧ Tab", action: "Voltar foco", scope: "global" },
          { keys: "↑ ↓", action: "Navegar resultados / opções", scope: "lista" },
          { keys: "← →", action: "Mudar de aba (no foco)", scope: "tabs" },
          { keys: "↵", action: "Confirmar / abrir item ativo", scope: "lista · form" },
          { keys: "Espaço", action: "Alternar switch / checkbox", scope: "controles" },
        ],
      },
      focus: {
        title: "Foco e navegação",
        kicker: "focus-visible",
        desc: "O Atelier garante que o foco esteja [em]sempre visível[/em] e que o leitor possa pular blocos repetitivos de UI.",
        tipTitle: "Skip link",
        tipBody: "No topo desta página, aperte [em]Tab[/em] uma vez — vai aparecer um link \"Pular para o conteúdo\" que leva direto ao [em]<main>[/em], evitando re-tabular toda a navegação.",
        caption: "Estratégias de foco implementadas.",
        skipNote: "Aparece no Tab inicial; pula a sidebar e a navbar inteiras.",
        focusNote: "Outline de 2px --accent em todo elemento focável (botões, links, inputs, switches).",
        trapNote: "Modais (Dialog) confinam o foco até serem fechados; Esc devolve ao trigger.",
      },
      motion: {
        title: "Movimento",
        kicker: "prefers-reduced-motion",
        desc: "Motion no Atelier é discreto por princípio (120-320ms). Para visitantes que [em]pedem menos movimento[/em] no SO, todas as animações e transições são desligadas globalmente.",
        tipTitle: "Como ativar no seu dispositivo",
        tipBody: "macOS: [em]Sistema → Acessibilidade → Mostrador → Reduzir movimento[/em]. Windows: [em]Configurações → Acessibilidade → Efeitos visuais → Animações[/em]. iOS: [em]Acessibilidade → Movimento[/em].",
      },
      contrast: {
        title: "Contraste",
        kicker: "WCAG AA",
        desc: "As combinações de cor do tema padrão passam pelo critério WCAG AA (4.5:1 para texto). Use o [em]Studio[/em] para auditar temas customizados.",
        caption: "Razões de contraste do tema light · padrão.",
      },
      aria: {
        title: "ARIA & screen readers",
        kicker: "semantic html first",
        desc: "Semântica HTML primeiro. ARIA é usado apenas para preencher gaps em widgets compostos.",
        caption: "Padrões ARIA por componente.",
        thComponent: "Componente",
        thStrategy: "Estratégia",
        items: [
          { component: "Modal · Dialog", strategy: "role=dialog, aria-modal=true, aria-label, foco confinado, Esc fecha." },
          { component: "Tabs", strategy: "role=tablist/tab/tabpanel, aria-selected, aria-controls, navegação por setas." },
          { component: "Tooltip", strategy: "data-tip + aria-label; aparece em :hover/:focus-within." },
          { component: "Pagination", strategy: "nav + aria-label, aria-current=page no item ativo, aria-label por número." },
          { component: "Breadcrumbs", strategy: "nav + aria-label, ordered list, aria-current=page no último." },
          { component: "Search Palette", strategy: "role=dialog, autofocus no input, ↑↓ navegam, Enter abre, Esc fecha." },
          { component: "Skeleton", strategy: "aria-hidden=true (não anuncia placeholder pra screen readers)." },
        ],
      },
    },

    /* ============================================================ */
    create: {
      headerKicker: "Studio",
      headerTitleA: "Construa seu",
      headerTitleB: "tema",
      headerHint: "Tudo escopado · suas mudanças não afetam o resto do site",
      controls: {
        preset: "Preset",
        custom: "Personalizado",
        theme: "Tema",
        themeLight: "Claro",
        themeDark: "Escuro",
        accent: "Acento",
        base: "Base",
        font: "Tipografia",
        spacing: "Espaçamento",
        advanced: "Avançado",
        offCanon: "—",
      },
      advanced: {
        warnTitle: "Fora do cânone",
        warnBody:
          "O Atelier nasce angular — sem [em]border-radius[/em], sem sombras. Use abaixo com [em]parcimônia[/em].",
        radius: "Border-radius",
      },
      export: {
        intro:
          "Cole o bloco abaixo no [em]:root[/em] do seu CSS para reproduzir esta combinação no seu projeto.",
        copy: "Copiar",
        copied: "Copiado",
        download: "Baixar .css",
      },
      actions: {
        shuffle: "Embaralhar",
        reset: "Restaurar",
        export: "Exportar tokens",
        hideExport: "Ocultar tokens",
      },
      preview: {
        typeKicker: "01 · Tipografia",
        typeTitle: "Voz editorial",
        headlineA: "Um manual silencioso para",
        headlineB: "interfaces editoriais",
        body:
          "Tipografia antes de pixels. Hierarquia vem da fonte, não da cor. Atelier é uma narrativa em colunas — leitura, não dashboard.",
        typeSpec: "Fraunces 300 / 16 / 1.6",
        cardsTitle: "Card editorial",
        card1Kicker: "Crônica · 04",
        card1TitleA: "Sobre",
        card1TitleB: "tipos",
        card1Body:
          "Uma tipografia bem escolhida resolve metade dos problemas de design — só precisa que o resto não atrapalhe.",
        card1Foot: "ler →",
        card2Kicker: "Edição · 21",
        card2Title: "Card com ação",
        card2TitleA: "O ato de",
        card2TitleB: "ler",
        card2Body:
          "Toda página é uma respiração. As margens contam tanto quanto o conteúdo — silêncio entre as palavras.",
        card2Price: "R$ 240 / ano",
        card2Cta: "Assinar",
        controlsKicker: "02 · Controles",
        controlsTitle: "Botões e badges",
        formKicker: "03 · Formulário",
        formTitle: "Campo + ações",
        fieldLabel: "Endereço",
        fieldHint: "Onde gostaríamos de te encontrar.",
        fieldPh: "rua, número, cidade",
        field2Label: "E-mail",
        field2Ph: "voce@atelier.com",
        btnPrimary: "Publicar",
        btnDefault: "Salvar",
        btnAccent: "Acento",
        btnGhost: "Cancelar",
        badgeOk: "publicado",
        badgeWarn: "rascunho",
        badgeAccent: "novo",
        badgeDefault: "arquivado",
        alertsKicker: "04 · Alertas",
        alertsTitle: "Mensagens",
        alertInfoTitle: "Para sua informação",
        alertInfoBody: "Esta é uma maqueta — todas as ações são demonstração.",
        alertOkTitle: "Tema salvo",
        alertOkBody: "Suas escolhas ficam guardadas no navegador entre visitas.",
        alertWarnTitle: "Atenção",
        alertWarnBody: "Mexer no border-radius foge do princípio editorial.",
        metricKicker: "Métrica",
        metricTitle: "Painel sintético",
        metricLabel: "Edição em curso",
        metricValue: "1.247",
        metricDelta: "+ 8,2 %",
        metric2Label: "Assinantes",
        metric2Value: "892",
        metric3Label: "Próxima",
        metric3Value: "12 mai",

        settingsKicker: "Configurações",
        settingsTitle: "Preferências",
        setting1: "Notificações por e-mail",
        setting1Hint: "Avisos das novas edições.",
        setting2: "Resumo semanal",
        setting2Hint: "Domingos pela manhã.",
        setting3: "Modo concentração",
        setting3Hint: "Esconde elementos de UI durante a leitura.",
        setting4: "Som de papel",
        setting4Hint: "Folha virando ao mudar de capítulo.",
        setting5: "Sincronizar entre dispositivos",
        setting5Hint: "Posição de leitura compartilhada.",
        setting6: "Modo compacto",
        setting6Hint: "Reduz espaços para caber mais por tela.",

        chartKicker: "Atividade",
        chartTitle: "Últimos 8 dias",
        chartStat1Label: "Total",
        chartStat1Value: "533",
        chartStat2Label: "Pico",
        chartStat2Value: "94",
        chartStat3Label: "Média",
        chartStat3Value: "67",

        teamKicker: "Equipe",
        teamTitle: "Quem está editando",
        teamStatus: "5 colaboradores ativos",
        teamOnline: "online agora",

        planKicker: "Plano",
        planTitle: "Assinatura Atelier",
        planPrice: "R$ 240",
        planPer: "por ano",
        planFeat1: "Edição trimestral impressa + digital",
        planFeat2: "Acesso ao arquivo completo",
        planFeat3: "Convites para os encontros",
        planFeat4: "Caderno de campo (anual)",
        planFeat5: "Cancelamento a qualquer momento",
        planCta: "Assinar",

        tabsKicker: "Abas",
        tabsTitle: "Navegação interna",
        tab1: "Fundamentos",
        tab1Body: "Cor, tipografia e espaço — a base sobre a qual tudo se assenta.",
        tab2: "Componentes",
        tab2Body: "Botões, campos, cards: as pequenas peças que compõem a página.",
        tab3: "Padrões",
        tab3Body: "Como combinar tudo — formulários, navegações, estados vazios.",

        field3Label: "Frequência",
        field3Opt1: "Mensal",
        field3Opt2: "Trimestral",
        field3Opt3: "Anual",
        field4Label: "Mensagem",
        field4Ph: "Conta um pouco sobre você...",

        txKicker: "Transações",
        txTitle: "Últimos lançamentos",
        tx1: "Renovação anual",
        tx2: "Edição avulsa #21",
        tx3: "Frete (impresso)",
        tx4: "Patrocínio mensal",
        tx5: "Adicional postal",
      },
    },
  },
};

export default ptBR;
