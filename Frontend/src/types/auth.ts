// Role user sesuai kolom `role` di tabel users (README: "customers" / "admin")
export type UserRole = "customers" | "admin";

export interface User {
  id: number;
  nama: string;
  email: string;
  role: UserRole;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  nama: string;
  email: string;
  password: string;
}

// Bentuk response dari POST /api/auth/login & /api/auth/register.
// ASUMSI: backend Express biasanya membungkus response dengan { message, data: {...} }.
// Kalau di Postman ternyata field-nya beda (misal token ada di root, bukan di data),
// tinggal sesuaikan di src/api/auth.ts pada fungsi login/register.
export interface AuthResponseData {
  token: string;
  user: User;
}

export interface ApiWrapped<T> {
  message?: string;
  data: T;
}
