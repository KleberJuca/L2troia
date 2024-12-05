import { motion } from 'framer-motion';

export default function Donation() {
  const paymentMethods = [
    {
      name: 'PIX',
      icon: '🔐',
      description: 'Pagamento instantâneo',
      instructions: 'Escaneie o QR Code ou use a chave PIX',
    },
    {
      name: 'PayPal',
      icon: '💳',
      description: 'Pagamento internacional',
      instructions: 'Pague com sua conta PayPal',
    },
    {
      name: 'Cartão de Crédito',
      icon: '💳',
      description: 'Visa, Mastercard, Elo',
      instructions: 'Pagamento em até 12x',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-lg p-6"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Doação</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {paymentMethods.map((method) => (
          <div
            key={method.name}
            className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition"
          >
            <div className="text-4xl mb-4">{method.icon}</div>
            <h3 className="text-xl font-bold mb-2">{method.name}</h3>
            <p className="text-gray-300 mb-4">{method.description}</p>
            <p className="text-sm text-gray-400">{method.instructions}</p>
            <button className="mt-4 w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition">
              Selecionar
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}