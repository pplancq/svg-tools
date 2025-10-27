# @pplancq/svg-core

Lightweight library to asynchronously load and insert SVG files into the DOM, with sanitization and attribute merging.

## 📝 Description
`@pplancq/svg-core` provides utilities to fetch an SVG (from a URL, a local path, or a data URI), sanitize it with DOMPurify, and merge its attributes into an existing SVG element when needed. The package avoids duplicate concurrent requests and throws explicit errors for invalid content.

Main goals:
- Load SVGs asynchronously.
- Protect against malicious SVG content using DOMPurify.
- Provide a simple API to reuse/merge SVGs into the DOM.

## ⚙️ Installation

```bash
npm install @pplancq/svg-core
```

## 🚀 Quick start

```javascript
import { getSvg } from '@pplancq/svg-core';

// Load an SVG from a URL and append it to the DOM
const svg = await getSvg('https://example.com/my-icon.svg');
document.body.appendChild(svg);

// Load a data URI SVG (base64 or URL-encoded)
const dataUri = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><circle r="10"/></svg>';
const svgFromData = await getSvg(dataUri);
document.body.appendChild(svgFromData);

// Merge a fetched SVG into an existing SVG element (useful to preserve element references)
const target = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
const merged = await getSvg('https://example.com/icon.svg', target);
// `merged` === `target` (mutated) — contains the attributes and content of the fetched SVG
```

## 🔌 API

### 📥 getSvg(path: string | URL, svgElement?: SVGSVGElement, sanitizeConfig?: SanitizeConfig): Promise<SVGSVGElement>
- Fetches SVG content from `path` (URL, path, or data URI `data:image/svg+xml`) and returns an `SVGSVGElement` ready to be inserted into the DOM.
- Parameters:
  - `path` — string or `URL` pointing to the SVG or a data URI.
  - `svgElement` — (optional) existing SVG element that will receive the attributes and content of the downloaded SVG.
  - `sanitizeConfig` — (optional) sanitization configuration to customize sanitization behavior. **⚠️ WARNING:** Only use with trusted SVG sources.
- Important behavior:
  - SVGs are sanitized via DOMPurify with SVG profiles enabled by default.
  - You can customize sanitization using the `sanitizeConfig` parameter (see [Custom Sanitization](#-custom-sanitization) below).
  - Concurrent calls to the same URL are deduplicated to avoid redundant network requests.
  - If `path` is a data URI, the function decodes the data (base64 or URL-encoded) without a network request.
- Possible errors:
  - `InvalidSvgError` — the HTTP response does not indicate `Content-Type: image/svg+xml`.
  - `ContentSvgError` — the retrieved content does not contain a valid `<svg>` element.

#### 🔒 Custom Sanitization

By default, all SVG content is sanitized using [DOMPurify](https://github.com/cure53/DOMPurify) to prevent XSS attacks. However, some legitimate SVG features (like animations) may be removed by the default configuration.

If you **control your SVG sources** and need to allow specific elements or attributes, you can pass a `sanitizeConfig` object:

```javascript
import { getSvg } from '@pplancq/svg-core';

// Allow SVG animation elements and attributes
const svg = await getSvg('/animated-spinner.svg', undefined, {
  allowTags: ['animateTransform', 'animate', 'animateMotion'],
  allowAttributes: ['from', 'to', 'dur', 'repeatCount', 'values', 'keyTimes'],
});
```

**Available configuration options:**

- `allowTags` — Array of additional tag names to allow
- `allowAttributes` — Array of additional attribute names to allow
- `forbidTags` — Array of tag names to explicitly forbid
- `forbidAttributes` — Array of attribute names to explicitly forbid
- `allowDataAttributes` — Boolean to allow `data-*` attributes

**⚠️ Security Warning:**

The `sanitizeConfig` option should **only** be used when:
- You control and trust the source of your SVG files
- You understand the security implications of allowing specific elements/attributes
- You have validated that your configuration doesn't introduce XSS vulnerabilities

**DO NOT** use custom sanitization configurations with user-uploaded SVGs or SVGs from untrusted sources.

### 🔁 mergeSvgContent(source: SVGSVGElement, target: SVGSVGElement): SVGSVGElement
- Merges attributes from `source` into `target` (uses `mergeAttributes`) then copies the content (`innerHTML`) of `source` into `target`.
- Mutates `target` and returns it.
- Usage: useful if you want to create an SVG element manually and inject fetched content into it.

## 🔒 Security & CORS
- Content is sanitized with DOMPurify (SVG profile + filters) to reduce XSS risk via SVG.
- The server must return the `Content-Type: image/svg+xml` header for the fetch to be accepted; otherwise `InvalidSvgError` is thrown.
- For cross-origin requests, the server must allow requests via CORS for `fetch` to work from a browser.

## ⚡ Performance
- The module deduplicates simultaneous requests to the same resource (in-flight promise cache) to avoid network overload.
- For massive use cases (many icons), consider application-side caching or an SVG sprite to reduce the number of requests.

## ♿ Accessibility
- The package accounts for SVG content security — but accessibility (alternative text, roles, titles) depends on how you integrate SVGs in your UI.
- Consider providing an accessible label (for example via `<title>` and `aria-labelledby`, or via `alt`/`aria-hidden` attributes) depending on the usage context.

## 🧪 Development & testing

Useful commands (from `packages/svg-core`):

```bash
npm run dev     # build in watch mode
npm run build   # production build
npm test        # run tests (vitest)
npm run lint    # eslint + tsc
```

Tests use `vitest` and `jsdom` to simulate a DOM environment.

## 🤝 Contributing
- Open an issue or a pull request on the repository: https://github.com/pplancq/svg-tools
- Respect linting rules (`npm run lint`) and tests (`npm test`) before submitting.

## 📚 Resources & contact
- Project: https://github.com/pplancq/svg-tools
- Project site: https://pplancq.github.io/svg-tools/
- Bugs / requests: https://github.com/pplancq/svg-tools/issues

## 📜 License
[MIT](./LICENSE)