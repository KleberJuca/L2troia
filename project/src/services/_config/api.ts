export interface LoginRequest {
  login: string;
  passoword: string;
}

export interface ApiResponse<TData extends {} = {}> {
  success: true;
  data: TData;
  message: string;
}
