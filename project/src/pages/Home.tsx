import { motion } from 'framer-motion';
import { ArrowDownTrayIcon, UsersIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <h1 className="text-5xl font-bold mb-6">Bem-vindo ao L2 Troia</h1>
        <p className="text-xl text-gray-300 mb-8">O melhor servidor de Lineage 2 do Brasil</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-red-700 transition"
        >
          JOGAR AGORA
        </motion.button>
      </motion.section>

      {/* Server Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <UsersIcon className="h-12 w-12 mx-auto mb-4 text-blue-500" />
          <h3 className="text-2xl font-bold">1500+</h3>
          <p className="text-gray-400">Jogadores Online</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <ChartBarIcon className="h-12 w-12 mx-auto mb-4 text-green-500" />
          <h3 className="text-2xl font-bold">100x</h3>
          <p className="text-gray-400">Rates</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <ArrowDownTrayIcon className="h-12 w-12 mx-auto mb-4 text-purple-500" />
          <h3 className="text-2xl font-bold">99.9%</h3>
          <p className="text-gray-400">Uptime</p>
        </div>
      </section>

      {/* Features */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Características</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Chronicle</h3>
            <p className="text-gray-400">Interlude</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Exp Rate</h3>
            <p className="text-gray-400">100x</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Drop Rate</h3>
            <p className="text-gray-400">50x</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Adena Rate</h3>
            <p className="text-gray-400">1000x</p>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Últimas Notícias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Novo Evento PvP</h3>
            <p className="text-gray-400 mb-4">Grande evento PvP com premiações exclusivas!</p>
            <span className="text-sm text-gray-500">22/11/2023</span>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Atualização do Servidor</h3>
            <p className="text-gray-400 mb-4">Novas features e melhorias de performance</p>
            <span className="text-sm text-gray-500">21/11/2023</span>
          </div>
        </div>
      </section>
    </div>
  );
}