import { useState, useMemo, useEffect } from 'react';
import ProductCard from '../../components/CardProduk';
import OptionBox, { type OptionItem } from '../../components/ui/OptionBox';
import { ProductDetail } from '../../components/CardDetail';
import type { ProductData, Brand } from '../../types/product';
import { mapApiProductToProductData } from '../../types/product';
import { getProducts } from '../../api/products';
import { getBrands } from '../../api/brands';

export type FilterType = 'termurah' | 'kamera' | 'ram' | 'baterai' | '';

// Deklarasi data opsi untuk filter dropdown
const OPSI_FILTER_HP: OptionItem<FilterType>[] = [
  { value: 'termurah', label: 'Harga Termurah 💰' },
  { value: 'kamera', label: 'Kamera Terbagus 📸' },
  { value: 'ram', label: 'RAM Terbesar ⚡' },
  { value: 'baterai', label: 'Baterai Terawet 🔋' },
];

export default function KatalogProduk() {
  const [produkMaster, setProdukMaster] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [filter, setFilter] = useState<FilterType>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setIsLoading(true);
        // Ambil brands juga supaya nama brand ikut ke-join manual
        const [productData, brandData] = await Promise.all([getProducts(), getBrands()]);
        if (!mounted) return;
        const brandMap = new Map<number, Brand>(brandData.map((b) => [b.id, b]));
        setProdukMaster(
          productData.map((p) => mapApiProductToProductData(p, brandMap.get(p.brands_id)))
        );
        setErrorMsg(null);
      } catch {
        if (!mounted) return;
        setErrorMsg('Gagal memuat produk dari server. Pastikan backend berjalan di http://localhost:3000.');
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Otomatis deteksi brand unik dari database/data master
  const listBrand = useMemo(() => {
    const brands = produkMaster.map(p => p.brand);
    return Array.from(new Set(brands));
  }, [produkMaster]);

  // Logika penyaringan (Search) & pengurutan (Filter Dropdown)
  const filteredAndSortedProducts = useMemo(() => {
    // Filter berdasarkan Search Input (Nama)
    let filtered = produkMaster.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      return item.nama.toLowerCase().includes(q) || item.brand.toLowerCase().includes(q);
    });

    if (filter === 'termurah') {
      return filtered.sort((a, b) => a.harga - b.harga);
    }
    if (filter === 'kamera') {
      return filtered.sort((a, b) => parseInt(b.kamera) - parseInt(a.kamera));
    }
    if (filter === 'ram') {
      return filtered.sort((a, b) => parseInt(b.ram) - parseInt(a.ram));
    }
    if (filter === 'baterai') {
      return filtered.sort((a, b) => parseInt(b.baterai) - parseInt(a.baterai));
    }

    return filtered;
  }, [filter, searchQuery, produkMaster]);

  return (
    <div className="w-full bg-[#f4f6f9] font-mono min-h-screen py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BAR ALAT PENGATUR FILTER & SEARCH BAR */}
        <div className="w-full bg-white border-4 border-black p-4 md:p-6 mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div>
            <h1 className="text-xl md:text-2xl font-black uppercase text-black">Katalog Smartphone</h1>
            <p className="text-xs text-stone-500 font-bold uppercase mt-0.5">Daftar Smartphone resmi per-brand</p>
          </div>
          
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* SEARCH INPUT BAR */}
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                placeholder="Cari HP"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-black px-3 py-2 text-xs font-bold text-black placeholder:text-stone-400 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 font-black text-xs text-stone-500 hover:text-black"
                >
                  ✕
                </button>
              )}
            </div>

            {/* FILTER DROPDOWN */}
            <OptionBox<FilterType>
              label="Filter:"
              placeholder="-- PILIH PILIHAN URUTAN --"
              options={OPSI_FILTER_HP}
              currentValue={filter}
              onValueChange={(val) => setFilter(val)}
            />
          </div>
        </div>

        {isLoading && (
          <div className="w-full bg-white border-4 border-black p-8 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-sm font-black uppercase text-black">Memuat produk...</p>
          </div>
        )}

        {!isLoading && errorMsg && (
          <div className="w-full bg-white border-4 border-black p-8 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-sm font-black uppercase text-[#e53935]">{errorMsg}</p>
          </div>
        )}

        {/* CONTAINER LOOPING PER BRAND */}
        {!isLoading && !errorMsg && (
          <div className="space-y-12">
            {filteredAndSortedProducts.length === 0 ? (
              <div className="w-full bg-white border-4 border-black p-8 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-lg font-black uppercase text-black">🔍 Produk Tidak Ditemukan</p>
                <p className="text-xs font-bold text-stone-500 mt-1">
                  Tidak ada smartphone dengan kata kunci "{searchQuery}". Coba kata kunci lain.
                </p>
              </div>
            ) : (
              listBrand.map((brandName) => {
                const produkPerBrand = filteredAndSortedProducts.filter(
                  p => p.brand.toLowerCase() === brandName.toLowerCase()
                );

                if (produkPerBrand.length === 0) return null;

                return (
                  <div key={brandName} className="w-full">
                    {/* Header Batang Nama Brand */}
                    <div className="border-b-4 border-black mb-6 pb-2 flex items-center">
                      <h2 className="text-2xl font-black uppercase tracking-tight text-black bg-white border-2 border-black px-4 py-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                        ⚡ {brandName}
                      </h2>
                    </div>

                    {/* HORIZONTAL SCROLL SLIDER COMPONENT */}
                    <div className="flex overflow-x-auto pb-4 gap-6 scroll-smooth snap-x snap-mandatory no-scrollbar">
                      {produkPerBrand.map((prod) => (
                        <div 
                          key={prod.id} 
                          className="w-70 sm:w-[320px] shrink-0 snap-start"
                        >
                          <ProductCard
                            product={prod}
                            onDetailClick={() => setSelectedProduct(prod)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

      </div>

      {/* OVERLAY INTERAKTIF DETAIL PRODUK */}
      <ProductDetail
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
};