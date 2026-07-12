import { API } from "../lib/axios";
import type { Founder, FounderPayload } from "../types/founder";

function unwrap<T>(payload: any): T {
  return (payload?.data ?? payload) as T;
}

// Ubah FounderPayload jadi FormData. Kalau fotoFile diisi -> dikirim sebagai file
// (multipart/form-data). Kalau tidak, `foto` (string URL, boleh kosong) tetap dikirim
// sebagai field teks biasa supaya alur "URL gambar" lama tetap kompatibel.
function buildFounderFormData(payload: FounderPayload): FormData {
  const fd = new FormData();
  fd.append('nama', payload.nama ?? '');
  fd.append('status', payload.status ?? '');
  fd.append('universitas', payload.universitas ?? '');
  fd.append('framework', payload.framework ?? '');
  fd.append('username_ig', payload.username_ig ?? '');
  fd.append('email', payload.email ?? '');
  fd.append('github', payload.github ?? '');

  if (payload.fotoFile) {
    fd.append('foto', payload.fotoFile);
  } else if (payload.foto !== undefined) {
    fd.append('foto', payload.foto);
  }

  return fd;
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

// POST /api/founders - admin only (multipart/form-data)
export async function createFounder(payload: FounderPayload): Promise<Founder> {
  const res = await API.post("/founders", buildFounderFormData(payload));
  return unwrap<Founder>(res.data);
}

// PUT /api/founders/:id - admin only (multipart/form-data)
export async function updateFounder(id: number, payload: FounderPayload): Promise<Founder> {
  const res = await API.put(`/founders/${id}`, buildFounderFormData(payload));
  return unwrap<Founder>(res.data);
}

// DELETE /api/founders/:id - admin only
export async function deleteFounder(id: number): Promise<void> {
  await API.delete(`/founders/${id}`);
}