import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { StreamerStats } from '../../types/streamHistory';
import { streamHistoryService } from '../../services/api/streamHistoryService';
import { formatDuration } from '../../utils/time';
import React from 'react';

interface StreamHistoryModalProps {
  username: string;
  onClose: () => void;
}

export default function StreamHistoryModal({ username, onClose }: StreamHistoryModalProps) {
  const [stats, setStats] = useState<StreamerStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await streamHistoryService.getStreamerStats(username);
        setStats(data);
      } catch (error) {
        console.error('Failed to load stream stats:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, [username]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl">
          <div className="text-center">No history found for this streamer.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Stream History - {username}</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-6 w-6 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="text-sm text-gray-400">Total Sessions</div>
            <div className="text-xl font-bold">{stats.totalSessions}</div>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="text-sm text-gray-400">Total Stream Time</div>
            <div className="text-xl font-bold">{formatDuration(stats.totalStreamTime)}</div>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="text-sm text-gray-400">Peak Viewers</div>
            <div className="text-xl font-bold">{stats.highestPeakViewers}</div>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="text-sm text-gray-400">Average Viewers</div>
            <div className="text-xl font-bold">{stats.averageViewers}</div>
          </div>
        </div>

        {/* Sessions Table */}
        <div className="bg-gray-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">Start Time</th>
                <th className="px-6 py-3 text-left">Duration</th>
                <th className="px-6 py-3 text-right">Peak Viewers</th>
                <th className="px-6 py-3 text-right">Avg Viewers</th>
                <th className="px-6 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.sessions.map((session) => (
                <tr key={session.id} className="border-t border-gray-600">
                  <td className="px-6 py-4">
                    {new Date(session.startTime).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">{formatDuration(session.duration)}</td>
                  <td className="px-6 py-4 text-right">{session.peakViewers}</td>
                  <td className="px-6 py-4 text-right">{session.averageViewers}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}