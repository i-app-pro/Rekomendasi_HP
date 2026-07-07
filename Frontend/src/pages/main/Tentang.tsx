import React, { useState } from 'react';
import { CardProfile } from '../../components/CardProfile';

interface MemberData {
  id: string;
  foto: string;
  nama: string;
  status: string;
  universitas: string;
  bahasaPemrograman: string[];
  usernameGit: string;
  usernameIg: string;
}

// Data Dummy Anggota Tim (Sesuaikan dengan tim aslimu)
const DATA_TIM: MemberData[] = [
  {
    id: 'kiri',
    foto: 'https://via.placeholder.com/150',
    nama: 'Faizal Isman',
    status: 'Dashboard Layout Designer',
    universitas: 'Universitas Harkat Negeri',
    bahasaPemrograman: ['Figma', 'CSS', 'HTML'],
    usernameGit: 'albertwijaya',
    usernameIg: 'albertwj',
  },
  {
    id: 'tengah',
    foto: 'https://via.placeholder.com/150', 
    nama: 'Ramdani Ardhin Pasha',
    status: 'Lead Developer',
    universitas: 'Universitas Harkat Negeri',
    bahasaPemrograman: ['TypeScript', 'React', 'Tailwind', 'Node.js'],
    usernameGit: 'ramdaniardhin',
    usernameIg: 'ramdaniardhin',
  },
  {
    id: 'kanan',
    foto: 'https://via.placeholder.com/150',
    nama: 'Amirul Madjid Ibrahim',
    status: 'Backend Engineer',
    universitas: 'Universitas Harkat Negeri',
    bahasaPemrograman: ['Go', 'PostgreSQL', 'Docker'],
    usernameGit: 'budisetiawan',
    usernameIg: 'budis_',
  },
];

export const HalamanAboutUs: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<MemberData | null>(null);

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
            // Tentang
          </h2>
          <p className="text-stone-700 text-sm md:text-base font-medium leading-relaxed text-justify sm:text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque massa placerat duis ultricies lacus sed turpis. 
            Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Ut porttitor leo a diam sollicitudin tempor. 
            Nullam eget felis eget nunc lobortis mattis. Faucibus nisl tincidunt eget nullam non nisi est sit amet. 
            Id aliquet lectus proin nibh nisl condimentum. Placerat in egestas erat imperdiet sed euismod nisi porta.
          </p>
        </div>

        {/* =========================================================
            3. AREA TEAM KAMI & ILLUSTRATION CONTAINER
           ========================================================= */}
        <div className="w-full text-center flex flex-col items-center">
          <h2 className="text-xl md:text-2xl font-black uppercase text-gray-500 mb-8 tracking-widest">
            // Team Kami
          </h2>

          {/* Wrapper Gambar Ilustrasi Bertumpuk */}
          <div className="relative w-full max-w-2xl bg-[#d9d9d9] border-4 border-black p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden rounded-md">
            <img 
              src="src/assets/brand/trio.png" 
              alt="Trio Rekophone Team" 
              className="w-full h-auto object-contain [image-rendering:pixelated]"
            />

            {/* OVERLAY INTERAKTIF: Penempatan Tombol Mengikuti Posisi Karakter di Foto */}
            <div className="absolute inset-0 grid grid-cols-3 p-4">
              
              {/* Kolom Karakter Kiri */}
              <div className="flex items-end justify-center pb-8 sm:pb-12">
                <button
                  type="button"
                  onClick={() => setSelectedMember(DATA_TIM[0])}
                  className="px-4 py-1.5 bg-[#e53935] hover:bg-[#b71c1c] text-white font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                >
                  Lihat
                </button>
              </div>

              {/* Kolom Karakter Tengah */}
              <div className="flex items-end justify-center pb-2 sm:pb-4">
                <button
                  type="button"
                  onClick={() => setSelectedMember(DATA_TIM[1])}
                  className="px-4 py-1.5 bg-[#e53935] hover:bg-[#b71c1c] text-white font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                >
                  Lihat
                </button>
              </div>

              {/* Kolom Karakter Kanan */}
              <div className="flex items-end justify-center pb-8 sm:pb-12">
                <button
                  type="button"
                  onClick={() => setSelectedMember(DATA_TIM[2])}
                  className="px-4 py-1.5 bg-[#e53935] hover:bg-[#b71c1c] text-white font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
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
      <footer className="w-full bg-[#1e2530] border-t-4 border-black py-4 text-center mt-auto">
        <span className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-widest">
          RekoPhone &copy; 2026
        </span>
      </footer>

      {/* =========================================================
          5. POP-UP MODAL POP-UP UNTUK DETAIL PROFILE KARTU
         ========================================================= */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity">
          <div className="relative w-full max-w-xl">
            
            {/* Tombol Silang Penutup Modal */}
            <button 
              type="button"
              onClick={() => setSelectedMember(null)}
              className="absolute -top-3 -right-3 z-50 bg-black text-white hover:bg-[#e53935] border-2 border-black w-8 h-8 font-black flex items-center justify-center cursor-pointer shadow-[2px_2px_0px_rgba(255,255,255,0.4)] transition-colors"
            >
              X
            </button>

            {/* Mengimpor & Menyuntikkan Data ke CardProfile Milikmu */}
            <CardProfile 
              foto={selectedMember.foto}
              nama={selectedMember.nama}
              status={selectedMember.status}
              universitas={selectedMember.universitas}
              bahasaPemrograman={selectedMember.bahasaPemrograman}
              usernameGit={selectedMember.usernameGit}
              usernameIg={selectedMember.usernameIg}
            />

          </div>
        </div>
      )}

    </div>
  );
};

export default HalamanAboutUs;