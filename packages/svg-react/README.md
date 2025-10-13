# @pplancq/svg-react

A React component designed to efficiently load SVG files into your web applications,
while following best practices for performance, accessibility, and eco-design.

## ✨ What’s new & Migrating from v1 to v2

- **React 19 only**: Version 2 no longer supports React 18. Please ensure you are using React 19 before upgrading.
- **New use() API**: The `Svg` component now leverages React 19's new `use()` API, simplifying asynchronous logic and SVG loading. Your existing code may require minor adjustments to align with this approach.
- **No major interface changes**: The component API remains similar, but the internal implementation benefits from the latest React features.

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
  </tbody>
</table>

### ✅ Best Practices

- Use the `alt` prop to improve accessibility.
- Prefer asynchronous loading for large or non-critical SVGs.
- Customize your SVGs via props (`fill`, `width`, `height`, etc.) for optimal integration.
- You can also style your SVGs by applying CSS classes (`className`) to manage styles centrally.

### 🛠️ Use Cases

- Dynamic or themed icons.
- Remote or local SVG illustrations.
- Eco-friendly replacement for SVG imports transformed into React components.

## 🧑‍🔬 Tests

### 🌀 Testing components using Suspense

When testing React components, the `render` function from Testing Library natively wraps updates in `act()` to help ensure correct behavior. However, when your components use `Suspense` for asynchronous loading (such as fetching SVGs), this is sometimes not sufficient: certain asynchronous updates triggered by Suspense may still escape this wrapping, leading to unstable tests or React warnings.

To make writing robust tests easier, this package provides a `renderSuspense` helper that automatically wraps rendering in an asynchronous `act()`. This allows you to easily test your components, even when they use `Suspense` or asynchronous hooks.

#### 💡 Why use `renderSuspense`?

- Ensures all asynchronous effects and rendering are properly synchronized.
- Avoids React warnings related to Suspense usage in tests.
- Simplifies your test syntax for asynchronous components.

### 📝 Example usage with a custom component

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

To test this component, use the `renderSuspense` helper:

```tsx
import { renderSuspense } from '@pplancq/svg-react/tests';
import { screen, waitFor } from '@testing-library/react';
import { IconButton } from './IconButton';

it('should render the button with its SVG icon', async () => {
  await renderSuspense(<IconButton />);
  await waitFor(() => {
    expect(screen.getByAltText('button icon')).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument();
  });
});
```

> ℹ️ You can use `renderSuspense` just like `render`, but it handles the subtleties related to Suspense and asynchronous effects for you.

### 🏆 Best practices for testing

- Always use `renderSuspense` to test components that use `<Svg />` or any other Suspense-based component.
- Combine it with standard Testing Library utilities (`screen`, `waitFor`, etc.) to check the final render.
- To simulate loading or failure of an SVG, you can mock `fetch` in your tests (for example with `vi.fn()` or by using a solution like [`msw`](https://mswjs.io/) for more advanced mocks).

For more examples, see the package's test files.