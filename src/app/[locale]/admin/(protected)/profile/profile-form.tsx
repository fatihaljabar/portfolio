/**
 * Profile Form
 * Singleton form for the site profile behind Home's intro and About's
 * intro — no create/delete, just one record to edit
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ProfileInput } from '@/lib/actions/admin-profile';
import { ImageUploadField } from '../image-upload-field';

interface ProfileFormProps {
  action: (data: ProfileInput) => Promise<{ success: boolean; error?: string } | undefined>;
  defaultValues: ProfileInput;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold text-gray-400 dark:text-[#666] tracking-widest uppercase">
      {children}
    </p>
  );
}

export function ProfileForm({ action, defaultValues }: ProfileFormProps) {
  const [form, setForm] = useState<ProfileInput>(defaultValues);
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
        <SectionLabel>Photo</SectionLabel>
        <ImageUploadField
          folder="profile"
          value={form.photoUrl ?? ''}
          onChange={(url) => setForm((prev) => ({ ...prev, photoUrl: url }))}
        />
      </section>

      <section className="flex flex-col gap-6">
        <SectionLabel>Home Intro</SectionLabel>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="greetingEn">Greeting (English)</Label>
            <Input
              id="greetingEn"
              value={form.greetingEn}
              onChange={(e) => setForm((prev) => ({ ...prev, greetingEn: e.target.value }))}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="greetingId">Greeting (Indonesian)</Label>
            <Input
              id="greetingId"
              value={form.greetingId}
              onChange={(e) => setForm((prev) => ({ ...prev, greetingId: e.target.value }))}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="basedInEn">Based in (English)</Label>
            <Input
              id="basedInEn"
              value={form.basedInEn}
              onChange={(e) => setForm((prev) => ({ ...prev, basedInEn: e.target.value }))}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="basedInId">Based in (Indonesian)</Label>
            <Input
              id="basedInId"
              value={form.basedInId}
              onChange={(e) => setForm((prev) => ({ ...prev, basedInId: e.target.value }))}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="introEn">Intro (English, Markdown)</Label>
          <Textarea
            id="introEn"
            rows={5}
            value={form.introEn}
            onChange={(e) => setForm((prev) => ({ ...prev, introEn: e.target.value }))}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="introId">Intro (Indonesian, Markdown)</Label>
          <Textarea
            id="introId"
            rows={5}
            value={form.introId}
            onChange={(e) => setForm((prev) => ({ ...prev, introId: e.target.value }))}
            required
          />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <SectionLabel>About</SectionLabel>

        <div className="flex flex-col gap-2">
          <Label htmlFor="aboutContentEn">About content (English, Markdown)</Label>
          <Textarea
            id="aboutContentEn"
            rows={8}
            value={form.aboutContentEn}
            onChange={(e) => setForm((prev) => ({ ...prev, aboutContentEn: e.target.value }))}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="aboutContentId">About content (Indonesian, Markdown)</Label>
          <Textarea
            id="aboutContentId"
            rows={8}
            value={form.aboutContentId}
            onChange={(e) => setForm((prev) => ({ ...prev, aboutContentId: e.target.value }))}
            required
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="bestRegardsEn">Sign-off (English)</Label>
            <Input
              id="bestRegardsEn"
              value={form.bestRegardsEn}
              onChange={(e) => setForm((prev) => ({ ...prev, bestRegardsEn: e.target.value }))}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="bestRegardsId">Sign-off (Indonesian)</Label>
            <Input
              id="bestRegardsId"
              value={form.bestRegardsId}
              onChange={(e) => setForm((prev) => ({ ...prev, bestRegardsId: e.target.value }))}
              required
            />
          </div>
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
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}
