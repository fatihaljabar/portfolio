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
import { ImageUploadField } from '../image-upload-field';

interface ProjectFormProps {
  action: (data: ProjectInput) => Promise<{ success: boolean; error?: string } | undefined>;
  defaultValues?: ProjectInput;
  submitLabel: string;
}

const emptyValues: ProjectInput = {
  title: '',
  description: '',
  content: '',
  imageUrl: '',
  githubUrl: '',
  demoUrl: '',
  techStack: [],
  category: '',
  isFeatured: false,
  isPublished: true,
};

export function ProjectForm({ action, defaultValues, submitLabel }: ProjectFormProps) {
  const [form, setForm] = useState<ProjectInput>(defaultValues ?? emptyValues);
  const [techStackText, setTechStackText] = useState(
    (defaultValues ?? emptyValues).techStack.join(', '),
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const techStack = techStackText
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const result = await action({ ...form, techStack });

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
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="content">Content (Markdown)</Label>
        <Textarea
          id="content"
          rows={12}
          value={form.content}
          onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
          required
        />
      </div>

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
          <Input
            id="category"
            value={form.category}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
            placeholder="Web App"
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
        <Label htmlFor="techStack">Tech stack (comma-separated)</Label>
        <Input
          id="techStack"
          value={techStackText}
          onChange={(e) => setTechStackText(e.target.value)}
          placeholder="React, TypeScript, Prisma"
        />
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <Switch
            id="isFeatured"
            checked={form.isFeatured}
            onCheckedChange={(checked: boolean) =>
              setForm((prev) => ({ ...prev, isFeatured: checked }))
            }
          />
          <Label htmlFor="isFeatured">Featured</Label>
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
