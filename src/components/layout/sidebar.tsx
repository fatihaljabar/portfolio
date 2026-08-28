/**
 * Sidebar Component
 * Desktop: full profile card (photo, contact, languages, social links), sticky.
 * Mobile/tablet (<lg): compact identity bar only — contact info and social
 * links already live on the Contact page, so repeating them above every
 * page's content is redundant. See Contact page for that content on mobile.
 */

'use client';

import { motion } from 'framer-motion';
import { Github, Globe, Instagram, Linkedin, Mail, Share2, ShieldCheck, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SiTiktok } from 'react-icons/si';
import { ImageWithSkeleton } from '@/components/components/image-with-skeleton';
import { LocaleToggle } from '@/components/components/locale-toggle';
import { ModeToggle } from '@/components/components/theme-toggle';
import { Tooltip } from '@/components/components/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { localeFlags, locales } from '@/lib/i18n/config';

const iconHoverProps = {
  whileHover: { scale: 1.15, rotate: [0, -5, 5, -5, 0] },
  transition: { duration: 0.4, ease: 'easeInOut' as const },
};

export function Sidebar({ photoUrl }: { photoUrl: string | null }) {
  const t = useTranslations('sidebar');
  const profileSrc = photoUrl || '/img/profile.jpg';

  const socialLinks = [
    { icon: X, href: 'https://x.com/fatihaljabar', label: 'X' },
    { icon: Instagram, href: 'https://www.instagram.com/fatihaljabar/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/fatihaljabar/', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/fatihaljabar', label: 'GitHub' },
    { icon: SiTiktok, href: 'https://www.tiktok.com/@fatihaljabarr', label: 'TikTok' },
    { icon: Mail, href: 'mailto:fatihaljabar@gmail.com', label: 'Email' },
  ];

  return (
    <aside className="lg:w-[380px] lg:h-screen lg:sticky lg:top-0 p-4 lg:p-10 flex flex-col justify-between z-40 bg-white dark:bg-[#0a0a0a] border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-dark-border">
      {/* Mobile/tablet compact identity bar (<lg) */}
      <div className="flex lg:hidden items-center justify-between w-full">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-10 h-10 shrink-0 rounded-full overflow-hidden border-2 border-gray-200 dark:border-dark-border">
            <ImageWithSkeleton
              src={profileSrc}
              alt="Profile"
              fill
              sizes="40px"
              className="object-cover"
              priority
            />
          </div>
          <span className="font-bold text-gray-900 dark:text-white truncate">Fatih</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <LocaleToggle />
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label={t('contact')}
                className="flex items-center justify-center h-11 w-11 rounded-full text-gray-600 dark:text-[#ccc] hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Share2 size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-auto overflow-visible p-2">
              <div className="flex items-center gap-1">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Tooltip key={social.label} label={social.label}>
                      <a
                        href={social.href}
                        target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                        rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                        aria-label={social.label}
                        className="flex items-center justify-center h-11 w-11 rounded-full text-gray-500 dark:text-[#888] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                      >
                        <Icon size={18} />
                      </a>
                    </Tooltip>
                  );
                })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Desktop full profile card (lg+) */}
      <div className="hidden lg:flex lg:flex-col items-center w-full">
        {/* Profile Image */}
        <div className="mb-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 dark:border-dark-border shadow-2xl">
            <ImageWithSkeleton
              src={profileSrc}
              alt="Profile"
              fill
              sizes="96px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Name */}
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
          Fatih
          <motion.div {...iconHoverProps}>
            <ShieldCheck className="text-accent-blue" size={20} />
          </motion.div>
        </h1>

        {/* Language & Theme Toggles */}
        <div className="flex items-center gap-3 mt-6">
          {/* Language Toggle */}
          <LocaleToggle />

          {/* Theme Toggle */}
          <ModeToggle />
        </div>

        <div className="h-[1px] bg-black/5 dark:bg-white/5 w-full my-8"></div>

        {/* Contact Info */}
        <div className="w-full">
          <div className="text-[11px] font-bold text-gray-500 dark:text-[#888] tracking-widest mb-4 uppercase">
            {t('contact')}
          </div>
          <ul className="space-y-2">
            <li>
              <a
                href="mailto:fatihaljabar@gmail.com"
                className="w-fit cursor-arrow-circle flex items-center gap-4 text-sm text-gray-700 dark:text-[#EAEAEA] hover:text-gray-500 dark:hover:text-[#999] transition-colors py-1 group"
              >
                <div className="w-5 flex justify-center">
                  <motion.div {...iconHoverProps}>
                    <Mail
                      className="text-xl text-gray-400 dark:text-[#666] group-hover:text-gray-500 dark:group-hover:text-[#999] transition-colors"
                      size={20}
                    />
                  </motion.div>
                </div>
                <span className="tracking-wide">fatihaljabar@gmail.com</span>
              </a>
            </li>
            <li>
              <a
                href="https://fatihaljabar.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit cursor-arrow-circle flex items-center gap-4 text-sm text-gray-700 dark:text-[#EAEAEA] hover:text-gray-500 dark:hover:text-[#999] transition-colors py-1 group"
              >
                <div className="w-5 flex justify-center">
                  <motion.div {...iconHoverProps}>
                    <Globe
                      className="text-xl text-gray-400 dark:text-[#666] group-hover:text-gray-500 dark:group-hover:text-[#999] transition-colors"
                      size={20}
                    />
                  </motion.div>
                </div>
                <span className="tracking-wide">fatihaljabar.com</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="h-[1px] bg-black/5 dark:bg-white/5 w-full my-8"></div>

        {/* Languages */}
        <div className="w-full">
          <div className="text-[11px] font-bold text-gray-500 dark:text-[#888] tracking-widest mb-4 uppercase">
            {t('languages')}
          </div>
          <div className="flex gap-6">
            {locales.map((loc) => (
              <div
                key={loc}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-[#ddd]"
              >
                <span className="text-lg">{localeFlags[loc]}</span>{' '}
                {loc === 'en' ? 'English' : 'Indonesia'}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Links Footer (lg+) */}
      <div className="hidden lg:flex mt-auto pt-6 justify-between items-center border-t border-black/5 dark:border-white/5 w-full">
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <Tooltip key={social.label} label={social.label}>
              <a
                href={social.href}
                target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="cursor-arrow-circle text-gray-400 dark:text-[#666] hover:text-gray-700 dark:hover:text-white transition-colors duration-300"
                aria-label={social.label}
              >
                <motion.div {...iconHoverProps}>
                  <Icon size={24} />
                </motion.div>
              </a>
            </Tooltip>
          );
        })}
      </div>
    </aside>
  );
}
