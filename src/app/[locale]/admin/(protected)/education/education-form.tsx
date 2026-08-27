/**
 * Education Form
 * Shared create/edit form for admin Education CRUD
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import type { EducationInput } from '@/lib/actions/admin-education';
import { ImageUploadField } from '../image-upload-field';

interface EducationFormProps {
  action: (data: EducationInput) => Promise<{ success: boolean; error?: string } | undefined>;
  defaultValues?: EducationInput;
  submitLabel: string;
}

const emptyValues: EducationInput = {
  university: '',
  degreeEn: '',
  degreeId: '',
  gpaEn: '',
  gpaId: '',
  location: '',
  logoUrl: '',
  startDate: '',
  endDate: '',
  thesisLabelEn: '',
  thesisLabelId: '',
  thesisProjectTitleEn: '',
  thesisProjectTitleId: '',
  thesisDetailsEn: '',
  thesisDetailsId: '',
  thesisProjectSlug: '',
  thesisJournalUrl: '',
  thesisJournalLabelEn: '',
  thesisJournalLabelId: '',
  isPublished: true,
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold text-gray-400 dark:text-[#666] tracking-widest uppercase">
      {children}
    </p>
  );
}

export function EducationForm({ action, defaultValues, submitLabel }: EducationFormProps) {
  const [form, setForm] = useState<EducationInput>(defaultValues ?? emptyValues);
  const [isOngoing, setIsOngoing] = useState(!defaultValues?.endDate);
  const [hasThesis, setHasThesis] = useState(!!defaultValues?.thesisProjectTitleEn);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const payload: EducationInput = {
      ...form,
      endDate: isOngoing ? '' : form.endDate,
      ...(hasThesis
        ? {}
        : {
            thesisLabelEn: '',
            thesisLabelId: '',
            thesisProjectTitleEn: '',
            thesisProjectTitleId: '',
            thesisDetailsEn: '',
            thesisDetailsId: '',
            thesisProjectSlug: '',
            thesisJournalUrl: '',
            thesisJournalLabelEn: '',
            thesisJournalLabelId: '',
          }),
    };

    const result = await action(payload);

    if (result && !result.success) {
      setError(result.error ?? 'Something went wrong');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10 max-w-2xl">
      <section className="flex flex-col gap-6">
        <SectionLabel>Institution</SectionLabel>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="university">University</Label>
            <Input
              id="university"
              value={form.university}
              onChange={(e) => setForm((prev) => ({ ...prev, university: e.target.value }))}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={form.location}
              onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="degreeEn">Degree (English)</Label>
            <Input
              id="degreeEn"
              value={form.degreeEn}
              onChange={(e) => setForm((prev) => ({ ...prev, degreeEn: e.target.value }))}
              placeholder="Bachelor's degree • Informatics Engineering"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="degreeId">Degree (Indonesian)</Label>
            <Input
              id="degreeId"
              value={form.degreeId}
              onChange={(e) => setForm((prev) => ({ ...prev, degreeId: e.target.value }))}
              placeholder="Sarjana Teknik • Teknik Informatika"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="gpaEn">GPA label (English)</Label>
            <Input
              id="gpaEn"
              value={form.gpaEn}
              onChange={(e) => setForm((prev) => ({ ...prev, gpaEn: e.target.value }))}
              placeholder="GPA: 3.63/4.00"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="gpaId">GPA label (Indonesian)</Label>
            <Input
              id="gpaId"
              value={form.gpaId}
              onChange={(e) => setForm((prev) => ({ ...prev, gpaId: e.target.value }))}
              placeholder="IPK: 3.63/4.00"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Institution logo</Label>
          <ImageUploadField
            folder="education"
            value={form.logoUrl ?? ''}
            onChange={(url) => setForm((prev) => ({ ...prev, logoUrl: url }))}
          />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <SectionLabel>Duration</SectionLabel>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="startDate">Start date</Label>
            <Input
              id="startDate"
              type="date"
              value={form.startDate}
              onChange={(e) => setForm((prev) => ({ ...prev, startDate: e.target.value }))}
              className="pr-8 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:top-1/2 [&::-webkit-calendar-picker-indicator]:-translate-y-1/2"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="endDate">End date</Label>
            <Input
              id="endDate"
              type="date"
              value={form.endDate}
              onChange={(e) => setForm((prev) => ({ ...prev, endDate: e.target.value }))}
              disabled={isOngoing}
              className="pr-8 disabled:opacity-50 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:top-1/2 [&::-webkit-calendar-picker-indicator]:-translate-y-1/2"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-[#999]">
          <input
            type="checkbox"
            checked={isOngoing}
            onChange={(e) => setIsOngoing(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 dark:border-white/20"
          />
          Currently studying here
        </label>
      </section>

      <section className="flex flex-col rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Thesis / capstone</p>
            <p className="text-xs text-gray-500 dark:text-[#888]">
              Optional expandable details section on the public page
            </p>
          </div>
          <Switch
            checked={hasThesis}
            onCheckedChange={(checked: boolean) => setHasThesis(checked)}
          />
        </div>

        {hasThesis && (
          <div className="flex flex-col gap-6 px-5 py-5 border-t border-gray-200 dark:border-white/10">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="thesisLabelEn">Thesis type (English)</Label>
                <Input
                  id="thesisLabelEn"
                  value={form.thesisLabelEn}
                  onChange={(e) => setForm((prev) => ({ ...prev, thesisLabelEn: e.target.value }))}
                  placeholder="Undergraduate Thesis"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="thesisLabelId">Thesis type (Indonesian)</Label>
                <Input
                  id="thesisLabelId"
                  value={form.thesisLabelId}
                  onChange={(e) => setForm((prev) => ({ ...prev, thesisLabelId: e.target.value }))}
                  placeholder="Tugas Akhir"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="thesisProjectTitleEn">Thesis title (English)</Label>
              <Input
                id="thesisProjectTitleEn"
                value={form.thesisProjectTitleEn}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, thesisProjectTitleEn: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="thesisProjectTitleId">Thesis title (Indonesian)</Label>
              <Input
                id="thesisProjectTitleId"
                value={form.thesisProjectTitleId}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, thesisProjectTitleId: e.target.value }))
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="thesisDetailsEn">Thesis details (English, Markdown)</Label>
              <Textarea
                id="thesisDetailsEn"
                rows={5}
                value={form.thesisDetailsEn}
                onChange={(e) => setForm((prev) => ({ ...prev, thesisDetailsEn: e.target.value }))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="thesisDetailsId">Thesis details (Indonesian, Markdown)</Label>
              <Textarea
                id="thesisDetailsId"
                rows={5}
                value={form.thesisDetailsId}
                onChange={(e) => setForm((prev) => ({ ...prev, thesisDetailsId: e.target.value }))}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="thesisProjectSlug">Linked project slug</Label>
              <Input
                id="thesisProjectSlug"
                value={form.thesisProjectSlug}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, thesisProjectSlug: e.target.value }))
                }
                placeholder="sentiment-analysis-electric-vehicles"
              />
              <p className="text-xs text-gray-400 dark:text-[#666]">
                Slug of a project on this site — links to /projects/&lt;slug&gt;. Leave empty if
                none.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="thesisJournalUrl">Published journal URL</Label>
                <Input
                  id="thesisJournalUrl"
                  value={form.thesisJournalUrl}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, thesisJournalUrl: e.target.value }))
                  }
                  placeholder="https://..."
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="thesisJournalLabelEn">Journal citation (English)</Label>
                <Input
                  id="thesisJournalLabelEn"
                  value={form.thesisJournalLabelEn}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, thesisJournalLabelEn: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="thesisJournalLabelId">Journal citation (Indonesian)</Label>
                <Input
                  id="thesisJournalLabelId"
                  value={form.thesisJournalLabelId}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, thesisJournalLabelId: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>
        )}
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
