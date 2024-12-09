import { ShopItem } from '../../types/shop';

// In-memory storage for demo purposes
let items: ShopItem[] = [
  {
    id: 1,
    name: 'Dark Crystal Sword',
    price: 100,
    category: 'weapons',
    description: 'A powerful sword made of dark crystal',
    stats: 'P.Atk: 232 | M.Atk: 132',
    image: '/images/items/dark-crystal-sword.jpg'
  },
  {
    id: 2,
    name: 'Blue Wolf Armor',
    price: 150,
    category: 'armor',
    description: 'Legendary Blue Wolf armor',
    stats: 'P.Def: 198 | M.Def: 98',
    image: '/images/items/blue-wolf-armor.jpg'
  },
];

export const shopService = {
  getItems: async (): Promise<ShopItem[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return items;
  },

  getItemById: async (id: number): Promise<ShopItem | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return items.find(item => item.id === id);
  },

  createItem: async (item: Omit<ShopItem, 'id'>): Promise<ShopItem> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newItem = {
      ...item,
      id: Math.max(...items.map(i => i.id), 0) + 1
    };
    items = [...items, newItem];
    return newItem;
  },

  updateItem: async (id: number, item: Partial<ShopItem>): Promise<ShopItem> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = items.findIndex(i => i.id === id);
    if (index === -1) {
      throw new Error('Item not found');
    }
    const updatedItem = { ...items[index], ...item };
    items = items.map(i => i.id === id ? updatedItem : i);
    return updatedItem;
  },

  deleteItem: async (id: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    items = items.filter(item => item.id !== id);
  }
};