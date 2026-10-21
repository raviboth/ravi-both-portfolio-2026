import type { Meta, StoryObj } from '@storybook/svelte';
import { userEvent, within } from 'storybook/test';
import Nav from './Nav.svelte';

const meta = {
  title: 'Components/Nav',
  component: Nav,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default: desktop view showing logo, center nav links, email button */
export const Default: Story = {};

/** Scrolled: desktop with scrolled state (white background + shadow) */
export const Scrolled: Story = {
  play: async ({ canvasElement }) => {
    const nav = canvasElement.querySelector('.nav');
    if (nav) {
      nav.classList.add('scrolled');
    }
  },
};

/** Mobile: 320px viewport showing hamburger icon */
export const Mobile: Story = {
  globals: { viewport: { value: 'mobile1', isRotated: false } },
  parameters: {
    chromatic: { viewports: [320] },
  },
};

/** MobileMenuOpen: 320px viewport with overlay open via play function */
export const MobileMenuOpen: Story = {
  globals: { viewport: { value: 'mobile1', isRotated: false } },
  parameters: {
    chromatic: { viewports: [320] },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const hamburger = canvas.getByLabelText('Open menu');
    await userEvent.click(hamburger);
  },
};
