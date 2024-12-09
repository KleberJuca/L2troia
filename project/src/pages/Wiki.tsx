import { motion } from 'framer-motion';
import { useState } from 'react';

interface Item {
  id: number;
  name: string;
  type: string;
  grade: string;
  description: string;
  stats: string;
  image: string;
}

export default function Wiki() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const items: Item[] = [
    {
      id: 1,
      name: "Dark Crystal Breastplate",
      type: "Heavy Armor",
      grade: "A",
      description: "A breastplate made of dark crystal.",
      stats: "P. Def: 198, Weight: 7700",
      image: "/images/items/dark-crystal-breastplate.jpg"
    },
    {
      id: 2,
      name: "Soul Separator",
      type: "Dagger",
      grade: "A",
      description: "A powerful dagger that can separate soul from body.",
      stats: "P. Atk: 220, M. Atk: 121",
      image: "/images/items/soul-separator.jpg"
    },
    // Add more items as needed
  ];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.type.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Wiki de Itens
      </motion.h1>

      <div className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Pesquisar itens..."
          className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === 'all' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setSelectedCategory('weapon')}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === 'weapon' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
          >
            Armas
          </button>
          <button
            onClick={() => setSelectedCategory('armor')}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === 'armor' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
          >
            Armaduras
          </button>
          <button
            onClick={() => setSelectedCategory('jewelry')}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === 'jewelry' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
          >
            Jóias
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800 rounded-lg overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <span className={`px-2 py-1 rounded text-sm font-bold ${
                  item.grade === 'S' ? 'bg-red-600' :
                  item.grade === 'A' ? 'bg-orange-600' :
                  item.grade === 'B' ? 'bg-yellow-600' :
                  item.grade === 'C' ? 'bg-green-600' :
                  'bg-blue-600'
                }`}>
                  Grade {item.grade}
                </span>
              </div>
              <p className="text-gray-400 mb-2">{item.type}</p>
              <p className="text-gray-300 mb-4">{item.description}</p>
              <div className="bg-gray-700 p-2 rounded">
                <p className="text-sm font-mono">{item.stats}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}