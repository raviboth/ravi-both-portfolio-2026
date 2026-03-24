<script lang="ts">
  import { onMount } from 'svelte';
  import { tick } from 'svelte';
  import { activeProject, type Project } from '../stores/modal';

  let isOpen = $state(false);
  let currentIndex = $state(0);
  let imageLoaded = $state(false);
  let touchStartX = $state(0);
  let project: Project | null = $state(null);

  let closeBtnEl: HTMLButtonElement | undefined = $state(undefined);
  let modalContainerEl: HTMLDivElement | undefined = $state(undefined);
  let triggerElement: HTMLElement | null = null;

  // Subscribe to store
  const unsubscribe = activeProject.subscribe((value) => {
    project = value;
  });

  // React to project changes
  $effect(() => {
    const wasOpen = isOpen;
    isOpen = project !== null;

    if (isOpen && !wasOpen) {
      // Opening
      currentIndex = 0;
      imageLoaded = false;
      triggerElement = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';
      tick().then(() => {
        closeBtnEl?.focus();
      });
    } else if (!isOpen && wasOpen) {
      // Closing
      document.body.style.overflow = '';
      triggerElement?.focus();
      triggerElement = null;
    }
  });

  // Preload adjacent images
  $effect(() => {
    if (project && isOpen) {
      const images = project.images;
      if (currentIndex + 1 < images.length) {
        const next = new Image();
        next.src = images[currentIndex + 1];
      }
      if (currentIndex - 1 >= 0) {
        const prev = new Image();
        prev.src = images[currentIndex - 1];
      }
    }
  });

  function closeModal() {
    activeProject.set(null);
  }

  function prevImage() {
    if (currentIndex > 0) {
      currentIndex--;
      imageLoaded = false;
    }
  }

  function nextImage() {
    if (project && currentIndex < project.images.length - 1) {
      currentIndex++;
      imageLoaded = false;
    }
  }

  function goToImage(i: number) {
    currentIndex = i;
    imageLoaded = false;
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!isOpen) return;

    if (e.key === 'Escape') {
      closeModal();
      return;
    }
    if (e.key === 'ArrowLeft') {
      prevImage();
      return;
    }
    if (e.key === 'ArrowRight') {
      nextImage();
      return;
    }

    // Focus trap
    if (e.key === 'Tab' && modalContainerEl) {
      const focusable = modalContainerEl.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex="0"]'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function handleTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0].clientX;
  }

  function handleTouchEnd(e: TouchEvent) {
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (deltaX > 50) {
      prevImage();
    } else if (deltaX < -50) {
      nextImage();
    }
  }

  function handleImageLoad() {
    imageLoaded = true;
  }

  onMount(() => {
    return () => {
      unsubscribe();
      document.body.style.overflow = '';
    };
  });

  let totalImages = $derived(project?.images?.length ?? 0);
  let hasMultipleImages = $derived(totalImages > 1);
  let hasImages = $derived(totalImages > 0);
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
  class="modal-backdrop"
  class:open={isOpen}
  role="dialog"
  aria-modal="true"
  aria-label={project ? `${project.title} project details` : 'Project details'}
  onclick={handleBackdropClick}
  onkeydown={handleKeydown}
  tabindex="-1"
>
  <div
    class="modal-container"
    class:full-width={!hasImages}
    bind:this={modalContainerEl}
    onclick={(e) => e.stopPropagation()}
    onkeydown={() => {}}
  >
    <!-- LEFT: Gallery Panel (dark) -->
    {#if hasImages}
      <div class="gallery-panel">
        <div
          class="main-image-container"
          ontouchstart={handleTouchStart}
          ontouchend={handleTouchEnd}
          role="presentation"
        >
          <img
            class="main-image"
            class:loaded={imageLoaded}
            src={project?.images[currentIndex]}
            alt={project ? `${project.title} screenshot ${currentIndex + 1}` : ''}
            onload={handleImageLoad}
          />
          <div class="image-placeholder" class:hidden={imageLoaded}></div>
        </div>

        {#if hasMultipleImages}
          <button
            class="arrow arrow-prev"
            onclick={prevImage}
            aria-label="Previous image"
            disabled={currentIndex === 0}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M13 4l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button
            class="arrow arrow-next"
            onclick={nextImage}
            aria-label="Next image"
            disabled={currentIndex === totalImages - 1}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M7 4l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <div class="gallery-footer">
            <span class="counter">{currentIndex + 1} / {totalImages}</span>
            <div class="thumbnail-strip" role="tablist">
              {#each project?.images ?? [] as thumb, i}
                <button
                  class="thumbnail"
                  class:active={i === currentIndex}
                  role="tab"
                  aria-selected={i === currentIndex}
                  aria-label={`View image ${i + 1}`}
                  onclick={() => goToImage(i)}
                >
                  <img src={thumb} alt="" loading="lazy" />
                </button>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    {/if}

    <!-- RIGHT: Content Panel (white) -->
    <div class="content-panel">
      <div class="content-header">
        <h2 class="project-title">{project?.title ?? ''}</h2>
        <button
          class="close-btn"
          bind:this={closeBtnEl}
          onclick={closeModal}
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </div>
      <p class="project-role">Role: {project?.role ?? ''}</p>
      <div class="accent-divider"></div>
      <p class="project-desc">{project?.longDesc ?? ''}</p>

      {#if project?.contributions?.length}
        <h3 class="contributions-heading">Key Contributions</h3>
        <ul class="contributions-list">
          {#each project.contributions as item}
            <li>{item}</li>
          {/each}
        </ul>
      {/if}

      {#if project?.tech?.length}
        <div class="tech-tags">
          {#each project.tech as tag}
            <span class="tech-tag">{tag}</span>
          {/each}
        </div>
      {/if}

      <div class="action-buttons">
        {#if project?.liveUrl}
          <a class="btn btn-primary" href={project.liveUrl} target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 2H2v12h12v-4M10 2h4v4M9 7l5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            View Live Site
          </a>
        {/if}
        {#if project?.githubUrl}
          <a class="btn btn-secondary" href={project.githubUrl} target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1C4.13 1 1 4.13 1 8c0 3.1 2 5.7 4.8 6.6.35.07.48-.15.48-.33 0-.17-.01-.72-.01-1.3-1.76.32-2.21-.43-2.35-.82-.08-.2-.42-.82-.72-.99-.24-.13-.6-.46-.01-.47.55-.01.95.51 1.08.72.63 1.06 1.63.76 2.04.58.06-.45.24-.76.44-.93-1.55-.18-3.18-.78-3.18-3.46 0-.76.27-1.39.72-1.88-.07-.17-.31-.89.07-1.85 0 0 .58-.18 1.92.72.56-.16 1.15-.24 1.75-.24.6 0 1.19.08 1.75.24 1.34-.91 1.92-.72 1.92-.72.38.96.14 1.68.07 1.85.44.49.72 1.11.72 1.88 0 2.69-1.63 3.28-3.19 3.46.25.22.47.64.47 1.29 0 .93-.01 1.68-.01 1.92 0 .18.13.4.48.33A7.01 7.01 0 0015 8c0-3.87-3.13-7-7-7z" fill="currentColor" />
            </svg>
            View on GitHub
          </a>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  /* Backdrop */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 200;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 300ms ease, visibility 0s linear 300ms;
  }

  .modal-backdrop.open {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transition: opacity 300ms ease, visibility 0s;
  }

  /* Container */
  .modal-container {
    display: flex;
    max-width: 1100px;
    width: 90vw;
    max-height: 85vh;
    border-radius: 16px;
    overflow: hidden;
    transform: translateY(30px);
    opacity: 0;
    transition: transform 400ms ease-out, opacity 400ms ease-out;
  }

  .modal-backdrop.open .modal-container {
    transform: translateY(0);
    opacity: 1;
  }

  .modal-container.full-width .content-panel {
    flex: 1 1 100%;
  }

  /* Gallery Panel */
  .gallery-panel {
    flex: 0 0 55%;
    background: #1a1a1a;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .main-image-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    min-height: 0;
  }

  .main-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    opacity: 0;
    transition: opacity 200ms ease;
  }

  .main-image.loaded {
    opacity: 1;
  }

  .image-placeholder {
    background: #2a2a2a;
    position: absolute;
    inset: 0;
    transition: opacity 200ms ease;
  }

  .image-placeholder.hidden {
    opacity: 0;
  }

  /* Arrow buttons */
  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.15);
    border: none;
    color: #ffffff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    transition: opacity 200ms ease;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .arrow-prev {
    left: 12px;
  }

  .arrow-next {
    right: 12px;
  }

  .gallery-panel:hover .arrow {
    opacity: 1;
  }

  .arrow:disabled {
    opacity: 0.3;
    cursor: default;
  }

  .gallery-panel:hover .arrow:disabled {
    opacity: 0.3;
  }

  /* Gallery footer */
  .gallery-footer {
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .counter {
    color: rgba(255, 255, 255, 0.7);
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 14px;
    flex-shrink: 0;
  }

  .thumbnail-strip {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    scrollbar-width: thin;
  }

  .thumbnail {
    width: 48px;
    height: 36px;
    border-radius: 4px;
    overflow: hidden;
    border: 2px solid transparent;
    cursor: pointer;
    padding: 0;
    background: none;
    flex-shrink: 0;
  }

  .thumbnail.active {
    border-color: var(--color-primary);
  }

  .thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Content Panel */
  .content-panel {
    flex: 0 0 45%;
    background: #ffffff;
    padding: 40px;
    overflow-y: auto;
    position: relative;
  }

  .content-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    color: var(--color-text-secondary, #6b7280);
    width: 32px;
    height: 32px;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 200ms ease, color 200ms ease;
    flex-shrink: 0;
  }

  .close-btn:hover {
    background: rgba(0, 0, 0, 0.05);
    color: var(--color-text, #2d2d2d);
  }

  .project-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 700;
    font-size: 28px;
    color: var(--color-text, #2d2d2d);
    margin: 0 0 8px 0;
    padding-right: 40px;
  }

  .project-role {
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 16px;
    color: var(--color-primary-dark, #3a6b4e);
    margin: 0 0 16px 0;
  }

  .accent-divider {
    width: 48px;
    height: 3px;
    background: var(--color-accent, #d4a574);
    border-radius: 2px;
    margin: 0 0 20px 0;
  }

  .project-desc {
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 15px;
    line-height: 1.6;
    color: var(--color-text, #2d2d2d);
    margin: 0 0 24px 0;
  }

  .contributions-heading {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 700;
    font-size: 18px;
    color: var(--color-text, #2d2d2d);
    margin: 0 0 12px 0;
  }

  .contributions-list {
    list-style: disc;
    padding-left: 20px;
    margin: 0 0 24px 0;
  }

  .contributions-list li {
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 14px;
    line-height: 1.6;
    color: var(--color-text, #2d2d2d);
    margin-bottom: 6px;
  }

  .tech-tags {
    margin: 0 0 24px 0;
  }

  .tech-tag {
    display: inline-block;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 13px;
    padding: 4px 12px;
    border-radius: 999px;
    background: #e8f5e9;
    color: var(--color-text, #2d2d2d);
    margin: 0 8px 8px 0;
  }

  .action-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 8px;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-weight: 600;
    font-size: 14px;
    text-decoration: none;
    transition: background var(--transition-base), transform var(--transition-fast);
  }

  .btn-primary {
    background: var(--color-primary-dark, #4a7050);
    color: #ffffff;
    border-radius: 999px;
    padding: 10px 24px;
  }

  .btn-primary:hover {
    background: #3a5c40;
    transform: scale(1.03);
  }

  .btn-primary:active {
    transform: scale(0.97);
  }

  .btn-secondary {
    background: transparent;
    color: var(--color-primary-dark, #3a6b4e);
    border: none;
    padding: 10px 0;
  }

  .btn-secondary:hover {
    text-decoration: underline;
  }

  /* Tablet: 768px - 1023px */
  @media (min-width: 768px) and (max-width: 1023px) {
    .modal-container {
      width: 95vw;
    }

    .gallery-panel {
      flex: 0 0 50%;
    }

    .content-panel {
      flex: 0 0 50%;
    }
  }

  /* Mobile: < 768px */
  @media (max-width: 767px) {
    .modal-container {
      flex-direction: column;
      width: 100vw;
      height: 100vh;
      max-width: none;
      max-height: none;
      border-radius: 0;
    }

    .gallery-panel {
      flex: 0 0 auto;
      max-height: 40vh;
      min-height: 250px;
    }

    .arrow {
      opacity: 0.8;
    }

    .thumbnail-strip {
      display: none;
    }

    .content-panel {
      flex: 1;
      padding: 24px;
      overflow-y: auto;
    }

    .close-btn {
      position: static;
    }

    .project-title {
      font-size: 22px;
      padding-right: 0;
      flex: 1;
    }

    .contributions-list li {
      font-size: 13px;
    }
  }
</style>
