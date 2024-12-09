import { useState, useEffect } from 'react';
import { streamService } from '../services/api/streamService';
import { Stream } from '../types/stream';

export default function TwitchStreams() {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStreams = async () => {
      try {
        const data = await streamService.getStreams();
        setStreams(data.filter(stream => stream.isLive));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load streams');
      } finally {
        setLoading(false);
      }
    };

    loadStreams();
    
    // Refresh streams every minute
    const interval = setInterval(loadStreams, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleStreamClick = (username: string) => {
    window.open(`https://www.twitch.tv/${username}`, '_blank');
  };

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
          <div
            key={stream.id}
            onClick={() => handleStreamClick(stream.username)}
            className="flex items-center space-x-4 bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600 transition"
          >
            <div className="relative">
              <img
                src={stream.thumbnailUrl}
                alt={stream.title}
                className="w-32 h-20 object-cover rounded"
              />
              <span className="absolute bottom-1 right-1 bg-red-600 text-white text-xs px-1 rounded">
                LIVE
              </span>
            </div>
            <div>
              <h3 className="font-bold">{stream.username}</h3>
              <p className="text-gray-400 text-sm">{stream.title}</p>
              <p className="text-gray-500 text-sm">{stream.viewers} espectadores</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}