import { useState, useEffect } from 'react';
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface ShopItemContent {
  id: string;
  itemId: string;
  name: string;
  quantity: number;
}

interface ShopItem {
  id?: number;
  itemId: string;
  name: string;
  price: number;
  category: string;
  description: string;
  stats: string;
  image: string;
  contents?: ShopItemContent[];
  dropRates?: { [key: string]: number };
}

interface ItemModalProps {
  item: ShopItem | null;
  onSave: (item: ShopItem) => void;
  onClose: () => void;
}

const defaultFormData: ShopItem = {
  itemId: '',
  name: '',
  price: 0,
  category: 'weapons',
  description: '',
  stats: '',
  image: '',
  contents: [],
  dropRates: {},
};

export default function ItemModal({ item, onSave, onClose }: ItemModalProps) {
  const [formData, setFormData] = useState<ShopItem>(defaultFormData);

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData(defaultFormData);
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const addContent = () => {
    setFormData(prev => ({
      ...prev,
      contents: [...(prev.contents || []), {
        id: Date.now().toString(),
        itemId: Math.random().toString(36).substr(2, 9),
        name: '',
        quantity: 1
      }]
    }));
  };

  const removeContent = (id: string) => {
    setFormData(prev => ({
      ...prev,
      contents: prev.contents?.filter(content => content.id !== id) || []
    }));
  };

  const updateContent = (id: string, field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      contents: prev.contents?.map(content =>
        content.id === id ? { ...content, [field]: value } : content
      ) || []
    }));
  };

  const updateDropRate = (itemName: string, rate: number) => {
    setFormData(prev => ({
      ...prev,
      dropRates: { ...(prev.dropRates || {}), [itemName]: rate }
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">
            {item ? 'Edit Item' : 'Add New Item'}
          </h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-6 w-6 text-gray-400 hover:text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-white">Item ID</label>
            <input
              type="text"
              name="itemId"
              value={formData.itemId}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-white">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-white">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="weapons">Weapons</option>
              <option value="armor">Armor</option>
              <option value="accessories">Accessories</option>
              <option value="consumables">Consumables</option>
              <option value="pets">Pets</option>
              <option value="kits">Kits</option>
              <option value="boxes">Boxes</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-white">Price (L2 Coins)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-white">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          {(formData.category === 'kits' || formData.category === 'boxes') && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-white">Contents</label>
                <button
                  type="button"
                  onClick={addContent}
                  className="flex items-center text-blue-500 hover:text-blue-400"
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Add Item
                </button>
              </div>
              <div className="space-y-2">
                {formData.contents?.map((content) => (
                  <div key={content.id} className="space-y-2 bg-gray-700 p-3 rounded-md">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-white">Item ID</label>
                      <input
                        type="text"
                        value={content.itemId}
                        onChange={(e) => updateContent(content.id, 'itemId', e.target.value)}
                        placeholder="Item ID"
                        className="flex-1 ml-2 bg-gray-600 text-white rounded-md px-3 py-1"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-white">Name</label>
                      <input
                        type="text"
                        value={content.name}
                        onChange={(e) => updateContent(content.id, 'name', e.target.value)}
                        placeholder="Item name"
                        className="flex-1 ml-2 bg-gray-600 text-white rounded-md px-3 py-1"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-white">Quantity</label>
                      <input
                        type="number"
                        value={content.quantity}
                        onChange={(e) => updateContent(content.id, 'quantity', parseInt(e.target.value) || 1)}
                        placeholder="Qty"
                        className="w-20 bg-gray-600 text-white rounded-md px-3 py-1"
                        min="1"
                      />
                    </div>
                    {formData.category === 'boxes' && (
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-white">Drop Rate (%)</label>
                        <input
                          type="number"
                          value={formData.dropRates?.[content.name] || 0}
                          onChange={(e) => updateDropRate(content.name, parseFloat(e.target.value) || 0)}
                          placeholder="%"
                          className="w-20 bg-gray-600 text-white rounded-md px-3 py-1"
                          min="0"
                          max="100"
                        />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeContent(content.id)}
                      className="w-full text-red-500 hover:text-red-400 mt-2"
                    >
                      <TrashIcon className="h-4 w-4 inline mr-1" />
                      Remove Item
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1 text-white">Stats</label>
            <input
              type="text"
              name="stats"
              value={formData.stats}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-white">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {item ? 'Save Changes' : 'Add Item'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}