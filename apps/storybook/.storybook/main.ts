import { mergeRsbuildConfig } from '@rsbuild/core';
import { createRequire } from 'node:module';

import { dirname, join } from 'path';
import remarkGfm from 'remark-gfm';
import type { StorybookConfig } from 'storybook-react-rsbuild';

const require = createRequire(import.meta.url);

function getAbsolutePath<T extends string>(value: T): T {
  return dirname(require.resolve(join(value, 'package.json'))) as T;
}

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    {
      name: getAbsolutePath('@storybook/addon-docs'),
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-links'),
  ],
  core: {
    disableTelemetry: true,
  },
  framework: 'storybook-react-rsbuild',
  rsbuildFinal: rsbuildConfig => {
    return mergeRsbuildConfig(rsbuildConfig, {});
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
