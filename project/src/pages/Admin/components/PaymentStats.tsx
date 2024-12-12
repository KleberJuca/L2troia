import { useEffect, useState } from 'react';
import { usePaymentStore } from '../../../store/paymentStore';
import React from 'react';

export default function PaymentStats() {
  const { getPaymentStats } = usePaymentStore();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const loadStats = async () => {
      const data = await getPaymentStats();
      setStats(data);
    };
    loadStats();
  }, [getPaymentStats]);

  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Revenue Overview</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Today</span>
            <span>${stats.revenue.today}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>This Week</span>
            <span>${stats.revenue.week}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>This Month</span>
            <span>${stats.revenue.month}</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Payment Methods</h2>
        <div className="space-y-4">
          {Object.entries(stats.methodStats).map(([method, count]: [string, any]) => (
            <div key={method} className="flex justify-between items-center">
              <span>{method}</span>
              <span>{count} transactions</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}