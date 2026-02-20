/**
 * Project Detail Page
 * Detailed view of a single project
 */

'use client';

import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeft, Box } from 'lucide-react';
import { Link, useRouter } from '@/lib/i18n/navigation';
import Image from 'next/image';

// Mock data - in real app, fetch from Supabase based on slug
const mockProject = {
  slug: 'presence-system',
  title: 'Presence Internal System',
  description: `The Presence Internal System is a custom-built attendance tracking backend developed for internal use at Parto ID. Built using Golang, this system provides secure and efficient API endpoints to handle employee check-ins, complete with photo verification and timestamp logging.`,
  techStack: [
    { name: 'Go', color: 'text-[#00ADD8]', bg: 'bg-[#00ADD8]/10', border: 'border-[#00ADD8]/20' },
    { name: 'Docker', color: 'text-[#2496ED]', bg: 'bg-[#2496ED]/10', border: 'border-[#2496ED]/20' },
  ],
  imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop',
};

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const t = useTranslations('project_detail');
  const locale = useLocale();
  const router = useRouter();

  return (
    <>
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-[#888] hover:text-white transition-colors mb-8 group font-medium text-sm"
      >
        <ArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform duration-300" size={16} />
        {t('back')}
      </Link>

      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">{mockProject.title}</h2>

      <p className="text-[#888] leading-loose text-lg mb-10 max-w-4xl">{mockProject.description}</p>

      <div className="border-t border-dashed border-[#333] w-full py-6 mb-8 flex items-center gap-4">
        <span className="text-white font-bold text-sm">{t('tech_stack')} :</span>
        <div className="flex gap-3">
          {mockProject.techStack.map((tech, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-full ${tech.bg} flex items-center justify-center border ${tech.border}`}
              title={tech.name}
            >
              <Box className={tech.color} size={16} />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full rounded-2xl overflow-hidden border border-white/5 bg-[#0d2d2a] relative group shadow-2xl">
        <div className="relative w-full aspect-[16/9]">
          <Image
            src={mockProject.imageUrl}
            alt="Presence System Mockup"
            fill
            className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
          />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 bg-black/20 pointer-events-none">
          <h3 className="text-4xl font-bold text-white drop-shadow-lg mb-8">Presensi Internal System</h3>
          <div className="w-[200px] h-[400px] bg-black/80 rounded-[2rem] border-4 border-gray-800 shadow-2xl flex items-center justify-center overflow-hidden">
            <div className="text-white text-xs opacity-50">App Screen</div>
          </div>
        </div>
      </div>
    </>
  );
}
