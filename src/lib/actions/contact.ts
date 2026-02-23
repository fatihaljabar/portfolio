/**
 * Contact Server Actions
 * Server actions for handling contact form submission to Supabase
 */

'use server';

import { prisma } from '@/lib/prisma/client';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactInput = z.infer<typeof contactSchema>;

/**
 * Submit contact form to Supabase
 */
export async function submitContactForm(data: ContactInput) {
  try {
    // Validate input
    const validatedData = contactSchema.parse(data);

    // Save to database
    const message = await prisma.message.create({
      data: validatedData,
    });

    return { success: true, messageId: message.id };
  } catch (error) {
    console.error('Error submitting contact form:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || 'Validation failed',
      };
    }

    return {
      success: false,
      error: 'Failed to submit message. Please try again.',
    };
  }
}
