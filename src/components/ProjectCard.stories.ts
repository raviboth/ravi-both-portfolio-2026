import type { Meta, StoryObj } from '@storybook/svelte';
import { fn } from 'storybook/test';
import ProjectCard from './ProjectCard.svelte';
import ProjectCardDecorator from './ProjectCardDecorator.svelte';
import { projects } from '../data/projects';

const meta = {
  title: 'Components/ProjectCard',
  component: ProjectCard,
  parameters: { layout: 'centered' },
  args: { onSelect: fn() },
  decorators: [() => ProjectCardDecorator],
} satisfies Meta<ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default: first project, even index (primary thumbnail color) */
export const Default: Story = {
  args: { project: projects[0], index: 0 },
};

/** OddIndex: second project, odd index (accent-light thumbnail color) */
export const OddIndex: Story = {
  args: { project: projects[1], index: 1 },
};

/** LongTechList: raviboth-com has 8 tech tags to demonstrate wrapping */
export const LongTechList: Story = {
  args: { project: projects[7], index: 0 },
};

/** Mobile: 375px viewport */
export const Mobile: Story = {
  args: { project: projects[0], index: 0 },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    chromatic: { viewports: [375] },
  },
};
