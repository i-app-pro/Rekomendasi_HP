import React from 'react';
import type { ProductData } from '../../types/product';

interface ProductDetailModalProps {
  product: ProductData | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm font-mono transition-opacity animate-fade-in">
      {/* KOTAK MODAL UTAMA */}
      {/* Ditambahkan overflow-y-auto pada kontainer utama agar aman di-scroll pada semua ukuran mobile */}
      <div className="relative w-full max-w-4xl bg-white border-4 border-[#e53935] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row overflow-y-auto max-h-[90vh] rounded-sm">
        
        {/* Tombol Close Pojok Atas */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 z-10 bg-black text-white hover:bg-[#e53935] border-2 border-black w-8 h-8 font-black flex items-center justify-center cursor-pointer transition-colors shadow-[2px_2px_0px_0px_rgba(255,255,255,0.4)]"
        >
          X
        </button>

        {/* Sisi Kiri: Foto Produk */}
        <div className="w-full md:w-1/2 bg-[#e2e8f0] p-6 flex justify-center items-center min-h-65 md:min-h-125">
          <img 
            src={product.imageUrl} 
            alt={product.nama} 
            className="max-h-55 md:max-h-90 object-contain [image-rendering:pixelated] hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Garis Pembatas Tengah */}
        <div className="hidden md:block w-1 bg-[#e53935] self-stretch"></div>
        <div className="block md:hidden h-1 bg-[#e53935] w-full"></div>

        {/* Sisi Kanan: Spesifikasi Detail */}
        <div className="w-full md:w-1/2 p-5 md:p-8 flex flex-col text-black font-semibold text-xs sm:text-sm md:text-base bg-white">
          <div className="border-b-4 border-black pb-2 mb-4">
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight wrap-break-words">{product.nama}</h2>
            <span className="inline-block bg-black text-white px-2 py-0.5 text-[10px] sm:text-xs uppercase tracking-widest mt-1 font-bold">
              {product.brand} Official
            </span>
          </div>

          {/* List Spesifikasi */}
          <div className="grid grid-cols-1 gap-2.5 [&>p]:flex [&>p]:justify-between [&>p]:border-b [&>p]:border-dashed [&>p]:border-stone-300 [&>p]:pb-1">
            <p><span>📂 Nama</span> <span className="text-black font-bold text-right">{product.nama}</span></p>
            <p><span>🏷️ Brand</span> <span className="text-black font-bold text-right">{product.brand}</span></p>
            <p><span>💰 Harga</span> <span className="text-[#e53935] font-black text-right">{formatRupiah(product.harga)}</span></p>
            <p><span>⚡ RAM</span> <span className="text-black font-bold text-right">{product.ram}</span></p>
            <p><span>💾 Penyimpanan</span> <span className="text-black font-bold text-right">{product.penyimpanan}</span></p>
            <p><span>🔋 Baterai</span> <span className="text-black font-bold text-right">{product.baterai}</span></p>
            {product.updateOs && <p><span>🔄 Update OS</span> <span className="text-black font-bold text-right">{product.updateOs}</span></p>}
            <p><span>📸 Kamera</span> <span className="text-black font-bold text-right">{product.kamera}</span></p>
            {product.nanometer && <p><span>🔳 Nanometer</span> <span className="text-black font-bold text-right">{product.nanometer}</span></p>}
            {product.chipset && <p><span>🧠 Chipset</span> <span className="text-black font-bold text-right">{product.chipset}</span></p>}
            {product.os && <p><span>🤖 OS</span> <span className="text-black font-bold text-right">{product.os}</span></p>}
            {product.fastCharging && <p><span>🔌 Fast Charge</span> <span className="text-black font-bold text-right">{product.fastCharging}</span></p>}
            {product.display && <p><span>🖥️ Display</span> <span className="text-black font-bold text-right">{product.display}</span></p>}
          </div>

          {/* Tombol Aksi */}
          <div className="pt-6 mt-6 md:mt-auto">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-black hover:bg-stone-800 text-white font-bold uppercase text-xs border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            >
              [ Tutup Detail ]
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailModal;