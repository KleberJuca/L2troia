export interface ServerSettings {
  chronicle: string;
  expRate: number;
  dropRate: number;
  adenaRate: number;
  clientDownloadUrl: string;
  patchDownloadUrl: string;
  clientVersion: string;
  patchVersion: string;
  clientSize: string;
  patchSize: string;
}

export interface ServerSettingsInput {
  chronicle?: string;
  expRate?: number;
  dropRate?: number;
  adenaRate?: number;
  clientDownloadUrl?: string;
  patchDownloadUrl?: string;
  clientVersion?: string;
  patchVersion?: string;
  clientSize?: string;
  patchSize?: string;
}