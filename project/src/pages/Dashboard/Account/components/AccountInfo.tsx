import { Account } from '../../../../types/account';
import { format } from 'date-fns';
import React from 'react';

interface AccountInfoProps {
  account: Account;
}

export default function AccountInfo({ account }: AccountInfoProps) {
  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Informações da Conta</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Username</span>
          <span>{account.username}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Email</span>
          <span>{account.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Data de Criação</span>
          <span>{format(new Date(account.createdAt), 'dd/MM/yyyy')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Último Login</span>
          <span>{format(new Date(account.lastLogin), 'dd/MM/yyyy HH:mm')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Personagens</span>
          <span>{account.characterCount}</span>
        </div>
      </div>
    </div>
  );
}