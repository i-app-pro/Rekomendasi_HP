import { API } from "../lib/axios";
import type { Founder, FounderPayload } from "../types/founder";

function unwrap<T>(payload: any): T {
  return (payload?.data ?? payload) as T;
}

// GET /api/founders - publik
export async function getFounders(): Promise<Founder[]> {
  const res = await API.get("/founders");
  return unwrap<Founder[]>(res.data);
}

// GET /api/founders/:id - publik
export async function getFounderById(id: number): Promise<Founder> {
  const res = await API.get(`/founders/${id}`);
  return unwrap<Founder>(res.data);
}

// POST /api/founders - admin only
export async function createFounder(payload: FounderPayload): Promise<Founder> {
  const res = await API.post("/founders", payload);
  return unwrap<Founder>(res.data);
}

// PUT /api/founders/:id - admin only
export async function updateFounder(id: number, payload: Partial<FounderPayload>): Promise<Founder> {
  const res = await API.put(`/founders/${id}`, payload);
  return unwrap<Founder>(res.data);
}

// DELETE /api/founders/:id - admin only
export async function deleteFounder(id: number): Promise<void> {
  await API.delete(`/founders/${id}`);
}
