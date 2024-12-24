import { useState, useEffect } from 'react';
import { streamService } from '../services/api/streamService';
import { Stream } from '../types/stream';
import React from 'react';

export default function TwitchStreams() {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStreams = async () => {
      try {
        const data = await streamService.getStreams();
        // Filter out blocked streams and only show live ones
        setStreams(data.filter(stream => !stream.isBlocked && stream.isLive && stream.title.toLowerCase().includes('L2Troia')));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load streams');
      } finally {
        setLoading(false);
      }
    };

    loadStreams();
    const interval = setInterval(loadStreams, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Transmissões ao Vivo</h2>
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Transmissões ao Vivo</h2>
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  if (streams.length === 0) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Transmissões ao Vivo</h2>
        <p className="text-gray-400 text-center">Nenhuma transmissão ao vivo no momento</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Transmissões ao Vivo</h2>
      <div className="space-y-4">
        {streams.map((stream) => (
          <div key={stream.id} className="relative">
            <div className="relative pt-[56.25%] bg-gray-900 rounded-lg overflow-hidden">
              <iframe
                src={`https://player.twitch.tv/?channel=${stream.username}&parent=${window.location.hostname}&muted=true`}
                className="absolute top-0 left-0 w-full h-full"
                allowFullScreen
              />
            </div>
            <div className="mt-2">
              <p className="font-bold">{stream.username}</p>
              <p className="text-gray-400 text-sm">{stream.viewers} espectadores</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}