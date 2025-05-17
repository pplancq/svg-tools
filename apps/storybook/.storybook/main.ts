import type { StorybookConfig } from '@storybook/react-vite';

import { dirname, join } from 'path';

function getAbsolutePath<T extends string>(value: T): T {
  return dirname(require.resolve(join(value, 'package.json'))) as T;
}

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [getAbsolutePath('@storybook/addon-onboarding'), getAbsolutePath('@storybook/addon-docs')],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
};

export default config;
