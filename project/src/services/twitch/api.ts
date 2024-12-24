import axios from 'axios';
import { TWITCH_CONFIG } from '../../config/twitch';
import { getAccessToken, clearToken } from './token';
import { Cache } from './cache';
import { StreamData, TwitchStream } from './types';

const STREAM_CACHE = new Cache<StreamData>(60000); // 1 minute TTL
const DEFAULT_THUMBNAIL = '/images/stream-thumbnail.jpg';

export async function getStreamStatus(username: string): Promise<StreamData> {
  if (!username) {
    throw new Error('Username is required');
  }

  const cached = STREAM_CACHE.get(username);
  if (cached) return cached;

  try {
    const token = await getAccessToken();
    
    const response = await axios.get<{ data: TwitchStream[] }>(
      `https://api.twitch.tv/helix/streams?user_login=${encodeURIComponent(username)}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Client-Id': TWITCH_CONFIG.CLIENT_ID
        }
      }
    );

    const stream = response.data.data[0];
    const streamData: StreamData = stream ? {
      isLive: true,
      viewers: stream.viewer_count,
      title: stream.title,
      thumbnailUrl: stream.thumbnail_url
        .replace('{width}', '320')
        .replace('{height}', '180')
    } : {
      isLive: false,
      viewers: 0,
      title: '',
      thumbnailUrl: DEFAULT_THUMBNAIL
    };

    STREAM_CACHE.set(username, streamData);
    return streamData;

  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      clearToken();
    }
    throw error;
  }
}