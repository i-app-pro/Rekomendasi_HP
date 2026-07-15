import { API } from './axios';

/**
 * Backend sekarang bisa mengembalikan `foto` dalam 2 bentuk:
 * 1. URL absolut (mis. "https://example.com/img.jpg") -> tampilkan apa adanya.
 * 2. Path relatif hasil upload file (mis. "/uploads/167xxx.jpg") -> perlu digabung
 *    dengan origin server backend supaya bisa dimuat oleh <img>.
 *
 * Fungsi ini otomatis mendeteksi bentuk mana yang dipakai.
 */
export function resolveImageUrl(foto?: string | null): string | undefined {
  if (!foto) return undefined;

  // Sudah URL absolut atau data URI (mis. hasil legacy base64) -> pakai langsung.
  if (/^(https?:)?\/\//i.test(foto) || foto.startsWith('data:')) {
    return foto;
  }

  // Path relatif dari backend (mis. "/uploads/xxx.jpg") -> gabung dengan origin API.
  // API.defaults.baseURL biasanya diakhiri "/api", buang supaya nyambung ke root server
  // tempat folder /uploads di-serve secara statis.
  const base = (API.defaults.baseURL || '').replace(/\/api\/?$/, '');
  const path = foto.startsWith('/') ? foto : `/${foto}`;
  return `${base}${path}`;
}