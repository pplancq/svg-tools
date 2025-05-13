import { defineConfig } from '@rslib/core';

export default defineConfig({
  plugins: [],
  source: {
    tsconfigPath: './tsconfig.build.json',
    entry: {
      index: ['./src/**'],
    },
  },
  lib: [
    {
      bundle: false,
      dts: true,
      format: 'esm',
    },
  ],
  output: {
    target: 'web',
    distPath: {
      root: 'build',
    },
  },
});
