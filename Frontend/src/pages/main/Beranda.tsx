import { useEffect, useState } from 'react';
import ProductCard from '../../components/CardProduk';
import { ProductDetail } from '../../components/CardDetail';
import type { Brand, ProductData } from '../../types/product';
import { mapApiProductToProductData } from '../../types/product';
import { getProducts } from '../../api/products';
import { getBrands } from '../../api/brands';

const JUMLAH_PRODUK_TERBARU = 8;

export default function Beranda() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [latestYear, setLatestYear] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
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

        // Tahun rilis terbaru dari SELURUH produk (bukan cuma yang ditampilkan setelah di-slice)
        const releaseYears = productData
          .map((p) => (p.tahun_rilis ? new Date(p.tahun_rilis).getFullYear() : null))
          .filter((year): year is number => !!year && !isNaN(year));
        setLatestYear(releaseYears.length > 0 ? Math.max(...releaseYears).toString() : null);

        // Urutkan dari yang paling baru rilis, ambil 8 teratas untuk section "Produk Terbaru"
        const terbaru = [...productData]
          .sort((a, b) => {
            const dateA = a.tahun_rilis ? new Date(a.tahun_rilis).getTime() : 0;
            const dateB = b.tahun_rilis ? new Date(b.tahun_rilis).getTime() : 0;
            return dateB - dateA;
          })
          .slice(0, JUMLAH_PRODUK_TERBARU);

        setProducts(terbaru.map((p) => mapApiProductToProductData(p, brandMap.get(p.brands_id))));
        setErrorMsg(null);
      } catch {
        if (!mounted) return;
        setErrorMsg('Gagal memuat produk dari server. Pastikan backend berjalan di http://localhost:3000.');
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="w-full flex flex-col">

      {/* HERO SECTION */}
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
              <a href="/produk" className="px-5 py-2.5 bg-[#d62828] hover:bg-[#b71c1c] text-white text-xs font-bold uppercase border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.75 active:translate-y-0.75 active:shadow-none transition-all cursor-pointer">
                Belanja Sekarang
              </a>
              <a href="/rekomendasi" className="px-5 py-2.5 bg-white hover:bg-stone-100 text-black text-xs font-bold uppercase border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.75 active:translate-y-0.75 active:shadow-none transition-all cursor-pointer">
                Rekomendasi
              </a>
            </div>
          </div>

          {/* Ilustrasi Mockup Kanan */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end z-10">
            <div className="relative w-full max-w-sm lg:max-w-md aspect-square md:aspect-auto flex items-center justify-center">
              <img
                src="src/assets/brand/hp.png"
                alt="Mockup Smartphone"
                className="w-full h-auto object-contain [image-rendering:pixelated] max-h-75 md:max-h-105"
              />
            </div>
          </div>

        </div>
      </section>

      {/* SECTION PRODUK TERBARU */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        {/* Title Section */}
        <div className="mb-10">
          <h2 className="text-[#64748b] font-black text-2xl md:text-3xl uppercase tracking-wide select-none">
            Produk Terbaru
          </h2>
          {latestYear && (
            <p className="text-xs md:text-sm text-stone-500 font-bold uppercase mt-2 select-none">
              Update Rilis Tahun {latestYear}
            </p>
          )}
        </div>

        {isLoading && (
          <p className="text-sm font-bold text-stone-500 uppercase">Memuat produk...</p>
        )}

        {!isLoading && errorMsg && (
          <p className="text-sm font-bold text-[#e53935] uppercase">{errorMsg}</p>
        )}

        {!isLoading && !errorMsg && products.length === 0 && (
          <p className="text-sm font-bold text-stone-500 uppercase">Belum ada produk tersedia.</p>
        )}

        {/* Responsive Grid System (Mobile: 1 kolom, Tablet: 2 kolom, Desktop: 4 kolom) */}
        {!isLoading && !errorMsg && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 justify-center">
            {products.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onDetailClick={() => setSelectedProduct(prod)}
              />
            ))}
          </div>
        )}
      </section>

      {/* OVERLAY INTERAKTIF DETAIL PRODUK */}
      <ProductDetail
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

    </div>
  );
};
