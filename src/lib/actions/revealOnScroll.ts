/**
 * Svelte action that uses IntersectionObserver to detect when an element
 * first enters the viewport, then calls the provided callback
 * and disconnects the observer.
 *
 * Usage:
 *   <div use:revealOnScroll={() => visible = true}>
 */
export function revealOnScroll(
  node: HTMLElement,
  callback?: (() => void) | { threshold?: number; rootMargin?: string }
) {
  // Support both callback shorthand and options object
  let onReveal: (() => void) | undefined;
  let threshold = 0.15;
  let rootMargin = '0px 0px -50px 0px';

  if (typeof callback === 'function') {
    onReveal = callback;
  } else if (callback) {
    threshold = callback.threshold ?? threshold;
    rootMargin = callback.rootMargin ?? rootMargin;
  }

  function reveal() {
    node.dispatchEvent(new CustomEvent('reveal'));
    onReveal?.();
  }

  // If the user prefers reduced motion, reveal immediately
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    reveal();
    return { destroy() {} };
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
          break;
        }
      }
    },
    { threshold, rootMargin }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    },
  };
}
