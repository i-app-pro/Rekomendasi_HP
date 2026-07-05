import { useState } from 'react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Brand Logo & Text */}
          <div className="flex items-center gap-2 cursor-pointer shrink-0">
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
          </div>

          {/* Navigation Links - Desktop Only */}
          <div className="hidden md:flex items-center gap-8 text-base font-semibold text-gray-700">
            <a href="#" className="hover:text-[#e53935] transition-colors">Home</a>
            <a href="#" className="hover:text-[#e53935] transition-colors">Products</a>
            <a href="#" className="hover:text-[#e53935] transition-colors">Rekomendasi</a>
            <a href="#" className="hover:text-[#e53935] transition-colors">About Us</a>
          </div>

          {/* Action Button & Hamburger */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:inline-block px-5 py-2 text-sm font-bold text-white bg-[#d62828] hover:bg-[#b71c1c] rounded-xl transition-all shadow-sm">
              Login / Register
            </button>
            
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
          <a href="#" className="block px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#e53935]">Home</a>
          <a href="#" className="block px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#e53935]">Products</a>
          <a href="#" className="block px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#e53935]">Rekomendasi</a>
          <a href="#" className="block px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#e53935]">About Us</a>
          <button className="w-full sm:hidden mt-2 px-4 py-2.5 text-center text-sm font-bold text-white bg-[#d62828] rounded-xl">
            Login / Register
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;