import { NewsItem } from '../../types/news';

// In-memory storage for demo purposes
let newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'Server Update',
    content: 'New features added to improve gameplay experience.',
    date: '2023-11-22',
    author: 'Admin',
    published: true
  },
  {
    id: 2,
    title: 'Event Announcement',
    content: 'Special PvP event this weekend with exclusive rewards!',
    date: '2023-11-21',
    author: 'Admin',
    published: true
  }
];

export const newsService = {
  getNews: async (): Promise<NewsItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return newsItems;
  },

  getNewsById: async (id: number): Promise<NewsItem | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return newsItems.find(item => item.id === id);
  },

  createNews: async (news: Omit<NewsItem, 'id'>): Promise<NewsItem> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newNews = {
      ...news,
      id: Math.max(...newsItems.map(item => item.id), 0) + 1,
      date: new Date().toISOString().split('T')[0]
    };
    newsItems = [...newsItems, newNews];
    return newNews;
  },

  updateNews: async (id: number, news: Partial<NewsItem>): Promise<NewsItem> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = newsItems.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('News not found');
    }
    const updatedNews = { ...newsItems[index], ...news };
    newsItems = newsItems.map(item => item.id === id ? updatedNews : item);
    return updatedNews;
  },

  deleteNews: async (id: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    newsItems = newsItems.filter(item => item.id !== id);
  }
};