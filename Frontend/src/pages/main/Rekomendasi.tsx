import React, { useEffect, useMemo, useState } from 'react';
import SliderBobot from '../../components/ui/SliderBobot';
import ProductCard from '../../components/CardProduk';
import { ProductDetail } from '../../components/CardDetail';
import type { ProductData, Brand } from '../../types/product';
import { mapApiProductToProductData } from '../../types/product';
import type { Criteria } from '../../types/spk';
import { getCriteria } from '../../api/criteria';
import { getBrands } from '../../api/brands';
import { createSession, submitAllPembobotan } from '../../api/sessions';
import { getRecommendation, type SpkMethod } from '../../api/recommendation';

interface RankedProduct {
  rank: number;
  nilaiAkhir: number;
  product: ProductData;
}

export const HalamanRekomendasi: React.FC = () => {
  // Daftar kriteria dari backend (GET /api/criteria) + bobot yang digeser user
  const [criteriaList, setCriteriaList] = useState<Criteria[]>([]);
  const [bobot, setBobot] = useState<Record<number, number>>({});
  const [isLoadingCriteria, setIsLoadingCriteria] = useState(true);
  const [criteriaError, setCriteriaError] = useState<string | null>(null);

  // Daftar brand (buat join manual ke hasil rekomendasi, sama kayak di Produk.tsx)
  const [brandMap, setBrandMap] = useState<Map<number, Brand>>(new Map());

  // Metode SPK aktif (tab) & session yang sedang berjalan
  const [activeMethod, setActiveMethod] = useState<SpkMethod>('wp');
  const [sessionId, setSessionId] = useState<number | null>(null);

  // Hasil rekomendasi
  const [hasil, setHasil] = useState<RankedProduct[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calcError, setCalcError] = useState<string | null>(null);

  // State interaktivitas Modal Detail & Modal Panduan Buku
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [showGuide, setShowGuide] = useState(false);

  // Ambil daftar kriteria + bobot default dari backend saat halaman dibuka
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setIsLoadingCriteria(true);
        const [data, brands] = await Promise.all([getCriteria(), getBrands()]);
        if (!mounted) return;
        setCriteriaList(data);
        setBrandMap(new Map(brands.map((b) => [b.id, b])));
        const initialBobot: Record<number, number> = {};
        data.forEach((c) => { initialBobot[c.id] = c.default_bobot ?? 50; });
        setBobot(initialBobot);
        setCriteriaError(null);
      } catch (err) {
        if (!mounted) return;
        setCriteriaError('Gagal memuat kriteria dari server. Pastikan backend berjalan & kamu sudah login.');
      } finally {
        if (mounted) setIsLoadingCriteria(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleSliderChange = (id: string, value: number) => {
    setBobot(prev => ({ ...prev, [Number(id)]: value }));
  };

  // Alur: buat session baru -> kirim semua bobot -> ambil hasil ranking metode aktif
  const jalankanRekomendasi = async () => {
    try {
      setIsCalculating(true);
      setCalcError(null);

      const session = await createSession();
      setSessionId(session.id);

      await submitAllPembobotan(
        session.id,
        criteriaList.map((c) => ({ criteriaId: c.id, nilaiBobot: bobot[c.id] ?? c.default_bobot }))
      );

      const items = await getRecommendation(activeMethod, session.id);
      setHasil(
        items.map((item) => ({
          rank: item.rank,
          nilaiAkhir: item.nilai_akhir,
          product: mapApiProductToProductData(item.product, brandMap.get(item.product.brands_id)),
        }))
      );
    } catch (err) {
      setCalcError('Gagal menghitung rekomendasi. Pastikan semua bobot kriteria sudah terisi.');
      setHasil([]);
    } finally {
      setIsCalculating(false);
    }
  };

  // Ganti tab metode (WP/SAW/TOPSIS): kalau sudah ada session berjalan, langsung
  // ambil ulang hasil ranking untuk metode baru tanpa membuat session lagi.
  const handleChangeMethod = async (method: SpkMethod) => {
    setActiveMethod(method);
    if (!sessionId) return;
    try {
      setIsCalculating(true);
      setCalcError(null);
      const items = await getRecommendation(method, sessionId);
      setHasil(
        items.map((item) => ({
          rank: item.rank,
          nilaiAkhir: item.nilai_akhir,
          product: mapApiProductToProductData(item.product, brandMap.get(item.product.brands_id)),
        }))
      );
    } catch (err) {
      setCalcError('Gagal mengambil hasil untuk metode ini.');
    } finally {
      setIsCalculating(false);
    }
  };

  const methodLabel: Record<SpkMethod, string> = { saw: 'SAW', wp: 'WP', topsis: 'TOPSIS' };

  const productForModal = useMemo(() => selectedProduct, [selectedProduct]);

  return (
    <div className="w-full bg-[#f4f6f9] font-mono min-h-screen py-6 md:py-10 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO HEADER BANNER PANEL */}
        <div className="w-full bg-[#1e293b] border-4 border-black p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] text-white">
          <div className="max-w-2xl">
            <h1 className="text-2xl md:text-3xl font-black uppercase">Temukan Smartphone Impianmu</h1>
            <p className="text-xs text-slate-400 font-bold uppercase mt-1">
              Geser prioritas bobot kepentingan tiap kriteria, lalu pilih metode SPK
            </p>
          </div>
        </div>

        {/* SEKSI: SLIDER BOBOT KRITERIA (DINAMIS DARI BACKEND) */}
        <div className="bg-white border-4 border-black p-6 md:p-8 mb-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative">
          
          <button 
            type="button"
            onClick={() => setShowGuide(true)}
            className="absolute top-4 right-4 bg-black text-white p-2 border-2 border-black font-black text-xs hover:bg-[#e53935] cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.2)] transition-all"
          >
            📖 PANDUAN KRITERIA
          </button>

          {isLoadingCriteria && (
            <p className="text-xs font-bold text-stone-500 uppercase pt-8">Memuat kriteria...</p>
          )}

          {!isLoadingCriteria && criteriaError && (
            <p className="text-xs font-bold text-[#e53935] uppercase pt-8">{criteriaError}</p>
          )}

          {!isLoadingCriteria && !criteriaError && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 pt-8 pr-2">
              {criteriaList.map((c) => (
                <SliderBobot
                  key={c.id}
                  id={String(c.id)}
                  label={`${c.nama} ${c.atribut === 'cost' ? '(Cost 🔴)' : '(Benefit 🟢)'}`}
                  value={bobot[c.id] ?? c.default_bobot}
                  onChange={handleSliderChange}
                />
              ))}
            </div>
          )}

          {/* Tombol Jalankan Perhitungan SPK */}
          <div className="w-full flex justify-end mt-8">
            <button 
              type="button" 
              onClick={jalankanRekomendasi}
              disabled={isLoadingCriteria || isCalculating || criteriaList.length === 0}
              className="w-full md:w-64 py-3 bg-black hover:bg-stone-800 text-white font-black uppercase text-xs border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCalculating ? 'Menghitung...' : 'Cari Rekomendasi 🚀'}
            </button>
          </div>
        </div>

        {/* SEKSI: JUDUL & GRUP TOMBOL METODE SPK */}
        <div className="w-full flex flex-col items-center mb-8 gap-4">
          <h2 className="text-3xl font-black text-gray-500 uppercase tracking-wide">
            Hasil Rekomendasi
          </h2>
          
          <div className="flex gap-4">
            {(['wp', 'saw', 'topsis'] as SpkMethod[]).map((method) => {
              const isSelected = activeMethod === method;
              return (
                <button
                  key={method}
                  type="button"
                  onClick={() => handleChangeMethod(method)}
                  className={`px-8 py-2 font-bold text-xs uppercase border border-gray-400 rounded-md transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-[#1e293b] text-white border-[#1e293b] shadow-sm' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {methodLabel[method]}
                </button>
              );
            })}
          </div>
        </div>

        {calcError && (
          <p className="text-center text-xs font-bold text-[#e53935] uppercase mb-6">{calcError}</p>
        )}

        {!calcError && !isCalculating && sessionId === null && (
          <p className="text-center text-xs font-bold text-stone-500 uppercase mb-6">
            Atur bobot kriteria di atas lalu klik "Cari Rekomendasi" untuk melihat hasil.
          </p>
        )}

        {/* SEKSI: LOOPING KARTU PRODUK HASIL REKOMENDASI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {hasil.map((item) => (
            <div key={item.product.id} className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-1">
                <span className="bg-black text-white text-[10px] font-black px-2 py-1 uppercase">
                  Rank #{item.rank}
                </span>
                <span className="bg-yellow-300 border-2 border-black text-[10px] font-black px-2 py-1 uppercase">
                  Skor {item.nilaiAkhir.toFixed(3)}
                </span>
              </div>
              <ProductCard
                product={item.product}
                onDetailClick={() => setSelectedProduct(item.product)}
              />
            </div>
          ))}
        </div>

      </div>

      {/* KOMPONEN DETAIL POP-UP MODAL */}
      <ProductDetail 
        product={productForModal} 
        onClose={() => setSelectedProduct(null)} 
      />

      {/* MODAL DIALOG ATURAN BOBOT BUKU PANDUAN */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] p-6 max-w-lg w-full animate-fade-in">
            <div className="flex justify-between items-center border-b-4 border-black pb-2 mb-4">
              <h3 className="text-md font-black uppercase">📖 Aturan Bobot Kriteria</h3>
              <button 
                type="button" 
                onClick={() => setShowGuide(false)} 
                className="font-black text-lg hover:text-[#e53935] cursor-pointer"
              >
                X
              </button>
            </div>
            <div className="space-y-3 text-xs font-bold leading-relaxed">
              <p className="border-b border-dashed border-stone-300 pb-2">
                🔴 <span className="text-[#e53935]">COST:</span> Semakin tinggi bobotnya, sistem makin memprioritaskan nilai kriteria yang paling kecil (mis. Harga termurah).
              </p>
              <p className="border-b border-dashed border-stone-300 pb-2">
                🟢 <span className="text-emerald-600">BENEFIT:</span> Semakin tinggi bobotnya, sistem makin memprioritaskan nilai kriteria yang paling besar (mis. RAM, Kamera, Baterai terbesar).
              </p>
              <p>
                Bobot dikirim ke sesi SPK kamu, lalu dihitung ulang setiap kamu berpindah metode WP / SAW / TOPSIS.
              </p>
            </div>
            <button 
              type="button" 
              onClick={() => setShowGuide(false)} 
              className="w-full mt-6 py-2.5 bg-black text-white font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] cursor-pointer"
            >
              [ Saya Mengerti ]
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HalamanRekomendasi;