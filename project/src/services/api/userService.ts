import { User, UserUpdateInput, BalanceUpdateInput } from '../../types/user';

// In-memory storage for demo purposes
let users: User[] = [
  {
    id: 1,
    username: 'player1',
    email: 'player1@example.com',
    status: 'active',
    lastLogin: '2023-11-22 10:30:00',
    createdAt: '2023-11-01',
    balance: 1000
  },
  {
    id: 2,
    username: 'player2',
    email: 'player2@example.com',
    status: 'banned',
    lastLogin: '2023-11-21 15:45:00',
    createdAt: '2023-11-02',
    banReason: 'Using unauthorized software',
    balance: 500
  }
];

export const userService = {
  getUsers: async (): Promise<User[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return users;
  },

  updateUser: async (id: number, data: UserUpdateInput): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    const updatedUser = { ...users[index], ...data };
    users = users.map(user => user.id === id ? updatedUser : user);
    return updatedUser;
  },

  updateBalance: async (id: number, data: BalanceUpdateInput): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    
    const user = users[index];
    const newBalance = user.balance + data.amount;
    
    if (newBalance < 0) {
      throw new Error('Balance cannot be negative');
    }
    
    const updatedUser = { 
      ...user, 
      balance: newBalance 
    };
    
    users = users.map(u => u.id === id ? updatedUser : u);
    return updatedUser;
  },

  banUser: async (id: number, reason: string): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    const updatedUser = {
      ...users[index],
      status: 'banned' as const,
      banReason: reason
    };
    users = users.map(user => user.id === id ? updatedUser : user);
    return updatedUser;
  },

  unbanUser: async (id: number): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    const updatedUser = {
      ...users[index],
      status: 'active' as const,
      banReason: undefined
    };
    users = users.map(user => user.id === id ? updatedUser : user);
    return updatedUser;
  }
};