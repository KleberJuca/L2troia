import { ShopItem } from './shop';

export interface SaleItem extends ShopItem {
  quantity: number;
}

export interface SaleLog {
  id: number;
  userId: number;
  username: string;
  items: SaleItem[];
  totalAmount: number;
  purchaseDate: string;
}