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
    },
    items: {
      overview: "Overview",
      principles: "Principles",
      colors: "Colors",
      typography: "Typography",
      spacing: "Spacing",
      icons: "Glyphs",
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
      forms: "Forms",
      stepper: "Stepper",
      emptyStates: "Empty states",
      sidebar: "Sidebar",
      navbar: "Navbar",
      accessibility: "Accessibility",
      code: "For devs · code",
      create: "Create · customize",
    },
    descriptions: {
      overview: "The manual's cover — what's coming up.",
      principles: "The six rules that govern the editorial style.",
      colors: "Four families: surface, ink, accent, semantic.",
      typography: "Editorial voice in Fraunces and JetBrains Mono.",
      spacing: "8pt scale and the twelve-column grid.",
      icons: "Twelve typographic glyphs — not UI icons.",
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
      forms: "Full composition: fields, dividers, actions.",
      stepper: "Multi-step progress indicator for long forms.",
      emptyStates: "Invitations, not defeats — space with intent.",
      sidebar: "Vertical table-of-contents for many-paged sites.",
      navbar: "Horizontal header with hover dropdowns.",
      accessibility: "Shortcuts, focus, contrast and ARIA.",
      code: "Tokens, primitives and API for developers.",
      create: "Build your theme live and export the tokens.",
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
    pagination: {
      label: "Pagination",
      previous: "Previous",
      next: "Next",
    },
    breadcrumbs: {
      label: "Breadcrumb trail",
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
      patterns: "Patterns",
      atelier: "Atelier",
    },
    links: {
      principles: "Principles",
      colors: "Colors",
      typography: "Typography",
      spacing: "Spacing",
      icons: "Glyphs",
      buttons: "Buttons",
      inputs: "Inputs",
      avatars: "Avatars",
      badges: "Badges",
      cards: "Cards",
      tables: "Tables",
      forms: "Forms",
      empty_states: "Empty states",
      sidebar: "Sidebar",
      navbar: "Navbar",
      dropzone: "Dropzone",
      overview: "Overview",
      code: "For devs · code",
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
        "Two families do all the work. [em]Fraunces[/em] for reading and emphasis, [em]JetBrains Mono[/em] for metadata and code. Italic is the only decoration allowed.",
      specimensTitle: "Specimens",
      specimensKicker: "hierarchy",
      scaleTitle: "Scale",
      scaleKicker: "ratios",
      scaleDesc:
        "Perfect-fifth ratio (1.5) for the serif, compressed into discreet steps for the monospace. Never more than six levels per screen.",
      specimens: {
        display: {
          meta: "Display",
          weight: "300 · italic optional",
          textA: "The ",
          textB: "morning",
          textC: " begins in the headline.",
        },
        headline: {
          meta: "Headline",
          weight: "300",
          textA: "Silences also ",
          textB: "have",
          textC: " a voice.",
        },
        title: {
          meta: "Title",
          weight: "300",
          text: "A well-breathed paragraph invites the reader in.",
        },
        body: {
          meta: "Body serif",
          weight: "400",
          text:
            "Atelier's typography leans on Fraunces — a modern serif with lively shapes, optical sizing and an expressive italic used only for emphasis.",
        },
        caption: {
          meta: "Caption",
          weight: "500 · uppercase",
          text: "Metadata · footer · label",
        },
        mono: { meta: "Mono inline", weight: "400", text: "--accent: #c8361d;" },
      },
    },

    spacing: {
      lead: "Foundation · 04",
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
      lead: "Foundation · 05",
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

    buttons: {
      lead: "Component · 06",
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
      lead: "Component · 07",
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
      lead: "Component · 08",
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
      lead: "Component · 09",
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
      lead: "Component · 10",
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
      lead: "Component · 11",
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
      lead: "Component · 12",
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
      lead: "Component · 13",
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
      lead: "Component · 14",
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
      lead: "Component · 15",
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
      lead: "Component · 16",
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
      lead: "Component · 17",
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
      lead: "Component · 18",
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
      lead: "Component · 19",
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
      lead: "Component · 20",
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
      lead: "Component · 21",
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
      lead: "Advanced · 22",
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
      lead: "Advanced · 23",
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
      lead: "Advanced · 24",
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

    forms: {
      lead: "Pattern · 25",
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
      lead: "Pattern · 26",
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
      lead: "Pattern · 27",
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
      lead: "Pattern · 28",
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
      lead: "Pattern · 29",
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
      lead: "Reference · 30",
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
          "Paste the block below into the [em]:root[/em] of your CSS to reproduce this combination in your project.",
        copy: "Copy",
        copied: "Copied",
        download: "Download .css",
      },
      actions: {
        shuffle: "Shuffle",
        reset: "Reset",
        export: "Export tokens",
        hideExport: "Hide tokens",
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
  },
};

export default en;
