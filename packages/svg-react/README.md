# @pplancq/svg-react

A React component designed to load SVG files efficiently

## Install

```shell
npm install @pplancq/svg-react
```

## Use on your React application

```javascript
import { Svg } from '@pplancq/svg-react';
import mySvg from './my-svg.svg';

export const App = () => {
  return <Svg src={mySvg} atl="mySvg" fill="red" />;
}
```

## User guide

This SVG component is designed to be as flexible and customisable as a basic SVG component.
It inherits all the props of a standard SVG component, allowing you to use it in the same way as you would a native SVG component.

### Props

| Prop name | Description                                                    | Required | Exemple value                  |
|-----------|----------------------------------------------------------------|----------|--------------------------------|
| src       | The URL or path of the SVG file to be loaded.                  | yes      | `https://my-domain/my-svg.svg` |
| alt       | An alternative text description if the SVG image fails to load |          | `my-svg`                       |
