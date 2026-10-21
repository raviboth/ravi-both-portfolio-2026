<script lang="ts">
  import { onMount } from 'svelte';
  import { currentTheme, setTheme, type Theme } from '../lib/theme';

  let theme = $state<Theme>('light');

  onMount(() => {
    theme = currentTheme();
    // The inline script in Layout.astro also switches theme when the OS setting
    // changes, so follow the attribute instead of keeping a separate copy.
    const observer = new MutationObserver(() => (theme = currentTheme()));
    observer.observe(document.documentElement, { attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  });

  function toggle() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }
</script>

<button
  type="button"
  class="theme-toggle"
  onclick={toggle}
  aria-label="Dark theme"
  aria-pressed={theme === 'dark'}
>
  <!-- Both icons render; CSS picks one from data-theme, so there is no flash before hydration -->
  <svg class="icon-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linejoin="round"
    />
  </svg>
  <svg class="icon-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2" />
    <path
      d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
</button>

<style>
  .theme-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: none;
    color: var(--color-text);
    cursor: pointer;
    transition: background-color var(--transition-fast);
  }

  .theme-toggle:hover {
    background-color: var(--color-hover-tint);
  }

  .icon-sun {
    display: none;
  }

  :global([data-theme='dark']) .icon-moon {
    display: none;
  }

  :global([data-theme='dark']) .icon-sun {
    display: block;
  }
</style>
