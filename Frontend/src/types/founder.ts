// GET /api/founders (publik) & CRUD /api/founders (admin only)
export interface Founder {
  id: number;
  nama: string;
  status: string;
  universitas: string;
  framework: string;
  username_ig: string;
  email: string;
  github: string;
  // Bisa berisi path relatif hasil upload file (mis. "/uploads/xxx.jpg") ATAU
  // URL gambar penuh (mis. "https://..."). Selalu tampilkan lewat
  // resolveImageUrl() dari "../lib/resolveImageUrl", jangan pakai langsung sebagai src <img>.
  foto?: string | null;
}

// Payload untuk create/update founder dari form.
// - foto: dipakai kalau mode input = URL (string URL gambar)
// - fotoFile: dipakai kalau mode input = Upload File (File asli dari <input type="file">)
// Kalau fotoFile diisi, itu yang dipakai backend (URL string di `foto` diabaikan).
export interface FounderPayload {
  nama: string;
  status: string;
  universitas: string;
  framework: string;
  username_ig?: string;
  email: string;
  github?: string;
  foto?: string;
  fotoFile?: File | null;
}