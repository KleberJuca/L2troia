import { categories } from '../data/categories';
import { useShopStore } from '../store/shopStore';

export default function ShopCategories() {
  const { selectedCategory, setSelectedCategory } = useShopStore();

  return (
    <div className="bg-gray-700 rounded-lg p-4">
      <h3 className="text-lg font-bold mb-4 text-white">Categorias</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`w-full text-left px-4 py-2 rounded-md transition flex items-center ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-600'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}