# @atelier/cli

> Atelier — a quiet, editorial design system. Copy components into your project, shadcn-style.

The Atelier CLI is a **zero-dependency** command-line tool that copies design system components directly into your project's source tree. Your app **owns the code** — version it, customize it, accept updates by re-running the command.

```bash
npx atelier init
npx atelier add Button
```

---

## Why a copy-paste CLI?

We're stealing the [shadcn/ui](https://ui.shadcn.com) idea on purpose:

- **You own the code.** No mystery `node_modules`, no version-pinning gymnastics.
- **Bring-your-own customization.** Edit the file. It's yours.
- **No runtime dependency** on `@atelier/cli`. After scaffolding, you can `npm uninstall` it.
- **No build-time dependency** on `@atelier/ds`. Files copied in are plain `.tsx` you can compile with anything that handles JSX.

If you'd rather install the design system as a regular package (with build outputs, types, sub-paths), use [`@atelier/ds`](https://www.npmjs.com/package/@atelier/ds) instead.

---

## Install & run

The CLI is designed to be run via `npx` — no global install needed.

```bash
npx atelier --help
npx atelier --version
```

Or install locally as a dev dependency:

```bash
npm install -D @atelier/cli
npx atelier init
```

**Requirements:** Node `>= 18` (uses native `fs`, `path`, no transpilation).

---

## Commands

### `atelier init`

Creates the scaffold inside `cwd`:

```
src/
├── ds/                 ← components land here
├── lib/
│   └── hooks/          ← hooks land here
└── atelier.css         ← copy of the full token + component CSS
```

Already-existing files are preserved. Re-run anytime — idempotent.

```bash
npx atelier init
```

### `atelier add <Component>...`

Copies one or more components plus their **transitive dependencies** (other components and hooks) into your `src/` tree.

```bash
npx atelier add Button
npx atelier add DataTable          # also copies Combobox, DatePicker, RangeSlider, Pagination, Calendar
npx atelier add Dialog Drawer      # multiple at once
```

Flags:

| Flag       | Effect                                                                 |
| ---------- | ---------------------------------------------------------------------- |
| `--force`  | Overwrite existing files (default: skip with a `·` marker).            |
| `--dry-run`| Print what would be copied without touching the filesystem.            |

### `atelier list [--category=<c>]`

Lists every component in the registry, with category, description, and dependencies.

```bash
npx atelier list
npx atelier list --category=overlay
npx atelier list --category=form
```

Available categories: `primitive`, `form`, `layout`, `navigation`, `overlay`, `data`, `feedback`.

### `atelier --version` / `atelier --help`

Self-explanatory.

---

## How it works

The package ships with three things:

- `bin/atelier.js` — the CLI entry point (single-file, zero deps)
- `registry.json` — manifest of every component and hook
- `components/`, `hooks/`, `lib/`, `styles/` — the actual source files

When you run `atelier add <X>`, the CLI:

1. Looks `<X>` up in `registry.json`
2. Walks the `deps` graph (BFS) collecting all needed components and hooks
3. Copies each file from inside the package to your `src/ds/` or `src/lib/hooks/`
4. Prints a summary

That's it. No network, no build step, no transpilation.

---

## What's in the registry?

36 components across 7 categories — primitives (Button, Input, Switch, KBD, Motion), forms (Input, Combobox, RangeSlider, Calendar, DatePicker, ColorPicker, TagInput, Form, Field), layout (Card, ResizablePanels), navigation (Tabs, Stepper, Pagination, Breadcrumbs, TreeView), overlays (Drawer, Popover, DropdownMenu, ContextMenu, Dialog), data (DataTable, MarkdownViewer, Carousel, VirtualList, Chart, Timeline, DragDrop), feedback (Skeleton, EmptyState, Alert, Toaster).

Plus 18 zero-dep React hooks: `useMediaQuery`, `usePrefersReducedMotion`, `useWindowSize`, `useIntersectionObserver`, `useResizeObserver`, `useClickOutside`, `useScrollLock`, `useEventListener`, `useKeyPress`, `useLocalStorage`, `useDebounce`, `useThrottle`, `useControllableState`, `usePrevious`, `useUpdateEffect`, `useFocusTrap`, `useFocusReturn`, `useRovingTabIndex`.

Run `npx atelier list` to see the live registry from the version installed.

---

## After installation

The CLI doesn't ship type declarations, runtime, or styling — that's all in the files it copies. Once you've run `init`:

1. Import the styles in your entry point:

   ```tsx
   import "./atelier.css";
   ```

2. Import the component you added:

   ```tsx
   import { Button } from "./ds/primitives";
   ```

You're done. The CLI is now optional — keep it as a dev dep to pull more components later, or `npm uninstall @atelier/cli` and you're free of it forever.

---

## License

[MIT](./LICENSE) © Atelier
