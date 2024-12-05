import { Link } from 'react-router-dom';
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">L2 Troia</h3>
            <p className="text-gray-400">O melhor servidor de Lineage 2 do Brasil</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/downloads" className="text-gray-400 hover:text-white">Downloads</Link></li>
              <li><Link to="/rankings" className="text-gray-400 hover:text-white">Rankings</Link></li>
              <li><Link to="/support" className="text-gray-400 hover:text-white">Suporte</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Redes Sociais</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Discord</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Facebook</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Instagram</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <p className="text-gray-400">Email: suporte@l2troia.net</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; 2023 L2 Troia. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}