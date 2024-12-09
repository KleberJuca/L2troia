export interface ShopItemContent {
  id: string;
  name: string;
  quantity: number;
}

export interface ShopItem {
  id: string;
  cartId?: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  stats: string;
  contents?: ShopItemContent[];
  dropRates?: { [key: string]: number };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}