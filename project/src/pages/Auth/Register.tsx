import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import React from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [acceptedRules, setAcceptedRules] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration - In real app, make API call here
    navigate('/login');
  };

  const gameRules = [
    "1. Respeite todos os jogadores e mantenha um ambiente amigável.",
    "2. É proibido o uso de programas externos (hacks, bots, etc).",
    "3. Não é permitido compartilhar contas ou itens entre contas.",
    "4. O comércio de itens por dinheiro real é estritamente proibido.",
    "5. Respeite as regras de chat e evite spam.",
    "6. Bugs devem ser reportados imediatamente à administração.",
    "7. Contas inativas por mais de 90 dias podem ser deletadas.",
    "8. A administração reserva o direito de banir contas que violem as regras.",
    "9. Todas as transações são monitoradas e registradas.",
    "10. Divirta-se e jogue com fair play!"
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Criar nova conta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-700 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Usuário"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                maxLength={20}
              />
            </div>
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-700 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Confirmar senha"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>
          </div>

          {/* Game Rules */}
          <div className="mt-4">
            <h3 className="text-lg font-bold text-white mb-2">Regras do Jogo</h3>
            <div className="bg-gray-700 p-4 rounded-md h-48 overflow-y-auto">
              {gameRules.map((rule, index) => (
                <p key={index} className="text-gray-300 mb-2">
                  {rule}
                </p>
              ))}
            </div>
          </div>

          {/* Rules Acceptance */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="accept-rules"
              checked={acceptedRules}
              onChange={(e) => setAcceptedRules(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="accept-rules" className="ml-2 text-sm text-gray-300">
              Li e aceito as regras do jogo
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={!acceptedRules}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                acceptedRules
                  ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  : 'bg-gray-600 cursor-not-allowed'
              }`}
            >
              Registrar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}