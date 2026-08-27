/**
 * Contact Client Component
 * Contact form and social media links
 */

'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { SiTiktok } from 'react-icons/si';
import { z } from 'zod';
import { Tooltip } from '@/components/components/tooltip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { submitContactForm } from '@/lib/actions/contact';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const iconHoverProps = {
  whileHover: { scale: 1.15, rotate: [0, -5, 5, -5, 0] },
  transition: { duration: 0.4, ease: 'easeInOut' as const },
};

const socialLinks = [
  {
    label: 'Instagram',
    title: 'instagram_title',
    icon: Instagram,
    href: 'https://www.instagram.com/fatihaljabar/',
  },
  {
    label: 'LinkedIn',
    title: 'linkedin_title',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/fatihaljabar/',
  },
  {
    label: 'TikTok',
    title: 'tiktok_title',
    icon: SiTiktok,
    href: 'https://www.tiktok.com/@fatihaljabarr',
  },
  {
    label: 'GitHub',
    title: 'github_title',
    icon: Github,
    href: 'https://github.com/fatihaljabar',
  },
];

export function ContactClient() {
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
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as keyof ContactFormData] = issue.message;
          }
        });
        setErrors(fieldErrors);
      }
      return;
    }

    setIsSubmitting(true);

    // Submit to server
    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
        // Show server validation error if any
        if (result.error) {
          console.error('Server error:', result.error);
        }
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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

      <div className="text-[11px] font-bold text-gray-500 dark:text-[#888] tracking-widest mb-6 uppercase">
        {t('social_media')}
      </div>

      {/* Social Media */}
      <div className="mb-16 space-y-3">
        <a
          href="mailto:fatihaljabar@gmail.com"
          className="group flex items-center justify-between gap-4 rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#121212] p-5 sm:p-6 transition-all duration-300 hover:border-accent-blue/30 hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white transition-colors group-hover:bg-accent-blue/10 group-hover:text-accent-blue">
              <motion.div {...iconHoverProps}>
                <Mail size={18} />
              </motion.div>
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-gray-900 dark:text-white truncate">
                {t('project_inquiry_title')}
              </h3>
              <p className="text-gray-500 dark:text-[#888] text-sm truncate">
                {t('project_inquiry_desc')}
              </p>
            </div>
          </div>
          <ArrowUpRight
            className="shrink-0 text-gray-400 dark:text-[#666] group-hover:text-accent-blue transition-colors"
            size={18}
          />
        </a>

        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-4 gap-3">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <Tooltip key={social.label} label={t(social.title)} className="w-full">
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center gap-3 rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#121212] p-4 transition-all duration-300 hover:border-accent-blue/30 hover:-translate-y-0.5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-[#ccc] transition-colors group-hover:bg-accent-blue/10 group-hover:text-accent-blue">
                    <motion.div {...iconHoverProps}>
                      <Icon size={16} />
                    </motion.div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-[#ccc] truncate">
                    {social.label}
                  </span>
                </a>
              </Tooltip>
            );
          })}
        </div>
      </div>

      {/* Contact Form */}
      <div className="text-[11px] font-bold text-gray-500 dark:text-[#888] tracking-widest mb-6 uppercase">
        {t('send_message')}
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-gray-700 dark:text-[#ccc]">
              {t('form.name_label')}
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={t('form.name_placeholder')}
              className={`bg-gray-100 dark:bg-[#151515] border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-[#555] focus-visible:ring-accent-blue/50 ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-gray-700 dark:text-[#ccc]">
              {t('form.email_label')}
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={t('form.email_placeholder')}
              className={`bg-gray-100 dark:bg-[#151515] border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-[#555] focus-visible:ring-accent-blue/50 ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="message" className="text-gray-700 dark:text-[#ccc]">
            {t('form.message_label')}
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={5}
            placeholder={t('form.message_placeholder')}
            className={`bg-gray-100 dark:bg-[#151515] border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-[#555] focus-visible:ring-accent-blue/50 resize-none ${errors.message ? 'border-red-500' : ''}`}
          />
          {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
        </div>

        {submitStatus === 'success' && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 px-4 py-3 rounded-xl text-sm">
            {t('form.success')}
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
            {t('form.error')}
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-sm py-6 hover:bg-gray-800 dark:hover:bg-gray-200 shadow-lg"
        >
          {isSubmitting ? 'Sending...' : t('form.submit')}
        </Button>
      </form>
    </>
  );
}
