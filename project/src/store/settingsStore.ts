import { create } from 'zustand';
import { ServerSettings } from '../types/settings';

interface SettingsState {
  settings: ServerSettings | null;
  setSettings: (settings: ServerSettings) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: null,
  setSettings: (settings) => set({ settings }),
}));