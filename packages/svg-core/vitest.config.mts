import { loadEnv } from 'vite';
// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    test: {
      environment: 'jsdom',
      setupFiles: 'vitest.setup.ts',
      clearMocks: true,
      css: false,
      include: ['tests/**/*.{test,spec}.[jt]s?(x)'],
      reporters: ['default', 'junit', 'vitest-sonar-reporter'],
      outputFile: {
        'vitest-sonar-reporter': 'sonar-report.xml',
        junit: 'junit-report.xml',
      },
      maxWorkers: env.CI ? 2 : undefined,
      coverage: {
        enabled: env.CI === 'true',
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
