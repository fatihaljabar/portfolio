/**
 * Content Image Uploader
 * Uploads one or more images to Supabase Storage and hands back a
 * markdown snippet for each — the admin pastes it into Content wherever
 * they want the image to appear, instead of hand-writing markdown and
 * hosting the file themselves.
 */

'use client';

import { Check, Copy } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { uploadImage } from '@/lib/actions/upload';

interface UploadedImage {
  url: string;
  markdown: string;
}

export function ContentImageUploader() {
  const [items, setItems] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = '';
    if (files.length === 0) {
      return;
    }

    setError(null);
    setIsUploading(true);

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'projects');

      const result = await uploadImage(formData);
      if (result.success) {
        setItems((prev) => [...prev, { url: result.url, markdown: `![](${result.url})` }]);
      } else {
        setError(result.error);
      }
    }

    setIsUploading(false);
  };

  const handleCopy = async (item: UploadedImage) => {
    await navigator.clipboard.writeText(item.markdown);
    setCopiedUrl(item.url);
    setTimeout(() => setCopiedUrl((current) => (current === item.url ? null : current)), 1500);
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        onChange={handleFilesChange}
        disabled={isUploading}
        className="text-sm text-gray-500 dark:text-[#888] file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 dark:file:bg-white/10 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-gray-700 dark:file:text-[#ccc]"
      />
      <p className="text-xs text-gray-400 dark:text-[#666]">
        JPEG, PNG, WebP, or GIF · up to 2MB each
      </p>
      {isUploading && <p className="text-xs text-gray-500 dark:text-[#888]">Uploading...</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}

      {items.length > 0 && (
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li
              key={item.url}
              className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-white/10 p-2"
            >
              <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-100 dark:bg-white/5">
                <Image src={item.url} alt="" fill className="object-cover" />
              </div>
              <code className="flex-1 min-w-0 truncate text-xs text-gray-500 dark:text-[#888]">
                {item.markdown}
              </code>
              <button
                type="button"
                onClick={() => handleCopy(item)}
                className="shrink-0 flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg text-gray-500 dark:text-[#888] hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                {copiedUrl === item.url ? <Check size={14} /> : <Copy size={14} />}
                {copiedUrl === item.url ? 'Copied' : 'Copy'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
