import { Navbar } from '../components/ui/Navbar'; // Pastikan path import sesuai struktur foldermu
import { Footer } from '../components/ui/Footer';
import { Outlet } from 'react-router-dom';


export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6f9] font-mono selection:bg-yellow-300 selection:text-black">
      
      {/* Header / Navigasi */}
      <Navbar />

      {/* Konten Utama Dinamis */}
      {/* Container utama dibuat full-width agar Hero Section di Beranda bisa merentang penuh */}
      <main className="grow w-full flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
      
    </div>
  );
};
