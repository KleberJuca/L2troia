import React from 'react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (value: number) => void;
}

export default function QuantitySelector({ quantity, onChange }: QuantitySelectorProps) {
  return (
    <select
      value={quantity}
      onChange={(e) => onChange(Number(e.target.value))}
      className="bg-gray-600 text-white px-2 py-1 rounded-md text-center"
    >
      {[...Array(10)].map((_, i) => (
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      ))}
    </select>
  );
}