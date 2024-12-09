import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { User } from '../../types/user';

interface BanModalProps {
  user: User;
  onBan: (reason: string) => void;
  onClose: () => void;
}

export default function BanModal({ user, onBan, onClose }: BanModalProps) {
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBan(reason);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Ban User</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-6 w-6 text-gray-400 hover:text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-white">Username</label>
            <input
              type="text"
              value={user.username}
              disabled
              className="w-full bg-gray-700 text-gray-400 rounded-md px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-white">Ban Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              required
              placeholder="Enter the reason for banning this user..."
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
            >
              Ban User
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}