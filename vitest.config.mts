import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    test: {
      reporters: ['default', 'junit', 'vitest-sonar-reporter'],
      outputFile: {
        'vitest-sonar-reporter': 'sonar-report.xml',
        'junit': 'junit-report.xml',
      },
      poolOptions: {
        forks: {
          minForks: env.CI ? 1 : undefined,
          maxForks: env.CI ? 2 : undefined,
        },
      },
      coverage: {
        enabled: env.CI,
        reporter: ['lcov', 'json', 'html', 'text', 'cobertura'],
        provider: 'v8',
        lines: 80,
        functions: 75,
        branches: 80,
        statements: 80,
        include: ['packages/*/src/**/*.[jt]s?(x)'],
        exclude: [
          'packages/*/src/**/*.d.[jt]s?(x)',
          'packages/*/src/**/*.types.[jt]s?(x)',
          'packages/*/src/**/index.[jt]s?(x)',
        ],
      },
    },
  };
});