import { useEffect, useMemo, useState } from 'react';
import type { RecommendationItem } from '../../../types/spk';
import { getRecommendation } from '../../../api/recommendation';
import ExportExcelButton from '../../../components/ui/ExcelButton';
import type { ExcelRow } from '../../../lib/exportExcel';

interface SawViewProps {
  sessionId: number | null;
}

// VIEW 2/4 — Hasil perhitungan metode SAW (Simple Additive Weighting)
// Sumber data: GET /api/recommendation/saw?session_id=<id>
export default function SawView({ sessionId }: SawViewProps) {
  const [data, setData] = useState<RecommendationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId === null) {
      setData([]);
      return;
    }
    let mounted = true;
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const items = await getRecommendation('saw', sessionId);
        if (mounted) setData(items);
      } catch (err) {
        console.error('Gagal memuat hasil SAW:', err);
        if (mounted) setError('Gagal memuat hasil perhitungan SAW untuk sesi ini.');
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [sessionId]);

  // Baris export excel mengikuti kolom yang tampil di tabel (Rank, Produk, Brand, Customer, Harga, Skor SAW)
  const exportRows: ExcelRow[] = useMemo(
    () =>
      data.map((row) => ({
        Rank: row.ranking,
        Produk: row.nama_hp,
        Brand: row.brand,
        Customer: row.nama_customer ?? '-',
        'Harga (Rp)': row.harga,
        'Skor SAW': Number(row.skor.toFixed(3)),
      })),
    [data]
  );

  if (sessionId === null) {
    return (
      <div className="text-center py-10 text-slate-500 font-medium bg-white rounded-xl border border-slate-200">
        Pilih sesi SPK dulu di atas untuk melihat hasil metode SAW.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <h3 className="font-bold text-slate-700">Hasil Metode SAW — Sesi #{sessionId}</h3>
        <ExportExcelButton data={exportRows} fileName={`hasil-saw-sesi-${sessionId}`} sheetName="SAW" />
      </div>

      {isLoading && <p className="text-sm font-medium text-slate-500">Menghitung...</p>}
      {error && <p className="text-sm font-bold text-red-600">{error}</p>}

      {!isLoading && !error && (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left border-separate" style={{ borderSpacing: '0 12px' }}>
            <thead className="text-sm text-white font-bold bg-[#1e2530]">
              <tr>
                <th className="px-6 py-4 rounded-l-xl text-center">Rank</th>
                <th className="px-6 py-4">Produk</th>
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Harga</th>
                <th className="px-6 py-4 rounded-r-xl text-center">Skor SAW</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-slate-500 bg-white rounded-xl">
                    Belum ada hasil. Pastikan sesi ini sudah punya bobot kriteria terisi.
                  </td>
                </tr>
              )}
              {data.map((row) => (
                <tr key={row.product_id} className="bg-white text-slate-800 font-semibold shadow-sm border border-slate-100">
                  <td className="px-6 py-4 rounded-l-xl border-y border-l border-slate-200 text-center">
                    <span className="bg-[#1e2530] text-white text-xs font-black px-2 py-1 rounded-md">#{row.ranking}</span>
                  </td>
                  <td className="px-6 py-4 border-y border-slate-200">{row.nama_hp}</td>
                  <td className="px-6 py-4 border-y border-slate-200">{row.brand}</td>
                  <td className="px-6 py-4 border-y border-slate-200">{row.nama_customer ?? '-'}</td>
                  <td className="px-6 py-4 border-y border-slate-200">Rp {row.harga.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4 rounded-r-xl border-y border-r border-slate-200 text-center font-black">{row.skor.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}