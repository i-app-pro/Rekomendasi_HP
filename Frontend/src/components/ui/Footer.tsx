export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-gray-300 border-t border-gray-800">
      {/* Konten Utama Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          {/* Brand Section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <img 
                src="src/assets/brand/reko.png" 
                alt="Reko" 
                className="h-7 w-auto object-contain brightness-110" 
              />
              <span className="text-white font-bold text-lg tracking-wide">rekophone</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Solusi Rekomendasi Handphone Terbaik. Temukan perangkat impian Anda bersama kami.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-gray-800 pb-2 md:border-none md:pb-0">
              Layanan
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#e53935] transition-colors block py-0.5">Beli Handphone</a></li>
              <li><a href="#" className="hover:text-[#e53935] transition-colors block py-0.5">Cari Rekomendasi</a></li>
              <li><a href="#" className="hover:text-[#e53935] transition-colors block py-0.5">Tantang REKOPHONE</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-gray-800 pb-2 md:border-none md:pb-0">
              Kontak
            </h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p className="flex items-center gap-2">
                <span className="font-semibold text-gray-300">Email:</span> support@rekophone.com
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold text-gray-300">WhatsApp:</span> +62 812-3456-7890
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="w-full border-t border-gray-800/60 bg-gray-950/40 py-6 text-center text-xs text-gray-500 px-4">
        &copy; {currentYear} Rekophone. All rights reserved. Built with passion.
      </div>
    </footer>
  );
};

export default Footer;