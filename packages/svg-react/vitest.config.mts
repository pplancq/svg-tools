/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// eslint-disable-next-line import/no-default-export
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), viteTsconfigPaths(), svgr()],
    test: {
      environment: 'jsdom',
      setupFiles: 'vitest.setup.ts',
      clearMocks: true,
      css: false,
      include: ['tests/**/*.{test,spec}.[jt]s?(x)'],
      reporters: ['basic', 'junit', 'vitest-sonar-reporter'],
      outputFile: {
        'vitest-sonar-reporter': 'sonar-report.xml',
        junit: 'junit-report.xml',
      },
      poolOptions: {
        threads: {
          minThreads: env.CI ? 1 : undefined,
          maxThreads: env.CI ? 2 : undefined,
        },
      },
      coverage: {
        reporter: ['lcov', 'json', 'html', 'text', 'cobertura'],
        provider: 'v8',
        lines: 80,
        functions: 75,
        branches: 80,
        statements: 80,
        include: ['src/**/*.[jt]s?(x)'],
        exclude: ['src/**/*.d.[jt]s?(x)', 'src/**/*.types.[jt]s?(x)', 'src/**/index.[jt]s?(x)'],
      },
    },
  };
});
