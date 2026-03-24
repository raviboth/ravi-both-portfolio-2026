import type { Meta, StoryObj } from '@storybook/svelte';
import Hero from './Hero.svelte';

const meta = {
  title: 'Components/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'warm-white',
      values: [
        { name: 'warm-white', value: '#faf9f6' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
} satisfies Meta<Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Force the reveal by dispatching the 'reveal' custom event on the
 * Hero's root <section> element. The revealOnScroll action relies on
 * IntersectionObserver which may not fire inside Storybook's iframe,
 * so we trigger it manually after mount.
 */
function forceReveal({ canvasElement }: { canvasElement: HTMLElement }) {
  const section = canvasElement.querySelector('section');
  if (section) {
    section.dispatchEvent(new CustomEvent('reveal'));
  }
}

/** Default desktop view: two-column layout with content left, portrait right */
export const Default: Story = {
  play: forceReveal,
};

/** Mobile viewport (375px): single-column stacked layout, portrait on top */
export const Mobile: Story = {
  play: forceReveal,
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    chromatic: { viewports: [375] },
  },
};

/** Tablet viewport (768px): two-column layout with tighter spacing */
export const Tablet: Story = {
  play: forceReveal,
  parameters: {
    viewport: { defaultViewport: 'tablet' },
    chromatic: { viewports: [768] },
  },
};
