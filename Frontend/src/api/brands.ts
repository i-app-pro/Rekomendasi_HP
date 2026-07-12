import { API } from "../lib/axios";
import type { Brand } from "../types/product";

function unwrap<T>(payload: any): T {
  return (payload?.data ?? payload) as T;
}

export async function getBrands(): Promise<Brand[]> {
  const res = await API.get("/brands");
  return unwrap<Brand[]>(res.data);
}
