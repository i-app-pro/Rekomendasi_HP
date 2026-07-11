export interface UserSafe {
  id: number;
  nama: string;
  email: string;
  role: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateUserInput {
  nama: string;
  email: string;
  password: string;
  role?: 'admin' | 'customers';
}

export interface UpdateUserInput {
  nama?: string;
  email?: string;
  password?: string;
  role?: 'admin' | 'customers';
}

export interface UpdateProfileInput {
  nama?: string;
  email?: string;
}