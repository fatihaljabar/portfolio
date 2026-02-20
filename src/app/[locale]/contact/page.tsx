/**
 * Contact Page
 * Contact form and social media links
 */

'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import {
  Mail,
  Phone,
  Globe,
  Send,
  X,
  Instagram,
  Linkedin,
  Github,
  Video,
  ExternalLink,
} from 'lucide-react';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const socialCards = [
  {
    title: 'project_inquiry_title',
    description: 'project_inquiry_desc',
    email: 'mailto:hey@fatih.com',
    buttonText: 'send_email',
    buttonIcon: Send,
    gradient: 'from-red-900/40 via-[#1a1a1a] to-[#121212]',
    hoverBorder: 'hover:border-red-500/30',
    hoverShadow: 'hover:shadow-[0_0_30px_-10px_rgba(239,68,68,0.2)]',
    icon: Mail,
    iconColor: 'text-red-500/5',
    mdColSpan: 2,
    largeIcon: true,
  },
  {
    title: 'instagram_title',
    description: 'instagram_desc',
    buttonText: 'go_to_instagram',
    buttonIcon: ExternalLink,
    gradient: 'from-pink-900/30 via-[#1a1a1a] to-[#121212]',
    hoverBorder: 'hover:border-pink-500/30',
    icon: Instagram,
    iconColor: 'text-pink-500/5',
    href: '#',
    target: true,
  },
  {
    title: 'linkedin_title',
    description: 'linkedin_desc',
    buttonText: 'go_to_linkedin',
    buttonIcon: ExternalLink,
    gradient: 'from-blue-900/30 via-[#1a1a1a] to-[#121212]',
    hoverBorder: 'hover:border-blue-500/30',
    icon: Linkedin,
    iconColor: 'text-blue-500/5',
    href: '#',
    target: true,
  },
  {
    title: 'tiktok_title',
    description: 'tiktok_desc',
    buttonText: 'go_to_tiktok',
    buttonIcon: ExternalLink,
    gradient: 'from-teal-900/30 via-[#1a1a1a] to-[#121212]',
    hoverBorder: 'hover:border-teal-500/30',
    icon: Video,
    iconColor: 'text-teal-500/5',
    href: '#',
    target: true,
  },
  {
    title: 'github_title',
    description: 'github_desc',
    buttonText: 'go_to_github',
    buttonIcon: ExternalLink,
    gradient: 'from-slate-800/40 via-[#1a1a1a] to-[#121212]',
    hoverBorder: 'hover:border-white/20',
    icon: Github,
    iconColor: 'text-white/5',
    href: '#',
    target: true,
  },
];

export default function ContactPage() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    // Validate form
    try {
      contactSchema.parse(formData);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      return;
    }

    setIsSubmitting(true);

    // TODO: Implement server action to submit to Supabase
    // For now, simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="mb-10">
        <h2 className="text-4xl font-bold mb-4 text-white">{t('title')}</h2>
        <p className="text-[#888] text-sm max-w-2xl leading-relaxed">{t('subtitle')}</p>
      </div>

      <div className="h-[1px] border-t border-dashed border-[#333] w-full mb-10"></div>

      <div className="text-[11px] font-bold text-[#555] tracking-widest mb-6 uppercase">{t('social_media')}</div>

      {/* Social Media Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        {socialCards.map((card, index) => {
          const Icon = card.icon;
          const ButtonIcon = card.buttonIcon;
          return (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br ${card.gradient} border border-white/5 transition-all duration-300 ${card.hoverBorder} ${card.hoverShadow || ''} ${card.mdColSpan === 2 ? 'md:col-span-2' : ''}`}
            >
              <Icon className={`absolute -right-6 -bottom-6 text-[180px] ${card.iconColor} rotate-12 pointer-events-none group-hover:scale-110 transition-transform duration-500 ${card.largeIcon ? '' : 'text-[120px]'}`} />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{t(card.title)}</h3>
                  <p className="text-[#999] text-sm max-w-md leading-relaxed">{t(card.description)}</p>
                </div>
                {card.email ? (
                  <a
                    href={card.email}
                    className="shrink-0 flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors shadow-lg"
                  >
                    <ButtonIcon size={16} /> {t(card.buttonText)}
                  </a>
                ) : (
                  <a
                    href={card.href}
                    target={card.target ? '_blank' : undefined}
                    rel={card.target ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/10 px-4 py-2 rounded-lg text-xs font-bold hover:bg-white hover:text-black transition-all"
                  >
                    {t(card.buttonText)} <ButtonIcon size={14} />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Contact Form */}
      <div className="text-[11px] font-bold text-[#555] tracking-widest mb-6 uppercase">{t('send_message')}</div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-[#ccc]">
              {t('form.name_label')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={t('form.name_placeholder')}
              className={`w-full bg-[#151515] border rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent-blue/50 transition-all placeholder-[#555] ${errors.name ? 'border-red-500' : 'border-white/10 focus:border-accent-blue'}`}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-[#ccc]">
              {t('form.email_label')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={t('form.email_placeholder')}
              className={`w-full bg-[#151515] border rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent-blue/50 transition-all placeholder-[#555] ${errors.email ? 'border-red-500' : 'border-white/10 focus:border-accent-blue'}`}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-medium text-[#ccc]">
            {t('form.message_label')}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows="5"
            placeholder={t('form.message_placeholder')}
            className={`w-full bg-[#151515] border rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent-blue/50 transition-all placeholder-[#555] resize-none ${errors.message ? 'border-red-500' : 'border-white/10 focus:border-accent-blue'}`}
          />
          {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
        </div>

        {submitStatus === 'success' && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl text-sm">
            {t('form.success')}
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">
            {t('form.error')}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-white text-black font-bold text-sm py-4 rounded-xl hover:bg-gray-200 transition-colors shadow-lg active:scale-[0.99] transform duration-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : t('form.submit')}
        </button>
      </form>
    </>
  );
}
