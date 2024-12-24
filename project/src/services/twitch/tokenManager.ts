import axios from 'axios';
import { TwitchTokenResponse } from './types';
import { TWITCH_CONFIG } from '../../config/twitch';

class TokenManager {
  private token: string | null = null;
  private expiryTime: number | null = null;

  private isTokenValid(): boolean {
    return Boolean(
      this.token && 
      this.expiryTime && 
      Date.now() < this.expiryTime
    );
  }

  async getToken(): Promise<string> {
    if (this.isTokenValid()) {
      return this.token!;
    }

    if (!TWITCH_CONFIG.isConfigured) {
      throw new Error('Twitch credentials not configured');
    }

    try {
      const response = await axios.post<TwitchTokenResponse>(
        'https://id.twitch.tv/oauth2/token',
        null,
        {
          params: {
            client_id: TWITCH_CONFIG.CLIENT_ID,
            client_secret: TWITCH_CONFIG.CLIENT_SECRET,
            grant_type: 'client_credentials'
          }
        }
      );

      this.token = response.data.access_token;
      // Set expiry 5 minutes before actual expiry for safety
      this.expiryTime = Date.now() + ((response.data.expires_in - 300) * 1000);

      return this.token;
    } catch (error) {
      console.error('Failed to get Twitch access token:', error);
      throw new Error('Failed to authenticate with Twitch');
    }
  }

  clearToken(): void {
    this.token = null;
    this.expiryTime = null;
  }
}

export const tokenManager = new TokenManager();