import { ConfigProvider } from '../../services/_config/configProvider';
import { sha1ToBase64 } from '../../utils/crypto';

interface LoginRequest {
  login: string;
  password: string;
}

interface LoginResponse {
  message: string;
  login: string;
  accessLevel: number;
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const hashedPassword = await sha1ToBase64(credentials.password);

      // Obtém a URL base da configuração
      const baseUrl = ConfigProvider.config.api.baseUrl;
      const url = `${baseUrl}/Login/Login`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: credentials.login,
          password: hashedPassword,
        }),
      });

      const text = await response.text();
      let data;

      try {
        data = text ? JSON.parse(text) : null;
      } catch (e) {
        console.error('Falha ao analisar a resposta:', text);
        throw new Error('Resposta inválida do servidor');
      }

      if (!response.ok || !data) {
        throw new Error(data?.message || 'Falha no login');
      }

      return {
        message: data.message || 'Login bem-sucedido',
        login: data.login,
        accessLevel: Number(data.accessLevel) || 0,
      };
    } catch (error) {
      console.error('Erro no login:', error);
      throw error instanceof Error ? error : new Error('Falha no login');
    }
  },
};
