import type { User } from '@supabase/supabase-js';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/auth/server', () => ({
  getAdminUser: vi.fn(),
  createSupabaseServerClient: vi.fn(),
}));
vi.mock('@/lib/prisma/client', () => ({
  prisma: {
    project: {
      findUnique: vi.fn(),
      delete: vi.fn(),
    },
  },
}));
vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }));
vi.mock('next-intl/server', () => ({ getLocale: vi.fn().mockResolvedValue('en') }));
vi.mock('@/lib/i18n/navigation', () => ({ redirect: vi.fn() }));

import { getAdminUser } from '@/lib/auth/server';
import { prisma } from '@/lib/prisma/client';
import { deleteProject } from './admin-projects';

describe('deleteProject authorization', () => {
  beforeEach(() => {
    vi.mocked(getAdminUser).mockReset();
    vi.mocked(prisma.project.findUnique).mockReset();
    vi.mocked(prisma.project.delete).mockReset();
  });

  it('rejects the request and never touches the database when there is no admin session', async () => {
    vi.mocked(getAdminUser).mockResolvedValue(null);

    const result = await deleteProject('some-id');

    expect(result).toEqual({ success: false, error: 'Unauthorized' });
    expect(prisma.project.findUnique).not.toHaveBeenCalled();
    expect(prisma.project.delete).not.toHaveBeenCalled();
  });

  it('proceeds to delete when an admin session is present', async () => {
    vi.mocked(getAdminUser).mockResolvedValue({ id: 'admin-1' } as unknown as User);
    vi.mocked(prisma.project.findUnique).mockResolvedValue({ imageUrl: null } as never);
    vi.mocked(prisma.project.delete).mockResolvedValue({} as never);

    const result = await deleteProject('some-id');

    expect(result).toEqual({ success: true });
    expect(prisma.project.delete).toHaveBeenCalledWith({ where: { id: 'some-id' } });
  });
});
