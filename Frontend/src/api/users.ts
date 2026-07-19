import { API } from "../lib/axios";
import type { User, UserRole } from "../types/auth";

function unwrap<T>(payload: any): T {
  return (payload?.data ?? payload) as T;
}

export interface CreateUserPayload {
  nama: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UpdateUserPayload {
  nama?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}

// GET /api/users - admin only
export async function getUsers(params?: { page?: number; limit?: number }): Promise<User[]> {
  const res = await API.get("/users", {
    params: { page: params?.page ?? 1, limit: params?.limit ?? 1000 },
  });
  return unwrap<User[]>(res.data);
}

// GET /api/users/:id - admin only
export async function getUserById(id: number): Promise<User> {
  const res = await API.get(`/users/${id}`);
  return unwrap<User>(res.data);
}

// POST /api/users - admin only
export async function createUser(payload: CreateUserPayload): Promise<User> {
  const res = await API.post("/users", payload);
  return unwrap<User>(res.data);
}

// PUT /api/users/:id - admin only
export async function updateUser(id: number, payload: UpdateUserPayload): Promise<User> {
  const res = await API.put(`/users/${id}`, payload);
  return unwrap<User>(res.data);
}

// DELETE /api/users/:id - admin only
export async function deleteUser(id: number): Promise<void> {
  await API.delete(`/users/${id}`);
}