import { StreamerStats, StreamSession } from '../../types/streamHistory';

// In-memory storage for demo purposes
let streamHistory: StreamerStats[] = [
  {
    username: "carolzinhasg",
    totalSessions: 152,
    totalStreamTime: 45600, // in minutes
    highestPeakViewers: 1245,
    averageViewers: 856,
    lastStreamDate: new Date().toISOString(),
    sessions: [
      {
        id: "1",
        startTime: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
        endTime: new Date().toISOString(),
        peakViewers: 1245,
        averageViewers: 980,
        duration: 120,
        isLive: true
      },
      {
        id: "2",
        startTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        endTime: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
        peakViewers: 1100,
        averageViewers: 850,
        duration: 240,
        isLive: false
      }
    ]
  },
  {
    username: "alanzoka",
    totalSessions: 89,
    totalStreamTime: 32400,
    highestPeakViewers: 2500,
    averageViewers: 1200,
    lastStreamDate: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    sessions: [
      {
        id: "3",
        startTime: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        endTime: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
        peakViewers: 2200,
        averageViewers: 1800,
        duration: 240,
        isLive: false
      }
    ]
  }
];

export const streamHistoryService = {
  getStreamerStats: async (username: string): Promise<StreamerStats | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return streamHistory.find(s => s.username.toLowerCase() === username.toLowerCase()) || null;
  },

  getAllStreamersStats: async (): Promise<StreamerStats[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return streamHistory;
  },

  recordStreamSession: async (username: string, session: Omit<StreamSession, 'id'>): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const streamer = streamHistory.find(s => s.username.toLowerCase() === username.toLowerCase());
    const newSession = {
      ...session,
      id: Math.random().toString(36).substr(2, 9)
    };

    if (streamer) {
      // Update existing streamer stats
      streamer.sessions.unshift(newSession);
      streamer.totalSessions += 1;
      streamer.totalStreamTime += session.duration;
      streamer.highestPeakViewers = Math.max(streamer.highestPeakViewers, session.peakViewers);
      streamer.lastStreamDate = session.endTime;
      
      // Recalculate average viewers
      const totalViewers = streamer.sessions.reduce((sum, s) => sum + s.averageViewers, 0);
      streamer.averageViewers = Math.round(totalViewers / streamer.sessions.length);
    } else {
      // Create new streamer stats
      streamHistory.push({
        username,
        totalSessions: 1,
        totalStreamTime: session.duration,
        highestPeakViewers: session.peakViewers,
        averageViewers: session.averageViewers,
        lastStreamDate: session.endTime,
        sessions: [newSession]
      });
    }
  }
};