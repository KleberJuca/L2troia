import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import React from 'react';

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
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24; // Define o número de itens por página

  useEffect(() => {
    async function fetchAllItems() {
      const fileNames = [
        '0000-0099.xml',
        '0100-0199.xml',
        '0200-0299.xml',
        '0300-0399.xml',
        '0400-0499.xml',
        '0500-0599.xml',
        '0600-0699.xml',
        '0700-0799.xml',
        '0800-0899.xml',
        '0900-0999.xml',
        '1000-1099.xml',
        '1100-1199.xml',
        '1200-1299.xml',
        '1300-1399.xml',
        '1400-1499.xml',
        '1500-1599.xml',
        '1600-1699.xml',
        '1700-1799.xml',
        '1800-1899.xml',
        '1900-1999.xml',
        '2000-2099.xml',
        '2100-2199.xml',
        '2200-2299.xml',
        '2300-2399.xml',
        '2400-2499.xml',
        '2500-2599.xml',
        '2600-2699.xml',
        '2700-2799.xml',
        '2800-2899.xml',
        '2900-2999.xml',
        '3000-3099.xml',
        '3100-3199.xml',
        '3200-3299.xml',
        '3300-3399.xml',
        '3400-3499.xml',
        '3500-3599.xml',
        '3600-3699.xml',
        '3700-3799.xml',
        '3800-3899.xml',
        '3900-3999.xml',
        '4000-4099.xml',
        '4100-4199.xml',
        '4200-4299.xml',
        '4300-4399.xml',
        '4400-4499.xml',
        '4500-4599.xml',
        '4600-4699.xml',
        '4700-4799.xml',
        '4800-4899.xml',
        '4900-4999.xml',
        '5000-5099.xml',
        '5100-5199.xml',
        '5200-5299.xml',
        '5300-5399.xml',
        '5400-5499.xml',
        '5500-5599.xml',
        '5600-5699.xml',
        '5700-5799.xml',
        '5800-5899.xml',
        '5900-5999.xml',
        '6000-6099.xml',
        '6100-6199.xml',
        '6200-6299.xml',
        '6300-6399.xml',
        '6400-6499.xml',
        '6500-6599.xml',
        '6600-6699.xml',
        '6700-6799.xml',
        '6800-6899.xml',
        '6900-6999.xml',
        '7000-7099.xml',
        '7100-7199.xml',
        '7200-7299.xml',
        '7300-7399.xml',
        '7400-7499.xml',
        '7500-7599.xml',
        '7600-7699.xml',
        '7700-7799.xml',
        '7800-7899.xml',
        '7900-7999.xml',
        '8000-8099.xml',
        '8100-8199.xml',
        '8200-8299.xml',
        '8300-8399.xml',
        '8400-8499.xml',
        '8500-8599.xml',
        '8600-8699.xml',
        '8700-8799.xml',
        '8800-8899.xml',
        '8900-8999.xml',
        '9000-9099.xml',
        '9100-9199.xml',
        '9200-9299.xml',
        'Antharas Weapons PvP.xml',
        'Antharas Weapons.xml',
        'Armor Dark Knight PVP.xml',
        'Armor Dark Knight.xml',
        'Armor Dynasty PVP.XML',
        'Armor Dynasty.xml',
        'Armor Hats +100.xml',
        'Armor Hats +300.xml',
        'Armor Tattos.xml',
        'Armor Titanium PVP.XML',
        'Armor Titanium.xml',
        'box.xml',
        'Coins.xml',
        'Habilitys.xml',
        'Jewels Boss PVP.xml',
        'Joias Boss.xml',
        'Shields.xml',
        'Skins.xml',
        'Weapons Dynasty PvP.xml',
        'Weapons Dynasty.xml',
        'Weapons Epic PvP.xml',
        'Weapons Epic.xml',
        'Weapons Icarus PvP.xml',
        'Weapons Icarus.xml',

      ];

      const allItems: Item[] = [];

      for (const fileName of fileNames) {
        const response = await fetch(`/items/${fileName}`);
        const xmlText = await response.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

        const itemElements = xmlDoc.getElementsByTagName('item');

        const parsedItems = Array.from(itemElements).map((item) => {
          const id = parseInt(item.getAttribute('id') || '0', 10);
          const name = item.getAttribute('name') || 'Unknown';
          const type = item.getAttribute('type') || 'Unknown';

          const crystalTypeElement = Array.from(item.getElementsByTagName('set')).find(
            (set) => set.getAttribute('name') === 'crystal_type'
          );
          const grade = crystalTypeElement?.getAttribute('val') || 'no-grade';

          const forSets = Array.from(item.getElementsByTagName('for')).flatMap((forElement) =>
            Array.from(forElement.querySelectorAll('set,add')).map((set) => {
              const stat = set.getAttribute('stat');
              const val = set.getAttribute('val');
              return stat && val ? { stat, val } : null;
            }).filter(Boolean)
          );

          const forStats = forSets.reduce((acc, current) => {
            if (current) {
              acc[current.stat] = current.val;
            }
            return acc;
          }, {} as Record<string, string>);

          const stats = Object.entries(forStats)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');

          const description = `Type ${type}`;
          const image = `/images/items/${name.toLowerCase().replace(/ /g, '-')}.jpg`;

          return { id, name, type, grade, description, stats, image };
        });

        allItems.push(...parsedItems);
      }

      setItems(allItems);
    }

    fetchAllItems();
  }, []);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.type.toLowerCase() === selectedCategory;
    const matchesGrade = selectedGrade === 'all' || item.grade.toLowerCase() === selectedGrade;
    return matchesSearch && matchesCategory && matchesGrade;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            className={`px-4 py-2 rounded-md ${selectedCategory === 'all' ? 'bg-blue-600' : 'bg-gray-700'
              }`}
          >
            Todos
          </button>
          <button
            onClick={() => setSelectedCategory('weapon')}
            className={`px-4 py-2 rounded-md ${selectedCategory === 'weapon' ? 'bg-blue-600' : 'bg-gray-700'
              }`}
          >
            Armas
          </button>
          <button
            onClick={() => setSelectedCategory('armor')}
            className={`px-4 py-2 rounded-md ${selectedCategory === 'armor' ? 'bg-blue-600' : 'bg-gray-700'
              }`}
          >
            Armaduras
          </button>

          <button
            onClick={() => setSelectedGrade('all')}
            className={`px-4 py-2 rounded-md ${selectedGrade === 'all' ? 'bg-blue-600' : 'bg-gray-700'
              }`}
          >
            Todas as Grades
          </button>
          <button
            onClick={() => setSelectedGrade('s')}
            className={`px-4 py-2 rounded-md ${selectedGrade === 's' ? 'bg-slate-700' : 'bg-gray-700'
              }`}
          >
            Grade S
          </button>
          <button
            onClick={() => setSelectedGrade('a')}
            className={`px-4 py-2 rounded-md ${selectedGrade === 'a' ? 'bg-purple-600' : 'bg-gray-700'
              }`}
          >
            Grade A
          </button>
          <button
            onClick={() => setSelectedGrade('b')}
            className={`px-4 py-2 rounded-md ${selectedGrade === 'b' ? 'bg-pink-700' : 'bg-gray-700'
              }`}
          >
            Grade B
          </button>
          <button
            onClick={() => setSelectedGrade('c')}
            className={`px-4 py-2 rounded-md ${selectedGrade === 'c' ? 'bg-yellow-600' : 'bg-gray-700'
              }`}
          >
            Grade C
          </button>
          <button
            onClick={() => setSelectedGrade('d')}
            className={`px-4 py-2 rounded-md ${selectedGrade === 'd' ? 'bg-blue-600' : 'bg-gray-700'
              }`}
          >
            Grade D
          </button>
          <button
            onClick={() => setSelectedGrade('no-grade')}
            className={`px-4 py-2 rounded-md ${selectedGrade === 'no-grade' ? 'bg-gray-500' : 'bg-gray-700'
              }`}
          >
            Sem Grade
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedItems.map(item => (
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
                <span className={`px-2 py-1 rounded text-sm font-bold ${item.grade === 'S' ? 'bg-slate-700' :
                    item.grade === 'A' ? 'bg-purple-600' :
                      item.grade === 'B' ? 'bg-pink-700' :
                        item.grade === 'C' ? 'bg-yellow-600' :
                          item.grade === 'D' ? 'bg-blue-600' :
                            'bg-gray-500'
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

      <div className="flex justify-center mt-8">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className="px-4 py-2 mx-1 bg-gray-700 text-white rounded-md disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="px-4 py-2 bg-gray-800 text-white rounded-md">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 mx-1 bg-gray-700 text-white rounded-md disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
