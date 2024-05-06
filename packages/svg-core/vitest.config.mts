import { resolve } from 'path'
import { loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [viteTsconfigPaths(), svgr()],
    test: {
      setupFiles: resolve(__dirname, './vitest.setup.ts'),
      clearMocks: true,
      css: false,
      include: [resolve(__dirname, './tests/**/*.(spec|test).[jt]s?(x)')],
      reporters: ['basic', 'junit', 'vitest-sonar-reporter'],
      outputFile: {
        'vitest-sonar-reporter': 'sonar-report.xml',
        'junit': 'junit-report.xml',
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
        include: ['packages/*/ests/**/*.[jt]s?(x)'],
        exclude: [
          'packages/*/src/**/*.d.[jt]s?(x)',
          'packages/*/src/**/*.types.[jt]s?(x)',
          'packages/*/src/**/index.[jt]s?(x)',
        ],
      },
    },
  };
});