# @pplancq/svg-tools

This repository contains a set of packages designed to asynchronously load SVG files directly into the DOM, similar to the <img> tag.\
It offers an efficient, high-performance solution for integrating SVG graphics into your web applications.

## Motivation

I created this package in response to my dissatisfaction with SVG management in my React applications. 
I used to use the SVGR library to convert my SVGs into React components, but I didn't find this approach very relevant or environmentally friendly.

In 2024, the environmental impact of our technological choices is more important than ever. 
Systematically converting SVGs to React components generates unnecessary overhead and consumes more resources, which runs counter to our efforts to reduce our carbon footprint.

So I set out to find a simpler, more environmentally-friendly solution. 
This package is the result of that search. 
It allows SVG files to be loaded asynchronously directly into the DOM, offering a lighter and greener alternative to managing SVGs in web applications.

I hope that this solution will help other developers to create more powerful and environmentally-friendly applications.

## Package Details

| Package Name                                           | Version                                                                                                      | Description                                                   |
|--------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------|
| [`@pplancq/svg-core`](./packages/svg-core/README.md)   | [![](https://img.shields.io/npm/v/%40pplancq%2Fsvg-core)](https://www.npmjs.com/package/@pplancq/svg-core)   | A functions for asynchronously loading SVG files into the DOM |
| [`@pplancq/svg-react`](./packages/svg-react/README.md) | [![](https://img.shields.io/npm/v/%40pplancq%2Fsvg-react)](https://www.npmjs.com/package/@pplancq/svg-react) | A React component designed to load SVG files efficiently      |

## Getting Started

### Install svg-react

```shell
npm install @pplancq/svg-react
```

### Use on your React application

```javascript
import { Svg } from '@pplancq/svg-react';
import mySvg from './my-svg.svg';

export const App = () => {
  return <Svg src={mySvg} alt="mySvg" fill="red" />;
}
```

## License

MIT
