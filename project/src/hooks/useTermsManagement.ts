import { useState } from 'react';
import { Terms, TermsInput } from '../types/terms';
import { termsService } from '../services/api/termsService';

export const useTermsManagement = () => {
  const [terms, setTerms] = useState<Terms[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTerms = async (type?: 'game' | 'donation') => {
    try {
      setLoading(true);
      setError(null);
      const data = await termsService.getTerms(type);
      setTerms(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load terms');
    } finally {
      setLoading(false);
    }
  };

  const updateTerms = async (id: number, data: TermsInput) => {
    try {
      setLoading(true);
      setError(null);
      const updatedTerms = await termsService.updateTerms(id, data);
      setTerms(prev => prev.map(t => t.id === id ? updatedTerms : t));
      return updatedTerms;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update terms');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    terms,
    loading,
    error,
    loadTerms,
    updateTerms
  };
};