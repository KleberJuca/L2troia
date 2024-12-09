import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useNewsManagement } from '../../../hooks/useNewsManagement';
import { NewsItem } from '../../../types/news';
import NewsModal from '../../../components/Admin/NewsModal';

export default function AdminNews() {
  const { news, loading, error, loadNews, createNews, updateNews, deleteNews } = useNewsManagement();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    loadNews();
  }, []);

  const handleAddNews = () => {
    setEditingNews(null);
    setIsModalOpen(true);
  };

  const handleEditNews = (newsItem: NewsItem) => {
    setEditingNews(newsItem);
    setIsModalOpen(true);
  };

  const handleDeleteNews = async (newsId: number) => {
    if (confirm('Are you sure you want to delete this news item?')) {
      try {
        await deleteNews(newsId);
      } catch (error) {
        alert('Failed to delete news');
      }
    }
  };

  const handleSaveNews = async (newsItem: Omit<NewsItem, 'id'>) => {
    try {
      if (editingNews) {
        await updateNews(editingNews.id, newsItem);
      } else {
        await createNews(newsItem);
      }
      setIsModalOpen(false);
    } catch (error) {
      alert('Failed to save news');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">News Management</h1>
        <button
          onClick={handleAddNews}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add News</span>
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.map((item) => (
              <tr key={item.id} className="border-t border-gray-700">
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4">{item.date}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      item.published ? 'bg-green-500' : 'bg-gray-500'
                    }`}
                  >
                    {item.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEditNews(item)}
                    className="text-blue-400 hover:text-blue-500 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNews(item.id)}
                    className="text-red-400 hover:text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <NewsModal
          news={editingNews}
          onSave={handleSaveNews}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </motion.div>
  );
}