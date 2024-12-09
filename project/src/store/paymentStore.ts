import { create } from 'zustand';

interface PaymentMethod {
  id: string;
  name: string;
  type: 'pix' | 'paypal' | 'creditCard';
  enabled: boolean;
  config: any;
}

interface PaymentStore {
  paymentMethods: PaymentMethod[];
  updatePaymentMethod: (methodId: string, config: any) => void;
  getPaymentHistory: () => Promise<any[]>;
  getPaymentStats: () => Promise<any>;
}

export const usePaymentStore = create<PaymentStore>((set, get) => ({
  paymentMethods: [
    {
      id: 'pix',
      name: 'PIX',
      type: 'pix',
      enabled: true,
      config: {
        pixKey: '',
      },
    },
    {
      id: 'paypal',
      name: 'PayPal',
      type: 'paypal',
      enabled: true,
      config: {
        clientId: '',
        clientSecret: '',
      },
    },
    {
      id: 'creditCard',
      name: 'Credit Card',
      type: 'creditCard',
      enabled: true,
      config: {
        merchantId: '',
        apiKey: '',
      },
    },
  ],

  updatePaymentMethod: (methodId, config) => {
    set((state) => ({
      paymentMethods: state.paymentMethods.map((method) =>
        method.id === methodId ? { ...method, config } : method
      ),
    }));
  },

  getPaymentHistory: async () => {
    // Simulate API call
    return [
      {
        id: '1',
        user: 'player1',
        method: 'PIX',
        amount: 50,
        status: 'completed',
        date: '2023-11-22',
      },
      {
        id: '2',
        user: 'player2',
        method: 'PayPal',
        amount: 100,
        status: 'pending',
        date: '2023-11-22',
      },
    ];
  },

  getPaymentStats: async () => {
    // Simulate API call
    return {
      revenue: {
        today: 500,
        week: 2500,
        month: 10000,
      },
      methodStats: {
        PIX: 45,
        PayPal: 30,
        'Credit Card': 25,
      },
    };
  },
}));