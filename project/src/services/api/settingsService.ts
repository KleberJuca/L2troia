import { ServerSettings, ServerSettingsInput } from '../../types/settings';

// In-memory storage for demo purposes
let serverSettings: ServerSettings = {
  chronicle: 'Interlude',
  expRate: 100,
  dropRate: 50,
  adenaRate: 1000,
  clientDownloadUrl: 'https://download.l2troia.com/client.zip',
  patchDownloadUrl: 'https://download.l2troia.com/patch.zip',
  clientVersion: '1.5.2',
  patchVersion: '1.2.0',
  clientSize: '4.2 GB',
  patchSize: '250 MB'
};

export const settingsService = {
  getServerSettings: async (): Promise<ServerSettings> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return serverSettings;
  },

  updateServerSettings: async (settings: ServerSettingsInput): Promise<ServerSettings> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    serverSettings = { ...serverSettings, ...settings };
    return serverSettings;
  }
};