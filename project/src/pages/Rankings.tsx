import { motion } from 'framer-motion';
import { useState } from 'react';

interface Player {
  rank: number;
  name: string;
  class: string;
  pvp: number;
  pk: number;
}

export default function Rankings() {
  const [activeTab, setActiveTab] = useState<'pvp' | 'pk'>('pvp');

  const players: Player[] = [
    { rank: 1, name: "DeathKnight", class: "Duelist", pvp: 15432, pk: 5432 },
    { rank: 2, name: "Shadowmage", class: "Archmage", pvp: 14876, pk: 4876 },
    { rank: 3, name: "DragonSlayer", class: "Hawkeye", pvp: 14543, pk: 4543 },
    { rank: 4, name: "StormBringer", class: "Soultaker", pvp: 13998, pk: 3998 },
    { rank: 5, name: "LightBringer", class: "Cardinal", pvp: 13654, pk: 3654 },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Rankings
      </motion.h1>

      {/* Ranking Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('pvp')}
            className={`px-6 py-2 rounded-md transition ${
              activeTab === 'pvp' ? 'bg-red-600 text-white' : 'text-gray-400'
            }`}
          >
            PvP
          </button>
          <button
            onClick={() => setActiveTab('pk')}
            className={`px-6 py-2 rounded-md transition ${
              activeTab === 'pk' ? 'bg-red-600 text-white' : 'text-gray-400'
            }`}
          >
            PK
          </button>
        </div>
      </div>

      {/* Rankings Table */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800 rounded-lg overflow-hidden"
      >
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-6 py-3 text-left">Rank</th>
              <th className="px-6 py-3 text-left">Nome</th>
              <th className="px-6 py-3 text-left">Classe</th>
              <th className="px-6 py-3 text-right">{activeTab.toUpperCase()}</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.rank} className="border-t border-gray-700">
                <td className="px-6 py-4">
                  <span className="flex items-center">
                    {player.rank === 1 && "🥇"}
                    {player.rank === 2 && "🥈"}
                    {player.rank === 3 && "🥉"}
                    {player.rank > 3 && player.rank}
                  </span>
                </td>
                <td className="px-6 py-4">{player.name}</td>
                <td className="px-6 py-4 text-gray-400">{player.class}</td>
                <td className="px-6 py-4 text-right font-bold">
                  {activeTab === 'pvp' ? player.pvp.toLocaleString() : player.pk.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}