import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTermsManagement } from '../../hooks/useTermsManagement';
import { useCoinsManagement } from '../../hooks/useCoinsManagement';
import { Currency } from '../../types/coins';
import React from 'react';

export default function Donation() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState(10);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD');
  const { terms, loading: termsLoading, loadTerms } = useTermsManagement();
  const { settings: coinSettings, loading: coinsLoading, loadSettings: loadCoinSettings } = useCoinsManagement();
  const [donationTerms, setDonationTerms] = useState<string>('');

  useEffect(() => {
    const loadDonationTerms = async () => {
      await loadTerms('donation');
      await loadCoinSettings();
    };
    loadDonationTerms();
  }, []);

  useEffect(() => {
    if (terms && terms.length > 0) {
      const donationTerm = terms.find(term => term.type === 'donation');
      if (donationTerm) {
        setDonationTerms(donationTerm.content);
      }
    }
  }, [terms]);

  const calculateTotal = () => {
    if (!coinSettings) return '0.00';
    const rate = coinSettings.rates[selectedCurrency];
    const basePrice = coinSettings.basePrice * rate;
    return (ticketQuantity * basePrice).toFixed(2);
  };

  const getCurrencySymbol = (currency: Currency) => {
    switch (currency) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'BRL': return 'R$';
    }
  };

  const ticketOptions = Array.from({ length: 10 }, (_, i) => (i + 1) * 10);

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

  const handlePaymentSelect = (method: string) => {
    if (!acceptedTerms) {
      alert('Por favor, aceite os termos antes de prosseguir com o pagamento.');
      return;
    }
    // Handle payment selection
    console.log(`Selected payment method: ${method}`);
  };

  if (termsLoading || coinsLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-lg p-6"
      >
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-lg p-6"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Doação</h2>

      {/* Terms and Conditions */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Termos e Condições</h3>
        <div className="bg-gray-700 p-4 rounded-lg mb-4 h-48 overflow-y-auto">
          <div dangerouslySetInnerHTML={{ __html: donationTerms }} />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="accept-terms"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="accept-terms" className="ml-2 text-sm text-gray-300">
            Eu li e aceito os Termos para compras de créditos expressos acima
          </label>
        </div>

        {/* Ticket Selection */}
        <div className="bg-gray-700 p-4 rounded-lg mb-4">
          <div className="flex flex-col space-y-4">
            <div>
              <label htmlFor="ticket-quantity" className="block text-sm font-medium text-gray-300 mb-2">
                Quantidade de Tickets
              </label>
              <select
                id="ticket-quantity"
                value={ticketQuantity}
                onChange={(e) => setTicketQuantity(Number(e.target.value))}
                className="w-full bg-gray-600 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {ticketOptions.map((value) => (
                  <option key={value} value={value}>
                    {value} tickets
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Moeda
              </label>
              <div className="flex space-x-4">
                {(['USD', 'EUR', 'BRL'] as Currency[]).map((currency) => (
                  <button
                    key={currency}
                    onClick={() => setSelectedCurrency(currency)}
                    className={`px-4 py-2 rounded-md ${
                      selectedCurrency === currency
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-600 text-gray-300'
                    }`}
                  >
                    {currency}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-right">
              <p className="text-gray-300">
                Total: <span className="text-xl font-bold text-yellow-400">
                  {getCurrencySymbol(selectedCurrency)}{calculateTotal()}
                </span>
              </p>
              <p className="text-sm text-gray-400">
                {ticketQuantity} tickets x {getCurrencySymbol(selectedCurrency)}
                {coinSettings ? (coinSettings.basePrice * coinSettings.rates[selectedCurrency]).toFixed(2) : '0.00'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
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
            <button
              onClick={() => handlePaymentSelect(method.name)}
              className={`mt-4 w-full py-2 rounded-lg transition ${
                acceptedTerms
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!acceptedTerms}
            >
              Selecionar
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}