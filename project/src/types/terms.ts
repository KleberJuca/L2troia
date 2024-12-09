import { z } from 'zod';

export type TermsType = 'game' | 'donation';

export interface Terms {
  id: number;
  type: TermsType;
  content: string;
  updatedAt: string;
}

export const termsSchema = z.object({
  type: z.enum(['game', 'donation']),
  content: z.string()
    .min(10, "Terms content must be at least 10 characters")
    .max(10000, "Terms content cannot exceed 10000 characters")
});

export type TermsInput = z.infer<typeof termsSchema>;