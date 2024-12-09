import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { User, balanceUpdateSchema, BalanceUpdateInput } from '../../types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface BalanceModalProps {
  user: User;
  onUpdateBalance: (data: BalanceUpdateInput) => void;
  onClose: () => void;
}

export default function BalanceModal({ user, onUpdateBalance, onClose }: BalanceModalProps) {
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<BalanceUpdateInput>({
    resolver: zodResolver(balanceUpdateSchema)
  });

  const onSubmit = (data: BalanceUpdateInput) => {
    try {
      onUpdateBalance(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update balance');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Update Balance</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-6 w-6 text-gray-400 hover:text-white" />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-gray-300">User: {user.username}</p>
          <p className="text-gray-300">Current Balance: {user.balance} L2 Coins</p>
        </div>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-white">
              Amount (positive to add, negative to subtract)
            </label>
            <input
              type="number"
              {...register('amount', { valueAsNumber: true })}
              className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-white">
              Reason
            </label>
            <textarea
              {...register('reason')}
              className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            {errors.reason && (
              <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Update Balance
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