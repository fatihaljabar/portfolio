'use server';

/**
 * Love Feature Server Actions
 * Tracks user love/support without authentication using IP address
 */

import { headers } from 'next/headers';
import { getVisitorId } from '@/lib/get-visitor-id';
import { prisma } from '@/lib/prisma/client';
import { isRateLimited } from '@/lib/rate-limit';

export interface LoveResponse {
  success: boolean;
  isLoved: boolean;
  totalLoves?: number;
  error?: string;
}

/**
 * Toggle love status for a user (based on IP address)
 */
export async function toggleLove(): Promise<LoveResponse> {
  try {
    const ipAddress = await getVisitorId();

    if (isRateLimited(`love:${ipAddress}`, 10, 10_000)) {
      return { success: false, isLoved: false, error: 'Too many requests. Please slow down.' };
    }

    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || null;

    // Check if user already loved
    const existingLove = await prisma.love.findUnique({
      where: { ipAddress },
    });

    if (existingLove) {
      if (existingLove.isActive) {
        // Deactivate love
        await prisma.love.update({
          where: { ipAddress },
          data: { isActive: false, updatedAt: new Date() },
        });
        const totalLoves = await prisma.love.count({ where: { isActive: true } });
        return { success: true, isLoved: false, totalLoves };
      } else {
        // Reactivate love
        await prisma.love.update({
          where: { ipAddress },
          data: { isActive: true, updatedAt: new Date() },
        });
        const totalLoves = await prisma.love.count({ where: { isActive: true } });
        return { success: true, isLoved: true, totalLoves };
      }
    } else {
      // Create new love entry
      await prisma.love.create({
        data: {
          ipAddress,
          userAgent,
          isActive: true,
        },
      });

      // Track analytics
      await prisma.loveAnalytics.create({
        data: {
          ipAddress,
          userAgent,
          referrer: headersList.get('referer'),
        },
      });

      const totalLoves = await prisma.love.count({ where: { isActive: true } });
      return { success: true, isLoved: true, totalLoves };
    }
  } catch (error) {
    console.error('Error toggling love:', error);
    return { success: false, isLoved: false };
  }
}

/**
 * Check if current user has loved
 */
export async function hasLoved(): Promise<boolean> {
  try {
    const ipAddress = await getVisitorId();

    const love = await prisma.love.findUnique({
      where: { ipAddress },
    });

    return love?.isActive || false;
  } catch {
    return false;
  }
}

/**
 * Get total love count
 */
export async function getLoveCount(): Promise<number> {
  try {
    return await prisma.love.count({ where: { isActive: true } });
  } catch {
    return 0;
  }
}
