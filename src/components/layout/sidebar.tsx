/**
 * Sidebar Component
 * Left sidebar containing profile info, contact, languages, and social links
 */

'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import Image from 'next/image';
import {
  Mail,
  Globe,
  X,
  Instagram,
  Linkedin,
  Github,
  Video,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { localeFlags, locales, type Locale } from '@/lib/i18n/config';
import { ModeToggle } from '@/components/components/theme-toggle';
import { LocaleToggle } from '@/components/components/locale-toggle';

const iconHoverProps = {
  whileHover: { scale: 1.15, rotate: [0, -5, 5, -5, 0] },
  transition: { duration: 0.4, ease: 'easeInOut' as const },
};

export function Sidebar() {
  const t = useTranslations('sidebar');
  const tNav = useTranslations('nav');

  const socialLinks = [
    { icon: X, href: 'https://x.com/fatihaljabar', label: 'X' },
    { icon: Instagram, href: 'https://www.instagram.com/fatihaljabar/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/fatihaljabar/', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/fatihaljabar', label: 'GitHub' },
    { icon: Video, href: 'https://www.tiktok.com/@fatihaljabarr', label: 'TikTok' },
    { icon: Mail, href: 'mailto:fatihaljabar@gmail.com', label: 'Email' },
  ];

  return (
    <aside className="lg:w-[380px] lg:h-screen lg:sticky lg:top-0 p-8 lg:p-10 flex flex-col justify-between z-40 bg-white dark:bg-[#0a0a0a] lg:border-r border-gray-200 dark:border-dark-border">
      <div className="flex flex-col items-center w-full">
        {/* Profile Image */}
        <div className="mb-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 dark:border-dark-border shadow-2xl">
            <Image src="/img/profile.jpg" alt="Profile" fill sizes="96px" className="object-cover" priority />
          </div>
        </div>

        {/* Name */}
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
          Fatih Al Jabar H.M.
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
          <div className="text-[11px] font-bold text-gray-500 dark:text-[#555] tracking-widest mb-4 uppercase">
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
                    <Mail className="text-xl text-gray-400 dark:text-[#666] group-hover:text-gray-500 dark:group-hover:text-[#999] transition-colors" size={20} />
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
                    <Globe className="text-xl text-gray-400 dark:text-[#666] group-hover:text-gray-500 dark:group-hover:text-[#999] transition-colors" size={20} />
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
          <div className="text-[11px] font-bold text-gray-500 dark:text-[#555] tracking-widest mb-4 uppercase">
            {t('languages')}
          </div>
          <div className="flex gap-6">
            {locales.map((loc) => (
              <div key={loc} className="flex items-center gap-2 text-sm text-gray-600 dark:text-[#ddd]">
                <span className="text-lg">{localeFlags[loc]}</span> {loc === 'en' ? 'English' : 'Indonesia'}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Links Footer */}
      <div className="mt-auto pt-6 flex justify-between items-center border-t border-black/5 dark:border-white/5 w-full">
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.label}
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
          );
        })}
      </div>
    </aside>
  );
}
