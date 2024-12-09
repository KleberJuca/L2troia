import { useEffect } from 'react';
import { useTermsManagement } from '../../hooks/useTermsManagement';

export default function Terms() {
  const { terms, loading, loadTerms } = useTermsManagement();

  useEffect(() => {
    loadTerms('donation');
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const donationTerms = terms?.find(term => term.type === 'donation');

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Termos e Condições</h2>
      <div className="prose prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: donationTerms?.content || 'Carregando termos...' }} />
      </div>
    </div>
  );
}