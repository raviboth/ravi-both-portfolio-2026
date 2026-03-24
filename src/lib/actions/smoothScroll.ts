/**
 * Svelte action that intercepts clicks on anchor links (href="#...")
 * and smoothly scrolls to the target element using requestAnimationFrame
 * with ease-out-cubic easing over 800ms.
 *
 * Respects prefers-reduced-motion: falls back to scrollIntoView().
 * Dynamically reads nav height for offset compensation.
 * Cancels in-flight scrolls when a new scroll begins.
 *
 * Usage: <nav use:smoothScroll>...</nav>
 */

const DURATION = 800;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getNavHeight(): number {
  const nav = document.querySelector('nav');
  return nav ? nav.getBoundingClientRect().height : 0;
}

export function smoothScroll(node: HTMLElement) {
  let animationId: number | null = null;

  function cancelScroll() {
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  function scrollToTarget(targetEl: HTMLElement) {
    cancelScroll();

    const navHeight = getNavHeight();

    if (prefersReducedMotion()) {
      targetEl.scrollIntoView();
      // Adjust for nav offset after instant scroll
      window.scrollBy(0, -navHeight);
      return;
    }

    const startY = window.scrollY;
    const targetRect = targetEl.getBoundingClientRect();
    const targetY = startY + targetRect.top - navHeight;
    const distance = targetY - startY;

    if (Math.abs(distance) < 1) return;

    const startTime = performance.now();

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      const easedProgress = easeOutCubic(progress);

      window.scrollTo(0, startY + distance * easedProgress);

      if (progress < 1) {
        animationId = requestAnimationFrame(step);
      } else {
        animationId = null;
      }
    }

    animationId = requestAnimationFrame(step);
  }

  function handleClick(e: Event) {
    const mouseEvent = e as MouseEvent;
    const link = (mouseEvent.target as HTMLElement).closest('a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    const targetId = href.slice(1);
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    e.preventDefault();

    // Update URL hash without triggering default scroll
    history.pushState(null, '', href);

    scrollToTarget(targetEl);
  }

  node.addEventListener('click', handleClick);

  // Cancel scroll on user-initiated scroll (wheel, touch, keyboard)
  function handleUserScroll() {
    cancelScroll();
  }

  window.addEventListener('wheel', handleUserScroll, { passive: true });
  window.addEventListener('touchmove', handleUserScroll, { passive: true });

  return {
    destroy() {
      cancelScroll();
      node.removeEventListener('click', handleClick);
      window.removeEventListener('wheel', handleUserScroll);
      window.removeEventListener('touchmove', handleUserScroll);
    },
  };
}
