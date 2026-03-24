<script lang="ts">
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { revealOnScroll } from '../lib/actions/revealOnScroll';
  import IconPillButton from './IconPillButton.svelte';
  import { CONTACT, REVEAL_TRANSITION } from '../data/constants';

  const phrases = ['Engineering craft.', 'Founder grit.', 'Systems architecture.'];
  const DISPLAY_MS = 4000;
  const EXIT_MS = 600;
  const ENTER_DELAY = 50; // brief pause between exit and enter

  let visible = $state(false);
  let currentIndex = $state(0);
  let phase: 'initial' | 'visible' | 'exiting' | 'entering' = $state('initial');
  let paused = $state(false);
  let timer: ReturnType<typeof setInterval> | undefined;
  let pendingTimeout: ReturnType<typeof setTimeout> | undefined;
  let pendingRaf: number | undefined;

  function startCycling() {
    stopCycling();
    timer = setInterval(() => {
      if (paused) return;
      phase = 'exiting';
      pendingTimeout = setTimeout(() => {
        currentIndex = (currentIndex + 1) % phrases.length;
        phase = 'entering';
        pendingRaf = requestAnimationFrame(() => {
          pendingRaf = requestAnimationFrame(() => {
            phase = 'visible';
          });
        });
      }, EXIT_MS + ENTER_DELAY);
    }, DISPLAY_MS);
  }

  function stopCycling() {
    if (timer) clearInterval(timer);
    if (pendingTimeout) clearTimeout(pendingTimeout);
    if (pendingRaf) cancelAnimationFrame(pendingRaf);
  }

  function handleMouseEnter() {
    paused = true;
  }

  function handleMouseLeave() {
    paused = false;
  }

  onMount(() => {
    // Start cycling after initial rise-up animation completes (0.6s delay + 0.8s duration)
    const startDelay = setTimeout(() => {
      phase = 'visible';
      startCycling();
    }, 1600);
    return () => {
      clearTimeout(startDelay);
      stopCycling();
    };
  });
</script>

<section class="hero" id="hero" use:revealOnScroll={() => (visible = true)}>
  {#if visible}
  <div class="hero-grid" in:fly={REVEAL_TRANSITION}>
    <!-- Left column: Headline, subtitle, buttons -->
    <div class="hero-content">
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <h1
        onmouseenter={handleMouseEnter}
        onmouseleave={handleMouseLeave}
      >
        Business thinking.<br />
        <span class="accent-wrapper">
          <span
            class="accent"
            class:initial={phase === 'initial'}
            class:exiting={phase === 'exiting'}
            class:entering={phase === 'entering'}
          >
            {phrases[currentIndex]}
          </span>
        </span>
      </h1>
      <p class="subtitle">
        MBA in Business Process Improvement. 7+ years full-stack engineering. One person, full lifecycle.
      </p>
      <div class="hero-buttons">
        <IconPillButton
          href="mailto:{CONTACT.email}"
          label="Email"
          icon="email"
        />
        <IconPillButton
          href={CONTACT.github}
          label="GitHub"
          icon="github"
          external
        />
        <IconPillButton
          href={CONTACT.linkedin}
          label="LinkedIn"
          icon="linkedin"
          external
        />
        <IconPillButton
          href={CONTACT.resume}
          label="Resume"
          icon="resume"
          external
        />
      </div>
    </div>

    <!-- Right column: Portrait with name and title -->
    <div class="hero-portrait">
      <img
        src="/avatar.jpg"
        alt="Portrait of Ravi Both"
        class="portrait-img"
        width="320"
        height="320"
      />
      <p class="portrait-name">Ravi Both</p>
      <p class="portrait-title">Full-Stack Engineer & Tech Consultant</p>
    </div>
  </div>
  {/if}
</section>

<style>
  .hero {
    padding: 100px var(--space-section-x) var(--space-section-y) var(--space-section-x);
    background-color: var(--color-bg);
    min-height: 400px;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  .hero-content h1 {
    font-family: var(--font-heading);
    font-size: 3.2rem;
    line-height: 1.15;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 20px;
  }

  .accent-wrapper {
    display: inline-block;
    overflow: hidden;
    vertical-align: bottom;
    padding-bottom: 0.15em;
  }

  .hero-content h1 .accent {
    color: var(--color-accent);
    display: inline-block;
    transform: translateY(0);
    transition: transform 0.6s ease-in-out;
  }

  /* First load: slide down from above with delay */
  .hero-content h1 .accent.initial {
    animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both;
  }

  /* Exit: slide down and out */
  .hero-content h1 .accent.exiting {
    transform: translateY(100%);
    transition: transform 0.6s ease-in-out;
  }

  /* Entering: positioned below, no transition (instant snap) */
  .hero-content h1 .accent.entering {
    transform: translateY(100%);
    transition: none;
  }

  @keyframes slide-up {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  .subtitle {
    font-family: var(--font-body);
    font-size: 1.15rem;
    line-height: 1.6;
    color: var(--color-text-secondary);
    margin-bottom: 32px;
  }

  .hero-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .hero-portrait {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .portrait-img {
    width: 320px;
    height: 320px;
    object-fit: cover;
    border-radius: 24px;
  }

  .portrait-name {
    font-family: var(--font-heading);
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--color-text);
    margin-top: 16px;
  }

  .portrait-title {
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--color-text-secondary);
    margin-top: 4px;
  }

  /* Tablet: 768px - 1023px */
  @media (max-width: 1023px) {
    .hero {
      padding: var(--space-section-y) var(--space-section-x) 60px var(--space-section-x);
    }

    .hero-grid {
      gap: 40px;
    }

    .hero-content h1 {
      font-size: 2.6rem;
    }

    .portrait-img {
      width: 260px;
      height: 260px;
    }
  }

  /* Mobile: < 768px */
  @media (max-width: 767px) {
    .hero {
      padding: 60px var(--space-section-x) 60px var(--space-section-x);
    }

    .hero-grid {
      grid-template-columns: 1fr;
    }

    .hero-portrait {
      order: -1;
    }

    .hero-content h1 {
      font-size: 2rem;
    }

    .portrait-img {
      width: 200px;
      height: 200px;
    }

    .hero-buttons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
  }
</style>
