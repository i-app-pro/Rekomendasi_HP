import { API } from "../lib/axios";
import type { Brand } from "../types/product";

function unwrap<T>(payload: any): T {
  return (payload?.data ?? payload) as T;
}

export async function getBrands(): Promise<Brand[]> {
  const res = await API.get("/brands");
  return unwrap<Brand[]>(res.data);
}

// GET /api/brands/:id - publik
export async function getBrandById(id: number): Promise<Brand> {
  const res = await API.get(`/brands/${id}`);
  return unwrap<Brand>(res.data);
}

// POST /api/brands - admin only
export async function createBrand(nama: string): Promise<Brand> {
  const res = await API.post("/brands", { nama });
  return unwrap<Brand>(res.data);
}

// PUT /api/brands/:id - admin only
export async function updateBrand(id: number, nama: string): Promise<Brand> {
  const res = await API.put(`/brands/${id}`, { nama });
  return unwrap<Brand>(res.data);
}

// DELETE /api/brands/:id - admin only
export async function deleteBrand(id: number): Promise<void> {
  await API.delete(`/brands/${id}`);
}
