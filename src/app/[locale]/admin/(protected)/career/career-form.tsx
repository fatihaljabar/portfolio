/**
 * Career Form
 * Shared create/edit form for admin Career CRUD
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import type { CareerInput } from '@/lib/actions/admin-career';
import { ImageUploadField } from '../image-upload-field';

interface CareerFormProps {
  action: (data: CareerInput) => Promise<{ success: boolean; error?: string } | undefined>;
  defaultValues?: CareerInput;
  submitLabel: string;
}

const emptyValues: CareerInput = {
  positionEn: '',
  positionId: '',
  company: '',
  companyLogoUrl: '',
  employmentTypeEn: '',
  employmentTypeId: '',
  location: '',
  startDate: '',
  endDate: '',
  responsibilitiesEn: '',
  responsibilitiesId: '',
  learnedEn: '',
  learnedId: '',
  impactEn: '',
  impactId: '',
  isPublished: true,
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold text-gray-400 dark:text-[#666] tracking-widest uppercase">
      {children}
    </p>
  );
}

export function CareerForm({ action, defaultValues, submitLabel }: CareerFormProps) {
  const [form, setForm] = useState<CareerInput>(defaultValues ?? emptyValues);
  const [isCurrent, setIsCurrent] = useState(!defaultValues?.endDate);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await action({ ...form, endDate: isCurrent ? '' : form.endDate });

    if (result && !result.success) {
      setError(result.error ?? 'Something went wrong');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10 max-w-2xl">
      <section className="flex flex-col gap-6">
        <SectionLabel>Position</SectionLabel>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="positionEn">Position (English)</Label>
            <Input
              id="positionEn"
              value={form.positionEn}
              onChange={(e) => setForm((prev) => ({ ...prev, positionEn: e.target.value }))}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="positionId">Position (Indonesian)</Label>
            <Input
              id="positionId"
              value={form.positionId}
              onChange={(e) => setForm((prev) => ({ ...prev, positionId: e.target.value }))}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="employmentTypeEn">Employment type (English)</Label>
            <Input
              id="employmentTypeEn"
              value={form.employmentTypeEn}
              onChange={(e) => setForm((prev) => ({ ...prev, employmentTypeEn: e.target.value }))}
              placeholder="Part-time"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="employmentTypeId">Employment type (Indonesian)</Label>
            <Input
              id="employmentTypeId"
              value={form.employmentTypeId}
              onChange={(e) => setForm((prev) => ({ ...prev, employmentTypeId: e.target.value }))}
              placeholder="Paruh waktu"
              required
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <SectionLabel>Company</SectionLabel>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="company">Company name</Label>
            <Input
              id="company"
              value={form.company}
              onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={form.location}
              onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
              placeholder="Remote"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Company logo</Label>
          <ImageUploadField
            folder="career"
            value={form.companyLogoUrl ?? ''}
            onChange={(url) => setForm((prev) => ({ ...prev, companyLogoUrl: url }))}
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
              disabled={isCurrent}
              className="pr-8 disabled:opacity-50 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:top-1/2 [&::-webkit-calendar-picker-indicator]:-translate-y-1/2"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-[#999]">
          <input
            type="checkbox"
            checked={isCurrent}
            onChange={(e) => setIsCurrent(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 dark:border-white/20"
          />
          Currently working here
        </label>
      </section>

      <section className="flex flex-col gap-6">
        <SectionLabel>Details (Markdown)</SectionLabel>

        <div className="flex flex-col gap-2">
          <Label htmlFor="responsibilitiesEn">Responsibilities (English)</Label>
          <Textarea
            id="responsibilitiesEn"
            rows={5}
            value={form.responsibilitiesEn}
            onChange={(e) => setForm((prev) => ({ ...prev, responsibilitiesEn: e.target.value }))}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="responsibilitiesId">Responsibilities (Indonesian)</Label>
          <Textarea
            id="responsibilitiesId"
            rows={5}
            value={form.responsibilitiesId}
            onChange={(e) => setForm((prev) => ({ ...prev, responsibilitiesId: e.target.value }))}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="learnedEn">What I learned (English)</Label>
          <Textarea
            id="learnedEn"
            rows={4}
            value={form.learnedEn}
            onChange={(e) => setForm((prev) => ({ ...prev, learnedEn: e.target.value }))}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="learnedId">What I learned (Indonesian)</Label>
          <Textarea
            id="learnedId"
            rows={4}
            value={form.learnedId}
            onChange={(e) => setForm((prev) => ({ ...prev, learnedId: e.target.value }))}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="impactEn">Impact (English)</Label>
          <Textarea
            id="impactEn"
            rows={4}
            value={form.impactEn}
            onChange={(e) => setForm((prev) => ({ ...prev, impactEn: e.target.value }))}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="impactId">Impact (Indonesian)</Label>
          <Textarea
            id="impactId"
            rows={4}
            value={form.impactId}
            onChange={(e) => setForm((prev) => ({ ...prev, impactId: e.target.value }))}
            required
          />
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
