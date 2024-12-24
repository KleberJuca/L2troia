import axios from 'axios';
import { TWITCH_CONFIG } from '../../config/twitch';
import { Cache } from './cache';
import { TwitchTokenResponse } from './types';

interface TokenData {
  token: string;
  expiresAt: number;
}

const TOKEN_CACHE = new Cache<TokenData>(3600000); // 1 hour TTL
const TOKEN_CACHE_KEY = 'twitch_token';

export async function getAccessToken(): Promise<string> {
  const cached = TOKEN_CACHE.get(TOKEN_CACHE_KEY);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.token;
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

    const tokenData: TokenData = {
      token: response.data.access_token,
      expiresAt: Date.now() + (response.data.expires_in * 1000) - 300000 // 5 minutes buffer
    };

    TOKEN_CACHE.set(TOKEN_CACHE_KEY, tokenData);
    return tokenData.token;
  } catch (error) {
    console.error('Failed to get Twitch access token:', error);
    throw error;
  }
}

export function clearToken(): void {
  TOKEN_CACHE.clear();
}