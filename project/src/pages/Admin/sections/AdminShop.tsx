import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import ItemModal from '../components/ItemModal';
import { useShopManagement } from '../../../hooks/useShopManagement';
import { formatPrice } from '../../../utils/validation';
import { useState } from 'react';
import { ShopItem } from '../../../types/shop';

export default function AdminShop() {
  const { items, loading, error, loadItems, createItem, updateItem, deleteItem } = useShopManagement();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ShopItem | null>(null);

  useEffect(() => {
    loadItems();
  }, []);

  const handleAddItem = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item: ShopItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteItem = async (itemId: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItem(itemId);
      } catch (error) {
        alert('Failed to delete item');
      }
    }
  };

  const handleSaveItem = async (item: ShopItem) => {
    try {
      if (editingItem) {
        await updateItem(editingItem.id, item);
      } else {
        await createItem(item);
      }
      setIsModalOpen(false);
    } catch (error) {
      alert('Failed to save item');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Shop Management</h1>
        <button
          onClick={handleAddItem}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Item</span>
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Item Name</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-gray-700">
                <td className="px-6 py-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4 capitalize">{item.category}</td>
                <td className="px-6 py-4">{formatPrice(item.price)}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEditItem(item)}
                    className="text-blue-400 hover:text-blue-500 mr-4"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-400 hover:text-red-500"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ItemModal
          item={editingItem}
          onSave={handleSaveItem}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </motion.div>
  );
}