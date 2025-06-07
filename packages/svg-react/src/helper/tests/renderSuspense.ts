// eslint-disable-next-line import/no-extraneous-dependencies
import { render, type RenderOptions } from '@testing-library/react';
import { act, type ReactNode } from 'react';

export const renderSuspense = (ui: ReactNode, options?: Omit<RenderOptions, 'queries'> | undefined) =>
  act(async () => {
    const { rerender, ...renderResult } = render(ui, options);
    return {
      ...renderResult,
      rerender: (el: ReactNode) => act(async () => rerender(el)),
    };
  });
