import { useState, useEffect } from 'react';
import { usePaymentStore } from '../../../store/paymentStore';
import React from 'react';

export default function PaymentHistory() {
  const { getPaymentHistory } = usePaymentStore();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPayments = async () => {
      const history = await getPaymentHistory();
      setPayments(history);
      setLoading(false);
    };
    loadPayments();
  }, [getPaymentHistory]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left">ID</th>
            <th className="px-6 py-3 text-left">User</th>
            <th className="px-6 py-3 text-left">Method</th>
            <th className="px-6 py-3 text-left">Amount</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment: any) => (
            <tr key={payment.id} className="border-t border-gray-700">
              <td className="px-6 py-4">{payment.id}</td>
              <td className="px-6 py-4">{payment.user}</td>
              <td className="px-6 py-4">{payment.method}</td>
              <td className="px-6 py-4">${payment.amount}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    payment.status === 'completed'
                      ? 'bg-green-500'
                      : payment.status === 'pending'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                >
                  {payment.status}
                </span>
              </td>
              <td className="px-6 py-4">{payment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}