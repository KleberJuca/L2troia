import { Activity } from '../types/history';
import { formatDate } from '../utils/dateFormat';
import { formatCurrency } from '../utils/formatters';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface ActivityListProps {
  activities: Activity[];
}

export default function ActivityList({ activities }: ActivityListProps) {
  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        Nenhuma atividade registrada.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left">Data</th>
            <th className="px-6 py-3 text-left">Atividade</th>
            <th className="px-6 py-3 text-left">Método</th>
            <th className="px-6 py-3 text-right">Valor</th>
            <th className="px-6 py-3 text-right">L2 Coins</th>
            <th className="px-6 py-3 text-center">Termos Aceitos</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id} className="border-t border-gray-700 hover:bg-gray-700/50">
              <td className="px-6 py-4 text-gray-300">
                {formatDate(activity.timestamp)}
              </td>
              <td className="px-6 py-4">
                <div>
                  <p className="font-bold">{activity.title}</p>
                  <p className="text-sm text-gray-400">{activity.description}</p>
                </div>
              </td>
              <td className="px-6 py-4">
                {activity.details?.paymentMethod || '-'}
              </td>
              <td className="px-6 py-4 text-right">
                {activity.details ? (
                  formatCurrency(activity.details.amount, activity.details.currency)
                ) : (
                  '-'
                )}
              </td>
              <td className="px-6 py-4 text-right">
                {activity.details ? (
                  <span className="text-yellow-400 font-bold">
                    {activity.details.l2CoinsGenerated} L2 Coins
                  </span>
                ) : (
                  '-'
                )}
              </td>
              <td className="px-6 py-4 text-center">
                {activity.type === 'donation' ? (
                  <CheckCircleIcon className="h-6 w-6 text-green-500 inline-block" />
                ) : activity.type === 'purchase' && activity.title === 'Termos Aceitos' ? (
                  <CheckCircleIcon className="h-6 w-6 text-green-500 inline-block" />
                ) : (
                  <XCircleIcon className="h-6 w-6 text-gray-500 inline-block" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}