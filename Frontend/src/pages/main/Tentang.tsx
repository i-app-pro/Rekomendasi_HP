import React, { useEffect, useState } from 'react';
import { CardProfile } from '../../components/CardProfile';
import { getFounders } from '../../api/founders';
import type { Founder } from '../../types/founder';

// Posisi tombol di ilustrasi (trio.png) -> id founder di database.
// Sesuai permintaan: KIRI = id 3, TENGAH = id 1, KANAN = id 2.
const POSISI_KE_FOUNDER_ID: Record<'kiri' | 'tengah' | 'kanan', number> = {
  kiri: 3,
  tengah: 1,
  kanan: 2,
};

const PLACEHOLDER_FOTO = 'src/assets/brand/reko.png';

export const HalamanAboutUs: React.FC = () => {
  const [founders, setFounders] = useState<Founder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedFounder, setSelectedFounder] = useState<Founder | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setIsLoading(true);
        const data = await getFounders();
        if (!mounted) return;
        setFounders(data);
        setErrorMsg(null);
      } catch (err) {
        if (!mounted) return;
        setErrorMsg('Gagal memuat data tim dari server. Pastikan backend berjalan di http://localhost:3000.');
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleClickPosisi = (posisi: 'kiri' | 'tengah' | 'kanan') => {
    const founderId = POSISI_KE_FOUNDER_ID[posisi];
    const founder = founders.find((f) => f.id === founderId);
    if (founder) setSelectedFounder(founder);
  };

  return (
    <div className="w-full bg-[#f4f6f9] font-mono min-h-screen text-black flex flex-col">
      
      {/* =========================================================
          1. HERO HEADER BANNER (Sesuai bagian atas image_6f22ac.jpg)
         ========================================================= */}
      <div className="w-full bg-[#1e2530] border-b-4 border-black py-8 px-6 md:px-16 flex flex-row items-center justify-between shadow-[0_4px_0_0_rgba(0,0,0,1)]">
        <div className="flex items-center justify-center w-24 md:w-32">
          {/* Ilustrasi Dinosaurus Merah */}
          {/* <span className="text-5xl md:text-7xl animate-bounce"> */}
            <img 
            src="src/assets/brand/reko.png"
            alt="Ilustrasi Dinosaurus Merah"
            className="w-full h-auto object-contain [image-rendering:pixelated]"
            />
          {/* </span> */}
        </div>
        <div className="text-right max-w-xl">
          <h1 className="text-white text-2xl md:text-4xl font-black uppercase tracking-wide">
            Tentang <br />
            <span className="text-[#e53935]">REKOPHONE</span>
          </h1>
          <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase mt-2 leading-relaxed">
            Website Rekomendasi Handphone yang Akan Memudahkan Anda dalam Menentukan Rekomendasi Handphone Terbaik
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center grow">
        
        {/* =========================================================
            2. DESKRIPSI UTAMA TENTANG APLIKASI
           ========================================================= */}
        <div className="text-center mb-16 max-w-2xl">
          <h2 className="text-xl md:text-2xl font-black uppercase text-gray-500 mb-6 tracking-widest">
            Tentang
          </h2>
          <p className="text-stone-700 text-sm md:text-base font-medium leading-relaxed text-justify sm:text-center">
            RekoPhone adalah platform rekomendasi smartphone yang membantu kamu menemukan HP
            paling sesuai dengan kebutuhan dan bujet, tanpa harus riset spesifikasi satu-satu.
            Cukup atur prioritas kriteria yang paling penting buat kamu — harga, RAM, penyimpanan,
            baterai, update OS, sampai resolusi kamera — dan sistem kami akan menghitung serta
            mengurutkan produk yang paling cocok menggunakan tiga metode Sistem Pendukung Keputusan
            (SPK): <span className="font-bold">SAW</span> (Simple Additive Weighting),{' '}
            <span className="font-bold">WP</span> (Weighted Product), dan{' '}
            <span className="font-bold">TOPSIS</span>. Setiap metode dihitung dari data yang sama,
            jadi kamu bisa membandingkan hasil rekomendasi dari tiga sudut pandang perhitungan yang
            berbeda sebelum memutuskan HP mana yang mau dibeli. Proyek ini dibangun sebagai tugas
            akhir mata kuliah gabungan Pemrograman Web, Sistem Pendukung Keputusan, dan Basis Data,
            menggunakan React + TypeScript + TailwindCSS di sisi frontend, serta Express + Prisma +
            TiDB di sisi backend.
          </p>
        </div>

        {/* =========================================================
            AREA TEAM KAMI & ILLUSTRATION CONTAINER
           ========================================================= */}
        <div className="w-full text-center flex flex-col items-center">
          <h2 className="text-xl md:text-2xl font-black uppercase text-gray-500 mb-8 tracking-widest">
            Team Kami
          </h2>

          {isLoading && (
            <p className="text-xs font-bold text-stone-500 uppercase mb-6">Memuat data tim...</p>
          )}
          {!isLoading && errorMsg && (
            <p className="text-xs font-bold text-[#e53935] uppercase mb-6">{errorMsg}</p>
          )}

          {/* Wrapper Gambar Ilustrasi Bertumpuk */}
          <div className="relative w-full max-w-2xl bg-[#d9d9d9] border-4 border-black p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden rounded-md">
            <img 
              src="src/assets/brand/trio.png" 
              alt="Trio Rekophone Team" 
              className="w-full h-auto object-contain [image-rendering:pixelated]"
            />

            {/* OVERLAY INTERAKTIF: Penempatan Tombol Mengikuti Posisi Karakter di Foto */}
            <div className="absolute inset-0 grid grid-cols-3 p-4">
              
              {/* Kolom Karakter Kiri -> founder id 3 */}
              <div className="flex items-end justify-center pb-8 sm:pb-12">
                <button
                  type="button"
                  onClick={() => handleClickPosisi('kiri')}
                  disabled={isLoading || !!errorMsg}
                  className="px-4 py-1.5 bg-[#e53935] hover:bg-[#b71c1c] text-white font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Lihat
                </button>
              </div>

              {/* Kolom Karakter Tengah -> founder id 1 */}
              <div className="flex items-end justify-center pb-2 sm:pb-4">
                <button
                  type="button"
                  onClick={() => handleClickPosisi('tengah')}
                  disabled={isLoading || !!errorMsg}
                  className="px-4 py-1.5 bg-[#e53935] hover:bg-[#b71c1c] text-white font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Lihat
                </button>
              </div>

              {/* Kolom Karakter Kanan -> founder id 2 */}
              <div className="flex items-end justify-center pb-8 sm:pb-12">
                <button
                  type="button"
                  onClick={() => handleClickPosisi('kanan')}
                  disabled={isLoading || !!errorMsg}
                  className="px-4 py-1.5 bg-[#e53935] hover:bg-[#b71c1c] text-white font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Lihat
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* =========================================================
          4. FOOTER IDENTITAS
         ========================================================= */}


      {/* =========================================================
          5. POP-UP MODAL POP-UP UNTUK DETAIL PROFILE KARTU
         ========================================================= */}
      {selectedFounder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity">
          <div className="relative w-full max-w-xl">
            
            {/* Tombol Silang Penutup Modal */}
            <button 
              type="button"
              onClick={() => setSelectedFounder(null)}
              className="absolute -top-3 -right-3 z-50 bg-black text-white hover:bg-[#e53935] border-2 border-black w-8 h-8 font-black flex items-center justify-center cursor-pointer shadow-[2px_2px_0px_rgba(255,255,255,0.4)] transition-colors"
            >
              X
            </button>

            {/* Data asli dari GET /api/founders, bukan dummy lagi */}
            <CardProfile 
              foto={selectedFounder.foto || PLACEHOLDER_FOTO}
              nama={selectedFounder.nama}
              status={selectedFounder.status}
              universitas={selectedFounder.universitas}
              bahasaPemrograman={selectedFounder.framework.split(',').map((s) => s.trim()).filter(Boolean)}
              email={selectedFounder.email}
              usernameGit={selectedFounder.github}
              usernameIg={selectedFounder.username_ig}
            />

          </div>
        </div>
      )}

    </div>
  );
};

export default HalamanAboutUs;