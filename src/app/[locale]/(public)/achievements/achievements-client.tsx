/**
 * Achievements Client Component
 * Handles client-side filtering, interactions, and the detail modal
 */

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Search,
  ShieldCheck,
} from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { AchievementCardData, AchievementType } from '@/types';

interface AchievementsClientProps {
  initialAchievements: AchievementCardData[];
}

const iconHoverProps = {
  whileHover: { scale: 1.15, rotate: [0, -5, 5, -5, 0] },
  transition: { duration: 0.4, ease: 'easeInOut' as const },
};

const typeLabels: Record<AchievementType, string> = {
  PROFESSIONAL: 'Professional',
  ACADEMIC: 'Academic',
  COURSE: 'Course',
  BOOTCAMP: 'Bootcamp',
  CERTIFICATION: 'Certification',
};

export function AchievementsClient({ initialAchievements }: AchievementsClientProps) {
  const t = useTranslations('achievements');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<AchievementType | 'ALL'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementCardData | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = useMemo(() => {
    if (!selectedAchievement) return [];
    return [selectedAchievement.imageUrl, ...selectedAchievement.additionalImages].filter(
      (src): src is string => Boolean(src),
    );
  }, [selectedAchievement]);

  const categoryOptions = useMemo(() => {
    const availableCategories = [
      ...new Set(
        initialAchievements
          .filter((a) => selectedType === 'ALL' || a.type === selectedType)
          .map((a) => a.category)
          .filter((cat): cat is string => Boolean(cat)),
      ),
    ];
    return [
      { value: 'ALL', label: 'All Categories' },
      ...availableCategories.map((cat) => ({ value: cat, label: cat })),
    ];
  }, [initialAchievements, selectedType]);

  const handleTypeChange = (type: AchievementType | 'ALL') => {
    setSelectedType(type);
    const stillValid =
      selectedCategory === 'ALL' ||
      initialAchievements.some(
        (a) => (type === 'ALL' || a.type === type) && a.category === selectedCategory,
      );
    if (!stillValid) setSelectedCategory('ALL');
  };

  const typeOptions = useMemo(() => {
    const usedTypes = [...new Set(initialAchievements.map((a) => a.type))];
    return [
      { value: 'ALL' as const, label: 'All' },
      ...usedTypes.map((type) => ({ value: type, label: typeLabels[type] })),
    ];
  }, [initialAchievements]);

  const filteredAchievements = useMemo(() => {
    return initialAchievements.filter((achievement) => {
      const matchesSearch =
        achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        achievement.issuer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedType === 'ALL' || achievement.type === selectedType;
      const matchesCategory =
        selectedCategory === 'ALL' || achievement.category === selectedCategory;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [searchQuery, selectedType, selectedCategory, initialAchievements]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
  };

  const formatFullDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const openDetails = (achievement: AchievementCardData) => {
    setSelectedAchievement(achievement);
    setSlideIndex(0);
  };

  const goToSlide = (index: number) => {
    setSlideIndex((index + slides.length) % slides.length);
  };

  return (
    <>
      <div className="mb-10">
        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('title')}</h2>
        <p className="text-gray-500 dark:text-[#888] text-sm max-w-2xl leading-relaxed">
          {t('subtitle')}
        </p>
      </div>

      <div className="h-[1px] border-t border-dashed border-gray-300 dark:border-[#333] w-full mb-10"></div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative group">
          <motion.div
            {...iconHoverProps}
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            <Search
              className="text-gray-400 dark:text-[#666] group-focus-within:text-gray-900 dark:group-focus-within:text-white transition-colors"
              size={20}
            />
          </motion.div>
          <input
            type="text"
            placeholder={t('search_placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 dark:bg-[#151515] border border-gray-300 dark:border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-[#555] focus:outline-none focus:border-gray-400 dark:focus:border-white/20 focus:bg-gray-200 dark:focus:bg-[#1a1a1a] transition-all"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative group w-full sm:w-40">
            <select
              value={selectedType}
              onChange={(e) => handleTypeChange(e.target.value as AchievementType | 'ALL')}
              className="w-full bg-gray-100 dark:bg-[#151515] border border-gray-300 dark:border-white/10 rounded-xl py-3 pl-4 pr-10 text-sm text-gray-500 dark:text-[#888] focus:outline-none focus:border-gray-400 dark:focus:border-white/20 focus:text-gray-900 dark:focus:text-white appearance-none cursor-pointer"
            >
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <motion.div
              {...iconHoverProps}
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <ChevronDown className="text-gray-400 dark:text-[#666]" size={16} />
            </motion.div>
          </div>
          <div className="relative group w-full sm:w-40">
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
            <motion.div
              {...iconHoverProps}
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <ChevronDown className="text-gray-400 dark:text-[#666]" size={16} />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-400 dark:text-[#666] mb-8 font-mono">
        {t('total', { count: filteredAchievements.length })}
      </div>

      {/* Achievements Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedType}-${selectedCategory}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {filteredAchievements.length === 0 ? (
            <div className="text-center py-20">
              <div className="mx-auto text-gray-300 dark:text-[#333] mb-4 w-12 h-12 flex items-center justify-center">
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m22 19-8.5-8.5" />
                  <circle cx="9" cy="9" r="6" />
                </svg>
              </div>
              <p className="text-gray-400 dark:text-[#666] text-sm">{t('no_achievements')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAchievements.map((achievement, index) => (
                <button
                  key={achievement.id}
                  type="button"
                  onClick={() => openDetails(achievement)}
                  aria-haspopup="dialog"
                  aria-label={`${t('view_details')}: ${achievement.title}`}
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
                          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 237px"
                          loading={index < 3 ? 'eager' : 'lazy'}
                          className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500 ease-out"
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

                    <span
                      aria-hidden="true"
                      className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm border border-black/5 dark:border-white/10 text-gray-700 dark:text-white opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out shadow-sm"
                    >
                      <Eye size={14} />
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 relative">
                    {/* Badge */}
                    <div className="h-4 mb-2 flex items-center">
                      {achievement.certificateNumber && (
                        <span className="text-[10px] text-blue-600 dark:text-accent-blue font-mono">
                          {achievement.certificateNumber}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <div
                      className="mb-3"
                      style={{
                        minHeight: '42px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                    >
                      <h3 className="text-gray-900 dark:text-white font-bold text-lg leading-tight line-clamp-2 group-hover:text-accent-blue transition-colors">
                        {achievement.title}
                      </h3>
                    </div>

                    {/* Issuer */}
                    <div className="flex items-center gap-2 text-gray-600 dark:text-[#888] text-xs mb-3">
                      <motion.div {...iconHoverProps}>
                        <ShieldCheck
                          className="text-gray-400 dark:text-[#888] shrink-0"
                          size={14}
                        />
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
                          <Calendar size={14} className="shrink-0 text-gray-400 dark:text-[#888]" />
                        </motion.div>
                        {formatDate(achievement.issuedDate)}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Detail Modal */}
      <Dialog
        open={selectedAchievement !== null}
        onOpenChange={(open) => !open && setSelectedAchievement(null)}
      >
        <DialogContent className="w-[calc(100%-2rem)] sm:w-full max-w-2xl max-h-[92dvh] flex flex-col p-0 gap-0 bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden">
          {selectedAchievement && (
            <>
              <div className="relative w-full aspect-[3/2] max-h-[45dvh] shrink-0 bg-gray-200 dark:bg-[#0a0a0a] overflow-hidden">
                {slides.length > 0 ? (
                  <Image
                    key={slides[slideIndex]}
                    src={slides[slideIndex]}
                    alt={`${selectedAchievement.title} — page ${slideIndex + 1}`}
                    fill
                    sizes="(max-width: 672px) 100vw, 672px"
                    className="object-contain"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShieldCheck className="text-gray-300 dark:text-[#333]" size={64} />
                  </div>
                )}

                {slides.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => goToSlide(slideIndex - 1)}
                      aria-label="Previous page"
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm border border-black/5 dark:border-white/10 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-black/80 transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => goToSlide(slideIndex + 1)}
                      aria-label="Next page"
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm border border-black/5 dark:border-white/10 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-black/80 transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                      {slides.map((slide, index) => (
                        <button
                          key={slide}
                          type="button"
                          onClick={() => goToSlide(index)}
                          aria-label={`Go to page ${index + 1}`}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            index === slideIndex
                              ? 'w-5 bg-white'
                              : 'w-1.5 bg-white/50 hover:bg-white/75'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto min-h-0 flex-1">
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
                    <ShieldCheck className="text-gray-400 dark:text-[#888] shrink-0" size={16} />
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
