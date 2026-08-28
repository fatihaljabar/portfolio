import { beforeEach, describe, expect, it, vi } from 'vitest';

let mockHeaders = new Headers();
const mockCookieStore = {
  get: vi.fn<(name: string) => { value: string } | undefined>(),
  set: vi.fn(),
};

vi.mock('next/headers', () => ({
  headers: vi.fn(async () => mockHeaders),
  cookies: vi.fn(async () => mockCookieStore),
}));

import { getVisitorId } from './get-visitor-id';

describe('getVisitorId', () => {
  beforeEach(() => {
    mockHeaders = new Headers();
    mockCookieStore.get.mockReset();
    mockCookieStore.set.mockReset();
  });

  it('trusts the LAST x-forwarded-for hop, not the client-suppliable first one', async () => {
    // A single reverse proxy appends the real peer as the last entry —
    // everything before it could be forged by the client.
    mockHeaders.set('x-forwarded-for', '203.0.113.9, 198.51.100.1');

    await expect(getVisitorId()).resolves.toBe('198.51.100.1');
  });

  it('falls through to x-real-ip when x-forwarded-for is absent', async () => {
    mockHeaders.set('x-real-ip', '198.51.100.1');

    await expect(getVisitorId()).resolves.toBe('198.51.100.1');
  });

  it('rejects a non-IP value instead of storing an arbitrary string', async () => {
    mockHeaders.set('x-forwarded-for', 'not-an-ip');
    mockCookieStore.get.mockReturnValue({ value: 'cookie-fallback-id' });

    await expect(getVisitorId()).resolves.toBe('cookie-fallback-id');
  });

  it('falls back to an existing visitor cookie when no proxy headers are present', async () => {
    mockCookieStore.get.mockReturnValue({ value: 'existing-cookie-id' });

    await expect(getVisitorId()).resolves.toBe('existing-cookie-id');
    expect(mockCookieStore.set).not.toHaveBeenCalled();
  });

  it('generates and persists a new cookie when nothing else is available', async () => {
    mockCookieStore.get.mockReturnValue(undefined);

    const id = await getVisitorId();

    expect(id).toMatch(/^[0-9a-f-]{36}$/);
    expect(mockCookieStore.set).toHaveBeenCalledWith(
      'visitor_id',
      id,
      expect.objectContaining({ httpOnly: true }),
    );
  });
});
