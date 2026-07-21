import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6f9] font-mono selection:bg-yellow-300 selection:text-black">

      <Navbar />

      <main className="grow w-full flex flex-col">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}