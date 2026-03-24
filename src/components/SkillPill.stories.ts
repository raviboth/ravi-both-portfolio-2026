import type { Meta, StoryObj } from '@storybook/svelte';
import SkillPill from './SkillPill.svelte';

const meta = {
  title: 'Components/SkillPill',
  component: SkillPill,
  parameters: { layout: 'centered' },
} satisfies Meta<SkillPill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'React' },
};

export const LongLabel: Story = {
  args: { label: 'React Native' },
};
