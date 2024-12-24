import { Stream, StreamInput } from '../../types/stream';
import { getStreamStatus } from '../twitch/api';
//import { streamHistoryService } from './streamHistoryService';

// In-memory storage for demo purposes
let streams: Stream[] = [
  {
    id: 1,
    username: "carolzinhasg",
    title: '' ,
    isLive: true,
    viewers: 245,
    addedAt: new Date().toISOString(),
    isBlocked: false
  }
];

export const streamService = {
  getStreams: async (): Promise<Stream[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Update live status and viewers for each stream
    const updatedStreams = await Promise.all(
      streams.map(async (stream) => {
        if (!stream.isBlocked) {
          try {
            const status = await getStreamStatus(stream.username);
            return {
              ...stream,
              isLive: status.isLive,
              viewers: status.viewers,
              title: status.title
            };
          } catch (error) {
            console.error(`Failed to get status for ${stream.username}:`, error);
          }
        }
        return stream;
      })
    );

    return updatedStreams;
  },

  addStream: async (input: StreamInput): Promise<Stream> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if stream already exists
    if (streams.some(s => s.username.toLowerCase() === input.username.toLowerCase())) {
      throw new Error('Stream already exists');
    }

    const newStream = {
      id: Math.max(...streams.map(s => s.id), 0) + 1,
      username: input.username,
      title: '',
      isLive: false,
      viewers: 0,
      addedAt: new Date().toISOString(),
      isBlocked: false
    };

    streams = [...streams, newStream];
    return newStream;
  },

  removeStream: async (id: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    streams = streams.filter(stream => stream.id !== id);
  },

  toggleBlockStream: async (id: number): Promise<Stream> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const stream = streams.find(s => s.id === id);
    if (!stream) {
      throw new Error('Stream not found');
    }

    const updatedStream = {
      ...stream,
      isBlocked: !stream.isBlocked
    };

    streams = streams.map(s => s.id === id ? updatedStream : s);
    return updatedStream;
  },

  updateStream: async (id: number, username: string): Promise<Stream> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const stream = streams.find(s => s.id === id);
    if (!stream) {
      throw new Error('Stream not found');
    }

    // Check if username is already taken by another stream
    if (streams.some(s => s.id !== id && s.username.toLowerCase() === username.toLowerCase())) {
      throw new Error('Username already exists');
    }

    const updatedStream = {
      ...stream,
      username
    };

    streams = streams.map(s => s.id === id ? updatedStream : s);
    return updatedStream;
  }
};