<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<div style="max-width: 400px;">
  {@render children()}
</div>
