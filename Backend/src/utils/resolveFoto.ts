import { Request } from 'express';

/**
 * Menentukan nilai field `foto` yang akan disimpan ke database, berdasarkan:
 * 1. Kalau ada file ter-upload (req.file dari Multer) -> pakai path relatif "/uploads/<filename>"
 * 2. Kalau tidak ada file, tapi field "foto" dikirim di body -> pakai sebagai URL string
 *    (string kosong dianggap "hapus foto" -> null)
 * 3. Kalau field "foto" sama sekali tidak dikirim -> undefined (Prisma akan mengabaikan
 *    field ini saat create/update, artinya foto lama tidak berubah)
 *
 * Return value:
 * - string  -> path/URL foto baru
 * - null    -> foto sengaja dikosongkan
 * - undefined -> tidak ada perubahan pada field foto
 */
export function resolveFoto(req: Request): string | null | undefined {
  const file = req.file as Express.Multer.File | undefined;

  if (file) {
    return `/uploads/${file.filename}`;
  }

  if (Object.prototype.hasOwnProperty.call(req.body, 'foto')) {
    const raw = req.body.foto;
    const trimmed = typeof raw === 'string' ? raw.trim() : '';
    return trimmed === '' ? null : trimmed;
  }

  return undefined;
}

/**
 * Konversi nilai form-data (selalu string) menjadi number.
 * Kalau field tidak dikirim / kosong -> undefined (field diabaikan saat create/update).
 */
export function toNumberOrUndefined(value: unknown): number | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  const n = Number(value);
  return Number.isNaN(n) ? undefined : n;
}