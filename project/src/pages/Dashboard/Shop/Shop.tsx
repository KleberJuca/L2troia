import { motion } from 'framer-motion';
import ShopCategories from './components/ShopCategories';
import ShopItems from './components/ShopItems';
import ShopCart from './components/ShopCart';
import { useShopStore } from './store/shopStore';

export default function Shop() {
  const { selectedCategory } = useShopStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-lg p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Shop</h2>
        <ShopCart />
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <ShopCategories />
        </div>
        <div className="md:col-span-3">
          <ShopItems category={selectedCategory} />
        </div>
      </div>
    </motion.div>
  );
}