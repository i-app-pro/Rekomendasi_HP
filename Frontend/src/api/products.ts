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

// Body untuk create/update produk dari form.
// - foto: dipakai kalau mode input = URL (string URL gambar)
// - fotoFile: dipakai kalau mode input = Upload File (File asli dari <input type="file">)
// Kalau fotoFile diisi, itu yang dipakai backend (URL string di `foto` diabaikan).
export interface ProductPayload {
  nama: string;
  harga: number;
  ram: number;
  penyimpanan: number;
  baterai: number;
  update_os: number;
  resolusi_kamera: number;
  chipset: string;
  os: string;
  tahun_rilis: string;
  fast_charging: string;
  display: string;
  brands_id: number;
  foto?: string;
  fotoFile?: File | null;
}

// Ubah ProductPayload jadi FormData supaya request selalu multipart/form-data,
// baik saat mode "URL" (foto dikirim sebagai teks) maupun mode "Upload File"
// (foto dikirim sebagai file biner).
function buildProductFormData(payload: ProductPayload): FormData {
  const fd = new FormData();
  fd.append('nama', payload.nama ?? '');
  fd.append('harga', String(payload.harga ?? ''));
  fd.append('ram', String(payload.ram ?? ''));
  fd.append('penyimpanan', String(payload.penyimpanan ?? ''));
  fd.append('baterai', String(payload.baterai ?? ''));
  fd.append('update_os', String(payload.update_os ?? ''));
  fd.append('resolusi_kamera', String(payload.resolusi_kamera ?? ''));
  fd.append('chipset', payload.chipset ?? '');
  fd.append('os', payload.os ?? '');
  fd.append('tahun_rilis', payload.tahun_rilis ?? '');
  fd.append('fast_charging', payload.fast_charging ?? '');
  fd.append('display', payload.display ?? '');
  fd.append('brands_id', String(payload.brands_id ?? ''));

  if (payload.fotoFile) {
    fd.append('foto', payload.fotoFile);
  } else if (payload.foto !== undefined) {
    fd.append('foto', payload.foto);
  }

  return fd;
}

// POST /api/products - admin only (multipart/form-data)
export async function createProduct(payload: ProductPayload): Promise<ApiProduct> {
  const res = await API.post("/products", buildProductFormData(payload));
  return unwrap<ApiProduct>(res.data);
}

// PUT /api/products/:id - admin only (multipart/form-data)
export async function updateProduct(id: number, payload: ProductPayload): Promise<ApiProduct> {
  const res = await API.put(`/products/${id}`, buildProductFormData(payload));
  return unwrap<ApiProduct>(res.data);
}

// DELETE /api/products/:id - admin only
export async function deleteProduct(id: number): Promise<void> {
  await API.delete(`/products/${id}`);
}