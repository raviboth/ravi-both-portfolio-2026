import type { Meta, StoryObj } from '@storybook/svelte';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import ThemeToggle from './ThemeToggle.svelte';
import { THEME_STORAGE_KEY } from '../lib/theme';

const meta = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  parameters: { layout: 'centered' },
  // Start each story light with nothing stored, and put things back afterwards.
  beforeEach: () => {
    const root = document.documentElement;
    const previousTheme = root.dataset.theme;
    const previousStored = localStorage.getItem(THEME_STORAGE_KEY);
    root.dataset.theme = 'light';
    localStorage.removeItem(THEME_STORAGE_KEY);
    return () => {
      if (previousTheme) root.dataset.theme = previousTheme;
      else delete root.dataset.theme;
      if (previousStored) localStorage.setItem(THEME_STORAGE_KEY, previousStored);
      else localStorage.removeItem(THEME_STORAGE_KEY);
    };
  },
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Toggles to dark and back, and stores the choice. */
export const Toggles: Story = {
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
