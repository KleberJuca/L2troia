export interface Account {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    characterCount: number;
    lastLogin: string;
  }
  
  export interface PasswordChangeInput {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
  
  export interface AccountDeletionInput {
    username: string;
    password: string;
    confirmation: boolean;
  }