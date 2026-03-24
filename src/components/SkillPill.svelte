<script lang="ts">
  let { label }: { label: string } = $props();
</script>

<span class="skill-pill">{label}</span>

<style>
  .skill-pill {
    display: inline-block;
    background-color: #ffffff;
    border-radius: var(--radius-pill);
    padding: 5px 12px;
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--color-text);
  }
</style>
