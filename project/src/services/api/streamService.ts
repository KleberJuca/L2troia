import { Stream, StreamInput } from '../../types/stream';

// In-memory storage for demo purposes
let streams: Stream[] = [
  {
    id: 1,
    username: "ediandresonl2",
    title: "L2 Troia - PvP & Siege Wars",
    viewers: 245,
    thumbnailUrl: "/images/stream-thumbnail.jpg",
    isLive: true,
    addedAt: new Date().toISOString()
  }
];

export const streamService = {
  getStreams: async (): Promise<Stream[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return streams;
  },

  addStream: async (stream: StreamInput): Promise<Stream> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newStream = {
      ...stream,
      id: Math.max(...streams.map(s => s.id), 0) + 1,
      viewers: 0,
      isLive: false,
      addedAt: new Date().toISOString()
    };
    streams = [...streams, newStream];
    return newStream;
  },

  removeStream: async (id: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    streams = streams.filter(stream => stream.id !== id);
  },

  updateStreamStatus: async (id: number, isLive: boolean): Promise<Stream> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const stream = streams.find(s => s.id === id);
    if (!stream) {
      throw new Error('Stream not found');
    }
    
    const updatedStream = {
      ...stream,
      isLive,
      viewers: isLive ? Math.floor(Math.random() * 500) : 0
    };
    
    streams = streams.map(s => s.id === id ? updatedStream : s);
    return updatedStream;
  }
};