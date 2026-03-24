import type { Meta, StoryObj } from '@storybook/svelte';
import { userEvent, within } from 'storybook/test';
import Nav from './Nav.svelte';

const meta = {
  title: 'Components/Nav',
  component: Nav,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<Nav>;

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

/** Mobile: 375px viewport showing hamburger icon */
export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    chromatic: { viewports: [375] },
  },
};

/** MobileMenuOpen: 375px viewport with overlay open via play function */
export const MobileMenuOpen: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    chromatic: { viewports: [375] },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const hamburger = canvas.getByLabelText('Open menu');
    await userEvent.click(hamburger);
  },
};
