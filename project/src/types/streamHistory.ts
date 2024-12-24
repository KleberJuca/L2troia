export interface StreamSession {
    id: string;
    startTime: string;
    endTime: string;
    peakViewers: number;
    averageViewers: number;
    duration: number; // in minutes
    isLive: boolean;
  }
  
  export interface StreamerStats {
    username: string;
    totalSessions: number;
    totalStreamTime: number; // in minutes
    highestPeakViewers: number;
    averageViewers: number;
    lastStreamDate: string;
    sessions: StreamSession[];
  }