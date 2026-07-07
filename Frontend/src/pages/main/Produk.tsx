import React, { useState, useMemo } from 'react';
import ProductCard from '../../components/CardProduk';
import OptionBox, { type OptionItem } from '../../components/ui/OptionBox';
import { ProductDetail } from '../../components/CardDetail';
import type { ProductData } from '../../types/product';

export type FilterType = 'termurah' | 'kamera' | 'ram' | 'baterai' | '';

// Deklarasi data opsi untuk filter dropdown (Menyelesaikan error OPSI_FILTER_HP)
const OPSI_FILTER_HP: OptionItem<FilterType>[] = [
  { value: 'termurah', label: 'Harga Termurah 💰' },
  { value: 'kamera', label: 'Kamera Terbagus 📸' },
  { value: 'ram', label: 'RAM Terbesar ⚡' },
  { value: 'baterai', label: 'Baterai Terawet 🔋' },
];

// Data Dummy Utama (Struktur siap mapping API)
const DATA_PRODUK_MASTER: ProductData[] = [
  // Brand Xiaomi
  { id: 'x1', nama: 'Xiaomi 14 Ultra', brand: 'Xiaomi', harga: 18999000, ram: '16 GB', penyimpanan: '512GB', kamera: '50 MP Lythia', baterai: '5000 mAh', chipset: 'Snapdragon 8 Gen 3', nanometer: '4 Nm', os: 'HyperOS', fastCharging: '90 Wat', display: 'AMOLED 6.73"', updateOs: '4 Tahun' },
  { id: 'x2', nama: 'Redmi Note 13 Pro', brand: 'Xiaomi', harga: 4399000, ram: '8 GB', penyimpanan: '256GB', kamera: '200 MP Samsung', baterai: '5100 mAh', chipset: 'Helio G99 Ultra', nanometer: '6 Nm', os: 'Android 14', fastCharging: '67 Wat', display: 'AMOLED 6.67"', updateOs: '2 Tahun' },
  
  // Brand Vivo
  { id: 'v1', nama: 'Vivo X100 Pro', brand: 'Vivo', harga: 15999000, ram: '16 GB', penyimpanan: '512GB', kamera: '50 MP Zeiss', baterai: '5400 mAh', chipset: 'Dimensity 9300', nanometer: '4 Nm', os: 'FuntouchOS 14', fastCharging: '100 Wat', display: 'AMOLED 6.78"', updateOs: '3 Tahun' },
  { id: 'v2', nama: 'Vivo V30 Pro 5G', brand: 'Vivo', harga: 8999000, ram: '12 GB', penyimpanan: '512GB', kamera: '50 MP Triple', baterai: '5000 mAh', chipset: 'Dimensity 8200', nanometer: '4 Nm', os: 'FuntouchOS', fastCharging: '80 Wat', display: 'AMOLED', updateOs: '3 Tahun' },

  // Brand Oppo
  { id: 'o1', nama: 'Oppo Find X7 Ultra', brand: 'Oppo', harga: 19500000, ram: '16 GB', penyimpanan: '512GB', kamera: '50 MP Quad', baterai: '5000 mAh', chipset: 'Snapdragon 8 Gen 3', nanometer: '4 Nm', os: 'ColorOS 14', fastCharging: '100 Wat', display: 'OLED 6.82"', updateOs: '4 Tahun' },
  { id: 'o2', nama: 'Oppo Reno 11 Pro', brand: 'Oppo', harga: 8499000, ram: '12 GB', penyimpanan: '512GB', kamera: '50 MP Main', baterai: '4600 mAh', chipset: 'Dimensity 8200', nanometer: '4 Nm', os: 'ColorOS', fastCharging: '80 Wat', display: 'OLED', updateOs: '2 Tahun' },
].map(prod => ({ ...prod, imageUrl: 'src/assets/brand/reko.png' }));

export const KatalogProduk: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('');
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

  // Otomatis deteksi brand unik dari database/data master
  const listBrand = useMemo(() => {
    const brands = DATA_PRODUK_MASTER.map(p => p.brand);
    return Array.from(new Set(brands));
  }, []);

  // Fungsi Logika sortir data
  const sortedProducts = useMemo(() => {
    const dataCopy = [...DATA_PRODUK_MASTER];
    if (filter === 'termurah') {
      return dataCopy.sort((a, b) => a.harga - b.harga);
    }
    if (filter === 'kamera') {
      return dataCopy.sort((a, b) => parseInt(b.kamera) - parseInt(a.kamera));
    }
    if (filter === 'ram') {
      return dataCopy.sort((a, b) => parseInt(b.ram) - parseInt(a.ram));
    }
    if (filter === 'baterai') {
      return dataCopy.sort((a, b) => parseInt(b.baterai) - parseInt(a.baterai));
    }
    return dataCopy;
  }, [filter]);

  return (
    <div className="w-full bg-[#f4f6f9] font-mono min-h-screen py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BAR ALAT PENGATUR FILTER */}
        <div className="w-full bg-white border-4 border-black p-4 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div>
            <h1 className="text-xl font-black uppercase text-black">Katalog Smartphone</h1>
            <p className="text-xs text-stone-500 font-bold uppercase mt-0.5">Daftar Smartphone resmi per-brand</p>
          </div>
          
          <OptionBox<FilterType>
            label="Filter:"
            placeholder="-- PILIH PILIHAN URUTAN --"
            options={OPSI_FILTER_HP}
            currentValue={filter}
            onValueChange={(val) => setFilter(val)}
          />
        </div>

        {/* CONTAINER LOOPING PER BRAND */}
        <div className="space-y-12">
          {listBrand.map((brandName) => {
            const produkPerBrand = sortedProducts.filter(p => p.brand.toLowerCase() === brandName.toLowerCase());

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
                        onDetailClick={(id) => {
                          const target = DATA_PRODUK_MASTER.find(p => p.id === id);
                          if (target) setSelectedProduct(target);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* OVERLAY INTERAKTIF DETAIL PRODUK */}
      <ProductDetail
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
};

export default KatalogProduk;