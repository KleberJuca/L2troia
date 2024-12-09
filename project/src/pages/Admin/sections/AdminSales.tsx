import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useSalesManagement } from '../../../hooks/useSalesManagement';
import { format } from 'date-fns';

export default function AdminSales() {
  const { sales, loading, error, loadSales } = useSalesManagement();

  useEffect(() => {
    loadSales();
  }, []);

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
      <h1 className="text-2xl font-bold">Sales Log</h1>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">User</th>
              <th className="px-6 py-3 text-left">Items</th>
              <th className="px-6 py-3 text-left">Total Amount</th>
              <th className="px-6 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="border-t border-gray-700">
                <td className="px-6 py-4">{sale.id}</td>
                <td className="px-6 py-4">{sale.username}</td>
                <td className="px-6 py-4">
                  <ul className="list-disc list-inside">
                    {sale.items.map((item, index) => (
                      <li key={index}>
                        {item.name} x{item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4">{sale.totalAmount} L2 Coins</td>
                <td className="px-6 py-4">
                  {format(new Date(sale.purchaseDate), 'dd/MM/yyyy HH:mm:ss')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sales Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Total Sales</h3>
          <p className="text-2xl text-green-500">
            {sales.reduce((sum, sale) => sum + sale.totalAmount, 0)} L2 Coins
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Total Transactions</h3>
          <p className="text-2xl">{sales.length}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Average Transaction</h3>
          <p className="text-2xl">
            {sales.length > 0
              ? Math.round(
                  sales.reduce((sum, sale) => sum + sale.totalAmount, 0) / sales.length
                )
              : 0}{' '}
            L2 Coins
          </p>
        </div>
      </div>
    </motion.div>
  );
}