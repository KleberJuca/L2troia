import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { StreamInput, streamSchema } from '../../types/stream';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface StreamModalProps {
  onAdd: (stream: StreamInput) => void;
  onClose: () => void;
}

export default function StreamModal({ onAdd, onClose }: StreamModalProps) {
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<StreamInput>({
    resolver: zodResolver(streamSchema)
  });

  const onSubmit = (data: StreamInput) => {
    try {
      onAdd(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add stream');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Add Stream</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-6 w-6 text-gray-400 hover:text-white" />
          </button>
        </div>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-white">
              Twitch Username
            </label>
            <input
              type="text"
              {...register('username')}
              className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-white">
              Stream Title
            </label>
            <input
              type="text"
              {...register('title')}
              className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Stream title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-white">
              Thumbnail URL
            </label>
            <input
              type="url"
              {...register('thumbnailUrl')}
              className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/thumbnail.jpg"
            />
            {errors.thumbnailUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.thumbnailUrl.message}</p>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add Stream
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