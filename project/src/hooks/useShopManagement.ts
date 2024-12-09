import { useState } from 'react';
import { ShopItem } from '../types/shop';
import { shopService } from '../services/api/shopService';

export const useShopManagement = () => {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await shopService.getItems();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load items');
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (item: Omit<ShopItem, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      const newItem = await shopService.createItem(item);
      setItems(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create item');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id: number, item: Partial<ShopItem>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedItem = await shopService.updateItem(id, item);
      setItems(prev => prev.map(i => i.id === id ? updatedItem : i));
      return updatedItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await shopService.deleteItem(id);
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    loading,
    error,
    loadItems,
    createItem,
    updateItem,
    deleteItem
  };
};