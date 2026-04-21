# Contributing to Atelier

Thank you for being here. Atelier is, before anything else, a manual — and like every manual, it improves when more careful eyes pass over it.

This guide explains how to get the project running, where things live, and what we expect from a pull request.

---

## TL;DR

```bash
git clone https://github.com/atelier-ds/atelier.git
cd atelier
npm install                 # workspaces installs root + packages/ds + packages/cli
npm run dev                 # opens http://localhost:5173
npm test                    # 42 vitest specs
npm run typecheck           # tsc --noEmit
npm run build               # full prod build (sitemap + service worker)
```

Open a draft PR early. We'd rather discuss direction than rewrite work.

---

## Prerequisites

- **Node.js ≥ 18.17** (we test on 18 and 20).
- **npm ≥ 9** for proper workspace support.
- Any modern editor with EditorConfig + ESLint + Prettier integration.

---

## Repository structure

```
atelier/
├── src/                       # the live manual + the source of truth for components
│   ├── App.tsx                # shell
│   ├── ds/                    # 36 components (single source — packages copy from here)
│   ├── lib/
│   │   ├── hooks/             # 18 hooks
│   │   ├── i18n.ts · theme.tsx · routes.ts · searchIndex.ts
│   │   └── ...
│   ├── pages/                 # 80 documentation pages
│   ├── i18n/{pt-BR,en}.ts     # bilingual dictionaries
│   └── index.css              # all design tokens + every component style
│
├── packages/
│   ├── ds/                    # @atelier/ds  — Vite library + dts
│   └── cli/                   # @atelier/cli — shadcn-style CLI (zero deps)
│
├── registry.json              # 36 components + 18 hooks, single source of truth
├── scripts/                   # build helpers (sitemap, service worker)
└── public/                    # static assets, favicon, manifest, sitemap, .well-known
```

### Where to put things

| You're adding... | Put it here | Then... |
|---|---|---|
| A new **component** | `src/ds/<name>.tsx` + styles in `src/index.css` (`.<name>-*`) | Add it to `registry.json`, `searchIndex.ts`, `routes.ts`, both i18n files, then a documentation page in `src/pages/<Name>.tsx`. |
| A new **hook** | `src/lib/hooks/<useName>.ts` | Add to `registry.json` under the hook category, document it in `src/pages/Hooks.tsx`. |
| A new **page** | `src/pages/<Name>.tsx` (lazy-loaded in `App.tsx`) | Add the route in `src/lib/routes.ts`, the entries in both `src/i18n/{pt-BR,en}.ts`, and an entry in `searchIndex.ts`. |
| A **token** | `src/index.css` `:root` (and the dark counterpart) | Add to `src/lib/tokens.ts` so it shows up in `/tokens` and Studio. |
| **Translations** | `src/i18n/pt-BR.ts` and `src/i18n/en.ts` (mirror each other) | Both files **must** stay in sync. PRs that add a key in only one language will be sent back in review. |

---

## Editorial principles

These are the same rules the design system enforces on its own UI. When you're writing copy or designing a new component, hold them up against your work:

1. **Silence as default** — the loudest color is used sparingly.
2. **Typography before pixels** — hierarchy comes from the font, not from color.
3. **Right angles** — no `border-radius`, no drop shadows.
4. **Human measure** — lines never exceed ~70 characters.
5. **Predictable gestures** — motion stays between 120 and 320 ms.
6. **Accessible by construction** — visible focus, contrast ≥ 4.5:1.

Read [`#/principles`](https://atelier-ds.com/#/principles) and [`#/voice`](https://atelier-ds.com/#/voice) before adding new copy.

---

## Code style

- **TypeScript**, `strict: true`. No `any` unless you can defend it in the PR description.
- **Plain CSS** — no preprocessors. Component styles use a `.<component-name>-*` namespace.
- **No runtime dependencies** beyond `react` and `react-dom`. We check this on every PR. If you genuinely need something, open an issue first to discuss.
- **No comments narrating obvious code.** Comments explain *why*, not *what*.
- **Imports** ordered: standard lib → third-party → workspace → relative. No barrel re-exports just to shorten an import path.
- **Tests live next to the code**: `src/ds/Button.tsx` ↔ `src/ds/Button.test.tsx`.

Run `npm run lint` and `npm run typecheck` before pushing — both must be green.

---

## Commit messages

Conventional Commits, lowercase, present tense:

```
feat(ds): add VirtualList with windowing
fix(cli): handle missing src/ folder in init
docs(install): clarify peer dep on react-dom
chore(deps): bump vitest to 4.1.2
```

Scope is optional but appreciated: `ds`, `cli`, `app`, `i18n`, `docs`, `infra`.

---

## Pull requests

1. Branch from `main`: `git checkout -b feat/your-thing`.
2. Make small, reviewable commits. Squash before merge if the history is noisy.
3. Run the **full local check**:

   ```bash
   npm run typecheck && npm test && npm run build
   ```

4. Open a draft PR. Fill in the PR template — especially the **screenshots** for any UI change (light + dark, sidebar + navbar) and the **i18n parity** checkbox.
5. Be patient with review. We optimize for the long-term shape of the codebase over speed of merge.

### What gets reviewed

- **Correctness** — does it work? Does it pass tests? Does it break existing behavior?
- **Editorial fit** — does the copy follow the tone? Does the visual respect the principles?
- **Accessibility** — keyboard, focus, contrast, screen reader semantics.
- **i18n parity** — both dictionaries updated, no English leaking into pt-BR (or vice versa).
- **No new runtime deps.** Devtools and build-time are fine.

---

## Reporting bugs

Use [GitHub Issues](https://github.com/atelier-ds/atelier/issues/new/choose) with the **Bug report** template. The more specific you can be — browser version, OS, theme, navigation mode, locale — the faster we can reproduce it.

For **security vulnerabilities**, do **not** open a public issue. Read [`SECURITY.md`](./SECURITY.md).

---

## Suggesting features

Open a **Feature request** issue. Tell us:

- What problem you're trying to solve.
- What you've already tried.
- Whether you'd like to send the PR yourself.

We may say no — Atelier keeps a small surface area on purpose. That's not a judgment of the idea, just of fit.

---

## Working on the packages

Both NPM packages live in `packages/` and are wired as npm workspaces.

```bash
# @atelier/ds — library mode
npm run build:ds          # vite library build + dts
npm run pack:ds           # produces a .tgz
npm run smoke:ds          # full sandbox: install, ESM + CJS + types + CSS, 10 checks

# @atelier/cli — shadcn-style
npm run build:cli         # syncs sources from src/ into the package
npm run pack:cli
npm run smoke:cli         # sandbox: install via npx, 10 scenarios
```

Both packages **read from `src/`** — you almost never edit files inside `packages/` directly. The sync scripts (`packages/*/scripts/sync-sources.mjs`) keep them up to date at build time.

---

## Code of Conduct

This project follows the [Contributor Covenant 2.1](./CODE_OF_CONDUCT.md). By participating, you agree to uphold it.

---

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE) — the same license as the rest of the project.
