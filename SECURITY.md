# Security Policy

Thank you for taking the time to look responsibly. Atelier is a study design system, but we treat security reports with the seriousness any production codebase deserves.

This file mirrors the machine-readable policy at [`/.well-known/security.txt`](./public/.well-known/security.txt) (RFC 9116).

---

## Supported versions

We support the **two most recent minor releases** of each published package.

| Package | Versions receiving security fixes |
|---|---|
| `@atelier/ds` | `0.x` (current minor + previous minor) |
| `@atelier/cli` | `0.x` (current minor + previous minor) |

The application at `atelier-ds.com` always runs the latest `main`.

---

## Reporting a vulnerability

**Please do not open public GitHub issues for security problems.**

Instead, send a private report to:

- **Email**: `security@atelier.dev`
- **GitHub Security Advisories**: [Report a vulnerability](https://github.com/atelier-ds/atelier/security/advisories/new) (preferred — gives us a private channel + CVE coordination)

Include, when possible:

- A description of the issue and its impact.
- Steps to reproduce, or a minimal proof of concept.
- Affected versions of `@atelier/ds`, `@atelier/cli`, or the application.
- Your environment (OS, browser, Node.js version) when relevant.
- Whether you'd like public credit (default) or to remain anonymous.

---

## What to expect

| Step | Timeline |
|---|---|
| Acknowledgment of your report | Within **72 hours** |
| Initial assessment + severity rating | Within **7 days** |
| Fix targeted for release | Critical: **7 days** · High: **30 days** · Medium/Low: next minor |
| Public disclosure | After a fix is released, coordinated with you |

We follow [coordinated disclosure](https://en.wikipedia.org/wiki/Coordinated_vulnerability_disclosure). We will not pressure you to disclose early, and we will not disclose without your input on timing.

---

## Scope

The following **are** in scope:

- The published `@atelier/ds` and `@atelier/cli` packages.
- The `src/` of this repository (all components, hooks, parsers, the CLI runtime).
- The application deployed at `atelier-ds.com` (XSS, CSRF, content injection, etc.).
- The service worker and PWA cache (cache poisoning, stale-content vectors).

The following **are not** in scope (please don't report):

- Vulnerabilities in dependencies — report those upstream. We track advisories via `npm audit` weekly.
- Findings from automated scanners without a working proof of concept.
- Issues that require a previously compromised browser, machine, or local network.
- Self-XSS that requires the user to paste arbitrary code into devtools.
- Missing security headers on `atelier-ds.com` that don't lead to a concrete exploit.
- Theoretical issues without measurable user impact.

---

## Common areas of interest

If you're looking for places to start, the following surfaces have written user input or parsing logic and are the most rewarding to audit:

- **`MarkdownViewer`** (`src/ds/MarkdownViewer.tsx`) — markdown to React. XSS via crafted markdown is the highest priority.
- **i18n inline parser** (`src/lib/i18n.tsx`) — parses `[em]…[/em]` and `[acc]…[/acc]` from translation strings into ReactNode.
- **`useLocalStorage`** + visited routes (`src/lib/useVisitedRoutes.ts`) — JSON parsing of user-controlled storage.
- **`@atelier/cli` runtime** (`packages/cli/bin/atelier.js`) — file system writes via `add` and `init` commands. Path traversal in registry entries.
- **Token export** (`src/lib/studioTokens.ts`) — generates `theme.css`, `tokens.json`, `theme.ts`. Code-injection via crafted token values.
- **CSV / JSON Dropzone** (`src/pages/DropzonePage.tsx`) — original parser. Prototype pollution from JSON.

---

## Acknowledgments

Reporters who help us improve security are credited (with permission) on the [`/credits`](https://atelier-ds.com/#/credits) page.

We do not run a paid bug bounty program. We do offer:

- Public credit on the website and in the changelog.
- A handwritten thank-you in the next release notes.
- A genuine debt of gratitude.

---

## Questions

Anything not covered above? Email `security@atelier.dev` or open a regular issue tagged `question` — keeping security details out of the issue body, of course.
