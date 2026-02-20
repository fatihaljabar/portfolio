/**
 * Shared Types for Application
 */

// ========================================
// PROJECT TYPES
// ========================================

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string | null;
  isFeatured: boolean;
  githubUrl: string | null;
  demoUrl: string | null;
  techStack: string[];
  category: string | null;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectCardData {
  slug: string;
  title: string;
  description: string;
  imageUrl: string | null;
  isFeatured: boolean;
  techStack: string[];
}

// ========================================
// ACHIEVEMENT TYPES
// ========================================

export type AchievementType = 'PROFESSIONAL' | 'ACADEMIC' | 'COURSE' | 'BOOTCAMP' | 'CERTIFICATION';

export interface Achievement {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  issuer: string;
  certificateNumber: string | null;
  credentialUrl: string | null;
  imageUrl: string | null;
  issuedDate: Date;
  type: AchievementType;
  category: string | null;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AchievementCardData {
  slug: string;
  title: string;
  issuer: string;
  certificateNumber: string | null;
  imageUrl: string | null;
  issuedDate: Date;
  type: AchievementType;
  category: string | null;
}

// ========================================
// MESSAGE TYPES
// ========================================

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export interface CreateMessageInput {
  name: string;
  email: string;
  message: string;
}

// ========================================
// LOVE TYPES
// ========================================

export interface Love {
  id: string;
  ipAddress: string;
  userAgent: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoveAnalytics {
  id: string;
  ipAddress: string;
  userAgent: string | null;
  referrer: string | null;
  createdAt: Date;
}

// ========================================
// FILTER TYPES
// ========================================

export interface AchievementFilters {
  search?: string;
  type?: AchievementType | 'ALL';
  category?: string | 'ALL';
}

export interface ProjectFilters {
  search?: string;
  category?: string | 'ALL';
}
