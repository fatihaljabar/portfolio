/**
 * Skill Form
 * Shared create/edit form for admin Skills CRUD
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import type { SkillInput } from '@/lib/actions/admin-skills';
import type { TechIconResult } from '@/lib/tech-icon-data';
import { CategorySelect } from '../category-select';
import { SkillBadgePreview } from './skill-badge-preview';
import { SkillNameCombobox } from './skill-name-combobox';

interface SkillFormProps {
  action: (data: SkillInput) => Promise<{ success: boolean; error?: string } | undefined>;
  defaultValues?: SkillInput;
  submitLabel: string;
  existingCategories?: string[];
  initialIcon?: TechIconResult | null;
}

const emptyValues: SkillInput = {
  name: '',
  category: '',
  color: '#A3A3A3',
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold text-gray-400 dark:text-[#666] tracking-widest uppercase">
      {children}
    </p>
  );
}

export function SkillForm({
  action,
  defaultValues,
  submitLabel,
  existingCategories = [],
  initialIcon = null,
}: SkillFormProps) {
  const [form, setForm] = useState<SkillInput>(defaultValues ?? emptyValues);
  const [icon, setIcon] = useState<TechIconResult | null>(initialIcon);
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
        <SectionLabel>Skill</SectionLabel>

        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <SkillNameCombobox
            name={form.name}
            onNameChange={(name) => setForm((prev) => ({ ...prev, name }))}
            onIconPick={(_name, result) => {
              setIcon(result);
              setForm((prev) => ({ ...prev, color: result.color }));
            }}
            previewIcon={icon}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label>Category</Label>
            <CategorySelect
              value={form.category}
              onChange={(category) => setForm((prev) => ({ ...prev, category }))}
              existingCategories={existingCategories}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="color">Color</Label>
            <div className="flex h-9 items-center gap-2 rounded-md border border-input bg-transparent pl-1 pr-3 shadow-sm">
              <input
                id="color"
                type="color"
                value={form.color}
                onChange={(e) => setForm((prev) => ({ ...prev, color: e.target.value }))}
                className="h-7 w-9 shrink-0 cursor-pointer rounded border-0 bg-transparent p-0"
              />
              <input
                type="text"
                value={form.color}
                onChange={(e) => setForm((prev) => ({ ...prev, color: e.target.value }))}
                placeholder="#61DAFB"
                className="h-full flex-1 bg-transparent text-sm outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Preview</Label>
          <SkillBadgePreview name={form.name || 'Skill'} color={form.color} icon={icon} />
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
