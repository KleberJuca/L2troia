export interface DonationDetails {
  paymentMethod: string;
  amount: number;
  currency: string;
  l2CoinsGenerated: number;
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  type: 'login' | 'purchase' | 'character' | 'donation';
  details?: DonationDetails;
}