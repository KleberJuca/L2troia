import { z } from 'zod';

export interface Stream {
  id: number;
  username: string;
  title: string;
  viewers: number;
  thumbnailUrl: string;
  isLive: boolean;
  addedAt: string;
}

export const streamSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username cannot exceed 50 characters"),
  title: z.string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),
  thumbnailUrl: z.string().url("Must be a valid URL")
});

export type StreamInput = z.infer<typeof streamSchema>;