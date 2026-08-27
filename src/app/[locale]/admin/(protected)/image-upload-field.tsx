/**
 * Image Upload Field
 * File input that uploads to Supabase Storage via a Server Action and
 * reports the resulting public URL back to the parent form
 */

'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { deleteStorageImage, uploadImage } from '@/lib/actions/upload';

interface ImageUploadFieldProps {
  folder: 'projects' | 'achievements' | 'career' | 'education' | 'profile';
  value: string;
  onChange: (url: string) => void;
}

export function ImageUploadField({ folder, value, onChange }: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const savedValueRef = useRef(value);

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
      if (value && value !== savedValueRef.current) {
        await deleteStorageImage(value);
      }
      onChange(result.url);
    } else {
      setError(result.error);
    }
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
      <p className="text-xs text-gray-400 dark:text-[#666]">JPEG, PNG, WebP, or GIF · up to 2MB</p>
      {isUploading && <p className="text-xs text-gray-500 dark:text-[#888]">Uploading...</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
      {value && (
        <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200 dark:border-white/10">
          <Image src={value} alt="Preview" fill sizes="128px" className="object-cover" />
        </div>
      )}
    </div>
  );
}
