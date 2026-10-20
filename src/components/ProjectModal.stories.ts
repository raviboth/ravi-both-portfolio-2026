import type { Meta, StoryObj } from '@storybook/svelte';
import { expect, waitFor, within } from 'storybook/test';
import ProjectModal from './ProjectModal.svelte';
import { activeProject, type Project } from '../stores/modal';
import { projects } from '../data/projects';

const meta = {
  title: 'Components/ProjectModal',
  component: ProjectModal,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ProjectModal>;

export default meta;
type Story = StoryObj<typeof meta>;

function byId(id: string): Project {
  const project = projects.find((p) => p.id === id);
  if (!project) throw new Error(`No project with id "${id}" in src/data/projects.ts`);
  return project;
}

/** Fully populated project with a single image. */
const defaultProject = byId('nextgen-purusha');

/** Project with several images to exercise gallery navigation and thumbnail strip. */
const multiImageProject = byId('bit');

/** Project with no images to verify full-width content panel. */
const noImagesProject: Project = { ...byId('sutherland'), images: [] };

/**
 * Set the activeProject store so the modal opens, then reset it on story
 * teardown so state does not leak between stories.
 */
function openModal(project: Project) {
  return () => {
    activeProject.set(project);
    return () => {
      activeProject.set(null);
    };
  };
}

/** Wait for the open transition, then return the dialog element. */
async function openDialog(canvasElement: HTMLElement): Promise<HTMLElement> {
  // The closed backdrop is visibility: hidden, so query hidden elements too and
  // let waitFor retry until the open class lands.
  const dialog = await within(canvasElement).findByRole('dialog', { hidden: true });
  await waitFor(() => expect(dialog).toHaveClass('open'));
  return dialog;
}

/** Default: open modal with a fully populated project (single image) */
export const Default: Story = {
  beforeEach: openModal(defaultProject),
  play: async ({ canvasElement }) => {
    const dialog = await openDialog(canvasElement);
    await expect(within(dialog).getByText(defaultProject.title)).toBeVisible();
    await expect(dialog.querySelector('.gallery-panel')).not.toBeNull();
    await expect(within(dialog).queryByLabelText('Previous image')).toBeNull();
  },
};

/** WithMultipleImages: several images showing gallery arrows and thumbnail strip */
export const WithMultipleImages: Story = {
  beforeEach: openModal(multiImageProject),
  play: async ({ canvasElement }) => {
    const dialog = await openDialog(canvasElement);
    await expect(within(dialog).getByLabelText('Previous image')).toBeInTheDocument();
    await expect(within(dialog).getAllByRole('tab')).toHaveLength(multiImageProject.images.length);
  },
};

/** NoImages: empty images array triggers full-width content panel */
export const NoImages: Story = {
  beforeEach: openModal(noImagesProject),
  play: async ({ canvasElement }) => {
    const dialog = await openDialog(canvasElement);
    await expect(dialog.querySelector('.modal-container')).toHaveClass('full-width');
    await expect(dialog.querySelector('.gallery-panel')).toBeNull();
  },
};

/** Mobile: 375px viewport showing full-screen column layout */
export const Mobile: Story = {
  beforeEach: openModal(defaultProject),
  play: async ({ canvasElement }) => {
    await openDialog(canvasElement);
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    chromatic: { viewports: [375] },
  },
};
