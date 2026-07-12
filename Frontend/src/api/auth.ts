import { API } from "../lib/axios";
import type { LoginPayload, RegisterPayload, AuthResponseData } from "../types/auth";

// Helper kecil: backend Express umumnya membalas { message, data: {...} }.
// Fungsi ini mencoba ambil dari `data.data` dulu, fallback ke `data` langsung
// supaya tetap jalan walau bentuk response sedikit berbeda.
function unwrap<T>(payload: any): T {
  return (payload?.data ?? payload) as T;
}

export async function loginRequest(payload: LoginPayload): Promise<AuthResponseData> {
  const res = await API.post("/auth/login", payload);
  return unwrap<AuthResponseData>(res.data);
}

export async function registerRequest(payload: RegisterPayload): Promise<AuthResponseData> {
  const res = await API.post("/auth/register", payload);
  return unwrap<AuthResponseData>(res.data);
}
