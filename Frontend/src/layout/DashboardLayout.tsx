import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'User', path: '/dashboard/user' },
    { name: 'Brand', path: '/dashboard/brand' },
    { name: 'Product', path: '/dashboard/product' },
    { name: 'Perhitungan SPK', path: '/dashboard/pembobotan' },
    { name: 'Criteria', path: '/dashboard/criteria' },
    { name: 'Founder', path: '/dashboard/founder' },
    { name: 'Criteria Value', path: '/dashboard/criteria-value' },
  ];

  const getPageTitle = () => {
    if (location.pathname === '/' || location.pathname === '/dashboard') return 'Dashboard';
    const pathArray = location.pathname.split('/');
    const lastPath = pathArray[pathArray.length - 1];
    return lastPath.replace('-', ' ');
  };

  // --- FUNGSI LOGOUT ---
  const handleLogout = () => {
    // Hapus token & data user dari useAuthStore (otomatis ikut terhapus dari
    // localStorage juga, karena store ini pakai persist middleware).
    // Sebelumnya baris ini tidak ada, jadi token lama tetap tersimpan
    // walau sudah pindah halaman -> user dianggap masih login.
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden relative">
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside 
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-white border-r border-slate-200 shadow-xl md:shadow-sm z-30 flex flex-col items-center py-8 px-4`}
      >
        <button 
          className="md:hidden absolute top-4 right-4 text-slate-500 hover:text-red-500"
          onClick={() => setIsSidebarOpen(false)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="flex flex-col items-center mb-10 mt-4 md:mt-0">
          <div className="w-24 h-24 mb-2 flex items-center justify-center ">
            <img src="/src/assets/brand/reko.png" alt="Logo" />
          </div>
          <h1 className="text-xl font-black tracking-widest">
            REKO<span className="text-[#d62828]">PHONE</span>
          </h1>

          {/* Info user yang sedang login, diambil dari useAuthStore */}
          {user && (
            <div className="mt-3 text-center">
              <p className="text-sm font-bold text-slate-700 truncate max-w-40">{user.nama}</p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                {user.role}
              </span>
            </div>
          )}
        </div>

        <nav className="w-full flex flex-col gap-3 grow overflow-y-auto no-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname === item.path + '/';
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)} 
                className={`w-full py-3 rounded-xl font-bold text-sm text-center transition-all duration-200 ${
                  isActive
                    ? 'bg-[#1e2530] text-white shadow-md scale-100'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:scale-[1.02]'
                }`}
              >
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <button 
          onClick={handleLogout} 
          className="w-full py-3 mt-4 bg-[#ef4444] hover:bg-red-600 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all cursor-pointer"
        >
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden w-full">
        
        <header className="px-6 md:px-10 py-4 md:py-6 bg-white md:bg-transparent shadow-sm md:shadow-none flex items-center gap-4 z-10">
          <button 
            className="md:hidden p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
            onClick={() => setIsSidebarOpen(true)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
          
          <h2 className="text-xl md:text-2xl font-black text-slate-800 capitalize tracking-wide">
            {getPageTitle()}
          </h2>
        </header>
        
        <div className="flex-1 px-4 md:px-10 pb-8 overflow-y-auto w-full">
          <Outlet /> 
        </div>
      </main>

    </div>
  );
};

export default DashboardLayout;