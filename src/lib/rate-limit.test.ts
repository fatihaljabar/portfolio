import { describe, expect, it } from 'vitest';
import { isRateLimited } from './rate-limit';

describe('isRateLimited', () => {
  it('allows requests under the limit and blocks once the limit is reached', () => {
    const key = `test:${crypto.randomUUID()}`;

    expect(isRateLimited(key, 3, 1000)).toBe(false);
    expect(isRateLimited(key, 3, 1000)).toBe(false);
    expect(isRateLimited(key, 3, 1000)).toBe(false);
    expect(isRateLimited(key, 3, 1000)).toBe(true);
  });

  it('tracks separate keys independently', () => {
    const keyA = `test:${crypto.randomUUID()}`;
    const keyB = `test:${crypto.randomUUID()}`;

    expect(isRateLimited(keyA, 1, 1000)).toBe(false);
    expect(isRateLimited(keyA, 1, 1000)).toBe(true);
    expect(isRateLimited(keyB, 1, 1000)).toBe(false);
  });
});
