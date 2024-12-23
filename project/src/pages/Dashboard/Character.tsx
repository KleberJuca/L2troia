import { motion } from 'framer-motion';
import { useState } from 'react';
import CharacterList from '../../components/Dashboard/CharacterList';
import CharacterModal from '../../components/Character/CharacterModal';
import { Character } from '../../types/character';
import React from 'react';

export default function CharacterPage() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [characters] = useState<Character[]>([
    {
      login: "DeathKnight",
      name: "DeathKnight",
      level: 76,
      className: "Paladin",
      clan: "No Clan",
      //status: "Vagabond",
      lastAccess: "2023-11-23T15:30:00",
      onlineTime: 7230,
      hp: { current: 2000, max: 2555 },
      mp: { current: 1651, max: 1651 },
      cp: { current: 824, max: 824 },
      stats: {
        pAtk: 636,
        mAtk: 247,
        pDef: 325,  // Added P.Def value
        mDef: 235,  // Added M.Def value
        accuracy: 110,
        evasion: 110,
        critRate: 88,
        speed: 115,
        atkSpd: 357,
        castSpd: 213,
        str: 42,
        dex: 30,
        con: 41,
        int: 21,
        wit: 11,
        men: 25
      },
      social: {
        pvpPk: 0,
        karma: 0,
        fame: 0
      },
      Activity : {
        lastAccess: "2023-11-23T15:30:00",
        onlineTime: 7230
      }
    }
  ]);

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-6">Meus Personagens</h2>
      <CharacterList characters={characters} onCharacterClick={handleCharacterClick} />
      
      {selectedCharacter && (
        <CharacterModal 
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </motion.div>
  );
}