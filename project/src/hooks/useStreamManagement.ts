import { useState } from 'react';
import { Stream, StreamInput } from '../types/stream';
import { streamService } from '../services/api/streamService';

export const useStreamManagement = () => {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadStreams = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await streamService.getStreams();
      setStreams(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load streams');
    } finally {
      setLoading(false);
    }
  };

  const addStream = async (stream: StreamInput) => {
    try {
      setLoading(true);
      setError(null);
      const newStream = await streamService.addStream(stream);
      setStreams(prev => [...prev, newStream]);
      return newStream;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add stream');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeStream = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await streamService.removeStream(id);
      setStreams(prev => prev.filter(stream => stream.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove stream');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateStreamStatus = async (id: number, isLive: boolean) => {
    try {
      setLoading(true);
      setError(null);
      const updatedStream = await streamService.updateStreamStatus(id, isLive);
      setStreams(prev => prev.map(stream => stream.id === id ? updatedStream : stream));
      return updatedStream;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update stream status');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    streams,
    loading,
    error,
    loadStreams,
    addStream,
    removeStream,
    updateStreamStatus
  };
};