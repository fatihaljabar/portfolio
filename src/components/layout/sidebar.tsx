/**
 * Sidebar Component
 * Left sidebar containing profile info, contact, languages, and social links
 */

'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import {
  Mail,
  Globe,
  Phone,
  X,
  Instagram,
  Linkedin,
  Github,
  Video,
  ShieldCheck,
  Sun,
  Moon,
} from 'lucide-react';
import { localeFlags, locales, type Locale } from '@/lib/i18n/config';

export function Sidebar() {
  const t = useTranslations('sidebar');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useState(() => setMounted(true));

  const handleLocaleChange = (newLocale: Locale) => {
    // Update URL with new locale
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(`/${locale}`, '').replace(/^\//, '') || '';
    window.location.href = `/${newLocale}${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`;
  };

  const socialLinks = [
    { icon: X, href: '#', label: 'X' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Video, href: '#', label: 'TikTok' },
    { icon: Mail, href: 'mailto:hey@fatih.com', label: 'Email' },
  ];

  return (
    <aside className="lg:w-[380px] lg:h-screen lg:sticky lg:top-0 p-8 lg:p-10 flex flex-col justify-between z-40 bg-[#0a0a0a] lg:border-r border-dark-border">
      <div className="flex flex-col items-center w-full">
        {/* Profile Image */}
        <div className="mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-dark-border shadow-2xl">
            <img
              src="/img/1.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name */}
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2 text-white">
          Fatih Al Jabar H.M.
          <ShieldCheck className="text-accent-blue" size={20} />
        </h1>

        {/* Language & Theme Toggles */}
        <div className="flex items-center gap-3 mt-6">
          {/* Language Toggle */}
          <div className="bg-[#151515] p-1 rounded-full flex items-center border border-white/5">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleLocaleChange(loc)}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] shadow-lg transition-all ${
                  locale === loc
                    ? 'bg-accent-yellow text-black'
                    : 'text-[#666] hover:text-white'
                }`}
              >
                {loc.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <div className="bg-[#151515] p-1 rounded-full flex items-center border border-white/5">
            <button
              onClick={() => setTheme('light')}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                theme === 'light'
                  ? 'bg-[#333] text-white shadow-lg'
                  : 'text-[#666] hover:text-white'
              }`}
            >
              <Sun size={16} fill={theme === 'light' ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                theme === 'dark' || !mounted
                  ? 'bg-[#333] text-white shadow-lg'
                  : 'text-[#666] hover:text-white'
              }`}
            >
              <Moon size={16} fill="currentColor" />
            </button>
          </div>
        </div>

        <div className="h-[1px] bg-white/5 w-full my-8"></div>

        {/* Contact Info */}
        <div className="w-full">
          <div className="text-[11px] font-bold text-[#555] tracking-widest mb-4 uppercase">
            {t('contact')}
          </div>
          <ul className="space-y-2">
            <li>
              <a
                href="mailto:hey@fatih.com"
                className="w-fit cursor-arrow-circle flex items-center gap-4 text-sm text-[#EAEAEA] hover:text-[#999] transition-colors py-1 group"
              >
                <div className="w-5 flex justify-center">
                  <Mail className="text-xl text-[#666] group-hover:text-[#999] transition-colors" size={20} />
                </div>
                <span className="tracking-wide">hey@fatih.com</span>
              </a>
            </li>
            <li>
              <a
                href="https://fatih.com"
                target="_blank"
                className="w-fit cursor-arrow-circle flex items-center gap-4 text-sm text-[#EAEAEA] hover:text-[#999] transition-colors py-1 group"
              >
                <div className="w-5 flex justify-center">
                  <Globe className="text-xl text-[#666] group-hover:text-[#999] transition-colors" size={20} />
                </div>
                <span className="tracking-wide">fatihaljabar.com</span>
              </a>
            </li>
            <li>
              <div className="w-fit cursor-arrow-circle flex items-center gap-4 text-sm text-[#EAEAEA] hover:text-[#999] transition-colors py-1 group">
                <div className="w-5 flex justify-center">
                  <Phone className="text-xl text-[#666] group-hover:text-[#999] transition-colors" size={20} />
                </div>
                <span className="tracking-wide">+62 812-3456-7890</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="h-[1px] bg-white/5 w-full my-8"></div>

        {/* Languages */}
        <div className="w-full">
          <div className="text-[11px] font-bold text-[#555] tracking-widest mb-4 uppercase">
            {t('languages')}
          </div>
          <div className="flex gap-6">
            {locales.map((loc) => (
              <div key={loc} className="flex items-center gap-2 text-sm text-[#ddd]">
                <span className="text-lg">{localeFlags[loc]}</span> {loc === 'en' ? 'English' : 'Indonesia'}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Links Footer */}
      <div className="mt-auto pt-6 flex justify-between items-center border-t border-white/5 w-full">
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.label}
              href={social.href}
              className="cursor-arrow-circle text-[#666] hover:text-white transition-colors duration-300"
              aria-label={social.label}
            >
              <Icon size={24} />
            </a>
          );
        })}
      </div>
    </aside>
  );
}
