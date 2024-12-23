import { create } from 'zustand';
import { Activity } from '../types/history';

interface HistoryState {
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id'>) => void;
}

export const useHistoryStore = create<HistoryState>((set) => ({
  activities: [
    {
      id: 1,
      title: 'Doação Realizada',
      description: 'Doação processada com sucesso via PIX',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      type: 'donation',
      details: {
        paymentMethod: 'PIX',
        amount: 100.00,
        currency: 'BRL',
        l2CoinsGenerated: 1000
      }
    },
    {
      id: 2,
      title: 'Doação Realizada',
      description: 'Doação processada com sucesso via PayPal',
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      type: 'donation',
      details: {
        paymentMethod: 'PayPal',
        amount: 50.00,
        currency: 'USD',
        l2CoinsGenerated: 2500
      }
    },
    {
      id: 3,
      title: 'Termos Aceitos',
      description: 'Aceitou os termos de doação e uso da loja',
      timestamp: new Date(Date.now() - 1000 * 60 * 31).toISOString(),
      type: 'purchase'
    }
  ],
  addActivity: (activity) =>
    set((state) => ({
      activities: [
        {
          ...activity,
          id: Math.max(...state.activities.map((a) => a.id), 0) + 1
        },
        ...state.activities
      ]
    }))
}));