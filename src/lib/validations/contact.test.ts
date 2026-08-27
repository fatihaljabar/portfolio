import { describe, expect, it } from 'vitest';
import { contactSchema } from './contact';

describe('contactSchema', () => {
  it('accepts a valid submission', () => {
    const result = contactSchema.safeParse({
      name: 'Fatih',
      email: 'fatih@example.com',
      message: 'Hello, I would like to get in touch.',
    });

    expect(result.success).toBe(true);
  });

  it('rejects a name that is too short', () => {
    const result = contactSchema.safeParse({
      name: 'F',
      email: 'fatih@example.com',
      message: 'Hello, I would like to get in touch.',
    });

    expect(result.success).toBe(false);
  });

  it('rejects an invalid email', () => {
    const result = contactSchema.safeParse({
      name: 'Fatih',
      email: 'not-an-email',
      message: 'Hello, I would like to get in touch.',
    });

    expect(result.success).toBe(false);
  });

  it('rejects a message that is too short', () => {
    const result = contactSchema.safeParse({
      name: 'Fatih',
      email: 'fatih@example.com',
      message: 'short',
    });

    expect(result.success).toBe(false);
  });
});
