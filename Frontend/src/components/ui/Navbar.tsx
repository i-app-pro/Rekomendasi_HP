import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; //  Import Link untuk navigasi Single Page Application
import { useAuthStore } from '../../store/useAuthStore';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <nav className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Brand Logo & Text */}
          {/* Menggunakan Link agar jika logo diklik, otomatis kembali ke Beranda / Home */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer shrink-0">
            <img 
              src="src/assets/brand/reko.png" 
              alt="Reko Dino Logo" 
              className="h-8 md:h-10 w-auto object-contain"
            />
            <img 
              src="src/assets/brand/rekophone.png" 
              alt="Rekophone" 
              className="h-4 md:h-5 w-auto object-contain"
            />
          </Link>

          {/* Navigation Links - Desktop Only */}
          {/* Mengubah semua tag <a> menjadi <Link to="..."> */}
          <div className="hidden md:flex items-center gap-8 text-base font-semibold text-gray-700">
            <Link to="/" className="hover:text-[#e53935] transition-colors">Home</Link>
            <Link to="/produk" className="hover:text-[#e53935] transition-colors">Products</Link>
            <Link to="/rekomendasi" className="hover:text-[#e53935] transition-colors">Rekomendasi</Link>
            <Link to="/tentang" className="hover:text-[#e53935] transition-colors">About Us</Link>
          </div>

          {/* Action Button & Hamburger */}
          <div className="flex items-center gap-4">
            {/* Merapikan susunan tombol Login agar bersih dan tidak ditumpuk tag anchor */}
            {isAuthenticated && user ? (
              <div className="hidden sm:flex items-center gap-3">
                <span className="text-sm font-bold text-gray-700">👋 {user.nama}</span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-bold text-white bg-gray-800 hover:bg-black rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="hidden sm:inline-block px-5 py-2 text-sm font-bold text-white bg-[#d62828] hover:bg-[#b71c1c] rounded-xl transition-all shadow-sm"
              >
                Login / Register
              </Link>
            )}
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              type="button" 
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-2 animate-fadeIn">
          {/* Mengubah menu mobile menjadi <Link> juga */}
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)} 
            className="block px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#e53935]"
          >
            Home
          </Link>
          <Link 
            to="/produk" 
            onClick={() => setIsOpen(false)} 
            className="block px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#e53935]"
          >
            Products
          </Link>
          <Link 
            to="/rekomendasi" 
            onClick={() => setIsOpen(false)} 
            className="block px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#e53935]"
          >
            Rekomendasi
          </Link>
          <Link 
            to="/tentang" 
            onClick={() => setIsOpen(false)} 
            className="block px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#e53935]"
          >
            About Us
          </Link>
          {isAuthenticated && user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="block w-full sm:hidden mt-2 px-4 py-2.5 text-center text-sm font-bold text-white bg-gray-800 rounded-xl cursor-pointer"
            >
              👋 {user.nama} · Logout
            </button>
          ) : (
            <Link 
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full sm:hidden mt-2 px-4 py-2.5 text-center text-sm font-bold text-white bg-[#d62828] rounded-xl"
            >
              Login / Register
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;