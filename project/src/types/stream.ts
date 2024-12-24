import { z } from 'zod';

export interface Stream {
  id: number;
  username: string;
  title: string;
  isLive: boolean;
  viewers: number;
  addedAt: string;
  isBlocked: boolean;
}

export const streamSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username cannot exceed 50 characters")
});

export type StreamInput = z.infer<typeof streamSchema>;