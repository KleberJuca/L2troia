import { useState } from 'react';
import { Account, AccountDeletionInput } from '../../../../types/account';
import React from 'react';

interface AccountDeletionProps {
  account: Account;
}

export default function AccountDeletion({ account }: AccountDeletionProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [doubleConfirmed, setDoubleConfirmed] = useState(false);
  const [formData, setFormData] = useState<AccountDeletionInput>({
    username: '',
    password: '',
    confirmation: false
  });

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.username !== account.username) {
      alert('Username incorreto!');
      return;
    }
    // Handle account deletion logic here
    console.log('Deleting account:', formData);
  };

  if (!showConfirmation) {
    return (
      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Excluir Conta</h3>
        <p className="text-gray-400 mb-4">
          Esta ação é irreversível. Todos os seus dados e personagens serão perdidos permanentemente.
        </p>
        <button
          onClick={() => setShowConfirmation(true)}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
        >
          Excluir Minha Conta
        </button>
      </div>
    );
  }

  if (!doubleConfirmed) {
    return (
      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Confirmação</h3>
        <p className="text-red-400 mb-4">
          Você tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita!
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => setDoubleConfirmed(true)}
            className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
          >
            Sim, quero excluir
          </button>
          <button
            onClick={() => setShowConfirmation(false)}
            className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Excluir Conta</h3>
      <form onSubmit={handleDelete} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full bg-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Senha</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full bg-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="confirm-deletion"
            checked={formData.confirmation}
            onChange={(e) => setFormData({ ...formData, confirmation: e.target.checked })}
            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="confirm-deletion" className="ml-2 text-sm text-gray-400">
            Eu entendo que esta ação é irreversível e todos os meus dados serão perdidos
          </label>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
          >
            Excluir Permanentemente
          </button>
          <button
            type="button"
            onClick={() => {
              setShowConfirmation(false);
              setDoubleConfirmed(false);
            }}
            className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}