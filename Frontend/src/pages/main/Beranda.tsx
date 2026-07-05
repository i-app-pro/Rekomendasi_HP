import React from 'react';
import ProductCard from '../../components/CardProduk';
import type { ProductData } from '../../types/product'; 

// Dummy data untuk mengisi 8 slot produk sesuai layout gambar
const dummyProducts: ProductData[] = Array(8).fill({
  id: "1",
  nama: "iphone 16 pro max",
  brand: "Iphone",
  harga: 21000000,
  ram: "8 GB",
  penyimpanan: "256GB/512GB/1TB",
  kamera: "120 MP",
  baterai: "4685 mAh",
  
  imageUrl: "src/assets/brand/reko.png" // Sesuaikan path asset mockup gawai Anda
}).map((item, index) => ({ ...item, id: index.toString() }));

export const Beranda: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      
      {/* 1. HERO SECTION (Sesuai Banner Atas) */}
      <section className="w-full bg-[#1e2530] border-b-4 border-black relative overflow-hidden select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Teks Deskripsi Hero */}
          <div className="w-full md:w-1/2 flex flex-col items-start gap-4 md:gap-6 z-10 text-left">
            <h1 className="text-white font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide leading-tight">
              Temukan<br />SmartPhone<br />Impianmu<br />dengan Mudah
            </h1>
            <p className="text-stone-400 text-xs sm:text-sm font-semibold max-w-md leading-relaxed normal-case">
              Belanja smartphone terbaru dengan harga terbaik. Gunakan fitur rekomendasi untuk mendapatkan rekomendasi HP sesuai kebutuhan dan budgetmu.
            </p>
            {/* Group Tombol Aksi */}
            <div className="flex flex-wrap gap-4 pt-2 w-full sm:w-auto">
              <button className="px-5 py-2.5 bg-[#d62828] hover:bg-[#b71c1c] text-white text-xs font-bold uppercase border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.75 active:translate-y-0.75 active:shadow-none transition-all cursor-pointer">
                Belanja Sekarang
              </button>
              <button className="px-5 py-2.5 bg-white hover:bg-stone-100 text-black text-xs font-bold uppercase border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.75 active:translate-y-0.75 active:shadow-none transition-all cursor-pointer">
                Rekomendasi
              </button>
            </div>
          </div>

          {/* Ilustrasi Mockup Kanan */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end z-10">
            {/* Gunakan gambar mockup gawai miring Anda di sini */}
            <div className="relative w-full max-w-sm lg:max-w-md aspect-square md:aspect-auto flex items-center justify-center">
              <img 
                src="src/assets/brand/hero-phones.png" 
                alt="Mockup Smartphone" 
                className="w-full h-auto object-contain [image-rendering:pixelated] max-h-75 md:max-h-105"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 2. SECTION PRODUK TERBARU */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        {/* Title Section */}
        <h2 className="text-[#64748b] font-black text-2xl md:text-3xl uppercase tracking-wide mb-10 select-none">
          Produk Terbaru
        </h2>

        {/* Responsive Grid System (Mobile: 1 kolom, Tablet: 2 kolom, Desktop: 4 kolom) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 justify-center">
          {dummyProducts.map((prod) => (
            <ProductCard 
              key={prod.id} 
              product={prod} 
              onDetailClick={(id) => console.log(`Akses Detail Produk ID: ${id}`)} 
            />
          ))}
        </div>
      </section>

    </div>
  );
};

export default Beranda;