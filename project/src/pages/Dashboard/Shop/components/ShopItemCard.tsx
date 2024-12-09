import { motion } from 'framer-motion';
import { useState } from 'react';
import { ShopItem } from '../../../../types/shop';
import { useShopStore } from '../store/shopStore';
import QuantitySelector from './QuantitySelector';

export default function ShopItemCard({ item }: ShopItemCardProps) {
  const { addToCart } = useShopStore();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        ...item,
        cartId: `${item.id}-${Date.now()}-${i}`,
      });
    }
    setQuantity(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-700 rounded-lg overflow-hidden"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
        <p className="text-gray-300 text-sm mb-2">{item.description}</p>
        <p className="text-gray-400 text-xs mb-4">{item.stats}</p>
        <div className="flex justify-between items-center">
          <span className="text-yellow-400 font-bold">{item.price} L2 Coins</span>
          <div className="flex items-center space-x-2">
            <QuantitySelector quantity={quantity} onChange={setQuantity} />
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface ShopItemCardProps {
  item: ShopItem;
}