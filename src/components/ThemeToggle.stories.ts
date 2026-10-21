import type { Meta, StoryObj } from '@storybook/svelte';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import ThemeToggle from './ThemeToggle.svelte';
import { THEME_STORAGE_KEY } from '../lib/theme';

const meta = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  parameters: { layout: 'centered' },
  // The preview decorator sets data-theme from the toolbar. Start with nothing
  // stored, and clear what the toggle leaves behind.
  beforeEach: () => {
    const previousStored = localStorage.getItem(THEME_STORAGE_KEY);
    localStorage.removeItem(THEME_STORAGE_KEY);
    return () => {
      if (previousStored) localStorage.setItem(THEME_STORAGE_KEY, previousStored);
      else localStorage.removeItem(THEME_STORAGE_KEY);
    };
  },
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Toggles to dark and back, and stores the choice. Pinned light whatever the toolbar says. */
export const Toggles: Story = {
  globals: { theme: 'light' },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button', { name: 'Dark theme' });
    const root = document.documentElement;
    await expect(button).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(button);
    await expect(root.dataset.theme).toBe('dark');
    await expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    await waitFor(() => expect(button).toHaveAttribute('aria-pressed', 'true'));

    await userEvent.click(button);
    await expect(root.dataset.theme).toBe('light');
    await expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
    await waitFor(() => expect(button).toHaveAttribute('aria-pressed', 'false'));
  },
};

/** Storybook's theme toolbar set to dark: the toggle reads the theme from the root. */
export const DarkGlobal: Story = {
  globals: { theme: 'dark' },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button', { name: 'Dark theme' });
    await expect(document.documentElement.dataset.theme).toBe('dark');
    await waitFor(() => expect(button).toHaveAttribute('aria-pressed', 'true'));
  },
};
