import { fly, type FlyParams } from 'svelte/transition';

/**
 * `fly` that honours `prefers-reduced-motion`. Svelte transitions run in JS,
 * so the reduced-motion block in global.css does not reach them. The query is
 * read when each intro starts, so a change mid-session applies to the next one.
 */
export function reveal(node: Element, params: FlyParams = {}) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return fly(node, reduce ? { ...params, delay: 0, duration: 0 } : params);
}
