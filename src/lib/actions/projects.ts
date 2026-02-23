/**
 * Projects Server Actions
 * Server actions for fetching projects from Supabase
 */

'use server';

import { prisma } from '@/lib/prisma/client';
import type { ProjectCardData } from '@/types';

/**
 * Get all projects for listing
 */
export async function getProjects(): Promise<ProjectCardData[]> {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ isFeatured: 'desc' }, { publishedAt: 'desc' }],
      select: {
        slug: true,
        title: true,
        description: true,
        imageUrl: true,
        isFeatured: true,
        techStack: true,
      },
    });

    return projects.map((project) => ({
      slug: project.slug,
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      isFeatured: project.isFeatured,
      techStack: project.techStack,
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

/**
 * Get project by slug for detail page
 */
export async function getProjectBySlug(slug: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
    });

    return project;
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    return null;
  }
}

/**
 * Get featured projects
 */
export async function getFeaturedProjects(): Promise<ProjectCardData[]> {
  try {
    const projects = await prisma.project.findMany({
      where: { isFeatured: true },
      orderBy: { publishedAt: 'desc' },
      select: {
        slug: true,
        title: true,
        description: true,
        imageUrl: true,
        isFeatured: true,
        techStack: true,
      },
    });

    return projects;
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
}
