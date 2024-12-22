import { motion } from 'framer-motion';
import { Character } from '../../types/character';
import { formatOnlineTime, formatLastAccess } from '../../utils/time';
import React from 'react';

interface CharacterListProps {
  characters: Character[];
  onCharacterClick: (character: Character) => void;
}

export default function CharacterList({ characters, onCharacterClick }: CharacterListProps) {
  if (characters.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Você ainda não possui personagens.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left">Nome</th>
            <th className="px-6 py-3 text-left">Level</th>
            <th className="px-6 py-3 text-left">Classe</th>
            <th className="px-6 py-3 text-left">Clan</th>
            <th className="px-6 py-3 text-left">Último Acesso</th>
            <th className="px-6 py-3 text-left">Tempo Online</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((char) => (
            <motion.tr
              key={char.login}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t border-gray-700 hover:bg-gray-700/50 transition-colors cursor-pointer"
              onClick={() => onCharacterClick(char)}
            >
              <td className="px-6 py-4 font-medium">{char.name}</td>
              <td className="px-6 py-4">{char.level}</td>
              <td className="px-6 py-4">{char.className}</td>
              <td className="px-6 py-4">{char.clan || '-'}</td>
              <td className="px-6 py-4">{formatLastAccess(char.lastAccess)}</td>
              <td className="px-6 py-4">{formatOnlineTime(char.onlineTime)}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}