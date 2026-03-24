<script lang="ts">
  import { fly } from 'svelte/transition';
  import { revealOnScroll } from '../lib/actions/revealOnScroll';
  import type { Project } from '../data/projects';
  import ProjectCard from './ProjectCard.svelte';
  import ProjectModal from './ProjectModal.svelte';
  import { activeProject } from '../stores/modal';
  import { REVEAL_TRANSITION } from '../data/constants';

  let visible = $state(false);

  interface Props {
    projects: Project[];
    onSelectProject?: (project: Project) => void;
  }

  let { projects, onSelectProject }: Props = $props();

  function handleSelectProject(project: Project) {
    activeProject.set(project);
    onSelectProject?.(project);
  }
</script>

<section id="projects" class="section-padding projects-section" use:revealOnScroll={() => (visible = true)}>
  {#if visible}
  <div in:fly={REVEAL_TRANSITION}>
    <span class="section-label">PROJECTS</span>
    <h2 class="section-heading">Selected Work</h2>
    <div class="projects-grid">
      {#each projects as project, i (project.id)}
        <ProjectCard {project} index={i} onSelect={handleSelectProject} />
      {/each}
    </div>
  </div>
  {/if}
</section>

<ProjectModal />

<style>
  .projects-section {
    background-color: var(--color-bg);
    padding: var(--space-section-y) var(--space-section-x);
    min-height: 300px;
  }

  .section-label {
    display: block;
    font-family: var(--font-body);
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--color-text-secondary);
    margin-bottom: 12px;
  }

  .section-heading {
    font-family: var(--font-heading);
    font-size: 2.25rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 48px;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }

  @media (min-width: 768px) {
    .projects-grid {
      grid-template-columns: 1fr 1fr;
      gap: 28px;
    }
  }

  @media (min-width: 1024px) {
    .projects-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
    }
  }

  /* Tablet: 768px - 1023px */
  @media (max-width: 1023px) {
    .section-heading {
      font-size: 2rem;
    }
  }

  /* Mobile: < 768px */
  @media (max-width: 767px) {
    .section-heading {
      font-size: 1.75rem;
      margin-bottom: 32px;
    }
  }
</style>
