# @pplancq/svg-react

A React component designed to efficiently load SVG files into your web applications,
while following best practices for performance, accessibility, and eco-design.

## ⬆️ Migration Guides

### Migrating from v1 to v2

- **React 19 only**: Version 2 no longer supports React 18. Please ensure you are using React 19 before upgrading.
- **New use() API**: The `Svg` component leverages React 19's `use()` API internally. Your existing code may require minor adjustments to align with this approach.
- **No major interface changes**: The component API remains similar, but the internal implementation benefits from the latest React features.

### Migrating from v2 to v3

- **No interface changes**: The `<Svg />` component API is **completely unchanged** — no modifications required in your application code.
- **Internal rewrite**: The component now uses `useSyncExternalStore` instead of `Suspense`/`use()`. As a result, wrapping `<Svg />` in a `<Suspense>` boundary is no longer necessary (though harmless if already present).
- **⚠️ Breaking change — `renderSuspense` removed**: The `@pplancq/svg-react/tests` export and its `renderSuspense` helper have been removed. If you were using `renderSuspense` in your tests, replace it with the standard `render` from `@testing-library/react` — see the [Testing section](#-tests) below.

## 🚀 General Overview

`@pplancq/svg-react` allows you to integrate SVG images asynchronously and efficiently, directly into the DOM,
without converting your SVGs into React components. This approach reduces your bundle size, improves loading times,
and helps lower your application's carbon footprint.

This component is intended to be used in the same way as the HTML `<img>` tag, providing a simple and familiar API for developers used to working with standard images.

### 💡 Philosophy and Advantages

- **Performance**: SVGs are loaded on demand, preventing your JavaScript bundle from becoming bloated.
- **Eco-design**: Less transformation, less generated code, fewer resources consumed.
- **Accessibility**: Option to provide alternative text (`alt`) for each SVG.
- **Flexibility**: The component accepts all native SVG element props, making customization (size, color, etc.) easy.
- **Interoperability**: Works with remote URLs or local imports.
- **Modern bundler compatibility**: Also works with the inline mode of modern bundlers like Vite and Rspack,
  allowing you to import SVGs as optimized string assets.

## 📦 Installation

```shell
npm install @pplancq/svg-react
```

## Usage in your React application

```javascript
import { Svg } from '@pplancq/svg-react';
import mySvg from './my-svg.svg';

export const App = () => {
  return <Svg src={mySvg} alt="mySvg" fill="red" />;
};
```

## 📖 Usage Guide

This SVG component is designed to be as flexible and customizable as a native SVG element. It inherits all the props of a standard SVG component, so you can use it just like a regular SVG element.

### 🏷️ Props

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Required</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>src</td>
      <td>The source of the SVG icon. It can be a URL or an inline SVG string.</td>
      <td>yes</td>
      <td>
        <code>https://my-domain/my-svg.svg</code>
      </td>
    </tr>
    <tr>
      <td>alt</td>
      <td>Alternative text if the SVG image cannot be loaded (accessibility).</td>
      <td>no</td>
      <td>
        <code>my-svg</code>
      </td>
    </tr>
    <tr>
      <td>sanitizeConfig</td>
      <td>
        Optional sanitization configuration to customize sanitization behavior.
        <br />
        <strong>⚠️ WARNING:</strong> Only use with trusted SVG sources. Improper configuration can introduce security vulnerabilities.
      </td>
      <td>no</td>
      <td>
        <code>{ allowTags: ['animateTransform'] }</code>
      </td>
    </tr>
  </tbody>
</table>

### 🔒 Security: Custom Sanitization Configuration

By default, all SVG content is sanitized using [DOMPurify](https://github.com/cure53/DOMPurify) to prevent XSS attacks. However, DOMPurify's default configuration may remove certain SVG elements or attributes that are safe in controlled environments, such as animation elements.

If you **control your SVG sources** and need to allow specific elements or attributes, you can use the `sanitizeConfig` prop:

```typescript
import { Svg } from '@pplancq/svg-react';

<Svg
  src="/spinner.svg"
  alt="Loading animation"
  sanitizeConfig={{
    allowTags: ['animateTransform', 'animate'],
    allowAttributes: ['to', 'from', 'dur', 'repeatCount'],
  }}
/>
```

#### Available Configuration Options

The `sanitizeConfig` prop accepts a `SanitizeConfig` object with the following properties:

- **`allowTags`**: Array of additional tag names to allow (e.g., `['animateTransform', 'animate']`)
- **`allowAttributes`**: Array of additional attribute names to allow (e.g., `['to', 'from', 'dur', 'repeatCount']`)
- **`forbidTags`**: Array of tag names to explicitly forbid (e.g., `['script', 'iframe']`)
- **`forbidAttributes`**: Array of attribute names to explicitly forbid (e.g., `['onerror', 'onclick']`)
- **`allowDataAttributes`**: Boolean to allow `data-*` attributes (default: `false`)

#### ⚠️ Security Warning

**IMPORTANT**: The `sanitizeConfig` option should **only** be used when:
- You control and trust the source of your SVG files
- You understand the security implications of allowing specific elements/attributes
- You have validated that your configuration doesn't introduce XSS vulnerabilities

**DO NOT** use custom sanitization configurations with user-uploaded SVGs or SVGs from untrusted sources.

#### Common Use Cases

**Allowing SVG animations:**
```typescript
<Svg
  src="/animated-icon.svg"
  alt="Animated icon"
  sanitizeConfig={{
    allowTags: ['animate', 'animateTransform', 'animateMotion'],
    allowAttributes: ['from', 'to', 'dur', 'repeatCount', 'values', 'keyTimes'],
  }}
/>
```

**Allowing data attributes for JavaScript interactions:**
```typescript
<Svg
  src="/interactive.svg"
  alt="Interactive graphic"
  sanitizeConfig={{
    allowDataAttributes: true,
  }}
/>
```

### ✅ Best Practices

- Use the `alt` prop to improve accessibility.
- Prefer asynchronous loading for large or non-critical SVGs.
- Customize your SVGs via props (`fill`, `width`, `height`, etc.) for optimal integration.
- You can also style your SVGs by applying CSS classes (`className`) to manage styles centrally.
- **Security**: Keep the default sanitization settings unless you have a specific need and fully control your SVG sources. Only use `sanitizeConfig` with trusted SVGs.

### 🛠️ Use Cases

- Dynamic or themed icons.
- Remote or local SVG illustrations.
- Eco-friendly replacement for SVG imports transformed into React components.

<!-- DEMO -->

## 🧑‍🔬 Tests

### 📝 Testing components using `<Svg />`

Since version 3, the `<Svg />` component uses `useSyncExternalStore` internally — no `Suspense` boundary is required. Standard `render` from `@testing-library/react` is all you need.

The `@testing-library/react`’s `waitFor` utility handles asynchronous updates from the store automatically.

### 📋 Example usage with a custom component

Suppose you have an `IconButton` component that uses the `<Svg />` component to display an icon:

```tsx
import { Svg } from '@pplancq/svg-react';

export function IconButton() {
  return (
    <button>
      <Svg src="/icon.svg" alt="button icon" width={24} height={24} />
      Action
    </button>
  );
}
```

To test this component, use `render` and `waitFor` from `@testing-library/react`:

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import { IconButton } from './IconButton';

it('should render the button with its SVG icon', async () => {
  render(<IconButton />);
  await waitFor(() => {
    expect(screen.getByRole('img', { name: 'button icon' })).toBeInTheDocument();
  });
  expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument();
});
```

### 🏆 Best practices for testing

- Use `render` from `@testing-library/react` directly — no wrapper needed.
- Use `waitFor` to assert on the state after the SVG has loaded.
- To simulate loading or failure of an SVG, mock `fetch` in your tests (e.g. with `vi.fn()` or [`msw`](https://mswjs.io/)).

For more examples, see the package’s test files.