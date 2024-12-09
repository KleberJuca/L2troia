import { motion } from 'framer-motion';
import { CurrencyDollarIcon, UsersIcon, UserGroupIcon, TicketIcon } from '@heroicons/react/24/outline';

export default function AdminHome() {
  // In a real app, these would come from an API
  const metrics = {
    revenue: {
      total: 25000,
      currency: 'USD',
      growth: '+12.5%'
    },
    averageTicket: {
      value: 45.50,
      currency: 'USD',
      growth: '+5.2%'
    },
    onlinePlayers: {
      current: 1234,
      peak: 1500,
      growth: '+8.7%'
    },
    totalRegistrations: {
      total: 5678,
      today: 123,
      growth: '+15.3%'
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue Card */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-blue-500" />
            </div>
            <span className="text-green-500 text-sm">{metrics.revenue.growth}</span>
          </div>
          <h3 className="text-gray-400 text-sm">Faturamento Total</h3>
          <p className="text-2xl font-bold mt-2">
            ${metrics.revenue.total.toLocaleString()}
          </p>
        </div>

        {/* Average Ticket Card */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <TicketIcon className="h-6 w-6 text-purple-500" />
            </div>
            <span className="text-green-500 text-sm">{metrics.averageTicket.growth}</span>
          </div>
          <h3 className="text-gray-400 text-sm">Ticket Médio</h3>
          <p className="text-2xl font-bold mt-2">
            ${metrics.averageTicket.value.toFixed(2)}
          </p>
        </div>

        {/* Online Players Card */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-500/20 p-3 rounded-lg">
              <UsersIcon className="h-6 w-6 text-green-500" />
            </div>
            <span className="text-green-500 text-sm">{metrics.onlinePlayers.growth}</span>
          </div>
          <h3 className="text-gray-400 text-sm">Players Online</h3>
          <p className="text-2xl font-bold mt-2">
            {metrics.onlinePlayers.current.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Pico: {metrics.onlinePlayers.peak.toLocaleString()}
          </p>
        </div>

        {/* Total Registrations Card */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-500/20 p-3 rounded-lg">
              <UserGroupIcon className="h-6 w-6 text-red-500" />
            </div>
            <span className="text-green-500 text-sm">{metrics.totalRegistrations.growth}</span>
          </div>
          <h3 className="text-gray-400 text-sm">Total de Cadastros</h3>
          <p className="text-2xl font-bold mt-2">
            {metrics.totalRegistrations.total.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Hoje: +{metrics.totalRegistrations.today}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Atividade Recente</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Novo registro</span>
              <span className="text-gray-400">5 min atrás</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Compra na loja</span>
              <span className="text-gray-400">15 min atrás</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Doação recebida</span>
              <span className="text-gray-400">1 hora atrás</span>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Status do Sistema</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Status do Servidor</span>
              <span className="text-green-500">Online</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Status do Banco de Dados</span>
              <span className="text-green-500">Conectado</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Último Backup</span>
              <span className="text-gray-400">2 horas atrás</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}