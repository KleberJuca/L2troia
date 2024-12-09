import { z } from 'zod';

export type Currency = 'USD' | 'EUR' | 'BRL';

export interface CoinSettings {
  id: number;
  baseCurrency: Currency;
  basePrice: number;
  rates: {
    [key in Currency]: number;
  };
  updatedAt: string;
}

export const coinSettingsSchema = z.object({
  baseCurrency: z.enum(['USD', 'EUR', 'BRL']),
  basePrice: z.number()
    .min(0.01, "Base price must be greater than 0")
    .max(1000, "Base price cannot exceed 1000"),
  rates: z.object({
    USD: z.number().min(0),
    EUR: z.number().min(0),
    BRL: z.number().min(0)
  })
});

export type CoinSettingsInput = z.infer<typeof coinSettingsSchema>;