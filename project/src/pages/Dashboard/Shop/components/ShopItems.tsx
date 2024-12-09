import { items } from '../data/items';
import ShopItemCard from './ShopItemCard';

interface ShopItemsProps {
  category: string;
}

export default function ShopItems({ category }: ShopItemsProps) {
  const filteredItems = items.filter((item) => item.category === category);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredItems.map((item) => (
        <ShopItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}