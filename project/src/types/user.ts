import { z } from 'zod';

export interface User {
  id: number;
  username: string;
  email: string;
  status: 'active' | 'banned';
  lastLogin: string;
  createdAt: string;
  banReason?: string;
  balance: number;
}

export interface UserUpdateInput {
  email?: string;
  status?: 'active' | 'banned';
  banReason?: string;
  balance?: number;
}

export const balanceUpdateSchema = z.object({
  amount: z.number()
    .min(-1000000, "Amount cannot be less than -1,000,000")
    .max(1000000, "Amount cannot be more than 1,000,000"),
  reason: z.string()
    .min(3, "Reason must be at least 3 characters")
    .max(200, "Reason cannot exceed 200 characters")
});

export type BalanceUpdateInput = z.infer<typeof balanceUpdateSchema>;