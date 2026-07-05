import React, { useState } from 'react';
import OptionBox, { type OptionItem } from '../../components/ui/OptionBox';
import SliderBobot from '../../components/ui/SliderBobot';
import ProductCard from '../../components/CardProduk';
import { ProductDetail } from '../../components/CardDetail';
import type { ProductData } from '../../types/product';

type SubFilterType = string;

// =========================================================
// OPSI DATA DROPDOWN SUB-KRITERIA (Berdasarkan image_398a82.png)
// =========================================================
const OPSI_HARGA: OptionItem<SubFilterType>[] = [
  { value: 'kurang_3jt', label: '< Rp 3.000.000' },
  { value: '3jt_4.5jt', label: 'Rp 3.000.000 - Rp 4.500.000' },
  { value: '4.5jt_6.5jt', label: 'Rp 4.501.000 - Rp 6.500.000' },
  { value: 'lebih_6.5jt', label: '> Rp 6.500.000' },
];

const OPSI_RAM: OptionItem<SubFilterType>[] = [
  { value: 'kurang_8gb', label: '< 8 GB' },
  { value: 'lebih_8gb', label: '>= 8 GB' },
];

const OPSI_PENYIMPANAN: OptionItem<SubFilterType>[] = [
  { value: 'kurang_256gb', label: '< 256 GB' },
  { value: 'lebih_256gb', label: '>= 256 GB' },
];

const OPSI_KAMERA: OptionItem<SubFilterType>[] = [
  { value: 'kurang_50mp', label: '<= 50 MP' },
  { value: 'lebih_50mp', label: '> 50 MP' },
];

const OPSI_BATERAI: OptionItem<SubFilterType>[] = [
  { value: 'kurang_5000', label: '< 5000 mAh' },
  { value: 'lebih_5000', label: '>= 5000 mAh' },
];

const OPSI_UPDATE_OS: OptionItem<SubFilterType>[] = [
  { value: 'kurang_3thn', label: '< 3 Tahun' },
  { value: 'lebih_3thn', label: '>= 3 Tahun' },
];

// =========================================================
// DATA DUMMY HASIL REKOMENDASI (Struktur ProductData)
// =========================================================
const DUMMY_REKOMENDASI: ProductData[] = Array(8).fill(null).map((_, idx) => ({
  id: `rec-${idx}`,
  nama: 'iPhone 16 Pro Max',
  brand: 'Apple',
  harga: 21000000,
  ram: '8 GB',
  penyimpanan: '256GB/512GB/1TB',
  kamera: '120 MP',
  baterai: '4685 mAh',
  imageUrl: 'src/assets/brand/reko.png',
  chipset: 'A18 Pro Bionic',
  nanometer: '3 Nm',
  os: 'iOS 18',
  fastCharging: '30 Wat',
  display: 'OLED Super Retina 6.9"',
  updateOs: '5 Tahun'
}));

export const HalamanRekomendasi: React.FC = () => {
  // State pilihan sub-kriteria dropdown
  const [harga, setHarga] = useState<SubFilterType>('');
  const [ram, setRam] = useState<SubFilterType>('');
  const [penyimpanan, setPenyimpanan] = useState<SubFilterType>('');
  const [kamera, setKamera] = useState<SubFilterType>('');
  const [baterai, setBaterai] = useState<SubFilterType>('');
  const [updateOs, setUpdateOs] = useState<SubFilterType>('');

  // State nilai bobot slider (Default awal 70 sesuai image_399203.png)
  const [bobot, setBobot] = useState<Record<string, number>>({
    harga: 70, ram: 70, kamera: 70, penyimpanan: 70, chipset: 70, updateOs: 70, baterai: 70
  });

  // State interaktivitas Modal Detail & Modal Panduan Buku
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [showGuide, setShowGuide] = useState(false);

  const handleSliderChange = (id: string, value: number) => {
    setBobot(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="w-full bg-[#f4f6f9] font-mono min-h-screen py-6 md:py-10 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================
            HERO HEADER BANNER PANEL (Gaya Retro Brutalism)
           ========================================================= */}
        <div className="w-full bg-[#1e293b] border-4 border-black p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] text-white">
          <div className="max-w-2xl">
            <h1 className="text-2xl md:text-3xl font-black uppercase">Temukan Smartphone Impianmu</h1>
            <p className="text-xs text-slate-400 font-bold uppercase mt-1">
              Pilih kriteria dasar & geser prioritas bobot kepentingan SPK
            </p>
          </div>
          <div className="w-16 h-16 bg-white border-4 border-black flex items-center justify-center text-xl shadow-[3px_3px_0px_rgba(255,255,255,0.2)]">🦖</div>
        </div>

        {/* =========================================================
            SEKSI 1: COMPONENT DROPDOWN OPTION BOX (image_399203.png atas)
           ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <OptionBox<SubFilterType> label="Harga" placeholder="-- PILIH HARGA --" options={OPSI_HARGA} currentValue={harga} onValueChange={setHarga} />
          <OptionBox<SubFilterType> label="RAM" placeholder="-- PILIH RAM --" options={OPSI_RAM} currentValue={ram} onValueChange={setRam} />
          <OptionBox<SubFilterType> label="Penyimpanan" placeholder="-- PILIH PENYIMPANAN --" options={OPSI_PENYIMPANAN} currentValue={penyimpanan} onValueChange={setPenyimpanan} />
          <OptionBox<SubFilterType> label="Kamera" placeholder="-- PILIH KAMERA --" options={OPSI_KAMERA} currentValue={kamera} onValueChange={setKamera} />
          <OptionBox<SubFilterType> label="Baterai" placeholder="-- PILIH BATERAI --" options={OPSI_BATERAI} currentValue={baterai} onValueChange={setBaterai} />
          <OptionBox<SubFilterType> label="Update OS" placeholder="-- PILIH UPDATE OS --" options={OPSI_UPDATE_OS} currentValue={updateOs} onValueChange={setUpdateOs} />
        </div>

        {/* =========================================================
            SEKSI 2: KUMPULAN PENGATURAN SLIDER BOBOT & PANDUAN SPK
           ========================================================= */}
        <div className="bg-white border-4 border-black p-6 md:p-8 mb-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative">
          
          {/* Tombol Panduan Buku */}
          <button 
            type="button"
            onClick={() => setShowGuide(true)}
            className="absolute top-4 right-4 bg-black text-white p-2 border-2 border-black font-black text-xs hover:bg-[#e53935] cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.2)] transition-all"
          >
            📖 PANDUAN CRITERIA
          </button>

          {/* Render Komponen Slider Modular */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 pt-8 pr-2">
            <SliderBobot id="harga" label="Harga" value={bobot.harga} onChange={handleSliderChange} />
            <SliderBobot id="ram" label="RAM" value={bobot.ram} onChange={handleSliderChange} />
            <SliderBobot id="kamera" label="Kamera" value={bobot.kamera} onChange={handleSliderChange} />
            <SliderBobot id="penyimpanan" label="Penyimpanan" value={bobot.penyimpanan} onChange={handleSliderChange} />
            <SliderBobot id="chipset" label="Chipset" value={bobot.chipset} onChange={handleSliderChange} />
            <SliderBobot id="updateOs" label="Update OS" value={bobot.updateOs} onChange={handleSliderChange} />
            <SliderBobot id="baterai" label="Baterai" value={bobot.baterai} onChange={handleSliderChange} />
          </div>

          {/* Tombol Jalankan Perhitungan SPK */}
          <div className="w-full flex justify-end mt-8">
            <button 
              type="button" 
              className="w-full md:w-64 py-3 bg-black hover:bg-stone-800 text-white font-black uppercase text-xs border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer transition-all"
            >
              Cari Rekomendasi 🚀
            </button>
          </div>
        </div>

        {/* =========================================================
            SEKSI 3: LOOPING HASIL REKOMENDASI (ProductCard Milikmu)
           ========================================================= */}
        <div className="w-full border-b-4 border-black mb-8 pb-2">
          <h2 className="text-xl font-black bg-white border-2 border-black inline-block px-4 py-1 uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            📋 Hasil Rekomendasi
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {DUMMY_REKOMENDASI.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onDetailClick={(id) => {
                const target = DUMMY_REKOMENDASI.find(p => p.id === id);
                if (target) setSelectedProduct(target);
              }}
            />
          ))}
        </div>

      </div>

      {/* =========================================================
          KOMPONEN DETAIL POP-UP MODAL (Menggunakan ProductDetail Milikmu)
         ========================================================= */}
      <ProductDetail 
        product={selectedProduct} 
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
                🔴 <span className="text-[#e53935]">HARGA (COST):</span> Semakin tinggi Anda menggeser bobot harga, maka sistem akan memprioritaskan rekomendasi smartphone dengan harga yang paling murah.
              </p>
              <p className="border-b border-dashed border-stone-300 pb-2">
                🟢 <span className="text-emerald-600">SPESIFIKASI (BENEFIT):</span> Semakin tinggi Anda menggeser bobot RAM, Kamera, OS, atau Baterai, gawai dengan performa spesifikasi tertinggi yang akan diutamakan menduduki ranking atas.
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