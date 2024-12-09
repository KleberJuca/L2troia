import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useCoinsManagement } from '../../../hooks/useCoinsManagement';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { coinSettingsSchema, CoinSettingsInput, Currency } from '../../../types/coins';

const currencies: Currency[] = ['USD', 'EUR', 'BRL'];
const currencySymbols: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  BRL: 'R$'
};

export default function AdminCoins() {
  const { settings, loading, error, loadSettings, updateSettings } = useCoinsManagement();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<CoinSettingsInput>({
    resolver: zodResolver(coinSettingsSchema)
  });

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    if (settings) {
      setValue('baseCurrency', settings.baseCurrency);
      setValue('basePrice', settings.basePrice);
      setValue('rates', settings.rates);
    }
  }, [settings, setValue]);

  const baseCurrency = watch('baseCurrency') as Currency;
  const basePrice = watch('basePrice');

  const onSubmit = async (data: CoinSettingsInput) => {
    try {
      await updateSettings(data);
      alert('Coin settings updated successfully!');
    } catch (error) {
      alert('Failed to update coin settings');
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
      <h1 className="text-2xl font-bold">Coins Management</h1>

      <div className="bg-gray-800 p-6 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Base Currency</label>
              <select
                {...register('baseCurrency')}
                className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency} ({currencySymbols[currency]})
                  </option>
                ))}
              </select>
              {errors.baseCurrency && (
                <p className="text-red-500 text-sm mt-1">{errors.baseCurrency.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Base Price per Ticket</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-400">
                  {currencySymbols[baseCurrency]}
                </span>
                <input
                  type="number"
                  step="0.01"
                  {...register('basePrice', { valueAsNumber: true })}
                  className="w-full bg-gray-700 rounded-md px-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {errors.basePrice && (
                <p className="text-red-500 text-sm mt-1">{errors.basePrice.message}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Exchange Rates</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currencies.map((currency) => (
                <div key={currency}>
                  <label className="block text-sm font-medium mb-1">
                    {currency} Rate
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.0001"
                      {...register(`rates.${currency}` as any, { valueAsNumber: true })}
                      className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {errors.rates?.[currency] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.rates[currency]?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Price Preview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currencies.map((currency) => {
                const rate = watch(`rates.${currency}`);
                const price = basePrice * (rate || 0);
                return (
                  <div key={currency} className="text-center">
                    <p className="font-bold">{currency}</p>
                    <p className="text-xl text-yellow-400">
                      {currencySymbols[currency]}{price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-400">per ticket</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Save Settings
            </button>
          </div>

          {settings && (
            <div className="text-sm text-gray-400 text-right">
              Last updated: {new Date(settings.updatedAt).toLocaleString()}
            </div>
          )}
        </form>
      </div>
    </motion.div>
  );
}