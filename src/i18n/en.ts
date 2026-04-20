const en = {
  common: {
    composition: {
      title: "Composition",
      titleB: "tree",
      kicker: "structure",
      caption:
        "Use the following [em]composition[/em] to build a [em]{root}[/em] — each node is an exported subcomponent.",
      captionAtomic:
        "[em]{root}[/em] is an atomic component — no subcomponents; varies by props.",
    },
    pageNav: {
      label: "Pagination",
      previous: "Previous",
      next: "Next",
    },
    viewCode: "View code",
    hideCode: "Hide code",
    copy: "Copy",
    copied: "Copied",
    cancel: "Cancel",
    confirm: "Confirm",
    close: "Close",
    save: "Save",
    discard: "Discard",
    subscribe: "Subscribe",
    retry: "Try again",
    back: "Back",
    next: "Next",
    previous: "Previous",
    props: "Props",
    prop: "Prop",
    type: "Type",
    default: "Default",
    example: "Example",
    import: "import",
    collapseSidebar: "Collapse menu",
    expandSidebar: "Expand menu",
    backToTop: "Back to top",
  },

  theme: {
    label: "Theme",
    light: "Light",
    dark: "Dark",
    switchToLight: "Switch to light mode",
    switchToDark: "Switch to dark mode",
  },

  nav: {
    brand: { title: "Atelier", caption: "Design System · v0.1" },
    groups: {
      start: "Start",
      foundations: "Foundations",
      components: "Components",
      advanced: "Advanced",
      patterns: "Patterns",
      reference: "Reference",
      studio: "Studio",
      tools: "Tools",
    },
    items: {
      overview: "Overview",
      principles: "Principles",
      colors: "Colors",
      typography: "Typography",
      voice: "Voice & tone",
      spacing: "Spacing",
      icons: "Glyphs",
      elevation: "Elevation",
      radius: "Corners",
      zIndex: "Layers",
      breakpoints: "Breakpoints",
      density: "Density",
      motion: "Motion",
      buttons: "Buttons",
      inputs: "Fields",
      controls: "Controls",
      badges: "Badges",
      avatars: "Avatars",
      alerts: "Alerts",
      cards: "Cards",
      tabs: "Tabs",
      tables: "Tables",
      charts: "Charts",
      overlays: "Overlays",
      feedback: "Feedback",
      dropzone: "Dropzone",
      pagination: "Pagination",
      breadcrumbs: "Breadcrumbs",
      skeleton: "Skeleton",
      popover: "Popover",
      dropdownMenu: "Dropdown Menu",
      contextMenu: "Context Menu",
      drawer: "Drawer",
      toaster: "Toaster",
      combobox: "Combobox",
      slider: "Range Slider",
      calendar: "Calendar",
      datePicker: "Date Picker",
      carousel: "Carousel",
      tree: "Tree View",
      resizable: "Resizable Panels",
      colorPicker: "Color Picker",
      markdown: "Markdown",
      shortcuts: "Shortcuts",
      virtualList: "Virtual List",
      dragDrop: "Drag & Drop",
      forms: "Forms",
      stepper: "Stepper",
      emptyStates: "Empty states",
      sidebar: "Sidebar",
      navbar: "Navbar",
      accessibility: "Accessibility",
      code: "For devs · code",
      kbd: "Keys · KBD",
      hooks: "Hooks",
      changelog: "Changelog",
      tokens: "Tokens",
      loadingStates: "Loading states",
      errorHandling: "Error handling",
      formsPatterns: "Forms patterns",
      destructive: "Destructive actions",
      onboarding: "Onboarding",
      darkMode: "Dark mode",
      print: "Print",
      i18nPatterns: "i18n patterns",
      install: "Install",
      apiReference: "API reference",
      browserSupport: "Browser support",
      performance: "Performance",
      recipes: "Recipes",
      dataTable: "Data Table",
      timeline: "Timeline",
      tagInput: "Tag Input",
      create: "Create · customize",
      roadmap: "Roadmap",
    },
    descriptions: {
      overview: "The manual's cover — what's coming up.",
      principles: "The six rules that govern the editorial style.",
      colors: "Four families: surface, ink, accent, semantic.",
      typography: "Editorial voice in Fraunces and JetBrains Mono.",
      voice: "How the Atelier writes — principles, tone by context, vocabulary, and microcopy.",
      spacing: "8pt scale and the twelve-column grid.",
      icons: "Twelve typographic glyphs — not UI icons.",
      elevation: "Shadow as signal — flat-by-default scale and when to elevate.",
      radius: "Sharp corners by default — a controlled exception scale.",
      zIndex: "Stacking layers — one fixed scale for every overlay.",
      breakpoints: "Five breakpoints replacing nine ad-hoc values.",
      density: "Compact, comfortable, spacious — density that cascades.",
      motion: "Formal animation layer — primitives, easings and editorial rules.",
      buttons: "Primary, ghost, link and variants.",
      inputs: "Inputs, textareas and selects with hint and error.",
      controls: "Checkbox, radio and switch.",
      badges: "Small chips for state and category.",
      avatars: "Initials, image or SVG — solo or in group.",
      alerts: "Messages with icon, title and action.",
      cards: "Editorial blocks with kicker, title, body, footer.",
      tabs: "Stacked panels with quiet transitions.",
      tables: "Mono header, serif body — editorial reading.",
      charts: "Bar, line, area, pie, radar, radial and sparkline.",
      overlays: "Dialogs and tooltips on top of content.",
      feedback: "Toast and progress — discreet signals.",
      dropzone: "File upload with metadata preview.",
      pagination: "Paginate lists and tables — prev/next + pages.",
      breadcrumbs: "A trail showing where the reader is in the site.",
      skeleton: "Editorial placeholders for loading states.",
      popover: "Anchored panel — base for dropdowns, rich tooltips and more.",
      dropdownMenu: "Action menu with items, separators, checkbox/radio and shortcuts.",
      contextMenu: "Menu triggered by right-click — opens at cursor coordinates.",
      drawer: "Side modal that slides from one of four edges — sheets, settings panels.",
      toaster: "Notification system with queue, auto-dismiss and five semantic variants.",
      combobox: "Select with real-time search input, multi-select, groups and full keyboard support.",
      slider: "Numeric slider with 1 or 2 handles, marks, vertical, and full keyboard support.",
      calendar: "Month view with single, range or multiple selection — date logic in pure JS.",
      datePicker: "Masked input + Calendar in popover; includes DateRangePicker with 2 months.",
      carousel: "Slides with touch swipe, prev/next, dots, optional auto-play and loop.",
      tree: "Hierarchical tree with expand/collapse, single or multi selection, full keyboard nav.",
      resizable: "Panels with draggable handles — horizontal/vertical, optional localStorage persist.",
      colorPicker: "Visual HSV picker + hex/RGB inputs + optional presets. Pure-JS conversions.",
      markdown: "Editorial markdown rendering with own parser. Headings, lists, quotes, code, links.",
      shortcuts: "Global keyboard shortcuts system with useShortcut hook + help dialog via Shift+?.",
      virtualList: "Renders only visible items — handle 10,000+ entries without freezing the browser.",
      dragDrop: "Sortable + DragSource + DropZone — touch, mouse, pen and keyboard, zero deps.",
      forms: "Full composition: fields, dividers, actions.",
      stepper: "Multi-step progress indicator for long forms.",
      emptyStates: "Invitations, not defeats — space with intent.",
      sidebar: "Vertical table-of-contents for many-paged sites.",
      navbar: "Horizontal header with hover dropdowns.",
      accessibility: "Shortcuts, focus, contrast and ARIA.",
      code: "Tokens, primitives and API for developers.",
      kbd: "Keys and inline code — editorial primitives for shortcuts and snippets.",
      hooks: "Public utility hooks — environment, DOM and state, all zero-deps.",
      changelog: "Version history — Keep a Changelog format, rendered by the MarkdownViewer.",
      tokens: "Full inventory — every scale living in :root, with swatch, values and export.",
      loadingStates: "Skeleton, Spinner, Progress, Empty — which to use when.",
      errorHandling: "ErrorBoundary, inline messages, retry and fallback UI.",
      formsPatterns: "Inline validation, async submit, multi-step, messages.",
      destructive: "Confirmation, undo, risk modals, double-confirm.",
      onboarding: "Tour, Coachmark, guided Empty State — when to use each.",
      darkMode: "Editorial palette, contrast, charts and code edge cases.",
      print: "Print styles, hide chrome, strong B&W contrast.",
      i18nPatterns: "Plurals, dates, numbers, currency with native Intl.",
      install: "Setup, peer deps, first component — with philosophy.",
      apiReference: "Map of what lives in each module — where to find what.",
      browserSupport: "Official targets, assumed APIs, fallbacks.",
      performance: "Bundle budgets, code-splitting, Phase 8.1 wins.",
      recipes: "Ready-made compositions — live, editable, open in external sandbox.",
      dataTable: "Composable editorial table: sort, filters, selection, pagination and virtualization.",
      timeline: "Vertical or horizontal timeline with markers, states and a 'now' divider.",
      tagInput: "Free-form tag collector with removable chips, validation and custom separators.",
      create: "Build your theme live and export the tokens.",
      roadmap: "What's been shipped and what's coming — phases, priorities and dependencies.",
    },
    footer: {
      study: "A quiet study",
      stack: "React · Vite · 2026",
      language: "Language",
      theme: "Theme",
    },
    mode: {
      label: "Navigation",
      sidebar: "Side",
      navbar: "Top",
    },
    settings: {
      label: "Settings",
      kicker: "preferences",
      title: "Settings",
      dir: {
        label: "Direction",
        auto: "Auto",
        ltr: "LTR",
        rtl: "RTL",
      },
    },
    layout: {
      toWide: "Expand to full width",
      toBoxed: "Back to default width",
    },
    newBadge: "New",
    navLabel: "Primary navigation",
  },

  /* ============================================================ */
  /* Labels used internally by DS components (aria-label, etc.) */
  ds: {
    example: {
      editLabel: "Edit",
      previewLabel: "Preview",
      resetLabel: "Reset",
      editorLabel: "Example code editor",
    },
    pagination: {
      label: "Pagination",
      previous: "Previous",
      next: "Next",
    },
    breadcrumbs: {
      label: "Breadcrumb trail",
    },
    timeline: {
      nowLabel: "Now",
    },
    calendar: {
      prev: "Previous month",
      next: "Next month",
      today: "Today",
      openPicker: "Open calendar",
      rangeStart: "Range start",
      rangeEnd: "Range end",
    },
    carousel: {
      label: "Carousel",
      prev: "Previous slide",
      next: "Next slide",
      goTo: "Go to slide",
    },
    resizable: {
      label: "Resizable panels",
      handle: "Handle",
      junction: "Junction (moves 2 dimensions)",
    },
    shortcuts: {
      title: "Keyboard shortcuts",
      close: "Close",
      empty: "No shortcuts registered.",
      uncategorized: "General",
    },
    dnd: {
      sortable: "Sortable list",
      dropZone: "Drop area",
    },
  },

  /* ============================================================ */
  /* Accessibility (skip link, etc.) */
  accessibility: {
    skipLink: "Skip to main content",
  },

  /* ============================================================ */
  /* Search Palette (⌘K) — global, sits at root, not under `nav` */
  search: {
    title: "Search",
    trigger: "Search",
    placeholder: "Search pages, components, colors...",
    empty: "Nothing found for",
    groups: {
      pages: "Pages",
      components: "Components",
      tokens: "Colors · Tokens",
    },
    foot: {
      navigate: "navigate",
      select: "open",
      close: "close",
    },
  },

  footer: {
    navLabel: "Footer navigation",
    socialLabel: "Social links",
    tagline: "A quiet manual for editorial interfaces.",
    stack: "React · Vite · 2026",
    copyright: "Atelier · crafted with care",
    groups: {
      foundations: "Foundations",
      components: "Components",
      advanced: "Advanced",
      patterns: "Patterns",
      atelier: "Atelier",
    },
    social: {
      github: "https://github.com/",
      linkedin: "https://www.linkedin.com/in/joniguerini/",
    },
  },

  pages: {
    overview: {
      lead: "Atelier · A quiet manual",
      titleA: "An [acc]editorial[/acc] design system,",
      titleB: "made to breathe.",
      metaLabel: "Edition",
      meta: "No. 01 · 2026",
      intro:
        "[em]Atelier[/em] is a lean collection of principles, foundations and components. Designed like an architecture magazine — generous margins, living type, precise gestures. Nothing loud. Nothing superfluous.",
      cards: [
        {
          kicker: "I · Foundations",
          titleA: "The raw ",
          titleB: "material",
          body:
            "Colors, typography, spacing, grid and glyphs. The silent spine everything rests upon.",
          cta: "Explore colors",
          to: "colors",
        },
        {
          kicker: "II · Components",
          titleA: "The ",
          titleB: "instruments",
          body:
            "Buttons, fields, cards, alerts, tabs — each one refined and predictable. No gratuitous decoration.",
          cta: "See components",
          to: "buttons",
        },
        {
          kicker: "III · Patterns",
          titleA: "The ",
          titleB: "compositions",
          body:
            "Forms, empty states, navigation. Recipes to combine well what is already built.",
          cta: "See patterns",
          to: "forms",
        },
      ],
      indexLabel: "index",
      quickStartKicker: "Quick start",
      quickStartBody:
        "Start with the [em]Principles view[/em] to grasp the philosophy, or jump straight to components if you are already implementing.",
      readPrinciples: "Read the principles",
      goComponents: "Go to components",
      forDevs: "For devs · code →",
      glanceKicker: "At a glance",
      badges: {
        react: "React 18",
        vite: "Vite 5",
        fraunces: "Fraunces",
        mono: "JetBrains Mono",
        editorial: "Editorial",
        a11y: "Accessible",
        light: "No heavy dependencies",
      },
      quote: "“Good typography is invisible. So is good interface.”",
      quoteAuthor: "— the manifesto",
    },

    principles: {
      lead: "I · The manifesto",
      titleA: "Six [acc]principles[/acc] that",
      titleB: "guide every decision.",
      metaLabel: "Chapter",
      meta: "Principles",
      intro:
        "A system is only as consistent as the convictions that hold it up. These are ours — [em]short, stubborn and revisited each edition[/em].",
      sectionTitleA: "The ",
      sectionTitleB: "six",
      sectionKicker: "manifesto",
      items: [
        {
          n: "01",
          title: "Silence as default",
          body:
            "An interface is not a shop window. The loudest color — red — is used sparingly, like a note in the margin. Everything begins at rest.",
        },
        {
          n: "02",
          title: "Typography before pixels",
          body:
            "Hierarchy is typographic, not chromatic. Size, italic and space do the heavy lifting. Color only confirms what the typeface has already said.",
        },
        {
          n: "03",
          title: "Right angles",
          body:
            "No border-radius. No shadow. Geometry is editorial: paper, ink, ruler. The interface feels like a well-bound notebook.",
        },
        {
          n: "04",
          title: "Human measure",
          body:
            "Column widths cap at 1080px. Lines never exceed 70 characters. The eye needs to rest between words.",
        },
        {
          n: "05",
          title: "Predictable gestures",
          body:
            "Every animation runs between 120 and 320 ms with a single easing. Motion is discreet — it confirms actions, never announces them.",
        },
        {
          n: "06",
          title: "Accessible by construction",
          body:
            "Minimum contrast of 4.5:1 in body text. Visible focus. Keyboard-navigable components. Everything as it should be.",
        },
      ],
    },

    colors: {
      lead: "Foundation · 02",
      titleA: "The ",
      titleB: "palette",
      metaLabel: "Tokens",
      meta: "19 colors",
      intro:
        "Four families: [em]surfaces[/em] to rest the eye, [em]ink[/em] for content, [em]accent[/em] to punctuate, and [em]semantic[/em] for states. Nothing more.",
      copyToken: "Copy token {token}",
      copyHex: "Copy {hex}",
      sections: {
        theme: {
          num: "i",
          title: "Theme",
          kicker: "light · dark",
          desc:
            "[acc]Color tokens[/acc] are organized in two layers: invariant (space, typography, motion) and chromatic (per theme). On first visit, the initial theme follows the OS [em]prefers-color-scheme[/em]; after that, your choice takes over and is preserved. Below, palettes are shown in both modes — the highlighted hex is [em]active[/em]; the secondary is the opposite pair.",
        },
        surface: {
          num: "ii",
          title: "Surfaces",
          kicker: "backgrounds",
          desc:
            "The background is paper, not screen. A warm cream that softens contrast and mimics the restfulness of print.",
        },
        ink: {
          num: "iii",
          title: "Ink",
          kicker: "typography",
          desc:
            "Four levels of presence — from an imposing title to a nearly faded metadata.",
        },
        accent: {
          num: "iv",
          title: "Accent",
          kicker: "emphasis",
          desc:
            "Used as a red note — focus borders, editorial numerals, pointed punctuation. Never on large areas.",
        },
        semantic: {
          num: "v",
          title: "Semantic",
          kicker: "status",
          desc:
            "Pairs (ink + soft) that communicate success, warning, danger and info without shifting the page tone.",
        },
      },
      swatches: {
        paper: "Paper",
        panel: "Panel",
        sunken: "Sunken",
        inverse: "Inverse",
        ink: "Ink",
        inkSoft: "Ink soft",
        inkFaint: "Ink faint",
        inkInverse: "Ink inverse",
        accent: "Accent",
        accentInk: "Accent ink",
        accentSoft: "Accent soft",
        success: "Success",
        successSoft: "Success soft",
        warning: "Warning",
        warningSoft: "Warning soft",
        danger: "Danger",
        dangerSoft: "Danger soft",
        info: "Info",
        infoSoft: "Info soft",
      },
    },

    typography: {
      lead: "Foundation · 03",
      titleA: "The ",
      titleB: "typography",
      metaLabel: "Families",
      meta: "Fraunces · JetBrains Mono",
      intro:
        "Two families do all the work. [em]Fraunces[/em] for reading and emphasis, [em]JetBrains Mono[/em] for metadata and code. Italic is the only decoration allowed — and the scale, modular at a [em]perfect fourth[/em] ratio (1.333), provides exactly nine sizes.",

      /* ---------- i. Families ---------- */
      families: {
        title: "Families",
        kicker: "two voices",
        desc:
          "Two voices, distinct roles. The serif carries reading and lifts headlines; the monospace annotates, identifies, and marks code. [em]Nothing more[/em] is needed.",
        weights: "Weights",
        stack: "Stack",
        serif: {
          name: "Fraunces",
          role: "Editorial voice · reading & headlines",
          rationale:
            "A contemporary serif with optical sizing — lively shapes at large sizes, calm shapes at body. An expressive italic, used only for emphasis.",
          weights: "300 · 400 · 500 · 600 · italic",
          stack: '"Fraunces", Georgia, serif',
        },
        mono: {
          name: "JetBrains Mono",
          role: "Technical voice · metadata & code",
          rationale:
            "A monospace tuned for long-form code reading. Differentiated glyphs (slashed zero, l vs 1) and optional ligatures. Here also used in caps for kickers and captions.",
          weights: "400 · 500 · 600",
          stack: '"JetBrains Mono", ui-monospace, monospace',
        },
      },

      /* ---------- ii. Specimens (table) ---------- */
      specimensTitle: "Specimens",
      specimensKicker: "hierarchy",
      specimensDesc:
        "Each row is a token — the actual size, line-height and weight applied to the sample text itself. The [em]Use[/em] column tells you when to reach for each one.",
      cols: {
        name: "Name",
        token: "Token",
        size: "Size",
        lh: "LH",
        weight: "Weight",
        use: "Use",
        preview: "Sample",
      },
      specimens: {
        display: { name: "Display", use: "Openings, covers, brand", preview: "Atelier." },
        h3xl:    { name: "3XL",     use: "Inner heroes, page titles", preview: "Bright morning" },
        h2xl:    { name: "2XL",     use: "Section headlines", preview: "Editorial typography" },
        hxl:     { name: "XL",      use: "Section titles (Section)", preview: "The rhythm of text" },
        hlg:     { name: "LG",      use: "UI sub-titles, leads", preview: "An example sub-title" },
        body:    { name: "MD · body", use: "Long-form reading, paragraphs", preview: "The body breathes at 16/1.65." },
        ui:      { name: "SM · UI", use: "Inputs, labels, UI links", preview: "Interface text" },
        small:   { name: "XS · small", use: "Long captions, helper text", preview: "Smaller helper text" },
        micro:   { name: "Micro", use: "Status, dense metadata", preview: "STATUS · ACTIVE" },
        meta:    { name: "Meta", use: "Overlines, kickers, caps captions", preview: "FOUNDATION · 03" },
      },

      /* ---------- iii. Scale ---------- */
      scale: {
        title: "Scale as system",
        kicker: "modular · 1.333",
        desc:
          "A modular scale anchored at 16px and expanded at a [em]perfect fourth[/em] ratio (1.333). Nine sizes cover everything from monospace captions to editorial displays — anything outside the scale needs a case-by-case justification.",
        usageTitle: "CSS usage",
        fluidTitle: "Fluid typography",
        fluidDesc:
          "Only the [em]--text-display[/em] token scales with the viewport via [em]clamp(...)[/em]. The rest is fixed on purpose: typographic predictability beats flexibility on extreme screens.",
      },

      /* ---------- iv. Rhythm & reading ---------- */
      rhythm: {
        title: "Rhythm & reading",
        kicker: "measure · line-height",
        desc:
          "Readable type is rhythm: the relationship between size, line-height and measure. We control the three as one system.",
        measureTitle: "Measure (ideal width)",
        measureDesc:
          "Lines that are too long tire the eye — it loses the start of the next line. Lines too short break thought. The sweet spot lives between [em]45 and 75 characters[/em]; our default is 65ch.",
        measureSample:
          "Good typography isn't seen — it's felt. When the measure is right, the reader moves forward effortlessly; when it's wrong, they blame the font without knowing why.",
        measure: {
          narrow: { label: "30ch · narrow", note: "Tight, friction every line" },
          ideal:  { label: "65ch · ideal",  note: "Editorial comfort — our default" },
          wide:   { label: "100ch · wide",  note: "Eye gets lost between lines" },
        },
        lhTitle: "Paired line-heights",
        lhDesc:
          "Display goes tight (0.95–1.1), body breathes (1.65), UI sits in the middle (1.5–1.55). No universal line-height.",
      },

      /* ---------- v. Text styles ---------- */
      styles: {
        title: "Text styles",
        kicker: "long-form prose",
          desc:
            "The canonical building blocks of editorial prose: kicker, title, lead, drop cap, body paragraphs, blockquote, lists, links and captions. All built on the same tokens.",
          kickerSample: "ESSAY · 03",
        h1: "On typographic quietness",
        h2: "Hierarchy without hierarchism",
        h3: "The weight of the pause",
        h4: "Small details that add up",
        lead:
          "Some types shout, others whisper. The ones that whisper age better — they invite the reader instead of demanding them.",
        dropcap:
          " good page of text begins in silence and ends in silence. What happens in between is reading — and reading is, above all, a delicate negotiation between the eye and rhythm.",
        body1:
          "Each paragraph is a breath. The line-height decides how long the reader can hold that breath before needing the next sip of air — and the measure decides how many words fit in each mouthful.",
        body2:
          "When the title shouts, the body falls silent. When the body asserts itself with clarity, the title can speak softly. That's the economy of hierarchy: enough contrast, no more.",
        quote:
          "Good typography is like air — no one notices until it's gone.",
        quoteAttr: "— some typographer, somewhere",
        ulItems: [
          "Italic for emphasis, never for decoration.",
          "Bold for visual search anchors, used sparingly.",
          "All caps only in monospace, with generous tracking.",
        ],
        olItems: [
          "Establish the body (16px / 1.65).",
          "Define the measure (45–75 characters).",
          "Calibrate the title from the body, not the other way around.",
        ],
        linksLead: "Links are part of the text — they should not ",
        linkText: "interrupt the reading rhythm",
        linksTrail: ". Discreet underline, stable color, visible focus.",
        caption:
          "Set in Fraunces · Atelier · first edition",
      },

      /* ---------- vi. Microtypography ---------- */
      micro: {
        title: "Microtypography",
        kicker: "details that breathe",
        desc:
          "What separates good text from beautiful text lives in the details that [em]nobody sees[/em] — and that everybody feels. Here are the fine controls.",
        numTitle: "Numerals: tabular vs proportional",
        numDesc:
          "In tables, numbers must [em]align vertically[/em] — use [em]tabular-nums[/em]. In running prose, proportional numerals breathe better.",
        numProportional: "Proportional · in prose",
        numTabular: "Tabular · in tables",
        pairsTitle: "Editorial pairs",
        avoid: "Avoid",
        use: "Use",
        pairs: [
          { label: "Quotes",    bad: "\"morning\"", good: "“morning”", note: "Curly quotes in prose. Straight ones only in code." },
          { label: "Em-dash",   bad: "Atelier - manual", good: "Atelier — manual", note: "Em-dash (—) separates thought. Hyphen (-) only joins words." },
          { label: "Ellipsis",  bad: "...", good: "…", note: "A single character (…), not three dots in a row." },
          { label: "Apostrophe", bad: "it's a draft", good: "it’s a draft", note: "Curly apostrophe (’), never the straight one (')." },
        ],
        wrapTitle: "Line wrapping (text-wrap)",
        wrapDesc:
          "[em]balance[/em] balances short titles across two lines; [em]pretty[/em] avoids orphans at the end of paragraphs. [em]normal[/em] is the historical default.",
        wrapSample: "An editorial title that would land on exactly two lines",
      },

      /* ---------- vii. Accessibility ---------- */
      a11y: {
        title: "Typographic accessibility",
        kicker: "legibility for everyone",
        desc:
          "Editorial typography isn't only aesthetic — it's reading. And reading is a right. These rules are non-negotiable.",
        rules: [
          { t: "Minimum legible size", b: "Body never below 14px (var(--text-sm)). Critical text at 16px. Caps captions can go to 10px thanks to generous tracking." },
          { t: "Hierarchy by size + weight", b: "Never differentiate levels by weight alone (400 vs 500). Always combine size + weight + color." },
          { t: "Contrast is typography", b: "Primary text > 7:1 (ink over bg). Auxiliary text > 4.5:1. Validated on both themes." },
          { t: "Don't synthesize italic or bold", b: "Always use the real weights from the font. Synthesis produces distorted shapes that hurt reading." },
          { t: "Respect browser zoom", b: "Use rem in critical layouts. Don't lock font-size in px without thinking about zoom." },
          { t: "Typographic animation", b: "Honor prefers-reduced-motion. Text shouldn't dance — text should just be there." },
        ],
        darkTitle: "Typography in dark mode",
        darkDesc:
          "In dark mode, text wants slightly less weight — light serif fonts on dark backgrounds [em]gain visual mass[/em]. We keep the same tokens, but the ink colors (warmer, less saturated) compensate without touching weight.",
      },

      /* ---------- viii. Do's & Don'ts ---------- */
      dosDonts: {
        title: "Do's & Don'ts",
        kicker: "editorial hygiene",
        desc:
          "Four common traps — and the editorial way out of each. Clean typography is mostly [em]the discipline of removal[/em].",
        do: "Do",
        dont: "Don't",
        items: [
          {
            sample:
              "Editorial typography demands rhythm. Left-aligned lines give the eye a fixed return point; centering long paragraphs steals that point and tires the reader.",
            align: "left",
            badStyle: { textAlign: "center" },
            goodStyle: { textAlign: "left" },
            note: "Don't center long paragraphs. Centering is for short titles and captions.",
          },
          {
            sample:
              "Justifying text without hyphenation produces gaps between words — vertical \"rivers\" that tear the page. If you must justify, enable [em]hyphens: auto[/em].",
            align: "justify",
            badStyle: { textAlign: "justify", hyphens: "manual" },
            goodStyle: { textAlign: "left", hyphens: "auto" },
            note: "Don't justify without hyphenation. Generally, prefer left-aligned.",
          },
          {
            sample:
              "More than two families in the same sentence is typography in identity crisis. Use serif for reading, mono for technical — and nothing else.",
            align: "left",
            badStyle: { fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)" },
            goodStyle: { fontFamily: "var(--font-serif)" },
            note: "Don't mix families for decoration. Each family has a functional role.",
          },
          {
            sample:
              "Typographic hierarchy is a staircase of at most three steps. Four levels or more and the reader stops climbing — they leave the page.",
            align: "left",
            badStyle: { fontWeight: 700, fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "0.1em" },
            goodStyle: { fontWeight: 400 },
            note: "Don't invent a fourth hierarchy level. If you need one, simplify the structure.",
          },
        ],
      },
    },

    /* ------------- Voice & tone ------------- */
    voice: {
      lead: "Foundation · 04",
      titleA: "The ",
      titleB: "tone",
      metaLabel: "Base",
      meta: "Voice · writing",
      intro:
        "Typography is the shape of letters. [em]Voice[/em] is what those letters say — and how they behave when the reader is distracted, hurried, or in trouble. The Atelier writes like a quiet manual: contained, precise, honest, and human.",

      principles: {
        title: "Principles",
        kicker: "i. base",
        desc:
          "Four pillars before any rule. Everything that follows — vocabulary, microcopy, punctuation — flows from these.",
        quiet: {
          name: "Quiet",
          desc:
            "Say what's needed, then stop. No marketing enthusiasm, no exclamation marks, no emojis. If a sentence can shrink, shrink it.",
          tag: "calm",
        },
        precise: {
          name: "Precise",
          desc:
            "Use the right word, not the next one. Avoid vague metaphors (\u201Camazing experience\u201D); prefer the concrete (\u201Ceditorial table with filters\u201D).",
          tag: "exactness",
        },
        honest: {
          name: "Honest",
          desc:
            "When something fails, say so. When it's beta, say so. Don't hide errors behind \u201Coops\u201D or disguise limits with promises.",
          tag: "truth",
        },
        human: {
          name: "Human",
          desc:
            "Write for a person, not a system. Use pronouns, contractions, and clear infinitive verbs. Cold is never courteous.",
          tag: "care",
        },
      },

      tone: {
        title: "Tone by context",
        kicker: "ii. matrix",
        desc:
          "Voice stays constant; tone shifts. In errors, we're direct. In success, discreet. In marketing, sober. This matrix shows what changes per context.",
        cols: {
          context: "Context",
          attrs: "Attributes",
          do: "Good",
          dont: "Avoid",
        },
        rows: {
          error: {
            label: "Error",
            when: "something went wrong",
            attrs: "direct · helpful · no blame",
            good: "Couldn't save. Check your connection and try again.",
            bad: "Oops! 😬 Something went wrong!!!",
          },
          success: {
            label: "Success",
            when: "action completed",
            attrs: "discreet · matter-of-fact · no party",
            good: "Changes saved.",
            bad: "Awesome! 🎉 You nailed it — everything saved successfully!!",
          },
          empty: {
            label: "Empty state",
            when: "nothing to show yet",
            attrs: "invitation · no blame · with exit",
            good: "No projects here. Create the first one to get started.",
            bad: "You haven't registered anything.",
          },
          destructive: {
            label: "Destructive action",
            when: "remove, delete, end",
            attrs: "explicit · no hedging · with weight",
            good: "Delete 12 items? This action cannot be undone.",
            bad: "Are you sure you want to proceed with the operation?",
          },
          marketing: {
            label: "Marketing",
            when: "landing page, launch",
            attrs: "sober · concrete · no superlative",
            good: "Editorial components for small teams. In React, no dependencies.",
            bad: "The ultimate solution! Revolutionize your workflow with the best experience!",
          },
          technical: {
            label: "Technical",
            when: "documentation, API, code",
            attrs: "precise · pragmatic · no ornament",
            good: "useT() returns { t, tr, raw }. tr() interpolates and formats; raw() returns the tree.",
            bad: "This wonderful hook helps you so much with translation, just use it 😉",
          },
          loading: {
            label: "Loading",
            when: "short wait",
            attrs: "neutral · short · no apology",
            good: "Loading…",
            bad: "Just hold on a sec, we're getting everything ready for you!",
          },
        },
      },

      vocab: {
        title: "Vocabulary",
        kicker: "iii. words",
        desc:
          "Small choices, repeated a thousand times, become voice. These tables list preferences the Atelier has already made for you. They're not law — they're the first option when doubt appears.",
        ptTitle: "Português (BR)",
        enTitle: "English",
        cols: {
          prefer: "Prefer",
          avoid: "Avoid",
          why: "Why",
        },
        pt: {
          save: {
            prefer: "Salvar",
            avoid: "Gravar · Submeter",
            why: "Salvar is the web's verb in PT-BR, direct.",
          },
          cancel: {
            prefer: "Cancelar",
            avoid: "Anular · Voltar atrás",
            why: "Cancelar is clear and neutral.",
          },
          delete: {
            prefer: "Excluir · Remover",
            avoid: "Deletar",
            why: "Native Portuguese; deletar is an avoidable anglicism.",
          },
          config: {
            prefer: "Configurações · Preferências",
            avoid: "Settings · Setup",
            why: "Use full Portuguese. Setup only when installing.",
          },
          loading: {
            prefer: "Carregando…",
            avoid: "Aguarde · Só um instante",
            why: "State, not request.",
          },
          submit: {
            prefer: "Enviar · Salvar alterações",
            avoid: "Submeter",
            why: "Submeter feels bureaucratic and stiff.",
          },
          register: {
            prefer: "Criar conta · Cadastrar",
            avoid: "Registrar",
            why: "Cadastrar is more common in apps; registrar pulls civic register.",
          },
          you: {
            prefer: "Você",
            avoid: "Tu · Vocês (plural)",
            why: "Você is regionally neutral and formal enough.",
          },
          click: {
            prefer: "Selecione · Toque · Escolha",
            avoid: "Clique aqui",
            why: "Works on mouse, touch, and keyboard.",
          },
          exit: {
            prefer: "Sair",
            avoid: "Logout · Deslogar",
            why: "Sair is plain Portuguese.",
          },
        },
        en: {
          save: {
            prefer: "Save",
            avoid: "Submit changes",
            why: "Save is the web's verb. Direct.",
          },
          cancel: {
            prefer: "Cancel",
            avoid: "Discard · Abort",
            why: "Cancel is neutral. Discard implies loss; abort is harsh.",
          },
          delete: {
            prefer: "Delete · Remove",
            avoid: "Erase · Trash",
            why: "Delete is unambiguous in software contexts.",
          },
          config: {
            prefer: "Settings · Preferences",
            avoid: "Setup · Configuration",
            why: "Settings/Preferences are common; Setup means install.",
          },
          loading: {
            prefer: "Loading…",
            avoid: "Please wait · Just a moment",
            why: "State, not request. The user is not the slow one.",
          },
          submit: {
            prefer: "Save changes · Send",
            avoid: "Submit",
            why: "Submit feels bureaucratic. Be specific.",
          },
          register: {
            prefer: "Create account · Sign up",
            avoid: "Register",
            why: "Register sounds civic. Sign up is the web standard.",
          },
          click: {
            prefer: "Select · Choose · Tap",
            avoid: "Click here",
            why: "Works across mouse, touch, and keyboard.",
          },
          exit: {
            prefer: "Sign out",
            avoid: "Logout · Log off",
            why: "Sign out is plain and complete.",
          },
          select: {
            prefer: "Choose · Pick",
            avoid: "Select an option from the dropdown",
            why: "Choose is shorter and more human.",
          },
        },
      },

      cap: {
        title: "Capitalization",
        kicker: "iv. case",
        desc:
          "Sentence case by default; Title Case only for proper names and the brand. ALL CAPS only in tiny typographic labels (kicker, tags), never in paragraphs.",
        sentenceLabel: "default",
        sentenceTitle: "Sentence case",
        sentenceDesc:
          "Only the first letter is uppercase. Works for headings, buttons, labels, menus, hints, and any running text. It's the Atelier default.",
        sentenceSample: "Account settings",
        titleLabel: "exception",
        titleTitle: "Title Case",
        titleDesc:
          "Each main word capitalized. Reserved for proper names, brands (Atelier, GitHub), and titles of works.",
        titleSample: "Atelier · Style Manual",
        examplesTitle: "Application",
        examples: {
          page: { where: "Page title", text: "Editorial principles" },
          section: { where: "Section title", text: "Tone by context" },
          button: { where: "Button", text: "Save changes" },
          label: { where: "Field label", text: "Contact email" },
          menu: { where: "Menu item", text: "About Atelier" },
          brand: { where: "Brand", text: "Atelier" },
          doc: { where: "Document", text: "Visual Identity Manual" },
        },
      },

      punct: {
        title: "Editorial punctuation",
        kicker: "v. typography of writing",
        desc:
          "Correct marks aren't precious — they give breath and rhythm to text. Use the typographic forms, not the typewriter ones (straight quotes, hyphen instead of em-dash, three loose dots).",
        cross:
          "These marks also appear in [em]Typography · Microtypography[/em] from the mechanical side (font-feature, ligatures). Here we cover editorial usage.",
        items: {
          quotes: {
            name: "Curly quotes",
            use: "For quotation, speech, and irony. Always curly (\u201C \u201D), never straight (\").",
            ex: "She said \u201Cquiet manual\u201D — and she meant it.",
          },
          apostrophe: {
            name: "Apostrophe",
            use: "Curly (\u2019), never straight. Used in English contractions and Portuguese elisions.",
            ex: "It\u2019s a quiet manual. · D\u2019água.",
          },
          emdash: {
            name: "Em-dash",
            use: "For strong parentheticals or emphatic pauses. No spaces in English; spaces in Portuguese.",
            ex: "Typography—the shape of letters—is half the work.",
          },
          endash: {
            name: "En-dash",
            use: "For numeric ranges and relations between two items. No spaces.",
            ex: "Pages 12\u201318 · Boston\u2013NYC route",
          },
          ellipsis: {
            name: "Ellipsis",
            use: "Use the single character (\u2026), not three dots. Indicates continuation or trailing thought.",
            ex: "Loading\u2026 · Maybe, but\u2026",
          },
          ampersand: {
            name: "Ampersand",
            use: "Only in proper names and logos (Drag & Drop, AT&T). In running text, write \u201Cand\u201D.",
            ex: "Drag & Drop · Voice & tone",
          },
          nbsp: {
            name: "Non-breaking space",
            use: "Between number and unit, or between article and short noun, to prevent ugly line breaks.",
            ex: "8\u00A0pt · $\u00A0120 · 24\u00A0h",
          },
          prime: {
            name: "Prime · Double prime",
            use: "For minutes/seconds and inches/feet. Don't confuse with quotes.",
            ex: "5\u2032 9\u2033 · 24\u2032 30\u2033 N",
          },
        },
      },

      person: {
        title: "Person & number",
        kicker: "vi. who speaks, to whom",
        desc:
          "Three stances are at hand. Each has its moment: you for direct dialogue, we for shared agreement, neutral for system notices.",
        whenLabel: "When to use:",
        you: {
          tag: "warm",
          name: "You",
          desc:
            "The default stance. Works for most buttons, hints, help messages, and CTAs. Close without being intimate.",
          when: "instructions, help, forms, button microcopy.",
          ex: "You can edit this at any time.",
        },
        we: {
          tag: "shared",
          name: "We",
          desc:
            "When the Atelier (or the product) does something alongside the person. Establishes complicity without being corporate.",
          when: "marketing, onboarding, change announcements.",
          ex: "We've just redesigned the table. See what changed.",
        },
        neutral: {
          tag: "formal",
          name: "Neutral",
          desc:
            "For system messages, logs, status. No pronouns; the subject is the event. Reserve for situations where adding a person would force intimacy.",
          when: "logs, status, automated messages, critical alerts.",
          ex: "Connection restored. · Session expired.",
        },
      },

      patterns: {
        title: "Microcopy patterns",
        kicker: "vii. living pieces",
        desc:
          "Patterns for the four places microcopy shows up most: buttons, placeholders, confirmations, and labels. Each pattern has a short rule — follow it unless you have strong reason not to.",
        goodLabel: "good",
        badLabel: "avoid",
        items: {
          button: {
            name: "Buttons",
            rule: "infinitive verb · no period",
            desc:
              "The button text says what's about to happen. Start with the verb, sentence case, no period. Specific beats generic.",
            good: ["Save changes", "Create project", "Delete account", "Send invite"],
            bad: ["OK", "Submit", "Click here", "Save changes."],
          },
          placeholder: {
            name: "Placeholders",
            rule: "example, never instruction",
            desc:
              "Placeholder is a format demo, not a label or a hint. Use gray text, real example, no \u201Center your\u2026\u201D.",
            good: ["maria@atelier.studio", "+1 (555) 123-4567", "Search components…"],
            bad: ["Enter your email here", "Please provide a phone number", "Type..."],
          },
          confirm: {
            name: "Confirmations",
            rule: "say what will change",
            desc:
              "Ask about the concrete action, not generic certainty. Show the impact and offer a clear way out.",
            good: [
              "Delete 12 items? This action cannot be undone.",
              "Leave without saving? You'll lose this session's changes.",
            ],
            bad: ["Are you sure?", "Do you really want to continue?", "Confirm operation"],
          },
          label: {
            name: "Field labels",
            rule: "short noun · no colon",
            desc:
              "Use the data's name (\u201CEmail\u201D, not \u201CYour email here\u201D). No colon at the end. Mark optional ones with (optional).",
            good: ["Email", "Phone (optional)", "Billing address"],
            bad: ["Your email:", "Please enter your phone", "Email *"],
          },
          hint: {
            name: "Hints (help text)",
            rule: "one sentence · no period if fragment",
            desc:
              "Appears below the field. Quickly explain format or rule. Full sentence ends with period; fragment doesn't.",
            good: ["Minimum 8 characters", "Used only for password recovery.", "Format: MM/DD/YYYY"],
            bad: ["Please enter a strong, secure password!", "WARNING: required field"],
          },
          error: {
            name: "Error messages",
            rule: "what happened · how to fix",
            desc:
              "Say what failed in one sentence. Say what to do in another. Never blame the person; never use exclamation.",
            good: [
              "Email not found. Check that you typed it correctly.",
              "Wrong password. Try again or reset your password.",
            ],
            bad: ["Error!", "Operation failed. Code: ERR_AUTH_001", "You typed it wrong!"],
          },
        },
      },

      ui: {
        title: "UI messages",
        kicker: "viii. common scenes",
        desc:
          "Five situations every interface faces. Each has a version written by the Atelier and one to avoid — useful for tuning your ear in a few minutes.",
        goodLabel: "good",
        badLabel: "avoid",
        items: {
          empty: {
            name: "Empty state",
            when: "list, table, or panel with no data yet.",
            good: {
              title: "No projects here",
              body: "Create your first project to start using the Atelier.",
              cta: "Create project",
            },
            bad: {
              title: "No data",
              body: "You haven't registered any project in the system yet.",
              cta: "Click here",
            },
          },
          notFound: {
            name: "Page not found (404)",
            when: "missing URL or removed content.",
            good: {
              title: "Page not found",
              body: "The address may have changed, or the content was removed. Try going back to the home page.",
              cta: "Go to home",
            },
            bad: {
              title: "404 — Oops!",
              body: "The page you're looking for doesn't exist! 😢",
              cta: "Home",
            },
          },
          loading: {
            name: "Loading",
            when: "short wait for data or action.",
            good: {
              title: "Loading…",
              body: "Fetching the latest components.",
              cta: "Cancel",
            },
            bad: {
              title: "Please wait!",
              body: "We're getting everything ready for you. Don't close this window!",
              cta: "Wait",
            },
          },
          success: {
            name: "Success",
            when: "completed action with visible effect.",
            good: {
              title: "Changes saved",
              body: "Your settings have been updated.",
              cta: "Continue",
            },
            bad: {
              title: "Success!! 🎉",
              body: "All done! You absolutely nailed it!",
              cta: "Yay!",
            },
          },
          offline: {
            name: "Offline",
            when: "lost connection or network error.",
            good: {
              title: "Offline",
              body: "Your changes are saved locally and will sync when the connection returns.",
              cta: "Try again",
            },
            bad: {
              title: "Network error!",
              body: "Could not connect to the server. Check your internet and try again later.",
              cta: "Retry",
            },
          },
        },
      },

      brand: {
        title: "Brand as narrative",
        kicker: "ix. bilingual · identity",
        desc:
          "The Atelier lives in two languages. The voice is the same — the inflection shifts. Here are the fine differences between PT and EN, and the metaphor that guides all writing.",
        pt: {
          name: "Português (BR)",
          desc:
            "Você as the default address; infinitive verbs in buttons; short commas; em-dash with spaces. No slang, no heavy regionalism, no institutional \u201Cwe\u201D.",
          notes: [
            "Use \u201Cvocê\u201D, never \u201Ctu\u201D.",
            "Write \u201Ce-mail\u201D (with hyphen).",
            "Em-dash with spaces: \u201Cthis — that\u201D.",
            "Dates: 12 de abril, 2026 (long) or 12/04/2026.",
            "Curly quotes \u201C \u201D, even in prose code.",
          ],
        },
        en: {
          name: "English",
          desc:
            "Plain English, US spelling. Contractions allowed (it's, don't). Em-dash without spaces. Title case for proper nouns only — sentence case everywhere else.",
          notes: [
            "Contractions are fine: it's, you'll, don't.",
            "US spelling: color, organize, center.",
            "Em-dash without spaces: \u201Cthis—that.\u201D",
            "Dates: April 12, 2026 (long) or 04/12/2026.",
            "Use the Oxford comma when it removes ambiguity.",
          ],
        },
        metaphorTitle: "Quiet manual",
        metaphor:
          "[em]Good typography is like air: invisible when it works, suffocating when it fails.[/em] The same goes for voice. The Atelier doesn't want to be heard — it wants to be understood. When the interface speaks, it's only because there's something concrete to say. And when it stays silent, it's out of trust.",
        codeTitle: "In code",
        codeDesc:
          "Components carry this voice by default. The lead, the intro, the microcopy — all already calibrated. Use the primitives and the voice comes along.",
      },

      dosDonts: {
        title: "Do · don't",
        do: "do",
        dont: "don't",
        items: [
          {
            do: "Say what happened and what to do next.",
            dont: "Use \u201Coops\u201D, emojis, or exclamations to soften errors.",
          },
          {
            do: "Start buttons with a verb, sentence case, no period.",
            dont: "Write \u201COK\u201D, \u201CSubmit\u201D, or \u201CClick here\u201D.",
          },
          {
            do: "Use placeholders as format examples.",
            dont: "Repeat the label inside the placeholder.",
          },
          {
            do: "Reserve title case for proper names and brands.",
            dont: "Capitalize Every Word in Every Title.",
          },
          {
            do: "Use \u201Csave\u201D in EN, \u201Csalvar\u201D in PT.",
            dont: "Mix languages within the same interface.",
          },
        ],
      },
    },

    spacing: {
      lead: "Foundation · 05",
      titleA: "The ",
      titleB: "space",
      metaLabel: "Base",
      meta: "8pt",
      intro:
        "Every measurement is a multiple of 4 — ideally 8. Space is the main [em]material[/em] of composition: it breathes the layout and sets the rhythm of reading.",
      scaleTitle: "Scale",
      scaleKicker: "8pt grid",
      gridTitle: "Editorial grid",
      gridKicker: "12 columns",
      gridDesc:
        "A maximum column of 1080px across 12 subcolumns. 24px gutters. Content respects generous margins in every direction.",
      rulesTitle: "Usage rules",
      rulesKicker: "rhythm",
      rules: [
        {
          n: "I",
          t: "Inside a component",
          b:
            "Use 4–12px. No more. The component should feel like a single coherent object.",
        },
        {
          n: "II",
          t: "Between components",
          b:
            "Use 16–32px. Space separates without dividing — like paragraphs in an essay.",
        },
        {
          n: "III",
          t: "Between sections",
          b: "Use 48–96px. A change of subject asks for a pause. Give it one.",
        },
      ],
    },

    icons: {
      lead: "Foundation · 06",
      titleA: "The ",
      titleB: "glyphs",
      metaLabel: "Library",
      meta: "Only the essential",
      intro:
        "We use typographic glyphs before drawn icons. Unicode characters rendered in Fraunces carry the same language as the text — [em]less noise, more cohesion[/em].",
      repertoireTitle: "Repertoire",
      repertoireKicker: "unicode",
      contextTitle: "In context",
      contextKicker: "inline usage",
      contextDesc:
        "Within running text, a glyph should keep the same typographic weight. When featured (numerals, editorial arrows), it accepts the red accent.",
      contextPhrase: "Keep reading",
      contextPhraseB: " move to the next section. Or return ",
      contextPhraseC: " to the top.",
      names: {
        arrow: "arrow",
        enter: "enter",
        close: "close",
        add: "add",
        remove: "remove",
        more: "more",
        section: "section",
        paragraph: "paragraph",
        check: "check",
        alert: "alert",
        info: "info",
        help: "help",
      },
    },

    /* ------------- Elevation ------------- */
    elevation: {
      lead: "Foundation · 07",
      titleA: "The ",
      titleB: "elevation",
      metaLabel: "Shadow",
      meta: "Flat by default",
      intro:
        "Atelier is [em]flat by default[/em]. Shadow is signal — when present, it carries meaning: it separates a temporary context (open popover), reinforces an editorial surface (featured card in a listing), or communicates a drag in progress. Every shadow is tokenized; arbitrary opacity does not pass review.",
      scaleTitle: "The scale",
      scaleKicker: "--shadow-*",
      scaleDesc:
        "Four steps, from nothing to floating-card elevation. Moving from one level to the next roughly doubles the diffusion. Calibrated differently in light and dark — in dark mode, shadow needs to be more pronounced to survive the anthracite.",
      whenTitle: "When to elevate",
      whenKicker: "editorial decision",
      whenDesc:
        "Elevation only justifies its visual cost when it carries functional meaning. To divide content, prefer [em]--rule-soft[/em] — discreet border, no noise.",
      rules: [
        {
          n: "I",
          t: "Don't use",
          b: "For any card, panel or section that IS in the page flow. The rule does the work.",
        },
        {
          n: "II",
          t: "Use --shadow-sm",
          b: "On surfaces that [em]rest[/em] above the content: sticky header, navbar fixed on scroll.",
        },
        {
          n: "III",
          t: "Use --shadow-md",
          b: "On popovers, dropdowns and tooltips — temporary overlays that need to detach themselves without dominating.",
        },
        {
          n: "IV",
          t: "Use --shadow-lg",
          b: "On modals, drawers and dragged cards (drag preview). Maximum elevation is event, not state.",
        },
      ],
      themeTitle: "Light vs Dark",
      themeKicker: "comparison",
      themeDesc:
        "The same scene in both themes. In dark, the shadow is more opaque to overcome the reduced contrast against anthracite — the token solves this automatically.",
    },

    /* ------------- Radius ------------- */
    radius: {
      lead: "Foundation · 08",
      titleA: "The ",
      titleB: "corners",
      metaLabel: "Border-radius",
      meta: "Sharp corners by default",
      intro:
        "Atelier respects the right angle — an editorial inheritance from modernist covers and geometric typography. [em]--radius-none is the default[/em] and covers 90%+ of the DS. The scale exists not to soften, but to authorize controlled exceptions where curvature carries functional meaning, not decorative.",
      scaleTitle: "The scale",
      scaleKicker: "--radius-*",
      scaleDesc:
        "Five values, from absolute right angle to circular. The transition between adjacent levels is deliberately subtle (2px → 4px → 8px) — the big jump only happens when reaching [em]--radius-full[/em], which enters as a separate category: complete geometric form.",
      whenTitle: "When to round",
      whenKicker: "editorial decision",
      whenDesc:
        "Each exception must justify itself. These are the canonical cases where the soft corner passes review.",
      rules: [
        {
          n: "I",
          t: "--radius-sm (2px)",
          b: "Discreet tags, kbd, very small status pills. Softens just enough so the pixel doesn't fight the text.",
        },
        {
          n: "II",
          t: "--radius-md (4px)",
          b: "Buttons with personality, rounded badges, inputs in friendlier contexts (e.g., public forms).",
        },
        {
          n: "III",
          t: "--radius-lg (8px)",
          b: "Cards, popovers and drawers that ask for softness — temporary overlays that want to step away from the main surface.",
        },
        {
          n: "IV",
          t: "--radius-full (9999px)",
          b: "Avatar, Switch, dot pulse, status dots. Complete circular form — it's a category, not a gradient.",
        },
      ],
    },

    /* ------------- Z-Index ------------- */
    zIndex: {
      lead: "Foundation · 09",
      titleA: "The ",
      titleB: "layers",
      metaLabel: "Stacking",
      meta: "One fixed scale",
      intro:
        "Before this scale, each overlay declared its own ad-hoc z-index — Drawer 1000, Toast 9999, Combobox 100. The result: unpredictable stacking. Here we fix the official hierarchy in [em]nine named layers[/em]. If a component 'needs to fit between two levels', it's in the wrong layer.",
      stackTitle: "The stack",
      stackKicker: "--z-*",
      stackDesc:
        "From bottom to top, from background plane to absolute top. Each level is meant for a specific type of overlay — there's no no-man's-land between them.",
      diagramTitle: "Editorial diagram",
      diagramKicker: "the nine layers",
      diagramDesc:
        "Visualization of the stack as seen from the side. Skip-link always remains above — after all, it's last-resort a11y; it must survive even an open modal.",
      rulesTitle: "Rules",
      rulesKicker: "editorial decisions",
      rules: [
        {
          n: "I",
          t: "Don't interpolate",
          b: "NEVER invent z-index between levels (e.g., 350). If the component 'needs to fit between', it's in the wrong layer.",
        },
        {
          n: "II",
          t: "Toaster > Modal",
          b: "Notifications need to emerge even over dialogs. It's an editorial decision — information > temporary focus.",
        },
        {
          n: "III",
          t: "Palette > Toast",
          b: "Command palette (⌘K) is the user's action; Toaster is system. Human action always wins.",
        },
        {
          n: "IV",
          t: "Skip-link on top",
          b: "Always. Accessibility is function before aesthetics — it should be visible even above everything else.",
        },
      ],
    },

    /* ------------- Breakpoints ------------- */
    breakpoints: {
      lead: "Foundation · 10",
      titleA: "The ",
      titleB: "breakpoints",
      metaLabel: "Responsive",
      meta: "Five points, no drift",
      intro:
        "The legacy codebase contained [em]nine different values[/em] in @media queries (480, 560, 600, 700, 720, 900, 960, 1080, 1280). This scale consolidates into five editorial points covering every case. CSS Custom Properties don't yet work inside @media — the token lives parallel to the literal number, with a comment pairing the two.",
      scaleTitle: "The scale",
      scaleKicker: "--bp-*",
      scaleDesc:
        "Five points covering from phone to 2K+. Each name carries an editorial intent — it's not just screen size, it's the type of reading that happens there.",
      visualizerTitle: "Visualizer",
      visualizerKicker: "current viewport",
      visualizerDesc:
        "Resize the window and see which breakpoint is active. The bar below lights up at the current level and shows the corresponding literal number.",
      jsTitle: "In JavaScript",
      jsKicker: "useMediaQuery",
      jsDesc:
        "The [em]useMediaQuery[/em] hook from Phase 10 reads these tokens via [em]matchMedia[/em] and exposes a reactive boolean. In CSS, we keep the literal number paired with a comment of the token — pragmatic solution until CSSWG approves @media with vars.",
    },

    /* ------------- Density ------------- */
    density: {
      lead: "Foundation · 11",
      titleA: "The ",
      titleB: "density",
      metaLabel: "Compactness",
      meta: "Cascades via CSS vars",
      intro:
        "Components don't need a new prop to vary density. The DS exposes [em]four variables[/em] (padding-x, padding-y, gap, text) with default value = comfortable. Apply [em].is-density-compact[/em] or [em].is-density-spacious[/em] on any ancestor — variables cascade, and each component that consumes them reacts automatically.",
      scaleTitle: "The three levels",
      scaleKicker: "compact / comfortable / spacious",
      scaleDesc:
        "The same component in three densities, side by side. Compact for tables with lots of content, dense dashboards, dev tools. Spacious for landing, onboarding, discovery contexts.",
      tokensTitle: "The tokens",
      tokensKicker: "--density-*",
      tokensDesc:
        "Four variables that components consume. The default at :root is [em]comfortable[/em] — without a class prefix, any component comes in comfortable mode.",
      howTitle: "How to apply",
      howKicker: "scoping",
      howDesc:
        "Apply the class on a common ancestor — from an isolated <section> to the entire <main>. CSS Custom Properties cascade by default; no component needs to be aware of the change.",
    },

    /* ------------- Motion ------------- */
    motion: {
      lead: "Foundation · 12",
      titleA: "The ",
      titleB: "motion",
      metaLabel: "Animation",
      meta: "Formal layer · zero-deps",
      intro:
        "Before Phase 4, the DS used ad-hoc transitions — each component decided its own duration and curve. Now there's a shared vocabulary: five primitives ([em]Transition / Fade / Slide / Scale / Collapse[/em]), a scroll wrapper ([em]ScrollReveal[/em]), and page transitions. Everything respects prefers-reduced-motion automatically.",
      durTitle: "Durations",
      durKicker: "--dur-*",
      durDesc: "Four points: micro-feedback, default, editorial transitions, page-level. Curate the time, not the opinion.",
      easeTitle: "Easings",
      easeKicker: "--ease-*",
      easeDesc:
        "Six named curves. [em]--ease[/em] is the default (smooth in-out); use [em]--ease-out[/em] for entry, [em]--ease-in[/em] for exit. The rest are exceptions — discuss before adding a seventh.",
      primTitle: "Primitives",
      primKicker: "<Fade> · <Slide> · <Scale>",
      primDesc:
        "Shortcuts over <Transition>. Take a single child and inject className + style — no extra DOM wrapper. Toggle to see entry/exit.",
      collapseTitle: "Collapse",
      collapseKicker: "height: auto",
      collapseDesc:
        "Animates height correctly — measures with getBoundingClientRect, transitions, restores auto. Useful for accordions, disclosure, generic expand/collapse.",
      collapseOpen: "open",
      collapseClose: "close",
      revealTitle: "ScrollReveal",
      revealKicker: "IntersectionObserver",
      revealDesc:
        "Wrapper that animates entry as the element appears in the viewport. Direction (up/down/left/right), delay, threshold. Once=true disconnects after first entry (default).",
      pageTitle: "Page transitions",
      pageKicker: "usePageTransition",
      pageDesc:
        "Lightweight hook consumed by the router — instead of a complex state machine, uses the React strategy: [em]key={current}[/em] forces remount, CSS animates entry. Scroll persistence opt-in via flag.",
      rulesTitle: "When NOT to animate",
      rulesKicker: "editorial decisions",
      rulesDesc: "Every animation costs attention. These are the rules that filter exception from excess.",
    },

    buttons: {
      lead: "Component · 13",
      titleA: "The ",
      titleB: "buttons",
      metaLabel: "Variants",
      meta: "5 · 3 sizes",
      intro:
        "A button is a gesture. Five variants cover everything from the primary call to the discreet link. All uppercase, monospaced, un-rounded — [em]clickable at first glance[/em].",
      variants: { title: "Variants", kicker: "hierarchy", caption: "Five variants" },
      sizes: { title: "Sizes", kicker: "sm · md · lg", caption: "Three sizes" },
      states: { title: "States", kicker: "hover · disabled", caption: "Disabled and focused" },
      glyphs: {
        titleA: "With ",
        titleB: "glyph",
        kicker: "inline mark",
        caption: "Typographic glyphs",
      },
      group: { title: "In a group", kicker: "actions row", caption: "Action bar" },
      sidebarToggle: {
        title: "Collapse the navigation",
        kicker: "sidebar toggle",
        caption: "Two states, one gesture",
        note:
          "The [acc]SidebarToggle[/acc] is a dedicated button to collapse the side navigation. It is [em]fully controlled[/em] — accepts [em]collapsed[/em] and [em]onToggle[/em]. The chevron rotates 180° when the sidebar is hidden. Use [em]Ctrl + B[/em] to toggle without leaving the keyboard.",
      },
      backToTop: {
        title: "Back to top",
        kicker: "back to top",
        caption: "Appears after scroll",
        note:
          "The [acc]BackToTop[/acc] is [em]self-contained[/em]: it listens to scroll and fades in after [em]threshold[/em] pixels (default 320). On click it scrolls the page to the top — with [em]smooth scroll[/em] or instantly, depending on the user's system preference. It is always mounted on this page; scroll down to see it appear in the bottom-right corner.",
      },
      labels: {
        primary: "Confirm",
        secondary: "Secondary",
        accent: "Featured action",
        ghost: "Ghost",
        link: "Editorial link",
        sm: "Small",
        md: "Medium",
        lg: "Large",
        active: "Active",
        disabled: "Disabled",
        next: "Next",
        newItem: "New item",
        download: "Download",
        cancel: "Cancel",
        draft: "Draft",
        publish: "Publish",
      },
    },

    inputs: {
      lead: "Component · 14",
      titleA: "The ",
      titleB: "fields",
      metaLabel: "Types",
      meta: "Input · Textarea · Select",
      intro:
        "Quiet fields — soft borders until focus arrives. No tricks; just a thin, legible line that turns [em]red[/em] when attention is paid.",
      text: { title: "Text", kicker: "input", caption: "Default input" },
      textarea: { title: "Text areas", kicker: "textarea", caption: "For long content" },
      select: { title: "Selection", kicker: "select", caption: "Dropdowns" },
      labels: {
        fullName: "Full name",
        fullNameHint: "How would you like to be addressed?",
        fullNamePh: "Clara Almeida",
        email: "Email",
        emailHint: "A valid, unique address",
        emailError: "Invalid email.",
        disabled: "Disabled",
        disabledValue: "Cannot be edited",
        about: "About you",
        aboutHint: "Max 280 characters.",
        aboutPh: "A line, a paragraph, a brief essay…",
        edition: "Edition",
        format: "Format",
        formatOpts: ["Magazine", "Newspaper", "Book"],
      },
    },

    controls: {
      lead: "Component · 15",
      titleA: "The ",
      titleB: "controls",
      metaLabel: "Binary",
      meta: "Checkbox · Radio · Switch",
      intro:
        "A single touch, an immediate response. Controls wear the same geometry as fields — straight edges, solid markers in [em]red[/em] when active.",
      check: { title: "Checkboxes", kicker: "checkbox", caption: "Multiple choice" },
      radio: { title: "Radio buttons", kicker: "radio", caption: "Single choice" },
      switch: { title: "Switches", kicker: "switch", caption: "Discreet toggle" },
      labels: {
        monthly: "I agree to receive the monthly edition",
        early: "I want early access to drafts",
        disabled: "Disabled",
        uncheckedDisabled: "Unchecked and disabled",
        plans: [
          "Monthly — $ 6",
          "Quarterly — $ 16",
          "Annual — $ 56",
        ],
        emailNotif: "Email notifications",
        quietMode: "Quiet mode",
      },
    },

    badges: {
      lead: "Component · 16",
      titleA: "The ",
      titleB: "badges",
      metaLabel: "Small",
      meta: "Only the label",
      intro:
        "Monospaced uppercase labels. They classify — never decorate. A [em]dot[/em] on the left indicates an active state.",
      variants: { title: "Variants", kicker: "status", caption: "One family, many shades" },
      dot: { titleA: "With ", titleB: "dot", kicker: "live state", caption: "Presence indicator" },
      context: { title: "In context", kicker: "inline", caption: "Next to an article title" },
      labels: {
        default: "Default",
        solid: "Solid",
        accent: "Featured",
        ok: "Success",
        warn: "Warning",
        info: "Info",
        published: "Published",
        draft: "Draft",
        edited: "Edited",
        archived: "Archived",
        new: "New",
      },
      contextTitleA: "The ",
      contextTitleB: "morning",
      contextTitleC: " begins in the headline",
      contextDate: "Apr · 18",
    },

    avatars: {
      lead: "Component · 17",
      titleA: "The ",
      titleB: "avatars",
      metaLabel: "Identity",
      meta: "Portrait · presets · upload",
      intro:
        "An [em]avatar[/em] is the quiet portrait of who writes — initials, a personal picture, or one of the atelier’s presets. Many forms, one tone.",
      variants: {
        title: "Variants",
        kicker: "base state",
        caption: "Three typographic shades",
      },
      sizes: {
        title: "Sizes",
        kicker: "scale",
        caption: "From a discreet glyph to an editorial portrait",
      },
      image: {
        title: "With image",
        kicker: "photographic",
        caption: "Direct upload, with graceful fallback to initials",
      },
      presets: {
        title: "Atelier presets",
        kicker: "ready to wear",
        caption: "Monograms, shapes, and ornaments",
      },
      picker: {
        title: "Complete picker",
        kicker: "upload + crop + gallery",
        caption: "Upload a photo, frame it, or pick a preset",
        currentLabel: "Current",
        stateImage: "Custom image",
        statePreset: "Atelier preset",
        stateInitials: "Initials only",
        remove: "Remove and go back to initials",
        uploadA: "Drag an ",
        uploadB: "image",
        uploadC: " or click to pick",
        uploadHint: "PNG, JPG, SVG · up to a few MB",
        zoom: "Zoom",
        cancel: "Cancel",
        apply: "Apply",
        groups: {
          monogram: "Monograms",
          geometric: "Geometric",
          ornament: "Ornaments",
        },
      },
      group: {
        title: "Avatar group",
        kicker: "stack",
        caption: "Up to four visible; remainder becomes a counter",
      },
    },

    alerts: {
      lead: "Component · 18",
      titleA: "The ",
      titleB: "alerts",
      metaLabel: "Variants",
      meta: "4 tones",
      intro:
        "Static block messages, for text that needs careful reading. A colored bar on the left and a glyph flag the [em]subject[/em] without shouting.",
      info: {
        title: "Information",
        kicker: "info",
        caption: "Cool color, calm reading",
        alertTitle: "About this edition",
        alertText:
          "Atelier publishes one issue per quarter. You can subscribe in the sidebar to receive a brief note on launch day.",
      },
      ok: {
        title: "Success",
        kicker: "ok",
        caption: "Action well completed",
        alertTitle: "Draft published",
        alertText:
          "Your piece has been published in the April edition. Thank you for writing with us.",
      },
      warn: {
        title: "Warning",
        kicker: "warn",
        caption: "Something needs your review",
        alertTitle: "Three images without caption",
        alertText:
          "Before publishing, we recommend adding captions to the featured images. The editor will keep working normally.",
      },
      danger: {
        title: "Danger",
        kicker: "danger",
        caption: "Something stopped the action",
        alertTitle: "Could not save",
        alertText:
          "We lost the connection mid-upload. Nothing you wrote was lost — try again when the network is back.",
      },
    },

    cards: {
      lead: "Component · 19",
      titleA: "The ",
      titleB: "cards",
      metaLabel: "Blocks",
      meta: "Tabular content",
      intro:
        "A card is a [em]paragraph inside a page[/em]: kicker, title, body and footer. Always rectangular, always on paper.",
      editorial: {
        title: "Editorial pattern",
        kicker: "kicker · title · body",
        caption: "Three cards in a grid",
      },
      actions: {
        titleA: "With ",
        titleB: "actions",
        kicker: "actionable",
        caption: "Card with CTA",
      },
      profile: {
        title: "Profile",
        kicker: "avatar + meta",
        caption: "Featured author",
      },
      items: [
        {
          kicker: "Chronicle · 04",
          titleA: "On the ",
          titleB: "silence",
          titleC: " of interfaces",
          body:
            "There is a difference between quiet and empty. Not every pause asks for noise to fill it — sometimes, space [em]is[/em] the content.",
          foot: "By Clara A. · 5 min",
        },
        {
          kicker: "Essay · 02",
          titleA: "The serif and its ",
          titleB: "place",
          titleC: "",
          body:
            "Fraunces is a love letter to 19th-century type, written with 2026 vocabulary. A modern serif that welcomes italic flourishes.",
          foot: "By J. Mesquita · 8 min",
        },
        {
          kicker: "Manual · 01",
          titleA: "Five ",
          titleB: "rules",
          titleC: " for a ruler",
          body:
            "A coherent measure turns good work into comparable work. We start at 8pt — then we negotiate.",
          foot: "By Atelier Team · 3 min",
        },
      ],
      subscription: {
        kicker: "Subscription · annual",
        titleA: "Atelier, ",
        titleB: "every quarter",
        body:
          "Four printed editions, the full digital archive and an invitation to the annual readers' gathering.",
        price: "$ 56 / year",
        cta: "Subscribe",
      },
      author: {
        role: "Editor-in-chief",
        nameA: "Joaquim ",
        nameB: "Álvaro",
        active: "Active",
        count: "12 articles",
      },
    },

    tabs: {
      lead: "Component · 20",
      titleA: "The ",
      titleB: "tabs",
      metaLabel: "Navigation",
      meta: "5 variants · 2 orientations",
      intro:
        "Tabs to switch views inside a single page. The [em]red color[/em] marks the present — the rest is silence. Five variants for different levels of [em]visual emphasis[/em].",
      tabs: {
        foundations: {
          label: "Foundations",
          body:
            "Colors, typography and spacing. The silent spine everything rests upon — the rest is orchestration.",
        },
        components: {
          label: "Components",
          body:
            "Refined instruments. Each has a single clear function and responds predictably to the same cues.",
        },
        patterns: {
          label: "Patterns",
          body:
            "How to compose instruments into larger pieces — forms, navigations, empty states. Recipes, not rules.",
        },
      },
      variants: {
        underline: {
          title: "Underline",
          kicker: "default · canon",
          desc:
            "The default and most discreet variant. [em]Accent[/em] line under the active tab, subtle divider. Used across the entire Atelier docs.",
          caption: "Underline tabs — true to the editorial DNA",
        },
        enclosed: {
          title: "Enclosed",
          kicker: "enclosed",
          desc:
            "Tabs with borders connected to the panel below. Visual of [em]folders/binders[/em] — more corporeal, ideal for settings areas.",
          caption: "Enclosed tabs — for dense contexts",
        },
        pills: {
          title: "Pills",
          kicker: "pills",
          desc:
            "Active tab with accent background + inverse text. [em]Right angles[/em] (no radius) preserve the canon. Best for switching between a few modes with strong emphasis.",
          caption: "Pills — maximum emphasis on the active tab",
        },
        segmented: {
          title: "Segmented",
          kicker: "segmented",
          desc:
            "All tabs in a [em]single box[/em], split by inner lines. Same language as ThemeToggle and NavModeToggle. For 2-4 options of equal importance.",
          caption: "Segmented control — toggle visual",
        },
        minimal: {
          title: "Minimal",
          kicker: "minimal",
          desc:
            "Text only. The active tab is set apart by [em]accent color[/em] and slightly firmer weight. For long lists where visual indicators would distract.",
          caption: "Minimal — absolute silence",
        },
        vertical: {
          title: "Vertical orientation",
          kicker: "orientation=\"vertical\"",
          desc:
            "TabList becomes a left column; the panel takes the right. Works with [em]any variant[/em] — useful in settings panels and sub-pages.",
          caption: "Vertical tabs — internal sidebar",
        },
        extras: {
          title: "Glyphs and counts",
          kicker: "glyph + count",
          desc:
            "Each Tab optionally accepts a [em]glyph[/em] (serif symbol before the label) and a [em]count[/em] (mono badge after). Use sparingly.",
          caption: "Tabs with glyph and count",
        },
      },
    },

    tables: {
      lead: "Component · 21",
      titleA: "The ",
      titleB: "tables",
      metaLabel: "Data",
      meta: "Dense but breathable",
      intro:
        "Serif tables with mono metadata. No zebra — we rely on the [em]line[/em] to separate data. Hover is the only surprise.",
      standardTitle: "Standard structure",
      standardKicker: ".ds-table",
      standardCaption: "Articles list",
      headers: { n: "No.", title: "Title", author: "Author", state: "State", date: "Date" },
      states: { published: "Published", draft: "Draft", review: "Review" },
      readCta: "Read →",
      rows: [
        { n: "001", title: "The morning begins in the headline", author: "Clara A.", stateKey: "published", date: "Apr · 18" },
        { n: "002", title: "On the silence of interfaces", author: "J. Mesquita", stateKey: "draft", date: "Apr · 14" },
        { n: "003", title: "The serif and its place", author: "Ana L.", stateKey: "review", date: "Apr · 09" },
        { n: "004", title: "Five rules for a ruler", author: "Atelier", stateKey: "published", date: "Apr · 02" },
      ],
    },

    charts: {
      lead: "Component · 22",
      titleA: "The ",
      titleB: "charts",
      metaLabel: "Visualization",
      meta: "Quiet data",
      intro:
        "When numbers must be spoken, [em]speak them softly[/em]. Every Atelier chart is editorial — no heavy grids, no saturated areas. The accent is used [em]once[/em] to mark what matters; the rest fades into [em]faint ink[/em].",
      gallery: {
        title: "Gallery",
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
        editions: "editions",
        subscribers: "subscribers",
        visits: "visits",
        reads: "reads",
        engagement: "engagement",
        bounce: "bounce",
      },
      bar: {
        var1: "Monthly growth",
        var2: "Quarters of the year",
        var3: "Weekly visits",
        var4: "Stable — with values",
      },
      line: {
        var1: "Growth — 8 months",
        var2: "Continuous decline",
        var3: "Oscillation (no dots)",
        var4: "Full year",
      },
      area: {
        var1: "Growth with volume",
        var2: "Stable — high base",
        var3: "Heavy oscillation",
      },
      pie: {
        var1: "Pie with legend",
        var2: "Donut with total",
        var3: "Binary coverage",
        var4: "Binary donut",
      },
      radar: {
        var1: "Single profile",
        var2: "Two brands compared",
      },
      radial: {
        var1: "Multiple metrics",
        var2: "Single completion",
        average: "Average",
        completion: "Completed",
      },
      tooltips: {
        intro:
          "All charts respond to the mouse. The tooltip block [em]matches the `Tooltip` atomic component exactly[/em] — single mono line, inverse palette, no extra chrome. Use these variations to see the behaviour on each chart type.",
        var1: "Simple tooltip (label · value)",
        var2: "Tooltip with unit",
        var3: "Line — dashed guideline",
        var4: "Pie — highlight by opacity",
      },
      spark: {
        title: "Sparkline",
        kicker: "metric",
        caption: "A tiny chart beside a metric — direction without narrative.",
        metric1Label: "Current edition",
        metric2Label: "Subscribers",
        metric3Label: "Next",
      },
      composition: {
        title: "Composition",
        titleB: "tree",
        kicker: "structure",
        caption:
          "Use the following [em]composition[/em] to wrap any Atelier chart — each node is an exported subcomponent.",
      },
    },

    overlays: {
      lead: "Component · 23",
      titleA: "The ",
      titleB: "overlays",
      metaLabel: "Focus",
      meta: "Modal · Tooltip",
      intro:
        "They interrupt reading with ceremony. A [em]modal[/em] demands full attention; a [em]tooltip[/em] only whispers context.",
      modal: {
        title: "Modal",
        kicker: ".ds-modal",
        caption: "Locks the background and takes focus",
        open: "Open modal",
        titleA: "Discard ",
        titleB: "draft",
        titleC: "?",
        body:
          "Your draft will be removed from Atelier and cannot be recovered. This is a final action — we pause a moment to make sure it is truly what you want.",
      },
      tooltip: {
        title: "Tooltip",
        kicker: ".ds-tt",
        caption: "Context on hover / focus",
        copy: "Copy",
        copyTip: "Copy to clipboard",
        download: "Download",
        downloadTip: "Download as file",
        publish: "Publish",
        publishTip: "This action is permanent",
      },
    },

    feedback: {
      lead: "Component · 24",
      titleA: "The ",
      titleB: "return",
      metaLabel: "Progress · Toast",
      meta: "Discreet responses",
      intro:
        "Feedback is kindness. Thin bars for time, short messages that appear and [em]disappear[/em].",
      progress: {
        title: "Progress bar",
        kicker: ".ds-progress",
        caption: "Determinate progress",
        label: "Uploading file",
        finish: "Finish",
        reset: "Reset",
      },
      toast: {
        title: "Toast",
        kicker: ".ds-toast",
        caption: "Fleeting message",
        confirm: "Show confirmation",
        save: "Save draft",
        simulate: "Simulate error",
        copied: "Copied to clipboard",
        saved: "Draft saved",
        lost: "Connection lost",
      },
    },

    dropzone: {
      lead: "Component · 25",
      titleA: "The ",
      titleB: "dropzone",
      metaLabel: "Files",
      meta: "Drag & drop",
      intro:
        "This design system grew from a small CSV converter. The component that gave it shape is preserved here: a typographic, editorial [em]dropzone[/em].",
      empty: {
        title: "Empty",
        kicker: "idle state",
        caption: "Inviting cursor, dashed area",
        dragA: "Drop a ",
        dragB: "file",
        dragC: " here",
        orPick: "or click to pick one",
      },
      filled: {
        title: "With file",
        kicker: "filled state",
        caption: "Selected file card",
        size: "Size",
        type: "Type",
        modified: "Modified",
        reset: "Remove and restart",
        defaultType: "text/plain",
        hint: "Pick a file in the section above to preview this state.",
      },
    },

    pagination: {
      lead: "Component · 26",
      titleA: "The ",
      titleB: "pagination",
      metaLabel: "Long list",
      meta: "Paginate lists and tables",
      intro:
        "Different from [em]PageNav[/em] (which guides the reader between manual chapters), [em]Pagination[/em] lives [em]inside a page[/em] — it slices long lists and tables into comfortable chunks.",
      default: {
        title: "Default",
        kicker: "default",
        caption: "Prev/next, visible numbers and ellipses to abbreviate when there are many pages.",
      },
      labeled: {
        title: "With labels",
        kicker: "showLabels",
        caption: "Shows \"Previous · Next\" as text alongside the arrows — useful in dense interfaces.",
      },
      edges: {
        title: "At the edges",
        kicker: "first · last",
        caption: "Behaviour on the first and last page — one of the buttons becomes disabled.",
      },
      compact: {
        title: "Compact",
        kicker: "siblings=0",
        caption: "No siblings — saves space in narrow bars.",
      },
      composable: {
        title: "Composable",
        kicker: "subcomponents",
        caption:
          "For special cases (custom labels, different icons), build it by hand with [em]PaginationItem[/em] and friends.",
      },
      composition: {
        title: "Composition",
        titleB: "tree",
        kicker: "structure",
        caption:
          "Use the [em]composition[/em] below to build pagination by hand.",
      },
    },

    breadcrumbs: {
      lead: "Component · 27",
      titleA: "The ",
      titleB: "breadcrumbs",
      metaLabel: "Location",
      meta: "Navigation trail",
      intro:
        "A discreet trail of [em]where the reader is[/em] in the site map — shows the hierarchical path, separated by a glyph. Used in apps with more than two levels.",
      short: {
        title: "Short form",
        kicker: "items prop",
        caption: "Pass an array of strings; the last item becomes current automatically.",
      },
      separator: {
        title: "Custom separator",
        kicker: "separator prop",
        caption: "Swap the separator glyph to match the project's typographic voice.",
      },
      deep: {
        title: "Deep trails",
        kicker: "3 to 4 levels",
        caption: "The whole path — useful in documentation sites or catalogues.",
        a: ["Atelier", "Components", "Tabs"],
        b: ["Atelier", "Foundations", "Colors", "Accent"],
      },
      composable: {
        title: "Composable",
        kicker: "subcomponents",
        caption:
          "For links with custom onClick or a different Current, use the [em]subcomponents[/em] directly.",
      },
      composition: {
        title: "Composition",
        titleB: "tree",
        kicker: "structure",
        caption:
          "Use the [em]composition[/em] below to build a navigation trail by hand.",
      },
    },

    skeleton: {
      lead: "Component · 28",
      titleA: "The ",
      titleB: "skeletons",
      metaLabel: "Wait",
      meta: "Loading placeholders",
      intro:
        "While content loads, the skeleton pulses discreetly — [em]editorial patience[/em], not the rush of aggressive shimmer found in generic libraries. The reader knows something is on its way.",
      shapes: {
        title: "Shapes",
        kicker: "rect · circle",
        caption: "The basic blocks: rectangle (text, image) and circle (avatar).",
      },
      text: {
        title: "Text",
        kicker: "lines",
        caption: "Multiple lines — the last one is shorter, mimicking the end of a paragraph.",
      },
      card: {
        title: "Composed card",
        kicker: "card",
        caption: "Common composition: avatar + title + body lines. For lists and feeds.",
      },
      static: {
        title: "No pulse",
        kicker: "pulse=false",
        caption:
          "For when the wait is [em]very short[/em] — the pulse would be more noisy than absent.",
      },
      composition: {
        title: "Composition",
        titleB: "tree",
        kicker: "structure",
        caption:
          "Use the [em]subcomponents[/em] below according to the shape of the loading content.",
      },
    },

    /* ------------- Popover ------------- */
    popover: {
      lead: "Advanced · 32",
      titleA: "The ",
      titleB: "popover",
      metaLabel: "Overlay",
      meta: "Foundation for menus, rich tooltips, datepickers",
      intro:
        "An anchored, positioned panel. It's the [em]primitive[/em] from which DropdownMenu, ContextMenu — and soon Combobox and DatePicker — are built. No external libs: positioning in ~40 lines, with auto-flip and viewport clamping.",
      basic: {
        title: "Basic usage",
        kicker: "primitive",
        desc:
          "Trigger + Content. No required props — open/close state is internal (uncontrolled).",
        caption: "Basic popover next to the trigger",
        btn: "Open popover",
        body:
          "Arbitrary content. Accepts any ReactNode — text, form, list, chart.",
      },
      placements: {
        title: "Twelve placements",
        kicker: "placement",
        desc:
          "[em]side-align[/em]. Four sides (top, right, bottom, left) × three alignments (start, center, end). Default: [em]bottom-start[/em].",
        caption: "All 12 possible placements",
      },
      arrow: {
        title: "With indicator",
        kicker: "arrow",
        desc:
          "Angular triangle pointing to the trigger. Useful when the panel might appear visually disconnected from what opened it.",
        caption: "Popover with arrow",
        btn: "Open with arrow",
        body:
          "The triangle is drawn in pure CSS (no SVG) — preserving Atelier's angular language.",
      },
      form: {
        title: "Rich content",
        kicker: "rich content",
        desc:
          "Accepts any React composition — forms, lists, panels. Focus stays trapped inside the panel until the user closes it.",
        caption: "Popover with inline form",
        btn: "Edit name",
        label: "Display name",
        placeholder: "How would you like to be called?",
        save: "Save",
        cancel: "Cancel",
      },
      flip: {
        title: "Auto-flip",
        kicker: "viewport-aware",
        desc:
          "If the panel doesn't fit on the preferred side, Popover [em]flips[/em] automatically to the opposite side. Try opening a trigger near the bottom edge of the screen with placement=\"bottom\" — it opens upward by itself.",
      },
      composition: {
        title: "Composition",
        titleB: "tree",
        kicker: "structure",
        caption: "The Popover subcomponents.",
      },
    },

    /* ------------- DropdownMenu ------------- */
    dropdownMenu: {
      lead: "Advanced · 33",
      titleA: "The ",
      titleB: "menus",
      metaLabel: "Actions",
      meta: "Built on Popover",
      intro:
        "Action menu triggered by a button. Items, separators, group labels, [em]checkbox/radio[/em], mono shortcuts, serif glyphs, destructive items. Full keyboard navigation.",
      basic: {
        title: "Basic usage",
        kicker: "items",
        desc:
          "Just clickable items. [em]Enter[/em] or click selects, [em]Escape[/em] closes.",
        caption: "Basic edit menu",
        btn: "Edit",
        cut: "Cut",
        copy: "Copy",
        paste: "Paste",
      },
      rich: {
        title: "Glyphs and shortcuts",
        kicker: "glyph + shortcut",
        desc:
          "Each item accepts [em]glyph[/em] (serif symbol on the left) and [em]shortcut[/em] (mono text on the right). Use sparingly — items with too many glyphs feel heavy.",
        caption: "Rich menu with label, glyph, shortcut and destructive item",
        btn: "Account",
        account: "Account",
        profile: "Profile",
        settings: "Settings",
        bookmarks: "Bookmarks",
        signOut: "Sign out",
      },
      checkbox: {
        title: "Checkbox items",
        kicker: "menuitemcheckbox",
        desc:
          "Visible toggles inside the menu — they don't close on click, allowing multiple selection. Mark uses [em]✓[/em] in accent.",
        caption: "Menu with persistent toggles",
        btn: "View",
        preferences: "Preferences",
        rulers: "Show rulers",
        hidden: "Show hidden files",
      },
      radio: {
        title: "Radio group",
        kicker: "menuitemradio",
        desc:
          "Single choice between mutually exclusive options. Indicator uses [em]●[/em] in accent.",
        caption: "Theme picker",
        btn: "Theme",
        label: "Appearance",
        auto: "Auto",
        light: "Light",
        dark: "Dark",
      },
      composition: {
        title: "Composition",
        titleB: "tree",
        kicker: "structure",
        caption: "The DropdownMenu subcomponents.",
      },
    },

    /* ------------- ContextMenu ------------- */
    contextMenu: {
      lead: "Advanced · 34",
      titleA: "The ",
      titleB: "context menu",
      metaLabel: "Right-click",
      meta: "Anchored at cursor coordinates",
      intro:
        "Menu triggered by [em]right-click[/em] (or Shift+F10 on the keyboard). Unlike DropdownMenu, it opens exactly where the cursor is — with [em]viewport clamping[/em] to never spill off-screen.",
      basic: {
        title: "Basic actions",
        kicker: "right-click area",
        desc:
          "Right-click on the area. The same primitive options of any application menu.",
        caption: "Context menu with cut/copy/paste/delete",
        area: "Right-click here",
        hint: "Right-click or Shift+F10",
        cut: "Cut",
        copy: "Copy",
        paste: "Paste",
        delete: "Delete",
        history: "Last action",
      },
      editor: {
        title: "Text editor",
        kicker: "formatting",
        desc:
          "Classic use case: inline formatting. Mixes [em]checkbox items[/em] (toggleable states: bold, italic) with regular items for actions.",
        caption: "Formatting context menu",
        lorem:
          "Right-click on this paragraph to open the formatting menu — toggle bold and italic, and watch the text react in real time.",
        text: "Text",
        bold: "Bold",
        italic: "Italic",
        actions: "Actions",
        paragraph: "Convert to paragraph",
        heading: "Convert to heading",
      },
      composition: {
        title: "Composition",
        titleB: "tree",
        kicker: "structure",
        caption: "The ContextMenu subcomponents.",
      },
    },

    /* ------------- Drawer ------------- */
    drawer: {
      lead: "Advanced · 35",
      titleA: "The ",
      titleB: "drawer",
      metaLabel: "Side modal",
      meta: "4 sides · focus trap · backdrop",
      intro:
        "A side modal that slides in from one of the [em]four edges[/em]. Unlike Dialog (which centers in the viewport), Drawer is ideal for [em]mobile menus[/em], settings panels and secondary details — without fully interrupting the main flow.",
      basic: {
        title: "Basic usage",
        kicker: "side=right",
        desc:
          "Trigger + Content. Default opens from the [em]right[/em], 380px wide. Semi-opaque backdrop closes on click; Escape too.",
        caption: "Basic drawer opening from the right",
        btn: "Open drawer",
        heading: "Side panel",
        body:
          "Arbitrary content lives here. Body scroll is locked while the Drawer is open, and focus returns to the trigger on close.",
      },
      sides: {
        title: "Four sides",
        kicker: "side prop",
        desc:
          "[em]top, right, bottom, left[/em]. Each side has its matching slide animation. For [em]top[/em] and [em]bottom[/em], the [em]size[/em] prop is treated as height.",
        caption: "Drawer opening from each of the four sides",
        title2: "Opened from",
        right: "Right",
        left: "Left",
        top: "Top",
        bottom: "Bottom",
        body:
          "All four sides share the same subcomponents — only the animation axis changes.",
      },
      form: {
        title: "Rich content — form",
        kicker: "Header + Body + Footer",
        desc:
          "Typical case: editing a secondary item without leaving the current page. The Footer pins to the bottom with confirm/cancel actions.",
        caption: "Drawer with a form and actions",
        btn: "Edit profile",
        heading: "Edit profile",
        name: "Name",
        namePh: "How would you like to appear?",
        bio: "Bio",
        bioHint: "A few lines about you. Markdown supported.",
        save: "Save",
        cancel: "Cancel",
      },
      size: {
        title: "Custom size",
        kicker: "size prop",
        desc:
          "For left/right, [em]size[/em] is the width. For top/bottom, it's the height. In pixels.",
        caption: "Three different sizes",
        body:
          "This Drawer is {size}px on the axis parallel to the chosen edge.",
      },
      close: "Close",
      composition: {
        title: "Composition",
        titleB: "tree",
        kicker: "structure",
        caption: "The Drawer subcomponents.",
      },
    },

    /* ------------- Toaster ------------- */
    toaster: {
      lead: "Advanced · 36",
      titleA: "The ",
      titleB: "toaster",
      metaLabel: "Notifications",
      meta: "Queue · 5 variants · 6 positions",
      intro:
        "Notification system with [em]queue[/em], auto-dismiss and [em]pause-on-hover[/em]. Unlike the existing <Toast> (a pure component), the Toaster is a system: mount [em]once[/em] at the app root, and anywhere use the [em]useToast()[/em] hook to dispatch.",
      setup: {
        title: "Initial setup",
        kicker: "once at root",
        desc:
          "Wrap the app tree with [em]<Toaster />[/em]. In any descendant, use the [em]useToast()[/em] hook to dispatch notifications.",
      },
      short: {
        title: "Short form",
        kicker: "toast(string)",
        desc:
          "For the most common case (a quick message without extras), just pass a string.",
        caption: "Minimal form",
        message: "Saved.",
        btn: "Fire toast",
      },
      variants: {
        title: "Five variants",
        kicker: "default · info · ok · warn · danger",
        desc:
          "Each variant changes the [em]left border[/em] (semantic color) and the default glyph. Use sparingly — silence is the house tone.",
        caption: "Click to fire each variant",
        default: { title: "Notification", desc: "A neutral message, no urgency." },
        info: { title: "New message", desc: "You have an unread conversation in your inbox." },
        ok: { title: "Saved.", desc: "Your changes have been recorded." },
        warn: { title: "Storage almost full", desc: "2GB of storage left. Consider clearing old files." },
        danger: { title: "Connection lost", desc: "Trying to reconnect — your change will sync when it's back." },
      },
      action: {
        title: "Toast with action",
        kicker: "action button",
        desc:
          "Action button on the right — useful for [em]Undo[/em], [em]Retry[/em] etc. Clicking the action fires the callback and dismisses the toast.",
        caption: "Toast with Undo button",
        title2: "Item moved to trash.",
        desc2: "You can revert this for a few seconds.",
        undo: "Undo",
        undone: "Restored.",
        btn: "Delete item",
      },
      persistent: {
        title: "Persistent toast",
        kicker: "duration: 0",
        desc:
          "For critical errors or warnings that [em]require action[/em], disable auto-dismiss. The user must close manually.",
        caption: "A toast that doesn't disappear on its own",
        title2: "Connection unavailable",
        desc2: "Some features are limited until the network returns.",
        btn: "Fire persistent toast",
        clear: "Clear all",
      },
      stack: {
        title: "Stack and queue",
        kicker: "queue + limit",
        desc:
          "Multiple toasts stack with breathing gap. Toaster accepts a [em]limit[/em] prop (default: 5) — when exceeded, oldest are removed. [em]Pause-on-hover[/em] freezes auto-dismiss while the cursor is over any item.",
        caption: "Fires 6 toasts in sequence (limit=5)",
        label: "Toast",
        body: "Message #{n} fired in sequence.",
        btn: "Fire 6 toasts",
      },
      composition: {
        title: "Hook ",
        titleB: "API",
        kicker: "useToast",
        caption: "The hook exposes three functions:",
      },
    },

    /* ------------- Combobox ------------- */
    combobox: {
      lead: "Advanced · 37",
      titleA: "The ",
      titleB: "combobox",
      metaLabel: "Searchable select",
      meta: "Single + multi · groups · keyboard",
      intro:
        "Select with [em]real-time search[/em]. Case- and accent-insensitive filtering, full keyboard navigation, single or multi mode with chips, optional grouping. Replaces native [em]<select>[/em] when there are more than half a dozen options or the UX needs to breathe.",
      basic: {
        title: "Single — basic usage",
        kicker: "single select",
        desc:
          "Type to filter, [em]↑↓[/em] navigates, [em]Enter[/em] selects, [em]Esc[/em] closes. The × button clears the current selection.",
        caption: "Pick a country",
        field: "Country",
        placeholder: "Type to search…",
        empty: "No results",
      },
      multi: {
        title: "Multi — many selections",
        kicker: "multi=true · creatable optional",
        desc:
          "Each selected item becomes a [em]chip[/em] inside the input. By default it's a [em]select[/em] — only accepts options from the array. With [em]creatable[/em], a [em]Create \"…\"[/em] row appears whenever you type something that doesn't match existing options (Enter or click creates). [em]Backspace[/em] with empty input removes the last chip. In multi+creatable, already-selected options [em]disappear from the panel[/em] — to remove, use the chip's ×.",
        caption: "Article tags — pick from suggestions OR type a new one",
        field: "Article tags",
        hint: "Pick from suggestions or type a new tag and press Enter. Use × or Backspace to remove.",
        placeholder: "Existing tag or new one…",
        create: "Create",
      },
      groups: {
        title: "Groups",
        kicker: "option.group",
        desc:
          "When an option has a [em]group[/em], Combobox renders a [em]label[/em] separating groups in the panel. Group order follows order of appearance.",
        caption: "Languages grouped by paradigm",
        field: "Favorite language",
        placeholder: "Pick a language…",
      },
      states: {
        title: "Disabled options",
        kicker: "option.disabled",
        desc:
          "Individual items can be marked as [em]disabled[/em] — visible in the panel but not selectable.",
        caption: "Frameworks (some unavailable)",
        field: "Framework",
        hint: "Vue and Angular are unavailable in this version.",
        placeholder: "Pick a framework…",
      },
      disabled: {
        title: "Fully disabled",
        kicker: "disabled",
        desc:
          "The whole Combobox becomes inert — won't open, can't focus, displays the current value in dimmed style.",
        caption: "Disabled state (read-only visual)",
        field: "Language (locked)",
      },
      composition: {
        title: "API",
        titleB: "",
        kicker: "single tag",
        caption:
          "Combobox is a [em]single tag[/em] — no subcomponents. All customization is via props (options, value, onChange, multi, getOptionValue, getOptionLabel, renderOption, etc.).",
      },
    },

    /* ------------- RangeSlider ------------- */
    slider: {
      lead: "Advanced · 38",
      titleA: "The ",
      titleB: "range slider",
      metaLabel: "Numeric",
      meta: "1 or 2 handles · marks · vertical",
      intro:
        "Numeric slider for [em]continuous values[/em] or [em]ranges[/em]. Click/drag anywhere on the track moves the nearest handle, [em]←→[/em] adjusts by step (Shift by step×10), [em]Home/End[/em] jump to ends. No external libs — manual drag with PointerEvents.",
      single: {
        title: "Single — one value",
        kicker: "value: number",
        desc:
          "The most common case. Drag, click on the track or use keyboard. The label floats above the handle only on hover/focus — silence when not in use.",
        caption: "Volume: {value}%",
        field: "Volume",
      },
      dual: {
        title: "Dual — range",
        kicker: "value: [number, number]",
        desc:
          "Two handles. Combobox auto-detects when you pass an array. Values are [em]sorted[/em] in onChange — always [min, max].",
        caption: "Budget: ${min} – ${max}",
        field: "Price range",
        hint: "Drag either handle. Step of $50.",
      },
      marks: {
        title: "Marks (ticks)",
        kicker: "marks: number[]",
        desc:
          "Small marks on the track + labels below. They don't act as [em]snap points[/em] — just visual reference. For snap, set the [em]step[/em].",
        caption: "Year: {value}",
        field: "Year",
      },
      always: {
        title: "Label always visible",
        kicker: 'showValue="always"',
        desc:
          "Default shows the label only on hover/focus. When the value is [em]the main info[/em] (e.g. password strength, brightness), use [em]showValue=\"always\"[/em].",
        caption: "Strength: {value}",
        field: "Password strength",
      },
      vertical: {
        title: "Vertical",
        kicker: 'orientation="vertical"',
        desc:
          "↑ increases, ↓ decreases — natural for equalizers, brightness, and any axis where [em]more is up[/em].",
        caption: "Brightness: {value}",
        field: "Brightness",
      },
      disabled: {
        title: "Disabled",
        kicker: "disabled",
        desc:
          "Track and fill go dim, the handle stops responding to events.",
        caption: "Slider in disabled state",
        field: "Setting unavailable",
      },
      composition: {
        title: "API",
        titleB: "",
        kicker: "single tag",
        caption:
          "Like Combobox, RangeSlider is a [em]single tag[/em]. Behavior controlled via props — no subcomponents.",
      },
    },

    /* ------------- Calendar ------------- */
    calendar: {
      lead: "Advanced · 39",
      titleA: "The ",
      titleB: "calendar",
      metaLabel: "Dates",
      meta: "Single · range · multiple · keyboard",
      intro:
        "A full month view with [em]configurable selection[/em] (single, range, or multiple). Date logic written in pure JS — [em]no date-fns[/em], no timezones, no external libs. Supports min/max date, [em]disabledDays[/em] (custom predicate), and full keyboard navigation.",
      single: {
        title: "Single — one date",
        kicker: "default",
        desc:
          "Default mode. Click or Enter selects; clicking an already-selected date deselects it.",
        caption: "Single calendar",
        label: "Calendar (single)",
      },
      range: {
        title: "Range — interval",
        kicker: "mode=range",
        desc:
          "First click sets the start; second sets the end. Between the two clicks, hover draws the [em]preview[/em] of the range. After the second click, the range stays defined until the user starts a new one.",
        caption: "Range calendar",
        label: "Calendar (range)",
      },
      multiple: {
        title: "Multiple — many dates",
        kicker: "mode=multiple",
        desc:
          "Each click adds or removes a date. Useful for [em]agendas[/em], event days, holidays, etc.",
        caption: "Multiple calendar — {n} dates selected",
        label: "Calendar (multiple)",
      },
      minmax: {
        title: "Min / max date",
        kicker: "limited navigation",
        desc:
          "Limits the navigable range. Out-of-range dates appear [em]struck through[/em] and don't respond to click. Here: today through next 30 days.",
        caption: "Calendar with 30-day window",
        label: "Calendar with min/max",
      },
      disabled: {
        title: "Disabled days (custom)",
        kicker: "disabledDays",
        desc:
          "A [em](date) => boolean[/em] function allows any rule. Here, Saturdays and Sundays are blocked.",
        caption: "No weekends",
        label: "Calendar without weekends",
      },
      composition: {
        title: "API",
        titleB: "",
        kicker: "single tag",
        caption:
          "Calendar is a [em]single tag[/em]. Mode is configured via prop; no subcomponents.",
      },
    },

    /* ------------- DatePicker ------------- */
    datePicker: {
      lead: "Advanced · 40",
      titleA: "The ",
      titleB: "date picker",
      metaLabel: "Date input",
      meta: "Masked input + Calendar in popover",
      intro:
        "[em]Input with automatic mask[/em] (DD/MM/YYYY) combined with a Calendar inside a Popover. Users can type manually OR click to open the visual calendar. Includes [em]DateRangePicker[/em] with two months side-by-side.",
      basic: {
        title: "Single — basic usage",
        kicker: "DatePicker",
        desc:
          "Type DDMMYYYY — slashes appear automatically. Tab/Enter confirms; Esc cancels. Click the icon to open the visual Calendar.",
        caption: "Default date picker",
        field: "Date of birth",
      },
      format: {
        title: "Custom format",
        kicker: "format prop",
        desc:
          "Supports [em]DD/MM/YYYY[/em] (default), [em]MM/DD/YYYY[/em] (en-US), and [em]YYYY-MM-DD[/em] (ISO). Mask, parse and display adjust automatically.",
        caption: "ISO format",
        field: "ISO date",
      },
      bounded: {
        title: "Min/max + disabled days",
        kicker: "minDate · maxDate · disabledDays",
        desc:
          "The same restrictions as Calendar apply to DatePicker — including validation on [em]manual parse[/em]. Here, next 60 weekdays (no weekends).",
        caption: "60-weekday window",
        field: "Schedule meeting",
        hint: "Next 60 days, no weekends.",
      },
      range: {
        title: "Range picker",
        kicker: "DateRangePicker",
        desc:
          "Dual input (start → end) with [em]two side-by-side calendars[/em] in the popover. Independent month navigation; the popover closes automatically when the range is complete.",
        caption: "Empty date range picker",
        field: "Period",
      },
      booked: {
        title: "Pre-filled range",
        kicker: "initial state",
        desc:
          "Range with an initial value set. The popover opens already positioned at the current dates, and the user can drag to a new range.",
        caption: "Lodging reservation",
        field: "Stay dates",
        hint: "Initial value: today + 4 days.",
      },
      composition: {
        title: "API",
        titleB: "",
        kicker: "DatePicker · DateRangePicker",
        caption:
          "Two sibling components. [em]DatePicker[/em] takes a single date; [em]DateRangePicker[/em] takes a [start, end] pair.",
      },
    },

    /* ------------- Carousel ------------- */
    carousel: {
      lead: "Advanced · 41",
      titleA: "The ",
      titleB: "carousel",
      metaLabel: "Slides",
      meta: "Swipe + dots + auto-play + loop",
      intro:
        "Horizontal slides with [em]prev/next navigation[/em], dot indicators, [em]touch swipe[/em] (PointerEvents) and optional auto-play. Supports infinite loop or stopping at edges. Default transition is [em]slide[/em]; also has a [em]fade[/em] variant.",
      slides: {
        "0": "Colors, typography and spacing — the silent spine.",
        "1": "Refined components, each with a clear function.",
        "2": "Patterns — recipes, not rules.",
      },
      basic: {
        title: "Basic",
        kicker: "default",
        desc:
          "No props — just slides as children. Prev/next buttons on the sides, dot indicators below. Stops at start/end (no loop).",
        caption: "Default carousel with 3 slides",
        label: "Basic carousel",
      },
      loop: {
        title: "Infinite loop",
        kicker: "loop",
        desc:
          "Clicking [em]next[/em] on the last slide goes back to the first (and vice versa). Useful in galleries and banners.",
        caption: "Carousel with loop on",
        label: "Carousel with loop",
      },
      auto: {
        title: "Auto-play",
        kicker: "autoPlay + interval",
        desc:
          "Advances automatically every [em]interval[/em] ms (default 5000). Pauses while the cursor is over the component or it has focus — house default [em]pause-on-hover[/em].",
        caption: "Auto-play 3.5s + loop",
        label: "Automatic carousel",
      },
      fade: {
        title: "Fade transition",
        kicker: 'transition="fade"',
        desc:
          "Instead of sliding, slides [em]crossfade[/em] between each other. Useful when content is too distinct for spatial sliding to make sense.",
        caption: "Carousel with crossfade",
        label: "Fade carousel",
      },
      bare: {
        title: "Without indicators",
        kicker: "showDots=false · showArrows=false",
        desc:
          "When the context already implies navigation (e.g. an entire carousel as a clickable banner), hide the controls and let swipe / keyboard do the work.",
        caption: "Bare carousel — only swipe and keyboard",
        label: "Carousel without controls",
      },
      composition: {
        title: "Composition",
        titleB: "tree",
        kicker: "structure",
        caption: "The Carousel subcomponents.",
      },
    },

    /* ------------- TreeView ------------- */
    tree: {
      lead: "Advanced · 42",
      titleA: "The ",
      titleB: "tree view",
      metaLabel: "Hierarchy",
      meta: "Single + multi · full keyboard",
      intro:
        "Hierarchical tree with [em]expandable nodes[/em], automatic indentation per level, and optional selection ([em]single, multi or none[/em]). Full keyboard: ←→ expand/collapse or navigate parent/child, ↑↓ moves, Enter selects.",
      single: {
        title: "Single selection",
        kicker: "selectionMode=single",
        desc:
          "Click selects; clicking again on the same deselects. Click on a node with children also toggles expand/collapse simultaneously.",
        caption: "Single tree view (filesystem)",
        label: "File tree",
      },
      multi: {
        title: "Multi selection",
        kicker: "selectionMode=multi",
        desc:
          "Each click adds or removes. Selected items get [em]✓[/em] on the right + accent color.",
        caption: "Multi selection — {n} categories",
        label: "Blog categories",
      },
      nav: {
        title: "Without selection (nav only)",
        kicker: "selectionMode=none",
        desc:
          "For [em]navigational[/em] trees (TOC, outline). Click only expands/collapses; no selection state.",
        caption: "Tree just for navigation",
        label: "Outline",
      },
      controlled: {
        title: "Controlled expanded",
        kicker: "expanded prop",
        desc:
          "By default, expand/collapse is internal. Pass [em]expanded[/em] + [em]onExpandedChange[/em] to sync with URL, localStorage or other state.",
        caption: "{n} expanded nodes (controlled)",
        label: "Controlled tree",
      },
      composition: {
        title: "API",
        titleB: "",
        kicker: "single tag",
        caption:
          "TreeView accepts an array of [em]TreeNode[/em] (id, label, children?, glyph?, disabled?). No subcomponents — internal recursion.",
      },
    },

    /* ------------- ResizablePanels ------------- */
    resizable: {
      lead: "Advanced · 43",
      titleA: "The ",
      titleB: "resizable panels",
      metaLabel: "Layout",
      meta: "Drag + keyboard · horizontal/vertical",
      intro:
        "Layout of [em]2+ panels[/em] separated by draggable handles. Supports horizontal or vertical orientation, [em]min-size[/em] per panel, and optional persistence in [em]localStorage[/em] (same key across sessions).",
      labels: {
        left: "Left",
        right: "Right",
        top: "Top",
        bottom: "Bottom",
        sidebar: "Sidebar",
        content: "Content",
        inspector: "Inspector",
        one: "One",
        two: "Two",
        three: "Three",
      },
      basic: {
        title: "Horizontal — 2 panels",
        kicker: "default",
        desc:
          "Drag the divider between panels to resize. Tab on the handle activates keyboard nav: ←→ adjusts by 5%, Shift by 10%, Home/End go to extremes.",
        caption: "60/40 horizontal split",
        label: "Horizontal split layout",
        lorem:
          "Arbitrary content lives here. The panel has overflow auto, so internal scrolling works naturally.",
      },
      vertical: {
        title: "Vertical",
        kicker: 'orientation="vertical"',
        desc:
          "Same logic, but the handle becomes horizontal and panels stack. Useful for splitting between [em]preview[/em] and [em]code[/em] in editors.",
        caption: "40/60 vertical split",
        label: "Vertical split layout",
      },
      three: {
        title: "Three panels",
        kicker: "2 handles",
        desc:
          "As many panels as you want — just pass more [em]<ResizablePanel>[/em] as children. Each pair gets a handle between them.",
        caption: "Sidebar 20% · Content 60% · Inspector 20%",
        label: "Three-column layout",
      },
      junction: {
        title: "Junction handle — 3 areas with crosshair handle",
        kicker: "ResizableJunction",
        desc:
          "[em]L-shape layout[/em] with [em]three handles[/em]: an outer vertical (One vs right), an inner horizontal (Two vs Three), and a [em]junction handle[/em] (the crosshair in the middle) that moves [em]both axes simultaneously[/em]. Pattern used in editors like Blender/AutoCAD. Drag the small square in the center in any direction to resize 3 panels at once.",
        caption: "L-shape with junction handle in the middle — drag the crosshair",
        label: "L layout with junction",
        body:
          "Try dragging the crosshair in the center — it moves all 3 panels in both dimensions.",
      },
      persist: {
        title: "localStorage persistence",
        kicker: "storageKey",
        desc:
          "Pass a [em]storageKey[/em] and the panel sizes are saved automatically. Reload the page to see — the split stays the way you left it.",
        caption: "Persisted sizes",
        label: "Layout with persistence",
        body:
          "Drag the divider, reload the page, and see that the size is saved (key: atelier.docs.persistDemo).",
      },
      composition: {
        title: "Composition",
        titleB: "tree",
        kicker: "structure",
        caption: "The subcomponents.",
      },
    },

    /* ------------- ColorPicker ------------- */
    colorPicker: {
      lead: "Advanced · 44",
      titleA: "The ",
      titleB: "color picker",
      metaLabel: "Color",
      meta: "HSV plane + hex/RGB + presets",
      intro:
        "Visual color picker in [em]HSV space[/em] (saturation × brightness on a plane + hue in a vertical slider). Synchronized hex and decimal RGB inputs. Optional preset swatches. Conversions (hex/RGB/HSL/HSV) in [em]pure JS[/em], no libs.",
      basic: {
        title: "Basic",
        kicker: "default",
        desc:
          "SV plane + hue slider + hex/R/G/B inputs. Drag anywhere on the plane to move the cursor; the swatch on the right shows the current color. Fully controlled.",
        caption: "Current color: {hex}",
        label: "Basic picker",
      },
      presets: {
        title: "With presets",
        kicker: "presets array",
        desc:
          "Pass an array of [em]hex[/em] strings and they render as swatches below. Click to pick; the active swatch gets an accent border.",
        caption: "Current color: {hex}",
        label: "Picker with presets",
      },
      alpha: {
        title: "With alpha (transparency)",
        kicker: "alpha=true",
        desc:
          "Adds an [em]alpha[/em] slider (0-100%) below the hue. The emitted hex includes the alpha channel (#rrggbbaa) when ≠ 1.",
        caption: "Color with alpha: {hex}",
        label: "Picker with alpha",
      },
      compact: {
        title: "Compact size",
        kicker: "size prop",
        desc:
          "Adjust the SV plane [em]size[/em] (default 240px). Useful in narrow panels or popovers.",
        caption: "160px plane — ideal for side panels",
        primary: "Primary color",
        secondary: "Secondary color",
      },
      composition: {
        title: "API",
        titleB: "",
        kicker: "single tag",
        caption:
          "ColorPicker is a [em]single tag[/em]. Configured via props; no subcomponents.",
      },
    },

    /* ------------- Markdown ------------- */
    markdown: {
      lead: "Advanced · 45",
      titleA: "The ",
      titleB: "markdown viewer",
      metaLabel: "Text",
      meta: "Own parser · basic GFM",
      intro:
        "[em]Markdown[/em] rendering in pure React. ~150-line parser written from scratch — covers headings, paragraphs, lists (ordered/unordered), bold/italic, inline code, code blocks, blockquote, links, images, hr. Fully Atelier typography (Fraunces serif body, JetBrains mono for code).",
      basic: {
        title: "Basic render",
        kicker: "string in, JSX out",
        desc:
          "Pass the markdown string as [em]children[/em]. The component parses and renders with Atelier's editorial typography.",
        caption: "Markdown rendered as React",
      },
      live: {
        title: "Editor + live preview",
        kicker: "classic use case",
        desc:
          "Combines a [em]Textarea[/em] (compact mono for the code) with [em]MarkdownViewer[/em] (serif render). Reactive without debounce or perf issues — the parser is light.",
        caption: "Edit on the left, see on the right",
        editor: "Editor (markdown)",
        preview: "Preview (rendered)",
      },
      support: {
        title: "Parser support",
        kicker: "basic GFM",
        desc:
          "[em]Supported:[/em] # ## ### #### ##### ###### · paragraphs · **bold** · *italic* · `code` · ```code blocks``` · [links](url) · ![images](url) · - lists · 1. ordered · > blockquote · --- hr. [em]Not supported:[/em] tables · footnotes · inline HTML · task lists. For those, consider a future adapter (Phase 5.3 with marked/remark).",
      },
      composition: {
        title: "API",
        titleB: "",
        kicker: "single tag",
        caption: "MarkdownViewer takes the string as children. No subcomponents.",
      },
    },

    /* ------------- Shortcuts ------------- */
    shortcuts: {
      lead: "Advanced · 46",
      titleA: "The ",
      titleB: "shortcuts",
      metaLabel: "Keyboard",
      meta: "Hook + Provider + help dialog",
      intro:
        "[em]Global[/em] keyboard shortcuts system. Mount [em]<ShortcutsProvider>[/em] once at the root, and use [em]useShortcut(combo, handler)[/em] anywhere to register. Help panel (with the list of all registered shortcuts) opens automatically with [em]Shift+?[/em].",
      groups: {
        editor: "Editor",
        demo: "Demo",
      },
      demo: {
        save: "Save",
        publish: "Publish",
        undo: "Undo",
        increment: "Increment counter",
        decrement: "Decrement counter",
        savedTitle: "Saved.",
        savedBody: "Your changes have been recorded.",
        published: "Article published!",
      },
      setup: {
        title: "Setup",
        kicker: "once at root",
        desc:
          "ShortcutsProvider wraps the tree. useShortcut registers shortcuts with auto-cleanup on unmount. [em]Shift+?[/em] is built-in to open the help.",
        caption: "Try Shift+? right now",
        try: "Press [em]{key}[/em] anywhere to open the help panel.",
        btn: "Or click here to open",
      },
      active: {
        title: "Active shortcuts on this page",
        kicker: "live demo",
        desc:
          "5 shortcuts were registered when you entered this page. Try them — they fire toasts or change the counter below.",
        caption: "Current counter: {n}",
        counter: "Counter",
      },
      combo: {
        title: "ShortcutCombo — visual render",
        kicker: "standalone component",
        desc:
          "Renders a combo (string like [em]\"cmd+k\"[/em]) as separated [em]<kbd>[/em] elements, with pretty symbols for modifiers (⌘ ⇧ ⌥ ↑ ↓ ↵).",
        caption: "Combos as they appear in the help dialog",
      },
      composition: {
        title: "API",
        titleB: "",
        kicker: "Provider + hook",
        caption: "3 pieces of the system:",
      },
    },

    /* ------------- VirtualList ------------- */
    virtualList: {
      lead: "Advanced · 47",
      titleA: "The ",
      titleB: "virtual list",
      metaLabel: "Performance",
      meta: "Windowing — 10,000+ items",
      intro:
        "Rendering 10,000 elements in the DOM freezes the browser. [em]VirtualList[/em] only paints the [em]visible[/em] items (plus a small overscan buffer) and updates as you scroll — the user notices nothing, but browser memory thanks you.",
      large: {
        title: "Huge list",
        kicker: "fixed height",
        desc:
          "10,000 articles at a fixed 64px row. Scroll: only ~10-15 nodes exist in the DOM at any moment. Open DevTools to confirm.",
        caption: "{n} items rendered — only ~10 actually in the DOM",
      },
      variable: {
        title: "Variable height",
        kicker: "itemHeight as function",
        desc:
          "When items don't share a uniform height, pass a [em]function[/em] (i) => height. VirtualList pre-computes cumulative offsets and uses binary search to find startIndex.",
        caption: "500 items with 3 different sizes (sm/lg/xl)",
      },
      infinite: {
        title: "Infinite scroll",
        kicker: "onEndReached",
        desc:
          "Combine windowing with lazy loading. [em]onEndReached[/em] fires when the user is [em]endThreshold[/em] items from the bottom — perfect for cursor-less paginated APIs.",
        caption: "{n} items — scroll to the bottom to load +25 more",
        loaded: "{n} loaded",
        reset: "Reset",
      },
      custom: {
        title: "Custom render",
        kicker: "generic renderItem",
        desc:
          "renderItem receives (item, index) and returns any JSX. VirtualList only handles positioning — you handle the row design.",
        caption: "1,000 articles with numbering and author badge",
      },
      composition: {
        title: "API",
        titleB: "",
        kicker: "props + behavior",
        caption: "API summary:",
      },
    },

    /* ------------- DragDrop ------------- */
    dragDrop: {
      lead: "Advanced · 48",
      titleA: "The ",
      titleB: "drag & drop",
      metaLabel: "Interaction",
      meta: "Sortable + DropZone + keyboard",
      intro:
        "Full [em]drag-and-drop[/em] kit, no dependencies. [em]<Sortable>[/em] reorders items inside a list; [em]<DragSource> + <DropZone>[/em] move between containers. Both support [em]touch[/em], [em]mouse[/em], [em]pen[/em] and [em]keyboard[/em].",
      sortable: {
        title: "Sortable vertical",
        kicker: "reorder inline",
        desc:
          "Drag cards up or down. An [em]accent[/em] line indicates where the item will land. Release to reorder.",
        caption: "Drag — or focus with Tab and use Space + arrows",
      },
      horizontal: {
        title: "Sortable horizontal",
        kicker: "orientation: horizontal",
        desc:
          "The same Sortable in horizontal layout — useful for reorderable tabs, chips or filters.",
        caption: "Reorderable pills side by side",
      },
      cross: {
        title: "Across containers",
        kicker: "kanban-lite",
        desc:
          "[em]<DragSource>[/em] wraps the draggable item; [em]<DropZone>[/em] accepts the drop. The [em]accepts[/em] prop filters by type — a card only lands where it's accepted.",
        caption: "Move cards between the three columns",
        todo: "To do",
        doing: "In progress",
        done: "Done",
      },
      keyboard: {
        title: "Keyboard",
        kicker: "100% accessible",
        desc:
          "Tab to focus an item; [em]Space[/em] or [em]Enter[/em] to \"pick up\"; [em]↑ ↓[/em] to move (vertical) or [em]← →[/em] (horizontal); [em]Space[/em] to drop; [em]Esc[/em] to cancel.",
        caption: "Try without a mouse — the active item gets a dashed accent outline",
      },
      composition: {
        title: "API",
        titleB: "",
        kicker: "Provider + Source + Zone",
        caption: "Four pieces of the kit:",
      },
    },

    forms: {
      lead: "Pattern · 49",
      titleA: "The ",
      titleB: "forms",
      metaLabel: "Composition",
      meta: "Fields + actions",
      intro:
        "A form is a staged narrative — header, body and actions. Use [em]dividers[/em] to group, not inner borders.",
      completeTitleA: "Complete ",
      completeTitleB: "form",
      completeKicker: "pattern",
      completeCaption: "Atelier subscription",
      stepYour: "i · Your details",
      name: "First name",
      namePh: "Clara",
      lastName: "Last name",
      lastNamePh: "Almeida",
      email: "Email",
      emailHint: "We will only use it to send the edition.",
      emailPh: "clara@atelier.com",
      preferences: "preferences",
      plan: "Plan",
      plans: { monthly: "Monthly", quarterly: "Quarterly", annual: "Annual" },
      format: "Format",
      formats: ["Print + digital", "Digital only"],
      reason: "Reason (optional)",
      reasonHint: "Tell us what brought you here?",
      reasonPh: "A line, a paragraph…",
      accept: "I agree to receive a short note with each new edition.",
      cancel: "Cancel",
      subscribe: "Subscribe",
      composition: {
        title: "Composition",
        titleB: "tree",
        kicker: "structure",
        caption:
          "Use the following [em]composition[/em] to build a [em]Form[/em] — each node is an exported subcomponent.",
      },
    },

    stepper: {
      lead: "Pattern · 50",
      titleA: "The ",
      titleB: "stepper",
      metaLabel: "Multi-step",
      meta: "Progress in chapters",
      intro:
        "When the form asks for [em]multiple steps[/em], the reader deserves to know which act they're in. The stepper is an editorial mark — number, label, description — on a line (horizontal) or in a column (vertical).",
      horizontal: {
        title: "Horizontal",
        kicker: "default",
        caption: "Ideal for 3-5 steps that fit on a line — onboarding, checkout, subscription.",
      },
      vertical: {
        title: "Vertical",
        kicker: "orientation=vertical",
        caption:
          "For longer flows or when each step needs an extended description.",
      },
      interactive: {
        title: "Interactive",
        kicker: "state-driven",
        caption:
          "Move forward and back with the buttons — the stepper reflects the state in real time.",
      },
      back: "Back",
      next: "Next",
      s1Label: "Account",
      s1Desc: "Your basic data",
      s2Label: "Plan",
      s2Desc: "Frequency and format",
      s3Label: "Confirm",
      s3Desc: "Review and send",
      s4Label: "Done",
      s4Desc: "Your order was received",
      composition: {
        title: "Composition",
        titleB: "tree",
        kicker: "structure",
        caption:
          "Each [em]Step[/em] is a child of [em]Stepper[/em] — the state (completed, active, pending) is resolved automatically by position.",
      },
    },

    emptyStates: {
      lead: "Pattern · 51",
      titleA: "The ",
      titleB: "emptiness",
      metaLabel: "No content",
      meta: "Invitations, not defeats",
      intro:
        "An empty state is [em]white space with intention[/em]. It invites the next action, explains what is coming — never just says “nothing here”.",
      first: {
        title: "First visit",
        kicker: "onboarding",
        caption: "Before the first piece of content",
        emptyTitleA: "No ",
        emptyTitleB: "articles",
        emptyTitleC: " yet",
        emptyBody:
          "When an author publishes the first piece, it will appear here — in the edition it launched in. In the meantime, explore the foundations.",
        cta: "Invite an author",
      },
      search: {
        title: "No results",
        kicker: "search",
        caption: "Term not found",
        emptyTitleA: "No results for ",
        emptyTitleB: "“serif”",
        emptyTitleC: "",
        emptyBody:
          "Try a variation of the term, remove filters or browse the latest topics from the cover.",
        cta: "Back to cover",
      },
      offline: {
        title: "Offline",
        kicker: "network",
        caption: "No connection",
        emptyTitleA: "We lost the ",
        emptyTitleB: "connection",
        emptyTitleC: "",
        emptyBody:
          "Nothing you wrote was lost. When the network is back, we pick up exactly where we left off.",
        cta: "Try again",
      },
      composition: {
        title: "Composition",
        titleB: "tree",
        kicker: "structure",
        caption:
          "Use the following [em]composition[/em] to build an [em]EmptyState[/em] — each node is an exported subcomponent.",
      },
    },

    sidebar: {
      lead: "Pattern · 52",
      titleA: "The ",
      titleB: "sidebar",
      metaLabel: "Navigation",
      meta: "Vertical structure",
      intro:
        "The [em]sidebar[/em] is Atelier's table of contents: it carries the reading rhythm in columns, with hierarchical groups and an editorial touch. It is the primary navigation when there are many pages and the reader needs to [em]leaf through[/em] the content.",
      anatomy: {
        title: "Anatomy",
        titleB: "parts",
        kicker: "parts",
        caption: "Five stacked regions, each with its own typographic role.",
        parts: [
          {
            n: "01",
            label: "Brand",
            desc:
              "Wordmark with accented period. Clicks to the cover. [em]Opens[/em] the stack.",
          },
          {
            n: "02",
            label: "Groups",
            desc:
              "All-caps titles, letterspaced, lead-like breathing room. They break the rhythm.",
          },
          {
            n: "03",
            label: "Items",
            desc:
              "Number + label. The active one gets a left rule — a small typographic accent.",
          },
          {
            n: "04",
            label: "Controls",
            desc:
              "Language, theme and navigation mode. Same components as the top navbar.",
          },
          {
            n: "05",
            label: "Footer",
            desc:
              "Discreet signature in monospace. Version + colophon.",
          },
        ],
      },
      states: {
        title: "States",
        kicker: "expanded · collapsed",
        caption:
          "Two widths: expanded (reading) and collapsed (focus on content). The [em]⌘B[/em] shortcut toggles.",
        expanded: "Expanded",
        collapsed: "Collapsed",
        expandedDesc:
          "Default mode. Full typography visible — every item with number and label.",
        collapsedDesc:
          "Focus mode. Only the toggle remains, floating in the corner. Reclaims the space for reading.",
      },
      specimen: {
        title: "Specimen",
        kicker: "live preview",
        caption: "Faithful miniature. Tap items to see the active state.",
      },
      composition: {
        title: "Composition",
        titleB: "tree",
        kicker: "structure",
        caption:
          "Use the following [em]composition[/em] to build a [em]Sidebar[/em] layout — each node is a logical block, with its own typographic role.",
      },
      guidelines: {
        title: "When to use",
        kicker: "guidelines",
        items: [
          {
            n: "I",
            titleA: "Many ",
            titleB: "pages",
            body:
              "Use the sidebar when navigation has more than [em]twelve[/em] destinations. It breathes vertically; the navbar does not.",
          },
          {
            n: "II",
            titleA: "Reading by ",
            titleB: "chapters",
            body:
              "Editorial content, long documentation, design systems. The reader returns to the table of contents constantly.",
          },
          {
            n: "III",
            titleA: "Avoid on ",
            titleB: "landings",
            body:
              "On one-page sites or marketing, the navbar is more economical — less chrome, more content.",
          },
        ],
      },
    },

    navbar: {
      lead: "Pattern · 53",
      titleA: "The ",
      titleB: "navbar",
      metaLabel: "Navigation",
      meta: "Horizontal structure",
      intro:
        "The [em]navbar[/em] is the editorial header: a horizontal band that reveals structure through [em]hover menus[/em]. Each route group becomes a dropdown — the reader sees the map without scrolling.",
      anatomy: {
        title: "Anatomy",
        titleB: "parts",
        kicker: "parts",
        caption: "Three horizontal regions, distinct typographic weights.",
        parts: [
          {
            n: "01",
            label: "Brand",
            desc:
              "Wordmark with accented period. Returns to the cover. Anchors the left.",
          },
          {
            n: "02",
            label: "Menus",
            desc:
              "One trigger per group. Hover opens; focus keeps it open for keyboard users.",
          },
          {
            n: "03",
            label: "Dropdown",
            desc:
              "List of items with number + label. Active item gets a discreet weight shift.",
          },
          {
            n: "04",
            label: "Controls",
            desc:
              "Language, theme and navigation mode — anchor the right as a cluster.",
          },
        ],
      },
      dropdown: {
        title: "Dropdowns",
        kicker: "hover · focus-within",
        caption:
          "The panel appears on hover — and stays open while any internal item has focus, ensuring keyboard navigation.",
        hoverNote: "Hover",
        hoverDesc: "Trigger or item receives the cursor.",
        focusNote: "Focus",
        focusDesc: "Tab walks through items — [em]:focus-within[/em] locks the menu open.",
      },
      specimen: {
        title: "Specimen",
        kicker: "live preview",
        caption: "Faithful miniature. Hover a menu to see the dropdown.",
      },
      composition: {
        title: "Composition",
        titleB: "tree",
        kicker: "structure",
        caption:
          "Use the following [em]composition[/em] to build a [em]Navbar[/em] layout — each node is an exported subcomponent.",
      },
      guidelines: {
        title: "When to use",
        kicker: "guidelines",
        items: [
          {
            n: "I",
            titleA: "Few ",
            titleB: "categories",
            body:
              "Works well with up to [em]five[/em] groups. Each dropdown can hold more items — the limit is the horizontal axis.",
          },
          {
            n: "II",
            titleA: "Landings and ",
            titleB: "covers",
            body:
              "On marketing sites, blogs and portfolios, the navbar frees the side space and aligns better with the visual narrative.",
          },
          {
            n: "III",
            titleA: "Avoid in ",
            titleB: "dense documentation",
            body:
              "If the reader needs to [em]return to the index[/em] constantly, the sidebar is kinder — the navbar hides the structure.",
          },
        ],
      },
    },

    code: {
      lead: "Manual · for developers",
      titleA: "The ",
      titleB: "code",
      metaLabel: "Reference",
      meta: "Tokens + API",
      intro:
        "Everything a developer needs to adopt Atelier in another project: [em]import the fonts[/em], paste the tokens, import the components. Every block below has a copy button.",
      start: {
        title: "Start",
        kicker: "install",
        desc:
          "Atelier is plain React — no dependencies beyond [em]react[/em] and [em]react-dom[/em]. Three steps, and the editorial look is available in your project.",
        step1: "1 · create the project",
        step2: "2 · import the fonts (in index.html)",
        step3: "3 · apply the tokens (in index.css)",
      },
      tokens: {
        titleA: "The ",
        titleB: "tokens",
        kicker: "design tokens",
        desc:
          "All CSS variables from Atelier. Paste this block into your [em]:root[/em] and every DS class works. Override per theme or mode.",
      },
      api: {
        titleA: "Components ",
        titleB: "API",
        kicker: "primitives.jsx",
        desc:
          "All exported primitives, with props, signature and usage snippet. Click a title to open the examples page.",
        view: "See examples →",
      },
      conventions: {
        title: "Conventions",
        kicker: "code style",
        items: [
          {
            n: "I",
            titleA: "Classes start with ",
            titleB: "ds-",
            body:
              "Every public class in the design system is prefixed with [em].ds-[/em] so it never clashes with your app code.",
          },
          {
            n: "II",
            titleA: "Never use ",
            titleB: "border-radius",
            body:
              "Right angles are the heart of the editorial language. If a component feels rigid, adjust space — not the corner.",
          },
          {
            n: "III",
            titleA: "Italic is ",
            titleB: "emphasis",
            titleC: ", not decoration",
            body:
              "Use italic to mark the word that carries the meaning. When everything is italic, nothing is.",
          },
        ],
      },
      decisions: {
        titleA: "Architecture ",
        titleB: "decisions",
        kicker: "ADRs",
        desc:
          "The reasons behind Atelier's structural choices — recorded as short [em]Architecture Decision Records[/em] in chronological order.",
        items: [
          {
            n: "ADR-001",
            status: "accepted",
            titleA: "Zero ",
            titleB: "dependencies",
            titleC: " beyond React",
            body:
              "Atelier ships with [em]react[/em] and [em]react-dom[/em] only. No UI library, no icon library, no CSS framework. Every glyph, every chart, every animation drawn by hand. The bundle weighs strictly what it must, and anyone can read the entire codebase in a few afternoons.",
          },
          {
            n: "ADR-002",
            status: "accepted",
            titleA: "Typographic ",
            titleB: "glyphs",
            titleC: ", not an icon library",
            body:
              "Instead of Lucide or Phosphor, Atelier uses real Unicode characters ([em]→ ✓ § ¶ ⋯[/em]) rendered in italic Fraunces. The [em]/icons[/em] page documents the official repertoire. Specific UI icons (chevron, sliders, etc.) are tiny inline SVGs. Total coherence with the editorial soul.",
          },
          {
            n: "ADR-003",
            status: "accepted",
            titleA: "Composable ",
            titleB: "API",
            titleC: " (shadcn-style)",
            body:
              "Every component exposes its subcomponents — [em]<Card><CardKicker /><CardTitle /></Card>[/em] instead of [em]<Card kicker=\"…\" title=\"…\" />[/em]. The consumer assembles the tree as they wish. Each docs page has a [em]Composition[/em] section with the actual exported tree.",
          },
          {
            n: "ADR-004",
            status: "accepted",
            titleA: "Rule weight ",
            titleB: "= meaning",
            body:
              "[em]--rule[/em] (strong line) marks [em]affordance or hierarchy[/em] (buttons, section dividers, tabs underline). [em]--rule-soft[/em] (soft line) marks [em]containers[/em] (cards, panels, modals, sidebar). Never alternate arbitrarily. The comment in [em]:root[/em] codifies the rule.",
          },
          {
            n: "ADR-005",
            status: "accepted",
            titleA: "Right angles ",
            titleB: "no border-radius",
            body:
              "The DS [em]is born angular[/em]. The Studio exposes a border-radius slider marked [em]Advanced · off-canon[/em] — anyone who rounds corners knows they're departing from the style. The default stays untouched.",
          },
          {
            n: "ADR-006",
            status: "accepted",
            titleA: "Scoped ",
            titleB: "Studio",
            body:
              "The theme playground (Studio) injects CSS vars only inside [em][data-studio-scope][/em], never in the global [em]:root[/em]. Playing with the theme doesn't affect sidebar, navbar or any other page — total separation between [em]tool[/em] and [em]application[/em].",
          },
          {
            n: "ADR-007",
            status: "accepted",
            titleA: "Static ",
            titleB: "search",
            titleC: ", indexed at build time",
            body:
              "The [em]⌘K[/em] palette uses a static index built from [em]routes.js[/em] + a curated list of components and tokens. No fuse.js, no server, no fetch. Build-time → instant on the client. Trade-off accepted: [em]searchIndex.js[/em] must be updated when adding components.",
          },
          {
            n: "ADR-008",
            status: "accepted",
            titleA: "i18n with ",
            titleB: "generic fallback",
            body:
              "[em]<CompositionSection>[/em] tries [em]pages.X.composition.title[/em] and falls back to [em]common.composition.title[/em] if missing. New pages get the [em]Composition[/em] section without replicating translation boilerplate. Same pattern for other helpers to come.",
          },
        ],
      },
      divider: "components",
      dividerDecisions: "decisions",
    },

    accessibility: {
      lead: "Reference · 54",
      titleA: "On ",
      titleB: "accessibility",
      metaLabel: "Conformance",
      meta: "WCAG · ARIA · keyboard",
      intro:
        "Accessibility at Atelier isn't an [em]extra[/em]; it lives at the root of the style. Generous typography, careful contrast, visible focus, consistent shortcuts and contained motion — chosen so the reader can [em]read[/em], no matter how.",
      principles: {
        title: "Principles",
        kicker: "six rules",
        desc: "Six commitments that govern every DS decision.",
        items: [
          { n: "01", titleA: "High ", titleB: "contrast", body: "Text in [em]ink[/em] over [em]bg[/em] keeps ≥ 4.5:1 (WCAG AA). Secondary colours pass too." },
          { n: "02", titleA: "Visible ", titleB: "focus", body: "Always. A 2px [em]--accent[/em] outline on every focusable element — never [em]outline: none[/em] without a replacement." },
          { n: "03", titleA: "Readable ", titleB: "type", body: "14px minimum in body, 10-12px reserved for metadata. [em]Line-height[/em] ≥ 1.5 in long text." },
          { n: "04", titleA: "Restrained ", titleB: "motion", body: "Transitions stay 120-320ms. Honors [em]prefers-reduced-motion[/em], turning animations off automatically." },
          { n: "05", titleA: "Full ", titleB: "keyboard", body: "Anything done with mouse can be done with keyboard. Consistent shortcuts ([em]⌘K[/em], [em]⌘B[/em], [em]Esc[/em], [em]Tab[/em])." },
          { n: "06", titleA: "ARIA ", titleB: "when needed", body: "HTML semantics first. ARIA only fills the gaps — [em]never replaces[/em] semantic tags." },
        ],
      },
      shortcuts: {
        title: "Keyboard shortcuts",
        kicker: "keyboard map",
        desc: "Global shortcuts work [em]on any page[/em]; contextual ones live inside their components.",
        caption: "Covers 100% of primary actions without a mouse.",
        thKeys: "Keys",
        thAction: "Action",
        thScope: "Scope",
        items: [
          { keys: "⌘ K", action: "Open search palette", scope: "global" },
          { keys: "⌃ K", action: "Open search palette (Windows/Linux)", scope: "global" },
          { keys: "⌘ B", action: "Collapse / expand sidebar", scope: "global" },
          { keys: "Esc", action: "Close overlays (modal, popover, palette)", scope: "overlay" },
          { keys: "Tab", action: "Move focus forward", scope: "global" },
          { keys: "⇧ Tab", action: "Move focus backward", scope: "global" },
          { keys: "↑ ↓", action: "Navigate results / options", scope: "list" },
          { keys: "← →", action: "Switch tabs (when focused)", scope: "tabs" },
          { keys: "↵", action: "Confirm / open active item", scope: "list · form" },
          { keys: "Space", action: "Toggle switch / checkbox", scope: "controls" },
        ],
      },
      focus: {
        title: "Focus and navigation",
        kicker: "focus-visible",
        desc: "Atelier guarantees focus is [em]always visible[/em] and that the reader can skip repetitive UI blocks.",
        tipTitle: "Skip link",
        tipBody: "At the top of this page, press [em]Tab[/em] once — a \"Skip to main content\" link appears, jumping straight to the [em]<main>[/em] and avoiding re-tabbing the whole navigation.",
        caption: "Focus strategies in place.",
        skipNote: "Appears on initial Tab; skips the entire sidebar and navbar.",
        focusNote: "2px --accent outline on every focusable element (buttons, links, inputs, switches).",
        trapNote: "Modals (Dialog) trap focus until closed; Esc returns it to the trigger.",
      },
      motion: {
        title: "Motion",
        kicker: "prefers-reduced-motion",
        desc: "Motion at Atelier is restrained by principle (120-320ms). For visitors who [em]ask for less motion[/em] in their OS, all animations and transitions are turned off globally.",
        tipTitle: "How to enable on your device",
        tipBody: "macOS: [em]System → Accessibility → Display → Reduce motion[/em]. Windows: [em]Settings → Accessibility → Visual effects → Animations[/em]. iOS: [em]Accessibility → Motion[/em].",
      },
      contrast: {
        title: "Contrast",
        kicker: "WCAG AA",
        desc: "The default theme's color combinations pass WCAG AA (4.5:1 for text). Use the [em]Studio[/em] to audit custom themes.",
        caption: "Default light theme contrast ratios.",
      },
      focusHooks: {
        title: "Focus hooks",
        kicker: "useFocusTrap · useFocusReturn · useRovingTabIndex",
        desc: "Focus logic that lived scattered across Drawer/Popover/Calendar/TreeView is now public in [em]src/lib/hooks[/em]. Same signature, same cleanup — any new overlay can reuse.",
        caption: "The three public focus hooks.",
        thHook: "Hook",
        thPurpose: "Purpose",
        items: [
          { hook: "useFocusTrap(ref, active?)", purpose: "Traps Tab/Shift+Tab inside the ref. Wraps at the edges. Use in modals, drawers, popovers." },
          { hook: "useFocusReturn(active?)", purpose: "Captures focus before mount and restores on unmount — pair with useFocusTrap." },
          { hook: "useRovingTabIndex(count, options?)", purpose: "Arrow-key navigation in lists/grids — only one item gets tabIndex=0 at a time." },
        ],
      },
      rtl: {
        title: "RTL · Right-to-left",
        kicker: "dir=rtl ready",
        desc: "[em]LocaleProvider[/em] applies dir=rtl on <html> automatically for locales that require it (ar/he/fa/ur), and exposes a manual override at [em]Settings → Direction[/em] for preview. Directional glyphs (chevrons, breadcrumbs) and Drawer.left/right are mirrored via CSS. A full audit of the legacy CSS is progressive debt — replace [em]padding-left[/em] with [em]padding-inline-start[/em], etc.",
        tipTitle: "How to test now",
        tipBody: "Open the settings menu (⋯) and switch [em]Direction[/em] to [em]RTL[/em]. The shell layout adapts; navigate a few pages and report regressions — they'll come in as progressive improvements.",
      },
      tests: {
        title: "Automated tests",
        kicker: "vitest + testing-library",
        desc: "Setup ready: [em]vitest[/em] (jsdom) + [em]@testing-library/react[/em] + [em]user-event[/em]. Commands: [em]npm run test[/em] (CI), [em]npm run test:watch[/em] (dev). Initial coverage in [em]src/lib[/em] (hooks, contrast). Adding tests per component is ongoing — every new interactive component lands with at least one keyboard smoke.",
        tipTitle: "jsdom polyfills already configured",
        tipBody: "[em]matchMedia[/em], [em]IntersectionObserver[/em] and [em]ResizeObserver[/em] are polyfilled in [em]src/test/setup.ts[/em] — Phase 10 environment hooks work in tests with no ad-hoc mocks.",
      },
      aria: {
        title: "ARIA & screen readers",
        kicker: "semantic html first",
        desc: "HTML semantics first. ARIA is only used to fill gaps in composed widgets.",
        caption: "ARIA patterns by component.",
        thComponent: "Component",
        thStrategy: "Strategy",
        items: [
          { component: "Modal · Dialog", strategy: "role=dialog, aria-modal=true, aria-label, focus trap, Esc closes." },
          { component: "Tabs", strategy: "role=tablist/tab/tabpanel, aria-selected, aria-controls, arrow-key navigation." },
          { component: "Tooltip", strategy: "data-tip + aria-label; appears on :hover/:focus-within." },
          { component: "Pagination", strategy: "nav + aria-label, aria-current=page on active item, per-number aria-label." },
          { component: "Breadcrumbs", strategy: "nav + aria-label, ordered list, aria-current=page on the last." },
          { component: "Search Palette", strategy: "role=dialog, input autofocus, ↑↓ navigate, Enter opens, Esc closes." },
          { component: "Skeleton", strategy: "aria-hidden=true (placeholder isn't announced to screen readers)." },
        ],
      },
    },

    /* ============================================================ */
    create: {
      headerKicker: "Studio",
      headerTitleA: "Build your",
      headerTitleB: "theme",
      headerHint: "Fully scoped · changes don't affect the rest of the site",
      controls: {
        preset: "Preset",
        custom: "Custom",
        theme: "Theme",
        themeLight: "Light",
        themeDark: "Dark",
        accent: "Accent",
        base: "Base",
        font: "Typography",
        spacing: "Spacing",
        advanced: "Advanced",
        offCanon: "—",
      },
      advanced: {
        warnTitle: "Off-canon",
        warnBody:
          "Atelier is born angular — no [em]border-radius[/em], no shadows. Use the slider [em]sparingly[/em].",
        radius: "Border-radius",
      },
      export: {
        intro:
          "Pick the format that fits your pipeline. [em]theme.css[/em] pastes straight into [em]:root[/em]; [em]tokens.json[/em] follows the W3C DTCG format; [em]theme.ts[/em] exposes a typed object for consuming apps.",
        formatLabel: "Format",
        copy: "Copy",
        copied: "Copied",
        download: "Download file",
      },
      actions: {
        shuffle: "Shuffle",
        reset: "Reset",
        export: "Export tokens",
        hideExport: "Hide tokens",
        a11y: "Accessibility",
        hideA11y: "Hide accessibility",
        import: "Import",
        hideImport: "Hide import",
      },
      import: {
        label: "Import external tokens",
        intro:
          "Paste, drag or pick a [em].css[/em] file ([em]:root { --token: ... }[/em]) or [em].json[/em] (W3C DTCG or flat format). Studio detects the format, shows preview, and warns on unknown tokens. Applying overrides any preset.",
        dropHint: "Drag a .css or .json file here",
        dropping: "Drop to import",
        choose: "Or pick a file",
        placeholder: "Paste content here:\n\n:root {\n  --ink: #1a1a1a;\n  --accent: #c8361d;\n}\n\nor JSON DTCG:\n\n{\n  \"color\": {\n    \"ink\": { \"$value\": \"#1a1a1a\", \"$type\": \"color\" }\n  }\n}",
        more: "more tokens",
        showWarnings: "Show warnings",
        apply: "Apply",
        clear: "Clear import",
      },
      a11y: {
        label: "WCAG contrast check",
        intro:
          "Each pair is the real contrast of the current theme against the [em]WCAG 2.x[/em] threshold. Red indicates failure at [em]AA[/em] (4.5:1 for normal text, 3:1 for large text).",
        sizeNormal: "normal text",
        sizeLarge: "large text",
        aaLarge: "AA large",
        fail: "Fail",
      },
      preview: {
        typeKicker: "01 · Typography",
        typeTitle: "Editorial voice",
        headlineA: "A quiet manual for",
        headlineB: "editorial interfaces",
        body:
          "Typography before pixels. Hierarchy comes from the typeface, not from colour. Atelier is a narrative in columns — reading, not dashboard.",
        typeSpec: "Fraunces 300 / 16 / 1.6",
        cardsTitle: "Editorial card",
        card1Kicker: "Chronicle · 04",
        card1TitleA: "On",
        card1TitleB: "type",
        card1Body:
          "A well-chosen typeface solves half of the design problems — it just needs the rest not to get in the way.",
        card1Foot: "read →",
        card2Kicker: "Issue · 21",
        card2Title: "Card with action",
        card2TitleA: "The act of",
        card2TitleB: "reading",
        card2Body:
          "Every page is a breath. Margins matter as much as the content — silence between the words.",
        card2Price: "$ 48 / year",
        card2Cta: "Subscribe",
        controlsKicker: "02 · Controls",
        controlsTitle: "Buttons and badges",
        formKicker: "03 · Form",
        formTitle: "Field + actions",
        fieldLabel: "Address",
        fieldHint: "Where we would like to find you.",
        fieldPh: "street, number, city",
        field2Label: "Email",
        field2Ph: "you@atelier.com",
        btnPrimary: "Publish",
        btnDefault: "Save",
        btnAccent: "Accent",
        btnGhost: "Cancel",
        badgeOk: "published",
        badgeWarn: "draft",
        badgeAccent: "new",
        badgeDefault: "archived",
        alertsKicker: "04 · Alerts",
        alertsTitle: "Messages",
        alertInfoTitle: "For your information",
        alertInfoBody: "This is a model — every action is just a demo.",
        alertOkTitle: "Theme saved",
        alertOkBody: "Your choices stay in the browser between visits.",
        alertWarnTitle: "Heads up",
        alertWarnBody: "Touching border-radius departs from the editorial principle.",
        metricKicker: "Metric",
        metricTitle: "At a glance",
        metricLabel: "Current edition",
        metricValue: "1,247",
        metricDelta: "+ 8.2 %",
        metric2Label: "Subscribers",
        metric2Value: "892",
        metric3Label: "Next",
        metric3Value: "May 12",

        settingsKicker: "Settings",
        settingsTitle: "Preferences",
        setting1: "Email notifications",
        setting1Hint: "Heads-up on new editions.",
        setting2: "Weekly summary",
        setting2Hint: "Sunday mornings.",
        setting3: "Focus mode",
        setting3Hint: "Hides UI chrome while reading.",
        setting4: "Paper sound",
        setting4Hint: "A page turn between chapters.",
        setting5: "Sync across devices",
        setting5Hint: "Shared reading position.",
        setting6: "Compact mode",
        setting6Hint: "Tighter spacing to fit more.",

        chartKicker: "Activity",
        chartTitle: "Last 8 days",
        chartStat1Label: "Total",
        chartStat1Value: "533",
        chartStat2Label: "Peak",
        chartStat2Value: "94",
        chartStat3Label: "Average",
        chartStat3Value: "67",

        teamKicker: "Team",
        teamTitle: "Who's editing",
        teamStatus: "5 active collaborators",
        teamOnline: "online now",

        planKicker: "Plan",
        planTitle: "Atelier subscription",
        planPrice: "$ 48",
        planPer: "per year",
        planFeat1: "Quarterly edition — print + digital",
        planFeat2: "Full archive access",
        planFeat3: "Invitations to meetings",
        planFeat4: "Field notebook (yearly)",
        planFeat5: "Cancel anytime",
        planCta: "Subscribe",

        tabsKicker: "Tabs",
        tabsTitle: "Inner navigation",
        tab1: "Foundations",
        tab1Body: "Colour, typography and space — the base everything sits on.",
        tab2: "Components",
        tab2Body: "Buttons, fields, cards: the small pieces that make a page.",
        tab3: "Patterns",
        tab3Body: "How to put it all together — forms, navigations, empty states.",

        field3Label: "Frequency",
        field3Opt1: "Monthly",
        field3Opt2: "Quarterly",
        field3Opt3: "Annual",
        field4Label: "Message",
        field4Ph: "Tell us a bit about you...",

        txKicker: "Transactions",
        txTitle: "Recent activity",
        tx1: "Annual renewal",
        tx2: "Issue #21 (single)",
        tx3: "Shipping (print)",
        tx4: "Monthly sponsorship",
        tx5: "Postal surcharge",
      },
    },

    /* ============================================================ */
    roadmap: {
      lead: "A living manual",
      titleA: "The road",
      titleB: "ahead",
      metaLabel: "Updated",
      intro:
        "This document is the single source of truth for what has shipped and what's coming. Each [em]phase[/em] carries its scope, internal dependencies and acceptance criteria. Filter, search, and click any shipped component to jump straight to its docs.",

      progress: {
        label: "shipped",
      },
      search: {
        label: "Search the roadmap",
        placeholder: "Search phase, component, dependency…",
      },
      filters: {
        all: "All",
        statusLabel: "Status",
        priorityLabel: "Priority",
        pendingOnly: "Only what's left",
      },
      status: {
        done: "Shipped",
        next: "Next",
        ongoing: "Ongoing",
      },
      priority: {
        high: "High priority",
        medium: "Medium priority",
        ongoing: "Ongoing",
        none: "—",
      },
      principles: {
        kicker: "Pillars",
        titleA: "Non-negotiable",
        titleB: "principles",
        desc: "Every roadmap task must respect these pillars — any trade-off that breaks one becomes a discussion before becoming a PR.",
      },
      phases: {
        kicker: "Timeline",
        titleA: "Phases",
        titleB: "& items",
        singular: "Phase",
        empty: "No phases match the current filters.",
        count: "{n} phase(s) visible with the current filters.",
      },
      delivered: {
        openDoc: "Open documentation",
      },
      task: {
        scope: "Scope",
        deps: "Internal dependencies",
        acceptance: "Acceptance criteria",
      },
      conventions: {
        kicker: "How to contribute",
        titleA: "PR",
        titleB: "conventions",
        desc: "Practical rules that prevent future technical debt. Every PR for a new component must follow the checklist below.",
      },
      sequence: {
        kicker: "Suggested order",
        titleA: "Recommended",
        titleB: "sequence",
        desc: "The order in which each phase delivers the most value. Adjustable based on product priority.",
      },
    },

    /* ============================================================ */
    dataTable: {
      lead: "Component · 29",
      titleA: "The ",
      titleB: "table",
      metaLabel: "Data Display",
      meta: "Composable DataTable",
      intro:
        "The densest piece in the DS. Header with visual sort, typed per-column filters ([em]text · select · multi · range · date-range[/em]), single or multi selection, integrated pagination and [em]opt-in virtualization[/em] for thousand-row lists. 100% composable API: declare columns once, mount freely.",
      basic: {
        title: "Basic table",
        kicker: "default",
        caption:
          "Sort by column (click on header). Mono-sort by default; hold [em]Shift[/em] and click to stack.",
      },
      filters: {
        title: "Per-column filters",
        kicker: "<DataTableFilters />",
        caption:
          "Each column declares its own [em]filter[/em]. The [em]<DataTableFilters />[/em] component collects them all in a toolbar above the table. Supported types: text, select, multi (Combobox), range (RangeSlider) and date-range (DateRangePicker).",
      },
      select: {
        title: "Selection & density",
        kicker: "selectionMode + density",
        caption:
          "Currently {count} row(s) selected. Header checkbox toggles all visible. [em]compact[/em] density for content-heavy tables.",
      },
      multisort: {
        title: "Multi-sort",
        kicker: "Shift+click",
        caption:
          "Click while holding [em]Shift[/em] to stack criteria. The number next to the arrow indicates the criterion's order.",
      },
      virtual: {
        title: "Virtualization",
        kicker: "virtualize",
        caption:
          "5,000 rows — only visible ones render. Div-based layout with ARIA (role=table/row/cell): keeps accessibility without the display:block hacks on <table>.",
      },
      composition: {
        title: "Composition",
        titleB: "tree",
        kicker: "structure",
        caption:
          "DataTable is a Provider. You compose freely — replace [em]DataTableHeader[/em] with your own thead for full custom.",
      },
    },

    /* ============================================================ */
    timeline: {
      lead: "Component · 30",
      titleA: "The ",
      titleB: "timeline",
      metaLabel: "Data Display",
      meta: "Vertical and horizontal",
      intro:
        "Events in time, told as chapters. Vertical for dense history (changelog, activity); horizontal for short flows (onboarding, steps). Markers vary from [em]dot[/em] to [em]glyph[/em], and the [em]now[/em] separator divides past from future.",
      vertical: {
        title: "Vertical (default)",
        kicker: "orientation='vertical'",
        caption:
          "The editorial orientation: each item takes one row, with date on top and free description below.",
        demo: {
          nowLabel: "Now",
          items: [
            {
              date: "May 12, 2025",
              title: "Wave 1 — Foundations",
              body: "Pagination, Breadcrumbs, Skeleton, Stepper and the Accessibility page.",
            },
            {
              date: "Jun 03, 2025",
              title: "Wave 2 — Wishlist",
              body: "Popover, DropdownMenu, ContextMenu, Drawer, Combobox, RangeSlider, Calendar.",
            },
            {
              date: "Today",
              title: "Wave 3 — Data display",
              body: "DataTable, Timeline, TagInput, KBD.",
            },
            {
              date: "Next",
              title: "Wave 4 — Motion",
              body: "FadeIn, SlideIn, Page transitions via Motion library.",
            },
          ],
        },
      },
      markers: {
        title: "Markers",
        kicker: "visual variants",
        caption:
          "Four ready variants — dot, hollow, number, glyph. For SVG or own icons, use [em]variant='glyph'[/em] and pass via children.",
        demo: {
          items: [
            { title: "dot", body: "Default marker — filled circle." },
            { title: "hollow", body: "Future or pending item." },
            {
              title: "number",
              body: "Numbered sequence — good for ordered steps.",
            },
            {
              title: "glyph",
              body: "Arbitrary glyph — emoji, symbol, inline SVG.",
            },
          ],
        },
      },
      horizontal: {
        title: "Horizontal",
        kicker: "orientation='horizontal'",
        caption:
          "For short sequences — onboarding, checkout, process steps. Scrolls horizontally when needed.",
        demo: {
          toggleVertical: "Vertical",
          toggleHorizontal: "Horizontal",
          items: [
            {
              date: "Start",
              title: "Briefing",
              body: "Scope definition.",
            },
            {
              date: "Wk 2",
              title: "Design",
              body: "Wireframes and mockups.",
            },
            {
              date: "Wk 4",
              title: "Build",
              body: "Implementation in code.",
            },
            {
              date: "Wk 8",
              title: "Launch",
              body: "Deploy and communication.",
            },
          ],
        },
      },
      composition: {
        title: "Composition",
        titleB: "tree",
        kicker: "structure",
        caption:
          "Each item is a chapter: marker + content. Use [em]TimelineNow[/em] as a divider between past and future.",
        freeChildren: "(free children)",
      },
    },

    /* ============================================================ */
    tagInput: {
      lead: "Component · 31",
      titleA: "Tag ",
      titleB: "collector",
      metaLabel: "Data Display",
      meta: "TagInput · MultiInput",
      intro:
        "When the reader needs to add [em]several free entries[/em] — keywords, emails, hashtags. Each tag becomes a removable chip. Supports synchronous validation, custom separators (comma, semicolon, space), max limit and read-only mode.",
      default: {
        title: "Default",
        kicker: "default",
        caption:
          "Enter or comma commit. Backspace on empty field removes the last tag.",
      },
      validate: {
        title: "Validation",
        kicker: "validate",
        caption:
          "The [em]validate[/em] function returns [em]true[/em], [em]false[/em] or an inline error message.",
      },
      max: {
        title: "Max limit",
        kicker: "maxTags",
        caption:
          "[em]maxTags={3}[/em] disables the input when the limit is reached. [em]unique[/em] blocks duplicates (case-insensitive).",
      },
      readonly: {
        title: "Read-only",
        kicker: "readOnly",
        caption: "Shows tags without allowing edits — useful in read views.",
      },
      tag: {
        title: "Standalone Tag",
        kicker: "<Tag />",
        caption:
          "The Tag component is exported separately — useful for filter lists, search chips, etc.",
      },
      composition: {
        title: "Composition",
        titleB: "tree",
        kicker: "structure",
        caption:
          "TagInput wraps Tags + input. Each Tag carries its own remove button.",
      },
    },

    /* ============================================================ */
    kbd: {
      lead: "Reference · 56",
      titleA: "Keys & ",
      titleB: "inline code",
      metaLabel: "Primitives",
      meta: "KBD · KbdCombo · InlineCode",
      intro:
        "Two thin primitives to [em]render keys[/em] in the middle of a sentence or [em]short code snippets[/em] inline. They're typographic formatters — reusable in docs, Shortcuts mappings, contextual help.",
      variants: {
        title: "Variants",
        kicker: "boxed · outline · subtle",
        caption:
          "Three visual weights. [em]Boxed[/em] (default) has more body, [em]subtle[/em] is the most discreet.",
      },
      sizes: {
        title: "Sizes",
        kicker: "size='sm' | 'md'",
        caption: "Use [em]sm[/em] for dense areas; [em]md[/em] for paragraphs.",
      },
      combo: {
        title: "Combinations",
        kicker: "<KbdCombo />",
        caption:
          "Helper to join multiple keys. On Mac use without separator (⌘K); on Windows pass [em]separator='+'[/em] (Ctrl+K).",
      },
      inline: {
        title: "In paragraph",
        kicker: "prose",
        caption:
          "Components align to the baseline and respect the surrounding text size.",
        paragraph:
          "Press {cmd} to open the search palette, or {esc} to cancel.",
      },
      code: {
        title: "InlineCode",
        kicker: "code snippet",
        caption:
          "For function calls, terminal commands and flags inside the text.",
        paragraph:
          "Use the {hook} hook for local state, or run {cmd} to install dependencies. Also accepts {flag} to enable strict types.",
      },
      composition: {
        title: "Composition",
        titleB: "tree",
        kicker: "structure",
        caption:
          "Three simple, independent pieces — each one is a decorated HTML tag.",
      },
    },

    /* ============================================================ */
    hooks: {
      lead: "Reference · 57",
      titleA: "The ",
      titleB: "hooks",
      metaLabel: "Utilities",
      meta: "14 hooks · zero deps",
      intro:
        "Low-level logic that used to be scattered — click-outside in five overlays, scroll-lock in three modals, controllable-state copied from Radix ad-hoc — now lives in [em]public hooks[/em] imported from a single path. SSR-safe, with proper cleanup, and zero external dependencies.",

      env: {
        title: "Environment hooks",
        kicker: "10.1 · matchMedia · observers",
        desc: "React to viewport, OS and DOM properties around the component.",
      },
      dom: {
        title: "DOM hooks",
        kicker: "10.2 · listeners · interaction",
        desc: "Encapsulate interaction patterns — click outside, scroll lock, local shortcuts — with automatic cleanup.",
      },
      state: {
        title: "State hooks",
        kicker: "10.3 · storage · controllable",
        desc: "Composition of useState for recurring patterns — persistence, debounce, controllable prop, previous value.",
      },

      sample: {
        signature: "signature",
        example: "example",
      },

      discovery: {
        title: "Which hook to use when",
        kicker: "decision matrix",
        desc: "Discovery table: the problem on the left, the recommended hook on the right.",
        rows: [
          { p: "React to a breakpoint",                    h: "useMediaQuery" },
          { p: "Disable an animation if the user asked",   h: "usePrefersReducedMotion" },
          { p: "Know the window size",                     h: "useWindowSize" },
          { p: "Trigger when an element enters the viewport", h: "useIntersectionObserver" },
          { p: "React to a container's size",              h: "useResizeObserver" },
          { p: "Close a popover on outside click",         h: "useClickOutside" },
          { p: "Lock the body scroll",                     h: "useScrollLock" },
          { p: "Add a typed event listener",               h: "useEventListener" },
          { p: "Local keyboard shortcut (Esc, Enter)",     h: "useKeyPress" },
          { p: "Persist state across reloads",             h: "useLocalStorage" },
          { p: "Delay a value's propagation",              h: "useDebounce" },
          { p: "Limit a value's frequency",                h: "useThrottle" },
          { p: "Accept controlled OR uncontrolled prop",   h: "useControllableState" },
          { p: "Compare with the previous value",          h: "usePrevious" },
          { p: "Effect that skips the first run",          h: "useUpdateEffect" },
        ],
      },

      domain: {
        title: "Domain hooks",
        kicker: "live next to their components",
        desc: "These hooks do NOT enter the barrel — they live in their respective modules by proximity to the component that exports them. Listed here only for editorial discovery.",
        rows: [
          { name: "useT",            from: "src/lib/i18n.tsx",        purpose: "i18n · resolve a translation key" },
          { name: "useLocale",       from: "src/lib/i18n.tsx",        purpose: "i18n · current locale + setter" },
          { name: "useTheme",        from: "src/lib/theme.tsx",       purpose: "current theme (light/dark) + setter" },
          { name: "useHashRoute",    from: "src/lib/useHashRoute.ts", purpose: "in-house router · current slug + navigate" },
          { name: "useCopy",         from: "src/lib/useCopy.ts",      purpose: "clipboard · transient 'copied' state" },
          { name: "useShortcut",     from: "src/ds/Shortcuts.tsx",    purpose: "discoverable global shortcut (Shift+? lists)" },
          { name: "useSearchHotkey", from: "src/ds/SearchPalette.tsx",purpose: "opens the palette with ⌘K" },
          { name: "usePopover",      from: "src/ds/Popover.tsx",      purpose: "controls open state + positioning" },
          { name: "useToast",        from: "src/ds/Toaster.tsx",      purpose: "publishes a toast on the global queue" },
          { name: "useDataTable",    from: "src/ds/DataTable.tsx",    purpose: "internal context of the composable DataTable" },
        ],
      },
    },

    /* ============================================================ */
    changelog: {
      lead: "Reference · 58",
      titleA: "The ",
      titleB: "log",
      metaLabel: "History",
      meta: "Keep a Changelog · SemVer",
      intro:
        "Every notable change in Atelier — new phases, components, decisions. Official debut of the [em]MarkdownViewer[/em] in production: the content is the repo's own [em]CHANGELOG.md[/em], imported via [em]?raw[/em] from Vite and rendered by the DS's zero-dep parser.",
    },

    /* ============================================================ */
    tokens: {
      lead: "Reference · 59",
      titleA: "The ",
      titleB: "tokens",
      metaLabel: "Inventory",
      meta: "{count} tokens · light + dark",
      intro:
        "Atelier's full vocabulary in a single page. Every scale gets a swatch/preview next to its name, [em]light[/em] and [em]dark[/em] values where applicable, and per-row [em]copy[/em]. Filter by category, search by name, or export the visible subset as CSS, JSON (W3C DTCG) or TypeScript.",

      searchLabel: "Search tokens",
      searchPlaceholder: "Search by name, value, note…",
      categoryLabel: "Filter by category",
      exportLabel: "Export visible:",
      all: "All",
      empty: "No tokens match the current filters.",
      tokenCount: "{count} token(s)",
      copy: "Copy",
      copied: "Copied",
      copyAria: "Copy {name}",

      col: {
        token: "token",
        preview: "preview",
        light: "light",
        dark: "dark",
        actions: "action",
      },
    },

    /* ============================================================ */
    loadingStates: {
      lead: "Reference · 60",
      titleA: "The ",
      titleB: "loading states",
      metaLabel: "Pattern",
      meta: "5 choices, 1 decision tree",
      intro:
        "Each wait calls for a different editorial answer. [em]Skeleton[/em] preserves the layout of a list that's about to arrive; [em]Spinner[/em] honors short actions; [em]Progress[/em] is honesty when there's a real percentage; [em]Toast[/em] is response to user action; [em]Empty[/em] is when nothing is coming. Mixing all five becomes noise — pick one per context.",
      decision: {
        title: "Which to use when",
        kicker: "decision matrix",
        desc: "Left column: the pattern. Right: canonical use cases vs. cases where picking it is wrong.",
        thPattern: "pattern", thUse: "use when…", thAvoid: "avoid when…",
        rows: [
          { pattern: "Skeleton",   use: "Lists/cards whose shape is predictable and content arrives in < 2s.", avoid: "Silent error, long wait (> 5s) or empty state. Use empty/error in those cases." },
          { pattern: "Spinner",    use: "Punctual action in a specific spot (button click, refresh).",         avoid: "Whole-page loads — Skeleton keeps the layout stable." },
          { pattern: "Progress",   use: "Operation with a KNOWN real progress (upload, install).",             avoid: "When you don't know — fake bars are dishonesty." },
          { pattern: "Toast",      use: "Ephemeral confirmation after action (saved, copied, sent).",          avoid: "Errors that need user action — use inline Alert." },
          { pattern: "EmptyState", use: "List arrived and is genuinely empty — guide the next action.",        avoid: "Loading. If you're waiting, it's Skeleton; if it arrived empty, it's Empty." },
        ],
      },
      rules: {
        title: "Rules",
        kicker: "editorial decisions",
        desc: "Four rules that filter exception from excess. Every noisy wait costs reader attention.",
        items: [
          { n: "I",   body: "[em]Wait < 100ms[/em]: nothing. Showing loading triggers anxiety where there was none." },
          { n: "II",  body: "[em]100–500ms[/em]: small spinner only if a click triggered an action. Page stays interactive." },
          { n: "III", body: "[em]500ms–2s[/em]: Skeleton. The reader noticed — now respect the layout that's coming." },
          { n: "IV",  body: "[em]> 5s[/em]: Progress when possible, or 'this may take a while'. Honesty beats illusion." },
        ],
      },
    },

    /* ============================================================ */
    errorHandling: {
      lead: "Reference · 61",
      titleA: "The ",
      titleB: "error",
      metaLabel: "Pattern",
      meta: "Four layers, one strategy",
      intro:
        "Errors are information. Handled well, they restore trust; handled poorly, they destroy it. Atelier separates handling into [em]four layers[/em]: inline validation (field), operation feedback (toast/alert), section boundary (ErrorBoundary), and global fallback (crash page). Each level has its own visual vocabulary.",
      layers: {
        title: "The four layers",
        kicker: "from granular to global",
        desc: "Each layer captures a different class of error — confusing the layers becomes noise, or worse, silent loss.",
        items: [
          { n: "I",   body: "[em]Inline validation[/em] (field) — user typed invalid. Feedback below the input, warning icon, NOT toast (the input is itself the locus of information)." },
          { n: "II",  body: "[em]Operation[/em] — submit that failed, fetch that returned 500. Toast when the action was punctual; inline Alert when the reader needs to decide what to do." },
          { n: "III", body: "[em]Section boundary[/em] (ErrorBoundary) — component crashed. Shows empty state with 'try again' and contains the damage to the section, doesn't bring down the app." },
          { n: "IV",  body: "[em]Global[/em] — root crashed. Editorial crash page with reload instructions and contact. Logged in Sentry/Datadog." },
        ],
      },
      boundary: {
        title: "ErrorBoundary",
        kicker: "React 18 pattern",
        desc: "React 18 still requires a class component for ErrorBoundary (hooks don't cover it). Implement once in the app shell, reuse per critical section.",
      },
      messages: {
        title: "Anatomy of the message",
        kicker: "vocabulary",
        desc: "Every Atelier error message has three parts: WHAT broke, WHY when it helps, and the next ACTION possible.",
        items: [
          { kicker: "i · WHAT", title: "Short sentence, first-person plural", body: "[em]'We couldn't send your message'[/em] — direct, human. Avoid passive voice ('Message could not be sent') or jargon ('Error 500')." },
          { kicker: "ii · WHY", title: "Only when it helps the user", body: "[em]'Your session expired'[/em] explains and implies the action (log in again). [em]'Validation error'[/em] doesn't — speaks of the machine, not the user." },
          { kicker: "iii · ACTION", title: "Verb in infinitive, clear action", body: "Button [em]'Try again'[/em], link [em]'Log in again'[/em], hint [em]'Check your connection'[/em]. With no action possible, the message becomes lament." },
        ],
      },
      dosDonts: {
        title: "Dos and don'ts",
        kicker: "do · don't",
        doLabel: "Do",
        dontLabel: "Don't",
        dos: [
          "Log every exception in telemetry — silent errors are invisible bugs.",
          "Differentiate [em]network[/em] errors from [em]validation[/em] — different voice, different action.",
          "Restore usable state after error — a form can't stay 'frozen' without saying so.",
          "Allow [em]retry[/em] whenever it makes sense (idempotent).",
        ],
        donts: [
          "[em]'Unexpected error'[/em] — every message should carry at least the category.",
          "Toast for an error that needs action — toast disappears, action gets lost.",
          "Stack trace for the end user — useful in DEV, noise in production.",
          "Hide errors to 'avoid worrying' — if it affected the user, they have the right to know.",
        ],
      },
    },

    /* ============================================================ */
    formsPatterns: {
      lead: "Reference · 62",
      titleA: "The ",
      titleB: "forms",
      metaLabel: "Pattern",
      meta: "Validation · async · multi-step",
      intro:
        "A form is where the user TRUSTS data to you. Atelier treats forms as conversation: validation at the right moment (not on every keystroke), honest operation feedback, async with [em]optimistic disable[/em] without freezing layout, and messages in human tone.",
      validation: {
        title: "When to validate",
        kicker: "decision matrix",
        desc: "Validating too early is mistrust; too late is frustration. The editorial rule: each field has its moment.",
        thPattern: "pattern", thUse: "use when…", thAvoid: "avoid when…",
        rows: [
          { pattern: "onChange",    use: "NEVER. Unless it's autocomplete-like (password strength meter) — that one IS incremental.", avoid: "Email, ID, any field whose invalidity only makes sense complete." },
          { pattern: "onBlur",      use: "Default for most fields. User finished that input, now validate.",            avoid: "Empty optional field — validating onBlur on empty creates a phantom error." },
          { pattern: "onSubmit",    use: "Last layer ALWAYS. Even with onBlur, validate everything on submit (bypass protection).", avoid: "As the only validation — user gets no feedback until submit." },
          { pattern: "Server-side", use: "Anything with business rules (coupon, unique email, slug). Client only for UX, never security.", avoid: "Purely formal validation (ID format, email) — wastes round-trip for nothing." },
        ],
      },
      states: {
        title: "Field states",
        kicker: "default · disabled · error",
        desc: "Each state carries distinct meaning. Mixing disabled with error is the most common mistake.",
        items: [
          { kicker: "i", title: "default", body: "Free field. Optional hint below ('Minimum 8 characters')." },
          { kicker: "ii", title: "focus", body: "Accent border, no message. Visual focus = 'I'm here'." },
          { kicker: "iii", title: "error", body: "Red border + specific message below. NEVER color alone — screen readers read text." },
          { kicker: "iv", title: "disabled", body: "Gray, [em]non-interactive[/em]. State != error. Use hint to explain WHY it's disabled (depends on another field, requires permission)." },
          { kicker: "v", title: "loading (on submit)", body: "Don't disable the fields — only the button. The user may want to go back to edit mid-flight." },
        ],
      },
      async: {
        title: "Asynchronous submit",
        kicker: "optimistic disable",
        desc: "Editorial pattern: [em]submitting[/em] state disables only the button (and shows changed label). On success, positive toast. On validation error, populate errors in state. On network error, red toast with implicit retry.",
      },
      dosDonts: {
        title: "Dos and don'ts",
        kicker: "do · don't",
        doLabel: "Do",
        dontLabel: "Don't",
        dos: [
          "Messages in [em]first person[/em] and specific: 'That email is already in use' > 'Invalid'.",
          "[em]Autocomplete attributes[/em] (autocomplete='email', etc) — kindness with password managers.",
          "Persist draft in [em]localStorage[/em] in long forms — losing a form is invisible bug.",
          "Correct [em]inputmode[/em] on mobile (numeric, tel, email) — opens the right keyboard.",
        ],
        donts: [
          "Disable the button [em]until everything validates[/em] — the user doesn't know what's missing. Let them submit; show the errors.",
          "[em]Generic red asterisk[/em] in required field without saying why.",
          "Multi-step without [em]visible progress[/em] — Stepper exists for this.",
          "Clear the form on error — user loses everything. [em]Keep[/em] what they typed.",
        ],
      },
    },

    /* ============================================================ */
    destructive: {
      lead: "Reference · 63",
      titleA: "The ",
      titleB: "destructive actions",
      metaLabel: "Pattern",
      meta: "Three levels of ceremony",
      intro:
        "Delete, undo, cancel, banish — every action that creates loss deserves proportional ceremony. Atelier defines [em]three levels[/em]: immediate action with undo, simple confirmation, and typed confirmation. Excess ceremony treats the user as a child; lack becomes silent loss.",
      tiers: {
        title: "Three levels",
        kicker: "from lightest to gravest",
        desc: "Each level answers the question: how much does it cost to be wrong?",
        items: [
          { kicker: "i · UNDO", title: "Immediate action + toast with Undo (5–10s)", body: "For [em]reversible-in-seconds[/em] actions: discard draft, archive email, remove item from list. Deletes immediately, toast offers undo. UX like Gmail." },
          { kicker: "ii · CONFIRM", title: "Simple 'Are you sure?' modal", body: "For [em]irreversible but common[/em] actions: delete comment, exit without saving. Modal with explicit danger button. Text: what will happen + clear action button." },
          { kicker: "iii · TYPED", title: "Typed confirmation (type the name)", body: "For [em]catastrophic[/em] actions: delete account, wipe entire project, transfer ownership. User must TYPE the resource name to unlock the button. GitHub, Stripe use this." },
        ],
      },
      undo: {
        title: "Undo pattern",
        kicker: "immediate action + toast",
        desc: "Immediate action + toast with Undo button. State is restored if the user clicks; otherwise it's committed after the toast disappears. Atelier Toaster supports this natively via [em]actions[/em].",
      },
      confirm: {
        title: "Typed confirmation pattern",
        kicker: "typed confirmation",
        desc: "Modal requires the user to type the resource name to unlock the button. Pattern inherited from GitHub/Stripe — forces active reading, prevents reflex clicks.",
      },
      dosDonts: {
        title: "Dos and don'ts",
        kicker: "do · don't",
        doLabel: "Do",
        dontLabel: "Don't",
        dos: [
          "[em]Red color[/em] on the destructive action button — universal inherited visual language.",
          "[em]Cancel[/em] button on the left, destructive on the right. Reduces accidental click.",
          "Show [em]what will be lost[/em] in the dialog (list of items, hours of work).",
          "Log every destructive action in telemetry — useful for audit and reverting via backend if needed.",
        ],
        donts: [
          "Native browser modal ([em]confirm()[/em]) — ugly, decontextualized, breaks editorial tone.",
          "Ask for confirmation on [em]every[/em] action — devalues the ceremony. Reserve for real damage.",
          "Destructive button as [em]autofocus[/em] in modal — invites accidental Enter.",
          "[em]Auto-close[/em] confirmation modal after N seconds — user needs to decide, not be rushed.",
        ],
      },
    },

    /* ============================================================ */
    onboarding: {
      lead: "Reference · 64",
      titleA: "The ",
      titleB: "onboarding",
      metaLabel: "Pattern",
      meta: "Tour · Coachmark · Empty",
      intro:
        "Onboarding is the [em]lasting first impression[/em]. Done poorly, becomes a boring tutorial the user skips. Done well, teaches without interrupting. Atelier offers three patterns — [em]Tour[/em] (guided step-by-step), [em]Coachmark[/em] (single contextual hint), [em]Guided Empty State[/em] (empty that teaches). The choice depends on what's being taught.",
      decision: {
        title: "Which to use when",
        kicker: "decision matrix",
        desc: "Left column: the pattern. Right: contexts where it shines vs. where it frustrates.",
        thPattern: "pattern", thUse: "use when…", thAvoid: "avoid when…",
        rows: [
          { pattern: "Tour", use: "App with complex FLOW (kanban, editor) where user needs to grasp 3-5 concepts before producing.", avoid: "Discovery app (gallery, dashboard). Tour forces sequence where user should explore." },
          { pattern: "Coachmark", use: "NEW feature in already-known app. Appears once, in context, and dismisses on user interaction.", avoid: "Several coachmarks at once — they become noise. Limit to one per session." },
          { pattern: "Guided Empty State", use: "Naturally empty state (inbox, project list). Empty becomes invitation with clear CTA.", avoid: "Hide complex functionality behind a button — user doesn't know it exists." },
        ],
      },
      principles: {
        title: "Principles",
        kicker: "editorial rules",
        desc: "Five rules that filter good onboarding from patience-testing tutorial.",
        items: [
          { n: "I",   body: "[em]Skippable ALWAYS[/em]. 'Skip' button visible, not hidden in tiny text. Trust before ceremony." },
          { n: "II",  body: "[em]Show, don't tell[/em]. Visual highlight + a click > explanatory paragraph." },
          { n: "III", body: "[em]One idea per step[/em]. Tour with 3 steps beats 8 — users tire." },
          { n: "IV",  body: "[em]Persist 'already saw'[/em] in localStorage. Showing onboarding on every visit destroys earned trust." },
          { n: "V",   body: "[em]Actionable[/em]. Each step ends in something the user DOES — not just reads." },
        ],
      },
    },

    /* ============================================================ */
    darkMode: {
      lead: "Reference · 65",
      titleA: "The ",
      titleB: "dark mode",
      metaLabel: "Pattern",
      meta: "Dual tokens · zero shift",
      intro:
        "Dark mode in Atelier is the [em]editorial twin[/em] of light, not auto-inversion. Each chromatic token has a manually calibrated variant — [em]--ink[/em] in light is graphite (#1a1a1a), in dark it's luminous cream (#ede8dc). Bootstrap is blocking (no flash on reload) and respects OS preference.",
      principles: {
        title: "Principles",
        kicker: "editorial decisions",
        desc: "Four rules separating editorial dark mode from generic ('invert everything') dark mode.",
        items: [
          { n: "I",   body: "[em]Calibrate, don't invert[/em]. Inverting colors breaks hierarchy (anti-aliasing, perceived contrast, brightness). Each light/dark pair is decided by hand." },
          { n: "II",  body: "[em]1:1 tokens[/em]. Every variable in light has a dark variant, same name. Components consume [em]var(--ink)[/em] — automatic." },
          { n: "III", body: "[em]Heavier shadows in dark[/em]. Shadow RGBA jumps from 0.04 (light) to 0.4–0.6 (dark) — without that, shadow becomes invisible against anthracite." },
          { n: "IV",  body: "[em]Blocking bootstrap[/em]. Inline script before any render applies data-theme — prevents light→dark flash on reload." },
        ],
      },
      bootstrap: {
        title: "Flash-free bootstrap",
        kicker: "inline script",
        desc: "Blocking script inside <head> applies [em]data-theme[/em] BEFORE React mounts. Reads localStorage, falls back to prefers-color-scheme. Milliseconds matter — flash is a UX bug.",
      },
      edges: {
        title: "Edge cases",
        kicker: "special care",
        desc: "Three areas that typically break in poorly-done dark mode.",
        items: [
          { kicker: "i · CHARTS", title: "Series colors need their own calibration", body: "Red that works on cream disappears on anthracite. Atelier defines separate [em]chart palettes[/em] per theme." },
          { kicker: "ii · CODE", title: "Code blocks are INVARIANT", body: "Code block is always dark, in both themes. It's a 'typographic island' — code reading has destacaded syntax and zebra-ing with the page becomes noise." },
          { kicker: "iii · IMAGES", title: "UI light vs dark screenshots", body: "Image with white background becomes harsh in dark. Use [em]filter: brightness(0.85)[/em] on non-essential images, or dual versions (-light/-dark)." },
        ],
      },
      dosDonts: {
        title: "Dos and don'ts",
        kicker: "do · don't",
        doLabel: "Do",
        dontLabel: "Don't",
        dos: [
          "Audit [em]WCAG contrast[/em] in both themes — Atelier Studio shows it live.",
          "Use [em]color-mix()[/em] to derive variants — fewer tokens, more cohesion.",
          "Document [em]'editorial-decision'[/em] in comments (why ink-soft is #b8b1a2 in dark, not #aaa).",
          "Respect [em]prefers-color-scheme[/em] as default; allow manual override.",
        ],
        donts: [
          "Generic dark mode via [em]filter: invert()[/em] — breaks images, code, everything.",
          "[em]Pure black[/em] as background — tires the eye. Anthracite (#0b0a09 to #1a1917) is more editorial.",
          "[em]Pure white[/em] as ink — too bright. Cream (#ede8dc) is more readable.",
          "Forget [em]border-color[/em] in dark — black border on anthracite vanishes, white shines.",
        ],
      },
    },

    /* ============================================================ */
    print: {
      lead: "Reference · 66",
      titleA: "The ",
      titleB: "print",
      metaLabel: "Pattern",
      meta: "B&W · no chrome",
      intro:
        "Printing a web app is rare — but when it happens, it defines the lasting impression. Atelier forces [em]strong B&W contrast[/em], hides app chrome (navbar, sidebar, back-to-top), and adds URLs after links. All in [em]@media print[/em] — zero screen impact.",
      principles: {
        title: "Principles",
        kicker: "editorial decisions",
        desc: "Four print rules — like a well-made technical manual.",
        items: [
          { n: "I",   body: "[em]Hide what isn't content[/em]. Navbar, sidebar, footer, back-to-top, skip-link, pagination — none of that belongs on paper." },
          { n: "II",  body: "[em]Strong B&W contrast[/em]. Override [em]--ink[/em] to pure black and [em]--bg[/em] to white. Intermediate colors become legible grays." },
          { n: "III", body: "[em]Visible URLs[/em]. Links with [em]a[href]::after[/em] show the URL after the text — paper has no hover." },
          { n: "IV",  body: "[em]Smart page breaks[/em]. [em]page-break-inside: avoid[/em] on sections; [em]page-break-after: avoid[/em] on headings — prevents orphan title at page end." },
        ],
      },
      css: {
        title: "Print stylesheet",
        kicker: "@media print",
        desc: "Add at the end of the main CSS. No need for separate file — [em]@media print[/em] is zero-cost in normal rendering.",
      },
    },

    /* ============================================================ */
    i18nPatterns: {
      lead: "Reference · 67",
      titleA: "The ",
      titleB: "internationalization",
      metaLabel: "Pattern",
      meta: "Native Intl · zero deps",
      intro:
        "i18n in Atelier is [em]zero deps[/em]. We don't use i18next, react-intl or format.js — everything comes from the browser's native [em]Intl[/em], covering 95% of cases without 50 KB extras. Pluralization, number/date/currency formatting, relative time, lists — all standard web API.",
      principles: {
        title: "Principles",
        kicker: "editorial decisions",
        desc: "Four rules that keep Atelier's i18n light and correct.",
        items: [
          { n: "I",   body: "[em]Native Intl always[/em]. Before adding a lib, check if Intl solves it. Usually does." },
          { n: "II",  body: "[em]Locale as prop, not global[/em]. Formatting functions accept explicit locale — eases testing and sub-tree with different locale (preview email in another language, e.g.)." },
          { n: "III", body: "[em]Never concatenate translated strings[/em]. Use interpolation ([em]{n} items[/em]) — word order varies per language." },
          { n: "IV",  body: "[em]Plurals use Intl.PluralRules[/em]. Don't invent your own rule — Arabic has 6 categories, Polish 4, Japanese 1. The browser knows." },
        ],
      },
      plurals: {
        title: "Pluralization",
        kicker: "Intl.PluralRules",
        desc: "Helper hook over Intl.PluralRules. Covers all 6 possible categories (zero/one/two/few/many/other) with automatic fallback.",
      },
      formats: {
        title: "Formatting",
        kicker: "Intl.* APIs",
        desc: "DateTimeFormat, NumberFormat, ListFormat, RelativeTimeFormat. All native, all locale-aware, all zero-dep.",
      },
      rtl: {
        title: "RTL",
        kicker: "right-to-left",
        desc: "Covered in phase 6.1 — [em]LocaleProvider[/em] applies [em]dir=rtl[/em] on <html> automatically for ar/he/fa/ur locales. Manual override at Settings → Direction. Full docs at [em]/accessibility[/em].",
      },
    },

    /* ============================================================ */
    install: {
      lead: "Reference · 68",
      titleA: "The ",
      titleB: "install",
      metaLabel: "Setup",
      meta: "Zero build · zero PostCSS",
      intro:
        "Before any line of consumption code, it's worth understanding the [em]philosophy[/em] of what you're installing. Atelier is a singular package — a CSS file with all tokens + pure React components. No PostCSS, no Tailwind config, no JIT. Paste the CSS, import what you need.",
      philosophy: {
        title: "Philosophy",
        kicker: "before starting",
        desc: "Four editorial decisions that affect how much Atelier takes up in your app.",
        items: [
          { n: "I",   body: "[em]Zero runtime deps[/em]. You install react/react-dom (peer); the rest is the package. No framer-motion, no date-fns, no radix underneath." },
          { n: "II",  body: "[em]Single CSS, no JIT[/em]. Import [em]@atelier/ds/styles.css[/em] once at the entry. Zero PostCSS, zero Tailwind config, zero extra build." },
          { n: "III", body: "[em]Tree-shakeable[/em]. Import only what you use — [em]import { Button } from '@atelier/ds'[/em]. Modern bundlers eliminate the rest." },
          { n: "IV",  body: "[em]Composable[/em]. Components have nominally exported subcomponents (Card / CardHeader / CardBody). You assemble the hierarchy that makes sense." },
        ],
      },
      npm: {
        title: "NPM install",
        kicker: "phase 14 · planned",
        desc: "When the package ships on NPM (Phase 14 of the roadmap). For now, copy-paste from the repo — shadcn-style model also works.",
      },
      bootstrap: {
        title: "Bootstrap",
        kicker: "required providers",
        desc: "Three providers at the entry — [em]LocaleProvider[/em] (i18n + RTL dir), [em]Toaster[/em] (global notifications), [em]ShortcutsProvider[/em] (discoverable shortcuts via Shift+?).",
      },
      first: {
        title: "First component",
        kicker: "hello world",
        desc: "Import directly from the main barrel. Zero config — works in the entry of any React 18+ app.",
      },
    },

    /* ============================================================ */
    apiReference: {
      lead: "Reference · 69",
      titleA: "The ",
      titleB: "API map",
      metaLabel: "Index",
      meta: "Where to find what",
      intro:
        "The detailed doc for each component lives in its own page (props, examples, composition). This page is [em]the editorial index[/em] — where to find what inside the source. Useful for contributing and for understanding what is [em]NOT[/em] publicly exported.",
      principles: {
        title: "Conventions",
        kicker: "how the code is organized",
        desc: "Four organization rules that apply to all source navigation.",
        items: [
          { n: "I",   body: "[em]src/ds/[/em] — components. Each file exports a compound (e.g., Card + CardHeader + CardBody)." },
          { n: "II",  body: "[em]src/lib/[/em] — utilities and public hooks. All via barrel [em]src/lib/hooks[/em]." },
          { n: "III", body: "[em]src/pages/[/em] — documentation. Each component has a corresponding page at [em]/<slug>[/em]." },
          { n: "IV",  body: "[em]src/ds/types.ts[/em] — centralized public types. Type imports don't bloat bundle." },
        ],
      },
      table: {
        title: "Map by family",
        kicker: "code → doc",
        desc: "Each row: component family, main exports, official doc.",
        thFamily: "family", thExports: "main exports", thRoute: "doc",
        rows: [
          { family: "primitives.tsx",  exports: "Button · Input · Switch · Badge · Avatar · Tooltip · Section · PageHead · Code", route: "code" },
          { family: "Card.tsx",        exports: "Card · CardHeader · CardKicker · CardTitle · CardBody · CardFooter", route: "cards" },
          { family: "Tabs.tsx",        exports: "Tabs · TabList · Tab · TabPanels · TabPanel", route: "tabs" },
          { family: "Drawer.tsx",      exports: "Drawer · DrawerTrigger · DrawerContent · DrawerHeader · DrawerTitle · DrawerClose · DrawerBody · DrawerFooter", route: "drawer" },
          { family: "Toaster.tsx",     exports: "Toaster · useToast", route: "toaster" },
          { family: "DataTable.tsx",   exports: "DataTable · DataTableToolbar · DataTableHeader · DataTableFilters · DataTableBody · DataTableEmpty · DataTablePagination · useDataTable", route: "data-table" },
          { family: "Chart.tsx",       exports: "Chart · BarChart · LineChart · AreaChart · PieChart · DonutChart · RadarChart · RadialChart · Sparkline", route: "charts" },
          { family: "Form.tsx",        exports: "Form · FormStep · FormRow · FormField · FormDivider · FormActions", route: "forms" },
          { family: "Motion.tsx",      exports: "Transition · Fade · Slide · Scale · Collapse · ScrollReveal", route: "motion" },
          { family: "lib/hooks/",      exports: "17 public hooks (useMediaQuery · useDebounce · useFocusTrap · useControllableState · …)", route: "hooks" },
          { family: "lib/tokens.ts",   exports: "TOKENS · serializeCss · serializeJson · serializeTs · downloadText", route: "tokens" },
          { family: "lib/contrast.ts", exports: "parseColor · relativeLuminance · contrastRatio · wcagLevel", route: "accessibility" },
        ],
      },
    },

    /* ============================================================ */
    browserSupport: {
      lead: "Reference · 70",
      titleA: "The ",
      titleB: "browsers",
      metaLabel: "Support",
      meta: "Evergreen · 2 versions",
      intro:
        "Atelier targets [em]evergreen browsers[/em] — Chrome, Edge, Firefox, Safari in their last two majors. No IE11, no Safari 13, no heavy polyfills. When an API isn't universally supported yet (e.g., View Transitions), we offer graceful fallback.",
      table: {
        title: "Minimum versions",
        kicker: "evergreen targets",
        desc: "Table updated at every version release (Chrome quarterly, Firefox 4–6 weeks).",
        thBrowser: "browser", thMin: "min", thNotes: "notes",
        rows: [
          { name: "Chrome",         version: "≥ 110", notes: "Covers Edge (Chromium), Brave, Opera. ~95% of market." },
          { name: "Firefox",        version: "≥ 109", notes: "Some APIs (View Transitions) haven't landed yet — we have fallbacks." },
          { name: "Safari (macOS)", version: "≥ 16.4",notes: "[em]:has()[/em] and Container Queries arrived in 16.4 — minimum baseline." },
          { name: "Safari (iOS)",   version: "≥ 16.4",notes: "Same baseline as macOS. iOS 15.x is not a target." },
          { name: "IE / Edge Legacy",version: "—",    notes: "No support. EOL since 2023." },
        ],
      },
      features: {
        title: "Assumed APIs",
        kicker: "no polyfill",
        desc: "Modern features Atelier USES without polyfill — assumes available in the targets above.",
        items: [
          { n: "I",   body: "[em]ES2022[/em] — top-level await, error.cause, Array.at(), structuredClone(). Vite with target esnext generates modern code." },
          { n: "II",  body: "[em]CSS Logical Properties[/em] — padding-inline-start, inset-inline-end, etc. Used by RTL CSS (phase 6.1)." },
          { n: "III", body: "[em]CSS Custom Properties[/em] — backbone of the design system. Without it, nothing works." },
          { n: "IV",  body: "[em]matchMedia / MutationObserver / IntersectionObserver / ResizeObserver[/em] — Phase 10 hooks depend on them." },
          { n: "V",   body: "[em]Intl.PluralRules / Intl.NumberFormat / Intl.DateTimeFormat[/em] — i18n with no external deps (phase 11.4)." },
          { n: "VI",  body: "[em]color-mix() in CSS[/em] — used to derive accent variants. Safari 16.2+, Firefox 113+." },
        ],
      },
    },

    /* ============================================================ */
    performance: {
      lead: "Reference · 71",
      titleA: "The ",
      titleB: "performance",
      metaLabel: "Budgets",
      meta: "Editorially obsessive · cheap first paint",
      intro:
        "Performance is editorial decision — not later optimization. Atelier is born light and maintains [em]verifiable budgets[/em]. After phase 8.1 (code splitting), the entry dropped from 922 KB to 24 KB minified. First paint pays ~165 KB gz; each subsequent navigation pays only the visited page's chunk (1-15 KB gz).",
      budgets: {
        title: "Official budgets",
        kicker: "verifiable targets",
        desc: "Each metric has [em]target[/em] and the [em]current measured value[/em]. Chunks above the limit trigger build warning (limit: 250 KB minified).",
        thMetric: "metric", thTarget: "target", thCurrent: "current",
        rows: [
          { metric: "Entry chunk (index.js)",   target: "< 50 KB min",  current: "24 KB" },
          { metric: "First-paint payload (gz)", target: "< 200 KB",     current: "~165 KB" },
          { metric: "Largest chunk (vendor)",   target: "< 200 KB min", current: "138 KB (react)" },
          { metric: "Average page (lazy)",      target: "< 15 KB min",  current: "~5 KB" },
          { metric: "Total CSS (gz)",           target: "< 30 KB",      current: "~26 KB" },
          { metric: "Bundle warning (vite)",    target: "≤ 250 KB min", current: "0 warnings" },
        ],
      },
      wins: {
        title: "Editorial wins",
        kicker: "decisions > optimization",
        desc: "Five structural choices that resulted in real performance. All decided at the architecture phase — not retrofit.",
        items: [
          { n: "I",   body: "[em]Zero runtime deps[/em]. No framer-motion (~30 KB), no date-fns (~70 KB), no react-dnd (~50 KB). All in-house." },
          { n: "II",  body: "[em]Aggressive code splitting[/em] (8.1 ✓). Each page is a chunk via [em]React.lazy()[/em]. Entry dropped 97%." },
          { n: "III", body: "[em]Lazy i18n per locale[/em]. pt-BR dictionary (~130 KB) only loads if user switches to Portuguese. EN is the default." },
          { n: "IV",  body: "[em]Separate ds-* chunks[/em] (Charts, DataTable, DragDrop, Markdown). Whoever never opens /charts doesn't pay for the 13 KB." },
          { n: "V",   body: "[em]Single CSS[/em] without PostCSS/JIT. Faster build, less complexity, easier debug." },
        ],
      },
      howto: {
        title: "How to measure",
        kicker: "tools",
        desc: "Bundle analyzer comes in roadmap phase 8.8. For now, [em]npm run build[/em] already shows all chunks with minified and gzipped sizes.",
      },
    },

    /* ============================================================ */
    recipes: {
      lead: "Reference · 72",
      titleA: "The ",
      titleB: "recipes",
      metaLabel: "Gallery",
      meta: "{count} compositions · live",
      intro:
        "Curated compositions showing Atelier in action. Every recipe renders [em]live[/em] (not a screenshot), has [em]editable inline[/em] snippet and opens in [em]StackBlitz/CodeSandbox[/em] with one click. All zero-deps — sandbox template fetches @atelier/ds directly from NPM (Phase 14).",

      filterLabel: "Filter by category",
      categories: {
        all: "All",
        form: "Form",
        layout: "Layout",
        data: "Data",
        marketing: "Marketing",
      },

      items: {
        login: {
          title: "Login",
          kicker: "Form · auth",
          desc: "Minimal form with correct [em]autocomplete[/em], 'Forgot password' link and primary CTA. Async submit pattern is left as exercise — add [em]submitting[/em] state via [em]useState[/em].",
          caption: "Login form · 360px",
        },
        settings: {
          title: "Settings",
          kicker: "Form · preferences",
          desc: "Preferences card with [em]Switch[/em] per row. Notifications as two independent toggles — each persistent via [em]useLocalStorage[/em] in real apps.",
          caption: "Settings card · 480px",
        },
        pricing: {
          title: "Pricing",
          kicker: "Marketing · 3 tiers",
          desc: "Three cards side by side, middle tier with [em]primary[/em] CTA. Feature list without icons — each bullet is an editorial decision.",
          caption: "Pricing tiers · 720px",
        },
        comments: {
          title: "Comment thread",
          kicker: "Data · social",
          desc: "Comment list with [em]Avatar[/em] + meta (author + time) + body, followed by reply Textarea. Button [em]disabled[/em] while empty — first-person UX.",
          caption: "Thread · 480px",
        },
        onboarding: {
          title: "Onboarding stepper",
          kicker: "Layout · multi-step",
          desc: "Editorial Stepper + contextual Alert + prev/next navigation. Pattern for flows where the sequence is REQUIRED — for free exploration, prefer side navigation.",
          caption: "3-step onboarding · 560px",
        },
        subscribe: {
          title: "Newsletter",
          kicker: "Marketing · capture",
          desc: "Editorial capture with [em]Card[/em] + Form + consent Checkbox. Button [em]disabled[/em] until agreed — LGPD and GDPR friendly.",
          caption: "Subscribe card",
        },
      },
    },
  },
};

export default en;
