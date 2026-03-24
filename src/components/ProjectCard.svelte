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

<style>
  .card {
    display: block;
    width: 100%;
    background: var(--color-card-bg);
    border: none;
    padding: 0;
    margin: 0;
    text-align: left;
    font: inherit;
    color: inherit;
    cursor: pointer;
    border-radius: var(--radius-card);
    overflow: hidden;
    transition: transform var(--transition-base), box-shadow var(--transition-base);
    box-shadow: var(--shadow-card);
  }

  .card:hover {
    transform: translateY(var(--hover-lift));
    box-shadow: var(--hover-shadow);
  }

  .card:active {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  .card:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  .card-thumbnail {
    height: 200px;
    overflow: hidden;
  }

  .card-thumbnail--initials {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-thumbnail-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }

  .card-initials {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 48px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1;
    user-select: none;
  }

  .card-body {
    padding: 20px;
  }

  .card-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 18px;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 8px;
  }

  .card-desc {
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: var(--color-text-secondary);
    margin-bottom: 16px;
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tag {
    display: inline-block;
    background-color: var(--color-tag-on-white);
    border-radius: var(--radius-pill);
    padding: 4px 12px;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text);
  }

  @media (max-width: 767px) {
    .card-thumbnail {
      height: 160px;
    }
  }
</style>
