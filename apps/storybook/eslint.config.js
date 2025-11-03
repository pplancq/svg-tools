import { defineConfig } from '@pplancq/eslint-config';

export default defineConfig({
  enableReact: true,
  enablePrettier: 'on',
  extendConfig: [
    {
      files: [
        '**/*.{config,stories}.{js,jsx,ts,tsx,mjs,cjs,cts,mts}',
        '.storybook/**/*.{js,jsx,ts,tsx,mjs,cjs,cts,mts}',
      ],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'import/no-default-export': 'off',
      },
    },
    {
      ignores: ['build'],
    },
  ],
});
