/**
 * Image Upload Action
 * Uploads a project/achievement image to Supabase Storage (bucket `portfolio`)
 */

'use server';

import { randomUUID } from 'node:crypto';
import { createSupabaseServerClient, getAdminUser } from '@/lib/auth/server';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const EXTENSION_BY_TYPE: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

export async function uploadImage(formData: FormData) {
  const user = await getAdminUser();
  if (!user) {
    return { success: false as const, error: 'Unauthorized' };
  }

  const file = formData.get('file');
  const folder = formData.get('folder');

  if (!(file instanceof File)) {
    return { success: false as const, error: 'No file provided' };
  }
  if (folder !== 'projects' && folder !== 'achievements') {
    return { success: false as const, error: 'Invalid folder' };
  }

  const extension = EXTENSION_BY_TYPE[file.type];
  if (!extension) {
    return { success: false as const, error: 'Only JPEG, PNG, WebP, or GIF images are allowed' };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { success: false as const, error: 'Image must be 2MB or smaller' };
  }

  const path = `${folder}/${randomUUID()}.${extension}`;

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.storage.from('portfolio').upload(path, file, {
    contentType: file.type,
  });

  if (error) {
    console.error('Image upload failed:', error.message);
    return { success: false as const, error: 'Upload failed' };
  }

  const { data } = supabase.storage.from('portfolio').getPublicUrl(path);
  return { success: true as const, url: data.publicUrl };
}

const STORAGE_PATH_PREFIX = '/storage/v1/object/public/portfolio/';

/** Removes an old `portfolio` bucket image so replaced/deleted uploads don't pile up. */
export async function deleteStorageImage(url: string) {
  const index = url.indexOf(STORAGE_PATH_PREFIX);
  if (index === -1) {
    return;
  }

  const path = url.slice(index + STORAGE_PATH_PREFIX.length);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.storage.from('portfolio').remove([path]);

  if (error) {
    console.error('Failed to delete old image from storage:', error.message);
  }
}
