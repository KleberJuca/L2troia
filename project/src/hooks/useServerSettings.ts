import { useState, useCallback } from 'react';
import { ServerSettings, ServerSettingsInput } from '../types/settings';
import { settingsService } from '../services/api/settingsService';
import { useSettingsStore } from '../store/settingsStore';
import { useEffect } from 'react';

export const useServerSettings = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { settings, setSettings } = useSettingsStore();

  const loadSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await settingsService.getServerSettings();
      setSettings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  }, [setSettings]);

  const updateSettings = async (data: ServerSettingsInput) => {
    try {
      setLoading(true);
      setError(null);
      const updatedSettings = await settingsService.updateServerSettings(data);
      setSettings(updatedSettings);
      return updatedSettings;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update settings');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!settings) {
      loadSettings();
    }
  }, [settings, loadSettings]);

  return {
    settings,
    loading,
    error,
    loadSettings,
    updateSettings
  };
};