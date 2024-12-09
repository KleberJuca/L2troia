import { CoinSettings, CoinSettingsInput } from '../../types/coins';

// In-memory storage for demo purposes
let coinSettings: CoinSettings = {
  id: 1,
  baseCurrency: 'USD',
  basePrice: 1.00,
  rates: {
    USD: 1.00,
    EUR: 0.92,
    BRL: 4.95
  },
  updatedAt: new Date().toISOString()
};

export const coinsService = {
  getCoinSettings: async (): Promise<CoinSettings> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return coinSettings;
  },

  updateCoinSettings: async (settings: CoinSettingsInput): Promise<CoinSettings> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    coinSettings = {
      ...coinSettings,
      ...settings,
      updatedAt: new Date().toISOString()
    };
    return coinSettings;
  }
};