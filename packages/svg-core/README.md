# @pplancq/svg-core

A functions for asynchronously loading SVG files into the DOM

## Install

```shell
npm install @pplancq/svg-core
```

## Use on your application

```javascript
import { getSvg } from '@pplancq/svg-core';

const svg = getSvg('https://my-domain/my-svg.svg');

document.body.appendChild(svg);
```