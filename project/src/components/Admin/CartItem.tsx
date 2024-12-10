import { ShopItem } from '../../types/shop';
import React from 'react';

interface CartItemProps {
  item: ShopItem;
  index: number;
  onRemove: (id: string) => void;
}

export default function CartItem({ item, index, onRemove }: CartItemProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-white">
          <span className="text-gray-400 mr-2">{index + 1}.</span>
          {item.name}
        </p>
        <p className="text-yellow-400">{item.price} L2 Coins</p>
      </div>
      <button
        onClick={() => onRemove(item.cartId!)}
        className="text-red-500 hover:text-red-600"
      >
        Remover
      </button>
    </div>
  );
}