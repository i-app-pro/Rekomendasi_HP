import React from 'react';
import type { ProductData } from '../types/product';

interface ProductDetailProps {
  product: ProductData | null;
  onClose: () => void; // Menambahkan prop onClose agar bisa menutup modal
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose }) => {
  // GUARD: Jika product bernilai null, jangan render apa-apa (modal tersembunyi)
  if (!product) return null;

  return (
    /* 1. BACKDROP OVERLAY GELAP */
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm font-mono transition-opacity">
      
      {/* 2. KOTAK MODAL UTAMA */}
      <div className="relative w-full max-w-4xl bg-white border-4 border-[#e53935] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row overflow-y-auto max-h-[90vh]">
        
        {/* 3. TOMBOL CLOSE (X) POJOK ATAS */}
        <button 
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 z-10 bg-black text-white hover:bg-[#e53935] border-2 border-black w-8 h-8 font-black flex items-center justify-center cursor-pointer transition-colors shadow-[2px_2px_0px_rgba(255,255,255,0.3)]"
        >
          X
        </button>

        {/* Sisi Kiri: Gambar (Mobile: Atas, Desktop: Kiri) */}
        <div className="w-full md:w-1/2 bg-[#d9d9d9] p-6 flex justify-center items-center min-h-65 md:min-h-100">
          <img 
            src={product.imageUrl} 
            alt={product.nama} 
            className="max-h-80 object-contain [image-rendering:pixelated]"
          />
        </div>

        {/* Pembatas Tengah Merah (Desktop: Vertikal, Mobile: Horizontal) */}
        <div className="hidden md:block w-1 bg-[#e53935] self-stretch"></div>
        <div className="block md:hidden h-1 bg-[#e53935] w-full"></div>

        {/* Sisi Kanan: List Spesifikasi Lengkap */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center text-black font-semibold text-sm md:text-base gap-2">
          <div className="border-b-4 border-black pb-1 mb-2">
            <h2 className="text-xl md:text-2xl font-black uppercase">{product.nama}</h2>
          </div>
          
          <p><span className="text-gray-500">&gt; </span>Nama : {product.nama}</p>
          <p><span className="text-gray-500">&gt; </span>Brand : {product.brand}</p>
          <p><span className="text-gray-500">&gt; </span>Harga : Rp {product.harga.toLocaleString('id-ID')}</p>
          <p><span className="text-gray-500">&gt; </span>RAM : {product.ram}</p>
          <p><span className="text-gray-500">&gt; </span>Penyimpanan : {product.penyimpanan}</p>
          <p><span className="text-gray-500">&gt; </span>Kamera : {product.kamera}</p>
          <p><span className="text-gray-500">&gt; </span>Baterai : {product.baterai}</p>

          {/* 4. TOMBOL TUTUP DI BAGIAN BAWAH SPESIFIKASI */}
          <div className="pt-4 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 bg-black hover:bg-stone-800 text-white font-bold uppercase text-xs border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.2)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            >
              [ Tutup Detail ]
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};