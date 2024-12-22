import React from "react";

interface StatGroupProps {
    title: string;
    stats: {
        label: string;
        value: number | string;
    }[];
}

export default function StatGroup({ title, stats }: StatGroupProps) {
    return (
        <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="flex justify-between">
                        <span className="text-gray-400">{stat.label}</span>
                        <span className="font-bold">{stat.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}