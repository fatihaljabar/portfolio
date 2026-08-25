/**
 * Achievement Form
 * Shared create/edit form for admin Achievements CRUD
 */

'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import type { AchievementInput } from '@/lib/actions/admin-achievements';
import { cn } from '@/lib/utils';
import { AdditionalImagesField } from '../additional-images-field';
import { ImageUploadField } from '../image-upload-field';

interface AchievementFormProps {
  action: (data: AchievementInput) => Promise<{ success: boolean; error?: string } | undefined>;
  defaultValues?: AchievementInput;
  submitLabel: string;
}

const emptyValues: AchievementInput = {
  title: '',
  description: '',
  issuer: '',
  certificateNumber: '',
  credentialUrl: '',
  imageUrl: '',
  additionalImages: [],
  issuedDate: '',
  type: 'CERTIFICATION',
  category: '',
  isPublished: true,
};

const typeOptions: AchievementInput['type'][] = [
  'PROFESSIONAL',
  'ACADEMIC',
  'COURSE',
  'BOOTCAMP',
  'CERTIFICATION',
];

const inputClassName =
  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold text-gray-400 dark:text-[#666] tracking-widest uppercase">
      {children}
    </p>
  );
}

export function AchievementForm({ action, defaultValues, submitLabel }: AchievementFormProps) {
  const [form, setForm] = useState<AchievementInput>(defaultValues ?? emptyValues);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await action(form);

    if (result && !result.success) {
      setError(result.error ?? 'Something went wrong');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10 max-w-2xl">
      <section className="flex flex-col gap-6">
        <SectionLabel>Basics</SectionLabel>

        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            rows={2}
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="issuer">Issuer</Label>
            <Input
              id="issuer"
              value={form.issuer}
              onChange={(e) => setForm((prev) => ({ ...prev, issuer: e.target.value }))}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <div className="relative">
              <select
                id="type"
                value={form.type}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    type: e.target.value as AchievementInput['type'],
                  }))
                }
                className={cn(inputClassName, 'appearance-none pr-8')}
              >
                {typeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#666]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="issuedDate">Issued date</Label>
            <div className="relative">
              <Input
                id="issuedDate"
                type="date"
                value={form.issuedDate}
                onChange={(e) => setForm((prev) => ({ ...prev, issuedDate: e.target.value }))}
                className="pr-8 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:top-1/2 [&::-webkit-calendar-picker-indicator]:-translate-y-1/2"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <SectionLabel>Media &amp; Credential</SectionLabel>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label>Image</Label>
            <ImageUploadField
              folder="achievements"
              value={form.imageUrl ?? ''}
              onChange={(url) => setForm((prev) => ({ ...prev, imageUrl: url }))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Additional images</Label>
            <p className="text-xs text-gray-500 dark:text-[#888] -mt-1">
              Shown as a slideshow after the main image on the public site
            </p>
            <AdditionalImagesField
              folder="achievements"
              value={form.additionalImages}
              onChange={(urls) => setForm((prev) => ({ ...prev, additionalImages: urls }))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="certificateNumber">Certificate number</Label>
            <Input
              id="certificateNumber"
              value={form.certificateNumber}
              onChange={(e) => setForm((prev) => ({ ...prev, certificateNumber: e.target.value }))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="credentialUrl">Credential URL</Label>
            <Input
              id="credentialUrl"
              value={form.credentialUrl}
              onChange={(e) => setForm((prev) => ({ ...prev, credentialUrl: e.target.value }))}
              placeholder="https://..."
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Published</p>
            <p className="text-xs text-gray-500 dark:text-[#888]">Visible on the public site</p>
          </div>
          <Switch
            id="isPublished"
            checked={form.isPublished}
            onCheckedChange={(checked: boolean) =>
              setForm((prev) => ({ ...prev, isPublished: checked }))
            }
          />
        </div>
      </section>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center gap-3 pt-2 border-t border-gray-200 dark:border-white/10">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-fit mt-6 bg-gray-900 dark:bg-white text-white dark:text-black font-bold px-6 py-3 hover:bg-gray-800 dark:hover:bg-gray-200"
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </Button>
      </div>
    </form>
  );
}
