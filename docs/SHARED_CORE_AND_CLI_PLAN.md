# Plan: Shared core package, web app, and CLI

This document describes how to extract reusable tool logic into an **npm package** consumed by the **Developer Utilities Tool** web app and, later, a **command-line interface**—without duplicating behavior or drifting implementations.

## Goals

- **Single source of truth** for encode/hash/JWT/format conversion and similar logic.
- **Web UI** stays in React; it imports pure functions from the library.
- **CLI** (future) is a thin layer over stdin/stdout and files.
- **Tests** target the library first; the app gains confidence indirectly.

## Non-goals (initially)

- Full parity between every playground-style page and CLI commands (HTML playground, visual color picker, etc.).
- Rewriting the entire app before the first library release.

## Repository layout

| Option | When to use |
|--------|-------------|
| **Monorepo** (`packages/core` + app at root or `apps/web`) | Recommended for one maintainer: one PR updates library + UI. |
| **Separate repo** for the package | When you want independent versioning and consumers outside this project. |

**Recommendation:** Start with **npm workspaces** in this repo:

- `packages/core` — published (or `workspace:*`) library.
- Existing Vite app depends on `@scope/devutil-core` (name TBD).

## Package design (`packages/core`)

### Public API

- Prefer **named exports** of small, pure functions with explicit TypeScript types.
- Use **`exports`** in `package.json` for stable entry points (e.g. `"."`, optional `"./encoding"` if you split by domain later).
- Ship **compiled ESM** + **`.d.ts`** (e.g. **tsup** or **unbuild**). Do not publish only raw `.ts` unless you document that consumers must transpile.

### Runtime: browser vs Node

- Prefer **`Uint8Array` / `TextEncoder`** over `btoa`/`atob` inside core, or provide tiny adapters so Node and browsers both work.
- **DOM-only APIs** (e.g. `document.createElement` for HTML entities) must be **replaced** with portable encode/decode in core so the CLI and Node tests behave the same.
- **I/O** (clipboard, `Blob`, file download, `fetch`) stays in the **app** or **CLI**, not in core.

### Dependencies

- Move shared deps (**`crypto-js`**, **`js-yaml`**, etc.) into **`core`** `dependencies` as you migrate.
- Watch **bundle size** in the web app: dedupe or mark peers if Vite pre-bundling duplicates large libs.

## What migrates first

### Wave A — high value, mostly portable

- Timestamp / cron helpers (if implemented as plain functions).
- URL parse and encode/decode helpers.
- JWT decode (header/payload inspection only, matching current site behavior).

### Wave B — encoding and crypto

- Logic currently living in pages such as `Encoding.tsx` → `core`.
- Hash/HMAC wrappers around `crypto-js` with stable inputs/outputs.

### Wave C — heavy formats

- Data transform (JSON / CSV / YAML / XML / TOML): **conversion functions** in core; editors and UI remain in the app.

## Migration workflow (per feature)

1. Add functions to `packages/core` with **unit tests** (Vitest): round-trips, error cases, golden vectors.
2. Replace inline logic in the page with **imports from core**.
3. Run **app build** and **manual smoke test** on the route.
4. Tag a **semver** bump on the library when the API is stable.

## Web app integration

- Root **`package.json`**: `"workspaces": ["packages/*"]` (or equivalent).
- App dependency: `"@scope/devutil-core": "workspace:*"` during development.
- Adjust **Vite** only if prebundle or resolution issues appear (`optimizeDeps`).

## CLI (later phase)

- New package **`packages/cli`** (or `apps/cli`) using **Commander** or **yargs**.
- Commands call **the same core functions** as the web app (e.g. `devutil encode base64 --decode < input.txt`).
- Exit codes, stderr for errors, stdout for results; no React.

**Ship the CLI** after at least **three** tools are fully backed by `core` and the pattern feels repetitive.

## Risks and mitigations

| Risk | Mitigation |
|------|------------|
| Logic split across UI and core | Rule: **no crypto/format algorithm in `*.tsx`** once migrated. |
| Browser vs Node differences | Core uses portable primitives; test core under **Node** in CI. |
| Huge “god module” barrel | Optional **subpath exports** to preserve tree-shaking. |
| Endless migration | Time-box waves; **ship Wave A** before touching Wave C. |

## Checklist (execution order)

1. [ ] Add `packages/core` with build, types, and Vitest; wire **workspaces**.
2. [ ] Prove integration: trivial export imported from the Vite app.
3. [ ] Migrate **one complete tool** (tests + page refactor).
4. [ ] Repeat in waves A → C.
5. [ ] Publish `@scope/devutil-core` (or internal registry) with semver.
6. [ ] Add `packages/cli` and first commands.

## Related docs

- [Analytics setup](./ANALYTICS_SETUP.md) — unchanged by this plan; core package should remain free of analytics.

---

_Last updated: 2026-03-21_
