/**
 * Achievements Server Actions
 * Server actions for fetching achievements from Supabase
 */

'use server';

import { prisma } from '@/lib/prisma/client';
import type { AchievementCardData } from '@/types';

/**
 * Get all achievements for listing
 */
export async function getAchievements(): Promise<AchievementCardData[]> {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: { issuedDate: 'desc' },
      select: {
        id: true,
        slug: true,
        title: true,
        issuer: true,
        certificateNumber: true,
        credentialUrl: true,
        imageUrl: true,
        issuedDate: true,
        type: true,
        category: true,
      },
    });

    return achievements;
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }
}

/**
 * Get achievement by slug
 */
export async function getAchievementBySlug(slug: string) {
  try {
    const achievement = await prisma.achievement.findUnique({
      where: { slug },
    });

    return achievement;
  } catch (error) {
    console.error('Error fetching achievement by slug:', error);
    return null;
  }
}

/**
 * Get achievements by type
 */
export async function getAchievementsByType(type: string) {
  try {
    const achievements = await prisma.achievement.findMany({
      where: { type: type as any },
      orderBy: { issuedDate: 'desc' },
      select: {
        id: true,
        slug: true,
        title: true,
        issuer: true,
        certificateNumber: true,
        credentialUrl: true,
        imageUrl: true,
        issuedDate: true,
        type: true,
        category: true,
      },
    });

    return achievements;
  } catch (error) {
    console.error('Error fetching achievements by type:', error);
    return [];
  }
}

/**
 * Get achievement categories
 */
export async function getAchievementCategories(): Promise<string[]> {
  try {
    const categories = await prisma.achievement.findMany({
      where: { category: { not: null } },
      select: { category: true },
      distinct: ['category'],
    });

    return categories.map((c) => c.category!).filter(Boolean);
  } catch (error) {
    console.error('Error fetching achievement categories:', error);
    return [];
  }
}
