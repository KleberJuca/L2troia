import React from 'react';

interface StatBarProps {
    current: number;
    max: number;
    type: 'hp' | 'mp' | 'cp' | 'exp';
}

export default function StatBar({ current, max, type }: StatBarProps) {
    const getBarColor = () => {
        switch (type) {
            case 'hp': return 'bg-red-600'; // Bright red for HP
            case 'mp': return 'bg-blue-500'; // Bright blue for MP
            case 'cp': return 'bg-orange-500'; // Orange for CP
            case 'exp': return 'bg-green-600';
            default: return 'bg-gray-600';
        }
    };

    const getTextColor = () => {
        switch (type) {
            case 'hp': return 'text-red-200';
            case 'mp': return 'text-blue-200';
            case 'cp': return 'text-orange-200';
            default: return 'text-white';
        }
    };

    const percentage = (current / max) * 100;

    return (
        <div className="relative h-5 bg-gray-900 rounded border border-gray-700 w-full">
            <div
                className={`absolute h-full ${getBarColor()} rounded-sm transition-all duration-300`}
                style={{ width: `${percentage}%` }}
            />
            <div className={`absolute w-full h-full flex items-center justify-center text-xs font-medium ${getTextColor()}`}>
                {current}/{max}
            </div>
        </div>
    );
}