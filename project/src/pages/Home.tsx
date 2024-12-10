import { motion } from 'framer-motion';
import { ArrowDownTrayIcon, UsersIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { useSettingsStore } from '../store/settingsStore';
import { useServerSettings } from '../hooks/useServerSettings';
import { useEffect, useState } from 'react';
import TwitchStreams from '../components/TwitchStreams';
import { NewsItem } from '../types/news';
import { newsService } from '../services/api/newsService';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function Home() {
  const { settings } = useSettingsStore();
  const { loadSettings } = useServerSettings();
  const [news, setNews] = useState<NewsItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!settings) {
      loadSettings();
    }

    // Load news
    const loadNews = async () => {
      try {
        const newsData = await newsService.getNews();
        setNews(newsData.filter(item => item.published).slice(0, 2));
      } catch (error) {
        console.error('Failed to load news:', error);
      }
    };

    loadNews();
  }, [settings, loadSettings]);

  const handlePlayNow = () => {
    navigate('/register');
  };

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <h1 className="text-5xl font-bold mb-6">Bem-vindo ao L2 Troia</h1>
        <p className="text-xl text-gray-300 mb-8">O melhor servidor de Lineage 2 do Brasil</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlayNow}
          className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-red-700 transition"
        >
          JOGAR AGORA
        </motion.button>
      </motion.section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Server Stats */}
        <div className="md:col-span-2 space-y-6">
          {/* Server Stats */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <UsersIcon className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-2xl font-bold">1500+</h3>
              <p className="text-gray-400">Jogadores Online</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <ChartBarIcon className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <h3 className="text-2xl font-bold">{settings?.expRate}x</h3>
              <p className="text-gray-400">Rates</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <ArrowDownTrayIcon className="h-12 w-12 mx-auto mb-4 text-purple-500" />
              <h3 className="text-2xl font-bold">99.9%</h3>
              <p className="text-gray-400">Uptime</p>
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Características</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Chronicle</h3>
                <p className="text-gray-400">{settings?.chronicle}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Exp Rate</h3>
                <p className="text-gray-400">{settings?.expRate}x</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Drop Rate</h3>
                <p className="text-gray-400">{settings?.dropRate}x</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Adena Rate</h3>
                <p className="text-gray-400">{settings?.adenaRate}x</p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - Twitch Streams */}
        <div className="md:col-span-1">
          <TwitchStreams />
        </div>
      </div>

      {/* News Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Últimas Notícias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.map((item) => (
            <div key={item.id} className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <div 
                className="text-gray-400 mb-4"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
              <span className="text-sm text-gray-500">{item.date}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}