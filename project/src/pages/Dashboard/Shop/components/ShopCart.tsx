import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShopStore } from '../store/shopStore';
import { usePlayerStore } from '../../../../store/playerStore';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import CartItem from './CartItem';

export default function ShopCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeFromCart, clearCart } = useShopStore();
  const { balance, updateBalance } = usePlayerStore();

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const canAfford = balance >= totalPrice;

  const handleCheckout = () => {
    if (canAfford) {
      updateBalance(-totalPrice);
      clearCart();
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        <ShoppingCartIcon className="h-6 w-6" />
        <span className="font-bold">{cart.length}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute right-0 mt-2 w-80 bg-gray-700 rounded-lg shadow-xl z-50"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">Carrinho</h3>
                <div className="text-yellow-400 font-bold">
                  Saldo: {balance} L2 Coins
                </div>
              </div>

              {cart.length === 0 ? (
                <p className="text-gray-400">Seu carrinho está vazio</p>
              ) : (
                <>
                  <div className="space-y-4 mb-4">
                    {cart.map((item, index) => (
                      <CartItem
                        key={item.cartId}
                        item={item}
                        index={index}
                        onRemove={removeFromCart}
                      />
                    ))}
                  </div>
                  <div className="border-t border-gray-600 pt-4">
                    <div className="flex justify-between text-white mb-4">
                      <span>Total:</span>
                      <span className={`font-bold ${canAfford ? 'text-yellow-400' : 'text-red-400'}`}>
                        {totalPrice} L2 Coins
                      </span>
                    </div>
                    {!canAfford && (
                      <p className="text-red-400 text-sm mb-2">
                        Saldo insuficiente para completar a compra
                      </p>
                    )}
                    <div className="space-y-2">
                      <button
                        onClick={handleCheckout}
                        disabled={!canAfford}
                        className={`w-full py-2 rounded-md transition ${
                          canAfford
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Finalizar Compra
                      </button>
                      <button
                        onClick={() => clearCart()}
                        className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                      >
                        Limpar Carrinho
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}