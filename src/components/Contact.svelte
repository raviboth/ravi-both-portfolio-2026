<script lang="ts">
  import IconPillButton from './IconPillButton.svelte';
  import { CONTACT } from '../data/constants';
</script>

<section id="contact" class="contact" aria-labelledby="contact-heading" data-reveal>
  <div class="contact-inner">
    <span class="section-label">CONTACT</span>
    <h2 class="contact-heading" id="contact-heading">Let's talk</h2>
    <p class="contact-description">
      Every business deserves a tech partner who speaks both business and code.
      Let's talk about what you're building.
    </p>
    <div class="contact-buttons">
      <IconPillButton href="mailto:{CONTACT.email}" icon="email" label="Email" />
      <IconPillButton
        href={CONTACT.linkedin}
        icon="linkedin"
        label="LinkedIn"
        external={true}
      />
      <IconPillButton
        href={CONTACT.github}
        icon="github"
        label="GitHub"
        external={true}
      />
    </div>
  </div>
</section>

<style>
  .contact {
    background-color: var(--color-mint-bg);
    padding: var(--space-section-y) var(--space-section-x);
  }

  .contact-inner {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }

  .section-label {
    display: block;
    font-family: var(--font-body);
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--color-text-secondary);
    margin-bottom: 12px;
  }

  .contact-heading {
    font-family: var(--font-heading);
    font-size: 2.25rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 20px;
  }

  .contact-description {
    font-family: var(--font-body);
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--color-text-secondary);
    max-width: 560px;
    margin: 0 auto 40px auto;
  }

  .contact-buttons {
    display: flex;
    justify-content: center;
    gap: 16px;
  }

  /* Tablet */
  @media (max-width: 1023px) {
    .contact-heading {
      font-size: 2rem;
    }
  }

  /* Mobile */
  @media (max-width: 767px) {
    .contact-heading {
      font-size: 1.75rem;
    }

    .contact-buttons {
      flex-direction: column;
      align-items: stretch;
    }

    .contact-buttons :global(.pill-button) {
      width: 100%;
      justify-content: center;
    }
  }
</style>
