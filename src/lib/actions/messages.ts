/**
 * Message Admin Actions
 * Mark-as-read and delete for the contact form inbox
 */

'use server';

import { revalidatePath } from 'next/cache';
import { getAdminUser } from '@/lib/auth/server';
import { prisma } from '@/lib/prisma/client';

export async function markMessageAsRead(id: string) {
  const user = await getAdminUser();
  if (!user) {
    return { success: false, error: 'Unauthorized' };
  }

  await prisma.message.update({ where: { id }, data: { isRead: true } });
  revalidatePath('/[locale]/admin/messages', 'page');
  return { success: true };
}

export async function deleteMessage(id: string) {
  const user = await getAdminUser();
  if (!user) {
    return { success: false, error: 'Unauthorized' };
  }

  await prisma.message.delete({ where: { id } });
  revalidatePath('/[locale]/admin/messages', 'page');
  return { success: true };
}
