import axios from 'axios';
import { Currency } from '../../types/coins';

const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

export const exchangeRatesService = {
  getExchangeRates: async (baseCurrency: Currency): Promise<Record<Currency, number>> => {
    try {
      const response = await axios.get(`${BASE_URL}/${baseCurrency}`);
      const { rates } = response.data;

      return {
        USD: rates.USD || 1,
        EUR: rates.EUR || 0.92,
        BRL: rates.BRL || 4.95
      };
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
      // Return default rates if API fails
      return {
        USD: 1,
        EUR: 0.92,
        BRL: 4.95
      };
    }
  }
};