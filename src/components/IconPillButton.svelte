<script lang="ts">
  interface Props {
    href: string;
    label: string;
    icon: 'email' | 'github' | 'linkedin' | 'resume' | 'external';
    external?: boolean;
  }

  const { href, label, icon, external = false }: Props = $props();
</script>

<a
  {href}
  class="pill-button"
  target={external ? '_blank' : undefined}
  rel={external ? 'noopener noreferrer' : undefined}
>
  {#if icon === 'email'}
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 4h14a2 2 0 012 2v8a2 2 0 01-2 2H2a2 2 0 01-2-2V6a2 2 0 012-2z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="m2 6 7 5 7-5"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  {:else if icon === 'github'}
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9 1C4.58 1 1 4.58 1 9c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0017 9c0-4.42-3.58-8-8-8z"
        fill="currentColor"
      />
    </svg>
  {:else if icon === 'linkedin'}
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 2h14a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V4a2 2 0 012-2z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <path
        d="M6 9v4m0-8a1 1 0 100-2 1 1 0 000 2zm6 8v-2.5c0-1-.5-1.75-1.5-1.75s-1.5.75-1.5 1.75V13m6-8H6"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  {:else if icon === 'resume'}
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 2h12a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V4a2 2 0 012-2z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6 6h6M6 10h6M6 14h3"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  {:else if icon === 'external'}
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 3H3v12h12v-4M11 3h4v4M10 8l5-5"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  {/if}
  <span>{label}</span>
</a>

<style>
  .pill-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 22px;
    background-color: var(--color-primary-dark);
    border: 1.5px solid transparent;
    color: #ffffff;
    font-family: var(--font-body);
    font-size: 0.95rem;
    font-weight: 600;
    text-decoration: none;
    transition: background-color var(--transition-fast), transform var(--transition-fast);
  }

  .pill-button:hover {
    background-color: var(--color-primary);
    transform: scale(1.03);
  }

  .pill-button:active {
    transform: scale(0.97);
  }
</style>
