import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/get-visitor-id', () => ({
  getVisitorId: vi.fn().mockResolvedValue('1.2.3.4'),
}));
vi.mock('@/lib/rate-limit', () => ({ isRateLimited: vi.fn().mockReturnValue(false) }));
vi.mock('next/headers', () => ({ headers: vi.fn().mockResolvedValue(new Headers()) }));
vi.mock('@/lib/prisma/client', () => ({
  prisma: {
    love: {
      findUnique: vi.fn(),
      update: vi.fn(),
      create: vi.fn(),
      count: vi.fn(),
    },
    loveAnalytics: {
      create: vi.fn(),
    },
  },
}));

import { getVisitorId } from '@/lib/get-visitor-id';
import { prisma } from '@/lib/prisma/client';
import { isRateLimited } from '@/lib/rate-limit';
import { toggleLove } from './love';

describe('toggleLove', () => {
  beforeEach(() => {
    vi.mocked(prisma.love.findUnique).mockReset();
    vi.mocked(prisma.love.update).mockReset();
    vi.mocked(prisma.love.create).mockReset();
    vi.mocked(prisma.love.count).mockReset();
    vi.mocked(prisma.loveAnalytics.create).mockReset();
    vi.mocked(isRateLimited).mockReturnValue(false);
    vi.mocked(getVisitorId).mockResolvedValue('1.2.3.4');
  });

  it('creates a new love and logs analytics for a first-time visitor', async () => {
    vi.mocked(prisma.love.findUnique).mockResolvedValue(null);
    vi.mocked(prisma.love.count).mockResolvedValue(1);

    const result = await toggleLove();

    expect(result).toEqual({ success: true, isLoved: true, totalLoves: 1 });
    expect(prisma.love.create).toHaveBeenCalledOnce();
    expect(prisma.loveAnalytics.create).toHaveBeenCalledOnce();
    expect(prisma.love.update).not.toHaveBeenCalled();
  });

  it('deactivates an already-active love', async () => {
    vi.mocked(prisma.love.findUnique).mockResolvedValue({ isActive: true } as never);
    vi.mocked(prisma.love.count).mockResolvedValue(0);

    const result = await toggleLove();

    expect(result).toEqual({ success: true, isLoved: false, totalLoves: 0 });
    expect(prisma.love.update).toHaveBeenCalledWith({
      where: { ipAddress: '1.2.3.4' },
      data: expect.objectContaining({ isActive: false }),
    });
  });

  it('reactivates a previously-deactivated love', async () => {
    vi.mocked(prisma.love.findUnique).mockResolvedValue({ isActive: false } as never);
    vi.mocked(prisma.love.count).mockResolvedValue(1);

    const result = await toggleLove();

    expect(result).toEqual({ success: true, isLoved: true, totalLoves: 1 });
    expect(prisma.love.update).toHaveBeenCalledWith({
      where: { ipAddress: '1.2.3.4' },
      data: expect.objectContaining({ isActive: true }),
    });
  });

  it('rejects the toggle once the visitor is rate limited, without touching the database', async () => {
    vi.mocked(isRateLimited).mockReturnValue(true);

    const result = await toggleLove();

    expect(result.success).toBe(false);
    expect(prisma.love.findUnique).not.toHaveBeenCalled();
  });
});
