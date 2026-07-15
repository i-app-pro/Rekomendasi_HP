import React from 'react';
import type { ProductData } from '../types/product';
import { formatRupiah } from '../lib/formatRupiah';

interface ProductCardProps {
  product: ProductData;
  onDetailClick?: (id: string | number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onDetailClick }) => {
  return (
    <div className="font-mono w-full max-w-85 bg-[#1e2530] border-4 border-black p-5 flex flex-col items-center gap-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] select-none mx-auto">
      
      {/* Container Gambar Produk */}
      <div className="w-full bg-white border-4 border-black p-3 flex justify-center items-center h-56 overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.nama} 
          className="max-h-full max-w-full object-contain [image-rendering:pixelated]"
        />
      </div>

      {/* Informasi Produk */}
      <div className="w-full text-center flex flex-col gap-1">
        <h3 className="text-white font-bold text-xl uppercase tracking-wide truncate">
          {product.nama}
        </h3>
        <p className="text-gray-300 text-sm">
          {product.ram} | {product.penyimpanan}
        </p>
        <p className="text-gray-300 text-sm">
          Kamera {product.kamera}
        </p>
        <p className="text-gray-300 text-sm">
          Baterai {product.baterai}
        </p>
      </div>

      {/* Harga Merah Pixel */}
      <span className="text-[#e53935] font-black text-xl tracking-wide">
        {formatRupiah(product.harga)}
      </span>

      {/* Tombol Detail Retro */}
      <button 
        type="button"
        onClick={() => onDetailClick && onDetailClick(product.id)}
        className="w-full py-2.5 bg-[#d62828] hover:bg-[#b71c1c] text-white font-bold uppercase text-base border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.75 active:translate-y-0.75 active:shadow-none transition-all cursor-pointer"
      >
        [ Detail ]
      </button>

    </div>
  );
};

export default ProductCard;