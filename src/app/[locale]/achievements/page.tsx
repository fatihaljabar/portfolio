/**
 * Achievements Page
 * Certificates and badges with filter functionality
 */

'use client';

import { useTranslations } from 'next-intl';
import { useState, useMemo } from 'react';
import { Search, ChevronDown, ShieldCheck, Calendar, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import type { AchievementType } from '@/types';

// Mock data - will be replaced with Supabase fetch
const mockAchievements = [
  {
    id: '1',
    slug: 'backend-developer-internship-parto',
    title: 'Backend Developer Internship - Parto.id',
    issuer: 'Affan Technology Indonesia',
    certificateNumber: '196/EKS/2025',
    issuedDate: new Date('2025-07-01'),
    type: 'PROFESSIONAL' as AchievementType,
    category: 'Backend',
    imageUrl: 'https://images.unsplash.com/photo-1590608897129-79da98d15969?q=80&w=600&auto=format&fit=crop',
    credentialUrl: '#',
  },
  {
    id: '2',
    slug: 'ebook-freelance-web-developer',
    title: 'E-book Petunjuk Pro: Freelance Web Developer',
    issuer: 'Build With Angga',
    certificateNumber: 'BWA-WEB-2025',
    issuedDate: new Date('2025-09-01'),
    type: 'COURSE' as AchievementType,
    category: 'Freelance',
    imageUrl: 'https://images.unsplash.com/photo-1590608897129-79da98d15969?q=80&w=600&auto=format&fit=crop',
    credentialUrl: '#',
  },
  {
    id: '3',
    slug: 'android-jetpack-compose',
    title: 'Belajar Membuat Aplikasi Android dengan Jetpack Compose',
    issuer: 'Dicoding Indonesia',
    certificateNumber: '81P2LGL38ZOY',
    issuedDate: new Date('2025-01-15'),
    type: 'COURSE' as AchievementType,
    category: 'Mobile',
    imageUrl: 'https://images.unsplash.com/photo-1590608897129-79da98d15969?q=80&w=600&auto=format&fit=crop',
    credentialUrl: '#',
  },
  {
    id: '4',
    slug: 'mobile-development-bangkit',
    title: 'Certificate of Completion - Mobile Development',
    issuer: 'Bangkit Academy 2024',
    certificateNumber: 'BGK/GRAD/XXIV',
    issuedDate: new Date('2025-01-20'),
    type: 'BOOTCAMP' as AchievementType,
    category: 'Mobile',
    imageUrl: 'https://images.unsplash.com/photo-1590608897129-79da98d15969?q=80&w=600&auto=format&fit=crop',
    credentialUrl: '#',
  },
];

const typeOptions: { value: AchievementType | 'ALL'; label: string }[] = [
  { value: 'ALL', label: 'All' },
  { value: 'PROFESSIONAL', label: 'Professional' },
  { value: 'ACADEMIC', label: 'Academic' },
  { value: 'COURSE', label: 'Course' },
  { value: 'BOOTCAMP', label: 'Bootcamp' },
  { value: 'CERTIFICATION', label: 'Certification' },
];

const categoryOptions = [
  { value: 'ALL', label: 'All Categories' },
  { value: 'Backend', label: 'Backend' },
  { value: 'Frontend', label: 'Frontend' },
  { value: 'Mobile', label: 'Mobile' },
  { value: 'DevOps', label: 'DevOps' },
  { value: 'Design', label: 'Design' },
];

export default function AchievementsPage() {
  const t = useTranslations('achievements');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<AchievementType | 'ALL'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Filter achievements
  const filteredAchievements = useMemo(() => {
    return mockAchievements.filter((achievement) => {
      const matchesSearch =
        achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        achievement.issuer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedType === 'ALL' || achievement.type === selectedType;
      const matchesCategory = selectedCategory === 'ALL' || achievement.category === selectedCategory;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [searchQuery, selectedType, selectedCategory]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
  };

  return (
    <>
      <div className="mb-10">
        <h2 className="text-4xl font-bold mb-4 text-white">{t('title')}</h2>
        <p className="text-[#888] text-sm max-w-2xl leading-relaxed">{t('subtitle')}</p>
      </div>

      <div className="h-[1px] border-t border-dashed border-[#333] w-full mb-10"></div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] group-focus-within:text-white transition-colors" size={20} />
          <input
            type="text"
            placeholder={t('search_placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#151515] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-[#555] focus:outline-none focus:border-white/20 focus:bg-[#1a1a1a] transition-all"
          />
        </div>

        <div className="flex gap-4">
          <div className="relative group min-w-[160px]">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as AchievementType | 'ALL')}
              className="w-full bg-[#151515] border border-white/10 rounded-xl py-3 pl-4 pr-10 text-sm text-[#888] focus:outline-none focus:border-white/20 focus:text-white appearance-none cursor-pointer"
            >
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666] pointer-events-none" size={16} />
          </div>
          <div className="relative group min-w-[160px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#151515] border border-white/10 rounded-xl py-3 pl-4 pr-10 text-sm text-[#888] focus:outline-none focus:border-white/20 focus:text-white appearance-none cursor-pointer"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666] pointer-events-none" size={16} />
          </div>
        </div>
      </div>

      <div className="text-sm text-[#666] mb-8 font-mono">
        {t('total', { count: filteredAchievements.length })}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className="group relative flex flex-col bg-[#121212] border border-white/5 rounded-2xl overflow-hidden hover:border-accent-blue/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-blue/5 transition-all duration-300"
          >
            <div className="relative w-full aspect-[16/10] bg-[#0a0a0a] overflow-hidden">
              <Image
                src={achievement.imageUrl}
                alt={achievement.title}
                fill
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 bg-black/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="flex items-center gap-2 text-white font-semibold text-sm border border-white/20 bg-white/10 px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-all">
                  {t('view_credential')} <ExternalLink size={16} />
                </button>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1 relative">
              <div className="flex justify-between items-start mb-3">
                <div className="text-[10px] text-accent-blue font-mono bg-accent-blue/10 border border-accent-blue/20 px-2 py-0.5 rounded uppercase tracking-wide">
                  {achievement.certificateNumber}
                </div>
                <span className="text-[10px] text-[#666] font-mono flex items-center gap-1 bg-[#1a1a1a] px-2 py-0.5 rounded border border-white/5">
                  <Calendar size={10} /> {formatDate(achievement.issuedDate)}
                </span>
              </div>

              <h3 className="text-white font-bold text-lg mb-2 leading-snug line-clamp-2 group-hover:text-accent-blue transition-colors">
                {achievement.title}
              </h3>

              <div className="flex items-center gap-2 text-[#888] text-xs mb-6">
                <ShieldCheck className="text-[#555]" size={14} />
                <span>{achievement.issuer}</span>
              </div>

              <div className="mt-auto pt-4 flex flex-wrap gap-2 border-t border-white/5">
                <span className="text-[10px] font-medium bg-[#1a1a1a] text-[#999] px-2.5 py-1 rounded-lg border border-white/10 group-hover:border-white/20 transition-colors">
                  {achievement.type}
                </span>
                {achievement.category && (
                  <span className="text-[10px] font-medium bg-[#1a1a1a] text-[#999] px-2.5 py-1 rounded-lg border border-white/10 group-hover:border-white/20 transition-colors">
                    {achievement.category}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="text-center py-20">
          <p className="text-[#666] text-sm">No achievements found matching your criteria.</p>
        </div>
      )}
    </>
  );
}
