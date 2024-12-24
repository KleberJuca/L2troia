import axios from 'axios';
import { TWITCH_CONFIG } from '../../config/twitch';

interface TwitchTokenResponse {
  access_token: string;
  expires_in: number;
}

interface TwitchStream {
  user_login: string;
  type: string;
  viewer_count: number;
  thumbnail_url: string;
  title: string;
}

class TwitchService {
  private accessToken: string | null = null;
  private tokenExpiry: number | null = null;

  private async getAccessToken(): Promise<string> {
    if (!TWITCH_CONFIG.isConfigured) {
      throw new Error('Twitch credentials not configured');
    }

    // Check if token is still valid
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken;
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

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000);

      return this.accessToken;
    } catch (error) {
      console.error('Failed to get Twitch access token:', error);
      throw new Error('Failed to authenticate with Twitch');
    }
  }

  async getStreamStatus(username: string): Promise<{
    isLive: boolean;
    viewers: number;
    title: string;
    thumbnailUrl: string;
  }> {
    if (!username) {
      throw new Error('Username is required');
    }

    try {
      const token = await this.getAccessToken();
      const response = await axios.get(
        `https://api.twitch.tv/helix/streams?user_login=${encodeURIComponent(username)}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Client-Id': TWITCH_CONFIG.CLIENT_ID
          }
        }
      );

      const stream = response.data.data[0];
      
      return {
        isLive: Boolean(stream),
        viewers: stream?.viewer_count || 0,
        title: stream?.title || '',
        thumbnailUrl: stream?.thumbnail_url?.replace('{width}', '320').replace('{height}', '180') || ''
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.warn('Twitch API Error:', {
          status: error.response?.status,
          message: error.response?.data?.message || error.message
        });
      } else {
        console.warn('Twitch API Error:', error);
      }

      return {
        isLive: false,
        viewers: 0,
        title: '',
        thumbnailUrl: ''
      };
    }
  }
}

export const twitchService = new TwitchService();