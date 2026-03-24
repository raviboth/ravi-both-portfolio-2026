import type { Meta, StoryObj } from '@storybook/svelte';
import About from './About.svelte';

const meta = {
  title: 'Components/About',
  component: About,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'mint',
      values: [
        { name: 'mint', value: '#f0f7f1' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
} satisfies Meta<About>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    chromatic: { viewports: [375] },
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: 'tablet' },
    chromatic: { viewports: [768] },
  },
};
