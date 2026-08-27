/**
 * Contact Form Validation
 * Kept separate from contact.ts because a 'use server' file can only
 * export async functions — a Zod schema can't live there.
 */

import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactInput = z.infer<typeof contactSchema>;
