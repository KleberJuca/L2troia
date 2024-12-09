import { motion } from 'framer-motion';
import { useState } from 'react';
import PaymentMethodsConfig from '../components/PaymentMethodsConfig';
import PaymentHistory from '../components/PaymentHistory';
import PaymentStats from '../components/PaymentStats';

export default function AdminPayments() {
  const [activeTab, setActiveTab] = useState('methods');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold">Payment Management</h1>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('methods')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'methods' ? 'bg-blue-600 text-white' : 'bg-gray-700'
          }`}
        >
          Payment Methods
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'history' ? 'bg-blue-600 text-white' : 'bg-gray-700'
          }`}
        >
          Payment History
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'stats' ? 'bg-blue-600 text-white' : 'bg-gray-700'
          }`}
        >
          Statistics
        </button>
      </div>

      {activeTab === 'methods' && <PaymentMethodsConfig />}
      {activeTab === 'history' && <PaymentHistory />}
      {activeTab === 'stats' && <PaymentStats />}
    </motion.div>
  );
}