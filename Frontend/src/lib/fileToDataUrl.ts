// Convert File (dari <input type="file">) jadi base64 data URI.
// Dipakai sebagai alternatif "upload" tanpa perlu endpoint upload terpisah di backend —
// hasilnya disimpan sebagai string biasa di field foto (sama seperti kalau isi URL manual).
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Gagal membaca file gambar.'));
    reader.readAsDataURL(file);
  });
}