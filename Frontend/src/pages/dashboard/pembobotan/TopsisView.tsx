import { useEffect, useState } from 'react';
import type { RecommendationItem } from '../../../types/spk';
import { getRecommendation } from '../../../api/recommendation';

interface TopsisViewProps {
  sessionId: number | null;
}

// Label singkat per kriteria, dipakai buat header kolom A+ / A- (c1..c6).
// Urutan mengikuti view_perhitungan_topsis: c1=Harga, c2=RAM, c3=Penyimpanan,
// c4=Baterai, c5=Update OS, c6=Kamera.
const KOLOM_KRITERIA: { key: 'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6'; label: string }[] = [
  { key: 'c1', label: 'Harga' },
  { key: 'c2', label: 'RAM' },
  { key: 'c3', label: 'Penyimpanan' },
  { key: 'c4', label: 'Baterai' },
  { key: 'c5', label: 'Update OS' },
  { key: 'c6', label: 'Kamera' },
];

const formatAngka = (value: number | null | undefined) =>
  typeof value === 'number' ? value.toFixed(4) : '-';

// VIEW 4/4 — Hasil perhitungan metode TOPSIS
// Sumber data: GET /api/recommendation/topsis?session_id=<id>
// Response TOPSIS membawa d_plus & d_minus (jarak ke solusi ideal), DAN
// a_plus/a_minus per kriteria (solusi ideal positif & negatif) -- sebelumnya
// dua yang terakhir ini tidak ditampilkan sama sekali walau sudah ada di view backend.
export default function TopsisView({ sessionId }: TopsisViewProps) {
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
        const items = await getRecommendation('topsis', sessionId);
        if (mounted) setData(items);
      } catch (err) {
        console.error('Gagal memuat hasil TOPSIS:', err);
        if (mounted) setError('Gagal memuat hasil perhitungan TOPSIS untuk sesi ini.');
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [sessionId]);

  if (sessionId === null) {
    return (
      <div className="text-center py-10 text-slate-500 font-medium bg-white rounded-xl border border-slate-200">
        Pilih sesi SPK dulu di atas untuk melihat hasil metode TOPSIS.
      </div>
    );
  }

  const totalKolom = 5 + KOLOM_KRITERIA.length * 2 + 3; // rank+produk+brand+customer+harga + (a+/a- per kriteria) + d+/d-/skor

  return (
    <div className="w-full flex flex-col gap-4">
      <h3 className="font-bold text-slate-700">Hasil Metode TOPSIS — Sesi #{sessionId}</h3>

      {isLoading && <p className="text-sm font-medium text-slate-500">Menghitung...</p>}
      {error && <p className="text-sm font-bold text-red-600">{error}</p>}

      {!isLoading && !error && (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left border-separate" style={{ borderSpacing: '0 12px' }}>
            <thead className="text-xs text-white font-bold bg-[#1e2530]">
              <tr>
                <th className="px-4 py-3 rounded-l-xl text-center">Rank</th>
                <th className="px-4 py-3">Produk</th>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Harga</th>
                {KOLOM_KRITERIA.map((k) => (
                  <th key={`aplus_${k.key}`} className="px-4 py-3 text-center whitespace-nowrap">A+ {k.label}</th>
                ))}
                {KOLOM_KRITERIA.map((k) => (
                  <th key={`aminus_${k.key}`} className="px-4 py-3 text-center whitespace-nowrap">A- {k.label}</th>
                ))}
                <th className="px-4 py-3 text-center">D+</th>
                <th className="px-4 py-3 text-center">D-</th>
                <th className="px-4 py-3 rounded-r-xl text-center">Skor TOPSIS</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 && (
                <tr>
                  <td colSpan={totalKolom} className="text-center py-6 text-slate-500 bg-white rounded-xl">
                    Belum ada hasil. Pastikan sesi ini sudah punya bobot kriteria terisi.
                  </td>
                </tr>
              )}
              {data.map((row) => (
                <tr key={row.product_id} className="bg-white text-slate-800 font-semibold shadow-sm border border-slate-100">
                  <td className="px-4 py-3 rounded-l-xl border-y border-l border-slate-200 text-center">
                    <span className="bg-[#1e2530] text-white text-xs font-black px-2 py-1 rounded-md">#{row.ranking}</span>
                  </td>
                  <td className="px-4 py-3 border-y border-slate-200 whitespace-nowrap">{row.nama_hp}</td>
                  <td className="px-4 py-3 border-y border-slate-200 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 border-y border-slate-200 whitespace-nowrap">{row.nama_customer ?? '-'}</td>
                  <td className="px-4 py-3 border-y border-slate-200 whitespace-nowrap">Rp {row.harga.toLocaleString('id-ID')}</td>
                  {KOLOM_KRITERIA.map((k) => (
                    <td key={`aplus_${k.key}`} className="px-4 py-3 border-y border-slate-200 text-center">
                      {formatAngka(row.a_plus?.[k.key])}
                    </td>
                  ))}
                  {KOLOM_KRITERIA.map((k) => (
                    <td key={`aminus_${k.key}`} className="px-4 py-3 border-y border-slate-200 text-center">
                      {formatAngka(row.a_minus?.[k.key])}
                    </td>
                  ))}
                  <td className="px-4 py-3 border-y border-slate-200 text-center">{row.d_plus?.toFixed(4) ?? '-'}</td>
                  <td className="px-4 py-3 border-y border-slate-200 text-center">{row.d_minus?.toFixed(4) ?? '-'}</td>
                  <td className="px-4 py-3 rounded-r-xl border-y border-r border-slate-200 text-center font-black">{row.skor.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}