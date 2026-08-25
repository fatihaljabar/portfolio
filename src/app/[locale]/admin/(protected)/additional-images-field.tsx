/**
 * Additional Images Field
 * Multi-file upload for a string[] of image URLs, with thumbnail previews
 * and per-image removal
 */

'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { uploadImage } from '@/lib/actions/upload';

interface AdditionalImagesFieldProps {
  folder: 'projects' | 'achievements';
  value: string[];
  onChange: (urls: string[]) => void;
}

export function AdditionalImagesField({ folder, value, onChange }: AdditionalImagesFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) {
      return;
    }

    setError(null);
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const result = await uploadImage(formData);
    setIsUploading(false);

    if (result.success) {
      onChange([...value, result.url]);
    } else {
      setError(result.error);
    }
  };

  const handleRemove = (url: string) => {
    onChange(value.filter((existing) => existing !== url));
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        disabled={isUploading}
        className="text-sm text-gray-500 dark:text-[#888] file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 dark:file:bg-white/10 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-gray-700 dark:file:text-[#ccc]"
      />
      <p className="text-xs text-gray-400 dark:text-[#666]">
        JPEG, PNG, WebP, or GIF · up to 2MB each
      </p>
      {isUploading && <p className="text-xs text-gray-500 dark:text-[#888]">Uploading...</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
      {value.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {value.map((url) => (
            <li
              key={url}
              className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 dark:border-white/10"
            >
              <Image src={url} alt="Additional preview" fill className="object-cover" />
              <button
                type="button"
                onClick={() => handleRemove(url)}
                aria-label="Remove image"
                className="absolute top-1 right-1 flex items-center justify-center w-6 h-6 rounded-full bg-black/60 text-white hover:bg-black/80"
              >
                <X size={12} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
