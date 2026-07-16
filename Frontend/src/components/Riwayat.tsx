import React, { useEffect, useState } from 'react';
import type { SpkSession } from '../types/spk';
import type { ProductData } from '../types/product';
import { mapRecommendationItemToProductData } from '../types/product';
import { getSessions } from '../api/sessions';
import { getRecommendation, type SpkMethod } from '../api/recommendation';
import ProductCard from './CardProduk';
import { ProductDetail } from './CardDetail';

interface RiwayatModalProps {
  onClose: () => void;
}

const METODE_LIST: { key: SpkMethod; label: string }[] = [
  { key: 'wp', label: 'WP' },
  { key: 'saw', label: 'SAW' },
  { key: 'topsis', label: 'TOPSIS' },
];

const formatTanggal = (iso?: string) => {
  if (!iso) return '-';
  return new Date(iso).toLocaleString('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
};

// Modal 2 tahap: (1) daftar sesi rekomendasi yang pernah dibuat user ini,
// (2) hasil rekomendasi untuk sesi yang dipilih (bisa pilih metode SAW/WP/TOPSIS),
// dengan tombol "Kembali" buat balik ke daftar tanpa nutup modal.
export const RiwayatModal: React.FC<RiwayatModalProps> = ({ onClose }) => {
  const [sessions, setSessions] = useState<SpkSession[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const [sessionsError, setSessionsError] = useState<string | null>(null);

  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
  const [method, setMethod] = useState<SpkMethod>('wp');
  const [results, setResults] = useState<ProductData[]>([]);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [resultsError, setResultsError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

  // Muat daftar sesi sekali saat modal dibuka
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setIsLoadingSessions(true);
        const data = await getSessions();
        if (!mounted) return;
        // Terbaru dulu
        const sorted = [...data].sort((a, b) => {
          const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
          const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
          return tb - ta;
        });
        setSessions(sorted);
        setSessionsError(null);
      } catch {
        if (mounted) setSessionsError('Gagal memuat riwayat rekomendasi.');
      } finally {
        if (mounted) setIsLoadingSessions(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Muat hasil rekomendasi tiap kali sesi ATAU metode yang dipilih berubah
  useEffect(() => {
    if (selectedSessionId === null) return;
    let mounted = true;
    (async () => {
      try {
        setIsLoadingResults(true);
        setResultsError(null);
        const items = await getRecommendation(method, selectedSessionId);
        if (!mounted) return;
        setResults(items.map(mapRecommendationItemToProductData));
      } catch {
        if (!mounted) return;
        setResultsError('Belum ada hasil untuk sesi & metode ini.');
        setResults([]);
      } finally {
        if (mounted) setIsLoadingResults(false);
      }
    })();
    return () => { mounted = false; };
  }, [selectedSessionId, method]);

  const kembaliKeDaftar = () => {
    setSelectedSessionId(null);
    setResults([]);
    setResultsError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm font-mono">
      <div className="relative w-full max-w-5xl bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-4 border-black bg-[#1e2530]">
          <h2 className="text-white font-black uppercase tracking-wide text-lg">
            {selectedSessionId === null ? 'Riwayat Rekomendasi' : `Hasil — Sesi #${selectedSessionId}`}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="bg-white text-black hover:bg-[#e53935] hover:text-white border-2 border-black w-8 h-8 font-black flex items-center justify-center cursor-pointer transition-colors"
          >
            X
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* ============== TAHAP 1: DAFTAR SESI ============== */}
          {selectedSessionId === null && (
            <>
              {isLoadingSessions && <p className="text-sm font-bold text-stone-500 uppercase">Memuat riwayat...</p>}
              {sessionsError && <p className="text-sm font-bold text-[#e53935] uppercase">{sessionsError}</p>}
              {!isLoadingSessions && !sessionsError && sessions.length === 0 && (
                <p className="text-sm font-bold text-stone-500 uppercase">
                  Kamu belum pernah nyoba fitur Rekomendasi. Yuk coba dulu di menu "Rekomendasi".
                </p>
              )}

              <div className="flex flex-col gap-3">
                {sessions.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedSessionId(s.id)}
                    className="w-full flex items-center justify-between gap-4 px-4 py-3 bg-[#f4f6f9] border-2 border-black hover:bg-yellow-300 transition-colors text-left cursor-pointer"
                  >
                    <div>
                      <p className="font-black text-sm uppercase">Sesi #{s.id}</p>
                      <p className="text-xs text-stone-500 font-semibold">{formatTanggal(s.created_at)}</p>
                    </div>
                    <span className="text-xs font-black uppercase bg-black text-white px-3 py-1.5 shrink-0">
                      Lihat Hasil →
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ============== TAHAP 2: HASIL SESI TERPILIH ============== */}
          {selectedSessionId !== null && (
            <>
              <button
                type="button"
                onClick={kembaliKeDaftar}
                className="mb-4 px-4 py-2 bg-white border-2 border-black font-black text-xs uppercase hover:bg-stone-100 transition-colors cursor-pointer"
              >
                ← Kembali ke Riwayat
              </button>

              {/* Tab pilih metode */}
              <div className="flex gap-2 mb-6">
                {METODE_LIST.map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => setMethod(m.key)}
                    className={`px-4 py-2 border-2 border-black font-black text-xs uppercase cursor-pointer transition-colors ${
                      method === m.key ? 'bg-[#1e2530] text-white' : 'bg-white text-black hover:bg-stone-100'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {isLoadingResults && <p className="text-sm font-bold text-stone-500 uppercase">Memuat hasil...</p>}
              {resultsError && <p className="text-sm font-bold text-[#e53935] uppercase">{resultsError}</p>}

              {!isLoadingResults && !resultsError && results.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((prod) => (
                    <ProductCard key={prod.id} product={prod} onDetailClick={() => setSelectedProduct(prod)} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal detail produk, dipakai kalau salah satu hasil di-klik "Detail" */}
      <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
};

export default RiwayatModal;