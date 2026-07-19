import { exportToExcel, type ExcelRow } from '../../lib/exportExcel';

interface ExportExcelButtonProps {
  /** Data yang mau diexport, harus sudah flat (lihat exportToExcel di lib/exportExcel.ts) */
  data: ExcelRow[];
  /** Nama file tanpa ekstensi, misal "data-user" -> jadi data-user_2026-07-19-....xlsx */
  fileName: string;
  /** Nama sheet di dalam file Excel */
  sheetName?: string;
  /** Teks tombol, default "Export Excel" */
  label?: string;
  className?: string;
}

// Dipakai di: UserPage, ProductPage, KriteriaBobotView (bobot & matriks), SawView, WpView, TopsisView.
export default function ExportExcelButton({
  data,
  fileName,
  sheetName,
  label = 'Export Excel',
  className = '',
}: ExportExcelButtonProps) {
  const handleExport = () => {
    exportToExcel(data, fileName, sheetName);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={!data || data.length === 0}
      title={!data || data.length === 0 ? 'Tidak ada data untuk diexport' : undefined}
      className={`px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-md active:scale-95 transition-all flex items-center gap-2 text-sm w-full md:w-auto justify-center cursor-pointer ${className}`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      {label}
    </button>
  );
}