import { HttpClient } from './http';

interface ConfigData {
  api: {
    baseUrl: string;
    defaultHeaders: { [key: string]: string };
  };
}

export class ConfigProvider {
  private static _config: ConfigData | undefined;

  static get config(): ConfigData {
    if (!this._config)
      throw new Error('Configuração não carregada. Verifique se foi inicializada.');
    return this._config;
  }

  static async initialize(): Promise<void> {
    if (!this._config) {
      const response = await HttpClient.get<ConfigData>(`${window.location.origin}/config.json`);
      this._config = response.data;
    }
  }
}
