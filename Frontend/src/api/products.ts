import { API } from "../lib/axios";
import type { ApiProduct } from "../types/product";

function unwrap<T>(payload: any): T {
  return (payload?.data ?? payload) as T;
}

export async function getProducts(): Promise<ApiProduct[]> {
  const res = await API.get("/products");
  return unwrap<ApiProduct[]>(res.data);
}

export async function getProductById(id: number | string): Promise<ApiProduct> {
  const res = await API.get(`/products/${id}`);
  return unwrap<ApiProduct>(res.data);
}
