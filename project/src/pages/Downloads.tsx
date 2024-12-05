import { motion } from 'framer-motion';
import { ArrowDownTrayIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

export default function Downloads() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Downloads
      </motion.h1>

      {/* Client Download Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-800 p-6 rounded-lg"
        >
          <div className="flex items-center mb-4">
            <ArrowDownTrayIcon className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-2xl font-bold">Cliente Completo</h2>
          </div>
          <p className="text-gray-400 mb-4">Download do cliente completo do L2 Troia</p>
          <ul className="text-gray-300 mb-6 space-y-2">
            <li>• Versão: 1.5.2</li>
            <li>• Tamanho: 4.2 GB</li>
            <li>• Última atualização: 22/11/2023</li>
          </ul>
          <button className="btn-primary w-full">Download Cliente</button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-800 p-6 rounded-lg"
        >
          <div className="flex items-center mb-4">
            <ArrowDownTrayIcon className="h-8 w-8 text-green-500 mr-3" />
            <h2 className="text-2xl font-bold">Patch Atualizado</h2>
          </div>
          <p className="text-gray-400 mb-4">Patch com as últimas atualizações do servidor</p>
          <ul className="text-gray-300 mb-6 space-y-2">
            <li>• Versão: 1.2.0</li>
            <li>• Tamanho: 250 MB</li>
            <li>• Última atualização: 22/11/2023</li>
          </ul>
          <button className="btn-primary w-full">Download Patch</button>
        </motion.div>
      </div>

      {/* System Requirements */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 bg-gray-800 p-6 rounded-lg"
      >
        <div className="flex items-center mb-6">
          <ComputerDesktopIcon className="h-8 w-8 text-purple-500 mr-3" />
          <h2 className="text-2xl font-bold">Requisitos do Sistema</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-3">Mínimos</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Windows 7/8/10</li>
              <li>• Processador 2.0 GHz</li>
              <li>• 2 GB RAM</li>
              <li>• 5 GB Espaço em Disco</li>
              <li>• DirectX 9.0c</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">Recomendados</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Windows 10/11</li>
              <li>• Processador 3.0 GHz</li>
              <li>• 4 GB RAM</li>
              <li>• 10 GB Espaço em Disco</li>
              <li>• DirectX 11</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}