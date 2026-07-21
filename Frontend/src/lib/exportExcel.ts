import * as XLSX from 'xlsx';

// Baris siap-export: 1 objek = 1 baris, key objek = nama kolom di Excel.

export type ExcelRow = Record<string, string | number | boolean | null | undefined>;

/**
 * Export array data ke file .xlsx dan langsung memicu download di browser.
 *
 * @param rows      Data yang sudah "flat" (bukan nested object/array per cell).
 *                  Kalau ada field nested (misal a_plus/a_minus di TOPSIS),
 *                  flatten dulu jadi kolom-kolom terpisah SEBELUM dipanggil ke sini.
 * @param fileName  Nama file tanpa ekstensi. Timestamp otomatis ditambahkan
 *                  supaya file lama tidak ketimpa kalau export berkali-kali.
 * @param sheetName Nama sheet di dalam file Excel (default: "Sheet1").
 */
export function exportToExcel(rows: ExcelRow[], fileName: string, sheetName: string = 'Sheet1'): void {
  if (!rows || rows.length === 0) {
    alert('Tidak ada data untuk diexport.');
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Auto-lebarkan kolom berdasarkan panjang konten terpanjang, supaya file
  // yang di-download tidak perlu di-resize manual satu-satu oleh admin.
  const columnKeys = Object.keys(rows[0]);
  worksheet['!cols'] = columnKeys.map((key) => {
    const maxLen = rows.reduce((max, row) => {
      const value = row[key];
      const len = value === null || value === undefined ? 0 : String(value).length;
      return Math.max(max, len);
    }, key.length);
    return { wch: Math.min(Math.max(maxLen + 2, 10), 40) };
  });

  const timestamp = new Date()
    .toISOString()
    .slice(0, 19)
    .replace(/[:T]/g, '-'); // contoh: 2026-07-19-14-30-00

  XLSX.writeFile(workbook, `${fileName}_${timestamp}.xlsx`);
}