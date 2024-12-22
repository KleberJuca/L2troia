export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  login: string;
  accessLevel: number;
}

export interface AuthError {
  message: string;
}