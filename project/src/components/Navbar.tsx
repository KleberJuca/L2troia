import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="L2 Troia" className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold">L2 Troia</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
            <Link to="/downloads" className="text-gray-300 hover:text-white transition">Downloads</Link>
            <Link to="/rankings" className="text-gray-300 hover:text-white transition">Rankings</Link>
            <Link to="/history" className="text-gray-300 hover:text-white transition">História</Link>
            <Link to="/wiki" className="text-gray-300 hover:text-white transition">Wiki</Link>
            <Link to="/support" className="text-gray-300 hover:text-white transition">Suporte</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-gray-300 hover:text-white transition">Home</Link>
              <Link to="/downloads" className="block px-3 py-2 text-gray-300 hover:text-white transition">Downloads</Link>
              <Link to="/rankings" className="block px-3 py-2 text-gray-300 hover:text-white transition">Rankings</Link>
              <Link to="/history" className="block px-3 py-2 text-gray-300 hover:text-white transition">História</Link>
              <Link to="/wiki" className="block px-3 py-2 text-gray-300 hover:text-white transition">Wiki</Link>
              <Link to="/support" className="block px-3 py-2 text-gray-300 hover:text-white transition">Suporte</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}