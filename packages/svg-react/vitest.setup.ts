/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { version } from 'react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});

console.info(`vitest has been loaded with react v${version}`);
