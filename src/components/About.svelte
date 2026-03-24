<script lang="ts">
  import { fly } from "svelte/transition";

  let visible = $state(false);
  let reducedMotion = $state(false);

  $effect(() => {
    reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    visible = true;
  });

  const leftTransition = $derived(
    reducedMotion ? { y: 0, duration: 0 } : { y: 40, duration: 600, delay: 0 },
  );
  const rightTransition = $derived(
    reducedMotion
      ? { y: 0, duration: 0 }
      : { y: 40, duration: 600, delay: 150 },
  );
</script>

<section class="about" id="about">
  <span class="section-label">ABOUT</span>
  <div class="about-grid">
    {#if visible}
      <div class="about-bio" in:fly={leftTransition}>
        <h2>In a Nutshell</h2>
        <p>
          I'm a full-stack engineer with an MBA in Business Process Improvement
          and 7+ years of hands-on experience building web applications, APIs,
          and mobile products. I bridge the gap between business strategy and
          technical execution — from discovery and planning through
          architecture, implementation, and delivery.
        </p>
        <p>
          I've built booking platforms in <span class="accent">Next.js</span>, shipped mobile features in
          <span class="accent">React Native</span>, and architected microservices on <span class="accent">AWS</span>. My toolkit spans but isn't limited to
          <span class="accent">TypeScript</span>, <span class="accent">React</span>, <span class="accent">Svelte</span>, <span class="accent">Node.js</span>, <span class="accent">Python</span>, and <span class="accent">RESTful APIs</span> — backed by real testing
          discipline with <span class="accent">Cypress</span> and <span class="accent">Jest</span>, and design collaboration in <span class="accent">Figma</span>
          and <span class="accent">Storybook</span>.
        </p>
      </div>
      <div class="about-details" in:fly={rightTransition}>
        <h2>The Specs</h2>
        <div class="detail-group">
          <h3>Education</h3>
          <p>MBA, M.I.U.</p>
        </div>
        <div class="detail-group">
          <h3>Languages</h3>
          <p>English, Dutch, German</p>
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  .about {
    background-color: var(--color-mint-bg);
    padding: var(--space-section-y) var(--space-section-x);
  }

  .section-label {
    display: block;
    font-family: "DM Sans", system-ui, sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--color-text-secondary);
    margin-bottom: 12px;
  }

  h2 {
    font-family: "Playfair Display", Georgia, serif;
    font-size: 2.25rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 24px;
  }

  .about-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 48px;
    max-width: 1200px;
    margin-top: 24px;
  }

  .about-bio p {
    font-family: "DM Sans", system-ui, sans-serif;
    font-size: 1.05rem;
    line-height: 1.7;
    color: var(--color-text-secondary);
    margin-bottom: 16px;
  }

  .about-bio p:last-child {
    margin-bottom: 0;
  }

  .about-details {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .detail-group h3 {
    font-family: "Playfair Display", Georgia, serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 12px;
  }

  .detail-group p {
    font-family: "DM Sans", system-ui, sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    color: var(--color-text-secondary);
  }

  .accent {
    color: var(--color-accent-dark);
    font-weight: 600;
  }

  /* Tablet: 768px - 1023px */
  @media (max-width: 1023px) {
    .about-grid {
      gap: 36px;
    }

    h2 {
      font-size: 2rem;
    }
  }

  /* Mobile: < 768px */
  @media (max-width: 767px) {
    .about-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }

    h2 {
      font-size: 1.75rem;
      margin-bottom: 20px;
    }

  }
</style>
