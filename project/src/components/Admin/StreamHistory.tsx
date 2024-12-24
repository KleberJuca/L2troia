import { useState, useEffect } from 'react';
import { StreamerStats } from '../../types/streamHistory';
import { streamHistoryService } from '../../services/api/streamHistoryService';
import { formatDuration } from '../../utils/time';
import React from 'react';

export default function StreamHistory() {
  const [stats, setStats] = useState<StreamerStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await streamHistoryService.getAllStreamersStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stream stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <h3 className="px-6 py-4 text-lg font-bold bg-gray-700">Recent Sessions</h3>
      <table className="w-full">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left">Streamer</th>
            <th className="px-6 py-3 text-left">Start Time</th>
            <th className="px-6 py-3 text-left">Duration</th>
            <th className="px-6 py-3 text-right">Peak Viewers</th>
            <th className="px-6 py-3 text-right">Avg Viewers</th>
            <th className="px-6 py-3 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {stats.flatMap(streamer => 
            streamer.sessions.map(session => (
              <tr key={session.id} className="border-t border-gray-700 hover:bg-gray-700/50">
                <td className="px-6 py-4 font-medium">{streamer.username}</td>
                <td className="px-6 py-4">
                  {new Date(session.startTime).toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </td>
                <td className="px-6 py-4">{formatDuration(session.duration)}</td>
                <td className="px-6 py-4 text-right">{session.peakViewers.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">{session.averageViewers.toLocaleString()}</td>
                <td className="px-6 py-4 text-center">
                  {session.isLive ? (
                    <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                      Live
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-500 text-white text-xs rounded-full">
                      Ended
                    </span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}