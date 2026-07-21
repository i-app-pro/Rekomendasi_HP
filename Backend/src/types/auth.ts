export interface RegisterInput {
  nama: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

export interface AuthResult {
  token: string;
  user: {
    id: number;
    nama: string;
    email: string;
    role: string;
  };
}