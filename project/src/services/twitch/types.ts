export interface StreamData {
  isLive: boolean;
  viewers: number;
  title: string;
  thumbnailUrl: string;
}

export interface TwitchTokenResponse {
  access_token: string;
  expires_in: number;
}

export interface TwitchStream {
  user_login: string;
  type: string;
  viewer_count: number;
  thumbnail_url: string;
  title: string;
}