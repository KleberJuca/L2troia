import { motion } from 'framer-motion';
import ActivityList from './components/ActivityList';
import { useHistoryStore } from './store/historyStore';
import React from 'react';

export default function HistoryPage() {
  const { activities } = useHistoryStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-6">Histórico de Atividades</h2>
      <ActivityList activities={activities} />
    </motion.div>
  );
}