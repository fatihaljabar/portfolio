/**
 * Achievement Form
 * Shared create/edit form for admin Achievements CRUD
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import type { AchievementInput } from '@/lib/actions/admin-achievements';

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
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
          <select
            id="type"
            value={form.type}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, type: e.target.value as AchievementInput['type'] }))
            }
            className={inputClassName}
          >
            {typeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="issuedDate">Issued date</Label>
          <Input
            id="issuedDate"
            type="date"
            value={form.issuedDate}
            onChange={(e) => setForm((prev) => ({ ...prev, issuedDate: e.target.value }))}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={form.category}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
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
        <div className="flex flex-col gap-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            value={form.imageUrl}
            onChange={(e) => setForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Switch
          id="isPublished"
          checked={form.isPublished}
          onCheckedChange={(checked: boolean) =>
            setForm((prev) => ({ ...prev, isPublished: checked }))
          }
        />
        <Label htmlFor="isPublished">Published</Label>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-fit bg-gray-900 dark:bg-white text-white dark:text-black font-bold px-6 py-3 hover:bg-gray-800 dark:hover:bg-gray-200"
      >
        {isSubmitting ? 'Saving...' : submitLabel}
      </Button>
    </form>
  );
}
