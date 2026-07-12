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

// Body sesuai contoh POST /api/products di README
export type ProductPayload = Omit<ApiProduct, "id" | "brand">;

// POST /api/products - admin only
export async function createProduct(payload: ProductPayload): Promise<ApiProduct> {
  const res = await API.post("/products", payload);
  return unwrap<ApiProduct>(res.data);
}

// PUT /api/products/:id - admin only
export async function updateProduct(id: number, payload: Partial<ProductPayload>): Promise<ApiProduct> {
  const res = await API.put(`/products/${id}`, payload);
  return unwrap<ApiProduct>(res.data);
}

// DELETE /api/products/:id - admin only
export async function deleteProduct(id: number): Promise<void> {
  await API.delete(`/products/${id}`);
}
