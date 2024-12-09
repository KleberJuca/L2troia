import { useState } from 'react';
import { NewsItem } from '../types/news';
import { newsService } from '../services/api/newsService';

export const useNewsManagement = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await newsService.getNews();
      setNews(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  const createNews = async (newsItem: Omit<NewsItem, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      const newNews = await newsService.createNews(newsItem);
      setNews(prev => [...prev, newNews]);
      return newNews;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create news');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateNews = async (id: number, newsItem: Partial<NewsItem>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedNews = await newsService.updateNews(id, newsItem);
      setNews(prev => prev.map(item => item.id === id ? updatedNews : item));
      return updatedNews;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update news');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteNews = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await newsService.deleteNews(id);
      setNews(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete news');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    news,
    loading,
    error,
    loadNews,
    createNews,
    updateNews,
    deleteNews
  };
};