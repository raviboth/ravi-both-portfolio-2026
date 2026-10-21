import { afterEach, describe, expect, it, vi } from 'vitest';
import { reveal } from './reveal';

function mockReducedMotion(reduce: boolean) {
  vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: reduce } as MediaQueryList);
}

describe('reveal', () => {
  afterEach(() => vi.restoreAllMocks());

  it('passes the params through to fly', () => {
    mockReducedMotion(false);
    const config = reveal(document.createElement('div'), { y: 40, duration: 600, delay: 150 });
    expect(config.duration).toBe(600);
    expect(config.delay).toBe(150);
  });

  it('drops the motion when reduced motion is on', () => {
    mockReducedMotion(true);
    const config = reveal(document.createElement('div'), { y: 40, duration: 600, delay: 150 });
    expect(config.duration).toBe(0);
    expect(config.delay).toBe(0);
  });
});
