import type { Meta, StoryObj } from '@storybook/svelte';
import Contact from './Contact.svelte';

const meta = {
  title: 'Components/Contact',
  component: Contact,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'mint',
      values: [
        { name: 'mint', value: '#f0f7f1' },
        { name: 'warm-white', value: '#faf9f6' },
      ],
    },
  },
} satisfies Meta<Contact>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Contact uses the CSS-based `data-reveal` pattern. Global CSS sets
 * `[data-reveal] { opacity: 0; transform: translateY(20px) }` and the
 * live site's Layout.astro IntersectionObserver adds `.revealed`.
 * In Storybook that observer doesn't run, so we add the class manually
 * after mount to make the content visible.
 */
function forceReveal({ canvasElement }: { canvasElement: HTMLElement }) {
  const section = canvasElement.querySelector('[data-reveal]');
  if (section) {
    section.classList.add('revealed');
  }
}

/** Default desktop view: centered section with heading and 3 contact pill buttons */
export const Default: Story = {
  play: forceReveal,
};

/** Mobile viewport (375px): buttons stack vertically, tighter spacing */
export const Mobile: Story = {
  play: forceReveal,
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    chromatic: { viewports: [375] },
  },
};

/** Tablet viewport (768px): centered layout with reduced heading size */
export const Tablet: Story = {
  play: forceReveal,
  parameters: {
    viewport: { defaultViewport: 'tablet' },
    chromatic: { viewports: [768] },
  },
};
