/**
 * Achievements Client Component
 * Handles client-side filtering, interactions, and the detail modal
 */

'use client';

import { useTranslations } from 'next-intl';
import { useState, useMemo } from 'react';
import { Search, ChevronDown, ShieldCheck, Calendar, Eye, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import type { AchievementType, AchievementCardData } from '@/types';

interface AchievementsClientProps {
  initialAchievements: AchievementCardData[];
  categories: string[];
}

const iconHoverProps = {
  whileHover: { scale: 1.15, rotate: [0, -5, 5, -5, 0] },
  transition: { duration: 0.4, ease: 'easeInOut' as const },
};

const typeOptions: { value: AchievementType | 'ALL'; label: string }[] = [
  { value: 'ALL', label: 'All' },
  { value: 'PROFESSIONAL', label: 'Professional' },
  { value: 'ACADEMIC', label: 'Academic' },
  { value: 'COURSE', label: 'Course' },
  { value: 'BOOTCAMP', label: 'Bootcamp' },
  { value: 'CERTIFICATION', label: 'Certification' },
];

export function AchievementsClient({ initialAchievements, categories }: AchievementsClientProps) {
  const t = useTranslations('achievements');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<AchievementType | 'ALL'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementCardData | null>(null);

  const categoryOptions = useMemo(() => {
    return [
      { value: 'ALL', label: 'All Categories' },
      ...categories.map((cat) => ({ value: cat, label: cat })),
    ];
  }, [categories]);

  const filteredAchievements = useMemo(() => {
    return initialAchievements.filter((achievement) => {
      const matchesSearch =
        achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        achievement.issuer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedType === 'ALL' || achievement.type === selectedType;
      const matchesCategory = selectedCategory === 'ALL' || achievement.category === selectedCategory;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [searchQuery, selectedType, selectedCategory, initialAchievements]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
  };

  const formatFullDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
  };

  const openDetails = (achievement: AchievementCardData) => {
    setSelectedAchievement(achievement);
  };

  return (
    <>
      <div className="mb-10">
        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('title')}</h2>
        <p className="text-gray-500 dark:text-[#888] text-sm max-w-2xl leading-relaxed">{t('subtitle')}</p>
      </div>

      <div className="h-[1px] border-t border-dashed border-gray-300 dark:border-[#333] w-full mb-10"></div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative group">
          <motion.div {...iconHoverProps} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Search className="text-gray-400 dark:text-[#666] group-focus-within:text-gray-900 dark:group-focus-within:text-white transition-colors" size={20} />
          </motion.div>
          <input
            type="text"
            placeholder={t('search_placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 dark:bg-[#151515] border border-gray-300 dark:border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-[#555] focus:outline-none focus:border-gray-400 dark:focus:border-white/20 focus:bg-gray-200 dark:focus:bg-[#1a1a1a] transition-all"
          />
        </div>

        <div className="flex gap-4">
          <div className="relative group min-w-[160px]">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as AchievementType | 'ALL')}
              className="w-full bg-gray-100 dark:bg-[#151515] border border-gray-300 dark:border-white/10 rounded-xl py-3 pl-4 pr-10 text-sm text-gray-500 dark:text-[#888] focus:outline-none focus:border-gray-400 dark:focus:border-white/20 focus:text-gray-900 dark:focus:text-white appearance-none cursor-pointer"
            >
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <motion.div {...iconHoverProps} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown className="text-gray-400 dark:text-[#666]" size={16} />
            </motion.div>
          </div>
          <div className="relative group min-w-[160px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-gray-100 dark:bg-[#151515] border border-gray-300 dark:border-white/10 rounded-xl py-3 pl-4 pr-10 text-sm text-gray-500 dark:text-[#888] focus:outline-none focus:border-gray-400 dark:focus:border-white/20 focus:text-gray-900 dark:focus:text-white appearance-none cursor-pointer"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <motion.div {...iconHoverProps} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown className="text-gray-400 dark:text-[#666]" size={16} />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-400 dark:text-[#666] mb-8 font-mono">
        {t('total', { count: filteredAchievements.length })}
      </div>

      {/* Achievements Grid */}
      {filteredAchievements.length === 0 ? (
        <div className="text-center py-20">
          <div className="mx-auto text-gray-300 dark:text-[#333] mb-4 w-12 h-12 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 19-8.5-8.5"/>
              <circle cx="9" cy="9" r="6"/>
            </svg>
          </div>
          <p className="text-gray-400 dark:text-[#666] text-sm">{t('no_achievements')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => (
            <button
              key={achievement.id}
              type="button"
              onClick={() => openDetails(achievement)}
              aria-haspopup="dialog"
              className="group relative flex flex-col text-left w-full bg-gray-100 dark:bg-[#121212] border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden hover:border-accent-blue/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-blue/5 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/50"
            >
              {/* Image Area */}
              <div className="relative w-full aspect-[16/10] bg-gray-200 dark:bg-[#0a0a0a] overflow-hidden">
                {achievement.imageUrl ? (
                  <>
                    <Image
                      src={achievement.imageUrl}
                      alt={achievement.title}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-100 dark:from-[#121212] via-transparent to-transparent opacity-80"></div>
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gray-200 dark:bg-[#0a0a0a] flex items-center justify-center">
                    <motion.div {...iconHoverProps}>
                      <ShieldCheck className="text-gray-300 dark:text-[#333]" size={48} />
                    </motion.div>
                  </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] bg-black/40">
                  <span className="flex items-center gap-2 text-white font-semibold text-sm border border-white/20 bg-white/10 px-5 py-2.5 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {t('view_details')} <Eye size={16} />
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 relative">
                {/* Badge */}
                {achievement.certificateNumber && (
                  <span className="text-[10px] text-blue-600 dark:text-accent-blue font-mono mb-2">
                    {achievement.certificateNumber}
                  </span>
                )}

                {/* Title */}
                <div className="mb-3" style={{ minHeight: '42px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3 className="text-gray-900 dark:text-white font-bold text-lg leading-tight line-clamp-2 group-hover:text-accent-blue transition-colors">
                    {achievement.title}
                  </h3>
                </div>

                {/* Issuer */}
                <div className="flex items-center gap-2 text-gray-600 dark:text-[#888] text-xs mb-3">
                  <motion.div {...iconHoverProps}>
                    <ShieldCheck className="text-gray-400 dark:text-[#555] shrink-0" size={14} />
                  </motion.div>
                  <span>{achievement.issuer}</span>
                </div>

                {/* Tags */}
                <div className="mt-auto flex flex-wrap gap-2">
                  <span className="text-[9px] font-medium bg-gray-200 dark:bg-[#1a1a1a] text-gray-600 dark:text-[#999] px-2 py-0.5 rounded-md border border-gray-300 dark:border-white/10">
                    {achievement.type}
                  </span>
                  {achievement.category && (
                    <span className="text-[9px] font-medium bg-gray-200 dark:bg-[#1a1a1a] text-gray-600 dark:text-[#999] px-2 py-0.5 rounded-md border border-gray-300 dark:border-white/10">
                      {achievement.category}
                    </span>
                  )}
                </div>

                {/* Date */}
                <div className="mt-3">
                  <span className="text-[10px] text-gray-500 dark:text-[#666] font-mono flex items-center gap-2">
                    <motion.div {...iconHoverProps}>
                      <Calendar size={14} className="shrink-0 text-gray-400 dark:text-[#555]" />
                    </motion.div>
                    {formatDate(achievement.issuedDate)}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <Dialog
        open={selectedAchievement !== null}
        onOpenChange={(open) => !open && setSelectedAchievement(null)}
      >
        <DialogContent className="max-w-xl p-0 gap-0 bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden">
          {selectedAchievement && (
            <>
              <div className="relative w-full aspect-video bg-gray-200 dark:bg-[#0a0a0a] overflow-hidden">
                {selectedAchievement.imageUrl ? (
                  <Image
                    src={selectedAchievement.imageUrl}
                    alt={selectedAchievement.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShieldCheck className="text-gray-300 dark:text-[#333]" size={64} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#121212] via-transparent to-transparent opacity-90" />
              </div>

              <div className="p-6 sm:p-8">
                <DialogHeader className="text-left space-y-3">
                  {selectedAchievement.certificateNumber && (
                    <span className="text-[11px] text-blue-600 dark:text-accent-blue font-mono">
                      {selectedAchievement.certificateNumber}
                    </span>
                  )}
                  <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                    {selectedAchievement.title}
                  </DialogTitle>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-[#888] text-sm">
                    <ShieldCheck className="text-gray-400 dark:text-[#555] shrink-0" size={16} />
                    <span>{selectedAchievement.issuer}</span>
                  </div>
                </DialogHeader>

                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <span className="text-[10px] font-medium bg-gray-200 dark:bg-[#1a1a1a] text-gray-600 dark:text-[#999] px-2.5 py-1 rounded-md border border-gray-300 dark:border-white/10">
                    {selectedAchievement.type}
                  </span>
                  {selectedAchievement.category && (
                    <span className="text-[10px] font-medium bg-gray-200 dark:bg-[#1a1a1a] text-gray-600 dark:text-[#999] px-2.5 py-1 rounded-md border border-gray-300 dark:border-white/10">
                      {selectedAchievement.category}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 text-[10px] text-gray-500 dark:text-[#666] font-mono ml-auto">
                    <Calendar size={12} className="shrink-0" />
                    {formatFullDate(selectedAchievement.issuedDate)}
                  </span>
                </div>

                {selectedAchievement.description && (
                  <p className="text-gray-600 dark:text-[#999] text-sm leading-relaxed mt-5">
                    {selectedAchievement.description}
                  </p>
                )}

                {selectedAchievement.credentialUrl && (
                  <DialogFooter className="mt-6 sm:justify-start">
                    <a
                      href={selectedAchievement.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                    >
                      {t('view_credential')} <ArrowUpRight size={16} />
                    </a>
                  </DialogFooter>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
