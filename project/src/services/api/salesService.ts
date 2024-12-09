import { SaleLog } from '../../types/sales';

// In-memory storage for demo purposes
let salesLogs: SaleLog[] = [
  {
    id: 1,
    userId: 1,
    username: 'player1',
    items: [
      {
        id: 1,
        name: 'Dark Crystal Sword',
        price: 100,
        category: 'weapons',
        description: 'A powerful sword made of dark crystal',
        stats: 'P.Atk: 232 | M.Atk: 132',
        image: '/images/items/dark-crystal-sword.jpg',
        quantity: 2
      }
    ],
    totalAmount: 200,
    purchaseDate: '2023-11-22 15:30:00'
  }
];

export const salesService = {
  getSalesLogs: async (): Promise<SaleLog[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return salesLogs;
  },

  addSaleLog: async (sale: Omit<SaleLog, 'id'>): Promise<SaleLog> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newSale = {
      ...sale,
      id: Math.max(...salesLogs.map(log => log.id), 0) + 1
    };
    salesLogs = [...salesLogs, newSale];
    return newSale;
  }
};