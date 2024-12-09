import { useState } from 'react';
import { SaleLog } from '../types/sales';
import { salesService } from '../services/api/salesService';

export const useSalesManagement = () => {
  const [sales, setSales] = useState<SaleLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSales = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await salesService.getSalesLogs();
      setSales(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load sales logs');
    } finally {
      setLoading(false);
    }
  };

  const addSale = async (sale: Omit<SaleLog, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      const newSale = await salesService.addSaleLog(sale);
      setSales(prev => [...prev, newSale]);
      return newSale;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add sale log');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    sales,
    loading,
    error,
    loadSales,
    addSale
  };
};