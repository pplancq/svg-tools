# @pplancq/svg-core

Lightweight library to asynchronously load and inject SVG files into the DOM, with sanitization, attribute merging, and reactive state management via the Observer pattern.

## 📝 Description

`@pplancq/svg-core` provides a class-based architecture to fetch an SVG (from a URL, a local path, or a data URI), sanitize it with DOMPurify, and merge its attributes into an existing SVG element when needed. The library uses the Observer pattern to expose reactive state changes, making it easy to integrate with any UI framework.

Main goals:
- Load SVGs asynchronously with reactive state (`idle` → `loading` → `success | error`).
- Protect against malicious SVG content using DOMPurify.
- Provide a simple observer-based API to react to SVG loading events.
- Deduplicate concurrent requests to the same URL.

## ⚙️ Installation

```bash
npm install @pplancq/svg-core
```

## 🚀 Quick start

```javascript
import { SvgStore } from '@pplancq/svg-core';

// Create a store — the pipeline starts immediately
const store = new SvgStore('https://example.com/my-icon.svg');

// Subscribe to state changes
const unsubscribe = store.subscribe(() => {
  const { status, svgElement, error } = store.getSvgResult();

  if (status === 'loading') {
    console.log('Loading…');
  }

  if (status === 'success') {
    document.body.appendChild(svgElement);
    unsubscribe(); // stop listening once done
  }

  if (status === 'error') {
    console.error('Failed to load SVG:', error);
  }
});

// Read the current state synchronously at any time
const currentState = store.getSvgResult();
console.log(currentState.status); // 'idle' (before the microtask runs)
```

## 🔌 API

### `new SvgStore(src, svgElement?, sanitizeConfig?)`

Creates a new store and immediately schedules the loading pipeline.

| Parameter        | Type                    | Required | Description                                                         |
| ---------------- | ----------------------- | -------- | ------------------------------------------------------------------- |
| `src`            | `string \| URL`         | ✅        | URL, path, or data URI (`data:image/svg+xml`) pointing to the SVG. |
| `svgElement`     | `SVGSVGElement`         | ❌        | Existing SVG element to receive the fetched attributes and content. |
| `sanitizeConfig` | `SanitizeConfig`        | ❌        | Custom sanitization options. **⚠️ Only use with trusted sources.**  |

The pipeline is deferred via `queueMicrotask`, which guarantees that any `subscribe()` call placed immediately after construction will receive all state transitions (`loading`, then `success` or `error`).

---

### `store.getSvgResult(): SvgState`

Returns the current state of the store synchronously.

```typescript
interface SvgState {
  status: 'idle' | 'loading' | 'success' | 'error';
  svgElement: SVGSVGElement | null;
  error: Error | null;
}
```

| Status    | Meaning                                           |
| --------- | ------------------------------------------------- |
| `idle`    | Store just created, pipeline not started yet.     |
| `loading` | Fetching or decoding the SVG is in progress.      |
| `success` | SVG loaded successfully — `svgElement` is set.    |
| `error`   | Loading failed — `error` contains the exception. |

---

### `store.subscribe(observer: () => void): () => void`

Registers a callback invoked on every state change. Returns an unsubscribe function.

```javascript
const unsubscribe = store.subscribe(() => {
  console.log(store.getSvgResult().status);
});

// Later, stop receiving notifications:
unsubscribe();
```

---

### 🔒 Custom Sanitization

By default, all SVG content is sanitized using [DOMPurify](https://github.com/cure53/DOMPurify) to prevent XSS attacks. Some legitimate SVG features (like animations) may be stripped by the default configuration.

If you **control your SVG sources** and need to allow specific elements or attributes, pass a `SanitizeConfig` as the third constructor argument:

```javascript
import { SvgStore } from '@pplancq/svg-core';

const store = new SvgStore('/animated-spinner.svg', undefined, {
  allowTags: ['animateTransform', 'animate', 'animateMotion'],
  allowAttributes: ['from', 'to', 'dur', 'repeatCount', 'values', 'keyTimes'],
});
```

**Available `SanitizeConfig` options:**

| Option               | Type       | Description                                    |
| -------------------- | ---------- | ---------------------------------------------- |
| `allowTags`          | `string[]` | Additional tag names to allow.                 |
| `allowAttributes`    | `string[]` | Additional attribute names to allow.           |
| `forbidTags`         | `string[]` | Tag names to explicitly forbid.                |
| `forbidAttributes`   | `string[]` | Attribute names to explicitly forbid.          |
| `allowDataAttributes`| `boolean`  | Allow `data-*` attributes (default: `false`).  |

**⚠️ Security Warning:** Do **not** use custom sanitization with user-uploaded SVGs or SVGs from untrusted sources.

---

## 🔒 Security & CORS

- Content is sanitized with DOMPurify (SVG profile + filters) to reduce XSS risk.
- The server must return `Content-Type: image/svg+xml` — otherwise `InvalidSvgError` is thrown.
- For cross-origin requests, the server must allow requests via CORS.

## ⚡ Performance

- The `SvgFetcher` deduplicates simultaneous requests to the same URL (in-flight promise cache) to avoid redundant network requests.
- For heavy usage (many icons), consider application-side caching or an SVG sprite.

## ♿ Accessibility

- The package handles SVG content security, but accessibility (alternative text, roles, titles) depends on how you integrate SVGs in your UI.
- Consider providing an accessible label (e.g. `<title>` + `aria-labelledby`, or `aria-hidden`) depending on the usage context.

## 🧪 Development & testing

```bash
npm run dev     # build in watch mode
npm run build   # production build
npm test        # run tests (vitest)
npm run lint    # eslint + tsc
```

Tests use `vitest` and `jsdom` to simulate a DOM environment.

---

## 🔄 Migration Guide: v2 → v3

Version 3 replaces the functional API with a class-based, Observer-pattern architecture.

### What changed

| v2 (functional)                         | v3 (OOP / Observer)                                  |
| --------------------------------------- | ---------------------------------------------------- |
| `getSvg(src, el?, config?)` (async fn)  | `new SvgStore(src, el?, config?)` + `.subscribe()`   |
| Returns `Promise<SVGSVGElement>`        | Returns `SvgState` via `getSvgResult()`              |
| One-shot call, no lifecycle events      | Reactive state: `idle → loading → success \| error`  |
| `mergeSvgContent(source, target)`       | Handled internally — pass `svgElement` to constructor |
| No error state, `catch` on the promise  | `state.status === 'error'` + `state.error`           |

### Before (v2)

```javascript
import { getSvg } from '@pplancq/svg-core';

try {
  const svgEl = await getSvg('/icon.svg');
  document.body.appendChild(svgEl);
} catch (error) {
  console.error('Failed:', error);
}

// With a target element
const target = document.querySelector('svg#icon');
await getSvg('/icon.svg', target);

// With custom sanitization
const animated = await getSvg('/spinner.svg', undefined, {
  allowTags: ['animateTransform'],
  allowAttributes: ['dur', 'repeatCount'],
});
```

### After (v3)

```javascript
import { SvgStore } from '@pplancq/svg-core';

// Basic usage
const store = new SvgStore('/icon.svg');
const unsubscribe = store.subscribe(() => {
  const { status, svgElement, error } = store.getSvgResult();
  if (status === 'success') {
    document.body.appendChild(svgElement);
    unsubscribe();
  }
  if (status === 'error') {
    console.error('Failed:', error);
    unsubscribe();
  }
});

// With a target element
const target = document.querySelector('svg#icon');
const store2 = new SvgStore('/icon.svg', target);

// With custom sanitization
const store3 = new SvgStore('/spinner.svg', undefined, {
  allowTags: ['animateTransform'],
  allowAttributes: ['dur', 'repeatCount'],
});
```

### Named exports that were removed

```javascript
// v2 — no longer available in v3
import { getSvg, mergeSvgContent } from '@pplancq/svg-core'; // ❌ removed

// v3 — new exports
import { SvgStore } from '@pplancq/svg-core';           // ✅
import type { SvgState, SvgStatus, SvgStoreInterface, SanitizeConfig } from '@pplancq/svg-core'; // ✅
```

---

## 🤝 Contributing

Open an issue or a pull request on the repository: https://github.com/pplancq/svg-tools  
Respect linting rules (`npm run lint`) and tests (`npm test`) before submitting.

## 📚 Resources & contact

- Project: https://github.com/pplancq/svg-tools
- Project site: https://pplancq.github.io/svg-tools/
- Bugs / requests: https://github.com/pplancq/svg-tools/issues

## 📜 License

[MIT](./LICENSE)
