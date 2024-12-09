import { useState } from 'react';
import { CoinSettings, CoinSettingsInput } from '../types/coins';
import { coinsService } from '../services/api/coinsService';

export const useCoinsManagement = () => {
  const [settings, setSettings] = useState<CoinSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await coinsService.getCoinSettings();
      setSettings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load coin settings');
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (data: CoinSettingsInput) => {
    try {
      setLoading(true);
      setError(null);
      const updatedSettings = await coinsService.updateCoinSettings(data);
      setSettings(updatedSettings);
      return updatedSettings;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update coin settings');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    settings,
    loading,
    error,
    loadSettings,
    updateSettings
  };
};