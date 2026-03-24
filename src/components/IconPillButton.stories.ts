import type { Meta, StoryObj } from '@storybook/svelte';
import IconPillButton from './IconPillButton.svelte';

const meta = {
  title: 'Components/IconPillButton',
  component: IconPillButton,
  parameters: { layout: 'centered' },
} satisfies Meta<IconPillButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Email: Story = {
  args: { href: 'mailto:ravi@raviboth.com', label: 'Email', icon: 'email' },
};

export const GitHub: Story = {
  args: { href: 'https://github.com/raviboth', label: 'GitHub', icon: 'github', external: true },
};

export const LinkedIn: Story = {
  args: { href: 'https://linkedin.com/in/raviboth', label: 'LinkedIn', icon: 'linkedin', external: true },
};

export const Resume: Story = {
  args: { href: 'https://raviboth.com/Both, Ravi - resume.pdf', label: 'Resume', icon: 'resume', external: true },
};
