import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    docs: {
      toc: {
        title: 'On this page',
        headingSelector: 'h2, h3',
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Welcome'],
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
