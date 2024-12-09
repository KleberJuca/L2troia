import { Terms, TermsInput } from '../../types/terms';

// In-memory storage for demo purposes
let terms: Terms[] = [
  {
    id: 1,
    type: 'game',
    content: `1. Respeite todos os jogadores e mantenha um ambiente amigável.
2. É proibido o uso de programas externos (hacks, bots, etc).
3. Não é permitido compartilhar contas ou itens entre contas.
4. O comércio de itens por dinheiro real é estritamente proibido.
5. Respeite as regras de chat e evite spam.
6. Bugs devem ser reportados imediatamente à administração.
7. Contas inativas por mais de 90 dias podem ser deletadas.
8. A administração reserva o direito de banir contas que violem as regras.
9. Todas as transações são monitoradas e registradas.
10. Divirta-se e jogue com fair play!`,
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    type: 'donation',
    content: `Termos de Doação:

1. Todas as doações são voluntárias e não reembolsáveis.
2. Os créditos adquiridos são para uso exclusivo no servidor L2 Troia.
3. Os itens comprados com créditos não podem ser comercializados por dinheiro real.
4. A administração não se responsabiliza por doações realizadas em contas erradas.
5. Em caso de banimento da conta, os créditos não serão reembolsados.
6. Os preços e promoções podem ser alterados sem aviso prévio.
7. Ao realizar uma doação, você concorda com todos os termos acima.`,
    updatedAt: new Date().toISOString()
  }
];

export const termsService = {
  getTerms: async (type?: 'game' | 'donation'): Promise<Terms[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return type ? terms.filter(t => t.type === type) : terms;
  },

  updateTerms: async (id: number, data: TermsInput): Promise<Terms> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = terms.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Terms not found');
    }

    const updatedTerms = {
      ...terms[index],
      ...data,
      updatedAt: new Date().toISOString()
    };

    terms = terms.map(t => t.id === id ? updatedTerms : t);
    return updatedTerms;
  }
};