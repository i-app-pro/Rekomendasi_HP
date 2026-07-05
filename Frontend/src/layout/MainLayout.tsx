import React from 'react';
import { Navbar } from '../components/ui/Navbar'; // Pastikan path import sesuai struktur foldermu
import { Footer } from '../components/ui/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6f9] font-mono selection:bg-yellow-300 selection:text-black">
      
      {/* Header / Navigasi */}
      <Navbar />

      {/* Konten Utama Dinamis */}
      {/* Container utama dibuat full-width agar Hero Section di Beranda bisa merentang penuh */}
      <main className="grow w-full flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <Footer />
      
    </div>
  );
};

export default MainLayout;