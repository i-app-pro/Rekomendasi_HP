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
