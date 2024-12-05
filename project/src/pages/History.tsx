import { motion } from 'framer-motion';
import React from 'react';


export default function History() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12"
      >
        História do Lineage 2 Interlude
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-800 p-6 rounded-lg"
        >
          <img
            src="/images/interlude-castle.jpg"
            alt="Lineage 2 Interlude Castle"
            className="w-full h-auto max-w-full object-cover rounded-lg shadow-lg mb-6"
          />
          <h2 className="text-2xl font-bold mb-4">A Era de Interlude</h2>
          <p className="text-gray-300 mb-4">
            Interlude é considerada por muitos como a era dourada do Lineage 2. Lançada em 2007,
            esta Chronicle trouxe um equilíbrio perfeito entre PvP e PvE, introduzindo novos sistemas
            e melhorias significativas no jogo.
          </p>
          <p className="text-gray-300">
            Com level máximo 80, classes bem balanceadas e um sistema de siege warfare
            aprimorado, Interlude se tornou a Chronicle mais popular entre os jogadores.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Principais Características</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Level máximo: 80</li>
              <li>• Sistema de Sub-classes aprimorado</li>
              <li>• Olympiad balanceada</li>
              <li>• Sistema de Siege Wars refinado</li>
              <li>• Introdução de novos Boss Raids</li>
            </ul>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Mudanças Importantes</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Balanceamento de classes</li>
              <li>• Melhorias no sistema de crafting</li>
              <li>• Novas áreas e dungeons</li>
              <li>• Sistema de clãs aperfeiçoado</li>
            </ul>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 bg-gray-800 p-6 rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-6">Mundo de Aden</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-3">Territórios</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Goddard</li>
              <li>• Rune</li>
              <li>• Aden</li>
              <li>• Giran</li>
              <li>• Gludio</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">Castelos</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Goddard Castle</li>
              <li>• Rune Castle</li>
              <li>• Aden Castle</li>
              <li>• Giran Castle</li>
              <li>• Gludio Castle</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">Raids</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Antharas</li>
              <li>• Valakas</li>
              <li>• Baium</li>
              <li>• Queen Ant</li>
              <li>• Core</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}