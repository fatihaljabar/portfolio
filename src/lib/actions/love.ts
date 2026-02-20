'use server';

/**
 * Love Feature Server Actions
 * Tracks user love/support without authentication using IP address
 */

import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma/client';

export interface LoveResponse {
  success: boolean;
  isLoved: boolean;
  totalLoves?: number;
}

/**
 * Toggle love status for a user (based on IP address)
 */
export async function toggleLove(): Promise<LoveResponse> {
  try {
    const headersList = await headers();
    const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
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
    const headersList = await headers();
    const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';

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
