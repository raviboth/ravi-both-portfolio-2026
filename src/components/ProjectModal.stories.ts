import type { Meta, StoryObj } from '@storybook/svelte';
import ProjectModal from './ProjectModal.svelte';
import { activeProject } from '../stores/modal';

const meta = {
  title: 'Components/ProjectModal',
  component: ProjectModal,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<ProjectModal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Fully populated project with a single image. */
const defaultProject = {
  title: 'NextGen Purusha',
  role: 'Designer & Developer',
  description: 'Meditation focused site built to design specifications with SquareSpace.',
  longDesc:
    "Meditation focused site built to design specifications with SquareSpace for client convenience. Designed and developed the full site layout, imagery, and content structure to match the client's vision for a calming, accessible online presence.",
  contributions: ['UI Design', 'Site Development', 'Client Collaboration'],
  tech: ['HTML/CSS', 'JavaScript', 'Photoshop', 'SquareSpace'],
  images: ['/projects/nextgen-purusha/1.webp'],
  liveUrl: 'https://www.nextgenpurusha.com',
  githubUrl: 'https://github.com/example/nextgen-purusha',
};

/** Project with 4 images to exercise gallery navigation and thumbnail strip. */
const multiImageProject = {
  title: 'Raviboth.com',
  role: 'Designer & Developer',
  description: 'This portfolio site.',
  longDesc:
    'This portfolio site. Designed in Figma and built with React, featuring project showcases, responsive layout, and integration with external APIs for dynamic content.',
  contributions: [
    'UI/UX Design',
    'Front-End Development',
    'API Integration',
    'Deployment',
  ],
  tech: ['HTML/CSS', 'SASS', 'React', 'Figma', 'Git', 'APIs', 'Photoshop', 'Illustrator'],
  images: [
    '/projects/raviboth-com/1.webp',
    '/projects/nextgen-purusha/1.webp',
    '/projects/walker-pewter/1.webp',
    '/projects/drum-machine/1.webp',
  ],
  liveUrl: 'https://raviboth.com',
  githubUrl: 'https://github.com/raviboth/raviboth-com',
};

/** Project with no images to verify full-width content panel. */
const noImagesProject = {
  title: 'Sutherland',
  role: 'Front-End Developer',
  description: 'Business card generator site for hospital.',
  longDesc:
    'Business card generator site for hospital that creates orders and bills as well as creates PDFs of the business cards. Collaborative effort with two other developers. Contribution focused on setup and layout.',
  contributions: ['Project Setup', 'Layout Development', 'Team Collaboration'],
  tech: ['HTML/CSS', 'jQuery', 'Git', 'PHP', 'Photoshop'],
  images: [],
};

/**
 * Set the activeProject store so the modal opens, then clean it up
 * on story teardown to prevent state leaking between stories.
 */
function openModal(project: typeof defaultProject) {
  return ({ canvasElement }: { canvasElement: HTMLElement }) => {
    activeProject.set(project);

    // Return a cleanup function that resets the store when the story unmounts
    return () => {
      activeProject.set(null);
    };
  };
}

/** Default: open modal with a fully populated project (single image) */
export const Default: Story = {
  play: openModal(defaultProject),
};

/** WithMultipleImages: 4 images showing gallery arrows and thumbnail strip */
export const WithMultipleImages: Story = {
  play: openModal(multiImageProject),
};

/** NoImages: empty images array triggers full-width content panel */
export const NoImages: Story = {
  play: openModal(noImagesProject),
};

/** Mobile: 375px viewport showing full-screen column layout */
export const Mobile: Story = {
  play: openModal(defaultProject),
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    chromatic: { viewports: [375] },
  },
};
