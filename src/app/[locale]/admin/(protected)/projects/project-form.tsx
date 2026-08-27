/**
 * Project Form
 * Shared create/edit form for admin Projects CRUD
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import type { ProjectInput } from '@/lib/actions/admin-projects';
import type { TechIconResult } from '@/lib/tech-icon-data';
import { CategorySelect } from '../category-select';
import { ImageUploadField } from '../image-upload-field';
import { ContentImageUploader } from './content-image-uploader';
import { TechStackCombobox } from './tech-stack-combobox';

interface ProjectFormProps {
  action: (data: ProjectInput) => Promise<{ success: boolean; error?: string } | undefined>;
  defaultValues?: ProjectInput;
  submitLabel: string;
  initialTechIcons?: Record<string, TechIconResult | null>;
  existingCategories?: string[];
}

const emptyValues: ProjectInput = {
  titleEn: '',
  titleId: '',
  descriptionEn: '',
  descriptionId: '',
  contentEn: '',
  contentId: '',
  imageUrl: '',
  githubUrl: '',
  demoUrl: '',
  techStack: [],
  category: '',
  isFeatured: false,
  isPublished: true,
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold text-gray-400 dark:text-[#666] tracking-widest uppercase">
      {children}
    </p>
  );
}

export function ProjectForm({
  action,
  defaultValues,
  submitLabel,
  initialTechIcons,
  existingCategories = [],
}: ProjectFormProps) {
  const [form, setForm] = useState<ProjectInput>(defaultValues ?? emptyValues);
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

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="titleEn">Title (English)</Label>
            <Input
              id="titleEn"
              value={form.titleEn}
              onChange={(e) => setForm((prev) => ({ ...prev, titleEn: e.target.value }))}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="titleId">Title (Indonesian)</Label>
            <Input
              id="titleId"
              value={form.titleId}
              onChange={(e) => setForm((prev) => ({ ...prev, titleId: e.target.value }))}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="descriptionEn">Description (English)</Label>
          <Textarea
            id="descriptionEn"
            rows={2}
            value={form.descriptionEn}
            onChange={(e) => setForm((prev) => ({ ...prev, descriptionEn: e.target.value }))}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="descriptionId">Description (Indonesian)</Label>
          <Textarea
            id="descriptionId"
            rows={2}
            value={form.descriptionId}
            onChange={(e) => setForm((prev) => ({ ...prev, descriptionId: e.target.value }))}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="contentEn">Content (English, Markdown)</Label>
          <Textarea
            id="contentEn"
            rows={12}
            value={form.contentEn}
            onChange={(e) => setForm((prev) => ({ ...prev, contentEn: e.target.value }))}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="contentId">Content (Indonesian, Markdown)</Label>
          <Textarea
            id="contentId"
            rows={12}
            value={form.contentId}
            onChange={(e) => setForm((prev) => ({ ...prev, contentId: e.target.value }))}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Content images</Label>
          <p className="text-xs text-gray-500 dark:text-[#888] -mt-1">
            Upload an image, then copy its markdown line into Content above wherever you want it to
            appear.
          </p>
          <ContentImageUploader />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <SectionLabel>Media &amp; Links</SectionLabel>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label>Image</Label>
            <ImageUploadField
              folder="projects"
              value={form.imageUrl ?? ''}
              onChange={(url) => setForm((prev) => ({ ...prev, imageUrl: url }))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Category</Label>
            <CategorySelect
              value={form.category ?? ''}
              onChange={(category) => setForm((prev) => ({ ...prev, category }))}
              existingCategories={existingCategories}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input
              id="githubUrl"
              value={form.githubUrl}
              onChange={(e) => setForm((prev) => ({ ...prev, githubUrl: e.target.value }))}
              placeholder="https://github.com/..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="demoUrl">Demo URL</Label>
            <Input
              id="demoUrl"
              value={form.demoUrl}
              onChange={(e) => setForm((prev) => ({ ...prev, demoUrl: e.target.value }))}
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Tech stack</Label>
          <TechStackCombobox
            value={form.techStack}
            onChange={(techStack) => setForm((prev) => ({ ...prev, techStack }))}
            initialIcons={initialTechIcons}
          />
        </div>
      </section>

      <section className="flex flex-col rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Featured</p>
            <p className="text-xs text-gray-500 dark:text-[#888]">
              Show at the top of the public list
            </p>
          </div>
          <Switch
            id="isFeatured"
            checked={form.isFeatured}
            onCheckedChange={(checked: boolean) =>
              setForm((prev) => ({ ...prev, isFeatured: checked }))
            }
          />
        </div>
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-t border-gray-200 dark:border-white/10">
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
