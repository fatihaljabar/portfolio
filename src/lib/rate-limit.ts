/**
 * In-memory sliding-window rate limiter
 * ponytail: per-process Map, resets on restart and isn't shared across
 * instances — fine for this single-instance Hostinger deployment. Upgrade
 * to a shared store (Redis/Supabase) if the app ever runs multi-instance.
 */

const buckets = new Map<string, number[]>();

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const timestamps = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);

  if (timestamps.length >= limit) {
    buckets.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  buckets.set(key, timestamps);
  return false;
}
