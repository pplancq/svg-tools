import { defineConfig } from '@pplancq/eslint-config';

export default defineConfig({
  enableVitest: true,
  enablePrettier: 'on',
  extendConfig: [
    {
      files: ['*.config.ts', '*.config.mts'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'import/no-default-export': 'off',
      },
    },
  ],
});
