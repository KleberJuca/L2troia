const CLIENT_ID = import.meta.env.VITE_TWITCH_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_TWITCH_CLIENT_SECRET;

export const TWITCH_CONFIG = {
  CLIENT_ID,
  CLIENT_SECRET,
  isConfigured: Boolean(CLIENT_ID && CLIENT_SECRET)
} as const;