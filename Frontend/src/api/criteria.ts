import { API } from "../lib/axios";
import type { Criteria, CriteriaValue } from "../types/spk";

function unwrap<T>(payload: any): T {
  return (payload?.data ?? payload) as T;
}

export async function getCriteria(): Promise<Criteria[]> {
  const res = await API.get("/criteria");
  return unwrap<Criteria[]>(res.data);
}

export async function getAllCriteriaValues(): Promise<CriteriaValue[]> {
  const res = await API.get("/criteria/values/all");
  return unwrap<CriteriaValue[]>(res.data);
}

// GET /api/criteria/:id - publik
export async function getCriteriaById(id: number): Promise<Criteria> {
  const res = await API.get(`/criteria/${id}`);
  return unwrap<Criteria>(res.data);
}

export type CriteriaPayload = Omit<Criteria, "id">;

// POST /api/criteria - admin only. atribut hanya boleh "cost" atau "benefit"
export async function createCriteria(payload: CriteriaPayload): Promise<Criteria> {
  const res = await API.post("/criteria", payload);
  return unwrap<Criteria>(res.data);
}

// PUT /api/criteria/:id - admin only
export async function updateCriteria(id: number, payload: Partial<CriteriaPayload>): Promise<Criteria> {
  const res = await API.put(`/criteria/${id}`, payload);
  return unwrap<Criteria>(res.data);
}

// DELETE /api/criteria/:id - admin only
export async function deleteCriteria(id: number): Promise<void> {
  await API.delete(`/criteria/${id}`);
}

// GET /api/criteria/values/:id - publik
export async function getCriteriaValueById(id: number): Promise<CriteriaValue> {
  const res = await API.get(`/criteria/values/${id}`);
  return unwrap<CriteriaValue>(res.data);
}

export type CriteriaValuePayload = Omit<CriteriaValue, "id">;

// POST /api/criteria/values - admin only
export async function createCriteriaValue(payload: CriteriaValuePayload): Promise<CriteriaValue> {
  const res = await API.post("/criteria/values", payload);
  return unwrap<CriteriaValue>(res.data);
}

// PUT /api/criteria/values/:id - admin only
export async function updateCriteriaValue(id: number, payload: Partial<CriteriaValuePayload>): Promise<CriteriaValue> {
  const res = await API.put(`/criteria/values/${id}`, payload);
  return unwrap<CriteriaValue>(res.data);
}

// DELETE /api/criteria/values/:id - admin only
export async function deleteCriteriaValue(id: number): Promise<void> {
  await API.delete(`/criteria/values/${id}`);
}
