<script lang="ts">
  import { fly } from 'svelte/transition';
  import { revealOnScroll } from '../lib/actions/revealOnScroll';
  import type { Project } from '../data/projects';
  import ProjectCard from './ProjectCard.svelte';
  import ProjectModal from './ProjectModal.svelte';
  import { activeProject } from '../stores/modal';

  let visible = $state(false);

  interface Props {
    projects: Project[];
    onSelectProject?: (project: Project) => void;
  }

  let { projects, onSelectProject }: Props = $props();

  function handleSelectProject(project: Project) {
    // Set the active project in the store for the modal
    activeProject.set({
      title: project.title,
      role: project.role,
      description: project.shortDesc,
      longDesc: project.longDesc,
      contributions: project.contributions,
      tech: project.tech,
      images: project.images,
      liveUrl: project.links?.find(l => l.label === 'Live Site')?.url,
      githubUrl: project.links?.find(l => l.label === 'GitHub')?.url,
    });
    // Also call the external handler if provided (useful for testing/Storybook)
    onSelectProject?.(project);
  }
</script>

<section id="projects" class="section-padding projects-section" use:revealOnScroll={() => (visible = true)}>
  {#if visible}
  <div in:fly={{ y: 20, duration: 600 }}>
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
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--color-text-secondary);
    margin-bottom: 12px;
  }

  .section-heading {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 36px;
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
      font-size: 32px;
    }
  }

  /* Mobile: < 768px */
  @media (max-width: 767px) {
    .section-heading {
      font-size: 28px;
      margin-bottom: 32px;
    }
  }
</style>
