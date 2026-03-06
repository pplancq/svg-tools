# Copilot Instructions

## Repository Overview

This is an npm workspaces monorepo for SVG loading utilities:

- **`packages/svg-core`** – Framework-agnostic TypeScript library. Fetches SVG files/data URIs, sanitizes them with DOMPurify, and injects them into the DOM.
- **`packages/svg-react`** – React 19 component built on `svg-core`. Uses `Suspense` + React 19's `use()` hook to consume the async SVG promise, wrapped in a custom `ErrorBoundary`.
- **`apps/storybook`** – Storybook demo app consuming both packages.

**Default branch:** `main`

## Build, Test, and Lint

> Node 24.14.0 and npm 11.11.0 are required (managed by [mise](https://mise.jdx.dev/)).

### All packages

```sh
npm run build          # Build all packages and apps
npm run test           # Run all tests (builds svg-core first via pretest)
npm run lint           # Lint all packages and apps (builds packages first via prelint)
```

### Single package

```sh
npm run build --workspace=packages/svg-core
npm run test --workspace=packages/svg-react
npm run lint --workspace=packages/svg-core
```

### Single test file

```sh
# From workspace root
npx vitest run packages/svg-core/tests/getSvg.test.ts

# Or from within the package directory
cd packages/svg-core && npx vitest run tests/getSvg.test.ts
```

### Watch mode

```sh
npm run test:watch     # Requires svg-core to be built first
```

### Coverage

Coverage is only collected when `CI=true`. Thresholds: 80% lines/branches/statements, 75% functions.

## Architecture

### SVG loading pipeline (svg-core)

1. `fetchSvg` – Fetches SVG over HTTP. Deduplicates concurrent requests for the same URL using an in-flight `Map<string, Promise<string>>`.
2. `getSvg` – Orchestrates the pipeline: supports HTTP URLs and `data:image/svg+xml` URIs, sanitizes via DOMPurify (`mapSanitizeConfig` translates `SanitizeConfig` to DOMPurify's `Config`), then calls `mergeSvgContent` to copy attributes and `innerHTML` into the target element.
3. `mergeSvgContent` / `mergeAttributes` – Mutates and returns the target `SVGSVGElement`.

### React Suspense pattern (svg-react)

`Svg` component calls `getSvg(src)` and passes the resulting `Promise` directly to `SvgPromise` as a `Usable<T>`. `SvgPromise` calls React 19's `use()` which suspends until the promise resolves, then applies the SVG via `useLayoutEffect`. `Suspense` renders an empty `<svg>` with `aria-busy="true"` while loading; on error `ErrorBoundary` renders `<span>{alt}</span>`.

### Test helper

`@pplancq/svg-react/tests` exports `renderSuspense` – a wrapper around React Testing Library's `render` that uses `act(async () => …)` to flush Suspense boundaries. Always use this instead of `render` when testing `Svg`.

### Build system

Both packages use **Rslib** (`rslib.config.ts`) with `bundle: false`, ESM output, and DTS generation into `build/`. Tests must `npm run build --workspace=@pplancq/svg-core` before running `svg-react` tests (handled automatically by `pretest`).

## Key Conventions

### Commit messages

Conventional Commits format with a **mandatory scope**:

| Scope | When to use |
|---|---|
| `svg-core` | Changes in `packages/svg-core` |
| `svg-react` | Changes in `packages/svg-react` |
| `storybook` | Changes in `apps/storybook` |
| `svg-tools` | Root-level or cross-cutting changes |
| `deps` | Dependency updates |
| `release` | Release automation |

First line must not exceed 72 characters. Use imperative mood, no trailing period.

### Branch naming

`feature/<name>` or `bugfix/<name>`

### Tests

- Test files live in `tests/` at the package root (e.g., `packages/svg-core/tests/`), not inside `src/`.
- File naming: `<SubjectName>.test.ts(x)`.
- Use `describe` / `it('should …')` structure.
- Prefer `getByRole` queries; use accessibility assertions (`toHaveAccessibleName`, etc.).
- Mock `window.fetch` directly in `svg-react` tests (no MSW).
- Always use `renderSuspense` (not `render`) in `svg-react` tests.

### Code style

- All source files are TypeScript with strict mode.
- ESLint + Prettier enforced via lint-staged on commit.
- Components follow the `export const Foo = () => {}` arrow-function pattern.
- Props type named `<ComponentName>Props`, declared before the component.

## Instructions

- **`.github/instructions/`** – Instruction files for a11y (WCAG 2.2 + RGAA 4), React, Vitest, performance, object calisthenics, and more. These are automatically applied based on file glob patterns.
- **`.github/git-commit-instructions.md`** – Full commit message guidelines.
