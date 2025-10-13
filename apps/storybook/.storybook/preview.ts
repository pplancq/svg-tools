import type { Preview } from '@storybook/react-vite';
import { light } from './theme';

import '@pplancq/shelter-ui-css/css/shelter-ui.css';

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    docs: {
      theme: light,
      toc: {
        title: 'On this page',
        headingSelector: 'h2, h3',
      },
      codePanel: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Welcome', 'svg-react', ['Getting Started', 'ChangeLog'], 'svg-core', ['Getting Started', 'ChangeLog']],
      },
    },
  },
  tags: ['!autodocs'],
};

export default preview;
