import { Character } from '../../types/character';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { formatOnlineTime, formatLastAccess } from '../../utils/time';
import StatBar from './StatBar';
import StatGroup from './StatGroup';
import React from 'react';

interface CharacterModalProps {
  character: Character;
  onClose: () => void;
}

export default function CharacterModal({ character, onClose }: CharacterModalProps) {
  const combatStats = [
    { label: 'P.Atk', value: character.stats.pAtk },
    { label: 'M.Atk', value: character.stats.mAtk },
    { label: 'P.Def', value: character.stats.pDef },
    { label: 'M.Def', value: character.stats.mDef },  
    { label: 'Accuracy', value: character.stats.accuracy },
    { label: 'Evasion', value: character.stats.evasion },
    { label: 'Crit Rate', value: character.stats.critRate },
    { label: 'Speed', value: character.stats.speed },
    { label: 'Atk.Spd', value: character.stats.atkSpd },
    { label: 'Cast.Spd', value: character.stats.castSpd },
  ];

  const basicStats = [
    { label: 'STR', value: character.stats.str },
    { label: 'DEX', value: character.stats.dex },
    { label: 'CON', value: character.stats.con },
    { label: 'INT', value: character.stats.int },
    { label: 'WIT', value: character.stats.wit },
    { label: 'MEN', value: character.stats.men },
  ];

  const socialStats = [
    { label: 'PvP/PK', value: character.social.pvpPk },
    { label: 'Karma', value: character.social.karma },
    { label: 'Fame', value: character.social.fame },
  ];
  const activityStats = [
    { label: 'Último Acesso', value: formatLastAccess(character.Activity.lastAccess) },
    { label: 'Tempo Online', value: formatOnlineTime(character.Activity.onlineTime) },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header with Close Button */}
        <div className="flex justify-end p-2">
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Character Info */}
        <div className="px-6 pb-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-2xl font-bold text-white">{character.name}</h2>
                <p className="text-lg text-gray-400">Level {character.level} {character.className}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400">Clan: <span className="text-white">{character.clan}</span></p>
                <p className="text-gray-400">Status: <span className="text-white">{character.status}</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 space-y-4">
          {/* Status Bars */}
          <div className="space-y-1.5 bg-gray-950 p-3 rounded">
            <div className="flex items-center gap-2">
              <span className="w-8 text-sm font-medium text-red-200">HP</span>
              <StatBar current={character.hp.current} max={character.hp.max} type="hp" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 text-sm font-medium text-blue-200">MP</span>
              <StatBar current={character.mp.current} max={character.mp.max} type="mp" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 text-sm font-medium text-orange-200">CP</span>
              <StatBar current={character.cp.current} max={character.cp.max} type="cp" />
            </div>
          </div>

          {/* Stats Groups */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatGroup title="Combat" stats={combatStats} />
            <StatGroup title="Basic" stats={basicStats} />
          </div>

          <StatGroup title="Social" stats={socialStats} />
          <StatGroup title="Activity" stats={activityStats} />
        </div>
      </div>
    </div>
  );
}