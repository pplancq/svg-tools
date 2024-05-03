import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  './packages/svg-core/vitest.config.mts',
  './packages/svg-react/vitest.config.mts',
]);
