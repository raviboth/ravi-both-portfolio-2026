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
  decorators: [() => ({ Component: ProjectCardDecorator })],
} satisfies Meta<typeof ProjectCard>;

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

/** LongTechList: the project with the most tech tags, to demonstrate wrapping */
const longestTechProject = projects.reduce((a, b) => (b.tech.length > a.tech.length ? b : a));

export const LongTechList: Story = {
  args: { project: longestTechProject, index: 0 },
};

/** Mobile: 375px viewport */
export const Mobile: Story = {
  args: { project: projects[0], index: 0 },
  globals: { viewport: { value: 'mobile1', isRotated: false } },
  parameters: {
    chromatic: { viewports: [375] },
  },
};
