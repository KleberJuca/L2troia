import { useState } from 'react';
import { usePaymentStore } from '../../../store/paymentStore';
import React from 'react';

export default function PaymentMethodsConfig() {
  const { paymentMethods, updatePaymentMethod } = usePaymentStore();
  const [editingMethod, setEditingMethod] = useState<string | null>(null);

  const handleSave = (methodId: string, config: any) => {
    updatePaymentMethod(methodId, config);
    setEditingMethod(null);
  };

  return (
    <div className="space-y-6">
      {paymentMethods.map((method) => (
        <div key={method.id} className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">{method.name}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingMethod(method.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Configure
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  method.enabled ? 'bg-green-600' : 'bg-gray-600'
                }`}
              >
                {method.enabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>

          {editingMethod === method.id && (
            <div className="space-y-4">
              {method.type === 'pix' && (
                <div>
                  <label className="block text-sm font-medium mb-1">PIX Key</label>
                  <input
                    type="text"
                    value={method.config.pixKey}
                    onChange={(e) =>
                      handleSave(method.id, { ...method.config, pixKey: e.target.value })
                    }
                    className="w-full bg-gray-700 rounded-md px-4 py-2"
                  />
                </div>
              )}

              {method.type === 'paypal' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Client ID</label>
                  <input
                    type="text"
                    value={method.config.clientId}
                    onChange={(e) =>
                      handleSave(method.id, { ...method.config, clientId: e.target.value })
                    }
                    className="w-full bg-gray-700 rounded-md px-4 py-2"
                  />
                  <label className="block text-sm font-medium mb-1 mt-4">Client Secret</label>
                  <input
                    type="password"
                    value={method.config.clientSecret}
                    onChange={(e) =>
                      handleSave(method.id, {
                        ...method.config,
                        clientSecret: e.target.value,
                      })
                    }
                    className="w-full bg-gray-700 rounded-md px-4 py-2"
                  />
                </div>
              )}

              {method.type === 'creditCard' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Merchant ID</label>
                  <input
                    type="text"
                    value={method.config.merchantId}
                    onChange={(e) =>
                      handleSave(method.id, {
                        ...method.config,
                        merchantId: e.target.value,
                      })
                    }
                    className="w-full bg-gray-700 rounded-md px-4 py-2"
                  />
                  <label className="block text-sm font-medium mb-1 mt-4">API Key</label>
                  <input
                    type="password"
                    value={method.config.apiKey}
                    onChange={(e) =>
                      handleSave(method.id, { ...method.config, apiKey: e.target.value })
                    }
                    className="w-full bg-gray-700 rounded-md px-4 py-2"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}