# Publishing `@atelier/ds` and `@atelier/cli`

This document is for **maintainers** who will run `npm publish` by hand. The packages are workspace members under `packages/`; the app root is `private` and is **never** published.

---

## Before you publish

1. **Version** — bump `version` in:
   - `packages/ds/package.json`
   - `packages/cli/package.json`
   - (optional) align `registry.json` `"version"` with the library story you want consumers to see.
2. **Changelog** — add an entry under the matching tag in root [`CHANGELOG.md`](../CHANGELOG.md).
3. **Roadmap meta** — bump `ROADMAP.meta.version` in `src/lib/roadmap.ts` and the roadmap kickers in `src/i18n/*.ts` if you version the docs site with the release.
4. **Build from clean tree**

   ```bash
   git status   # should be clean
   npm ci
   npm run typecheck && npm test && npm run build
   npm run smoke:ds && npm run smoke:cli
   ```

5. **Dry run** — inspect the tarball contents:

   ```bash
   npm run pack:ds
   tar -tzf packages/ds/*.tgz | head
   npm run pack:cli
   tar -tzf packages/cli/*.tgz | head
   ```

---

## `@atelier/ds`

```bash
cd packages/ds
npm publish --access public
```

- `prepack` / `build` runs `sync-sources.mjs` + Vite library build — the published tarball must include `dist/`, shims, and `README.md`.
- **Peer deps**: consumers need `react` and `react-dom` ≥ 18.
- **Tag** (optional but recommended):

  ```bash
  git tag ds-v0.2.0
  git push origin ds-v0.2.0
  ```

---

## `@atelier/cli`

```bash
cd packages/cli
npm publish --access public
```

- `prepack` syncs `components/`, `hooks/`, `lib/`, `styles/`, and `registry.json` from the monorepo `src/` — do not publish with a dirty `src/` that you did not intend to ship.
- **Engines**: `node >= 18`.
- **Tag**:

  ```bash
  git tag cli-v0.2.0
  git push origin cli-v0.2.0
  ```

---

## OTP and registry

- Use npm **2FA** on the maintainer account (`auth-and-writes` or `auth-only`).
- If your global `.npmrc` points to a private registry, override for the session:

  ```bash
  npm publish --access public --registry https://registry.npmjs.org/
  ```

---

## After publish

1. Smoke-install in a **temp directory** (same pattern as `packages/*/scripts/smoke.mjs`).
2. Update any hardcoded version strings in `src/lib/sandbox.ts` if they track the published library.
3. Announce in release notes / socials as you prefer.

---

## What is *not* automated

- No GitHub Actions workflow publishes on tag (yet).
- No Lerna/changeset — versioning is manual and intentional for this repo size.
