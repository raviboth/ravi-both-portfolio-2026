<script lang="ts">
  import type { Project } from '../data/projects';

  interface Props {
    project: Project;
    index: number;
    onSelect: (project: Project) => void;
  }

  let { project, index, onSelect }: Props = $props();

  let initials = $derived(
    project.title
      .split(/\s+/)
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  );

  let thumbnailColor = $derived(
    index % 2 === 0 ? 'var(--color-primary)' : 'var(--color-accent-light)'
  );
</script>

<button class="card" onclick={() => onSelect(project)}>
  {#if project.images.length > 0}
    <div class="card-thumbnail">
      <img src={project.images[0]} alt={project.title} class="card-thumbnail-img" />
    </div>
  {:else}
    <div class="card-thumbnail card-thumbnail--initials" style:background-color={thumbnailColor}>
      <span class="card-initials">{initials}</span>
    </div>
  {/if}
  <div class="card-body">
    <h3 class="card-title">{project.title}</h3>
    <p class="card-desc">{project.shortDesc}</p>
    <div class="card-tags">
      {#each project.tech as tag}
        <span class="tag">{tag}</span>
      {/each}
    </div>
  </div>
</button>

<!-- Styles are in global.css because Svelte child component styles
     are not extracted into the static CSS bundle when rendered
     inside client-hydrated parent components (Projects.svelte). -->
