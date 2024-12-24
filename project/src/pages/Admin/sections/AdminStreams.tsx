import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PlusIcon, Pencil, Trash2, Lock, Unlock, History } from 'lucide-react';
import { useStreamManagement } from '../../../hooks/useStreamManagement';
import StreamModal from '../../../components/Admin/StreamModal';
import StreamHistoryModal from '../../../components/Admin/StreamHistoryModal';
import { Stream } from '../../../types/stream';
import React from 'react';

export default function AdminStreams() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStream, setEditingStream] = useState<Stream | null>(null);
  const [selectedStreamHistory, setSelectedStreamHistory] = useState<string | null>(null);
  const { streams, loading, error, loadStreams, addStream, removeStream, toggleBlockStream, updateStream } = useStreamManagement();

  useEffect(() => {
    loadStreams();
  }, []);

  const handleEdit = (stream: Stream) => {
    setEditingStream(stream);
    setIsModalOpen(true);
  };

  const handleSave = async (data: { username: string }) => {
    if (editingStream) {
      await updateStream(editingStream.id, data.username);
    } else {
      await addStream(data);
    }
    setEditingStream(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Streams Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Stream</span>
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">Username</th>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Viewers</th>
              <th className="px-6 py-3 text-left">Added At</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {streams.map((stream) => (
              <tr key={stream.id} className="border-t border-gray-700">
                <td className="px-6 py-4">{stream.username}</td>
                <td className="px-6 py-4">{stream.title}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      stream.isLive ? 'bg-green-500' : 'bg-gray-500'
                    }`}
                  >
                    {stream.isLive ? 'Live' : 'Offline'}
                  </span>
                </td>
                <td className="px-6 py-4">{stream.viewers}</td>
                <td className="px-6 py-4">
                  {new Date(stream.addedAt).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedStreamHistory(stream.username)}
                      className="text-blue-400 hover:text-blue-500"
                      title="View History"
                    >
                      <History className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(stream)}
                      className="text-blue-400 hover:text-blue-500"
                      title="Edit"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => toggleBlockStream(stream.id)}
                      className={`${
                        stream.isBlocked ? 'text-red-400 hover:text-red-500' : 'text-green-400 hover:text-green-500'
                      }`}
                      title={stream.isBlocked ? 'Unblock' : 'Block'}
                    >
                      {stream.isBlocked ? (
                        <Lock className="h-5 w-5" />
                      ) : (
                        <Unlock className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      onClick={() => removeStream(stream.id)}
                      className="text-red-400 hover:text-red-500"
                      title="Remove"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <StreamModal
          stream={editingStream}
          onAdd={handleSave}
          onClose={() => {
            setIsModalOpen(false);
            setEditingStream(null);
          }}
        />
      )}

      {selectedStreamHistory && (
        <StreamHistoryModal
          username={selectedStreamHistory}
          onClose={() => setSelectedStreamHistory(null)}
        />
      )}
    </motion.div>
  );
}