import type { Meta, StoryObj } from '@storybook/svelte';
import About from './About.svelte';

const meta = {
  title: 'Components/About',
  component: About,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof About>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile1', isRotated: false } },
  parameters: {
    chromatic: { viewports: [375] },
  },
};

export const Tablet: Story = {
  globals: { viewport: { value: 'tablet', isRotated: false } },
  parameters: {
    chromatic: { viewports: [768] },
  },
};
