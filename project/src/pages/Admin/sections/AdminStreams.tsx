import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useStreamManagement } from '../../../hooks/useStreamManagement';
import StreamModal from '../../../components/Admin/StreamModal';
import { format } from 'date-fns';

export default function AdminStreams() {
  const { streams, loading, error, loadStreams, addStream, removeStream, updateStreamStatus } = useStreamManagement();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadStreams();
  }, []);

  const handleAddStream = async (data: any) => {
    try {
      await addStream(data);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to add stream:', error);
    }
  };

  const handleRemoveStream = async (id: number) => {
    if (confirm('Are you sure you want to remove this stream?')) {
      try {
        await removeStream(id);
      } catch (error) {
        console.error('Failed to remove stream:', error);
      }
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      await updateStreamStatus(id, !currentStatus);
    } catch (error) {
      console.error('Failed to update stream status:', error);
    }
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
        <h1 className="text-2xl font-bold">Stream Management</h1>
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
                  {format(new Date(stream.addedAt), 'dd/MM/yyyy HH:mm')}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleToggleStatus(stream.id, stream.isLive)}
                    className={`mr-4 ${
                      stream.isLive ? 'text-red-400 hover:text-red-500' : 'text-green-400 hover:text-green-500'
                    }`}
                  >
                    {stream.isLive ? 'Set Offline' : 'Set Live'}
                  </button>
                  <button
                    onClick={() => handleRemoveStream(stream.id)}
                    className="text-red-400 hover:text-red-500"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <StreamModal
          onAdd={handleAddStream}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </motion.div>
  );
}