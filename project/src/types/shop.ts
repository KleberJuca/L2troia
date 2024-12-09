export interface ShopItemContent {
  id: string;
  itemId: string;
  name: string;
  quantity: number;
}

export interface ShopItem {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  stats: string;
  image: string;
  contents?: ShopItemContent[];
  dropRates?: { [key: string]: number };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export type ShopItemInput = Omit<ShopItem, 'id'>;