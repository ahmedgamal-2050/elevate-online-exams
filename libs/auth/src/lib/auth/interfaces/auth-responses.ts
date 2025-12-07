export interface AuthResponse extends GeneralSuccessResponse {
  token: string;
  user: User;
}

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  isVerified: boolean;
  _id: string;
  createdAt: string;
}

export interface AuthAdaptor extends GeneralSuccessResponse {
  token: string;
  email: string;
}

export interface GeneralSuccessResponse {
  message: string;
}
