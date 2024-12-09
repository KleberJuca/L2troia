import { ShopItem, ShopItemInput } from '../types/shop';

export const validateShopItem = (item: ShopItemInput): string[] => {
  const errors: string[] = [];

  if (!item.name?.trim()) {
    errors.push('Name is required');
  }

  if (!item.category?.trim()) {
    errors.push('Category is required');
  }

  if (typeof item.price !== 'number' || item.price < 0) {
    errors.push('Price must be a positive number');
  }

  if (!item.image?.trim()) {
    errors.push('Image URL is required');
  }

  if (item.contents?.length) {
    item.contents.forEach((content, index) => {
      if (!content.name?.trim()) {
        errors.push(`Content item ${index + 1} name is required`);
      }
      if (content.quantity < 1) {
        errors.push(`Content item ${index + 1} quantity must be at least 1`);
      }
    });
  }

  if (item.dropRates) {
    Object.entries(item.dropRates).forEach(([itemName, rate]) => {
      if (rate < 0 || rate > 100) {
        errors.push(`Drop rate for ${itemName} must be between 0 and 100`);
      }
    });
  }

  return errors;
};

export const formatPrice = (price: number): string => {
  return `${price.toLocaleString()} L2 Coins`;
};

export const generateItemId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};