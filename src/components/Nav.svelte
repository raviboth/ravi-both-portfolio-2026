<script lang="ts">
  import { onMount } from 'svelte';
  import { tick } from 'svelte';
  import { smoothScroll } from '../lib/actions/smoothScroll';
  import IconPillButton from './IconPillButton.svelte';

  let scrolled = $state(false);
  let menuOpen = $state(false);
  let hamburgerBtn: HTMLButtonElement | undefined = $state(undefined);
  let closeBtn: HTMLButtonElement | undefined = $state(undefined);
  let overlayEl: HTMLDivElement | undefined = $state(undefined);

  function handleScroll() {
    scrolled = window.scrollY > 50;
  }

  async function openMenu() {
    menuOpen = true;
    document.body.style.overflow = 'hidden';
    await tick();
    closeBtn?.focus();
  }

  function closeMenu() {
    menuOpen = false;
    document.body.style.overflow = '';
    hamburgerBtn?.focus();
  }

  function handleOverlayKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      closeMenu();
      return;
    }

    // Focus trap
    if (e.key === 'Tab' && overlayEl) {
      const focusable = overlayEl.querySelectorAll<HTMLElement>(
        'button, a[href]'
      );
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

  onMount(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
    };
  });
</script>

<nav class="nav" class:scrolled aria-label="Main navigation" use:smoothScroll>
  <div class="nav-inner">
    <!-- Logo -->
    <a href="#hero" class="logo">Ravi Both</a>

    <!-- Desktop center links -->
    <div class="nav-links">
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
    </div>

    <!-- Desktop email button -->
    <a href="mailto:ravi@raviboth.com" class="email-button">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M2 4h14a2 2 0 012 2v8a2 2 0 01-2 2H2a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="m2 6 7 5 7-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <span>ravi@raviboth.com</span>
    </a>

    <!-- Mobile hamburger button -->
    <button
      class="hamburger"
      bind:this={hamburgerBtn}
      onclick={openMenu}
      aria-label="Open menu"
      aria-expanded={menuOpen}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <!-- Top bun -->
        <path d="M6 13c0-5 4-8 10-8s10 3 10 8H6z" fill="currentColor" opacity="0.85" />
        <!-- Lettuce -->
        <path d="M5 14c1.5 1 3-0.5 5 0.5s3 0 5-0.5 3 1 5 0.5 3-1.5 5-0.5 2 1 2 1" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" />
        <!-- Patty -->
        <rect x="5" y="17" width="22" height="4" rx="2" fill="currentColor" opacity="0.7" />
        <!-- Bottom bun -->
        <path d="M6 23h20c0 3-4 5-10 5S6 26 6 23z" fill="currentColor" opacity="0.85" />
      </svg>
    </button>
  </div>
</nav>

<!-- Mobile overlay -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
  class="overlay"
  class:open={menuOpen}
  bind:this={overlayEl}
  role="dialog"
  aria-modal={menuOpen}
  aria-label="Navigation menu"
  onkeydown={handleOverlayKeydown}
  tabindex="-1"
  use:smoothScroll
>
  <button
    class="close-btn"
    bind:this={closeBtn}
    onclick={closeMenu}
    aria-label="Close menu"
  >
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M6 6l16 16M22 6L6 22" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
    </svg>
  </button>

  <div class="overlay-links">
    <a href="#about" onclick={closeMenu}>About</a>
    <a href="#projects" onclick={closeMenu}>Projects</a>
    <a href="#contact" onclick={closeMenu}>Contact</a>
  </div>

  <div class="social-pills">
    <IconPillButton href="mailto:ravi@raviboth.com" icon="email" label="Email" />
    <IconPillButton href="https://github.com/raviboth" icon="github" label="GitHub" external />
    <IconPillButton href="https://linkedin.com/in/raviboth" icon="linkedin" label="LinkedIn" external />
    <IconPillButton href="/Both, Ravi - resume.pdf" icon="resume" label="Resume" external />
  </div>
</div>

<style>
  .nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: transparent;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }

  .nav.scrolled {
    background-color: var(--color-bg);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  }

  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px var(--space-section-x);
    gap: 40px;
  }

  .logo {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--color-text);
    text-decoration: none;
    flex-shrink: 0;
  }

  .nav-links {
    display: flex;
    gap: 40px;
    flex: 1;
    justify-content: center;
  }

  .nav-links a {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--color-primary);
    text-decoration: none;
    position: relative;
    transition: color var(--transition-base);
  }

  .nav-links a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--color-primary-dark);
    transition: width var(--transition-base);
  }

  .nav-links a:hover {
    color: var(--color-primary-dark);
  }

  .nav-links a:hover::after {
    width: 100%;
  }

  .email-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border-radius: 24px;
    background-color: var(--color-primary-dark);
    color: #ffffff;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 0.9rem;
    text-decoration: none;
    transition: background-color var(--transition-fast), transform var(--transition-fast);
    flex-shrink: 0;
  }

  .email-button:hover {
    background-color: #3a5c40;
    transform: scale(1.03);
  }

  .email-button:active {
    transform: scale(0.97);
  }

  /* Hamburger - hidden on desktop */
  .hamburger {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    color: var(--color-text);
  }

  /* Overlay */
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 200;
    background-color: var(--color-bg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 300ms ease, visibility 0s 300ms;
  }

  .overlay.open {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transition: opacity 300ms ease, visibility 0s;
  }

  .close-btn {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-text);
    padding: 0.5rem;
  }

  .overlay-links {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .overlay-links a {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-text);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .overlay-links a:hover {
    color: var(--color-primary);
  }

  .social-pills {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  /* Tablet & Mobile: < 1024px — hamburger nav */
  @media (max-width: 1023px) {
    .nav-inner {
      padding: 16px var(--space-section-x);
      gap: 20px;
    }

    .nav-links {
      display: none;
    }

    .email-button {
      display: none;
    }

    .hamburger {
      display: flex;
    }
  }

  /* Mobile: < 768px */
  @media (max-width: 767px) {
    .logo {
      font-size: 1.1rem;
    }
  }
</style>
