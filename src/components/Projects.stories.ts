import type { Meta, StoryObj } from '@storybook/svelte';
import { fn } from 'storybook/test';
import Projects from './Projects.svelte';
import { projects } from '../data/projects';

const meta = {
  title: 'Components/Projects',
  component: Projects,
  parameters: { layout: 'fullscreen' },
  args: { projects, onSelectProject: fn() },
} satisfies Meta<Projects>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Force the reveal by dispatching the 'reveal' custom event on the
 * Projects root <section> element. The revealOnScroll action relies on
 * IntersectionObserver which may not fire inside Storybook's iframe,
 * so we trigger it manually after mount.
 */
function forceReveal({ canvasElement }: { canvasElement: HTMLElement }) {
  const section = canvasElement.querySelector('section');
  if (section) {
    section.dispatchEvent(new CustomEvent('reveal'));
  }
}

/** Default desktop view: 3-column grid with all projects */
export const Default: Story = {
  play: forceReveal,
};

/** Mobile viewport (375px): single-column layout */
export const Mobile: Story = {
  play: forceReveal,
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    chromatic: { viewports: [375] },
  },
};

/** Tablet viewport (768px): 2-column layout */
export const Tablet: Story = {
  play: forceReveal,
  parameters: {
    viewport: { defaultViewport: 'tablet' },
    chromatic: { viewports: [768] },
  },
};
