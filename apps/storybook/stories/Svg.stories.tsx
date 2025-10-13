import appleIcon from '@pplancq/shelter-ui-icon/logo/apple-original.svg?no-inline';
import reactIcon from '@pplancq/shelter-ui-icon/logo/react-original.svg?inline';
import { Svg } from '@pplancq/svg-react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const icons: Record<string, string> = {
  'apple url': appleIcon,
  'react inline': reactIcon,
  'simulate svg error': 'foo',
};

const meta: Meta<typeof Svg> = {
  title: 'svg-react/Getting Started',
  component: Svg,
  parameters: {
    controls: { expanded: true },
  },
  args: {
    src: 'apple url',
    alt: 'svg description',
    width: 48,
    height: 48,
    fill: '',
  },
  argTypes: {
    src: {
      options: Object.keys(icons),
      control: { type: 'select' },
      description: 'The source of the SVG icon. It can be a URL or an inline SVG string.',
    },
    alt: {
      control: { type: 'text' },
      description: 'Alternative text if the SVG image cannot be loaded (accessibility).',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Svg>;

export const Playground: Story = {
  render: ({ src, ...args }) => <Svg src={icons[src]} {...args} />,
  tags: ['!dev'],
};
