import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChatBubbleLeftIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

export default function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Suporte
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-800 p-6 rounded-lg"
        >
          <div className="flex items-center mb-6">
            <ChatBubbleLeftIcon className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-2xl font-bold">Entre em Contato</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Assunto</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mensagem</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Enviar Mensagem
            </button>
          </form>
        </motion.div>

        {/* FAQ Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-800 p-6 rounded-lg"
        >
          <div className="flex items-center mb-6">
            <QuestionMarkCircleIcon className="h-8 w-8 text-green-500 mr-3" />
            <h2 className="text-2xl font-bold">FAQ</h2>
          </div>
          <div className="space-y-4">
            <div className="border-b border-gray-700 pb-4">
              <h3 className="font-bold mb-2">Como começar a jogar?</h3>
              <p className="text-gray-400">Faça o download do cliente, instale o jogo e patch, crie sua conta e comece sua aventura!</p>
            </div>
            <div className="border-b border-gray-700 pb-4">
              <h3 className="font-bold mb-2">Quais são as rates do servidor?</h3>
              <p className="text-gray-400">EXP: 100x, SP: 100x, Drop: 50x, Adena: 1000x</p>
            </div>
            <div className="border-b border-gray-700 pb-4">
              <h3 className="font-bold mb-2">Como reportar um bug?</h3>
              <p className="text-gray-400">Use nosso sistema de suporte ou entre em contato pelo Discord.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Qual é o horário dos eventos?</h3>
              <p className="text-gray-400">Os eventos acontecem diariamente às 20h (horário de Brasília).</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}