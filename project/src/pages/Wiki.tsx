import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import React from 'react';


interface Item {
  id: number;
  name: string;
  description: string;
  translatedDescription?: string;
  type?: string;
  grade?: string;
  stats?: string;
  weight?: string;
  baseEffect?: string;
}

export default function Wiki() {
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState<"en" | "pt">("en");
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 20;

  useEffect(() => {
    async function fetchItems() {
      const response = await fetch("/itemname-e.csv");
      const text = await response.text();

      const parsedItems = text
        .split("\n")
        .slice(1)
        .map((line) => {
          const [id, name, , description, type, grade, stats, weight, baseEffect] =
            line.split("\;");
          return {
            id: parseInt(id, 10),
            name: name?.trim(),
            description: description?.replace(/\\0/g, "").trim(),
            type: type?.trim(),
            grade: grade?.trim(),
            stats: stats?.trim(),
            weight: weight?.trim(),
            baseEffect: baseEffect?.trim(),
          };
        })
        .filter((item) => item.name);

      setItems(parsedItems);
    }

    fetchItems();
  }, []);

  const translateItemsForPage = async (itemsToTranslate: Item[]) => {
    setLoading(true);
    const translatedItems = await Promise.all(
      itemsToTranslate.map(async (item) => {
        if (item.translatedDescription) {
          return item;
        }

        const response = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
            item.description
          )}&langpair=en|pt`
        );
        const data = await response.json();
        return {
          ...item,
          translatedDescription: data.responseData.translatedText || item.description,
        };
      })
    );

    setItems((prevItems) =>
      prevItems.map((item) =>
        translatedItems.find((translated) => translated.id === item.id) || item
      )
    );
    setLoading(false);
  };

  useEffect(() => {
    if (language === "pt") {
      const itemsOnCurrentPage = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
      translateItemsForPage(itemsOnCurrentPage);
    }
  }, [language, currentPage]);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Wiki de Itens - Lineage 2 Interlude
      </motion.h1>

      <div className="mb-8">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Pesquisar itens..."
            className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="ml-4 bg-gray-700 rounded-md px-4 py-2"
            value={language}
            onChange={(e) => setLanguage(e.target.value as "en" | "pt")}
          >
            <option value="en">English</option>
            <option value="pt">Português</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-400">Carregando traduções...</div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-md p-4"
              >
                <h3 className="text-2xl font-bold text-blue-400 mb-2">
                  {item.name} {item.grade && <span className="text-sm">({item.grade})</span>}
                </h3>
                <p className="text-sm text-gray-400 uppercase mb-2">{item.type}</p>
                {item.stats && (
                  <div className="mb-2">
                    <p className="text-gray-300 text-sm">Stats: {item.stats}</p>
                  </div>
                )}
                {item.weight && (
                  <div className="mb-2">
                    <p className="text-gray-300 text-sm">Weight: {item.weight}</p>
                  </div>
                )}
                <p className="text-gray-400 text-base mb-2">
                  {language === "en"
                    ? item.description
                    : item.translatedDescription || item.description}
                </p>
                {item.baseEffect && (
                  <div className="text-gray-300 text-sm">
                    <strong>Efeito Base:</strong> {item.baseEffect}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 mx-1 bg-gray-700 text-white rounded-md disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span className="px-4 py-2 bg-gray-800 text-white rounded-md">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="px-4 py-2 mx-1 bg-gray-700 text-white rounded-md disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Próximo
            </button>
          </div>
        </>
      )}
    </div>
  );
}
